document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion-header');
    const btnCarrito = document.getElementById('btnCarritoImg');
    const cerrarCarrito = document.querySelector('.cerrar-carrito');
    const carritoContainer = document.getElementById('carritoContainer');

    // Lógica de los encabezados de acordeón
    headers.forEach(header => {
        header.addEventListener('click', function () {
            // Obtener el contenido objetivo
            const targetId = this.getAttribute('data-target');
            const target = document.querySelector(targetId);
            // Cerrar cualquier contenido actualmente abierto
            document.querySelectorAll('.accordion-content').forEach(content => {
                if (content !== target) {
                    content.classList.remove('show');
                }
            });
            // Alternar la visibilidad del contenido actual
            target.classList.toggle('show');
        });
    });

    // Mostrar carrito 
    btnCarrito.addEventListener('click', function () {
        actualizarCarrito(true);
    });

    // Cerrar carrito al hacer clic en la "X"
    cerrarCarrito.addEventListener('click', function () {
        carritoContainer.style.display = 'none';
    });

    // Cerrar carrito al hacer clic fuera del carrito
    carritoContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    
});