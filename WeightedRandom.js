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
