var SystemMonitor = {}
SystemMonitor.Gauge = {}
SystemMonitor.GaugeSeries = {}

SystemMonitor.Gauge.Status = {
  ERROR  : 100,
  WARN   : 50,
  NORMAL : 10
};

SystemMonitor.Gauge.MasterDefaults = {
  width      : 400, height    : 240,
  redFrom    : 66 , redTo     : 100,
  yellowFrom : 33 , yellowTo  : 66,
  greenFrom  : 0  , greenTo   : 33,
  minorTicks : 0  , majorTicks : ["","WARN","","ERROR"]
};

SystemMonitor.Gauge.ChildDefaults = {
  width      : 400, height    : 120,
  redFrom    : 66 , redTo     : 100,
  yellowFrom : 33 , yellowTo  : 66,
  greenFrom  : 0  , greenTo   : 33,
  minorTicks : 0  , majorTicks : ["","WARN","","ERROR"]
};

SystemMonitor.GaugeSeries = function(masterElement, childElement, data) {

  var masterGauge;
  var masterGaugeData;
  var childGauges;
  var childGaugesData;
  
  var _init = function(mElement, cElement, initData) {
    masterGaugeData = new google.visualization.DataTable();
    masterGaugeData.addColumn('string','Label');
    masterGaugeData.addColumn('number','Value');
    masterGaugeData.addRows([[initData['name'], initData['value']]]);
    masterGauge = new google.visualization.Gauge(document.getElementById(mElement));

    var children = initData['children'];
    childGaugesData = new google.visualization.DataTable();
    childGaugesData.addColumn('string','Label');
    childGaugesData.addColumn('number','Value');
    childGaugesData.addRows(children.length);
    for(var i=0; i<children.length; i++) {
      childGaugesData.setValue(i,0,children[i]['name']);
      childGaugesData.setValue(i,1,children[i]['value']);
    }
    childGauges = new google.visualization.Gauge(document.getElementById(cElement));

    masterGauge.draw(masterGaugeData, SystemMonitor.Gauge.MasterDefaults);
    childGauges.draw(childGaugesData, SystemMonitor.Gauge.ChildDefaults);
  };

  var refresh = function(refreshData) {
    masterGaugeData.setValue(0,1,refreshData['value']);

    var children = refreshData['children'];
    for(var i=0; i<children.length; i++) {
      childGaugesData.setValue(i,1,children[i]['value']);
    }

    masterGauge.draw(masterGaugeData, SystemMonitor.Gauge.MasterDefaults);
    childGauges.draw(childGaugesData, SystemMonitor.Gauge.ChildDefaults);
  };

  _init(masterElement, childElement, data);
  return { refresh : refresh };
};

SystemMonitor.Gauges = function() {

  var g;
  
  var _init = function() {
    google.load('visualization', '1', {packages:['gauge']});
    google.setOnLoadCallback(drawChart);
  };

  var drawChart = function() {
    data = {name : "QA", value: 40, children : [{name:'mongo', value:20},{name:'app', value : 80}]};
    g = new SystemMonitor.GaugeSeries('master','children', data);
  };

  var r = function(d) {
    g.refresh(d);
  };
  
  _init();

  return {r:r};
};

var a = new SystemMonitor.Gauges();
