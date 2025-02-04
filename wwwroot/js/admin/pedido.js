document.addEventListener('DOMContentLoaded', function () {
    const mesaButtons = document.querySelectorAll('.mesa-button');
    const listaPedidos = document.getElementById('listaPedidos');
    const totalPagado = document.getElementById('totalPagado');
    const totalServido = document.getElementById('totalServido');
    const totalPendiente = document.getElementById('totalPendiente');
    const totalEnCuenta = document.getElementById('totalEnCuenta');
    const popupCerrarMesa = new bootstrap.Modal(document.getElementById('popupCerrarMesa'));
    const mensajeCerrarMesa = document.getElementById('mensajeCerrarMesa');
    const listaPendientes = document.getElementById('listaPendientes');
    const btnConfirmarCerrarMesa = document.getElementById('btnConfirmarCerrarMesa');

    let mesaSeleccionada = null;

    // --- Mostrar pedidos de la mesa seleccionada ---
    mesaButtons.forEach(button => {
        button.addEventListener('click', function () {
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
                console.log(estado);
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
                pedido.style.backgroundColor = '#000000'; // Gris por defecto
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

    // --- Botones de control ---
    document.getElementById('btnCerrarMesa').addEventListener('click', function () {
        if (!mesaSeleccionada) {
            alert('Por favor, seleccione una mesa.');
            return;
        }

        const pedidosPendientes = Array.from(listaPedidos.querySelectorAll('.pedido-group'))
            .filter(pedido => pedido.dataset.mesaId === mesaSeleccionada && pedido.querySelector('.pedido-header').dataset.estadoPedido === 'pendiente' && pedido.querySelector('.pedido-header').dataset.estadoPedido === 'servido');

        if (pedidosPendientes.length > 0) {
            mensajeCerrarMesa.textContent = 'Hay pedidos pendientes de pago:';
            listaPendientes.innerHTML = pedidosPendientes.map(pedido => {
                const codigo = pedido.querySelector('.codigo').textContent;
                const total = pedido.querySelector('.total').textContent;
                return `<li>${codigo} - ${total}</li>`;
            }).join('');
        } else {
            mensajeCerrarMesa.textContent = 'Todos los pedidos están pagados. ¿Desea cerrar la mesa?';
            listaPendientes.innerHTML = '';
        }

        popupCerrarMesa.show();
    });

    btnConfirmarCerrarMesa.addEventListener('click', function () {
        if (!mesaSeleccionada) {
            alert('Por favor, seleccione una mesa.');
            return;
        }

        // Aquí puedes agregar la lógica para cerrar la mesa (por ejemplo, una llamada a la API)
        alert(`Mesa ${mesaSeleccionada} cerrada correctamente.`);
        popupCerrarMesa.hide();
    });

    // --- Filtros por estado ---
    document.getElementById('btnFiltrarPendientes').addEventListener('click', function () {
        filtrarPedidosPorEstado('pendiente');
    });

    document.getElementById('btnFiltrarServidos').addEventListener('click', function () {
        filtrarPedidosPorEstado('servido');
    });

    document.getElementById('btnFiltrarPagados').addEventListener('click', function () {
        filtrarPedidosPorEstado('pagado');
    });

    document.getElementById('btnFiltrarEnCuenta').addEventListener('click', function () {
        filtrarPedidosPorEstado('cuenta');
    });

    function filtrarPedidosPorEstado(estado) {
        const pedidos = listaPedidos.querySelectorAll('.pedido-group');
        pedidos.forEach(pedido => {
            if (pedido.dataset.mesaId === mesaSeleccionada && pedido.querySelector('.pedido-header').dataset.estadoPedido === estado) {
                pedido.style.display = 'block';
            } else {
                pedido.style.display = 'none';
            }
        });
    }

    // Botones para cambiar estado de los pedidos

    document.getElementById('btn-servido').addEventListener('click', function () {

        filtrarPedidosPorEstado('cuenta');
    });

    document.getElementById('btn-pagado"').addEventListener('click', function () {
        filtrarPedidosPorEstado('cuenta');
    });

    document.getElementById('btn-eliminar').addEventListener('click', function () {
        filtrarPedidosPorEstado('cuenta');
    });

    async function cambiarEstadoPedido(pedidoId, nuevoEstado) {
        const response = await fetch(`/api/pedido/${pedidoId}/estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nuevoEstado })
        });
        if (response.ok) {
            const pedido = listaPedidos.querySelector(`.pedido-group[data-pedido-id="${pedidoId}"]`);
            pedido.querySelector('.pedido-header').dataset.estadoPedido = nuevoEstado;
            pintarPedidoPorEstado(pedido, nuevoEstado);
            actualizarTotales(mesaSeleccionada);
        } else {
            alert('Ocurrió un error al cambiar el estado del pedido.');
        }
    }


});