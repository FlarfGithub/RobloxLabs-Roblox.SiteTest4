function createDialog(dialogElement, saveFunction, openFunc) {
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

function showAlertDialog(title, message) {
	var dlg = window.rbxAlertDialog;
	if (!dlg) {
		dlg = window.rbxAlertDialog = $('#alertDialog').dialog({
			modal: true,
			resizable: false,
			width: 400,
			autoOpen: false,
			buttons: {
				OK: function () {
					dlg.dialog('close');
				},
			},
		});
	}

	$('#alertDialogText').text(message);
	dlg.dialog('option', 'title', title);
	dlg.dialog('open');
}

function showDeleteDlg(postUrl, id, message, updateHandler) {
	var dlg = window.rbxDeleteDialog;
	if (!dlg) {
		dlg = window.rbxDeleteDialog = $('#delete-dialog').dialog({
			modal: true,
			resizable: false,
			width: 400,
			autoOpen: false,
			buttons: {
				Delete: function () {
					dlg.onDelete();
					dlg.dialog('close');
				},
				Cancel: function () {
					dlg.dialog('close');
				},
			},
		});
	}

	if (typeof id === 'object') {
		$('#deleteDialogMessage').text(message);
		dlg.onDelete = function () {
			$.post(postUrl, id, function (responseMessage) {
				if (responseMessage) {
					showAlertDialog('Success', responseMessage);
					updateHandler();
				} else {
					showAlertDialog('Error', 'Delete failed!');
				}
			});
		};
		dlg.dialog('open');
		return false;
	}

	$('#deleteDialogMessage').text(message);
	dlg.currentId = id;
	dlg.onDelete = function () {
		$.post(postUrl, { id: id }, function (responseMessage) {
			if (responseMessage) {
				showAlertDialog('Success', responseMessage);
				updateHandler();
			} else {
				showAlertDialog('Error', 'Delete failed!');
			}
		});
	};
	dlg.dialog('open');
	return false;
}

$(function () {
	$('span[data-make-button]').button();

	// Channel Creation and Deletion
	var createChannelForm = $('#create-channel-form');
	var createChannelDialog = createDialog($('#create-channel-dialog'), createSubmitFormFunction(createChannelForm));

	$('#create-channel').click(function () {
		createChannelForm[0].reset();
		openDialog(createChannelDialog, 'Create Channel');
	});

	$('a[data-delete-channel]').click(function () {
		var id = $(this).data('channel-id');
		var name = $(this).data('channel-name');
		return showDeleteDlg('/ChannelManagement/DeleteChannel', id, 'Are you sure you want to delete channel ' + name + '?', function () {
			location.reload(true);
		});
	});

	// Channel Users Add and Remove
	var addUserToChannelForm = $('#add-user-to-channel-form');
	var addUserToChannelDialog = createDialog($('#add-user-to-channel-dialog'), createSubmitFormFunction(addUserToChannelForm));

	$('#add-user-to-channel').click(function () {
		addUserToChannelForm[0].reset();
		openDialog(addUserToChannelDialog, 'Add User to Channel');
	});

	$('a[data-delete-user-from-channel]').click(function () {
		var channelId = $(this).data('channel-id');
		var userId = $(this).data('user-id');
		return showDeleteDlg(
			'/ChannelManagement/DeleteUserFromChannel',
			{ userId: userId, channelId: channelId },
			'Are you sure you want to delete this user?',
			function () {
				location.reload(true);
			},
		);
	});
});
