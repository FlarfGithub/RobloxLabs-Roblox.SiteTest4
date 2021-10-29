/*****
 * NOTE: This script will be used for all setting pages & Configs
 *       Do test and run on those pages when you make change in this file.
 *****/

var Roblox = Roblox || {};

function isKeyValid(key) {
	var keyRegex = /^[a-zA-Z0-9_]+$/;
	return keyRegex.test(key);
}

function isValueValid(value) {
	var valueRegex = /(^\S$|^\S.*\S$)/;
	return valueRegex.test(value);
}

var delay = (function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();

function showMessage(message) {
	window.scrollTo(0, 0);

	$('#messageDivText').html(message);
	$('#messageDiv').fadeIn();
}

function copyToClipboard(value) {
	var $temp = $('<input>');
	$('body').append($temp);
	$temp.val(value).select();
	document.execCommand('copy');
	$temp.remove();
}

var settingTypes = {
	int32: 'System.Int32',
	int64: 'System.Int64',
	double: 'System.Double',
	decimal: 'System.Decimal',
	float: 'System.Float',
	timespan: 'System.TimeSpan',
	redisEndpoints: 'Roblox.Redis.RedisEndpoints',
	csv: 'Roblox.Csv',
	weightedCsv: 'Roblox.Configuration.WeightedCsv',
	boolean: 'System.Boolean',
	guid: 'System.Guid',
	byte: 'System.Byte',
	string: 'System.String',
};

function isNumberDataType(dataType) {
	var numberDataTypes = [settingTypes.int32, settingTypes.int64, settingTypes.double, settingTypes.decimal, settingTypes.float];
	return numberDataTypes.includes(dataType);
}

$(function () {
	Roblox.ConfigSettings = function (settingsArray) {
		settingsArray = settingsArray || {};
		var isAdOpsPage = settingsArray.isAdOpsPage;

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

		function hideMessage() {
			$('#messageDiv').fadeOut('slow');
		}

		function showDeleteDialog(postUrl, id, message, updateHandler) {
			var dlg = window.rbxDeleteDialog;
			if (!dlg) {
				dlg = window.rbxDeleteDialog = $('#deleteDialog').dialog({
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

		var requestCounter = 0;
		var updateSettingResultsMulti = function () {
			$('#settingsResultsDiv').html('');
			requestCounter++;
			var got = 0;
			var requestCount = requestCounter;
			var groupName = $('#GroupName').val();
			var namePatterns = $.trim($('#NamePattern').val()).split(' ');
			var valuePattern = $('#ValuePattern').val();
			putSearchTextIntoAnchortext(groupName, $('#NamePattern').val(), valuePattern);
			for (var ii = 0; ii < namePatterns.length; ii++) {
				(function () {
					var namePattern = namePatterns[ii];
					if (groupName === '*' && namePattern.length < 2) {
						return;
					}
					if (namePattern.length == 0) {
						return;
					} //when doing multisearch don't append "all"
					var url =
						'/Config/GetSettingsHtmlAjax?' +
						$.param({ GroupName: groupName, NamePattern: namePattern, ValuePattern: valuePattern });
					$.get(url, function (response) {
						if (requestCount === requestCounter) {
							var section = $('<div>').html(response).find('.settingsTable');
							if (got > 0) {
								section.find('.ui-widget-header').remove();
							}
							section.prepend(
								$(
									"<tr class='searchDescription'><td style='border:0;' colspan='4'><b>\"" +
										namePattern +
										'"</b></td></tr>',
								),
							);
							$('#settingsResultsDiv').append(section);
							got = got + 1;
						}
					});
				})();
			}
		};

		var updateSettingResults = function (handler) {
			var hasSpace = $('#NamePattern').val().match(/ /);
			if (hasSpace && hasSpace.length > 0) {
				return updateSettingResultsMulti(handler);
			}
			$('#settingsResultsDiv').html('');
			$('#settingsResultsDiv').on('click', '.showSettingDiv', function () {
				var target = $(this).find('.ui-button-text');
				showMaskedSetting(target);
			});
			requestCounter++;
			var requestCount = requestCounter;
			var namePattern = $('#NamePattern').val();
			var valuePattern = $('#ValuePattern').val();
			var groupName = $('#GroupName').val();
			putSearchTextIntoAnchortext(groupName, namePattern, valuePattern);
			if (groupName === '*' && namePattern.length < 2 && valuePattern.length < 2) {
				$('#settingsResultsDiv').html('');
				return;
			} //too short
			var url =
				'/Config/GetSettingsHtmlAjax?' + $.param({ GroupName: groupName, NamePattern: namePattern, ValuePattern: valuePattern });
			$.get(url, function (response) {
				if (requestCount === requestCounter) {
					$('#settingsResultsDiv').html(response);
				}
			});
			$('#settingsResultsDiv').load(url, function () {
				if (handler) {
					handler();
				}
			});
		};

		function showMaskedSetting(target) {
			$.ajax({
				type: 'GET',
				url: '/Config/GetMaskedSetting',
				data: { settingGroupName: target.data('groupName'), settingName: target.data('settingName') },
				success: function (response) {
					//modify the [value not shown] text and attributes of the element
					var valueDiv = target.closest('.valueCell').children('.value');
					valueDiv.text(response.Value);
					valueDiv.attr('title', response.Value);
					valueDiv.removeClass('secret');
					target.hide();

					//show the hidden copy to clipboard element once text is now displayed
					var copyToClipboardElement = valueDiv.siblings('.copyValue');
					var copyToClipboardHref = copyToClipboardElement.children('.copyIcon');
					copyToClipboardHref.attr('title', 'Copy this:\n ' + response.Value);
					copyToClipboardHref.click(function () {
						copyToClipboard(response.Value);
					});
					copyToClipboardElement.removeClass('masked');
					copyToClipboardElement.show();
				},
				error: function (response) {
					showAlertDialog('Error', 'Error fetching masked value! ' + response.status);
				},
			});
		}

		//type anchor text into input box.
		//anchortext format: GROUPNAME;search1,search2,search3
		//search box format: search1 search2 search3
		function readAnchorText() {
			var anchorText = decodeURIComponent(document.location.href).match(/.*#(.*)/);
			if (anchorText && anchorText.length > 1) {
				anchorText = anchorText[1];
				var split = anchorText.split(';');
				var group = split[0];
				var name = split[1].replace(/,/g, ' ');
				var value = split[2].replace(/,/g, ' ');
				var target = $('#GroupName option').filter(function () {
					return $(this).text().trim().toLocaleLowerCase() === group;
				});
				target.attr('selected', 'selected');
				$('#NamePattern').val(name);
				$('#ValuePattern').val(value);
				updateSettingResults();
			}
		}

		function putSearchTextIntoAnchortext(grouptext, nametext, valuetext) {
			if (grouptext && grouptext.length > 0) {
				var anchorText = grouptext.toLocaleLowerCase() + ';';
				if (nametext && nametext.length > 0) {
					anchorText += nametext.replace(/ /g, ',').toLocaleLowerCase();
				}
				anchorText += ';';
				if (valuetext && valuetext.length > 0) {
					anchorText += valuetext.replace(/ /g, ',').toLocaleLowerCase();
				}
				window.location.hash = anchorText;
			}
		}

		function getConfigUrlPrefix() {
			var url;
			if (isAdOpsPage) {
				url = '/AdOpsConfig';
			} else {
				url = '/Config';
			}
			return url;
		}

		//if we have an override, use it instead
		if (settingsArray.updateSettingResults != undefined) {
			updateSettingResults = settingsArray.updateSettingResults;
		}

		var editSettingDialog = $('#settingsDialog').dialog({
			modal: true,
			resizable: false,
			width: 520,
			autoOpen: false,
			open: function () {
				var nameField = $('#dlgName');
				var saveButton = $(":button:contains('Save')");
				if (nameField.prop('disabled') === false && nameField.val() !== '' && !isKeyValid(nameField.val())) {
					nameField.addClass('error');
					$('#dlgNameMessage').show();
					saveButton.prop('disabled', true).addClass('ui-state-disabled');
				} else {
					saveButton.prop('disabled', false).removeClass('ui-state-disabled');
				}

				var valueField = $('#dlgValue');
				if (isValueValid(valueField.val())) {
					valueField.removeClass('error');
					$('#dlgValueMessage').hide();
				}

				var dataType = $('#dlgType').val();
				if (dataType === settingTypes.timespan && $('#dlgDays').is(':hidden')) {
					handleTimeSpanTypeSelected();
				}
				$('.helperRow').hide();
				if (dataType !== '') {
					$('.helperRow').show();
				}

				$('#settingsDialog #redisEndpoints').hide();
				$('#settingsDialog .csv').hide();
				$('#settingsDialog #weightedCsv').hide();
				$('#settingsDialog .boolean').hide();
				$('#settingsDialog .number').hide();
				$('#settingsDialog .guid').hide();

				if (dataType === settingTypes.redisEndpoints) {
					handleRedisEndpointsTypeSelected();
				} else if (dataType === settingTypes.csv) {
					handleCsvTypeSelected();
				} else if (dataType === settingTypes.weightedCsv) {
					handleWeightedCsvTypeSelected();
				} else if (dataType === settingTypes.boolean) {
					handleBooleanTypeSelected();
				} else if (isNumberDataType(dataType)) {
					handleNumberTypeSelected();
				} else if (dataType === settingTypes.guid) {
					handleGuidTypeSelected();
				}
			},
			close: function () {
				$('#settingsDialog .timeSpan').hide();
				$('#dlgValue').attr('disabled', false);
			},
			buttons: {
				Save: function () {
					var newSetting;
					var isThereHiddenRow = $(this).find('.hiddenRow').length;
					var params = {
						id: editSettingDialog.currentId,
						value: $('#dlgValue').val(),
						comment: $('#dlgComment').val(),
						env: $('#dlgIsEnvSpecific').prop('checked'),
						isMasked: $('#dlgIsMasked').prop('checked'),
						isValueSameForAllTestEnvironments:
							isThereHiddenRow > 0
								? $('.hiddenRow').find('input#dlgIsValueSameForAllTestEnvironments').prop('checked')
								: $('#dlgIsValueSameForAllTestEnvironments').prop('checked'),
						isValueUniqueForProduction:
							isThereHiddenRow > 0
								? $('.hiddenRow').find('input#dlgIsValueUniqueForProduction').prop('checked')
								: $('#dlgIsValueUniqueForProduction').prop('checked'),

						// following settings will NOT get updated on save
						group: $('#dlgGroup').val(),
						type: $('#dlgType').val(),
						name: $('#dlgName').val(),
					};

					if (params.id == -1) {
						// for new settings, append extra parameters
						newSetting = true;
					}

					var url = getConfigUrlPrefix() + '/SetSettingAjax';
					$.post(url, params, function (response) {
						if (response.SettingSaved) {
							if (newSetting && $.inArray(params.group, window.groupNames) == -1) {
								window.groupNames.push(params.group);
								$('#GroupName').append('<option>' + params.group + '</option>');
								$('#GroupName').val(params.group);
							}

							var message = 'Setting Saved!<br>';
							message += 'Setting Group: ' + params.group + ' Setting Name: ' + params.name + '<br>';
							if (response.Message !== undefined && response.Message !== '' && response.Message !== null) {
								message += 'But there was an exception creating the system event for the change <br>';
								message += 'Exception: ' + response.Message + ' <br>';
							}
							updateSettingResults(function () {
								showMessage(message);
							});
						} else {
							showAlertDialog('Error', 'Setting was NOT saved! ' + response.Message);
						}
						editSettingDialog.dialog('close');
					});
				},
				Cancel: function () {
					editSettingDialog.dialog('close');
				},
			},
		});

		function handleTimeSpanTypeSelected() {
			$('#dlgValue').attr('disabled', true);
			$('#settingsDialog .timeSpan').show();
			$('#dlgDays').val('');
			$('#dlgHours').val('');
			$('#dlgMinutes').val('');
			$('#dlgSeconds').val('');
			$('#dlgMilliseconds').val('');
		}

		function handleRedisEndpointsTypeSelected() {
			// Cleanup
			$('#redisEndpoints .redisEndpointInput').remove();
			showRedisEndpointsMessage();

			// Enable
			$('#dlgValue').attr('disabled', true);
			$('#settingsDialog #redisEndpoints').show();

			// Load Current Value
			var endpoints = $('#dlgValue').val().split(',');
			var i;
			for (i = 0; i < endpoints.length; i++) {
				addRedisEndpointInput();
			}

			var inputs = $('#redisEndpoints .redisEndpointInput');
			for (i = 0; i < endpoints.length; i++) {
				$(inputs[i]).val(endpoints[i]);
			}
		}

		function handleWeightedCsvTypeSelected() {
			// Cleanup
			$('#weightedCsv .weightedValueInput').remove();
			showWeightedCsvMessage();

			// Enable
			$('#dlgValue').attr('disabled', true);
			$('#settingsDialog #weightedCsv').show();

			// Load Current Value
			var weightedValues = $('#dlgValue').val().split(',');
			var i;
			for (i = 0; i < weightedValues.length; i++) {
				addWeightedValueInput();
			}

			var inputs = $('#weightedCsv .weightedValueInput');
			for (i = 0; i < weightedValues.length; i++) {
				$(inputs[i]).val(weightedValues[i]);
			}
		}

		function handleBooleanTypeSelected() {
			if (isFeatureEnabled('IsNewBooleanTypeEnabled', handleBooleanTypeSelected)) {
				var booleanDialog = $('#settingsDialog .boolean');
				var boolRadioButtons = booleanDialog.find("input[type='radio']");
				var trueRadio = booleanDialog.find('#true-radio');
				var falseRadio = booleanDialog.find('#false-radio');
				var dialogValue = $('#dlgValue');
				boolRadioButtons.unbind('click');
				booleanDialog.show();

				var value = dialogValue.val();

				boolRadioButtons.click(function () {
					if (trueRadio.is(':checked')) {
						dialogValue.val('True');
					}
					if (falseRadio.is(':checked')) {
						dialogValue.val('False');
					}
				});

				dialogValue.on('input', function () {
					value = dialogValue.val();
					if (value.toLowerCase() === 'true') {
						trueRadio.prop('checked', 'true');
					} else {
						falseRadio.prop('checked', 'true');
					}
				});

				if (value.toLowerCase() === 'true') {
					trueRadio.prop('checked', 'true');
					dialogValue.val('True');
				} else {
					falseRadio.prop('checked', 'true');
					dialogValue.val('False');
				}
			}
		}

		function handleCsvTypeSelected() {
			if (isFeatureEnabled('IsCsvTypeEnabled', handleCsvTypeSelected)) {
				var csvDialog = $('#settingsDialog .csv');
				var dialogValue = $('#dlgValue');

				csvDialog.find('.csvInput').remove();
				dialogValue.attr('disabled', true);
				csvDialog.show();

				var values = dialogValue.val().split(',');
				var i;
				for (i = 0; i < values.length; i++) {
					addCsvInput();
					$(csvDialog.find('.csvInput')[i]).val(values[i]);
				}
			}
		}

		function handleNumberTypeSelected() {
			if (isFeatureEnabled('IsNewNumberTypeEnabled', handleNumberTypeSelected)) {
				var dialogValue = $('#dlgValue');
				var numberDialog = $('#settingsDialog .number');
				var numberInput = numberDialog.find('.numberInput');

				dialogValue.attr('disabled', true);
				numberDialog.show();

				numberInput.on('input', function () {
					dialogValue.val(numberInput.val());
				});

				var numberValue = 0;
				var value = dialogValue.val();
				if (value !== '' && !isNaN(value)) {
					numberValue = value;
				}

				dialogValue.val(numberValue);
				numberInput.val(numberValue);
			}
		}

		function isFeatureEnabled(settingName, callback) {
			var isFeatureEnabled = localStorage.getItem(settingName);
			if (isFeatureEnabled == null || isFeatureEnabled == undefined) {
				$.get(
					'/Config/GetSetting?' + $.param({ settingGroupName: 'AdminWebsite.Properties.Settings', settingName: settingName }),
				).then(function (data) {
					isFeatureEnabled = data && data.Value.toLowerCase() == 'true';
					localStorage.setItem(settingName, isFeatureEnabled);
					if (isFeatureEnabled) {
						callback();
					}
				});
			} else {
				return isFeatureEnabled;
			}
		}

		function removeGuidHyphens() {
			var dialogValue = $('#dlgValue');
			dialogValue.val(dialogValue.val().replace(/-/g, ''));
		}

		function setGuidFieldValues(val1, val2, val3, val4, val5) {
			var guidDialog = $('#settingsDialog .guid');
			var guidInput1 = guidDialog.find('#guidInput1');
			var guidInput2 = guidDialog.find('#guidInput2');
			var guidInput3 = guidDialog.find('#guidInput3');
			var guidInput4 = guidDialog.find('#guidInput4');
			var guidInput5 = guidDialog.find('#guidInput5');

			guidInput1.val(val1);
			guidInput2.val(val2);
			guidInput3.val(val3);
			guidInput4.val(val4);
			guidInput5.val(val5);
		}

		function handleGuidTypeSelected() {
			if (isFeatureEnabled('IsNewGuidTypeEnabled', handleGuidTypeSelected)) {
				var dialogValue = $('#dlgValue');
				var value = dialogValue.val();
				if (value.length !== 0) {
					getAndSetGuidFieldValuesFromDialogValue();
				} else {
					setGuidFieldValues('', '', '', '', '');
				}

				var guidDialog = $('#settingsDialog .guid');

				guidDialog.show();

				dialogValue.on('input', getAndSetGuidFieldValuesFromDialogValue);
				guidDialog.find("input[type='checkbox']").click(function () {
					if ($(this).is(':checked')) {
						removeGuidHyphens();
					} else {
						getAndSetDialogValueFieldFromGuidFields();
					}
				});

				guidDialog.on('input', getAndSetDialogValueFieldFromGuidFields);
			}
		}

		function getAndSetGuidFieldValuesFromDialogValue() {
			var value = $('#dlgValue').val();
			if (value.length !== 0) {
				var newValue = '';
				var valueCounter = 0;
				while (newValue.length < 36) {
					if (valueCounter < value.length) {
						if (value.charAt(valueCounter) !== '-') {
							newValue = newValue.concat(value.charAt(valueCounter));
						}
						valueCounter++;
					} else {
						newValue = newValue.concat('0');
					}
					if (newValue.length === 8 || newValue.length === 13 || newValue.length === 18 || newValue.length === 23) {
						newValue = newValue.concat('-');
					}
				}
			}

			setGuidFieldValues(
				newValue.slice(0, 8),
				newValue.slice(9, 13),
				newValue.slice(14, 18),
				newValue.slice(19, 23),
				newValue.slice(24, 36),
			);
		}

		function getAndSetDialogValueFieldFromGuidFields() {
			var dialogValue = $('#dlgValue');
			var guidDialog = $('#settingsDialog .guid');
			var guidInput1 = guidDialog.find('#guidInput1');
			var guidInput2 = guidDialog.find('#guidInput2');
			var guidInput3 = guidDialog.find('#guidInput3');
			var guidInput4 = guidDialog.find('#guidInput4');
			var guidInput5 = guidDialog.find('#guidInput5');

			if (
				guidInput1.val().length === 8 &&
				guidInput2.val().length === 4 &&
				guidInput3.val().length === 4 &&
				guidInput4.val().length === 4 &&
				guidInput5.val().length === 12
			) {
				var value =
					guidInput1.val() + '-' + guidInput2.val() + '-' + guidInput3.val() + '-' + guidInput4.val() + '-' + guidInput5.val();
				dialogValue.val(value);
			}
		}

		function init() {
			$('#messageDiv').live('click', function () {
				hideMessage();
			});

			$('#dlgGroup').autocomplete({ source: window.groupNames });
			$('#dlgType').autocomplete({
				source: [
					settingTypes.boolean,
					settingTypes.byte,
					settingTypes.decimal,
					settingTypes.double,
					settingTypes.float,
					settingTypes.guid,
					settingTypes.int32,
					settingTypes.int64,
					settingTypes.string,
					settingTypes.timespan,
					settingTypes.redisEndpoints,
					settingTypes.csv,
					settingTypes.weightedCsv,
				],
				minLength: 0,
				delay: 0,
			});

			$('#dlgValue').autocomplete({
				source: ['True', 'False'],
				minLength: 0,
				delay: 0,
			});

			$("#settingsResultsDiv a:contains('Edit')").live('click', function () {
				if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
					return false;
				}

				var id = $(this).closest('tr').data('sid');
				/* there is a chance that a masked setting has been unmasked. the value fetched by the below ajax call will return a masked value
				 * but we want dialog box that opens to have the actual value instead of [value not shown], so we grab the text from the relevant div
				 */
				var unmaskedValue = $(this).parents('tr').find('.setting-value').text();

				var url = getConfigUrlPrefix() + '/GetSettingAjax?id=';
				$.getJSON(url + id, function (s) {
					$('#dlgGroup').attr('disabled', true).val(s.GroupName);
					$('#dlgType').attr('disabled', true).val(s.Type);
					$('#dlgName').attr('disabled', true).val(s.Name);
					$('#dlgName').removeClass('error');
					$('#dlgNameMessage').hide();
					$('#dlgModified').val(s.LastModified);

					if (s.IsMasked) {
						s.Value = unmaskedValue;
					}
					$('#dlgValue').val(s.Value);
					$('#dlgValueOriginal').empty();
					$('#dlgValueOriginal').text(s.Value);
					$('#dlgComment').val(s.Comment);
					$('#dlgIsEnvSpecific').prop('checked', s.IsEnvironmentSpecific);
					$('#dlgIsMasked').prop('checked', s.IsMasked);
					$('#dlgIsValueSameForAllTestEnvironments').prop('checked', s.IsValueSameForAllTestEnvironments);
					$('#dlgIsValueUniqueForProduction').prop('checked', s.IsValueUniqueForProduction);

					$('#dlgShutdownSettingWarning').toggle(s.IsShutdownSetting);
					$('#dlgRestrictedSettingWarning').toggle(s.IsRestrictedSetting && !s.IsShutdownSetting);

					editSettingDialog.currentId = id;
					editSettingDialog.dialog('option', 'title', 'Edit Setting');
					editSettingDialog.dialog('open');
				});
				return false;
			});

			$("#settingsResultsDiv a:contains('Delete')").live('click', function () {
				if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
					return false;
				}
				var id = $(this).closest('tr').data('sid');
				var name = $(this).closest('tr').find('div.n').attr('title');
				return showDeleteDialog(
					'/Config/DeleteSettingAjax',
					id,
					'Are you sure you want to delete ' + name + '?',
					updateSettingResults,
				);
			});

			$('#configTabs').tabs();

			$('span[data-make-button]').button();

			$('#CreateNewSettingButton').click(function () {
				if (!Roblox.Admi.SettingsSemaphore.doesUserHoldLockForType(Roblox.Admi.SettingsSemaphore.Types.Platform)) {
					return false;
				}
				// default to currently selected group
				var defaultName = $('#GroupName').val();
				if (defaultName == '*') {
					defaultName = ''; // do not show * when all grups is selected in the drop down
				}
				$('#dlgGroup').attr('disabled', false).val(defaultName);
				$('#dlgType').attr('disabled', false).val('');
				$('#dlgName').attr('disabled', false).val('');
				$('#dlgName').removeClass('error');
				$('#dlgNameMessage').hide();
				$(":button:contains('Save')").prop('disabled', false).removeClass('ui-state-disabled');
				$('#dlgModified').val('Set Automatically');

				$('#dlgValue').val('');
				$('#dlgValue').removeClass('error');
				$('#dlgValueMessage').hide();
				$('#dlgComment').val('');
				$('#dlgIsEnvSpecific').prop('checked', false);
				$('#dlgIsMasked').prop('checked', false);
				$('#dlgIsValueSameForAllTestEnvironments').prop('checked', false);
				$('#dlgIsValueUniqueForProduction').prop('checked', false);

				$('#dlgShutdownSettingWarning').hide();
				$('#dlgRestrictedSettingWarning').hide();

				editSettingDialog.currentId = -1;
				editSettingDialog.dialog('option', 'title', 'Create Setting');
				editSettingDialog.dialog('open');

				return false;
			});

			$('#dlgType').on('input autocompleteclose', function () {
				$('#dlgValue').attr('disabled', false);
				$('#settingsDialog .timeSpan').hide();
				$('#settingsDialog #redisEndpoints').hide();
				$('#settingsDialog .csv').hide();
				$('#settingsDialog #weightedCsv').hide();
				$('#settingsDialog .boolean').hide();
				$('#settingsDialog .number').hide();
				$('#settingsDialog .guid').hide();

				var dataType = $('#dlgType').val();
				if (dataType === settingTypes.timespan && $('#dlgDays').is(':hidden')) {
					handleTimeSpanTypeSelected();
				} else if (dataType === settingTypes.redisEndpoints) {
					handleRedisEndpointsTypeSelected();
				} else if (dataType === settingTypes.csv) {
					handleCsvTypeSelected();
				} else if (dataType === settingTypes.weightedCsv) {
					handleWeightedCsvTypeSelected();
				} else if (dataType === settingTypes.boolean) {
					handleBooleanTypeSelected();
				} else if (isNumberDataType(dataType)) {
					handleNumberTypeSelected();
				} else if (dataType === settingTypes.guid) {
					handleGuidTypeSelected();
				}
			});

			$('#dlgDays, #dlgHours, #dlgMinutes, #dlgSeconds, #dlgMilliseconds').on('input', function () {
				var days = $('#dlgDays').val().trim();
				var hours = $('#dlgHours').val().trim();
				var minutes = $('#dlgMinutes').val().trim();
				var seconds = $('#dlgSeconds').val().trim();
				var milliseconds = $('#dlgMilliseconds').val().trim();
				var params = {
					days: days == '' ? '0' : days,
					hours: hours == '' ? '0' : hours,
					minutes: minutes == '' ? '0' : minutes,
					seconds: seconds == '' ? '0' : seconds,
					milliseconds: milliseconds == '' ? '0' : milliseconds,
				};
				$.ajax({
					type: 'GET',
					url: '/Config/GetTimeSpan',
					data: params,
					success: function (response) {
						$('#dlgValue').val(response);
					},
					error: function () {
						alert('Invalid input!');
					},
				});
			});

			$('#redisEndpoints #dlgRedisEndpointsAddRow').click(addRedisEndpointInput);
			$('#redisEndpoints #dlgRedisEndpointsValidate').click(validateRedisEndpoints);

			$('#weightedCsv #dlgWeightedCsvAddRow').click(addWeightedValueInput);
			$('#weightedCsv #dlgWeightedCsvValidate').click(validateWeightedCsv);

			$('#settingsDialog .csv #csvAddButton').click(addCsvInput);

			$('#GroupName').change(function (evt) {
				if (this.value) {
					updateSettingResults();
				}
				putSearchTextIntoAnchortext();
			});

			$('#NamePattern').keyup(function (evt) {
				if (evt.keyCode === 13) {
					updateSettingResults();
				} else {
					delay(function () {
						updateSettingResults();
					}, 200);
				}
			});

			$('#ValuePattern').keyup(function (evt) {
				if (evt.keyCode === 13) {
					updateSettingResults();
				} else {
					delay(function () {
						updateSettingResults();
					}, 200);
				}
			});

			$('#resetSelectionButton').on('click', function () {
				$('#GroupName').prop('selectedIndex', 0).change();
			});

			$('#ClearButton').click(function (evt) {
				$('#NamePattern').val('');
				$('#ValuePattern').val('');
				updateSettingResults();
			});

			var dlgNameField = $('#dlgName');
			var dlgNameMessage = $('#dlgNameMessage');
			dlgNameField.keyup(function () {
				if (isKeyValid(dlgNameField.val())) {
					dlgNameField.removeClass('error');
					dlgNameMessage.fadeOut('fast');
					$(":button:contains('Save')").prop('disabled', false).removeClass('ui-state-disabled');
				} else {
					dlgNameField.addClass('error');
					dlgNameMessage.fadeIn('fast');
					$(":button:contains('Save')").prop('disabled', true).addClass('ui-state-disabled');
				}
			});

			var dlgValueField = $('#dlgValue');
			var dlgValueTooltip = $('#dlgValueMessage');
			dlgValueField.keyup(function () {
				if (isValueValid($(this).val())) {
					dlgValueField.removeClass('error');
					dlgValueTooltip.fadeOut('fast');
				} else {
					dlgValueField.addClass('error');
					dlgValueTooltip.fadeIn('fast');
				}
			});

			readAnchorText();

			if ($('#GroupName').length !== 0) {
				$('#GroupName').select2();
			}

			localStorage.clear();
		}

		/////////////////////////////////////
		// edit connection strings

		var editConnectionDialog = $('#connectionStringDialog').dialog({
			modal: true,
			resizable: false,
			width: 520,
			autoOpen: false,
			buttons: {
				Test: function () {
					var params = {
						id: editConnectionDialog.currentId,
						value: $('#conDlgValue').val(),
					};
					$.post('/Config/TestConnectionStringAjax', params, function (response) {
						if (response.Success) {
							showAlertDialog('Roblox', 'Connection string is valid');
						} else {
							showAlertDialog('Error', 'Connection string has issue: ' + response.Message);
						}
					});
				},
				Save: function () {
					var params = {
						id: editConnectionDialog.currentId,
						value: $('#conDlgValue').val(),
					};

					var group = $('#conDlgGroup').val();
					var name = $('#conDlgName').val();

					if (params.id == -1) {
						// for new settings, append extra parameters
						params.group = group;
						params.name = name;
					}

					$.post('/Config/SetConnectionStringAjax', params, function (response) {
						if (response.Success) {
							updateConnectionsResults();
							showAlertDialog('Roblox', 'Connection string ' + name + ' in group ' + group + ' was saved');
						} else {
							showAlertDialog('Error', 'Connection string was NOT saved! ' + response.Message);
						}

						editConnectionDialog.dialog('close');
					});
				},
				Cancel: function () {
					editConnectionDialog.dialog('close');
				},
			},
		});

		$("#connectionStringsResultsDiv a:contains('Edit')").live('click', function () {
			var id = $(this).closest('tr').data('id');
			$.getJSON('/Config/GetConnectionStringAjax?id=' + id, function (s) {
				$('#conDlgGroup').attr('disabled', true).val(s.GroupName);
				$('#conDlgName').attr('disabled', true).val(s.Name);
				$('#conDlgModified').val(s.LastModified);
				$('#conDlgValue').val(s.Value);

				editConnectionDialog.currentId = id;
				editConnectionDialog.dialog('option', 'title', 'Edit Connection String');
				editConnectionDialog.dialog('open');
			});
			return false;
		});

		$("#connectionStringsResultsDiv a:contains('Delete')").live('click', function () {
			var id = $(this).closest('tr').data('id');
			return showDeleteDialog(
				'/Config/DeleteConnectionStringAjax',
				id,
				'Are you sure you want to delete this connection string?',
				updateConnectionsResults,
			);
		});

		function updateConnectionsResults() {
			$('#connectionStringsResultsDiv').load('/Config/GetConnectionStringsHtmlAjax');
		}

		$('#CreateNewConnectionButton').click(function () {
			$('#conDlgGroup').attr('disabled', false).val('');
			$('#conDlgName').attr('disabled', false).val('');
			$('#conDlgModified').val('Set Automatically');
			$('#conDlgValue').val('');

			editConnectionDialog.currentId = -1;
			editConnectionDialog.dialog('option', 'title', 'Create Connection String');
			editConnectionDialog.dialog('open');

			return false;
		});

		function addRedisEndpointInput() {
			$('#redisEndpoints #dlgRedisEndpointsInputs').append(
				'<input type="text" class="redisEndpointInput" placeholder="hostname with port or port range. eg. redisserver:8000-8003" />',
			);

			$('#redisEndpoints .redisEndpointInput').on('input', function () {
				var endpointFields = $('#redisEndpoints .redisEndpointInput');
				var endpoints = [];
				for (var i = 0; i < endpointFields.length; i++) {
					var endpoint = $(endpointFields[i]).val().trim();
					if (endpoint.length > 0) {
						endpoints.push(endpoint);
					}
				}

				var endpointsString = '';
				for (var i = 0; i < endpoints.length; i++) {
					if (endpointsString !== '') {
						endpointsString = endpointsString + ',';
					}
					endpointsString = endpointsString + endpoints[i];
				}

				$('#dlgValue').val(endpointsString);
			});
		}

		function validateRedisEndpoints() {
			var allEndpoints = $('#dlgValue').val();
			var params = {
				rawEndpoints: allEndpoints,
			};
			showRedisEndpointsMessage();

			$.ajax({
				type: 'POST',
				url: '/Config/ValidateRedisEndpoints',
				data: params,
				success: function (response) {
					if (response.Success === true) {
						showRedisEndpointsMessage('Success: ' + response.Message);
					} else {
						showRedisEndpointsWarning('Failed: ' + response.Message);
					}
				},
				error: function () {
					showRedisEndpointsWarning('Could not perform validation');
				},
			});
		}

		function showRedisEndpointsMessage(message) {
			$('#redisEndpoints #dlgRedisEndpointsMessage').text(message || '');
			$('#redisEndpoints #dlgRedisEndpointsWarning').text('');
		}
		function showRedisEndpointsWarning(message) {
			$('#redisEndpoints #dlgRedisEndpointsWarning').text(message || '');
			$('#redisEndpoints #dlgRedisEndpointsMessage').text('');
		}

		function addWeightedValueInput() {
			$('#weightedCsv #dlgWeightedCsvInputs').append(
				'<input type="text" class="weightedValueInput" placeholder="Value with weight. eg. foo:40" />',
			);

			$('#weightedCsv .weightedValueInput').on('input', function () {
				var weightedValueFields = $('#weightedCsv .weightedValueInput');
				var weightedValues = [];
				for (var i = 0; i < weightedValueFields.length; i++) {
					var weightedValue = $(weightedValueFields[i]).val().trim();
					if (weightedValue.length > 0) {
						weightedValues.push(weightedValue);
					}
				}

				var weightedValuesString = '';
				for (var i = 0; i < weightedValues.length; i++) {
					if (weightedValuesString !== '') {
						weightedValuesString = weightedValuesString + ',';
					}
					weightedValuesString = weightedValuesString + weightedValues[i];
				}

				$('#dlgValue').val(weightedValuesString);
			});
		}

		function validateWeightedCsv() {
			var allWeightedCsv = $('#dlgValue').val();
			var params = {
				rawWeightedCsv: allWeightedCsv,
			};
			showWeightedCsvMessage();

			$.ajax({
				type: 'POST',
				url: '/Config/ValidateWeightedCsv',
				data: params,
				success: function (response) {
					if (response.Success === true) {
						showWeightedCsvMessage('Success: ' + response.Message);
					} else {
						showWeightedCsvWarning('Failed: ' + response.Message);
					}
				},
				error: function () {
					showWeightedCsvWarning('Could not perform validation');
				},
			});
		}

		function showWeightedCsvMessage(message) {
			$('#weightedCsv #dlgWeightedCsvMessage').text(message || '');
			$('#weightedCsv #dlgWeightedCsvWarning').text('');
		}
		function showWeightedCsvWarning(message) {
			$('#weightedCsv #dlgWeightedCsvWarning').text(message || '');
			$('#weightedCsv #dlgWeightedCsvMessage').text('');
		}

		function addCsvInput() {
			var csvInputs = $('#settingsDialog .csv #csvInputs');
			csvInputs.append('<input type="text" class="csvInput" />');

			var csvInput = $('#settingsDialog .csv .csvInput');
			csvInput.on('input', function () {
				var valueString = '';

				for (var i = 0; i < csvInput.length; i++) {
					var input = $(csvInput[i]).val().trim();
					if (input.length > 0) {
						if (valueString !== '') {
							valueString = valueString + ',';
						}
						valueString = valueString + input;
					}
				}

				$('#dlgValue').val(valueString);
			});
		}

		updateConnectionsResults();

		return {
			init: init,
		};
	};
});

$(function () {
	Roblox.ConfigSettings().init();
});

$(function () {
	$('#webSettingHelpDisplayer').click(function () {
		$('.settingsExplanationHelpText').slideToggle();
	});
});
