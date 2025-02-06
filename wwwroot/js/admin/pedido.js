document.addEventListener('DOMContentLoaded', function () {
    const mesaButtons = document.querySelectorAll('.mesa-button');
    const listaPedidos = document.getElementById('listaPedidos');
    const totalPagado = document.getElementById('totalPagado');
    const totalServido = document.getElementById('totalServido');
    const totalPendiente = document.getElementById('totalPendiente');
    const totalEnCuenta = document.getElementById('totalEnCuenta');
    const popupCerrarMesa = new bootstrap.Modal(document.getElementById('popupCerrarMesa'));
    const popupVerCanciones = new bootstrap.Modal(document.getElementById('popupVerCanciones'));
    const mensajeCerrarMesa = document.getElementById('mensajeCerrarMesa');
    const listaPendientes = document.getElementById('listaPendientes');
    const btnConfirmarCerrarMesa = document.getElementById('btnConfirmarCerrarMesa');
    const btnVerCanciones = document.getElementById('btnVerCanciones');
    const btnDesactivarMesa = document.getElementById('btnDesactivarMesa');
    const btnCerrarMesa = document.getElementById('btnCerrarMesa');

    let mesaSeleccionada = null;

    // --- Mostrar pedidos de la mesa seleccionada ---
    mesaButtons.forEach(button => {
        button.addEventListener('click', function () {
          // Remover la clase de todos los botones
        mesaButtons.forEach(btn => btn.classList.remove('boton-seleccionado'));

        // Agregar la clase al botón seleccionado
        this.classList.add('boton-seleccionado');

            mesaSeleccionada = this.dataset.mesaId;
            mostrarPedidosMesa(mesaSeleccionada);
            actualizarTotales(mesaSeleccionada);
        });
    });

    // Función para mostrar los pedidos de una mesa
    function mostrarPedidosMesa(mesaId) {
        const pedidos = listaPedidos.querySelectorAll('.pedido-group');
        pedidos.forEach(pedido => {
            if (pedido.dataset.mesaId === mesaId) {
                pedido.style.display = 'block';
                const estado = pedido.querySelector('.pedido-header').dataset.estadoPedido;
                pintarPedidoPorEstado(pedido, estado);
            } else {
                pedido.style.display = 'none';
            }
        });
    }

    // Función para pintar los pedidos según su estado
    function pintarPedidoPorEstado(pedido, estado) {
        switch (estado) {
            case 'pendiente':
                pedido.style.backgroundColor = '#ffc107'; // Amarillo
                break;
            case 'servido':
                pedido.style.backgroundColor = '#28a745'; // Verde
                break;
            case 'pagado':
                pedido.style.backgroundColor = '#dc3545'; // Rojo
                break;
            case 'cuenta':
                pedido.style.backgroundColor = '#AEC6CF'; // Azul
                break;
            default:
                pedido.style.backgroundColor = '#f8f9fa'; // Gris por defecto
                break;
        }
    }

    // Función para actualizar los totales
    function actualizarTotales(mesaId) {
        const pedidos = listaPedidos.querySelectorAll('.pedido-group');
        let pagado = 0, servido = 0, pendiente = 0, enCuenta = 0;

        pedidos.forEach(pedido => {
            if (pedido.dataset.mesaId === mesaId) {
                const estado = pedido.querySelector('.pedido-header').dataset.estadoPedido;
                const total = parseFloat(pedido.querySelector('.total').textContent.replace('Total: $', ''));

                switch (estado) {
                    case 'pendiente':
                        pendiente += total;
                        break;
                    case 'servido':
                        servido += total;
                        break;
                    case 'pagado':
                        pagado += total;
                        break;
                    case 'cuenta':
                        enCuenta += total;
                        break;
                }
            }
        });

        // Actualizar los totales en la interfaz
        totalPagado.textContent = `$${pagado.toFixed(2)}`;
        totalServido.textContent = `$${servido.toFixed(2)}`;
        totalPendiente.textContent = `$${pendiente.toFixed(2)}`;
        totalEnCuenta.textContent = `$${enCuenta.toFixed(2)}`;
    }

    // --- Botones de estado de pedidos (Servido, Pagado, Eliminar) ---
    listaPedidos.addEventListener('click', async function (e) {
        const btn = e.target.closest('button');
        if (!btn) return;

        const pedidoGroup = btn.closest('.pedido-group');
        const codigoPedido = pedidoGroup.dataset.pedidoCodigo;

        if (btn.classList.contains('btn-servido')) {
            await cambiarEstadoPedido(codigoPedido, 2); // Estado Servido
        } else if (btn.classList.contains('btn-pagado')) {
            await cambiarEstadoPedido(codigoPedido, 3); // Estado Pagado
        } else if (btn.classList.contains('btn-eliminar')) {
            await cambiarEstadoPedido(codigoPedido, 4); // Estado Eliminado
        }
    });

    // Función para cambiar el estado del pedido
    async function cambiarEstadoPedido(codigoPedido, nuevoEstado) {
        try {
            const response = await fetch(`/Admin/ActualizarEstadoPedido?codigoPedido=${codigoPedido}&nuevoEstado=${nuevoEstado}`, {
                method: 'POST'
            });

            if (response.ok) {
                const estadoNombre = await response.text(); // Obtener el nombre del estado desde el servidor
                const pedidoHeader = document.querySelector(`.pedido-group[data-pedido-codigo="${codigoPedido}"] .pedido-header`);
                const pedidoGroup = document.querySelector(`.pedido-group[data-pedido-codigo="${codigoPedido}"]`);

                if (nuevoEstado === 4) {
                    // Si el estado es "Eliminado", ocultar el pedido
                    pedidoGroup.remove();
                } else {
                    // Actualizar el estado y el color del pedido
                    pedidoHeader.dataset.estadoPedido = estadoNombre.toLowerCase();
                    pintarPedidoPorEstado(pedidoHeader.parentElement, estadoNombre.toLowerCase());
                }

                // Actualizar los totales
                actualizarTotales(mesaSeleccionada);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // --- Botón "Ver Canciones" ---
    btnVerCanciones.addEventListener('click', async function () {
      if (!mesaSeleccionada) {
          alert('Seleccione una mesa primero');
          return;
      }
  
      try {
          const response = await fetch(`/Admin/ObtenerCancionesMesa?mesaId=${mesaSeleccionada}`);
          const canciones = await response.json();
  
          console.log('Canciones:', canciones);
  
          // Crear contenido para mostrar las canciones
          const contenido = canciones.map(c => `
              <li class="cancion ${c.id}">
                  <span>${c.detalle}</span>
                  <span>Estado: ${c.estado}</span>
              </li>
          `).join('');
  
          // Mostrar en la sección de canciones
          document.getElementById('listaCanciones').innerHTML = contenido;
          
          // Mostrar el popup
          popupVerCanciones.show();
          
      } catch (error) {
          console.error('Error:', error);
      }
  });


  function filtrarPedidosPorEstado(estadoFiltrar) {
    const pedidos = listaPedidos.querySelectorAll('.pedido-group');
    
    pedidos.forEach(pedido => {
        const esDeMesaSeleccionada = pedido.dataset.mesaId === mesaSeleccionada;
        const estadoPedido = pedido.querySelector('.pedido-header').dataset.estadoPedido;

        if (esDeMesaSeleccionada) {
            pedido.style.display = (estadoPedido === estadoFiltrar) ? 'block' : 'none';
        } else {
            // Mantener pedidos de otras mesas ocultos
            pedido.style.display = 'none';
        }
    });
}

// Modificar los event listeners de los botones de filtrado
document.getElementById('btnFiltrarPendientes').addEventListener('click', () => {
    filtrarPedidosPorEstado('pendiente');
});

document.getElementById('btnFiltrarServidos').addEventListener('click', () => {
    filtrarPedidosPorEstado('servido');
});

document.getElementById('btnFiltrarPagados').addEventListener('click', () => {
    filtrarPedidosPorEstado('pagado');
});

document.getElementById('btnFiltrarEnCuenta').addEventListener('click', () => {
    filtrarPedidosPorEstado('cuenta');
});

    // En el evento del botón Cerrar Mesa
    btnCerrarMesa.addEventListener('click', async function () {
        if (!mesaSeleccionada) {
            alert('Por favor, seleccione una mesa.');
            return;
        }

        // Verificar pedidos pendientes
        const pedidosPendientes = Array.from(listaPedidos.querySelectorAll('.pedido-group'))
            .filter(pedido =>
                pedido.dataset.mesaId === mesaSeleccionada &&
                (pedido.querySelector('.pedido-header').dataset.estadoPedido === 'pendiente' ||
                    pedido.querySelector('.pedido-header').dataset.estadoPedido === 'servido')
            );

        // Verificar canciones pendientes
        const cancionesPendientes = await fetch(`/Admin/VerificarCancionesPendientes?mesaId=${mesaSeleccionada}`)
            .then(res => res.json());

        if (pedidosPendientes.length > 0 || cancionesPendientes.length > 0) {
            mensajeCerrarMesa.textContent = 'Hay elementos pendientes:';
            listaPendientes.innerHTML = [
                ...pedidosPendientes.map(pedido => {
                    const codigo = pedido.querySelector('.codigo').textContent;
                    const total = pedido.querySelector('.total').textContent;
                    return `<li>Pedido ${codigo} - ${total}</li>`;
                }),
                ...cancionesPendientes.map(c => `<li>Canción: ${c.id} - Estado: ${c.estado}</li>`)
            ].join('');
        } else {
            mensajeCerrarMesa.textContent = 'No hay pendientes. ¿Desea cerrar la mesa?';
            listaPendientes.innerHTML = '';
        }

        popupCerrarMesa.show();
    });

    // --- Lógica de cierre de mesa ---
    btnConfirmarCerrarMesa.addEventListener('click', async function () {
        if (!mesaSeleccionada) {
            alert('Por favor, seleccione una mesa.');
            return;
        }

        try {
            // Actualizar pedidos
            const responsePedidos = await fetch(`/Admin/CerrarMesa?mesaId=${mesaSeleccionada}`, {
                method: 'POST'
            });

            // Actualizar canciones
            const responseCanciones = await fetch(`/Admin/CerrarCancionesMesa?mesaId=${mesaSeleccionada}`, {
                method: 'POST'
            });

            if (responsePedidos.ok && responseCanciones.ok) {
                // Actualizar la vista
                mostrarPedidosMesa(mesaSeleccionada);
                actualizarTotales(mesaSeleccionada);
                popupCerrarMesa.hide();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    document.getElementById('btnDesactivarMesa').addEventListener('click', async function () {
      if (!mesaSeleccionada) {
          alert('Por favor, seleccione una mesa.');
          return;
      }
  
      // Determinar nuevo estado
      const mesa = await fetch(`/Admin/ObtenerMesa?mesaId=${mesaSeleccionada}`).then(res => res.json());
      const nuevoEstado = (mesa.idEstadoMesa === 4) ? 'Ocupada' : 'FueraServicio'; // Toggle entre 2 (Activa) y 4 (Desactivada)
  
      // Actualizar estado
      await fetch(`/Admin/ActualizarEstadoMesa?mesaId=${mesaSeleccionada}&nuevoEstado=${nuevoEstado}`, {
          method: 'POST'
      });
  
      // Actualizar UI
      this.classList.toggle('btn-secondary', nuevoEstado === 'FueraServicio');
      this.classList.toggle('btn-warning', nuevoEstado === 'Ocupada');
      this.textContent = (nuevoEstado === 4) ? 'Desactivada' : 'Desactivar';
  });

   


});