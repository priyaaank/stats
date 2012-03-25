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

});
