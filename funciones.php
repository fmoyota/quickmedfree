<?php 


function dispositivo($line){
        $file="dispositivo.js"; 
		$line['date']=@date('Y-m-d H:i:s');
	
	// archivo plano
        $new_contents="alert(".$_REQUEST['uuid']."); var device=".json_encode($line)."; \t\n";
        $fh = @fopen($file, 'w+'); // si no existe el archivo lo crea de modo que escriba al final del archivo sin eliminar los datos existentes
        @fwrite($fh, $new_contents);
// escribe la linea en el archivo
        @fclose($fh); //cierra el archivo
}

//$dispositivo=json_encode($_REQUEST);
dispositivo($_REQUEST);


?>