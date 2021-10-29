$(function () {
	// Jquery selectors for client list page
	var clientListRevealClientKeyLinks = $('.reveal-client-key-link');
	var clientRevealClientKeySuccessClass = '.reveal-client-key-success';
	var clientListSearchClientKeyInput = $('#client-search-input');
	var clientListSearchClientKeyButton = $('#client-search-button');
	var clientListSearchClientKeyReset = $('#client-search-reset');
	var clientListTryAgainLink = $('#client-error-page-try-again');
	var clientErrorCaption = $('#client-error');
	var clientCaption = $('#client-caption');
	var clientDefaultNumber = $('#client-default-number');
	var clientRows = $('.client-row');

	function warningPrompt(promptToShow) {
		var text = promptToShow + '\n\nType YES to confirm.';
		var result = prompt(text);
		return result == 'YES';
	}

	$('span[data-make-button]').button();

	////////////// clients page starts //////////////
	var addClientDialog = $('#addClientDialog').dialog({
		title: 'Create New Api Client',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			'Generate Guid': function () {
				// get a guid from the server
				$.get('/ServicesConfig/GenerateGuid', function (guid) {
					$('#clientKey').val(guid);
				});
			},

			Save: function () {
				var params = {
					key: $('#clientKey').val(),
					note: $('#clientNote').val(),
				};

				$.post('/ServicesConfig/AddClient', params, function () {
					addClientDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				addClientDialog.dialog('close');
			},
		},
	});

	$('#create-new-client-button').click(function () {
		addClientDialog.dialog('open');
	});

	$('.remove-client-link').click(function () {
		var id = $(this).closest('tr').data('id');
		var client = $(this).closest('tr').data('note');

		if (warningPrompt("Are you sure you want to remove the client '" + client + "'?")) {
			var params = {
				id: id,
			};

			$.post('/ServicesConfig/RemoveClient', params, function () {
				window.location.reload();
			});
		}
		return false;
	});

	// This generator comes from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/2117523#2117523
	function guid() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
			(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16),
		);
	}

	var duplicateClientDialog = $('#duplicateClientDialog').dialog({
		title: 'Duplicate Api Client',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			'Generate Guid': function () {
				$('#duplicateClientKey').val(guid());
			},

			Save: function () {
				var params = {
					id: parseInt($('#duplicateTemplateId').val()),
					key: $('#duplicateClientKey').val(),
					note: $('#duplicateClientNote').val(),
				};

				$.post('/ServicesConfig/DuplicateClient', params, function () {
					duplicateClientDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				duplicateClientDialog.dialog('close');
			},
		},
	});

	$('.duplicate-client-link').click(function () {
		var id = $(this).closest('tr').data('id');
		var name = $(this).closest('tr').data('note');

		$('#duplicateTemplateId').val(id);
		$('#duplicateTemplateName').html(name);
		$('#duplicateClientNote').val(name + ' Copy');
		duplicateClientDialog.dialog('open');
	});

	// Click handle for the client list reveal key links
	clientListRevealClientKeyLinks.click(function (event) {
		event.preventDefault();
		var $component = $(this);

		// retrieve client id from clicked element
		var clientId = $component.data('id');
		var params = {
			clientId: clientId,
		};

		// call api service to get client associated with id
		$.get('/ServicesConfig/RevealClientKey', params, function (clientKey) {
			if (clientKey) {
				$component.removeClass('error').removeClass('loading').addClass('success');
				// show result and remove click handler
				$component.find(clientRevealClientKeySuccessClass).html(clientKey);
				$component.unbind('click');
			} else {
				$component.removeClass('success').removeClass('loading').addClass('error');
			}
		});

		// loading display
		$component.removeClass('success').removeClass('error').addClass('loading');
	});

	// searches client list by key when user clicks search button
	clientListSearchClientKeyButton.on('click', function () {
		var clientKey = clientListSearchClientKeyInput.val();

		var params = {
			clientKey: clientKey.toLowerCase(),
		};

		clientErrorCaption.hide();

		// checks if user has entered any values
		if (clientKey) {
			// call api service to get client associated with id
			$.get('/ServicesConfig/SearchApiClientIDListByKey', params, function (clientIDList) {
				// failure from elevated action
				if (clientIDList === false) {
					clientErrorCaption.show('fast');
				} else {
					// hide all of the rows
					clientRows.hide();

					// reveal rows with approved ids
					for (var i = 0; i < clientIDList.length; i++) {
						var clientID = clientIDList[i];

						$("tr[data-id='" + clientID + "']").show();
					}
					clientCaption.text(clientIDList.length + ' clients found.').show();
					clientDefaultNumber.hide();
				}
			});
		} else {
			clientListResetSearch();
		}
	});

	// resets the client list and removes any search terms/values
	function clientListResetSearch() {
		clientCaption.text('').hide();
		clientDefaultNumber.show();
		clientRows.show();
		clientErrorCaption.hide();
		clientListSearchClientKeyInput.val('');
	}

	clientListSearchClientKeyReset.click(function () {
		clientListResetSearch();
	});

	// performs a refresh for the client on error page
	clientListTryAgainLink.click(function () {
		location.reload();
	});

	var toggleClientDialog = $('#toggleClientDialog').dialog({
		title: 'Toggle Client',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			Confirm: function () {
				$.get('/ServicesConfig/RevealClientKey', { clientId: toggleClientDialog.data('id') }, function (clientKey) {
					var params = {
						isValid: toggleClientDialog.data('isValid'),
						id: toggleClientDialog.data('id'),
						note: toggleClientDialog.data('note'),
						key: clientKey,
					};

					$.post('/ServicesConfig/UpdateClient', params, function () {
						toggleClientDialog.dialog('close');
						window.location.reload();
					});
				});
			},

			Cancel: function () {
				toggleClientDialog.dialog('close');
			},
		},
	});

	$('a[data-toggle-client]').click(function () {
		var isValid = $(this).text();
		var id = $(this).closest('tr').data('id');
		var note = $(this).closest('tr').data('note');
		toggleClientDialog.data('isValid', isValid);
		toggleClientDialog.data('id', id);
		toggleClientDialog.data('note', note);
		$('#toggleClientDialog').text("Are you sure you want to set '" + note + "' to '" + isValid + '?');
		toggleClientDialog.dialog('open');
	});

	$('a.rename-client-link').click(function () {
		var tr = $(this).closest('tr');
		var isValid = tr.data('valid');
		var id = tr.data('id');
		var note = tr.data('note');

		var text = 'Type in a new name for the client';
		var newNote = prompt(text);

		if (newNote === null || newNote === '') {
			return;
		}

		var result = prompt('Are you sure you want to rename \r\n' + note + ' -> ' + newNote + '?\n\nType YES to confirm.');
		if (result !== 'YES') {
			return;
		}

		// hack that retrieves the current API client key value in order to update
		$.get('/ServicesConfig/RevealClientKey', { clientId: id }, function (clientKey) {
			var params = {
				isValid: isValid,
				id: id,
				note: newNote,
				key: clientKey,
			};

			$.post('/ServicesConfig/UpdateClient', params, function () {
				window.location.reload();
			});
		});
	});

	//////////////// clients page ends //////////////////////

	////////////////// services page starts //////////////////////
	var addServiceDialog = $('#addServiceDialog').dialog({
		title: 'Create New Api Service',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			Save: function () {
				var params = {
					name: $('#serviceName').val(),
				};

				$.post('/ServicesConfig/AddService', params, function () {
					addServiceDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				addServiceDialog.dialog('close');
			},
		},
	});

	$('#create-new-service-button').click(function () {
		addServiceDialog.dialog('open');
	});

	var toggleServiceDialog = $('#toggleServiceDialog').dialog({
		title: 'Toggle Service',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			Confirm: function () {
				var params = {
					serviceId: toggleServiceDialog.data('serviceId'),
					serviceName: toggleServiceDialog.data('serviceName'),
					enableService: toggleServiceDialog.data('enableService'),
				};

				$.post('/ServicesConfig/UpdateService', params, function () {
					toggleServiceDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				toggleServiceDialog.dialog('close');
			},
		},
	});

	$('a[data-toggle-service]').click(function () {
		var enableService = $(this).text();
		var serviceId = $(this).closest('tr').data('id');
		var serviceName = $(this).closest('tr').data('name');
		toggleServiceDialog.data('enableService', enableService);
		toggleServiceDialog.data('serviceId', serviceId);
		toggleServiceDialog.data('serviceName', serviceName);
		$('#toggleServiceDialog').text("Are you sure you want to set '" + serviceName + "' to '" + enableService + "'?");
		toggleServiceDialog.dialog('open');
	});

	//////////////// services page ends ////////////////////////////

	///////////// operations page starts ///////////////////
	var operationDialog = $('#operationDialog').dialog({
		title: 'Create New Operation',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			Save: function () {
				var params = {
					operationName: $('#operationName').val(),
					serviceName: $('#current-service-name').val(),
				};

				$.post('/ServicesConfig/AddOperation', params, function () {
					operationDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				operationDialog.dialog('close');
			},
		},
	});

	var toggleOperationDialog = $('#toggleOperationDialog').dialog({
		title: 'Toggle Operation',
		modal: true,
		resizable: false,
		width: 500,
		autoOpen: false,
		buttons: {
			Confirm: function () {
				var params = {
					operationId: toggleOperationDialog.data('operationId'),
					operationName: toggleOperationDialog.data('operationName'),
					serviceName: toggleOperationDialog.data('serviceName'),
					enableOperation: toggleOperationDialog.data('enableOperation'),
				};
				console.log(params);
				$.post('/ServicesConfig/UpdateOperation', params, function () {
					toggleOperationDialog.dialog('close');
					window.location.reload();
				});
			},
			Cancel: function () {
				toggleOperationDialog.dialog('close');
			},
		},
	});

	$('#create-new-operation-button').click(function () {
		operationDialog.dialog('open');
	});

	$('a[data-delete-operation]').click(function () {
		var tr = $(this).closest('tr');
		var operationName = tr.data('name');
		if (warningPrompt("Are you sure you want to delete operation '" + operationName + "'?")) {
			// do deletion
			var operationId = $(this).data('operationid');
			var params = {
				operationId: operationId,
			};

			$.post('/ServicesConfig/DeleteOperation', params, function () {
				window.location.reload();
			});
		}
		return false;
	});

	$('a[data-toggle-operation]').click(function () {
		var enableOperation = $(this).text();
		var operationId = $(this).closest('tr').data('id');
		var serviceName = $('#current-service-name').val();
		var operationName = $(this).closest('tr').data('name');
		toggleOperationDialog.data('enableOperation', enableOperation);
		toggleOperationDialog.data('operationId', operationId);
		toggleOperationDialog.data('serviceName', serviceName);
		toggleOperationDialog.data('operationName', operationName);
		$('#toggleOperationDialog').text("Are you sure you want to set '" + operationName + "' to '" + enableOperation + "'?");
		toggleOperationDialog.dialog('open');
	});

	///////////// operations page ends ///////////////////

	/////////// service authorizations page starts ////////////////
	var serviceAuthorizationDialog = $('#serviceAuthorizationDialog').dialog({
		title: 'Create New Service Authorization',
		modal: true,
		resizable: false,
		width: 530,
		autoOpen: false,
		buttons: {
			Save: function () {
				var params = {
					key: $('#clientKey').val(),
					serviceName: $('#serviceName').val(),
					authorizationType: $('#authorizationType').val(),
				};

				$.post('/ServicesConfig/AddServiceAuthorization', params, function () {
					serviceAuthorizationDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				serviceAuthorizationDialog.dialog('close');
			},
		},
	});

	$('#create-new-service-authorization-button').click(function () {
		serviceAuthorizationDialog.dialog('open');
	});

	$('a[data-change-service-authorization]').click(function () {
		var tr = $(this).closest('tr');
		var serviceName = tr.data('service-name');
		var authorizationType = $(this).text();
		if (
			warningPrompt(
				"Are you sure you want to change authorization of '" +
					serviceName +
					"' to '" +
					authorizationType +
					"'? Please note that changing authorization to 'None' will delete it.",
			)
		) {
			var params = {
				key: $('#clientKey').val(),
				serviceName: serviceName,
				authorizationType: authorizationType,
			};

			$.post('/ServicesConfig/AddServiceAuthorization', params, function () {
				window.location.reload();
			});
		}
		return false;
	});
	/////////// service authorizations page ends ////////////////

	/////////// operation authorizations page starts ////////////////
	var serviceNameDropDown = $('#operationAuthorizationDialog #serviceName');
	var operationNameDropDown = $('#operationAuthorizationDialog #operationName');

	var operationAuthorizationDialog = $('#operationAuthorizationDialog').dialog({
		title: 'Create New Operation Authorization',
		modal: true,
		resizable: false,
		width: 530,
		autoOpen: false,

		buttons: {
			Save: function () {
				var params = {
					key: $('#clientKey').val(),
					serviceName: serviceNameDropDown.val(),
					operationName: operationNameDropDown.val(),
					authorizationType: $('#authorizationType').val(),
				};

				$.post('/ServicesConfig/AddOperationAuthorization', params, function () {
					operationAuthorizationDialog.dialog('close');
					window.location.reload();
				});
			},

			Cancel: function () {
				operationAuthorizationDialog.dialog('close');
			},
		},
	});

	serviceNameDropDown.change(function () {
		$.get('/ServicesConfig/GetOperations', { serviceName: serviceNameDropDown.val() }, function (opsArray) {
			operationNameDropDown.empty(); // clear
			for (var i = 0; i < opsArray.length; i++) {
				var opName = opsArray[i];
				operationNameDropDown.append('<option>' + opName + '</option>');
			}
		});
	});

	var createNewOpAuthButton = $('#create-new-operation-authorization-button');
	createNewOpAuthButton.one('click', function () {
		serviceNameDropDown.trigger('change'); // pre-populate for the first time only
	});
	createNewOpAuthButton.click(function () {
		operationAuthorizationDialog.dialog('open');
	});

	$('a[data-change-operation-authorization]').click(function () {
		var tr = $(this).closest('tr');
		var serviceName = tr.data('service-name');
		var operationName = tr.data('operation-name');
		var authorizationType = $(this).text();
		if (
			warningPrompt(
				"Are you sure you want to change authorization of operation '" +
					operationName +
					"' of service '" +
					serviceName +
					"' to '" +
					authorizationType +
					"'? Please note that changing authorization to 'None' will delete it.",
			)
		) {
			var params = {
				key: $('#clientKey').val(),
				serviceName: serviceName,
				operationName: operationName,
				authorizationType: authorizationType,
			};

			$.post('/ServicesConfig/AddOperationAuthorization', params, function () {
				window.location.reload();
			});
		}
		return false;
	});
	/////////// operation authorizations page ends ////////////////
});
