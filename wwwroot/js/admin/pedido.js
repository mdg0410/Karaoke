document.addEventListener('DOMContentLoaded', function () {

  const mesaButtons = document.querySelectorAll('.mesa-button');

  const listaPedidos = document.getElementById('listaPedidos');
  const totalPagado = document.getElementById('totalPagado');
  const totalServido = document.getElementById('totalServido');
  const totalPendiente = document.getElementById('totalPendiente');
  const totalEnCuenta = document.getElementById('totalEnCuenta');

  const btnCerrarMesa = document.getElementById('btnCerrarMesa');
  const popupCerrarMesa = new bootstrap.Modal(document.getElementById('popupCerrarMesa'));
  const mensajeCerrarMesa = document.getElementById('mensajeCerrarMesa');
  const btnConfirmarCerrarMesa = document.getElementById('btnConfirmarCerrarMesa');

  const btnDesactivarMesa = document.getElementById('btnDesactivarMesa');

  const listaPendientes = document.getElementById('listaPendientes');

  const btnVerCanciones = document.getElementById('btnVerCanciones');
  const popupVerCanciones = new bootstrap.Modal(document.getElementById('popupVerCanciones'));

  let mesaSeleccionada = null;

  mesaButtons.forEach(button => {
    button.addEventListener('click', function () {
      mesaButtons.forEach(btn => btn.classList.remove('boton-seleccionado'));
      this.classList.add('boton-seleccionado');
      mesaSeleccionada = this.dataset.mesaId;
      mostrarPedidosMesa(mesaSeleccionada);
      actualizarTotales(mesaSeleccionada);
    });
  });

  function mostrarPedidosMesa(mesaId) {
    const pedidos = listaPedidos.querySelectorAll('.pedido-group');
    pedidos.forEach(pedido => {
      if (pedido.dataset.mesaId === mesaId && pedido.querySelector('.pedido-header').dataset.estadoPedido !== 'cancelado') {
        pedido.style.display = 'block';
        const estado = pedido.querySelector('.pedido-header').dataset.estadoPedido;
        pintarPedidoPorEstado(pedido, estado);
      } else {
        pedido.style.display = 'none';
      }
    });
  }

  function pintarPedidoPorEstado(pedido, estado) {
    switch (estado) {
      case 'pendiente':
        pedido.style.backgroundColor = '#f9f871'; // Amarillo
        break;
      case 'servido':
        pedido.style.backgroundColor = '#ace279'; // Verde
        break;
      case 'pagado':
        pedido.style.backgroundColor = '#26a98c'; // Rojo
        pedido.style.border = '3px solid #006877';
        break;
      case 'cuenta':
        pedido.style.backgroundColor = '#008888'; // Azul
        break;
      default:
        pedido.style.backgroundColor = '#2f4858'; // Gris por defecto
        break;
    }
  }

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
    totalPagado.textContent = `$${pagado.toFixed(2)}`;
    totalServido.textContent = `$${servido.toFixed(2)}`;
    totalPendiente.textContent = `$${pendiente.toFixed(2)}`;
    totalEnCuenta.textContent = `$${enCuenta.toFixed(2)}`;
  }

  listaPedidos.addEventListener('click', async function (event) {
    const btn = event.target;
    const pedidoGroup = btn.closest('.pedido-group');
    if (!pedidoGroup) return;
    const codigoPedido = pedidoGroup.dataset.pedidoCodigo;
    if (btn.classList.contains('btn-servido')) {
      await cambiarEstadoPedido(codigoPedido, 2); // Estado Servido
    } else if (btn.classList.contains('btn-pagado')) {
      await cambiarEstadoPedido(codigoPedido, 3); // Estado Pagado
    } else if (btn.classList.contains('btn-eliminar')) {
      await cambiarEstadoPedido(codigoPedido, 4); // Estado Eliminado
    }
  });

  async function cambiarEstadoPedido(codigoPedido, nuevoEstado) {
    try {
      const response = await fetch(`/Admin/ActualizarEstadoPedido?codigoPedido=${codigoPedido}&nuevoEstado=${nuevoEstado}`, {
        method: 'POST'
      });
      if (response.ok) {
        const estadoNombre = await response.text();
        const pedidoHeader = document.querySelector(`.pedido-group[data-pedido-codigo="${codigoPedido}"] .pedido-header`);
        const pedidoGroup = document.querySelector(`.pedido-group[data-pedido-codigo="${codigoPedido}"]`);
        if (nuevoEstado === 4) {
          pedidoGroup.remove();
        } else {
          pedidoHeader.dataset.estadoPedido = estadoNombre.toLowerCase();
          pintarPedidoPorEstado(pedidoHeader.parentElement, estadoNombre.toLowerCase());
        }
        actualizarTotales(mesaSeleccionada);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  btnVerCanciones.addEventListener('click', async function () {
    if (!mesaSeleccionada) {
      alert('Seleccione una mesa primero');
      return;
    }

    try {
      const response = await fetch(`/Admin/ObtenerCancionesMesa?mesaId=${mesaSeleccionada}`);
      const canciones = await response.json();
      const contenido = canciones.map(c => `
          <li class="cancion ${c.id}">
            <span>${c.detalle}</span>
            <span>Estado: ${c.estado}</span>
          </li>
        `).join('');
      document.getElementById('listaCanciones').innerHTML = contenido;
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
        pedido.style.display = 'none';
      }
    });
  }

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

  btnCerrarMesa.addEventListener('click', async function () {
    if (!mesaSeleccionada) {
      alert('Por favor, seleccione una mesa.');
      return;
    }

    const pedidosPendientes = Array.from(listaPedidos.querySelectorAll('.pedido-group'))
      .filter(pedido =>
        pedido.dataset.mesaId === mesaSeleccionada &&
        (pedido.querySelector('.pedido-header').dataset.estadoPedido === 'pendiente' ||
          pedido.querySelector('.pedido-header').dataset.estadoPedido === 'servido')
      );

    const cancionesPendientes = await fetch(`/Admin/VerificarCancionesPendientes?mesaId=${mesaSeleccionada}`)
      .then(res => res.json());
    if (pedidosPendientes.length > 0 || cancionesPendientes.length > 0) {
      mensajeCerrarMesa.textContent = 'Hay elementos pendientes:';
      
      const cancionesFiltradas = cancionesPendientes.filter(c => c.EstadoEspecial !== 1 && c.EstadoEspecial !== 2);        
      let totalCierre = 0;

      listaPendientes.innerHTML = [
        ...pedidosPendientes.map(pedido => {
          const codigo = pedido.querySelector('.codigo').textContent;
          const total = pedido.querySelector('.total').textContent;
          totalCierre += parseFloat(total.replace('Total: $', ''));
          return `<li>Pedido ${codigo} - ${total}</li>`;
        }),
        ...cancionesFiltradas.map(c => {
          totalCierre += 1;
          return `<li>Canción: ${c.id} - Detalle: ${c.detalle} - Total: $1</li>`;
        })
      ].join('');
      document.getElementById('totalCierreMesa').textContent = `$${totalCierre.toFixed(2)}`;
    } else {
      mensajeCerrarMesa.textContent = 'No hay pendientes. ¿Desea cerrar la mesa?';
      listaPendientes.innerHTML = '';
    }
    popupCerrarMesa.show();
  });

  btnConfirmarCerrarMesa.addEventListener('click', async function () {
    if (!mesaSeleccionada) {
      alert('Por favor, seleccione una mesa.');
      return;
    }

    try {
      const responsePedidos = await fetch(`/Admin/CerrarPedidosMesa?mesaId=${mesaSeleccionada}`, {
        method: 'POST'
      });

      const responseCanciones = await fetch(`/Admin/CerrarCancionesMesa?mesaId=${mesaSeleccionada}`, {
        method: 'POST'
      });

      if (responsePedidos.ok && responseCanciones.ok) {
        const responseCierreMesa = await fetch(`/Admin/CierreMesa?mesaId=${mesaSeleccionada}`, {
          method: 'POST'
        });
        if (responseCierreMesa.ok) {
        mostrarPedidosMesa(mesaSeleccionada);
        actualizarTotales(mesaSeleccionada);
        popupCerrarMesa.hide();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  btnDesactivarMesa.addEventListener('click', async function () {
    if (!mesaSeleccionada) {
      alert('Por favor, seleccione una mesa.');
      return;
    }

    const mesa = await fetch(`/Admin/ObtenerMesa?mesaId=${mesaSeleccionada}`).then(res => res.json());
    const nuevoEstado = (mesa.idEstadoMesa === 4) ? 'Ocupada' : 'FueraServicio'; // Toggle entre 2 (Activa) y 4 (Desactivada)

    await fetch(`/Admin/ActualizarEstadoMesa?mesaId=${mesaSeleccionada}&nuevoEstado=${nuevoEstado}`, {
      method: 'POST'
    });

    this.classList.toggle('btn-secondary', nuevoEstado === 'FueraServicio');
    this.classList.toggle('btn-warning', nuevoEstado === 'Ocupada');
    this.textContent = (nuevoEstado === 4) ? 'Desactivada' : 'Desactivar';
  });




});