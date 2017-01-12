$(document).ready(function(e) {
	var jqxhr = $.getJSON("https://quickmed.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid: device.uuid,
			devicename: device.manufacturer,
			version: device.version,
			platform: device.platform,
			model: device.model,
			action: 'consultar',

		}, function () {
			console.log('CheckDevice');
		})
		.done(function (data) {
			var r = data.respuesta;
			if (r == '1') {
				window.location = 'home.html';
			}

		})
		.fail(function () {

		})
		.always(function () {
			$('.loader').fadeOut('slow');
		});
	alert(""+device.uuid);
	window.localStorage.setItem("deviceuuid", ""+device.uuid);
});