document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idMesa = urlParams.get('idMesa');
    const mesaCredencial = localStorage.getItem('mesaCredencial');

    if (!idMesa) {
        alert('Consigue una mesa y escanea su QR');
        return;
    }

    try {
        const response = await fetch(`/Mesa/Certificado`, {
            method: 'GET',
        });

        const data = await response.json();

        let mesaValidada = false;
        data.forEach(item => {
            if (item.credencial === mesaCredencial) {
                if (item.idMesa === idMesa) {
                    mesaValidada = true;
                }
            }
        });

        if (mesaValidada) {
            alert('Mesa ya validada');
            return;
        }

        const validarResponse = await fetch(`/Mesa/Validar/${idMesa}`, {
            method: 'POST',
        });

        const validarData = await validarResponse.json();

        if (validarResponse.ok) {
            localStorage.setItem('mesaCredencial', validarData.credencial);
            localStorage.setItem('idMesa', idMesa);
            alert('Mesa validada correctamente');
        } else {
            alert(validarData.message || 'Error al validar la mesa');
        }
    } catch (error) {
        console.error('Error al validar la mesa:', error);
        alert('Error al validar la mesa');
    }
});

