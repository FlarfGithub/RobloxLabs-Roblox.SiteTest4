if (typeof Admin === 'undefined') {
	Admin = {};
}

Admin.FeaturedPlaces = (function () {
	var selectedPlaceIdEdit;

	$('#NewPlatformInput').keypress(function (e) {
		if (e.keyCode == 13) {
			var name = $('#NewPlatformInput').val();
			var deviceTypeId = $('#DeviceTypeDropDown').val();
			var osTypeId = $('#OperatingSystemTypeDropDown').val();
			$.post(
				'/featuredplaces/AddPlatformType',
				{ platformName: name, deviceTypeId: deviceTypeId, operatingSystemTypeId: osTypeId },
				function (data) {
					$('#ListOfPlatforms').html(data);
					$('#NewPlatformInput').val('');
				},
			);
		}
	});
	$('.btn-cancel').click(function () {
		$.modal.close();
	});
	$('.btn-submit').click(function () {
		var selectedPlaceId = $('#PlaceIDInput').val();
		var url = '/featuredplaces/CreateFeaturedPlace?';
		if (selectedPlaceId == undefined) {
			selectedPlaceId = selectedPlaceIdEdit;
			url = '/featuredplaces/EditFeaturedPlace?';
		}
		var platforms = $('input.platformFilter:checked')
			.map(function () {
				return $(this).data('platformid');
			})
			.get();
		if (platforms != null) {
			for (var i = 0; i < platforms.length; i++) {
				url += 'platformTypeIds=' + platforms[i] + '&';
			}
		}
		url += 'placeId=' + selectedPlaceId;
		$.post(url, function (data) {
			window.location = '/CreateFeaturedPlaces';
		});
	});

	$('#CreateNewFeaturedPlaceLink').click(function () {
		GenericModal.open('Featured Place', null, null, null /* no callback */);
		$.get('/featuredplaces/GetFeaturedPlaceInfo', function (data) {
			$('#FeaturedPlaceData').html(data);
		});
	});

	$('#PlatformTypeSelect').change(function () {
		$('#DeviceTypeSelect').val(0);
		RefreshFeaturedPlaces();
	});

	$('#DeviceTypeSelect').change(function () {
		$('#PlatformTypeSelect').val(0);
		RefreshFeaturedPlaces();
	});

	$('.WhiteSquareTabsContainer li').bind('click', function () {
		SwitchTabs($(this));
	});

	function RefreshFeaturedPlaces() {
		var selectedplatform = $('#PlatformTypeSelect').val();
		var selectedDeviceTypeId = $('#DeviceTypeSelect').val();
		var url = '/CreateFeaturedPlaces';
		if (selectedplatform != 0) {
			url += '?platformTypeId=' + selectedplatform;
		}
		if (selectedDeviceTypeId != 0) {
			url += url.indexOf('?') > 0 ? '&' : '?';
			url += 'deviceTypeId=' + selectedDeviceTypeId;
		}
		window.location = url;
	}

	function SwitchTabs(nextTabElem) {
		$('.WhiteSquareTabsContainer .selected, #TabsContentContainer .selected').removeClass('selected');
		nextTabElem.addClass('selected');
		$('#' + nextTabElem.attr('contentid')).addClass('selected');
	}

	$('.EditFeaturedPlace').click(function () {
		selectedPlaceIdEdit = $(this).attr('placeid');
		GenericModal.open('Featured Place', null, null, null /* no callback */);
		$.get('/featuredplaces/GetFeaturedPlaceInfo', { placeId: selectedPlaceIdEdit }, function (data) {
			$('#FeaturedPlaceData').html(data);
		});
	});

	$('#FeaturedPlaceData').on('click', '.deviceFilter', function () {
		var deviceTypeId = $(this).data('devicetypeid');
		var isChecked = $(this).attr('checked');
		if (isChecked == undefined) {
			isChecked = false;
		}
		$('.platformFilter[data-devicetypeid="' + deviceTypeId + '"]').attr('checked', isChecked);
	});
})();
