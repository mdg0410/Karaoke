using Karaoke.ViewModels;
using Karaoke.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karaoke.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Karaoke.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private readonly KaraokeContext _context;

        public AdminController(KaraokeContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {

            decimal totalGeneral = _context.TotalesMesas.Sum(t => t.Total);

            var model = new AdminViewModel
            {
                Mesas = new MesasViewModel
                {
                    ListaMesas = _context.Mesas.Include(m => m.IdEstadoMesaNavigation).ToList(),
                    EstadosMesa = _context.EstadosMesas.ToList()
                },
                Pedidos = new PedidosViewModel
                {
                    ListaPedidos = _context.Pedidos
                        .Include(p => p.IdMesaNavigation)
                        .Include(p => p.IdProductoNavigation)
                        .Include(p => p.IdEstadoPedidoNavigation)
                        .ToList(),
                    EstadosPedido = _context.EstadosPedidos.ToList(),
                    Productos = _context.Productos.ToList()
                },
                Canciones = new CancionesViewModel
                {
                    ListaCanciones = _context.CancionesMesas
                        .Include(c => c.IdMesaNavigation)
                        .Include(c => c.IdEstadoCancionNavigation)
                        .ToList(),
                    EstadosCancion = _context.EstadosCancions.ToList()
                },
                Usuarios = new UsuariosViewModel
                {
                    ListaUsuarios = _context.Usuarios.Include(u => u.IdRolNavigation).ToList(),
                    Roles = _context.Roles.ToList()
                },
                Totales = new TotalesViewModel
                {
                    TotalGeneral = totalGeneral                }
            };

            return View(model);
        }

        //public IActionResult Test()
        //{
        //    var totalSumado = _context.Database.ExecuteSqlRaw("DECLARE @result INT; EXEC @result = ObtenerTotalSumado; SELECT @result");

        //    return View((object)totalSumado);
        //}




        // En tu AdminController

        [HttpPost("ActualizarMesa")]
        public async Task<IActionResult> ActualizarMesa(int mesaId, string nuevoEstado)
        {
            var mesa = _context.Mesas.Find(mesaId);
            if (mesa == null) return NotFound();

            var estado = _context.EstadosMesas.FirstOrDefault(e => e.NombreEstado.ToLower() == nuevoEstado);
            if (estado == null) return BadRequest();

            mesa.IdEstadoMesa = estado.IdEstadoMesa;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("ActualizarEstadoEspecial")]
        public IActionResult ActualizarEstadoEspecial(int mesaId, bool estadoEspecial)
        {
            // 1. Buscar la mesa en la base de datos
            var mesa = _context.Mesas.Find(mesaId);

            if (mesa == null)
            {
                return NotFound(); // O manejar el error de otra manera
            }

            // 2. Actualizar el estado especial de la mesa
            mesa.EstadoEspecial = estadoEspecial;
            _context.SaveChanges();

            return Ok(); // O devolver una respuesta con información adicional si es necesario
        }


    }
}
