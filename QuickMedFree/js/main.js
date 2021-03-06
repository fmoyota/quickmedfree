// JavaScript Document

/*
device={
	'uuid':'3988505C-F36B-434B-9CD8-E0F39D2DA200',
	'manufacturer':'Apple',
	'version':'10.0.2',
	'platform':'iOS',
	'model':'iPhone7,2'
};
//*/

var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

function checkDevice() {
	
		alert('checkDevice');
	var jqxhr = $.getJSON("https://quickmed.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid: device.uuid,
			devicename: device.manufacturer,
			version: device.version,
			platform: device.platform,
			model: device.model,
			action: 'consultar',

		}, function (data) {
			console.log('CheckDevice');
		alert('envio '+JSON.stringify(data));
		})
		.done(function (data) {
		alert('done '+JSON.stringify(data));
			var r = data.respuesta;
			if (r == '1') {
				window.location = 'home.html';
			}

		})
		.fail(function (data) {
		alert('falla:'+JSON.stringify(data));

		})
		.always(function (data) {
		alert('siempre '+JSON.stringify(data));
			$('.loader').fadeOut('slow');
		});
	alert(""+device.uuid);
	window.localStorage.setItem("deviceuuid", ""+device.uuid);
	
//	saveDevice(device.uuid);
	
};


function getSettings() {
	
	var uuid = window.localStorage.getItem("deviceuuid");
	//*
//	alert('estran settings '+uuid);
	var jqxhr = $.getJSON("https://quickmed.edifarm.com.ec/ws/mobile/login.php", {
			deviceuuid:uuid,
/*			deviceuuid: device.uuid,
			devicename: device.manufacturer,
			version: device.version,
			platform: device.platform,
			model: device.model,*/
			action: 'consultar',
		}, function () {
			console.log('Envia a settings');
			//alert('entra');
		})
		.done(function (data) {

			var r = data.respuesta;
			var e = '';
			var u = '';
			var not = '0';
			var med = '0';

			console.log('done: ' + JSON.stringify(data));
			//alert('done: ' + JSON.stringify(data));
			if (r === '1') {


				u = data.datos.email;
				e = data.datos.nombre_usuario;
				if (u !== e) {
					$('#email').removeAttr('readonly');
				}

				$('#email').val(data.datos.email);
				$('#nombres').val(data.datos.fname);
				$('#apellidos').val(data.datos.lname);
				$('#telefono').val(data.datos.phone);
				$("#pais option").filter(function () {
					return $(this).text() === data.datos.country;
				}).prop('selected', true);
				$('#ciudad').val(data.datos.city);

				$('#cumple').val(data.datos.birth);
				not = data.datos.notification;
				if (not === '1') {
					$('#cmn-toggle-1').attr('checked', true);
				} else {
					$('#cmn-toggle-1').attr('checked', false);
				}
				med = data.datos.ismedic;
				if (med === '1') {
					$('#ismedic').attr('checked', true);
				} else {
					$('#ismedic').attr('checked', false);
				}


			} else {
				console.log('send form new user');

				window.location = 'home.html';
			}

			$('.loader').fadeOut('slow');

		})
		.fail(function (data) {

			console.log('Error' + JSON.stringify(data));
			//alert('Error' + JSON.stringify(data));
		})
		.always(function () {
			console.log('Obtener Settings');
			$('.loader').fadeOut('slow');
			//alert('FIN');
		});

	//*/

};


function admobDisplay() {

	var banner = 'ca-app-pub-7271854751013605/3853227419';
	var interlestial = 'ca-app-pub-7271854751013605/5469561410';


	document.removeEventListener('deviceready', admobDisplay, false);
	// Set AdMobAds options:

	switch (device.platform) {
		case 'iOS':
			banner = 'ca-app-pub-7271854751013605/3853227419';
			interlestial = 'ca-app-pub-7271854751013605/5469561410';
			break;

		case 'Android':
			banner = 'ca-app-pub-7271854751013605/9457279011';
			interlestial = 'ca-app-pub-7271854751013605/1934012219';
			break;
	}


	admob.setOptions({
		publisherId: banner, // Required
		interstitialAdId: interlestial, // Optional
	});


	admob.createBannerView();

	// Request interstitial (will present automatically when autoShowInterstitial is set to true)
	admob.requestInterstitial();
}


function successAnalytics() {
	console.log('Funciona perfecto');
}

function failAnalytics() {
	consolel.log('No se conecta analytics');
}

function saveDevice(d){
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var fh = fso.OpenTextFile("device.txt", 8, false, 0);
    fh.WriteLine(d);
    fh.Close();
	//alert('escrito');
}

function getDeviceId(){
	var deviceuuid='';
	
    var jqxhr = $.getJSON("device.txt", function () {
			console.log('Consulta Device ID');
			//alert('entra');
		})
		.done(function (data) {
			console.log('done: ' + JSON.stringify(data));
			
			if(device){
			deviceuuid=device.uuid;
			}else{
				deviceuuid=data;
			}
			
			//alert(deviceuuid);
		})
		.fail(function (data) {
			console.log('Error' + JSON.stringify(data));

		})
		.always(function () {
			console.log('FIN Device ID ');
		});
	
	return deviceuuid;
}



document.addEventListener("deviceready", admobDisplay, false);

//*
analytics.startTrackerWithId('UA-18919211-2', successAnalytics, failAnalytics);
//*/
