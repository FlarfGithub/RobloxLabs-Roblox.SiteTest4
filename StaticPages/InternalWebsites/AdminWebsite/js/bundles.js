var Roblox = Roblox || {};

$.fn.serializeObject = function () {
	var obj = {};

	$.each(this.serializeArray(), function (_, o) {
		var name = o.name;
		var value = o.value;
		if (obj[name] === undefined) {
			obj[name] = value;
		}
	});

	return obj;
};

Roblox.Bundles = (function () {
	var selectors = {
		bundleName: '#Name',
		createBundleBtn: 'button.create-bundle',
		createBundleForm: 'form.create-bundle',
		saveBundleBtn: 'button.save-bundle',
		saveBundleForm: 'form.save-bundle',
		priceInRobuxInput: '#PriceInRobux',
		productStateSelected: "input[name='PurchasabilityStatus']:checked",
		productStateInputs: "input[name='PurchasabilityStatus']",
		invalidateBundleItem: '.invalidate-bundle-item',
		removeBundleItem: '.remove-bundle-item',
		addBundleAssetBtn: 'button.add-bundle-asset',
		addBundleAssetForm: 'form.add-bundle-asset',
		addBundleOutfitBtn: 'button.add-bundle-outfit',
		addBundleOutfitForm: 'form.add-bundle-outfit',
		bundleReleaseWarningBufferInHours: '#bundle-release-warning-buffer-in-hours',
		offsaleDeadlineInput: '#offSaleDeadline',
		offsaleDeadlineToggle: '#offsaleDeadlineToggle',
		marketingBoostToggle: "input[name='RequireMarketingBoost']",
		marketingBoostToggleSelected: "input[name='RequireMarketingBoost']:checked",
		updateAssetName: '.update-asset-name',
	};

	function showError(str, response) {
		if (response && response.responseJSON && response.responseJSON.Error) {
			str += ': ' + response.responseJSON.Error;
		}
		Roblox.Feedback.Error(str);
	}

	function showSuccess(str) {
		Roblox.Feedback.Success(str);
	}

	function hideToasts() {
		Roblox.Feedback.Reset();
	}

	var endpoints = {
		invalidateBundleItem: '/Bundles/InvalidateBundleItemThumbnail',
		removeBundleItem: '/Bundles/RemoveBundleItem',
		updateAssetName: '/Asset/UpdateAssetName',
	};

	function updatePriceInRobuxDisabled() {
		var selectedValue = $(selectors.productStateSelected).val();
		var disabled = selectedValue !== 'Purchasable';
		$(selectors.priceInRobuxInput).attr('disabled', disabled);
	}

	function updateBoostOptionsDisabled(disabled) {
		$('#BoostAmountScale').attr('disabled', disabled);
		$('#slider').attr('disabled', disabled);
		$('#BoostStartDate').attr('disabled', disabled);
		$('#BoostEndDate').attr('disabled', disabled);
	}

	function createBundle() {
		var form = $(selectors.createBundleForm);
		var serializedForm = form.serialize();
		var url = form.prop('action');
		$.ajax({
			type: 'POST',
			url: url,
			data: serializedForm,
			success: function (createBundleResponse) {
				showSuccess('Created bundle');
				var navigateUrl = '/Bundles/Configure?bundleId=' + createBundleResponse.BundleId;
				window.location.href = navigateUrl;
			},
			error: function (error) {
				showError('Error creating bundle', error);
			},
		});
	}

	function addBundleItem(isAsset) {
		var form = isAsset ? $(selectors.addBundleAssetForm) : $(selectors.addBundleOutfitForm);
		if (!isAsset) {
			// Required checkboxes validation
			var isError = false;

			var proportionLabel = $("label[for='Proportion']");
			if ($('[name=Proportion]:checked').length === 0) {
				isError = true;
				proportionLabel.addClass('has-error');
				showError('Error adding bundle item - must select a proportion');
			} else {
				proportionLabel.removeClass('has-error');
			}

			var bodyScaleLabel = $("label[for='BodyScale']");
			if ($('[name=BodyScale]:checked').length === 0) {
				isError = true;
				bodyScaleLabel.addClass('has-error');
				showError('Error adding bundle item - must select a body scale');
			} else {
				bodyScaleLabel.removeClass('has-error');
			}

			if (isError) {
				return;
			}
		}

		var serializedForm = form.serialize();
		var url = form.prop('action');

		var promise = saveBundlePromise(); // Save bundle details first
		$.when(promise).done(function () {
			$.ajax({
				type: 'POST',
				url: url,
				data: serializedForm,
				success: function (addBundleItemResponse) {
					showSuccess('Created bundle item');
					reloadPage();
				},
				error: function (error) {
					showError('Error adding bundle item', error);
				},
			});
		});
	}

	function invalidateBundleItem() {
		var elem = $(this);
		var bundleItemType = elem.data('bundleItemType');
		var bundleItemTargetId = elem.data('bundleItemTargetId');
		var url = endpoints.invalidateBundleItem;
		var postData = {
			bundleItemTargetId: bundleItemTargetId,
			bundleItemType: bundleItemType,
		};
		var promise = saveBundlePromise();
		$.when(promise).done(function () {
			// Save bundle details first
			$.ajax({
				type: 'POST',
				url: url,
				data: postData,
				success: function () {
					showSuccess("Refreshed bundle item's thumbnail.");
					reloadPage();
				},
				error: function (error) {
					showError("Error Invalidating bundle item's thumbnail", error);
				},
			});
		});
	}

	function removeBundleItem() {
		var elem = $(this);
		var bundleId = elem.data('bundleId');
		var bundleItemType = elem.data('bundleItemType');
		var bundleItemTargetId = elem.data('bundleItemTargetId');
		var url = endpoints.removeBundleItem;
		var postData = {
			bundleId: bundleId,
			bundleItemTargetId: bundleItemTargetId,
			bundleItemType: bundleItemType,
		};
		var promise = saveBundlePromise();
		$.when(promise).done(function () {
			// Save bundle details first
			$.ajax({
				type: 'POST',
				url: url,
				data: postData,
				success: function (removeBundleItemResponse) {
					showSuccess('Removed bundle item');
					reloadPage();
				},
				error: function (error) {
					showError('Error removing bundle item', error);
				},
			});
		});
	}

	function updateAssetName() {
		var elem = $(this);
		var bundleName = $(selectors.bundleName).val();
		var bundleItemTargetId = elem.data('bundleItemTargetId');
		var bundleItemName = elem.data('bundleItemName');

		var itemNameWithPrefix = bundleName + ' ' + bundleItemName;

		var url = endpoints.updateAssetName;
		var postData = {
			assetId: bundleItemTargetId,
			newAssetName: itemNameWithPrefix,
		};
		var promise = saveBundlePromise();
		$.when(promise).done(function () {
			// Save bundle details first
			$.ajax({
				type: 'POST',
				url: url,
				data: postData,
				success: function () {
					showSuccess('Asset name has been updated.');
					reloadPage();
				},
				error: function (error) {
					showError("Error updating the asset's name", error);
				},
			});
		});
	}

	function saveBundle() {
		var promise = saveBundlePromise();
		$.when(promise).done(function () {
			reloadPage();
		});
	}

	function saveBundlePromise() {
		var promise = $.Deferred();
		var releaseDate = new Date($('#ReleaseDate').val());
		var isValidDate = releaseDate instanceof Date && !isNaN(releaseDate);
		var bundleReleaseWarningBufferInHours = $(selectors.bundleReleaseWarningBufferInHours).data('bundleReleaseWarningBufferInHours');
		var cstTime = new Date(Date.now() + 60 * 60 * parseFloat(bundleReleaseWarningBufferInHours) * 1000).toLocaleString('en-US', {
			timeZone: 'America/Chicago',
		});
		var currentTimeWithBuffer = new Date(cstTime);

		var shouldSaveBundle = true;
		if (isValidDate && releaseDate <= currentTimeWithBuffer) {
			shouldSaveBundle = confirm(
				'WARNING: Your action will save the bundle and your release date is in the past or within ' +
					bundleReleaseWarningBufferInHours +
					' hours from now. Are you sure you want to continue?',
			);
		}
		if (shouldSaveBundle) {
			promise = saveBundleAjax();
		}
		return promise;
	}

	function saveBundleAjax() {
		var promise = $.Deferred();
		var form = $(selectors.saveBundleForm);
		var serializedForm = form.serializeObject();
		var url = form.prop('action');
		$.ajax({
			type: 'POST',
			url: url,
			data: serializedForm,
			success: function (saveBundleResponse) {
				showSuccess('Saved bundle');
				promise.resolve();
			},
			error: function (error) {
				showError('Error saving bundle', error);
			},
		});
		return promise;
	}

	function reloadPage() {
		setTimeout(
			// setTimout to give users a chance to see the successMessage before reload
			function () {
				location.reload();
			},
			500,
		);
	}

	function toggleAndClearOutDependentField(selector, isChecked) {
		$(selector).prop('disabled', !isChecked);
		if (!isChecked) {
			$(selector).val(null);
		}
	}

	function setupMarketingBoostSlider() {
		var minScale = $('#MarketingBoostPanel').data('minscale');
		var maxScale = $('#MarketingBoostPanel').data('maxscale');
		var currentValue = $('#BoostAmountScale').val();
		$('#slider').slider({
			value: currentValue,
			min: minScale,
			max: maxScale,
			step: 1,
			slide: function (event, ui) {
				$('#BoostAmountScale').val(ui.value);
			},
		});
		$('#BoostAmountScale').val($('#slider').slider('value'));
	}

	$(function () {
		// Initial disable for offsale deadline
		if ($(selectors.offsaleDeadlineInput).val() === null || $(selectors.offsaleDeadlineInput).val() === '') {
			$(selectors.offsaleDeadlineToggle).prop('checked', false);
			toggleAndClearOutDependentField(selectors.offsaleDeadlineInput, false);
		}

		// Offsale deadline checkbox change event
		$(selectors.offsaleDeadlineToggle).change(function () {
			toggleAndClearOutDependentField(selectors.offsaleDeadlineInput, this.checked);
		});

		setupMarketingBoostSlider();

		updateBoostOptionsDisabled($(selectors.marketingBoostToggleSelected).length === 0);
		$(selectors.marketingBoostToggle).change(function (e) {
			updateBoostOptionsDisabled($(selectors.marketingBoostToggleSelected).length === 0);
		});

		$(selectors.createBundleBtn).click(createBundle);
		$(selectors.updateAssetName).click(updateAssetName);

		$(selectors.saveBundleBtn).click(saveBundle);

		$(selectors.removeBundleItem).click(removeBundleItem);
		$(selectors.invalidateBundleItem).click(invalidateBundleItem);

		$(selectors.addBundleAssetBtn).click(function () {
			addBundleItem(true);
		});

		$(selectors.addBundleOutfitBtn).click(function () {
			addBundleItem(false);
		});

		updatePriceInRobuxDisabled();
		$(selectors.productStateInputs).click(updatePriceInRobuxDisabled);
	});
})();
