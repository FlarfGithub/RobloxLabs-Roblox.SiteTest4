Roblox = Roblox || {};

Roblox.NavigationSearch = (function () {
	function containsSimilar(searchQuery, list) {
		for (var i = 0; i < list.length; i++) {
			var similar = list[i].includes(searchQuery) || searchQuery.includes(list[i]);
			if (similar) {
				return true;
			}
		}
		return false;
	}

	function findElementKeywords(element) {
		var keywords = $(element).attr('data-keywords');
		if (keywords) {
			return keywords.split(',');
		}
		return [];
	}

	function findHeaderKeywords(element) {
		var text = $(element).text();
		var newKeywords = text.toLowerCase().trim().split(' ');
		if (text) {
			return newKeywords;
		}
		return [];
	}

	function findGroupKeywords(element) {
		var groupKeywords = $(element).attr('data-keywords');
		if (groupKeywords) {
			return groupKeywords.split(',');
		}
		return [];
	}

	function onSearch() {
		$('#navigation-search').on('input', function () {
			var query = $(this).val().toLowerCase().trim();
			$('.search-item').each(function () {
				var elementKeywords = findElementKeywords(this);
				$(this)
					.find('a')
					.each(function () {
						elementKeywords = elementKeywords.concat(findHeaderKeywords(this));
					});

				$(this)
					.parents('.search-group')
					.each(function () {
						elementKeywords = elementKeywords.concat(findGroupKeywords(this));
					});

				var found = containsSimilar(query, elementKeywords);
				var hiddedClassName = 'hidden';
				if (found || !query || query === '') {
					$(this).removeClass(hiddedClassName);
				} else {
					$(this).addClass(hiddedClassName);
				}
			});
		});
	}

	$(window).load(function () {
		onSearch();
	});

	return {
		onSearch: onSearch,
	};
})();
