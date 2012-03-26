describe("Graph.Updater", function() {

  var plotter = new Graph.Plotter();
  var updater;

  beforeEach(function() {
    updater = new Graph.Updater(plotter);
  });

  it("should create a new queue series collection containing data", function() {
    // spyOn(plotter, 'plot');
    // spyOn($, 'ajax').andReturn({"abcd" : 20});
    // updater.update();
    // expect(plotter.plot).toHaveBeenCalled();
  });
});
