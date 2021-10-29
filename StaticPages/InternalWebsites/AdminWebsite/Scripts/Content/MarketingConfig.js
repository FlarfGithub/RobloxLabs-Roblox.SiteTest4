$(function () {
	function updateSettingResults() {
		var page = $('#MarketingConfigOptions .selected').attr('data-id');
		var url = '/MarketingConfig/GetConfigs?' + $.param({ page: page });
		$('#settingsResultsDiv').load(url, function () {});
	}
	function switchConfigs(event) {
		$('#MarketingConfigOptions span').removeClass('selected');
		$(event.target).addClass('selected');
		updateSettingResults();
	}

	var settingsObj = Roblox.ConfigSettings({
		isMarketingPage: true,
		isAdOpsPage: false,
		updateSettingResults: updateSettingResults,
	});
	settingsObj.init();

	$('#MarketingConfigOptions span').click(function (event) {
		switchConfigs(event);
	});
});
