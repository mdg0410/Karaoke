using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Karaoke.Models;
using Karaoke.Data;

namespace Karaoke.Controllers
{
    public class CarritoController : Controller
    {
        private readonly KaraokeContext _context;

        public CarritoController(KaraokeContext context)
        {
            _context = context;
        }

        // Método para mostrar el formulario inicial
        public IActionResult Index()
        {
            return View();
        }

        // Método para procesar el envío del carrito a la base de datos
        [HttpPost]
        public IActionResult EnviarCarrito([FromBody] List<Pedido> pedidos)
        {
            if (pedidos == null || !pedidos.Any())
            {
                return BadRequest("El carrito está vacío.");
            }

            foreach (var pedido in pedidos)
            {
                // Guardar cada pedido en la base de datos usando el procedimiento almacenado
                _context.Database.ExecuteSqlInterpolated($@"
                    EXEC RegistrarPedido 
                        @IdMesa = {pedido.IdMesa},
                        @IdProducto = {pedido.IdProducto},
                        @Cantidad = {pedido.Cantidad},
                        @IdEstadoPedido = {pedido.IdEstadoPedido},
                        @DetalleAdicional = {pedido.DetalleAdicional ?? string.Empty},
                        @CodigoPedido = {pedido.CodigoPedido ?? string.Empty}");
            }

            return Ok("Los pedidos han sido enviados a la base de datos.");
        }
    }
}
