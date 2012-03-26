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

Graph.Plotter = function(elementId) {

  var seriesCollection = new Graph.SeriesCollection();
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
      url     : "http://localhost:9393/sqs.json",
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
