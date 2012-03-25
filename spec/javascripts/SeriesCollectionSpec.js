describe("Graph.SeriesCollection", function() {

  var seriesCollection, points, series;

  beforeEach(function() {
    points = [new Graph.Point(1,2), new Graph.Point(3,4)];
    series = new Graph.Series("test_series")
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
    secondSeries = new Graph.Series("new_series");
    secondSeries.add(new Graph.Point(10,12));
    seriesCollection.add(secondSeries);

    expect(seriesCollection.data()).toEqual([[[1,2],[3,4]],[[10,12]]]);
  });

});
