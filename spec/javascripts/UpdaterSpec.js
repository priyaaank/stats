describe("Graph.SeriesUpdater", function() {

  var seriesCollection = new Graph.SeriesCollection();
  var updater;

  beforeEach(function() {
    updater = new Graph.SeriesUpdater(seriesCollection);
  });

  it("should create a new queue series collection containing data", function() {
    updater.update();
    expect(seriesCollection.data()[0].length).toEqual(1);
    updater.update();
    expect(seriesCollection.data()[0].length).toEqual(2);
  });
});
