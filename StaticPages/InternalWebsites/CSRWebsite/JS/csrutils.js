/*
    CSR Utils
*/

CsrUtils = window.CsrUtils || {};

var CsrUtils = (function () {
	var csrApiHost = 'https://cser.simulping.com:38183/api/v1';
	var yourVar2;

	// public
	getBeginOfDay = function (dt) {
		return new Date(Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), 0, 0, 0, 0));
	};

	getBeginOfToday = function () {
		var dt = new Date(Date.now());
		return Date.UTC(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), 0, 0, 0, 0);
	};

	addDays = function (dt, days) {
		var newDate = new Date(dt.getTime());
		newDate.setDate(dt.getDate() + days);
		return newDate;
	};

	addHours = function (dt, hours) {
		var newDate = new Date(dt.getTime());
		newDate.setHours(dt.getHours() + hours);
		return newDate;
	};

	addMinutes = function (dt, minutes) {
		var newDate = new Date(dt.getTime());
		newDate.setMinutes(dt.getMinutes() + minutes);
		return newDate;
	};

	/*
        localTimeFormat: "yyyy-mm-dd HH:MM:SS"
        isoTimeFormat:   "yyyy-mm-ddTHH:MM:SSZ"
    */
	localTimeStringToISOString = function (s) {
		var s2 = s.replace('/ /g', 'T');
		s2 += 'Z';
		return s2;
	};

	timeToLocalTimeString = function (dt) {
		var ldt = new Date();
		ldt.setUTCFullYear(dt.getFullYear());
		ldt.setUTCMonth(dt.getMonth());
		ldt.setUTCDate(dt.getDate());
		ldt.setUTCHours(dt.getHours());
		ldt.setUTCMinutes(dt.getMinutes());
		ldt.setUTCSeconds(dt.getSeconds());
		ldt.setUTCMilliseconds(dt.getMilliseconds());
		// "yyyy-mm-ddTHH:MM:SSZ"
		var s = ldt.toISOString();
		var s2 = s.substring(0, 10) + ' ' + s.substring(11, 19);
		return s2;
	};

	timeToLocalDateString = function (dt) {
		var ldt = new Date();
		ldt.setUTCFullYear(dt.getFullYear());
		ldt.setUTCMonth(dt.getMonth());
		ldt.setUTCDate(dt.getDate());
		ldt.setUTCHours(dt.getHours());
		ldt.setUTCMinutes(dt.getMinutes());
		ldt.setUTCSeconds(dt.getSeconds());
		ldt.setUTCMilliseconds(dt.getMilliseconds());
		// "yyyy-mm-ddTHH:MM:SSZ"
		var s = ldt.toISOString();
		return s.substring(0, 10);
	};

	/*
        isoDateFormat:   "yyyy-mm-dd"
    */
	timeToISODateString = function (dt) {
		// "yyyy-mm-ddTHH:MM:SSZ"
		var s = dt.toISOString();
		// "yyyy-mm-dd"
		return s.substring(0, 10);
	};

	/*
        localDateFormat:   "yyyy-mm-dd"
    */
	localDateStringToDate = function (s) {
		var dt = new Date(s + 'T00:00:00Z');
		return new Date(
			dt.getUTCFullYear(),
			dt.getUTCMonth(),
			dt.getUTCDate(),
			dt.getUTCHours(),
			dt.getUTCMinutes(),
			dt.getUTCSeconds(),
			dt.getUTCMilliseconds(),
		);
		//dt.setFullYear(ldt.getUTCFullYear());
		//dt.setMonth(ldt.getUTCMonth());
		//dt.setDate(ldt.getUTCDate());
		//dt.setHours(ldt.getUTCHours());
		//dt.setMinutes(ldt.getUTCMinutes());
		//dt.setSeconds(ldt.getUTCSeconds());
		//dt.setMilliseconds(ldt.getUTCMilliseconds());
		return dt;
	};

	// private
	privateFunc1 = function () {};

	// export
	return {
		csrApiHost: csrApiHost,
		getBeginOfDay: getBeginOfDay,
		getBeginOfToday: getBeginOfToday,
		addDays: addDays,
		addHours: addHours,
		addMinutes: addMinutes,
		localTimeStringToISOString: localTimeStringToISOString,
		timeToLocalTimeString: timeToLocalTimeString,
		timeToLocalDateString: timeToLocalDateString,
		timeToISODateString: timeToISODateString,
		localDateStringToDate: localDateStringToDate,
	};
})();
