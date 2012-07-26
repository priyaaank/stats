describe("Graph.ColorPalette", function() {
  it("should return a color offset based on data size", function() {
    var data = {queue_1 : 1, queue_2 : 2}
    colorPalette = new Graph.ColorPalette(data, ["555555", "aaaaaa", "bbbbbb"]);

    expect(colorPalette.byOffset('queue_1')).toEqual("555555")
    expect(colorPalette.byOffset('queue_2')).toEqual("aaaaaa")

  });

  it("should return same colors if the data set is larger than specified colorPalette", function() {
    var data = {queue_1 : 1, queue_2: 2}
    colorPalette = new Graph.ColorPalette(data, ["aaaaaa"]);

    expect(colorPalette.byOffset('queue_1')).toEqual("aaaaaa")
    expect(colorPalette.byOffset('queue_2')).toEqual("aaaaaa")
  });

});
