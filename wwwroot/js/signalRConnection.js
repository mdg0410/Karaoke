// wwwroot/js/signalRConnection.js

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/karaokeHub")
    .build();

connection.start()
    .then(() => console.log("Conectado al Hub"))
    .catch(err => console.error(err));

// Exportar la conexión para que otros scripts puedan usarla
export { connection };