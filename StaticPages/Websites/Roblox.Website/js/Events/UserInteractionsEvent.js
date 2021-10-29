if (typeof (Roblox) === "undefined") {
    Roblox = {};
}

if (typeof (Roblox.UserInteractionsEvent) === "undefined") {
    Roblox.UserInteractionsEvent = (function() {
        var eventList = "mousemove touchstart";

        var fireEventStreamEvent = function(context)
        {
            if (!Roblox.EventStream || !Roblox.EventStream.isInitialized || !Roblox.EventStream.isInitialized()) {
                return false;
            }

            Roblox.EventStream.SendEvent("userInteractions", context, {});
            return true;
        }
        
        var sendEvent = function(event) {
            if (event.type === "mousemove") {
                if (!fireEventStreamEvent("mouse")) {
                    return;
                }
            } else {
                if (!fireEventStreamEvent("touch")) {
                    return;
                }
            }

            $.each(eventList.split(" "), function(i, eventName) {
                $(document).off(eventName, null, sendEvent);
            });
        }

        var init = function () {
            $(document).on(eventList, sendEvent);
        }

        return {
            Init: init
        }

    })();

    Roblox.UserInteractionsEvent.Init();
}