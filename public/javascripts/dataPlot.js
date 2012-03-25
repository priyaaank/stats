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

Graph.Series = function(seriesName, maxElements) {
  
  var _name = seriesName;
  var _maxElementLimit = (maxElements || 300);
  var pointCollection = [];
  var _count = 0;
  
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

  var points = function() {
    return pointCollection;
  };

  var total = function() {
    return _count;
  };

  return {
    name   : name,
    add    : add,
    addAll : addAll,
    points : points,
    total  : total
  };

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
      dataToReturn.push(seriesCollection[name].points());
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

Graph.Plotter = function() {

  var seriesCollection = new Graph.SeriesCollection();
  var seriesUpdater = new Graph.SeriesUpdater(seriesCollection);
  var graph;

  var plotOptions = {
    series    : {showSize: 5},
    points    : {show:true},
    lines     : {show:true},
    yaxis     : {min: 0},
    xaxis     : {show: false}
  };

  var plot = function(elementId) {
    seriesUpdater.update();
    graph = $.plot($("#"+elementId), seriesCollection.data(), plotOptions);
  };

  var refresh = function() {
    seriesUpdater.update();
    graph.setData(seriesCollection.data());
    graph.setupGrid();
    graph.draw();
  };

  return {
    plot    : plot,
    refresh : refresh
  };
};

Graph.SeriesUpdater = function(seriesHolder) {

  var seriesCollection = seriesHolder;

  var _serverData = function() {
    return { 
      "queue_simple"  : Math.random() * 100,
      "awesome_queue" : Math.random() * 100,
    }
  };

  var updateSeriesData = function() {
    var data = _serverData();
    var series;
    for(var queueName in data) {
      series = _fetchOrCreateQueue(queueName);
      series.add(new Graph.Point(series.total(), data[queueName]));
      seriesCollection.add(series);
    }
  };

  var _fetchOrCreateQueue = function(name) {
    return (seriesCollection.fetch(name) == undefined) ? new Graph.Series(name) : seriesCollection.fetch(name);
  };

  return {update : updateSeriesData};
};
