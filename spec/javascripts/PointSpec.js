describe("Graph.Point", function() {
  
  var Point;

  beforeEach(function() {
    Point = new Graph.Point(12,13);
  });

  it("should initialize with right values for x and y cordinates", function() {
    expect(Point.value()).toEqual([12,13]);
  });

});
