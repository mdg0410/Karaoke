using Karaoke.ViewModels;
using Karaoke.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Controllers
{
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
                TotalSumado = new TotalesViewModel
                {
                    TotalSumado = totalGeneral
                }
            };

            return View(model);
        }

        public IActionResult Test()
        {
            var totalSumado = _context.Database.ExecuteSqlRaw("DECLARE @result INT; EXEC @result = ObtenerTotalSumado; SELECT @result");

            return View((object)totalSumado);
        }
    }
}
