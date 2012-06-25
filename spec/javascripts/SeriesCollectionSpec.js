describe("Graph.SeriesCollection", function() {

  var seriesCollection, points, series;

  beforeEach(function() {
    points = [new Graph.Point(1,2), new Graph.Point(3,4)];
    series = new Graph.Series("test_series",300,{color:"black"})
    series.addAll(points);

    seriesCollection = new Graph.SeriesCollection();
    seriesCollection.add(series);
  });

  it("should initialize and add a series correctly", function() {
    expect(seriesCollection.list()).toEqual([series]);
  });

  it("should fetch a series by it's name", function() {
    expect(seriesCollection.fetch("test_series")).toEqual(series);
  });

  it("should concatenate data of all series togather in an array and return", function() {
    seriesOne = {
      color : "black", label:"test_series",
      lines : {show:true}, points : {show:false},
      clickable : true, hoverable:true, shadowSize : 1,
      data : [[1,2],[3,4]]
    }
    seriesTwo = {
      color : "blue", label:"new_series",
      lines : {show:true}, points : {show:false},
      clickable : true, hoverable:true, shadowSize : 1,
      data : [[10,12]]
    }
    secondSeries = new Graph.Series("new_series",100, {color:"blue"});
    secondSeries.add(new Graph.Point(10,12));
    seriesCollection.add(secondSeries);

    expect(seriesCollection.data()).toEqual([seriesOne, seriesTwo]);
  });

});
