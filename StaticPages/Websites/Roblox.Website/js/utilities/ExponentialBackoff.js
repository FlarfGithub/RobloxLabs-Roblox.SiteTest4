if (typeof Roblox === "undefined") {
    Roblox = {};
}
if (typeof Roblox.Utilities === "undefined") {
    Roblox.Utilities = {};
}

Roblox.Utilities.ExponentialBackoff = function (regularBackoffSpecification, fastBackoffPredicate, fastBackoffSpecification) {
    var self = this;

    var attemptCount = 0;
    var fastBackoffEnabled = false;
    var latestResetTime = null;

    function startNewAttempt() {
        enableFastBackoffIfConditionsMet();
        var delay = getDelay();
        attemptCount++;
        return delay;
    }

    function reset () {
        attemptCount = 0;
        latestResetTime = new Date().getTime();
        fastBackoffEnabled = false;
    }

    function getReconnectCount() {
        return attemptCount;
    }

    function getLastResetTime() {
        return latestResetTime;
    }

    function enableFastBackoffIfConditionsMet() {
        if (attemptCount === 0 && fastBackoffPredicate && fastBackoffPredicate(self)) {
            fastBackoffEnabled = true;
        }
    }

    function getDelay() {
        var spec = getSpec();

        if (attemptCount === 0) {
            var rawDelay = spec.FirstAttemptDelay();
            return rawDelay + getRandomness(rawDelay, spec.FirstAttemptRandomnessFactor());
        } else {
            var base = spec.SubsequentDelayBase();
            var rawDelay = base * Math.pow(2, attemptCount - 1);
            if (rawDelay > spec.MaximumDelayBase()) {
                rawDelay = spec.MaximumDelayBase();
            }
            return rawDelay + getRandomness(rawDelay, spec.SubsequentDelayRandomnessFactor());
        }
    };

    function getRandomness(base, additionalRandomnessFactor) {
        return Math.floor((Math.random() * (base * additionalRandomnessFactor)));
    }

    function getSpec() {
        if (fastBackoffEnabled && fastBackoffSpecification) {
            return fastBackoffSpecification;
        } else {
            return regularBackoffSpecification;
        }
    }
    
    self.StartNewAttempt = startNewAttempt;
    self.Reset = reset;
    self.GetAttemptCount = getReconnectCount;
    self.GetLastResetTime = getLastResetTime;
};
