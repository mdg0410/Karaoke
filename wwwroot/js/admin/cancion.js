document.addEventListener('DOMContentLoaded', function () {
  const listaCanciones = document.getElementById('cancionesLista');

  // Inicializar SortableJS
  const sortable = new Sortable(listaCanciones, {
      onEnd: function () {
          guardarOrden();
      }
  });

  // Función para cargar las canciones desde el servidor
  const cargarCanciones = async () => {
      try {
          const response = await fetch('/Karaoke/ObtenerCanciones');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const canciones = await response.json();
          return canciones;
      } catch (error) {
          console.error("Error al cargar las canciones:", error);
          return []; // Retorna un array vacío en caso de error
      }
  };

  // Función para mostrar las canciones en la lista
  const mostrarCanciones = async () => {
      let canciones = [];

      // Intenta obtener las canciones del localStorage
      const cancionesGuardadas = localStorage.getItem('ListaCanciones');

      if (cancionesGuardadas) {
          console.log('Cargando canciones desde localStorage...');
          canciones = JSON.parse(cancionesGuardadas);
      } else {
          console.log('Cargando canciones desde el servidor...');
          // Si no están en localStorage, las carga del servidor
          canciones = await cargarCanciones();
          localStorage.setItem('ListaCanciones', JSON.stringify(canciones));
      }

      // Limpia la lista antes de agregar elementos
      listaCanciones.innerHTML = '';

      // Itera sobre las canciones y crea los elementos de la lista
      canciones.forEach(cancion => {
          const li = document.createElement('li');
          li.className = 'list-group-item'; // Agrega una clase para Bootstrap
          li.dataset.id = cancion.idCancionMesa; // Asigna el ID de la canción como un atributo de datos
          li.textContent = `${cancion.idCancionMesa} - ${cancion.canciones} - Mesa: ${cancion.idMesa} - Estado: ${cancion.idEstadoCancion}`;

          // Crear botón de eliminar
          const botonEliminar = document.createElement('button');
          botonEliminar.className = 'btn btn-danger btn-sm float-right'; // Clase para Bootstrap y float a la derecha
          botonEliminar.textContent = 'Eliminar';
          botonEliminar.addEventListener('click', () => eliminarCancion(cancion.idCancionMesa));
          li.appendChild(botonEliminar);

          // Agrega el elemento a la lista
          listaCanciones.appendChild(li);
      });

      // Aplica el orden guardado desde localStorage
      aplicarOrdenGuardado();
  };

  // Función para eliminar una canción
  const eliminarCancion = async (idCancion) => {
      try {
          const response = await fetch(`/Karaoke/CambiarEstadoCancion/${idCancion}`, {
              method: 'POST' // O el método que uses en tu API para eliminar
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          // Si la eliminación fue exitosa, actualiza la lista de canciones
          mostrarCanciones();
      } catch (error) {
          console.error("Error al eliminar la canción:", error);
      }
  };

  // Función para guardar el orden de las canciones en localStorage
  const guardarOrden = () => {
      const orden = Array.from(listaCanciones.children).map((li, index) => ({
          id: li.dataset.id,
          posicion: index
      }));
      localStorage.setItem('ordenCanciones', JSON.stringify(orden));
  };

  // Función para aplicar el orden guardado desde localStorage
  const aplicarOrdenGuardado = () => {
      const ordenGuardado = localStorage.getItem('ordenCanciones');

      if (ordenGuardado) {
          const orden = JSON.parse(ordenGuardado);

          // Crea un mapa para acceder rápidamente a los elementos de la lista
          const liMap = {};
          Array.from(listaCanciones.children).forEach(li => {
              liMap[li.dataset.id] = li;
          });

          // Limpia la lista actual
          listaCanciones.innerHTML = '';

          // Reordena los elementos según el orden guardado
          orden.forEach(item => {
              if (liMap[item.id]) {
                  listaCanciones.appendChild(liMap[item.id]);
              }
          });
      }
  };

  // Carga y muestra las canciones al cargar la página
  mostrarCanciones();
});