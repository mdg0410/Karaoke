document.addEventListener('DOMContentLoaded', function () {
    // --- Manejar el cambio en los checkboxes de estado especial ---
    const estadoEspecialCheckboxes = document.querySelectorAll('.form-check-input');
    estadoEspecialCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const mesaId = this.id.split('-').pop();
            const estadoEspecial = this.checked;
            actualizarEstadoEspecial(mesaId, estadoEspecial);
        });
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
                actualizarVistaMesa(mesaId, estadoEspecial);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // --- Función para actualizar la vista de la mesa ---
    function actualizarVistaMesa(mesaId, estadoEspecial) {
        const checkmesa = document.getElementById(`mesa-check-${mesaId}`);
        if (estadoEspecial) {
            checkmesa.parentElement.classList.add('especial');
        } else {
            checkmesa.parentElement.classList.remove('especial');
        }
        if (estadoMesa.toLowerCase() === "fuera de servicio") {
            checkmesa.disabled = true;
        } else {
            checkmesa.disabled = false;
        }
    }
});


