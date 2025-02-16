document.addEventListener('DOMContentLoaded', function () {

    // ---  Paneles  ---

    // Ocultar todos los paneles al inicio

    //const paneles = document.querySelectorAll('.panel');

    //paneles.forEach(panel => {

    //    panel.style.display = 'none';

    //});

    // Manejar clics en el nav principal

    const enlacesNav = document.querySelectorAll('.nav-tabs .nav-link');

    enlacesNav.forEach(enlace => {

        enlace.addEventListener('click', function () {

            //// Ocultar todos los paneles

            //paneles.forEach(panel => {

            //    panel.style.display = 'none';

            //});


            // Mostrar el panel correspondiente al enlace clickeado


            // Actualizar la clase 'active' en las pestañas del nav principal

            enlacesNav.forEach(enlace => {

                enlace.classList.remove('active');

            });

            this.classList.add('active');

        });

    });
});