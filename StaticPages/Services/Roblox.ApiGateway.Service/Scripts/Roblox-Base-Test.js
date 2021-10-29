if (typeof Roblox === 'undefined') {
	Roblox = {};
}
if (typeof Roblox.Tests === 'undefined') {
	Roblox.Tests = {};
}
if (typeof Roblox.Tests.JQuery === 'undefined') {
	Roblox.Tests.JQuery = {};
}
Roblox.Tests.JQuery = (function () {
	function Run() {
		$(document).ready(() => {
			console.log($('.Roblox-Body').text('fucj'));
		});
	}
	return { Run };
})();
Roblox.Tests.JQuery.Run();
