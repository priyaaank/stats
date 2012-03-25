describe("Graph.Series", function() {

  var series, points, point = Graph.Point(7,8);

  beforeEach(function() {
    points = [];
    $([[1,2],[3,4],[5,6]]).each(function(index, element) {
      points.push(new Graph.Point(element[0], element[1]));
    });
    points.push(point);
    series = new Graph.Series("awesome_series");
  });

  it("should initialize series with a name", function() {
    expect(series.name()).toEqual("awesome_series");
  });

  it("should add a single point object correctly", function() {
    series.add(point);
    expect(series.points()).toEqual([[7,8]]);
  });

  it("should add a single point object correctly", function() {
    series.addAll(points);
    expect(series.points()).toEqual([[1,2],[3,4],[5,6],[7,8]]);
  });

  it("should honor the max element limit for series", function() {
    fourHundredPoints = [];
    for(var i=0,j=0; i<400; i++,j++) {
      fourHundredPoints.push(new Graph.Point(i,j))
    };
    series.addAll(fourHundredPoints);
    expect(series.points().length).toEqual(300);
  });

  it("should override the maxlimit value for the graph", function() {
    seriesWithLimit = new Graph.Series("limited_series", 2);
    seriesWithLimit.addAll(points);
    expect(seriesWithLimit.points().length).toEqual(2);
    expect(seriesWithLimit.points()).toEqual([[5,6],[7,8]]);
  });

  it("should return the number of elements added in total to a series as size", function() {
    fourHundredPoints = [];
    for(var i=0,j=0; i<400; i++,j++) {
      fourHundredPoints.push(new Graph.Point(i,j))
    };
    series.addAll(fourHundredPoints);
    expect(series.total()).toEqual(400);
    expect(series.points().length).toEqual(300);
  });

});
