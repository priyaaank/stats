describe("Graph.Point", function() {
  
  var Point;

  beforeEach(function() {
    Point = Graph.Point;
  });

  it("should initialize with right values for x and y cordinates", function() {
    var newPoint = Point.new(12, 13);
    expect(newPoint.value()).toEqual([12,13]);
  });

});
