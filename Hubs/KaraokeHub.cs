using Microsoft.AspNetCore.SignalR;

namespace Karaoke.Hubs
{
    public class KaraokeHub : Hub
    {
        // Método para notificar cambios en las mesas
        public async Task NotificarCambioMesa(int mesaId, string nuevoEstado)
        {
            await Clients.All.SendAsync("RecibirCambioMesa", mesaId, nuevoEstado);
        }

        // Método para notificar cambios en los pedidos
        public async Task NotificarCambioPedido(int pedidoId, string nuevoEstado)
        {
            await Clients.All.SendAsync("RecibirCambioPedido", pedidoId, nuevoEstado);
        }

        // Método para notificar cambios en las canciones
        public async Task NotificarCambioCancion(int cancionId, string nuevoEstado)
        {
            await Clients.All.SendAsync("RecibirCambioCancion", cancionId, nuevoEstado);
        }
    }
}