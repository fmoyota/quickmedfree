// JavaScript Document


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
	var jqxhr = $.getJSON( "https://www.edifarm.com.ec/edifarm_quickmed/ws/mobile/login.php",
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
	
	//device={'uuid' : '3988505C-F36B-434B-9CD8-E0F39D2DA200','manufacturer' : 'Apple','version' : '10.0.2','platform' : 'iOS','model' : 'iPhone7,2','action' : 'consultar'};	
				
					var jqxhr = $.getJSON( "https://www.edifarm.com.ec/edifarm_quickmed/ws/mobile/login.php",
					{
						deviceuuid:device.uuid, 
						devicename:device.manufacturer, 
						version:device.version, 
						platform:device.platform, 
						model:device.model,
						action:'consultar',
						
					}, function() {
						console.log('send form new user');
					})
					  .done(function(data) {
						var r=data.respuesta;
						//$('#ej').html(JSON.stringify(data));
						
						if(r==='1'){ //*
							$('#email').val(data.datos.email);
							$('#nombres').val(data.datos.fname);
							$('#apellidos').val(data.datos.lname);
							$('#telefono').val(data.datos.phone);
							$("#pais option").filter(function() {
								return $(this).text() === data.datos.country; 
							}).prop('selected', true);
							$('#ciudad').val(data.datos.city);
							
							$('#cumple').val(data.datos.birth);
						//*/
						}else{
							$('#ej').html(JSON.stringify(data));
						}
						
					  })
					  .fail(function(data) {
						console.log('Error' + JSON.stringify(data));
					  })
					  .always(function() {
					$('.loader').fadeOut('slow');
					});
};