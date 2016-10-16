
console.log("test");

var WeightedRandom = require('./WeightedRandom');

google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    var weights = [];
    var cellCount = 80;
    var neighbours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    // weights = WeightedRandom.generateUniformWeightDistribution(80);
    weights = WeightedRandom.generateNormalWeightDistribution(80);

    // var neighbourWeightMultiplier = 0;

    // for (var cell = 0; cell < cellCount; cell++) {
    //     // neighbour based weighting
    //     if (neighbours.indexOf(cell) !== -1) {
    //         weights.push(neighbourWeightMultiplier);
    //     } else {
    //         weights.push(1);
    //     }
    // }

    // WeightedRandom.normaliseWeights(weights);

    totalWeight = weights.reduce(function(totalWeight, weight) {
        return totalWeight + weight;
    }, 0);
    console.log("correctedWeight:", totalWeight);

    var results = [];
    var numberOfTests = 1000000;
    for (var test = 0; test < numberOfTests; test++) {
        results.push(WeightedRandom.random(weights));
    }

    var reducedResults = results.reduce(function(resultsObject, result) {
        if (resultsObject[result]) {
            resultsObject[result] += 1;
        } else {
            resultsObject[result] = 1;
        }
        return resultsObject;
    }, {});

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Index');
    data.addColumn('number', 'Number Of Hits');
    Object.keys(reducedResults).forEach(function(resultKey) {
        data.addRow([resultKey, reducedResults[resultKey]]);
    });

    // Set chart options
    var options = {
        'title':'Random Results',
        'width':800,
        'height':600,
        vAxis: {
            minValue: 0,
        },
        explorer: {
            actions: ['dragToZoom', 'rightClickToReset']
        }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
