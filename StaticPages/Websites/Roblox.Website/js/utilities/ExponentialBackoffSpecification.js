if (typeof Roblox === "undefined") {
    Roblox = {};
}
if (typeof Roblox.Utilities === "undefined") {
    Roblox.Utilities = {};
}

Roblox.Utilities.ExponentialBackoffSpecification = function (options) {
    options = options || {}

    var firstAttemptDelay = typeof options.firstAttemptDelay === "number" ? options.firstAttemptDelay : 5000;
    var firstAttemptRandomnessFactor = typeof options.firstAttemptRandomnessFactor === "number" ? options.firstAttemptRandomnessFactor : 0.5;
    var subsequentDelayBase = typeof options.subsequentDelayBase === "number" ? options.subsequentDelayBase : firstAttemptDelay * 2;
    var subsequentDelayRandomnessFactor = typeof options.subsequentDelayRandomnessFactor === "number" ? options.subsequentDelayRandomnessFactor : firstAttemptRandomnessFactor;
    var maximumDelayBase = typeof options.maximumDelayBase === "number" ? options.maximumDelayBase : 5 * 60 * 1000; //five minutes

    this.FirstAttemptDelay = function () { return firstAttemptDelay; };
    this.FirstAttemptRandomnessFactor = function () { return firstAttemptRandomnessFactor; };
    this.SubsequentDelayBase = function () { return subsequentDelayBase; };
    this.SubsequentDelayRandomnessFactor = function () { return subsequentDelayRandomnessFactor; };
    this.MaximumDelayBase = function () { return maximumDelayBase; };
};