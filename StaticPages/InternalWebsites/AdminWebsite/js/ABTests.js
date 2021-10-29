var SetInactive = function (elem) {
	if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
		return false;
	}
	if (!confirm('Deactivating the experiment will end all currently running versions. Are you sure?')) return false;

	$(elem).parents('form').submit();
};

var NewExperimentVersion = function (elem) {
	if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
		return false;
	}
	var experimentId = $(elem).data('experiment-id');
	var url = $('.ab-test-configuration-page').data('new-version-url');

	$('#update-enrollment-dialog')
		.html('<div class="loading"></div>')
		.dialog({
			title: 'New Experiment Version',
			modal: true,
			resizable: false,
			draggable: false,
			width: 520,
			buttons: {
				Cancel: function () {
					$(this).dialog('close');
				},
				Submit: function () {
					if (!confirm('The experiment version will start as soon as it is created. Are you sure?')) return;

					var form = $('#update-enrollment-dialog').find('form');

					var sum = 0;
					$(form)
						.find('input[name=variationPercentages]')
						.each(function () {
							if (!isNaN(this.value) && this.value.length != 0) {
								sum += parseFloat(this.value);
							}
						});

					if (sum != 100) {
						alert('Variations must add up to 100');
						return;
					}

					form.submit();
				},
			},
		});

	$.ajax({
		type: 'POST',
		url: url + '?experimentId=' + experimentId,
		success: function (data) {
			$('#update-enrollment-dialog').html(data);
		},
	});
};

var UpdateExperimentVersion = function (elem) {
	if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
		return false;
	}
	var experimentId = $(elem).data('experiment-id');
	var version = $(elem).data('version');
	var url = $('.ab-test-configuration-page').data('edit-version-url');

	$('#update-enrollment-dialog')
		.html('<div class="loading"></div>')
		.dialog({
			title: 'Update Experiment Version',
			modal: true,
			resizable: false,
			draggable: false,
			width: 520,
			buttons: {
				Cancel: function () {
					$(this).dialog('close');
				},
				Submit: function () {
					if (!confirm('Are you sure?')) return;

					$('#update-enrollment-dialog').find('form').submit();
				},
			},
		});

	$.ajax({
		type: 'POST',
		url: url + '?experimentId=' + experimentId + '&experimentVersion=' + version,
		success: function (data) {
			$('#update-enrollment-dialog').html(data);
		},
	});
};

$(function () {
	$('.experiment .version:first-child').prepend('<a class="toggle-show-hide fa fa-fw fa-caret-down" style="cursor:pointer;"></a>').show();

	$('.ab-test-configuration-page').on('click', '.toggle-show-hide', function (event) {
		var parent = $(event.target).parents('.versions');
		parent.find('.version, .version-details').toggleClass('hide-version');
	});

	$('#ExperimentSearch').on('keyup paste', function () {
		var searchString = $(this).val();
		var selector = $('#ExperimentName option');

		var hasSelectedBeenSet = false;
		selector.each(function () {
			var contained = $(this).val().toLowerCase().indexOf(searchString.toLowerCase()) != -1;
			$(this).toggle(contained);
			if (!hasSelectedBeenSet && contained) {
				$(this).attr('selected', 'selected');
				hasSelectedBeenSet = true;
			} else {
				$(this).removeAttr('selected');
			}
		});
	});

	$('#create-ab-test').click(function () {
		if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
			return false;
		}
		return true;
	});
});
