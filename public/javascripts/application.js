$(document).ready(function() {
  var Plotter = new Graph.Plotter();
  Plotter.plot("graph");
  setInterval(periodicRefresh, 1000);

  function periodicRefresh() {
    Plotter.refresh();
  }
});

