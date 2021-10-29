$(function () {
	$.extend($.ui.accordion.animations, {
		myslide: function (options) {
			$.ui.accordion.animations.slide(options, { duration: 400 });
		},
	});

	$('#accordion').accordion({ autoHeight: false, collapsible: true, animated: 'myslide' });
});
