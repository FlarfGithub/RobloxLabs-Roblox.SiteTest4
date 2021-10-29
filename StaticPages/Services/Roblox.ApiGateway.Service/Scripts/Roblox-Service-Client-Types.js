if (typeof Roblox === 'undefined') {
	Roblox = {};
}
if (typeof Roblox.Http === 'undefined') {
	Roblox.Http = {};
}
if (typeof Roblox.Http.ServiceClient.Types === 'undefined') {
	Roblox.Http.ServiceClient.Types = {};
}
Roblox.Http.ServiceClient.Types = (function () {
	const HttpRequestMethodEnum = {
		GET: 0,
		HEAD: 1,
		POST: 2,
		PUT: 3,
		DELETE: 4,
		OPTIONS: 5,
		PATCH: 6,
	};

	class IClientRequest {
		Url;
		Method;
		Payload;
		AdditionalHeaders;
		QueryString;
	}
	return { HttpRequestMethodEnum, IClientRequest };
})();
