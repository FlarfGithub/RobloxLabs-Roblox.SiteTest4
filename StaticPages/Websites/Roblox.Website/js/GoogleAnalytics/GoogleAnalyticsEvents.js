var GoogleAnalyticsEvents = {
	LocalEventLog: [],
	SetCustomVar: function (index, name, value, scope) {
		if (window._gaq) {
			if (!window.GoogleAnalyticsDisableRoblox2) {
				_gaq.push(['_setCustomVar', index, name, value, scope]);
			}
			_gaq.push(['b._setCustomVar', index, name, value, scope]);
		}
	},
	FireEvent: function (args) {
		if (window._gaq) {
			if (!window.GoogleAnalyticsDisableRoblox2) {
				var eventsArray = ['_trackEvent'];
				eventsArray = eventsArray.concat(args);
				_gaq.push(eventsArray);
				GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(eventsArray));
			}
			var eventsArrayB = ['b._trackEvent'];
			eventsArrayB = eventsArrayB.concat(args);
			_gaq.push(eventsArrayB);
			GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(eventsArrayB));
		}
	},
	ViewVirtual: function (url) {
		if (window._gaq) {
			if (!window.GoogleAnalyticsDisableRoblox2) {
				var eventsArray = ['_trackPageview', url];
				window._gaq.push(eventsArray);
				GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(eventsArray));
			}

			var eventsArrayB = ['b._trackPageview', url];
			window._gaq.push(eventsArrayB);
			GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(eventsArrayB));
		}
	},
	TrackTransaction: function (orderId, priceTotal) {
		if (window._gaq) {
			var transArray = ['_addTrans', orderId, 'Roblox', priceTotal, '0', '0', 'San Mateo', 'California', 'USA'];
			//transaction account, transactionID, Store Name, total price, Tax, Shipping, City, State, Country
			if (!window.GoogleAnalyticsDisableRoblox2) {
				_gaq.push(transArray);
				GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(transArray));
			}
			transArray[0] = 'b.' + transArray[0]; //transaction account should be 'b._addTrans'
			_gaq.push(transArray);
			GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(transArray));
		}
	},
	TrackTransactionItem: function (orderId, sku, name, category, price) {
		if (window._gaq) {
			var itemArray = ['_addItem', orderId, sku, name, category, price, 1];
			var trackTransArray = ['_trackTrans'];
			if (!window.GoogleAnalyticsDisableRoblox2) {
				_gaq.push(itemArray);
				GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(itemArray));
				_gaq.push(trackTransArray);
				GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(trackTransArray));
			}
			itemArray[0] = 'b.' + itemArray[0];
			trackTransArray[0] = 'b.' + trackTransArray[0];
			_gaq.push(itemArray);
			GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(itemArray));
			_gaq.push(trackTransArray);
			GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(trackTransArray));
		}
	},
	Log: function (eventsArray) {
		GoogleAnalyticsEvents.LocalEventLog.push(makeGoogleAnalyticsLogObject(eventsArray));
	},
};

function makeGoogleAnalyticsLogObject(event_params) {
	var newLogObject = {};
	newLogObject.event = event_params;
	newLogObject.timestamp = new Date().getTime();
	return newLogObject;
}

function GoogleAnalyticsTimingTracker(category, variable, optLabel, isDebug) {
	this.maxTime = 1 * 60 * 1000;
	this.category = category;
	this.variable = variable;
	this.label = optLabel ? optLabel : undefined;
	this.isDebug = isDebug;
}

GoogleAnalyticsTimingTracker.prototype.getTimeStamp = function () {
	if (window.performance && window.performance.now) {
		return Math.round(window.performance.now());
	}
	return new Date().getTime();
};

GoogleAnalyticsTimingTracker.prototype.start = function () {
	this.startTime = this.getTimeStamp();
};

GoogleAnalyticsTimingTracker.prototype.stop = function () {
	this.elapsedTime = this.getTimeStamp() - this.startTime;
};

/**
 * Send data to Google Analytics with the configured variable, action,
 * elapsed time and label. This function performs a check to ensure that
 * the elapsed time is greater than 0 and less than MAX_TIME. This check
 * ensures no bad data is sent if the browser client time is off.
 * @return {Object} This TrackTiming instance. Useful for chaining.
 */
GoogleAnalyticsTimingTracker.prototype.send = function () {
	if (0 < this.elapsedTime && this.elapsedTime < this.maxTime) {
		var command = ['b._trackTiming', this.category, this.variable, this.elapsedTime, this.label, 100];
		window._gaq.push(command);
	}
};
