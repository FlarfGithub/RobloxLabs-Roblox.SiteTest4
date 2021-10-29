function deletePixel(deleteAction, updateAction) {
	$('form').attr('action', deleteAction);
	var confirmed = confirm('Are you sure?');
	if (confirmed) {
		return true;
	} else {
		$('form').attr('action', updateAction);
		return false;
	}
}

$(function () {
	$('#AddCampaign').click(function () {
		var form = $('#CampaignForm');
		form.attr('action', '/partners/' + $('#PartnerID').val() + '/campaigns/create');
		var campaignName = $('#AddCampaignName').val();
		if (campaignName.trim().length > 0) {
			$('input[name=campaignName]').val(campaignName);
			form.submit();
		} else {
			$('#ErrorMessage').text('Campaign name cannot be empty.');
		}
	});
});
