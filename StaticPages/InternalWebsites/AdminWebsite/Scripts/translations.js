$(function () {
	var namespaceSelect = $('#namespace');
	var localeSelect = $('#locale');
	var translatedContentsContainerDiv = $('#translatedContentsContainer');
	var translationsContainterSelects = $('#translationsContainter select');

	var namespaceToCreateOrEditContentSelect = $('#namespaceToCreateOrEditContent');
	var keyToCreateOrEditText = $('#keyToCreateOrEdit');
	var typeOfContentToCreateOrEditSelect = $('#typeOfContentToCreateOrEdit');
	var englishStringToCreateOrEditTextarea = $('#englishStringToCreateOrEdit');
	var descriptionToCreateOrEditTextarea = $('#descriptionToCreateOrEdit');
	var consumersToCreateOrEditCheckboxes = $('#consumersToCreateOrEdit input:checkbox');
	var createdByTextarea = $('#createdBy');
	var dateCreatedTextarea = $('#dateCreated');
	var lastEditedByTextarea = $('#lastEditedBy');
	var dateEditedTextarea = $('#dateEdited');
	var createOrEditContentErrorMessageDiv = $('#createOrEditContentErrorMessage');

	var contentsToImportTextarea = $('#contentsToImport');
	var importContentsErrorMessageDiv = $('#importContentsErrorMessage');

	var namespaceToExportSelect = $('#namespaceToExport');
	var localeToExportSelect = $('#localeToExport');
	var allConsumersRadio = $('#allConsumers');
	var consumerToExportRadios = $('input[name=consumerToExport]');
	var exportContentsResultDiv = $('#exportContentsResult');
	var allNamespaces = $('#namespaceToExport option')
		.map(function () {
			return $(this).val();
		})
		.get()
		.filter((name) => name !== '');

	var namespaceToEditUrlsDiv = $('#namespaceToEditUrls');
	var keyToEditUrlsDiv = $('#keyToEditUrls');
	var localizedUrlsTableBody = $('#localizedUrls tbody');
	var editUrlsErrorMessageDiv = $('#editUrlsErrorMessage');

	var sampleImportString = JSON.stringify(
		{
			Contents: [
				{
					Namespace: '',
					Key: '',
					English: '',
					Type: '',
					Description: '',
					ConsumersToAdd: [],
					ConsumersToRemove: [],
				},
			],
		},
		null,
		'    ',
	);

	var loadContents = function () {
		if (namespaceSelect.prop('selectedIndex') == 0) {
			return;
		}
		var namespace = namespaceSelect.val();
		var locale = localeSelect.val();
		var url = Roblox.TranslationUrls.contents;
		translatedContentsContainerDiv.load(url, $.param({ namespaceName: namespace, supportedLocaleCode: locale }));
	};

	var newlineToBr = function (str) {
		return str.replace(/(\r?\n)/g, '<br>');
	};

	var downloadDataAsFile = function (data, filename) {
		var a = $("<a style='display: none;'/>");
		var downloadUrl = window.URL.createObjectURL(new Blob([data]));
		a.attr('href', downloadUrl);
		a.attr('download', filename);
		$('body').append(a);
		a[0].click();
		window.URL.revokeObjectURL(downloadUrl);
		a.remove();
	};

	var setDialogResultMessageStyle = function (messageDiv, isError) {
		if (isError) {
			messageDiv.addClass('dialog-fail-message').removeClass('dialog-success-message');
		} else {
			messageDiv.addClass('dialog-success-message').removeClass('dialog-fail-message');
		}
	};

	var buildDialog = function (dialogDiv, title) {
		return dialogDiv.dialog({
			title: title,
			modal: true,
			resizable: false,
			width: 520,
			autoOpen: false,
		});
	};

	var createExportResult = function (jsonResponses) {
		var localeContentsMapping = {};
		var count = 0;
		Array.from(jsonResponses).forEach(function (jsonResponse) {
			for (var i = 0; i < jsonResponse.ContentsForLocales.length; i++) {
				var contents = jsonResponse.ContentsForLocales[i].Contents;
				var locale = jsonResponse.ContentsForLocales[i].Locale;
				count = count + contents.length;
				if (localeContentsMapping.hasOwnProperty(locale)) {
					localeContentsMapping[locale] = localeContentsMapping[locale].concat(contents);
				} else {
					localeContentsMapping[locale] = contents;
				}
			}
		});

		var result = { ContentsForLocales: [] };
		for (var locale in localeContentsMapping) {
			if (localeContentsMapping.hasOwnProperty(locale)) {
				result.ContentsForLocales.push({ Locale: locale, Contents: localeContentsMapping[locale] });
			}
		}
		return [result, count];
	};

	var getChangedUrls = function () {
		var rows = localizedUrlsTableBody.find('tr');
		var changeUrls = [];
		rows.each(function () {
			var locale = $(this).data('locale');
			var oldUrl = $(this).data('url');
			var newUrl = $(this).find('input').val();
			if (oldUrl !== newUrl) {
				changeUrls.push({ locale: locale, translation: newUrl });
			}
		});
		return changeUrls;
	};

	var updateLocalizedUrlsTable = function (translations) {
		for (var i = 0; i < translations.length; i++) {
			var url = translations[i].Translation ? translations[i].Translation : '';
			localizedUrlsTableBody.append(
				`<tr data-locale="${translations[i].LocaleCode}" data-url="${url}">
                    <td class="col-md-2" title="${translations[i].LocaleName}">${translations[i].LocaleCode}</td>
                    <td class="col-md-10">
                        <input class="form-control" type="text" value="${url}">
                    </td>
                </tr>`,
			);
		}
	};

	var loadLocalizedUrls = function (namespace, key) {
		localizedUrlsTableBody.empty();
		$.ajax({
			url: Roblox.TranslationUrls.translations,
			type: 'GET',
			data: { namespaceName: namespace, key: key },
			contentType: 'application/json; charset=utf-8',
			success: function (data) {
				updateLocalizedUrlsTable(data.Translations);
			},
			error: function (jqXHR) {
				editUrlsErrorMessageDiv.html(newlineToBr(jqXHR.responseJSON.Error));
			},
		});
	};

	translationsContainterSelects.change(loadContents);
	translationsContainterSelects.select2();

	var createOrEditContentDialog = buildDialog($('#createOrEditContentDialog'), '');

	createOrEditContentDialog.on('dialogopen', function () {
		createOrEditContentErrorMessageDiv.html('');
	});

	createOrEditContentDialog.dialog('option', 'buttons', {
		Save: function () {
			var namespace = namespaceToCreateOrEditContentSelect.val();
			var key = keyToCreateOrEditText.val();
			var type = typeOfContentToCreateOrEditSelect.val();
			var english = englishStringToCreateOrEditTextarea.val();
			var description = descriptionToCreateOrEditTextarea.val();
			var consumersToAdd = new Array();
			var consumersToRemove = new Array();
			consumersToCreateOrEditCheckboxes.each(function () {
				if (this.checked) {
					consumersToAdd.push(this.value);
				} else {
					consumersToRemove.push(this.value);
				}
			});

			var content = {
				namespace: namespace,
				key: key,
				type: type,
				english: english,
				description: description,
				consumersToAdd: consumersToAdd,
				consumersToRemove: consumersToRemove,
			};

			$.ajax({
				url: createOrEditContentDialog.currentId === '' ? Roblox.TranslationUrls.createContent : Roblox.TranslationUrls.editContent,
				type: 'POST',
				data: JSON.stringify(content),
				contentType: 'application/json; charset=utf-8',
				success: function () {
					createOrEditContentDialog.dialog('close');
					namespaceSelect.val(namespaceToCreateOrEditContentSelect.val()).trigger('change');
				},
				error: function (jqXHR) {
					createOrEditContentErrorMessageDiv.html(newlineToBr(jqXHR.responseJSON.Error));
				},
			});
		},
		Cancel: function () {
			createOrEditContentDialog.dialog('close');
		},
	});

	var importContentDialog = buildDialog($('#importContentsDialog'), 'Import contents');

	importContentDialog.on('dialogopen', function () {
		contentsToImportTextarea.val(sampleImportString);
		importContentsErrorMessageDiv.html('');
	});

	importContentDialog.dialog('option', 'buttons', {
		Import: function () {
			var dataToImport;
			try {
				dataToImport = JSON.parse(contentsToImportTextarea.val());
			} catch (e) {
				if (e instanceof SyntaxError) {
					importContentsErrorMessageDiv.html(e.message);
					return;
				}
				throw e;
			}
			if (!dataToImport.hasOwnProperty('Contents') || dataToImport['Contents'].length === 0) {
				importContentsErrorMessageDiv.html('Empty contents.');
				return;
			}
			$.ajax({
				url: Roblox.TranslationUrls.importContents,
				type: 'POST',
				data: JSON.stringify(dataToImport),
				contentType: 'application/json; charset=utf-8',
				success: function () {
					importContentDialog.dialog('close');
					loadContents();
				},
				error: function (jqXHR) {
					importContentsErrorMessageDiv.html(newlineToBr(jqXHR.responseJSON.Error));
				},
			});
		},
		Cancel: function () {
			importContentDialog.dialog('close');
		},
	});

	var exportContentDialog = buildDialog($('#exportContentsDialog'), 'Export contents');

	exportContentDialog.on('dialogopen', function () {
		exportContentsResultDiv.html('');
		allConsumersRadio.prop('checked', true);
	});

	exportContentDialog.dialog('option', 'buttons', {
		Export: function () {
			var namespaces = [namespaceToExportSelect.val()];

			if (namespaces[0] === '') {
				namespaces = allNamespaces;
			}

			var locale = localeToExportSelect.val();

			var consumer = '';
			if (!allConsumersRadio.prop('checked')) {
				consumer = consumerToExportRadios.filter(':checked').val();
			}

			var url = Roblox.TranslationUrls.exportContents;
			var requests = [];

			namespaces.forEach(function (item) {
				requests.push($.get(url, { namespaceName: item, supportedLocaleCode: locale, consumer: consumer }));
			});

			setDialogResultMessageStyle(exportContentsResultDiv, false);
			exportContentsResultDiv.html('Exporting...');

			$.when
				.apply($, requests)
				.done(function () {
					var jsonResponses;
					if (requests.length === 1) {
						jsonResponses = [arguments[0]];
					} else {
						jsonResponses = Array.from(arguments).map((x) => x[0]);
					}

					var [result, count] = createExportResult(jsonResponses);

					var namespaceInFilename = namespaces.length === 1 ? namespaces[0] : 'AllNamespaces';
					var localeInFilename = locale === '' ? 'AllLocales' : locale;
					var consumerInFilename = consumer === '' ? 'AllConsumers' : consumer;
					var filename = namespaceInFilename + '_' + localeInFilename + '_' + consumerInFilename + '.json';

					downloadDataAsFile(JSON.stringify(result), filename);

					setDialogResultMessageStyle(exportContentsResultDiv, false);
					exportContentsResultDiv.html(
						'Exported ' + count + ' translatable content' + (count === 1 ? '' : 's') + ' to ' + filename,
					);
				})
				.fail(function (jqXHR) {
					setDialogResultMessageStyle(exportContentsResultDiv, true);
					exportContentsResultDiv.html(jqXHR.responseJSON.Error);
				});
		},
		Cancel: function () {
			exportContentDialog.dialog('close');
		},
	});

	var editUrlsDialog = buildDialog($('#editUrlsDialog'), 'Edit Localized URLs');

	editUrlsDialog.on('dialogopen', function () {
		var namespace = $(this).data('namespace');
		var key = $(this).data('key');

		namespaceToEditUrlsDiv.html(namespace);
		keyToEditUrlsDiv.html(key);
		editUrlsErrorMessageDiv.html('');
		loadLocalizedUrls(namespace, key);
	});

	editUrlsDialog.dialog('option', 'buttons', {
		Save: function () {
			var namespace = $(this).data('namespace');
			var key = $(this).data('key');

			var changedUrls = getChangedUrls();

			if (changedUrls.length === 0) {
				editUrlsDialog.dialog('close');
				return;
			}

			$.ajax({
				url: Roblox.TranslationUrls.updateTranslations,
				type: 'POST',
				data: JSON.stringify({ namespace: namespace, key: key, translations: changedUrls }),
				contentType: 'application/json; charset=utf-8',
				success: function () {
					editUrlsDialog.dialog('close');
					loadContents();
				},
				error: function (jqXHR) {
					editUrlsErrorMessageDiv.html(newlineToBr(jqXHR.responseJSON.Error));
				},
			});
		},
		Cancel: function () {
			editUrlsDialog.dialog('close');
		},
	});

	var metadataElementMapping = {
		createdBy: createdByTextarea,
		dateCreated: dateCreatedTextarea,
		lastEditedBy: lastEditedByTextarea,
		dateEdited: dateEditedTextarea,
	};

	var clearAndHideMetadata = function () {
		$.each(metadataElementMapping, function (name, elem) {
			elem.val('').closest('div.form-group').hide();
		});
	};

	var populateAndShowMetadata = function (dataSourceElem) {
		$.each(metadataElementMapping, function (name, elem) {
			elem.val(dataSourceElem.data(name)).closest('div.form-group').show();
		});
	};

	$('#createButton').click(function () {
		namespaceToCreateOrEditContentSelect.prop('selectedIndex', namespaceSelect.prop('selectedIndex'));
		namespaceToCreateOrEditContentSelect.prop('disabled', false);
		keyToCreateOrEditText.val('');
		keyToCreateOrEditText.prop('disabled', false);
		typeOfContentToCreateOrEditSelect.prop('selectedIndex', 0);
		typeOfContentToCreateOrEditSelect.prop('disabled', false);
		englishStringToCreateOrEditTextarea.val('');
		descriptionToCreateOrEditTextarea.val('');
		consumersToCreateOrEditCheckboxes.prop('checked', false);
		clearAndHideMetadata();

		createOrEditContentDialog.consumers = new Set();
		createOrEditContentDialog.currentId = '';
		createOrEditContentDialog.dialog('option', 'title', 'Create a new translatable content');
		createOrEditContentDialog.dialog('open');
	});

	$('#importButton').click(function () {
		importContentDialog.dialog('open');
	});

	$('#exportButton').click(function () {
		namespaceToExportSelect.prop('selectedIndex', namespaceSelect.prop('selectedIndex'));
		localeToExportSelect.prop('selectedIndex', localeSelect.prop('selectedIndex'));
		exportContentDialog.dialog('open');
	});

	$('a[data-edit-content]').live('click', function () {
		namespaceToCreateOrEditContentSelect.prop('selectedIndex', namespaceSelect.prop('selectedIndex'));
		namespaceToCreateOrEditContentSelect.prop('disabled', true);
		keyToCreateOrEditText.val($(this).data('key'));
		keyToCreateOrEditText.prop('disabled', true);
		typeOfContentToCreateOrEditSelect.val($(this).data('type'));
		typeOfContentToCreateOrEditSelect.prop('disabled', true);
		englishStringToCreateOrEditTextarea.val($(this).data('english-string'));
		descriptionToCreateOrEditTextarea.val($(this).data('description'));

		var consumers = new Set($(this).data('consumers').split(','));
		consumersToCreateOrEditCheckboxes.each(function () {
			this.checked = consumers.has(this.value);
		});
		populateAndShowMetadata($(this));

		createOrEditContentDialog.currentId = $(this).data('id');
		createOrEditContentDialog.dialog('option', 'title', 'Edit translatable content');
		createOrEditContentDialog.dialog('open');
	});

	$('a[data-edit-urls]').live('click', function () {
		editUrlsDialog.data('namespace', namespaceSelect.val());
		editUrlsDialog.data('key', $(this).data('key'));
		editUrlsDialog.dialog('open');
	});
});
