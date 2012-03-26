$(document).ready(function() {
  var plotter = new Graph.Plotter("graph");
  var updater = new Graph.Updater(plotter);
  setInterval(periodicRefresh, 1000);

  function periodicRefresh() {
    updater.update();
  }
});

