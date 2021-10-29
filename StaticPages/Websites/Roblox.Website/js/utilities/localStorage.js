var Roblox = Roblox || {};

Roblox.LocalStorage = function () {
    function isAvailable() {
        var validation = "localstorage_validation_test";
        try {
            localStorage.setItem(validation, validation);
            localStorage.removeItem(validation);
            return true;
        } catch (e) {
            return false;
        }
    }

    function removeFromLocalStorage(key) {
        localStorage.removeItem(key);
    }

    function setItemWithExpiry(key, value, expiryInMs) {
        var currentTime = new Date().getTime();
        var existingItem = JSON.parse(localStorage.getItem(key));
        if (!existingItem) {
            existingItem = {};
        }
        existingItem["value"] = value;
        existingItem["expiryTimestamp"] = currentTime + expiryInMs;
        localStorage.setItem(key, JSON.stringify(existingItem));
    }

    function getItemWithExpiry(key) {
        var currentTimeStamp = new Date().getTime();
        var existingItem = JSON.parse(localStorage.getItem(key));
        if (existingItem && existingItem["expiryTimestamp"]) {
            var itemExpiryTimeStamp = existingItem["expiryTimestamp"];
            if (currentTimeStamp < itemExpiryTimeStamp) {
                return existingItem["value"];
            }
            // item is now expired, remove it
            localStorage.removeItem(key);
        }
        return null;
    }

    return {
        isAvailable: isAvailable,
        removeFromLocalStorage: removeFromLocalStorage,
        setItemWithExpiry: setItemWithExpiry,
        getItemWithExpiry: getItemWithExpiry
    }
}();