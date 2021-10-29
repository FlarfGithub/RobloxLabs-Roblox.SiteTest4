$(function () {
	$('span[data-make-button]').button();

	var getButton = $('#get-value-button');
	var setButton = $('#set-value-button');
	var deleteButton = $('#delete-button');

	var keyField = $('#setting-key');
	var valueField = $('#setting-value');
	var baseGetUrl = getButton.data('url');
	var baseSetUrl = setButton.data('url');
	var baseDeleteUrl = deleteButton.data('url');
	var statusMessage = $('#status-message');

	function showMessage(text, color) {
		color = color || 'black';
		statusMessage.css('color', color);
		statusMessage.text(text);
	}

	getButton.click(function () {
		valueField.val(''); // clear value
		var key = keyField.val();
		var url = baseGetUrl + '?key=' + encodeURIComponent(key);
		$.ajax({
			url: url,
			cache: false,
			success: function (data) {
				valueField.val(data);
				showMessage('Setting found');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				showMessage(errorThrown, 'red');
			},
		});
	});

	setButton.click(function () {
		if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Client)) {
			return false;
		}
		var confirmed = prompt('Are you sure you want to modify this setting? Type YES to continue.') === 'YES';
		if (confirmed) {
			var key = keyField.val();
			var value = valueField.val();
			var params = { key: key, value: value };
			$.post(baseSetUrl, params, function (data) {
				if (data === 'SET') {
					showMessage('Setting saved', 'green');
				} else {
					showMessage('Error, setting was not saved', 'red');
				}
			});
		} else {
			showMessage('Save aborted', 'orange');
		}
	});

	deleteButton.click(function () {
		if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Client)) {
			return false;
		}
		var confirmed = prompt('Are you sure you want to modify this setting? Type YES to continue.') === 'YES';
		if (confirmed) {
			var key = keyField.val();
			var params = { key: key };
			$.post(baseDeleteUrl, params, function (data) {
				if (data === 'DELETED') {
					showMessage('Setting was deleted', 'green');
				} else {
					showMessage('Error, setting was not deleted', 'red');
				}
			});
		} else {
			showMessage('Delete aborted', 'orange');
		}
	});

	$('#format-json-button').click(function () {
		var str = valueField.val();
		try {
			var json = JSON.parse(str);
			var formattedString = JSON.stringify(json, null, 4);
			valueField.val(formattedString);
		} catch (e) {
			alert('Error while parsing JSON:\r\n' + e);
		}
	});
});
