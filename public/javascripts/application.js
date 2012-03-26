$(document).ready(function() {
  var plotter = new Graph.Plotter("graph");
  var updater = new Graph.Updater(plotter);
  //make first call manually
  updater.update();
  setInterval(periodicRefresh, 15000);

  function periodicRefresh() {
    updater.update();
  }
});

