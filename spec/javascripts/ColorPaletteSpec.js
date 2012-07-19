describe("Graph.ColorPalette", function() {
  it("should return a color offset based on data size", function() {
    var data = {queue_1 : 1, queue_2 : 2}
    colorPalette = new Graph.ColorPalette(data);

    expect(colorPalette.byOffset('queue_1')).toEqual("555555")
    expect(colorPalette.byOffset('queue_2')).toEqual("aaaaaa")

  });

  it("should not return white or black as the color", function() {
    var data = {queue_1 : 1}
    colorPalette = new Graph.ColorPalette(data);

    expect(colorPalette.byOffset('queue_1')).not.toEqual("000000")
    expect(colorPalette.byOffset('queue_1')).not.toEqual("FFFFFF")
  });

  it("return meaninful colors even if the data set is large", function() {
    var data = {}
    for (i=0;i<20; i++) {data['queue_' + i] = 1}
    colorPalette = new Graph.ColorPalette(data);

    expect(colorPalette.byOffset('queue_0')).not.toEqual("c30c3")
    expect(colorPalette.byOffset('queue_0')).toEqual("0c30c3")
  });

});
