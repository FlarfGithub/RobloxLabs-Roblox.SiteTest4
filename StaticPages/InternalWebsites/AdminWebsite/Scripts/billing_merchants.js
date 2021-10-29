if (typeof Roblox === 'undefined') {
	Roblox = {};
}
if (typeof Roblox.Admi === 'undefined') {
	Roblox.Admi = {};
}
if (typeof Roblox.Admi.Billing === 'undefined') {
	Roblox.Admi.Billing = {};
}
Roblox.Admi.Billing.Merchant = (function () {
	//variables
	var pageSize, pageNum, totalNum;

	//run on document load
	$(function () {
		var numMerchants = $('#dataHolder').data('merchant-count');
		initialize(20, 1, numMerchants);
		getMerchants();
		$('.MerchActive .checkbox').live('click', Roblox.Admi.Billing.Merchant.changeActive);
		$('.merch-hidden .checkbox').live('click', Roblox.Admi.Billing.Merchant.changeHidden);
		$('.MerchCountry select').change(Roblox.Admi.Billing.Merchant.changeCountry);
	});

	//private methods

	function getMerchants() {
		var startRow = (pageNum - 1) * pageSize + 1;
		var reqData = { startRowIndex: startRow, maxRows: pageSize };
		var url = '/merchants/get-merchants';
		$.post(url, reqData, function (data) {
			if (data.success) {
				displayMerchants(data.merchants, data.countryMerchants);
			} else {
				$('#ErrorText').text('Error retrieving Merchant records.');
				$('#ErrorDiv').show();
			}
		});
	}
	function unwrapMerchant(merchant) {
		return {
			id: merchant.ID,
			name: merchant.Name,
			active: merchant.Active,
			hidden: merchant.IsHidden,
			created: dateHelper(merchant.Created),
			updated: dateHelper(merchant.Updated),
		};
	}
	function dateHelper(unclean) {
		var clean = eval(unclean.substring(6, 19));
		var date = new Date(clean);
		return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	}
	function displayMerchants(merchants, countryMerchants) {
		//clean out old list
		$('#MerchTable').detach();
		$('#pager').children().remove();

		//add new Merchants
		var counter = 0;
		var newTable = $('#tableTemplate').clone(true).attr('id', 'MerchTable').show();
		while (merchants[counter] != null) {
			var merchant = unwrapMerchant(merchants[counter]);
			var newRow = $('#trTemplate').clone(true).show().attr('id', merchant.id);

			$('div.MerchID', newRow).text(merchant.id);
			$('div.MerchName', newRow).text(merchant.name);
			$('div.MerchActive', newRow).children().attr('checked', merchant.active).attr('id', merchant.id);
			$('div.merch-hidden', newRow).children().attr('checked', merchant.hidden).attr('id', merchant.id);
			$('div.MerchCreated', newRow).text(merchant.created);
			$('div.MerchUpdated', newRow).text(merchant.updated);
			$('div.MerchCountry select', newRow).val(countryMerchants[merchant.name]).attr('id', merchant.id);
			newRow.show();
			newTable.append(newRow);
			counter++;
		}
		$('#Merchants').append(newTable);

		$('#pager').html('').hide();
		if (totalNum > pageSize) {
			var endPage = Math.ceil(totalNum / pageSize);
			var endPageGroup = Math.ceil(endPage / pageSize);
			var currentPageGroup = Math.ceil(pageNum / pageSize);
			var startIndex = (currentPageGroup - 1) * pageSize + 1;
			var endIndex = currentPageGroup * pageSize;
			if (currentPageGroup != 1) {
				$('#pager').append(
					'<a onclick="Roblox.Admi.Billing.Merchant.changePage(' +
						(currentPageGroup * pageSize - 1) +
						')" style="padding: 5px; cursor: pointer">...</a>',
				);
			}

			for (var j = startIndex; j <= endIndex; j++) {
				if (j > endPage) {
					break;
				} else if (j == pageNum) {
					$('#pager').append('<span style="font-weight:bold;padding: 1px">' + j + '</span>');
				} else {
					$('#pager').append(
						'<a onclick="Roblox.Admi.Billing.Merchant.changePage(' +
							j +
							')" style="padding: 5px; cursor: pointer">' +
							j +
							'</a>',
					);
				}
			}
			if (currentPageGroup < endPageGroup) {
				$('#pager')
					.append(
						'<a Roblox.Admi.Billing.Merchant.changePage(' +
							(currentPageGroup * pageSize + 1) +
							')" style="padding: 5px; cursor: pointer">...</a>',
					)
					.show();
			}

			$('#pager').show();
		}
	}

	//public methods
	function initialize(pagesize, pagenum, totalnum) {
		pageSize = pagesize;
		pageNum = pagenum;
		totalNum = totalnum;
	}
	function changePage(newPage) {
		pageNum = newPage;
		$('#ErrorDiv').hide();
		$('#SuccessDiv').hide();
		getMerchants();
	}

	function changeActive() {
		var id = this.id;
		var checked = this.checked;
		var url = '/merchants/' + id + '/update?active=' + checked;
		$.post(url, function (data) {
			if (data.success) {
				$('#SuccessText').text(data.message);
				$('#SuccessDiv').show();
			} else {
				$('#ErrorText').text(data.message);
				$('#ErrorDiv').show();
			}
		});
	}

	function changeHidden() {
		var id = this.id;
		var checked = this.checked;
		var url = '/merchants/' + id + '/update?hidden=' + checked;
		$.post(url, function (data) {
			if (data.success) {
				$('#SuccessText').text(data.message);
				$('#SuccessDiv').show();
			} else {
				$('#ErrorText').text(data.message);
				$('#ErrorDiv').show();
			}
		});
	}

	function changeCountry() {
		var id = this.id;
		var countryID = $(this).children(':selected').val();
		var url = '/merchants/' + id + '/update?countryID=' + countryID;
		$.post(url, function (data) {
			if (data.success) {
				$('#SuccessText').text(data.message);
				$('#SuccessDiv').show();
			} else {
				$('#ErrorText').text(data.message);
				$('#ErrorDiv').show();
			}
		});
	}

	function createMerchant() {
		$('#SuccessDiv').hide();
		$('#ErrorDiv').hide();
		var name = $('.merchantNameInput').val();
		var active = $('#merchantActive').attr('checked') === 'checked';
		var countryID = $('#merchantCountry').children(':selected').attr('id');
		var reqData = { merchantName: name, merchantActive: active, merchantCountryID: countryID };
		var url = '/merchants/add-merchant';
		$.post(url, reqData, function (data) {
			if (data.success) {
				$('.merchantNameInput').val('');
				$('#merchantActive').prop('checked', false);
				$('#merchantCountry option').eq(0).prop('selected', true);
				totalNum++;
				changePage(Math.ceil(totalNum / pageSize));
				var msg = 'Successfully added ' + name + ' to the database.';
				$('#SuccessText').text(msg);
				$('#SuccessDiv').show();
				displayMerchants(data.merchants, data.countryMerchants);
			} else {
				$('#ErrorText').text(data.message);
				$('#ErrorDiv').show();
			}
		});
	}
	//Interface exposing public methods!
	return {
		initialize: initialize,
		changeActive: changeActive,
		changeHidden: changeHidden,
		createMerchant: createMerchant,
		changePage: changePage,
		changeCountry: changeCountry,
	};
})();
