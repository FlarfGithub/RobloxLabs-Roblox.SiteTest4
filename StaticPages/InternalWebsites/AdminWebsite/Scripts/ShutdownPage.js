$(function () {
	$('#ShutdownDialog').dialog({
		autoOpen: false,
		height: 200,
		width: 500,
		modal: true,
		buttons: {
			Confirm: {
				id: 'ShutdownConfirmButton',
				text: 'Confirm',
				click: function () {
					if ($('#ShutdownDialogInput').val().toLowerCase() !== 'yes') {
						$('#ShutdownDialogError').show();
						return;
					}
					$('#ShutdownConfirmButton').button('disable');
					$('#ShutdownDisplaynameInput').val($(this).data('display-name'));
					$('#ShutdownValueInput').val($(this).data('value'));
					$('#ShutdownForm').submit();
				},
			},
			Cancel: function () {
				$(this).dialog('close');
			},
		},
	});

	$('.shutdownButton')
		.button()
		.click(function () {
			var shutdownDialog = $('#ShutdownDialog');
			var dataValue = $(this).data('value');
			shutdownDialog.data('value', dataValue);
			var dataDisplayName = $(this).data('display-name');
			shutdownDialog.data('display-name', dataDisplayName);
			if (dataValue == 'True') {
				$('#ShutdownDialogText').text('Are you sure you want to activate ' + dataDisplayName + '? Type "yes" to continue.');
			} else {
				$('#ShutdownDialogText').text('Are you sure you want to shutdown ' + dataDisplayName + '? Type "yes" to continue.');
			}
			$('#ShutdownDialogInput').val('');
			$('#ShutdownDialogError').hide();
			shutdownDialog.dialog('open');
		});
});
