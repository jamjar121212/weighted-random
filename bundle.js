(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function WeightedRandom() {
};

/*
    generate a uniform distribution of equal weights.
    numberOfEntries should be an integer of the number of weights needed
*/
WeightedRandom.prototype.generateUniformWeightDistribution = function (numberOfWeightsRequired) {
    var weights = [];
    for (var i = 0; i < numberOfWeightsRequired; i++) {
        weights.push(1);
    }
    this.normaliseWeights(weights);
    return weights;
};

/*
    normal pdf: 1 / (sqrt( 2*(sd^2)*pi ) )
*/
WeightedRandom.prototype.generateNormalWeightDistribution = function (numberOfWeightsRequired) {
    var weights = [];

    var e = 2.71828;
    var pi = Math.PI;

    var sqrt = Math.sqrt;
    var pow = Math.pow;

    var mean = 0.5;
    var sd = 7;
    var sd2 = sd * sd;

    var normal = function(x) {
        var base = 1 / sqrt(2 * sd2 * pi);
        var exponent1 = e;
        var exponent2 = -( pow(x - mean, 2) / 2 * sd2 ) ;
        return pow(base, pow(exponent1, exponent2));
    };

    for (var i = 0; i < numberOfWeightsRequired; i++) {
        var samplePosition = i / numberOfWeightsRequired;
        weights.push( 1 - normal(samplePosition) );
    }

    this.normaliseWeights(weights);

    return weights;
};

/*
    Correct the weights array so all weights sum to 1.
    operate on the original array to avoid creating new objects.
*/
WeightedRandom.prototype.normaliseWeights = function (weights) {
    var totalWeight = 0;
    var i;
    // calculate total weight to use for correction
    for (i = 0; i < weights.length; i++) {
        totalWeight += weights[i];
    }

    // normalise each weight
    for (i = 0; i < weights.length; i++) {
        weights[i] = weights[i] / totalWeight;
    }
};

WeightedRandom.prototype.random = function (weights) {
    var targetWeight = Math.random();

    var currentIndex = 0;
    var cumulativeWeight = 0;

    while (cumulativeWeight + weights[currentIndex] < targetWeight) {
        cumulativeWeight += weights[currentIndex];
        currentIndex++;
    }

    return currentIndex;
};

module.exports = new WeightedRandom();

},{}],2:[function(require,module,exports){

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

},{"./WeightedRandom":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIldlaWdodGVkUmFuZG9tLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gV2VpZ2h0ZWRSYW5kb20oKSB7XG59O1xuXG4vKlxuICAgIGdlbmVyYXRlIGEgdW5pZm9ybSBkaXN0cmlidXRpb24gb2YgZXF1YWwgd2VpZ2h0cy5cbiAgICBudW1iZXJPZkVudHJpZXMgc2hvdWxkIGJlIGFuIGludGVnZXIgb2YgdGhlIG51bWJlciBvZiB3ZWlnaHRzIG5lZWRlZFxuKi9cbldlaWdodGVkUmFuZG9tLnByb3RvdHlwZS5nZW5lcmF0ZVVuaWZvcm1XZWlnaHREaXN0cmlidXRpb24gPSBmdW5jdGlvbiAobnVtYmVyT2ZXZWlnaHRzUmVxdWlyZWQpIHtcbiAgICB2YXIgd2VpZ2h0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZXZWlnaHRzUmVxdWlyZWQ7IGkrKykge1xuICAgICAgICB3ZWlnaHRzLnB1c2goMSk7XG4gICAgfVxuICAgIHRoaXMubm9ybWFsaXNlV2VpZ2h0cyh3ZWlnaHRzKTtcbiAgICByZXR1cm4gd2VpZ2h0cztcbn07XG5cbi8qXG4gICAgbm9ybWFsIHBkZjogMSAvIChzcXJ0KCAyKihzZF4yKSpwaSApIClcbiovXG5XZWlnaHRlZFJhbmRvbS5wcm90b3R5cGUuZ2VuZXJhdGVOb3JtYWxXZWlnaHREaXN0cmlidXRpb24gPSBmdW5jdGlvbiAobnVtYmVyT2ZXZWlnaHRzUmVxdWlyZWQpIHtcbiAgICB2YXIgd2VpZ2h0cyA9IFtdO1xuXG4gICAgdmFyIGUgPSAyLjcxODI4O1xuICAgIHZhciBwaSA9IE1hdGguUEk7XG5cbiAgICB2YXIgc3FydCA9IE1hdGguc3FydDtcbiAgICB2YXIgcG93ID0gTWF0aC5wb3c7XG5cbiAgICB2YXIgbWVhbiA9IDAuNTtcbiAgICB2YXIgc2QgPSA3O1xuICAgIHZhciBzZDIgPSBzZCAqIHNkO1xuXG4gICAgdmFyIG5vcm1hbCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgdmFyIGJhc2UgPSAxIC8gc3FydCgyICogc2QyICogcGkpO1xuICAgICAgICB2YXIgZXhwb25lbnQxID0gZTtcbiAgICAgICAgdmFyIGV4cG9uZW50MiA9IC0oIHBvdyh4IC0gbWVhbiwgMikgLyAyICogc2QyICkgO1xuICAgICAgICByZXR1cm4gcG93KGJhc2UsIHBvdyhleHBvbmVudDEsIGV4cG9uZW50MikpO1xuICAgIH07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mV2VpZ2h0c1JlcXVpcmVkOyBpKyspIHtcbiAgICAgICAgdmFyIHNhbXBsZVBvc2l0aW9uID0gaSAvIG51bWJlck9mV2VpZ2h0c1JlcXVpcmVkO1xuICAgICAgICB3ZWlnaHRzLnB1c2goIDEgLSBub3JtYWwoc2FtcGxlUG9zaXRpb24pICk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3JtYWxpc2VXZWlnaHRzKHdlaWdodHMpO1xuXG4gICAgcmV0dXJuIHdlaWdodHM7XG59O1xuXG4vKlxuICAgIENvcnJlY3QgdGhlIHdlaWdodHMgYXJyYXkgc28gYWxsIHdlaWdodHMgc3VtIHRvIDEuXG4gICAgb3BlcmF0ZSBvbiB0aGUgb3JpZ2luYWwgYXJyYXkgdG8gYXZvaWQgY3JlYXRpbmcgbmV3IG9iamVjdHMuXG4qL1xuV2VpZ2h0ZWRSYW5kb20ucHJvdG90eXBlLm5vcm1hbGlzZVdlaWdodHMgPSBmdW5jdGlvbiAod2VpZ2h0cykge1xuICAgIHZhciB0b3RhbFdlaWdodCA9IDA7XG4gICAgdmFyIGk7XG4gICAgLy8gY2FsY3VsYXRlIHRvdGFsIHdlaWdodCB0byB1c2UgZm9yIGNvcnJlY3Rpb25cbiAgICBmb3IgKGkgPSAwOyBpIDwgd2VpZ2h0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0b3RhbFdlaWdodCArPSB3ZWlnaHRzW2ldO1xuICAgIH1cblxuICAgIC8vIG5vcm1hbGlzZSBlYWNoIHdlaWdodFxuICAgIGZvciAoaSA9IDA7IGkgPCB3ZWlnaHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHdlaWdodHNbaV0gPSB3ZWlnaHRzW2ldIC8gdG90YWxXZWlnaHQ7XG4gICAgfVxufTtcblxuV2VpZ2h0ZWRSYW5kb20ucHJvdG90eXBlLnJhbmRvbSA9IGZ1bmN0aW9uICh3ZWlnaHRzKSB7XG4gICAgdmFyIHRhcmdldFdlaWdodCA9IE1hdGgucmFuZG9tKCk7XG5cbiAgICB2YXIgY3VycmVudEluZGV4ID0gMDtcbiAgICB2YXIgY3VtdWxhdGl2ZVdlaWdodCA9IDA7XG5cbiAgICB3aGlsZSAoY3VtdWxhdGl2ZVdlaWdodCArIHdlaWdodHNbY3VycmVudEluZGV4XSA8IHRhcmdldFdlaWdodCkge1xuICAgICAgICBjdW11bGF0aXZlV2VpZ2h0ICs9IHdlaWdodHNbY3VycmVudEluZGV4XTtcbiAgICAgICAgY3VycmVudEluZGV4Kys7XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFdlaWdodGVkUmFuZG9tKCk7XG4iLCJcbmNvbnNvbGUubG9nKFwidGVzdFwiKTtcblxudmFyIFdlaWdodGVkUmFuZG9tID0gcmVxdWlyZSgnLi9XZWlnaHRlZFJhbmRvbScpO1xuXG5nb29nbGUuY2hhcnRzLmxvYWQoJ2N1cnJlbnQnLCB7J3BhY2thZ2VzJzpbJ2NvcmVjaGFydCddfSk7XG5cbi8vIFNldCBhIGNhbGxiYWNrIHRvIHJ1biB3aGVuIHRoZSBHb29nbGUgVmlzdWFsaXphdGlvbiBBUEkgaXMgbG9hZGVkLlxuZ29vZ2xlLmNoYXJ0cy5zZXRPbkxvYWRDYWxsYmFjayhkcmF3Q2hhcnQpO1xuXG4vLyBDYWxsYmFjayB0aGF0IGNyZWF0ZXMgYW5kIHBvcHVsYXRlcyBhIGRhdGEgdGFibGUsXG4vLyBpbnN0YW50aWF0ZXMgdGhlIHBpZSBjaGFydCwgcGFzc2VzIGluIHRoZSBkYXRhIGFuZFxuLy8gZHJhd3MgaXQuXG5mdW5jdGlvbiBkcmF3Q2hhcnQoKSB7XG5cbiAgICB2YXIgd2VpZ2h0cyA9IFtdO1xuICAgIHZhciBjZWxsQ291bnQgPSA4MDtcbiAgICB2YXIgbmVpZ2hib3VycyA9IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTEsIDEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjBdO1xuXG4gICAgLy8gd2VpZ2h0cyA9IFdlaWdodGVkUmFuZG9tLmdlbmVyYXRlVW5pZm9ybVdlaWdodERpc3RyaWJ1dGlvbig4MCk7XG4gICAgd2VpZ2h0cyA9IFdlaWdodGVkUmFuZG9tLmdlbmVyYXRlTm9ybWFsV2VpZ2h0RGlzdHJpYnV0aW9uKDgwKTtcblxuICAgIC8vIHZhciBuZWlnaGJvdXJXZWlnaHRNdWx0aXBsaWVyID0gMDtcblxuICAgIC8vIGZvciAodmFyIGNlbGwgPSAwOyBjZWxsIDwgY2VsbENvdW50OyBjZWxsKyspIHtcbiAgICAvLyAgICAgLy8gbmVpZ2hib3VyIGJhc2VkIHdlaWdodGluZ1xuICAgIC8vICAgICBpZiAobmVpZ2hib3Vycy5pbmRleE9mKGNlbGwpICE9PSAtMSkge1xuICAgIC8vICAgICAgICAgd2VpZ2h0cy5wdXNoKG5laWdoYm91cldlaWdodE11bHRpcGxpZXIpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgd2VpZ2h0cy5wdXNoKDEpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gV2VpZ2h0ZWRSYW5kb20ubm9ybWFsaXNlV2VpZ2h0cyh3ZWlnaHRzKTtcblxuICAgIHRvdGFsV2VpZ2h0ID0gd2VpZ2h0cy5yZWR1Y2UoZnVuY3Rpb24odG90YWxXZWlnaHQsIHdlaWdodCkge1xuICAgICAgICByZXR1cm4gdG90YWxXZWlnaHQgKyB3ZWlnaHQ7XG4gICAgfSwgMCk7XG4gICAgY29uc29sZS5sb2coXCJjb3JyZWN0ZWRXZWlnaHQ6XCIsIHRvdGFsV2VpZ2h0KTtcblxuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIG51bWJlck9mVGVzdHMgPSAxMDAwMDAwO1xuICAgIGZvciAodmFyIHRlc3QgPSAwOyB0ZXN0IDwgbnVtYmVyT2ZUZXN0czsgdGVzdCsrKSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChXZWlnaHRlZFJhbmRvbS5yYW5kb20od2VpZ2h0cykpO1xuICAgIH1cblxuICAgIHZhciByZWR1Y2VkUmVzdWx0cyA9IHJlc3VsdHMucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdHNPYmplY3QsIHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0c09iamVjdFtyZXN1bHRdKSB7XG4gICAgICAgICAgICByZXN1bHRzT2JqZWN0W3Jlc3VsdF0gKz0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHNPYmplY3RbcmVzdWx0XSA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHNPYmplY3Q7XG4gICAgfSwge30pO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBkYXRhIHRhYmxlLlxuICAgIHZhciBkYXRhID0gbmV3IGdvb2dsZS52aXN1YWxpemF0aW9uLkRhdGFUYWJsZSgpO1xuICAgIGRhdGEuYWRkQ29sdW1uKCdzdHJpbmcnLCAnSW5kZXgnKTtcbiAgICBkYXRhLmFkZENvbHVtbignbnVtYmVyJywgJ051bWJlciBPZiBIaXRzJyk7XG4gICAgT2JqZWN0LmtleXMocmVkdWNlZFJlc3VsdHMpLmZvckVhY2goZnVuY3Rpb24ocmVzdWx0S2V5KSB7XG4gICAgICAgIGRhdGEuYWRkUm93KFtyZXN1bHRLZXksIHJlZHVjZWRSZXN1bHRzW3Jlc3VsdEtleV1dKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCBjaGFydCBvcHRpb25zXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICd0aXRsZSc6J1JhbmRvbSBSZXN1bHRzJyxcbiAgICAgICAgJ3dpZHRoJzo4MDAsXG4gICAgICAgICdoZWlnaHQnOjYwMCxcbiAgICAgICAgdkF4aXM6IHtcbiAgICAgICAgICAgIG1pblZhbHVlOiAwLFxuICAgICAgICB9LFxuICAgICAgICBleHBsb3Jlcjoge1xuICAgICAgICAgICAgYWN0aW9uczogWydkcmFnVG9ab29tJywgJ3JpZ2h0Q2xpY2tUb1Jlc2V0J11cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBJbnN0YW50aWF0ZSBhbmQgZHJhdyBvdXIgY2hhcnQsIHBhc3NpbmcgaW4gc29tZSBvcHRpb25zLlxuICAgIHZhciBjaGFydCA9IG5ldyBnb29nbGUudmlzdWFsaXphdGlvbi5Db2x1bW5DaGFydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhcnRfZGl2JykpO1xuICAgIGNoYXJ0LmRyYXcoZGF0YSwgb3B0aW9ucyk7XG59XG4iXX0=
