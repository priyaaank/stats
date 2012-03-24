function updateGraph() {
  var options = {
    series: { shadowSize: 0 }, // drawing is faster without shadows
    yaxis: { min: 0, max: 100 },
    xaxis: { show: true, mode: "time" , timeformat: "%y/%0m/%0d"}
  };
  $.plot($("#graph"), [ [["2011/12/12", 0], ["2011/12/18", 10]], [["2012/01/01",0],["2012/01/23",25]], [["2012/01/29",0],["2012/04/28",100]] ], options);
};

    function getRandomData() {
      var data = [], totalPoints = 300;
        if (data.length > 0)
            data = data.slice(1);

        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    };

$(document).ready(function() {
  updateGraph();
});
