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

var checkDevice = function checkDevice(){
	console.log('CheckDevice ' + JSON.stringify(device));
	var jqxhr = $.getJSON( "https://quickmed.edifarm.com.ec/ws/mobile/login.php",
				{
					deviceuuid:device.uuid, 
					devicename:device.manufacturer, 
					version:device.version, 
					platform:device.platform, 
					model:device.model,
					action:'consultar',
					
				}, function() {
					console.log('CheckDevice');
				})
				  .done(function(data) {
					var r=data.respuesta;
					if(r==='1'){
						window.location='home.html';	
					}
					
				  })
				  .fail(function() {
					
				  })
				  .always(function() {
					$('.loader').fadeOut('slow');
				});	
};


var getSettings = function getSettings(){
	
	
	console.log('Settings');
						
					var jqxhr = $.getJSON( "https://quickmed.edifarm.com.ec/ws/mobile/login.php",
					{
						deviceuuid:device.uuid, 
						devicename:device.manufacturer, 
						version:device.version, 
						platform:device.platform, 
						model:device.model,
						action:'settings',
						
					}, function() {
						console.log('send form new user');
					})
					  .done(function(data) {
						var r=data.respuesta;
						var e='';
						var u='';
						var not='0';
						var med='0';
						console.log('done: ' +JSON.stringify(data));
						  
						if(r==='1'){ //*
							
							u=data.datos.email;
							e=data.datos.nombre_usuario;
							if(u!==e){
								$('#email').removeAttr('readonly');
							}
							
							$('#email').val(data.datos.email);
							$('#nombres').val(data.datos.fname);
							$('#apellidos').val(data.datos.lname);
							$('#telefono').val(data.datos.phone);
							$("#pais option").filter(function() {
								return $(this).text() === data.datos.country; 
							}).prop('selected', true);
							$('#ciudad').val(data.datos.city);
							
							$('#cumple').val(data.datos.birth);
							not=data.datos.notification;
							if(not==='1'){
								$('#cmn-toggle-1').attr('checked',true);
							}else{
								$('#cmn-toggle-1').attr('checked',false);
							}
							med=data.datos.ismedic;
							if(med==='1'){
								$('#ismedic').attr('checked',true);
							}else{
								$('#ismedic').attr('checked',false);
							}
						//*/
						}else{
						console.log('send form new user');
							
							window.location='home.html';
						}
						$('.loader').fadeOut('slow');
						
					  })
					  .fail(function(data) {
						  
						console.log('Error' + JSON.stringify(data));
						//alert('Error' + JSON.stringify(data));
					  })
					  .always(function() {
						console.log('Obtener Settings');
						$('.loader').fadeOut('slow');
					});
};


function admobDisplay(){
	
	var banner='ca-app-pub-7271854751013605/3853227419';
	var interlestial='ca-app-pub-7271854751013605/5469561410';
	
	
      document.removeEventListener('deviceready', admobDisplay, false);
			 // Set AdMobAds options:
    
	switch (device.platform){
		case 'iOS':
			banner='ca-app-pub-7271854751013605/3853227419';
			interlestial='ca-app-pub-7271854751013605/5469561410';
			break;
		
		case 'Android':
			banner='ca-app-pub-7271854751013605/9457279011';
			interlestial='ca-app-pub-7271854751013605/1934012219';
			break;
	}
	
	
	admob.setOptions({
        publisherId:  banner,  // Required
        interstitialAdId: interlestial,  // Optional
    });
	
	
	admob.createBannerView();

	  // Request interstitial (will present automatically when autoShowInterstitial is set to true)
	admob.requestInterstitial();	
}


function successAnalytics(){
	console.log('Funciona perfecto');
}
function failAnalytics(){
	consolel.log('No se conecta analytics');
}


document.addEventListener("deviceready", admobDisplay, false);

//*
analytics.startTrackerWithId('UA-18919211-2', successAnalytics, failAnalytics);
//*/