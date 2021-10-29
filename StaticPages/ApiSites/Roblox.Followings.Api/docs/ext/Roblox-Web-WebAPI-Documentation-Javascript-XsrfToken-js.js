if (typeof Roblox == "undefined") {
    Roblox = {};
}

Roblox.XsrfToken = (function () {
    var xsrfRequestMethods = ["POST", "PATCH", "DELETE"];
    var currentToken = "";
    var csrfTokenHeader = "X-CSRF-TOKEN";
    var csrfInvalidResponseCode = 403;

    $(document).ajaxSend(function (event, jqxhr, settings) {
        // Send CSRF if in our own domain and is a method that requires it
        if (currentToken !== "" && xsrfRequestMethods.indexOf(settings.type.toUpperCase()) >= 0) {
            jqxhr.setRequestHeader("X-CSRF-TOKEN", currentToken);
        }
    });

    $.ajaxPrefilter(function (options, originalOptions, jqxhr) {
        if (options.dataType == "jsonp" || options.dataType == "script") {
            // these are most likely remote requests, don't set an error handler
            return;
        }
        var oldErrorHandler = options.error;
        options.error = function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == csrfInvalidResponseCode && jqXHR.getResponseHeader(csrfTokenHeader) != null) {
                // this was a token failure
                // reissue the XHR with the returned token
                var newToken = jqXHR.getResponseHeader(csrfTokenHeader);
                if (newToken == null) {
                    if (typeof oldErrorHandler == "function") {
                        oldErrorHandler(jqXHR, textStatus, errorThrown);
                    }
                    throw new Error("Null token returned by Xsrf enabled handler");
                }
                currentToken = newToken;
                $.ajax(options);
            } else if (typeof oldErrorHandler == "function") {
                oldErrorHandler(jqXHR, textStatus, errorThrown);
            }
         };
    });

    function setToken(token) {
        currentToken = token;
    }

    function getToken() {
        return currentToken;
    }

    var my = {
        setToken: setToken,
        getToken: getToken,
    };

    return my;
})();
