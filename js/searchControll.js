$(document).ready(function(e) {
	
	$('#btnProductos').click(function(e) {
		$('#tabla').val('producto');
		$('#modal-title span').html('Productos');
	});
	
	$('#btnLaboratorios').click(function(e) {
		$('#tabla').val('laboratorio');
		$('#modal-title span').html('Laboratorio');
	});
	
	$('#btnIngredientes').click(function(e) {
		$('#tabla').val('ingrediente');
		$('#modal-title span').html('Principio activo');
	});
	
	
	$('#serchForm').submit(function(e) {
		var d=$('#inputProducto').val();
		$('#inputProducto').val(d.trim());
	});    
});

