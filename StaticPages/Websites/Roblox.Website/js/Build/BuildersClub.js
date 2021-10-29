function animateOBC() {
	appendOBCCSS();
	$('#upgrades-membership-options').effect('drop', {}, 1e3, function () {
		setBlack();
	});
}
function setBlack() {
	$('#LeftColumn').animate({ backgroundColor: '#fff' }, 1e3, function () {
		explodeTitles();
	});
}
function explodeTitles() {
	$('#OneMonth').effect('explode', {}, 300, function () {
		$('#SixMonths').effect('puff', {}, 300, function () {
			$('#TwelveMonths').effect('explode', {}, 300, function () {
				$('#Lifetime').effect('puff', {}, 300, function () {
					$('#TurboMonthly').effect('explode', {}, 300, function () {
						$('#TurboSixMonths').effect('puff', {}, 300, function () {
							$('#TurboTwelveMonths').effect('explode', {}, 300, function () {
								$('#TurboLifetime').effect('puff', {}, 300, function () {
									changeTitle();
								});
							});
						});
					});
				});
			});
		});
	});
}
function changeTitle() {
	$('#LeftColumn').html("<h1 style='margin-left: 20px;'>Outrageous Builders Club</h1>");
	window.setTimeout('changeCSS()', 500);
}
function changeCSS() {
	document.getElementById('preloadCSS').type = 'text/css';
	document.getElementById('preloadCSS').rel = 'Stylesheet';
	$('#ctl00_Imports').remove();
	window.setTimeout('obcOptions()', 1e3);
}
function obcOptions() {
	var d = $('#obcContent').html();
	$('#obcContent').html('');
	$('#LeftColumn').append(d);
	window.setTimeout('slideContent()', 200);
}
function slideContent() {
	$('.OBCSellSheet').slideDown('slow');
	$('.hoverover').click(function () {
		$(this)
			.next('em')
			.animate({ opacity: 'show', top: '-40' }, 1500, function () {
				$('em:visible').animate({ opacity: 'hide', top: '-50' }, 1500);
			});
	});
}
function appendOBCCSS() {
	var d = document.createElement('link');
	d.type = 'none';
	d.rel = 'none';
	d.id = 'preloadCSS';
	d.href = '../../CSS/Base/CSS/AllCSS.ashx?v=902&t=Outrageous2';
	document.getElementsByTagName('head')[0].appendChild(d);
}
