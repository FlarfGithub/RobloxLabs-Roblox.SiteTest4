$(function () {
	//$('.StripedTable tr:even').css('background-color', '#ecf6fc');
	//$('.StripedTable tr:odd').css('background-color', '#bcd4ec');
	$('.StripedTable tr').mouseover(function () {
		$(this).addClass('MouseOver');
	});
	$('.StripedTable tr').mouseout(function () {
		$(this).removeClass('MouseOver');
	});
	$('.ThumbnailClass').click(function () {
		var assetId = $(this).attr('id').split('_')[1];
		$(this).hide();
		$('#assetId_' + assetId).show();
	});
});
function UpdateItem(id, button) {
	// Get our textbox values
	var assettype, name, releasedate, priceinrobux, islimited, totalavailable;
	name = $('#name_' + id).val();
	releasedate = $('#releasedate_' + id).val();
	priceinrobux = $('#priceinrobux_' + id).val();
	islimited = $('#islimited_' + id).is(':checked');
	totalavailable = $('#totalavailable_' + id).val();
	isexpirable = $('#isexpirable_' + id).is(':checked');
	expirationperiod = $('#expirationperiod_' + id).val();
	if (expirationperiod === 'D.HH:MM:SS') {
		expirationperiod = ''; //otherwise we'll get an error
	}

	// Put up a spinny
	button.attr('disabled', true);
	if ($('#success_' + id) != null) $('#success_' + id).remove();
	if ($('#failure_' + id) != null) $('#failure_' + id).remove();
	if ($('#error_' + id) != null) $('#error_' + id).remove();
	var spinnerId = 'spinner_' + id;
	button.after("<img src='/images/waiting.gif' id='" + spinnerId + "'/>");

	// Send them to the handler
	$.get(
		'/Legacy/Asset/DelayedReleaseAssetHandler.ashx?reqType=updateDelayedAsset' +
			'&delayedReleaseAssetId=' +
			id +
			'&name=' +
			name +
			'&releasedate=' +
			releasedate +
			'&priceinrobux=' +
			priceinrobux +
			'&islimited=' +
			islimited +
			'&totalavailable=' +
			totalavailable +
			'&isexpirable=' +
			isexpirable +
			'&expirationperiod=' +
			expirationperiod,
		function (data) {
			button.attr('disabled', false);
			if (data.indexOf('Success') >= 0) {
				$('#' + spinnerId).replaceWith("<img src='/UnsecureContent/images/accept.png' id='success_" + id + "' />");
			} else if (data.indexOf('Failure') >= 0) {
				$('#' + spinnerId).replaceWith("<img src='/UnsecureContent/images/cross.png' id='failure_" + id + "' />");
				$('#failure_' + id).after(
					"<label id='error_" + id + "' style='color:red;'>" + data.substring(data.indexOf(':') + 1) + '</label>',
				);
			}
		},
	);
}
