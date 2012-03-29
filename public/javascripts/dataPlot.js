var Graph = {}; 

Graph.Point = function(xCord, yCord) {
  
  var xCordinate = xCord;
  var yCordinate = yCord;

  var value = function() {
    return [xCordinate, yCordinate];
  };

  return {
    value : value
  };
};

Graph.Series = function(seriesName, maxElements, options) {
  
  var _name = seriesName;
  var _maxElementLimit = (maxElements || 300);
  var pointCollection = [];
  var _count = 0;
  var _defaultOptions = {
    color      : new Graph.Util().randomColor(),
    label      : seriesName,
    lines      : { show : true  },
    points     : { show : false },
    clickable  : true,
    hoverable  : true,
    shadowSize : 2
  };

  var _seriesObject = function() {
    var obj = {};
    options = options || {}
    for(var attribute in _defaultOptions) {
      obj[attribute] = options[attribute] || _defaultOptions[attribute];
    };
    return obj;
  };
  
  var add = function(point) {
    if(pointCollection.length >= _maxElementLimit) {
      pointCollection = pointCollection.slice(1);
    }
    pointCollection.push(point.value());
    _count++;
  };

  var addAll = function(points) {
    $(points).each(function(index, element) {
      add(element);
    });
  };
  
  var name = function() {
    return _name;
  };

  var object = function() {
    var obj = _seriesObject();
    obj.data = pointCollection;
    return obj;
  };

  var total = function() {
    return _count;
  };

  return {
    name   : name,
    add    : add,
    addAll : addAll,
    object : object,
    total  : total
  };

};

Graph.Util = function() {
  var randomColor = function() {
    var color = "ccc";
    while(color.toLowerCase() == "cccccc" || color.toLowerCase() == "ccc" )
    {
      color = Math.floor(Math.random()*16777215).toString(16);
    };
    return ("#"+color);
  };

  return {randomColor : randomColor};
};

Graph.SeriesCollection = function() {
  
  var seriesCollection = {};

  var add = function(series) {
    seriesCollection[series.name()] = series;
  };

  var list = function() {
    var dataToReturn = [];
    for(var seriesName in seriesCollection) {
      dataToReturn.push(seriesCollection[seriesName]);
    }
    return dataToReturn;
  };

  var fetch = function(seriesName) {
    return seriesCollection[seriesName];
  };

  var data = function() {
    var dataToReturn = []
    for(var name in seriesCollection) {
      dataToReturn.push(seriesCollection[name].object());
    }
    return dataToReturn;
  };

  return { 
    add  : add, 
    list : list,
    fetch: fetch,
    data : data
  };
};

Graph.Plotter = function(elementId) {

  var graph;
  var uiElementId = elementId;
  var initialized = false;

  var plotOptions = {
    series    : {showSize: 5},
    points    : {show:true},
    lines     : {show:true},
    yaxis     : {min: 0},
    xaxis     : {show: false}
  };

  var plot = function(data) {
    initialized ? _refresh(data) : _plot(data);
  };

  var _plot = function(data) {
    graph = $.plot($("#"+uiElementId), data, plotOptions);
    initialized = true;
  };

  var _refresh = function(data) {
    graph.setData(data);
    graph.setupGrid();
    graph.draw();
  };

  return {
    plot : plot,
  };
};

Graph.Updater = function(plotter) {

  var seriesCollection = new Graph.SeriesCollection();
  var graphPlotter = plotter;

  var _serverData = function() {
    $.ajax({
      url     : "/data/alpha/sqs.json",
      method  : "GET",
      success : _successCallback
    });
  };

  var _successCallback = function(data) {
    var series;
    for(var queueName in data) {
      series = _fetchOrCreateQueue(queueName);
      series.add(new Graph.Point(series.total(), data[queueName]));
      seriesCollection.add(series);
    }
    graphPlotter.plot(seriesCollection.data());
  };

  var updateData = function() {
    _serverData();
  };

  var _fetchOrCreateQueue = function(name) {
    return (seriesCollection.fetch(name) == undefined) ? new Graph.Series(name) : seriesCollection.fetch(name);
  };

  return {update : updateData};
};
