$(function () {
	//When the template category dropdown changes selection, update the option that is selected because
	//our AJAX get will not refresh this value and we need it to be updated for future requests.
	$('#templateCategories').change(function () {
		var templateCategory = $(this);
		$("option[selected='selected']").removeAttr('selected');
		$('option').each(function () {
			if ($(this).val() == $(templateCategory).val()) {
				$(this).attr('selected', 'selected');
			}
		});
		$('#TemplateCategory').val($(this).val());
		$(this).closest('form').trigger('submit');
	});

	//Refresh the text fields
	$('#NewTemplateCategory').val('');
	$('#templateID').val('');

	//Disable the remove button if there are no template categories
	if ($('#templateCategories').val() == '' || $('#templateCategories').val() === 'undefined') {
		$('#removeTemplateButton').attr('disabled', 'disabled');
	}
});
