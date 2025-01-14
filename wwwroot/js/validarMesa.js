document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idMesa = urlParams.get('idMesa');

    if (localStorage.getItem('idMesa')) {
        return;
    }

    if (!idMesa) {
        alert('ID de mesa no proporcionado');
        return;
    }

    try {
        const response = await fetch(`/Mesa/Validar/${idMesa}`, {
            method: 'POST',
        });

        const data = await response.json();

        console.log(data);

        if (response.ok) {
            localStorage.setItem('mesaCredencial', data.credencial);
            localStorage.setItem('idMesa', idMesa);
            alert('Mesa validada con éxito');
        } else {
            alert(data.message || 'Error al validar la mesa post validar');
        }
    } catch (error) {
        console.error('Error al validar la mesa: post validar catch', error);
        alert('Error al validar la mesa');
    }
});
