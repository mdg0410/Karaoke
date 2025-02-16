import { connection } from '../signalRConnection.js';



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

                actualizarVistaMesa(mesaId, nuevoEstado);

            })
            
            .catch(error => {

                console.error(error);

            });

    }


    connection.on("RecibirCambioMesa", (mesaId, nuevoEstado) => {
        console.log(`Recibido cambio de estado de mesa ${mesaId} a ${nuevoEstado}`);
        actualizarVistaMesa(mesaId, nuevoEstado);
    });


    function actualizarVistaMesa(mesaId, nuevoEstado) {

        const mesa = document.querySelector(`.mesa[data-mesa-id="${mesaId}"]`);
        mesa.classList.remove("libre", "ocupada", "reservada", "cuenta", "fueraservicio");
        mesa.classList.add(nuevoEstado);


        const checkmesa = document.getElementById(`mesa-check-${mesaId}`);
        if (nuevoEstado.toLowerCase() === "fueraservicio") {
            checkmesa.disabled = true;
        } else {
            checkmesa.disabled = false;
        }
    }

 


});