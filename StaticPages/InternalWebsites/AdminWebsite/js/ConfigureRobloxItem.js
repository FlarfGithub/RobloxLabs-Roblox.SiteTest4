$(function () {
	var startingQuantitySelector = '#ProductOption_TotalAvailable';
	var saleDeadlineSelector = '#ProductOption_OffSaleDeadline';
	var saleDeadlineToggleSelector = '#OffSaleDeadlineToggle';
	var limitedEditionSelector = '#ProductOption_IsLimitedEdition';
	var isLimitedEdition = function () {
		return $(limitedEditionSelector).prop('checked');
	};

	function toggleAndClearOutDependentField(selector, isChecked) {
		$(selector).prop('disabled', !isChecked);

		if (!isChecked) {
			$(selector).val(null);
		}
	}

	function submitForm() {
		$('#configure-roblox-item-form').submit();
	}

	function isNullOrEmpty(value) {
		return value === null || value === undefined || value === '';
	}

	// Initial disable for limited Edition dependant fields
	if (!isLimitedEdition()) {
		$(startingQuantitySelector).prop('disabled', true);
	}

	// Limited checkbox change event
	$(limitedEditionSelector).change(function () {
		toggleAndClearOutDependentField(startingQuantitySelector, this.checked);
	});

	// Initial disable for Sale deadline dependant fields
	if (!isNullOrEmpty($(saleDeadlineSelector).val())) {
		$(saleDeadlineToggleSelector).prop('checked', true);
		$(saleDeadlineSelector).prop('disabled', false);
	}

	// Sale deadline checkbox change event
	$(saleDeadlineToggleSelector).change(function () {
		toggleAndClearOutDependentField(saleDeadlineSelector, this.checked);
	});

	// Submit form
	$('#submit-configure-roblox-item').click(function () {
		var warningText = '';
		var warningCount = 0;

		if (isLimitedEdition()) {
			var startingQuantity = $(startingQuantitySelector).val();
			var saleDeadLine = $(saleDeadlineSelector).val();

			if (isNullOrEmpty(startingQuantity) && isNullOrEmpty(saleDeadLine)) {
				warningCount++;
				warningText += '\n - The item is Limited, but both Starting Quantity and Sale Deadline are empty.';
			} else {
				if (!isNullOrEmpty(startingQuantity) && parseFloat(startingQuantity) <= 0) {
					warningCount++;
					warningText += '\n - The item is Limited, but Starting Quantity is less than or equal to zero.';
				}
				if (!isNullOrEmpty(saleDeadLine) && parseFloat(saleDeadLine) <= 0) {
					warningCount++;
					warningText += '\n - The item is Limited, but Sale Deadline is less than or equal to zero.';
				}
				if (!isNullOrEmpty(startingQuantity) && !isNullOrEmpty(saleDeadLine)) {
					warningCount++;
					warningText += '\n - The item is Limited, but both Sale Deadline and Starting Quantity have values.';
				}
			}
		}

		if (warningCount > 0) {
			warningText = 'You have ' + warningCount + ' warning(s): \n' + warningText + '\n \n Do you wish to save anyways?';
			var isWarningOverridden = confirm(warningText);
			if (isWarningOverridden) {
				submitForm();
			}
		} else {
			submitForm();
		}
	});

	if ($('.GenericForm').length > 0) {
		var makeLimitedBtn = $('div[data-js-make-limited-btn]');
		var makeLimitedInput = $('input[data-js-make-limited-input]');
		makeLimitedBtn.click(function () {
			makeLimitedInput.val('true');
			$('input[type="submit"]').click();
		});

		var minScale = $('#MarketingBoostPanel').data('mincale');
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
	$('form:eq(1)').submit(function () {
		$('input[name="Product.AffiliatePercentageFee"]').removeAttr('disabled');
	});
});
