if (typeof GenericModal === 'undefined') {
	GenericModal = (function () {
		var modalProperties = {
			overlayClose: true,
			escClose: true,
			opacity: 80,
			overlayCss: {
				backgroundColor: '#000',
			},
		};
		var _CloseCallBack;
		$(function () {
			$('.GenericModal .btn-submit').click(function () {
				close();
			});
		});

		function open(title, imageURL, message, closeCallBack, isLarge) {
			_CloseCallBack = closeCallBack;
			var modal = $('div.GenericModal').filter(':first');
			modal.find('div.Title').text(title);
			modal.find('img.GenericModalImage').attr('src', imageURL);
			modal.find('div.Message').html(message);
			if (isLarge) {
				modal.removeClass('smallModal');
				modal.addClass('largeModal');
			}
			modal.modal(modalProperties);
		}

		function close() {
			$.modal.close();
			if (typeof _CloseCallBack === 'function') {
				_CloseCallBack();
			}
		}
		return {
			open: open,
		};
	})();
}
