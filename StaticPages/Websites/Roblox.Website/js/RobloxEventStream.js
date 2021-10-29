//Please note: 
//In Regular Mode this file depends on RobloxCookies.js being already loaded
//In Service Worker Mode: this file depends on Fetch.js
if (typeof Roblox === 'undefined') {
    Roblox = {};
}

if (typeof Roblox.EventStream === 'undefined') {
    Roblox.EventStream = function () {
        var targetTypes = {
            DEFAULT: 0,
            WWW: 1,
            STUDIO: 2,
            DIAGNOSTIC: 3
        }

        var defaultUri, wwwUri, studioUri, diagnosticUri;

        var serviceWorkerMode = false;

        var excludeQueryStringFromUrl = false;

        var initFinished = false;

        /// Sets the EventStream object to run in Service Worker mode. This mode has no
        /// dependencies on jQuery or access to a page or DOM
        function setServiceWorkerMode() {
            serviceWorkerMode = true;
        }

        function setExcludeQueryStringFromUrl(value) {
            excludeQueryStringFromUrl = value;
        }
        
        function getEventParameters(eventName, context) {
            var url;
            if(!serviceWorkerMode) {
                url = window.location.href;
            } else {
                url = this.location.href;
            }

            if (url && excludeQueryStringFromUrl) {
                var indexOfQuestionMark = url.indexOf('?');

                if (indexOfQuestionMark > -1) {
                    url = url.slice(0, indexOfQuestionMark);
                }
            }

            var defaultParams = {
                evt: eventName,
                ctx: context,
                //Will be encoded later by $.param
                url: url,
                lt: new Date().toISOString()
            };

            if(!serviceWorkerMode) {
                var guestId = Roblox.Cookies.getGuestId();
                if (guestId) {
                    defaultParams["gid"] = guestId;
                }

                var sessionId = Roblox.Cookies.getSessionId();
                if (sessionId) {
                    defaultParams["sid"] = sessionId;
                }
            }

            return defaultParams;
        }

        function sendEventWithTarget(eventName, context, additionalProperties, targetType) {
            var baseUrl = "";
            switch (targetType) {
                case targetTypes.DEFAULT:
                    baseUrl = defaultUri;
                    break;
                case targetTypes.WWW:
                    baseUrl = wwwUri;
                    break;
                case targetTypes.STUDIO:
                    baseUrl = studioUri;
                    break;
                case targetTypes.DIAGNOSTIC:
                    baseUrl = diagnosticUri;
                    break;
            }

            // Only default target type is currently supported in service worker mode
            if(serviceWorkerMode && targetType !== targetTypes.DEFAULT) {
                throw "TargetType '" + targetType + "' is not supported in Service Worker mode";
            }

            if (!eventName || !context || baseUrl === "") {
                return;
            }
            var defaultParams = getEventParameters(eventName, context);
            
            var url = baseUrl;
            if (baseUrl && baseUrl.indexOf("?") === -1) {
                url += "?";
            }
            else {
                url += "&";
            }

            if(!serviceWorkerMode) {
                //please do not modify the default parameters.
                $.extend(additionalProperties, defaultParams);
                url += $.param(additionalProperties);

                //use Image to get around CORS
                var img = new Image();
                img.src = url;
            } else {
                //please do not modify the default parameters.
                extend(additionalProperties, defaultParams);
                url += toQueryStringParams(additionalProperties);
                Roblox.Fetch.getWithNoCredentials(url);
            }

            // DO NOT CHANGE the order of how the params are pushed.
            // Analytics uses regular expressions on few events and changing the order will have effect on numbers.
            my.LocalEventLog.push({ eventName: eventName, context: context, additionalProperties: additionalProperties });
        }

        function sendEvent(eventName, context, additionalProperties) {
            return sendEventWithTarget(eventName, context, additionalProperties, targetTypes.DEFAULT);
        }

        function isInitialized() {
            return initFinished;
        }

        function init(defaulturl, www, studio, diagnostic) {
            defaultUri = defaulturl;
            wwwUri = www;
            studioUri = studio;
            diagnosticUri = diagnostic;
            initFinished = true;
        }

        function extend(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }

        function toQueryStringParams(source) {
            var array = [];
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
                }
            }
            return array.join("&");
        }

        var my = {
            Init: init,
            isInitialized: isInitialized,
            SendEvent: sendEvent,
            SendEventWithTarget: sendEventWithTarget,
            LocalEventLog: [],
            TargetTypes: targetTypes,
            SetServiceWorkerMode: setServiceWorkerMode,
            SetExcludeQueryStringFromUrl: setExcludeQueryStringFromUrl
        };
        return my;
    }();
}