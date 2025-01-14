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
    window.actualizarCarrito = async function (isOpenCarShop = false) {
        carritoBody.innerHTML = '';
        await cargarCanciones();
        let total = 0;
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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

    const cargarCanciones = async function () {
        try {
            // Realizar el fetch para obtener las mesas
            console.log('Cargando las canciones...');
            const response = await fetch('https://localhost:7050/Karaoke/ObtenerCanciones', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Respuesta:', response);

            if (!response.ok) {
                alert('Error al cargar las canciones.');
                return;
            }

            const canciones = await response.json();

            // Verificar si hay un idMesa en el localStorage
            let idMesa = localStorage.getItem('idMesa');

            if (!idMesa) {
                alert('No se encontró ninguna mesa asignada en el localStorage.');
                return;
            }

            // Filtrar la mesa correspondiente con estado especial igual a 0
            const cancionesFiltradas = canciones.filter(c => c.idMesa == idMesa && c.estadoEspecial === 0);

            console.log('Canciones filtradas:', cancionesFiltradas);

            if (cancionesFiltradas.length === 0) {
                alert('No se encontró una mesa con estado especial 0.');
                return;
            }

            // Obtener solo los idCancionMesa de las canciones filtradas
            const detalle = cancionesFiltradas.map(c => c.idCancionMesa).join(',');

            // Obtener el carrito actual del localStorage
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            console.log('Carrito:', carrito);

            // Verificar si hay coincidencias en el carrito
            const existeCancion = carrito.some(item => item.nombre === 'Canciones' && item.detalle === detalle);

            if (existeCancion) {
                console.log('Las canciones ya están en el carrito.');
                return;
            }

            // Si no hay coincidencias, eliminar el item "Canciones" del carrito 
            carrito = carrito.filter(item => item.nombre !== 'Canciones');

            // Si no hay coincidencias, actualizar el carrito
            carrito.push({ id: 23, nombre: 'Canciones', precio: 1.00, cantidad: cancionesFiltradas.length, detalle: detalle });

            localStorage.setItem('carrito', JSON.stringify(carrito));

            console.log('Canciones agregadas al carrito:', carrito);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar las canciones.');
        }
    };



    // Función para manejar el OK de la respuesta
    window.handlePedidoOk = function () {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
    };

    // Mostrar carrito
    btnCarrito.addEventListener('click', function () {
        console.log('Mostrando carrito...');
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
