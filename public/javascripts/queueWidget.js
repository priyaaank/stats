$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], data2 = [], totalPoints = 300;
    function getRandomData1() {
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
    }

    function getRandomData2() {
        if (data2.length > 0)
            data2 = data2.slice(1);

        // do a random walk
        while (data2.length < totalPoints) {
            var prev = data2.length > 0 ? data2[data2.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data2.push(y);
        }

        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data2.length; ++i)
            res.push([i, data2[i]])
        return res;
    }
    // setup control widget
    var updateInterval = 30;

    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false }
    };
    var plot = $.plot($("#graph"), [ getRandomData1(), getRandomData2() ], options);

    function update() {
        plot.setData([ getRandomData1(), getRandomData2() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }

    update();
});
