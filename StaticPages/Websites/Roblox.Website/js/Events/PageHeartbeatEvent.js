
if (typeof (Roblox) === "undefined") {
    Roblox = {};
}

if (typeof(Roblox.PageHeartbeatEvent) === "undefined") {
    Roblox.PageHeartbeatEvent = (function () {
        
        var streamEvent = function(heartbeatCount) {
            if (!Roblox.EventStream) {
                return;
            }

            Roblox.EventStream.SendEvent("pageHeartbeat", "heartbeat" + heartbeatCount, {});
        }

        var sendHeartbeatEvents = function (eventIntervals) {
            if (eventIntervals) {
                var i = 0;
                function sendNextEvent() {
                    if (eventIntervals.length) {
                        if (i < eventIntervals.length) {
                            var eventInterval = eventIntervals[i++];
                            setTimeout(function() {
                                streamEvent(i);
                                sendNextEvent();
                            }, eventInterval * 1000);
                        }
                    }
                }

                sendNextEvent();
            }
        }
       
        var init = function (eventIntervals) {
            sendHeartbeatEvents(eventIntervals);
        }

        return {
            Init: init
        }

    })();
}

