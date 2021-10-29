if (typeof Roblox === 'undefined') {
	Roblox = {};
}
if (typeof Roblox.Admin === 'undefined') {
	Roblox.Admin = {};
}
Roblox.Admin.Games_BadgeAssetAward = (function () {
	//event binding
	$(function () {
		$('#AddButton').click(function () {
			CreateNew();
			return false;
		});
		$('#viewByID').click(function () {
			GetBadgeAssetAwardsbyBadgeID();
			return false;
		});
		$('#viewAll').click(function () {
			GetAllBadgeAssetAwards();
			return false;
		});
		$('#badgeIDInput').keypress(function (event) {
			if (event.keyCode == '13') GetBadgeAssetAwardsbyBadgeID();
		});
	});

	//variables
	var pageSize, pageNum, totalNum;

	//public methods
	function Initialize(pagesize, pagenum, totalnum) {
		pageSize = pagesize;
		pageNum = pagenum;
		totalNum = totalnum;
		GetAllBadgeAssetAwards();
	}
	function ChangePage(newPage) {
		pageNum = newPage;
		GetAllBadgeAssetAwards();
	}
	function DeleteBadgeAssetAwardClick(e) {
		var badgeAssetAwardID = $(this).attr('badgeassetawardid');
		if (confirm('Are you sure you want to delete ID=' + badgeAssetAwardID)) {
			DeleteBadgeAssetAward(badgeAssetAwardID);
		}
	}
	function CreateNew() {
		var badgeID = $('#badgeID').val();
		var assetAwardID = $('#assetAwardID').val();
		var description = $('#description').val();
		var url =
			'BadgeAssetAwardHandler.ashx?cmd=add&badgeID=' +
			badgeID +
			'&assetID=' +
			assetAwardID +
			'&description=' +
			encodeURIComponent(description);
		$.ajax({
			type: 'POST',
			url: url,
			cache: false,
			dataType: 'text',
			success: function (data, extStatus, jqXHR) {
				totalNum++;
				GetAllBadgeAssetAwards();
				dataJSON = $.parseJSON(data);
				if (dataJSON != null) {
					alert(dataJSON.msg);
				}
			},
		});
	}
	function GetBadgeAssetAwardsbyBadgeID() {
		var badgeID = $('#badgeIDInput').val();
		if (badgeID === '') return;
		if (badgeID === 0) return;
		var url = 'BadgeAssetAwardHandler.ashx?cmd=getAwards&badgeID=' + badgeID;
		$.ajax({
			type: 'POST',
			url: url,
			cache: false,
			dataType: 'json',
			success: function (data, extStatus, jqXHR) {
				dataJSON = $.parseJSON(data);
				if (dataJSON != null) {
					alert(dataJSON.msg);
				} else {
					displayAssetAwards(data);
					$('#pager').hide();
				}
			},
		});
	}
	function GetAllBadgeAssetAwards() {
		var url = 'BadgeAssetAwardHandler.ashx?cmd=getAllAwards&StartRowIndex=' + (pageNum - 1) * pageSize + '&MaximumRows=' + pageSize;
		$.ajax({
			type: 'POST',
			url: url,
			cache: false,
			dataType: 'json',
			success: displayAssetAwards,
		});
	}

	//private functions

	function displayAssetAwards(badgeAssetAwards) {
		//clean out old list
		$('#awardTable').detach();
		if (badgeAssetAwards[0] == null) {
			$('#noAwards').show();
		} else {
			$('#noAwards').hide();
		}

		//construct new table
		var counter = 0;
		var newTable = $('#tableTemplate').clone(true).attr('id', 'awardTable');
		while (badgeAssetAwards[counter] != null) {
			var badgeAssetAward = unwrapBadgeAssetAward(badgeAssetAwards[counter]);
			var newRow = $('#trTemplate').clone(true).show().attr('id', badgeAssetAward.id);
			$('.ID', newRow).text(badgeAssetAward.id);
			$('.BadgeID', newRow)
				.text(badgeAssetAward.badgeID)
				.attr('href', '/item.aspx?id=' + badgeAssetAward.badgeID);
			$('.AssetAwardID', newRow)
				.text(badgeAssetAward.assetAwardID)
				.attr('href', '/item.aspx?id=' + badgeAssetAward.assetAwardID);
			$('.Description', newRow).text(badgeAssetAward.description);
			$('.Created', newRow).text(badgeAssetAward.created);
			$('.Updated', newRow).text(badgeAssetAward.updated);
			$('.editButton', newRow).attr('badgeassetawardid', badgeAssetAward.id);
			$('.deleteButton', newRow).attr('badgeassetawardid', badgeAssetAward.id).click(DeleteBadgeAssetAwardClick);
			newTable.append(newRow);
			counter++;
		}
		newTable.show();
		$('#AssetAwards').append(newTable);

		$('#pager').html('').hide();
		if (totalNum > pageSize) {
			var beginPages = 1;
			var endPage = Math.ceil(totalNum / pageSize);
			var endPageGroup = Math.ceil(endPage / pageSize);
			var currentPageGroup = Math.ceil(pageNum / pageSize);
			var startIndex = (currentPageGroup - 1) * pageSize + 1;
			var endIndex = currentPageGroup * pageSize;
			if (currentPageGroup != 1) {
				$('#pager').append(
					'<a onclick="Roblox.Admin.Games_ViewBadgeAssetAward.ChangePage(' +
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
						'<a onclick="Roblox.Admin.Games_BadgeAssetAward.ChangePage(' +
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
						'<a Roblox.Admin.Games_BadgeAssetAward.ChangePage(' +
							(currentPageGroup * pageSize + 1) +
							')" style="padding: 5px; cursor: pointer">...</a>',
					)
					.show();
			}

			$('#pager').show();
		}
	}
	function unwrapBadgeAssetAward(badgeAssetAward) {
		return {
			id: badgeAssetAward.ID,
			badgeID: badgeAssetAward.BadgeID,
			assetAwardID: badgeAssetAward.AssetAwardID,
			description: badgeAssetAward.Description,
			created: dateHelper(badgeAssetAward.Created),
			updated: dateHelper(badgeAssetAward.Updated),
		};
	}
	function dateHelper(unclean) {
		var clean = Number(unclean.substring(6, 19));
		var date = new Date(clean);
		return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
	}
	function DeleteBadgeAssetAward(badgeAssetAwardID) {
		var url = 'BadgeAssetAwardHandler.ashx?cmd=delete&bAAID=' + badgeAssetAwardID;
		$.ajax({
			type: 'POST',
			url: url,
			cache: false,
			dataType: 'text',
			success: function (data, extStatus, jqXHR) {
				var dataJSON = $.parseJSON(data);
				if (dataJSON !== null) {
					if (dataJSON.status === 'faliure') {
						alert(dataJSON.msg);
					} else {
						alert(dataJSON.msg);
						totalNum--;
						GetAllBadgeAssetAwards();
					}
				}
			},
		});
	}

	//Interface exposing public methods!
	return {
		ChangePage: ChangePage,
		Initialize: Initialize,
	};
})();
