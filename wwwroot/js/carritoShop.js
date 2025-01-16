import { enviarPedido } from './api.js';


document.addEventListener('DOMContentLoaded', function () {
    const carritoContainer = document.getElementById('carritoContainer');
    const carritoBody = document.getElementById('carritoBody');
    const carritoTotal = document.getElementById('carritoTotal');
    const btnEnviarPedido = document.getElementById('btnEnviarPedido');
    const opcionesModal = new bootstrap.Modal(document.getElementById('opcionesModal'));
    const opcionesContainer = document.getElementById('opcionesContainer');
    const carritoBadge = document.getElementById('carritoBadge');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    // Agregar producto al carrito
    document.querySelectorAll('.agregar-carrito').forEach(button => {
        button.addEventListener('click', function () {
            const requiereOpcion = button.getAttribute('data-requiere-opcion') === "true";
            const id = button.getAttribute('data-id');
            const nombre = button.getAttribute('data-nombre');
            const precio = parseFloat(button.getAttribute('data-precio'));

            if (requiereOpcion) {
                opcionesContainer.innerHTML = opcionesPorProducto[id].map(opcion => `
                <button class="btn btn-outline-secondary opcion-producto" 
                        data-id="${id}" 
                        data-nombre="${nombre}" 
                        data-precio="${precio}" 
                        data-opcion="${opcion}">${opcion}</button>
                `).join('');
                opcionesModal.show();
            } else {
                agregarProductoAlCarrito(id, nombre, precio, '');
                actualizarCarrito();
            }
        });
    });

    // Actualizar carrito en la interfaz
    window.actualizarCarrito =  async function (isOpenCarShop = false) {
        carritoBody.innerHTML = '';
        await cargarCanciones();

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

    // Función para agregar producto al carrito
    window.agregarProductoAlCarrito = function (id, nombre, precio, detalle) {
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

    window.opcionesModalClose = function () {
        opcionesModal.hide();
    }

    // Función para manejar el OK de la respuesta
    window.handleLimpiarCarrito = function () {
        localStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
    };  

    const RequiereOpcionAdicional = (idProducto) => opcionesPorProducto.hasOwnProperty(idProducto);

    //Cargar canciones en el carrito
    const cargarCanciones = async function () {
        try {

            const response = await fetch('https://localhost:7050/Karaoke/ObtenerCanciones');

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

            const existeCancion = carrito.some(item => item.nombre === 'Canciones' && item.detalle === detalle);

            if (existeCancion) {
                return;
            }

            carrito = carrito.filter(item => item.nombre !== 'Canciones');

            carrito.push({ id: 23, nombre: 'Canciones', precio: 1.00, cantidad: cancionesFiltradas.length, detalle: detalle });

            localStorage.setItem('carrito', JSON.stringify(carrito));

            carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al procesar las canciones.');
        }
    };


    // Inicializar carrito
    actualizarCarrito();

    // Enviar pedido
    btnEnviarPedido.addEventListener('click', function () {

        if (carrito.length === 0) {
            alert('No hay productos en el carrito');
            return;
        }

        enviarPedido(carrito);
        
    });
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

