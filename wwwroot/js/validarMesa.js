document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idMesa = urlParams.get('idMesa');
    const mesaCredencial = localStorage.getItem('mesaCredencial');

    try {

        if (!idMesa) {
            throw new Error('Consigue una mesa y escanea su QR');
        }

        if (idMesa && mesaCredencial) {

            const response = await fetch(`/Mesa/Certificado`, {
                method: 'GET',
            });

            const data = await response.json();

            let mesaValidada = false;
            data.forEach(item => {
                if (item.credencial === mesaCredencial) {
                    if (item.idMesa === parseInt(idMesa)) {
                        mesaValidada = true;
                    }
                }
            });

            if (!mesaValidada) {
                throw new Error('Credenciales incorrectas');
            }

        } else {

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
        }
    } catch (error) {
        console.error('Error al validar la mesa:', error);
        alert('Error al validar la mesa');
    }
});

