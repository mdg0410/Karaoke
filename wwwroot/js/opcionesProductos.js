
document.addEventListener('click', function (event) {

    if (event.target.classList.contains('opcion-producto')) {
        document.querySelectorAll('.opcion-producto').forEach(button => button.classList.remove('selected'));
        event.target.classList.add('selected');

        // Obtener la información del producto del botón que abrió el modal
        const id = parseInt(event.target.getAttribute('data-id'));
        const nombre = event.target.getAttribute('data-nombre');
        const precio = parseFloat(event.target.getAttribute('data-precio'));
        const detalle = event.target.getAttribute('data-opcion');

        // Agregar el producto al carrito con la opción seleccionada
        agregarProductoAlCarrito(id, nombre, precio, detalle);
        actualizarCarrito();
        opcionesModalClose();
    }

});


