document.addEventListener('DOMContentLoaded', function () {
    // ---  Mesas  ---

    // Obtener todos los elementos de la lista de mesas
    const mesas = document.querySelectorAll('.mesa');

    // Iterar sobre cada mesa y asignar el evento click
    mesas.forEach(mesa => {
        mesa.addEventListener('click', function () {
            // Obtener el ID de la mesa
            const mesaId = mesa.dataset.mesaId;

            // Obtener el estado activo del nav de estados
            const estadoActivo = document.querySelector('.nav-pills .nav-link.active');
            const nuevoEstado = estadoActivo.dataset.estado;

            // Actualizar el estado de la mesa en el servidor (llamada AJAX)
            actualizarEstadoMesa(mesaId, nuevoEstado);
        });
    });

    // ---  Pedidos  ---
    const pedidos = document.querySelectorAll('#pedidos li');
    pedidos.forEach(pedido => {
        // ... (Aquí puedes agregar lógica para interactuar con los pedidos) ...
    });


    // ---  Canciones  ---
    const canciones = document.querySelectorAll('#canciones li');
    canciones.forEach(cancion => {
        // ... (Aquí puedes agregar lógica para interactuar con las canciones) ...
    });


    // ---  Usuarios  ---
    const usuarios = document.querySelectorAll('#usuarios li');
    usuarios.forEach(usuario => {
        // ... (Aquí puedes agregar lógica para interactuar con los usuarios) ...
    });


    // ---  Paneles  ---
    // Ocultar todos los paneles al inicio
    const paneles = document.querySelectorAll('.panel');
    paneles.forEach(panel => {
        panel.style.display = 'none';
    });

    // Mostrar el panel de mesas por defecto
    document.getElementById('mesas').style.display = 'block';

    // Manejar clics en el nav principal
    const enlacesNav = document.querySelectorAll('.nav-tabs .nav-link');
    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', function () {
            // Ocultar todos los paneles
            paneles.forEach(panel => {
                panel.style.display = 'none';
            });

            // Mostrar el panel correspondiente al enlace clickeado
            const target = this.dataset.bsTarget;
            document.querySelector(target).style.display = 'block';

            // Actualizar la clase 'active' en las pestañas del nav principal
            enlacesNav.forEach(enlace => {
                enlace.classList.remove('active');
            });
            this.classList.add('active');
        });
    });


    // ---  Función para obtener el color según el estado de la mesa  ---
    function GetColorForEstado(estado) {
        switch (estado) {
            case 1: return "green";
            case 2: return "yellow";
            case 3: return "orange";
            case 4: return "red";
            case 9: return "blue";
            default: return "gray";
        }
    }

    // --- Función para actualizar el estado de la mesa en el servidor (AJAX) ---
    function actualizarEstadoMesa(mesaId, nuevoEstado) {
        fetch(`/Admin/ActualizarMesa?mesaId=${mesaId}&nuevoEstado=${nuevoEstado}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el estado de la mesa.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
                // Actualizar la vista (opcional)
                actualizarVistaMesa(mesaId, nuevoEstado);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // --- Manejar el cambio en el checkbox de estado especial ---
    const estadoEspecialCheckbox = document.getElementById('estado-especial');
    estadoEspecialCheckbox.addEventListener('change', function () {
        const mesaId = document.getElementById('mesa-number').value;
        const estadoEspecial = this.checked;

        if (mesaId) {
            actualizarEstadoEspecial(mesaId, estadoEspecial);
        } else {
            alert("Por favor, selecciona una mesa.");
        }
    });

    // --- Función para actualizar el estado especial de la mesa en el servidor (AJAX) ---
    function actualizarEstadoEspecial(mesaId, estadoEspecial) {
        fetch(`/Admin/ActualizarEstadoEspecial?mesaId=${mesaId}&estadoEspecial=${estadoEspecial}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el estado especial de la mesa.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function actualizarVistaMesa (mesaId, nuevoEstado) {
        // 1. Obtener la mesa que se va a actualizar
        const mesa = document.querySelector(`.mesa[data-mesa-id="${mesaId}"]`);

        // 2. Eliminar las clases de estado actuales
        mesa.classList.remove("libre", "ocupada", "reservada", "fuera-de-servicio", "cuenta");

        // 3. Agregar la nueva clase de estado
        mesa.classList.add(nuevoEstado);

        // 4. Obtener el elemento img dentro de la mesa
        const img = mesa.querySelector('img');

        // 5. Actualizar la imagen según el nuevo estado
        if (img) {
            img.src = `/images/Mesa-${nuevoEstado}.png`;
        }
    }

    // --- Manejar la búsqueda de mesas (puedes agregar esta lógica) ---

});