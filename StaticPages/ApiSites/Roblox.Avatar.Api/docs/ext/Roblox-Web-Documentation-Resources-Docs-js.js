$(function () {
	var versionSelector = $('#version-selector');
	var urlVersion = (location.hash.match(/v[\d\.]+/i) || [''])[0];
	var defaultVersion = versionSelector.val() || 'v1';
	var initVersion = (versionSelector.find("option[value='" + urlVersion + "']").length > 0 ? urlVersion : defaultVersion).toLowerCase();

	function getDocsJsonUrl(version) {
		return document.location.pathname + 'json/' + version.toLowerCase() + '.json';
	}

	if (window.SwaggerTranslator) {
		window.SwaggerTranslator.translate();
	}

	if (initVersion != defaultVersion) {
		versionSelector.val(initVersion);
	}

	window.swaggerUi = new SwaggerUi({
		url: getDocsJsonUrl(initVersion),
		dom_id: 'swagger-ui-container',
		booleanValues: [true, false],
		onComplete: function (swaggerApi, swaggerUi) {
			$('#doc_info > .info_title').text(swaggerApi.info.title);

			if (window.SwaggerTranslator) {
				window.SwaggerTranslator.translate();
			}

			$('pre code').each(function (i, e) {
				hljs.highlightBlock(e);
			});

			swaggerApi.apisArray.forEach(function (api) {
				api.operationsArray.forEach(function (operation) {
					var id = operation.encodedParentId + '_' + operation.nickname;
					var properties = operation.operation.properties;

					if (properties.internal) {
						$('#' + id + '_content').prepend(
							'<h4><span class="internal-text" data-sw-translate>Internal: This endpoint is not public documented.</span></h4>',
						);
					}

					// https://github.com/domaindrivendev/Swashbuckle/issues/502 :sob:
					if (operation.deprecated && properties.obsoleteMessage) {
						$('#' + id + '_content > h4').each(function () {
							if ($(this).text().indexOf('Deprecated') >= 0) {
								var message = '';
								if (properties.deprecationDate) {
									var deprecationDate = new Date(properties.deprecationDate);
									message = 'This endpoint will be disabled on ' + deprecationDate.toLocaleDateString();
								}

								message += '\n' + properties.obsoleteMessage;
								$(this).after($('<span class="deprecation-text">').text(message));
							}
						});
					}
				});
			});

			window.swaggerApi = swaggerApi;
		},
		onFailure: function (data) {
			$('#doc_info > .info_title').text('Documentation failed to load');
		},
		docExpansion: 'list',
		jsonEditor: false,
		apisSorter: null, // default to server
		defaultModelRendering: 'schema',
		showRequestHeaders: false,
		validatorUrl: null,
		useJQuery: true,
	});

	var takeoverSlides = {
		slideUp: function () {
			$(this).parent().parent().parent().removeClass('active');
		},
		slideDown: function () {
			$(this).parent().parent().parent().addClass('active');
		},
	};
	Object.keys(takeoverSlides).forEach(function (method) {
		var original = $.fn[method];
		$.fn[method] = function () {
			$(this).trigger(method);
			original.apply(this, arguments);
		};
		$('body').on(method, '.endpoint .content', takeoverSlides[method]);
	});

	$('#version-selector').on('change', function () {
		$('#doc_info > .info_title').text('Loading documentation...');
		location.hash = '#!/' + $(this).val();
		swaggerUi.updateSwaggerUi({ url: getDocsJsonUrl($(this).val()) });
	});

	$('.warning-close').on('click', function () {
		$('body.swagger-section').removeClass('show-warning');
	});

	window.swaggerUi.load();
});
