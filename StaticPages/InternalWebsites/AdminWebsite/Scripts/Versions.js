function isSecurityVersionValid(value) {
	var valueRegex = /(^\S$|^\S.*\S$)/;
	return valueRegex.test(value);
}

// Check that numerical version is either XXX or XXX.Y where X and Y are digits
function isNumericalVersionValid(value) {
	var numericalRegex = /^\d{3}(\.\d)?$/;
	return numericalRegex.test(value);
}

function operationFailed() {
	alert('Operation failed!');
}

// Get the version in format XXX or XXX.Y and transform to [ "0.XXX.Ypcplayer", "0.XXX.Ymacplayer" ] where Y = 0 if not specified
function createSecurityVersionsFromNumerical(numVersion) {
	if (!isNumericalVersionValid(numVersion)) {
		return undefined;
	}
	if (!numVersion.includes('.')) {
		numVersion = numVersion + '.0';
	}

	return ['0.' + numVersion + 'pcplayer', '0.' + numVersion + 'macplayer'];
}

function createVersionDialog(dialogElement, saveFunction, openFunc) {
	var dialog = dialogElement.dialog({
		modal: true,
		resizable: false,
		width: 520,
		autoOpen: false,
		buttons: {
			Save: saveFunction,
			Cancel: function () {
				dialogElement.dialog('close');
			},
		},
	});
	if (openFunc) {
		dialogElement.on('dialogopen', openFunc);
	}
	return dialog;
}

function openDialog(dialog, title) {
	dialog.dialog('option', 'title', title);
	dialog.dialog('open');
}

function createSubmitFormFunction(form) {
	return function () {
		form.submit();
	};
}

var ERROR_CLASS = 'error';
var FADE_SPEED = 'fast';
var DISABLED_PROP = 'disabled';
var BUTTON_DISABLED_STATE_CLASS = 'ui-state-disabled';

function openSecurityVersionDialog(dialog, form, primaryInput, tooltip, title) {
	form[0].reset();
	primaryInput.removeClass(ERROR_CLASS);
	tooltip.hide();
	openDialog(dialog, title);
}

function createDialogValueValidator(saveButtonSelector, valueInputElement, tooltipElement, validatorFunc) {
	return function () {
		var saveButton = $(saveButtonSelector);
		var value = valueInputElement.val();
		if (validatorFunc(value)) {
			valueInputElement.removeClass(ERROR_CLASS);
			tooltipElement.fadeOut(FADE_SPEED);
			saveButton.prop(DISABLED_PROP, false).removeClass(BUTTON_DISABLED_STATE_CLASS);
		} else {
			if (value) {
				valueInputElement.addClass(ERROR_CLASS);
				tooltipElement.fadeIn(FADE_SPEED);
			}
			saveButton.prop(DISABLED_PROP, true).addClass(BUTTON_DISABLED_STATE_CLASS);
		}
	};
}

function warningPrompt(promptToShow) {
	var text = promptToShow + '\n\nType YES to confirm.';
	var result = prompt(text);
	return result === 'YES';
}

function doPostWithFailAlert(endpoint, payload) {
	$.post(endpoint, payload, function (response) {
		if (response) {
			location.reload();
		} else {
			operationFailed();
		}
	}).fail(function () {
		operationFailed();
	});
}

$(function () {
	///////// app versions ////////
	$('span[data-make-button], input[data-make-button]').button();

	var appVersionForm = $('#app-version-form');
	var appVersionDialog = createVersionDialog($('#app-version-dialog'), createSubmitFormFunction(appVersionForm));

	$('a[data-edit-app-version]').click(function () {
		var anchor = $(this);
		$('#app-version-id').val(anchor.data('id'));
		$('#app-version-value').val(anchor.data('value'));
		$('#app-version-platform-type-id').val(anchor.data('platform-type-id'));
		$('#app-version-status-type-id').val(anchor.data('status-type-id'));
		$('#app-version-description').val(anchor.data('description'));
		openDialog(appVersionDialog, 'Edit App Version');
		return false;
	});

	$('#create-new-app-version-button').click(function () {
		appVersionForm[0].reset();
		openDialog(appVersionDialog, 'Create App Version');
	});

	///////// security versions ////////
	var securityVersionForm = $('#security-version-form');
	var dlgVersionTooltip = $('#dlgVersionMessage');
	var dlgVersionValueInput = $('#security-version-value');
	var saveButtonSelector = ".ui-dialog-buttonpane :button:contains('Save')";

	var securityVersionDialog = createVersionDialog(
		$('#security-version-dialog'),
		function () {
			securityVersionForm.submit();
		},
		createDialogValueValidator(saveButtonSelector, dlgVersionValueInput, dlgVersionTooltip, isSecurityVersionValid),
	);

	dlgVersionValueInput.keyup(
		createDialogValueValidator(saveButtonSelector, dlgVersionValueInput, dlgVersionTooltip, isSecurityVersionValid),
	);

	$('a[data-edit-security-version]').click(function () {
		var saveButton = $(saveButtonSelector);
		var anchor = $(this);
		$('#security-version-id').val(anchor.data('id'));
		$('#security-version-value').val(anchor.data('value'));
		$('#security-version-is-valid').val(anchor.data('is-valid'));
		$('#security-version-description').val(anchor.data('description'));
		var validatorFunction = createDialogValueValidator(saveButton, dlgVersionValueInput, dlgVersionTooltip, isSecurityVersionValid);
		validatorFunction();

		openDialog(securityVersionDialog, 'Edit Security Version');
		return false;
	});

	$('#create-new-security-version-button').click(function () {
		openSecurityVersionDialog(
			securityVersionDialog,
			securityVersionForm,
			dlgVersionValueInput,
			dlgVersionTooltip,
			'Create Security Version',
		);
	});

	///////// security versions - create Mac and PC at once ////////
	var dualSecurityVersionForm = $('#dual-security-versions-form');
	var dlgNumericalVersionTooltip = $('#dlgNumericalVersionMessage');
	var dlgNumericalVersionValueInput = $('#numerical-version-value');

	var dualSecurityVersionDialog = createVersionDialog(
		$('#dual-security-versions-dialog'),
		function () {
			dualSecurityVersionForm.submit();
		},
		createDialogValueValidator(saveButtonSelector, dlgNumericalVersionValueInput, dlgNumericalVersionTooltip, isNumericalVersionValid),
	);

	dlgNumericalVersionValueInput.keyup(
		createDialogValueValidator(saveButtonSelector, dlgNumericalVersionValueInput, dlgNumericalVersionTooltip, isNumericalVersionValid),
	);

	var createSecurityVersionPayload = function (version, description, isValid) {
		return {
			ID: 0,
			Value: version,
			Description: description,
			IsValid: isValid,
		};
	};

	dualSecurityVersionForm.submit(function (event) {
		var endpoint = '/VersionCompatibility/CreateOrUpdateSecurityVersion';
		var descriptionInput = $('#dual-security-versions-description');
		var areValid = $('#dual-security-versions-are-valid');
		event.preventDefault();
		var versions = createSecurityVersionsFromNumerical(dlgNumericalVersionValueInput.val());
		if (versions) {
			$.when(
				$.ajax({
					type: 'POST',
					data: createSecurityVersionPayload(versions[0], descriptionInput.val(), areValid.val()),
					url: endpoint,
				}),
				$.ajax({
					type: 'POST',
					data: createSecurityVersionPayload(versions[1], descriptionInput.val(), areValid.val()),
					url: endpoint,
				}),
			).then(
				function () {
					location.reload(true);
				},
				function () {
					operationFailed();
					location.reload(true);
				},
			);
		}
	});

	$('#create-both-security-versions-button').click(function () {
		openSecurityVersionDialog(
			dualSecurityVersionDialog,
			dualSecurityVersionForm,
			dlgNumericalVersionValueInput,
			dlgNumericalVersionTooltip,
			'Create Mac and PC Security Versions',
		);
	});

	///////// client versions ////////
	$('a[data-toggle-client-version]').click(function () {
		var params = {
			ID: $(this).data('client-version-id'),
			Value: $(this).data('client-version-value'),
			IsValid: $(this).data('client-version-is-valid'),
		};

		doPostWithFailAlert('/VersionCompatibility/CreateOrUpdateClientVersion', params);

		return false;
	});
	var clientVersionDialog = createVersionDialog($('#clientVersionDialog'), createSubmitFormFunction($('#client-version-form')));

	$('#create-new-version-button').click(function () {
		openDialog(clientVersionDialog, 'Create New Client Version');
	});

	///////// client version security keys ////////
	var securityKeyDialog = createVersionDialog($('#securityKeyDialog'), createSubmitFormFunction($('#client-version-security-key-form')));

	$('#create-new-security-key-button').click(function () {
		openDialog(securityKeyDialog, 'Create New Security Key');
	});

	$('a[data-delete-securitykey]').click(function () {
		var tr = $(this).closest('tr');
		var value = tr.data('securitykeyvalue');
		if (warningPrompt("Are you sure you want to delete '" + value + "'?")) {
			// do deletion
			var securityKeyId = $(this).data('securitykeyid');
			var params = {
				ID: securityKeyId,
			};

			doPostWithFailAlert('/VersionCompatibility/DeleteSecurityKey', params);
		}
		return false;
	});

	///////// client version MD5 hashes ////////
	var md5HashDialog = createVersionDialog($('#md5HashDialog'), createSubmitFormFunction($('#client-version-md5-hash-form')));

	$('#create-new-hash-button').click(function () {
		openDialog(md5HashDialog, 'Create New Md5 Hash');
	});

	$('a[data-delete-md5]').click(function () {
		var tr = $(this).closest('tr');
		var value = tr.data('md5value');
		if (warningPrompt("Are you sure you want to delete '" + value + "'?")) {
			// do deletion
			var md5Id = $(this).data('md5id');
			var params = {
				ID: md5Id,
			};

			doPostWithFailAlert('/VersionCompatibility/DeleteMd5Hash', params);
		}
		return false;
	});

	///////// client version uploads ////////
	var versionsDropDown = $('#editClientVersionUploadDialog #versionValue');
	var editClientVersionUploadDialog = createVersionDialog($('#editClientVersionUploadDialog'), function () {
		var params = {
			ClientVersionsUploadID: versionsDropDown.children(':selected').attr('id'),
			ChannelId: versionsDropDown.children(':selected').data('channel-id'),
		};

		doPostWithFailAlert('/VersionCompatibility/SetCurrentClientVersionUpload', params);
	});

	function refreshClientVersionUploadsDropdown(binaryType, channelId) {
		versionsDropDown.data('client-binary-type', binaryType);
		versionsDropDown.data('channel-id', channelId);
		versionsDropDown.empty(); // clear

		$.get(
			'/VersionCompatibility/ListClientVersionUploads',
			{ clientBinaryType: binaryType, channelId: channelId },
			function (uploadsArray) {
				for (var i = 0; i < uploadsArray.length; i++) {
					var clientVersion = uploadsArray[i].ClientVersion;
					var id = uploadsArray[i].Id;
					versionsDropDown.append('<option data-channel-id=' + channelId + ' id="' + id + '">' + clientVersion + '</option>');
				}
			},
		);
	}

	$('a[data-edit-upload]').click(function () {
		var binaryType = $(this).data('client-binary-type');
		var channelId = $(this).data('channel-id');
		refreshClientVersionUploadsDropdown(binaryType, channelId);

		editClientVersionUploadDialog.data('client-binary-type', $(this).data('client-binary-type'));
		editClientVersionUploadDialog.data('channel-id', $(this).data('channel-id'));
		editClientVersionUploadDialog.data('channel-name', $(this).data('channel-name'));
		openDialog(
			editClientVersionUploadDialog,
			'Set Current Client Version Upload: ' + $(this).data('client-binary-type') + ' for Channel ' + $(this).data('channel-name'),
		);
	});

	$('#selectChannel').on('change', function () {
		var channelName = $('#selectChannel option:selected').text();
		window.location.href = '/VersionCompatibility/ListAllClientVersionUploads?channelName=' + channelName;
	});
	///////// server versions ////////
	var serverVersionId = -1;

	var serverVersionsUpdateDialog = createVersionDialog($('#editServerVersionDialog'), function () {
		var params = {
			ServerVersionId: serverVersionId,
			Status: $('#editServerVersionDialog #statusValue option:selected').text(),
		};

		doPostWithFailAlert('/VersionCompatibility/SetServerVersionStatus', params);
	});

	$('a[data-edit-server-version]').click(function () {
		serverVersionId = $(this).data('server-version-id');
		var serverVersion = $(this).data('server-version');
		$('#serverVersion').text(serverVersion);
		openDialog(serverVersionsUpdateDialog, 'Set Server Version Status');
	});

	var serverVersionsTable = $('#server-versions-table');

	var loadMoreServerVersionsButton = $('#load-more-server-versions');
	var requestInProgress = false;
	loadMoreServerVersionsButton.click(function () {
		if (requestInProgress) {
			return false;
		}
		requestInProgress = true;
		var exclusiveStartId = serverVersionsTable.data('exclusive-start-id');
		var params = { exclusiveStartId: exclusiveStartId };
		$.get('/VersionCompatibility/GetServerVersions', params, function (response) {
			if (response) {
				$('#server-versions-table').append(response);
				var newExclusiveStartId = $('#server-versions-table tr:last a').data('server-version-id');
				serverVersionsTable.data('exclusive-start-id', newExclusiveStartId);
			}
			requestInProgress = false;
		});
	});
});
