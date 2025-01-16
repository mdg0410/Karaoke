async function enviarPedido(carrito) {
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
            handleLimpiarCarrito();
            alert('Pedido enviado correctamente');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema al enviar el pedido. Inténtalo de nuevo.');
        });
}

export { enviarPedido };