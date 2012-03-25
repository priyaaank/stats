$(document).ready(function() {
  var Plotter = new Graph.Plotter();
  Plotter.plot("graph");
  setInterval(periodicRefresh, 100);

  function periodicRefresh() {
    Plotter.refresh();
  }
});

