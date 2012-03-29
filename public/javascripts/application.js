$(document).ready(function() {

  var envList = ['alpha','qa'];
  var registeredUpdaters = [];
  var env;
  for (var i=0; i<envList.length;i++) {
    env=envList[i];
    attachGraphDiv(env);
    var plotter = new Graph.Plotter((env+"graph"));
    var updater = new Graph.Updater(env, plotter);
    registeredUpdaters.push(updater);
  }

  periodicRefresh();
  setInterval(periodicRefresh, 15000);

  function periodicRefresh() {
    for (var i=0; i< registeredUpdaters.length; i++) {
      registeredUpdaters[i].update();
    };
  }
  
  function attachGraphDiv(env) {
    var htmlTagBeforeId = '<h1>'+env+'</h1> <div id="';
    var htmlTagAfterId  = '" style="width:1200px;height:300px;"></div>\n<br />';
    
    $("body").append(htmlTagBeforeId+env+"graph"+htmlTagAfterId);
  };
});

