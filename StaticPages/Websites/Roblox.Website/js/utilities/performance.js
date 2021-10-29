Roblox = Roblox || {};

Roblox.Performance = (function () {
    var timing;
    var categoryName = "Performance";
    var pageName;
    var performanceElement;
    var uiPerformanceElement;
    var measureAgainstName = "navigationStart";

    function isPerformanceLibValid() {
        return ('performance' in window)
            && ('timing' in window.performance)
            && ('navigation' in window.performance)
            && ('measure' in window.performance);
    }

    function isUiPerformanceTrackingInDiagEnabled() {
        uiPerformanceElement = $('meta[name="performance"]');
        if (!uiPerformanceElement) {
            return false;
        }
        var performanceRelativeValue = uiPerformanceElement.data("ui-performance-relative-value");
        return Math.random() < performanceRelativeValue && isPerformanceLibValid();
    }

    function isPerformanceEnabled() {
        var performanceRelativeValue = performanceElement.data("performance-relative-value");
        return Math.random() < performanceRelativeValue && isPerformanceLibValid();
    }

    function isEventStreamEnabled() {
        var eventStreamPercentage = performanceElement.data("send-event-percentage");
        // Math.random() can return 0, so do a separate check to see if the feature is 'off'
        return Roblox.EventStream && eventStreamPercentage && eventStreamPercentage != 0 && Math.random() < eventStreamPercentage
            && isPerformanceLibValid();
    }

    function setPageName() {
        if (typeof pageName === "undefined") {
            pageName = performanceElement.data("internal-page-name");
        }
    }

    function setTiming() {
        if (typeof timing === "undefined" && window.performance) {
            timing = window.performance.timing;
        }
    }

    function getArgs(category, action, label, value) {
        var args = [];
        args.push(category);
        args.push(action);
        args.push(label);
        value = Math.floor(value);
        args.push(value);
        return args;
    }

    function fireGAEvent(category, action, label, value) {
        if (Roblox.GaEventSettings.gaPerformanceEventEnabled) {
            if (typeof GoogleAnalyticsEvents != "undefined" && value > 0) {
                var args = getArgs(category, action, label, value);
                GoogleAnalyticsEvents.FireEvent(args);
            }
        }
    }

    function getMarkName(eventLabel, measureAgainst) {
        if (typeof measureAgainst === "undefined") {
            measureAgainst = measureAgainstName;
        }
        return measureAgainst + ":" + eventLabel;
    }

    function getMeasureName(eventLabel) {
        return eventLabel + "_measure";
    }

    function setPerformanceMark(eventLabel, measureAgainst) {
        if (window.performance && typeof window.performance.mark === "function") {
            var markName = getMarkName(eventLabel, measureAgainst);
            window.performance.mark(markName);
        }
    }

    function setMeasureTimeByMark(markName) {
        var parsedMark = markName.split(':');
        var measureAgainst = parsedMark[0];
        var eventLabel = parsedMark[1];
        if (parsedMark.length > 2) {
            eventLabel = parsedMark[2] + ":" + eventLabel;
        }
        window.performance.measure(getMeasureName(eventLabel), measureAgainst, markName);
    }

    function getPerformanceMarks() {
        if (typeof window.performance.getEntriesByType === "function") {
            var marks = window.performance.getEntriesByType("mark");
            if (marks && marks.length > 0) {
                for (var i = 0; i < marks.length; i++) {
                    var mark = marks[i];
                    setMeasureTimeByMark(mark.name);
                }
            }
        }
    }

    function getSinglePerformanceMeasure(maskName) {
        var result = [];
        if (typeof window.performance.getEntriesByName === "function") {
            var measures = window.performance.getEntriesByName(maskName);
            if (measures && measures.length > 0) {
                for (var i = 0; i < measures.length; i++) {
                    var measure = measures[i];
                    var obj = {};
                    obj.name = measure.name;
                    obj.duration = Math.floor(measure.duration);
                    result.push(obj);
                }
            }
        }
        return result;
    }

    function getPageLoadMeasure() {
        if (timing && timing.domComplete && timing.navigationStart) {
            var duration = Math.floor(timing.domComplete - timing.navigationStart);
            if (duration > 0) {
                return {
                    name: "PageLoad",
                    duration: duration
                }
            }
        }
        return null;
    }

    function getFirstByteMeasure() {
        if (timing && timing.responseEnd && timing.navigationStart) {
            var duration = Math.floor(timing.responseEnd - timing.navigationStart);
            if (duration > 0 && duration.toString().length < 6) {
                return {
                    name: "FirstByte",
                    duration: duration
                }
            }
        }
        return null;
    }

    function getPerformanceMeasures() {
        var result = [];

        var pageLoadMeasure = getPageLoadMeasure();
        if (pageLoadMeasure) {
            result.push(pageLoadMeasure);
        }

        var firstByteMeasure = getFirstByteMeasure();
        if (firstByteMeasure) {
            result.push(firstByteMeasure);
        }

        if (typeof window.performance.getEntriesByType === "function") {
            var measures = window.performance.getEntriesByType("measure");
            if (measures && measures.length > 0) {
                for (var i = 0; i < measures.length; i++) {
                    var measure = measures[i];
                    var obj = {};
                    obj.name = measure.name;
                    obj.duration = Math.floor(measure.duration);
                    result.push(obj);
                }
            }
        }
        return result;
    }

    function sendPerformanceMeasuresToGoogleAnalytics(measures) {
        if (measures && measures.length > 0) {
            for (var i = 0; i < measures.length; i++) {
                var measure = measures[i];
                fireGAEvent(categoryName, pageName, measure.name, measure.duration);
            }
        }
    }

    function sendPerformanceMeasuresToEventStream(measures) {
        if (measures && measures.length > 0) {
            var params = {};
            for (var i = 0; i < measures.length; i++) {
                params[measures[i].name] = measures[i].duration;
            }
            Roblox.EventStream.SendEventWithTarget("pagePerformance", pageName, params, Roblox.EventStream.TargetTypes.WWW);
        }
    }


    function logPerformanceToDiag() {
        if (isUiPerformanceTrackingInDiagEnabled()) {
            var measurements = [];
            var endpoint = uiPerformanceElement.data("ui-performance-endpoint");
            var pageLoadMeasure = getPageLoadMeasure();
            if (pageLoadMeasure) {
                measurements.push(pageLoadMeasure);
                if (measurements.length > 0) {
                    for (var i = 0; i < measurements.length; i++) {
                        var measurement = measurements[i];
                        var data = {
                            featureName: pageName,
                            measureName: measurement.name,
                            value: measurement.duration
                        }
                        $.ajax({
                            type: "POST",
                            url: endpoint,
                            data: data,
                            crossDomain: true,
                            xhrFields: {
                                withCredentials: true
                            }
                        });
                    }
                }
            }
        }
    }

    function logSinglePerformanceMark(eventLabel) {
        if (performanceElement && isPerformanceLibValid()) {

            if (typeof pageName !== "undefined") {
                setPerformanceMark(eventLabel);
                var markName = getMarkName(eventLabel);
                setMeasureTimeByMark(markName);
                var measureName = getMeasureName(eventLabel);
                var measures = getSinglePerformanceMeasure(measureName);

                if (isPerformanceEnabled()) {
                    sendPerformanceMeasuresToGoogleAnalytics(measures);
                }
                if (isEventStreamEnabled()) {
                    sendPerformanceMeasuresToEventStream(measures);
                }
            }
        }
    }

    function logPerformance() {
        if (performanceElement && isPerformanceLibValid()) {
            if (typeof pageName !== "undefined") {
                getPerformanceMarks();
                var measures = getPerformanceMeasures();

                if (isPerformanceEnabled()) {
                    sendPerformanceMeasuresToGoogleAnalytics(measures);
                }
                if (isEventStreamEnabled()) {
                    sendPerformanceMeasuresToEventStream(measures);
                }
            }
        }
    }

    function setPageElement() {
        performanceElement = $("#rbx-body");
    }

    $(window).load(function () {
        setPageElement();
        setTiming();
        setPageName();
        logPerformance();
        logPerformanceToDiag();
    });

    return {
        setPageElement: setPageElement,
        setTiming: setTiming,
        setPageName: setPageName,
        setPerformanceMark: setPerformanceMark,
        logSinglePerformanceMark: logSinglePerformanceMark,
        logPerformance: logPerformance
    }
})();