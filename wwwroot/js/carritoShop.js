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

    // Actualizar carrito en la interfaz
    window.actualizarCarrito = async function (isOpenCarShop = false) {
        carritoBody.innerHTML = '';
        await cargarCanciones();

        carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        let total = 0;       

        carrito.forEach((item, index) => {
            const itemTotal = item.precio * item.cantidad;
            total += itemTotal;
            console.log('Item:', item);
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

    //Cargar canciones en el carrito
    const cargarCanciones = async function () {
        try {
            const response = await fetch('https://localhost:7050/Karaoke/ObtenerCanciones', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                alert('Error al cargar las canciones.');
                return;
            }

            const canciones = await response.json();

            let idMesa = localStorage.getItem('idMesa');

            if (!idMesa) {
                alert('No se encontró ninguna mesa asignada en el localStorage.');
                return;
            }

            const cancionesFiltradas = canciones.filter(c => c.idMesa == idMesa && c.estadoEspecial === 0);

            if (cancionesFiltradas.length === 0) {
                return;
            }

            const detalle = cancionesFiltradas.map(c => c.idCancionMesa).join(',');

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const existeCancion = carrito.some(item => item.nombre === 'Canciones' && item.detalle === detalle);

            if (existeCancion) {
                return;
            }

            carrito = carrito.filter(item => item.nombre !== 'Canciones');

            carrito.push({ id: 23, nombre: 'Canciones', precio: 1.00, cantidad: cancionesFiltradas.length, detalle: detalle });

            localStorage.setItem('carrito', JSON.stringify(carrito));

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar las canciones.');
        }
    };

    // Agregar producto al carrito
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', function () {
            const requiereOpcion = button.getAttribute('data-requiere-opcion') === "true";
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));

            if (requiereOpcion) {
                productoTemporal = { id, nombre, precio, cantidad: 1, detalle: '' };
                opcionesContainer.innerHTML = opcionesPorProducto[id].map(opcion => `
                    <button class="btn btn-outline-secondary opcion-producto" data-opcion="${opcion}">${opcion}</button>
                `).join('');
                opcionesModal.show();
            } else {
                agregarProductoAlCarrito(id, nombre, precio, '');
                actualizarCarrito();
            }
        });
    });

    // Función para agregar producto al carrito
    function agregarProductoAlCarrito(id, nombre, precio, detalle) {
        const productoExistente = carrito.find(item => item.id === id);
        if (productoExistente) {
            productoExistente.cantidad += 1;
            if (detalle) {
                productoExistente.detalle += `, ${detalle}`;
            }
        } else {
            carrito.push({ id, nombre, precio, cantidad: 1, detalle });
        }
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }


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
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarrito(true);
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

    // Mostrar carrito 
    btnCarrito.addEventListener('click', async function () {
        console.log('Mostrando carrito...');
        await actualizarCarrito(); 
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

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('opcion-producto')) {
            document.querySelectorAll('.opcion-producto').forEach(button => button.classList.remove('selected'));
            event.target.classList.add('selected');
        }
    });

    document.getElementById('guardarOpcion').addEventListener('click', function () {
        const opcionSeleccionada = document.querySelector('.opcion-producto.selected');
        if (opcionSeleccionada) {
            productoTemporal.detalle = opcionSeleccionada.getAttribute('data-opcion');
            agregarProductoAlCarrito(productoTemporal.id, productoTemporal.nombre, productoTemporal.precio, productoTemporal.detalle);
            actualizarCarrito();
            opcionesModal.hide();
        } else {
            alert('Por favor selecciona una opción antes de guardar.');
        }
    });


    // Función para manejar el OK de la respuesta
    window.handlePedidoOk = function () {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
    };

    // Enviar pedido
    btnEnviarPedido.addEventListener('click', function () {

        if (carrito.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        // Convertir datos del carrito al formato necesario para PedidoViewModel
        const carritoTransformado = carrito.map(item => ({
            IdMesa: localStorage.getItem('idMesa'),
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
