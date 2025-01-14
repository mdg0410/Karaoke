document.addEventListener('DOMContentLoaded', function () {
    const carritoContainer = document.getElementById('carritoContainer');
    const btnCarrito = document.getElementById('btnCarritoImg');
    const cerrarCarrito = document.querySelector('.cerrar-carrito');
    const headers = document.querySelectorAll('.accordion-header');
    const carritoBody = document.getElementById('carritoBody');
    const carritoTotal = document.getElementById('carritoTotal');
    const btnEnviarPedido = document.getElementById('btnEnviarPedido');
    const opcionesModal = new bootstrap.Modal(document.getElementById('opcionesModal'));
    const opcionesContainer = document.getElementById('opcionesContainer');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoBadge = document.getElementById('carritoBadge');
    let productoTemporal = {};

    const opcionesPorProducto = {
        1: ['Margarita', 'Mojito', 'Sexo en la playa', 'Jagermeister', 'Laguna azul', 'Padrino', 'Caipirinha', 'Piña colada'],
        2: ['Margarita', 'Mojito', 'Sexo en la playa', 'Jagermeister'],
        3: ['Limón', 'Mojito', 'Maracuyá'],
        4: ['Margarita', 'Mojito', 'Sexo en la playa', 'Jagermeister'],
        5: ['Limón', 'Mojito', 'Maracuyá'],
        6: ['Limón', 'Mojito', 'Maracuyá'],
        11: ['Salchipapa', 'PapiCarne'],
        28: ['Gas', 'Sin gas']
    };

    window.RequiereOpcionAdicional = function (idProducto) {
        return opcionesPorProducto.hasOwnProperty(idProducto);
    };

    // Actualizar carrito en la interfaz
    window.actualizarCarrito = function (isOpenCarShop = false) {
        carritoBody.innerHTML = '';
        let total = 0;
        carrito.forEach((item, index) => {
            const itemTotal = item.precio * item.cantidad;
            total += itemTotal;
            carritoBody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.detalle || ''}</td>
                <td>${item.cantidad}</td>
                <td>${item.precio.toFixed(2)}</td>
                <td>${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index}, ${item.id})">X</button>
                </td>
            </tr>
            `;
        });
        carritoTotal.textContent = total.toFixed(2);
        carritoContainer.style.display = isOpenCarShop ? 'block' : 'none';
        localStorage.setItem('carrito', JSON.stringify(carrito));
        carritoBadge.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    };

    // Función para manejar el OK de la respuesta
    window.handlePedidoOk = function () {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
    };

    // Mostrar carrito
    btnCarrito.addEventListener('click', function () {
        carritoContainer.style.display = 'block';
    });

    // Cerrar carrito al hacer clic en la "X"
    cerrarCarrito.addEventListener('click', function () {
        carritoContainer.style.display = 'none';
    });

    // Cerrar carrito al hacer clic fuera del carrito
    carritoContainer.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    // Agregar producto al carrito
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', function () {
            const requiereOpcion = button.getAttribute('data-requiere-opcion') === "true";
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));

            if (requiereOpcion) {
                // Si el producto requiere opción, mostramos el modal
                productoTemporal = { id, nombre, precio, cantidad: 1, detalle: 'Vacio' };
                opcionesContainer.innerHTML = opcionesPorProducto[id].map(opcion => `
                    <button class="btn btn-outline-secondary opcion-producto" data-opcion="${opcion.charAt(2)}">${opcion}</button>
                `).join('');
                opcionesModal.show();
            } else {
                // Si no requiere opción, lo agregamos directamente al carrito
                const productoExistente = carrito.find(item => item.id === id);
                if (productoExistente) {
                    productoExistente.cantidad += 1;
                } else {
                    carrito.push({ id, nombre, precio, cantidad: 1, detalle: 'Vacio' });
                }
                actualizarCarrito();
            }
        });
    });

    document.getElementById('guardarOpcion').addEventListener('click', function () {
        const opcionSeleccionada = document.querySelector('.opcion-producto.selected');
        if (opcionSeleccionada) {
            productoTemporal.detalle = opcionSeleccionada.getAttribute('data-opcion');
            const productoExistente = carrito.find(item => item.id === productoTemporal.id);
            if (productoExistente) {
                productoExistente.cantidad += 1;
                productoExistente.detalle += `, ${productoTemporal.detalle}`;
            } else {
                carrito.push(productoTemporal);
            }
            actualizarCarrito();
            opcionesModal.hide();  // Cierra el modal después de guardar la opción
        }
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('opcion-producto')) {
            document.querySelectorAll('.opcion-producto').forEach(button => button.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    // Función para eliminar producto del carrito
    window.eliminarProducto = function (index, idProducto) {
        const producto = carrito[index];
        if (RequiereOpcionAdicional(idProducto)) {
            const detalles = producto.detalle.split(', ');
            detalles.pop(); // Eliminar el último detalle (LIFO)
            producto.detalle = detalles.join(', ');

            if (producto.detalle === '') {
                carrito.splice(index, 1); // Eliminar el producto si no tiene más detalles
            } else {
                producto.cantidad -= 1;
            }
        } else {
            carrito.splice(index, 1);
        }
        if (carrito.length === 0) {
            actualizarCarrito();
        } else {
            actualizarCarrito(true);
        }
    };

    // Inicializar carrito
    actualizarCarrito();

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

    // Enviar pedido
    btnEnviarPedido.addEventListener('click', function () {

        if (carrito.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        // Convertir datos del carrito al formato necesario para PedidoViewModel
        const carritoTransformado = carrito.map(item => ({
            IdMesa: localStorage.getItem('idMesa'), // Asigna el valor correcto de IdMesa
            IdProducto: parseInt(item.id),
            Cantidad: item.cantidad,
            DetalleAdicional: item.detalle,
            Credencial: localStorage.getItem('mesaCredencial')
        }));

        fetch('/Pedido/EnviarPedido', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carritoTransformado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar el pedido');
                }
                handlePedidoOk();
                alert('Pedido enviado correctamente');
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un problema al enviar el pedido. Inténtalo de nuevo.');
            });
    });
});
