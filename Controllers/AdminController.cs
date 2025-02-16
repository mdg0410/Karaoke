using Karaoke.ViewModels;
using Karaoke.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Karaoke.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using System.Data;


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

            if (estado.IdEstadoMesa == 1)
            {
                mesa.Credencial = null;
                mesa.EstadoEspecial = false;
            }

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

        [HttpPost("ActualizarEstadoPedido")]
public async Task<IActionResult> ActualizarEstadoPedido(string codigoPedido, int nuevoEstado)
{
    var pedidos = await _context.Pedidos
        .Where(p => p.CodigoPedido == codigoPedido)
        .ToListAsync();

    foreach (var pedido in pedidos)
    {
        pedido.IdEstadoPedido = nuevoEstado;

        if (pedido.IdProducto == 23 && pedido.DetalleAdicional != null)
        {
            var detalles = pedido.DetalleAdicional.Split(',');
            foreach (var item in detalles)
            {
                if (int.TryParse(item.Trim(), out int idCancionMesa))
                {
                    var cancionMesa = await _context.CancionesMesas
                        .AsNoTracking()
                        .FirstOrDefaultAsync(cm => cm.IdCancionMesa == idCancionMesa);
                    if (cancionMesa != null)
                    {
                        switch (nuevoEstado)
                        {
                            case 2: // Estado Servido
                                cancionMesa.EstadoEspecial = 0;
                                break;
                            case 3: // Estado Pagado
                                cancionMesa.EstadoEspecial = 2;
                                break;
                            case 4: // Estado Eliminado
                                cancionMesa.IdEstadoCancion = 4;
                                break;
                        }
                        _context.CancionesMesas.Update(cancionMesa);
                    }
                }
            }
        }
    }
    await _context.SaveChangesAsync();
    var estadoNombre = await _context.EstadosPedidos
        .Where(e => e.IdEstadoPedido == nuevoEstado)
        .Select(e => e.NombreEstado)
        .FirstOrDefaultAsync() ?? "Desconocido";
    return Content(estadoNombre);
}



        // En Construccion

        [HttpGet("ObtenerCancionesMesa")]
        public async Task<IActionResult> ObtenerCancionesMesa(int mesaId)
        {
            var canciones = await _context.CancionesMesas
        .Where(c => c.IdMesa == mesaId) // Estado 1 = Pendiente
        .Select(c => new {
            id = c.IdCancionMesa,
            detalle = c.Canciones,
            estado = c.IdEstadoCancionNavigation.NombreEstado
        })
        .ToListAsync();

    return Ok(canciones);
        }

        [HttpPost("CerrarPedidosMesa")]
        public async Task<IActionResult> CerrarPedidosMesa(int mesaId)
        {
            var pedidos = _context.Pedidos
                .Where(p => p.IdMesa == mesaId && (p.IdEstadoPedido == 1 || p.IdEstadoPedido == 2 || p.IdEstadoPedido == 5));
            foreach (var pedido in pedidos)
            {
                pedido.IdEstadoPedido = 3; // Pagado
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("CerrarCancionesMesa")]
        public async Task<IActionResult> CerrarCancionesMesa(int mesaId)
        {
            var canciones = _context.CancionesMesas
                .Where(c => c.IdMesa == mesaId && c.EstadoEspecial == 0);
            foreach (var cancion in canciones)
            {
                cancion.EstadoEspecial = 2;
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("VerificarCancionesPendientes")]
public async Task<IActionResult> VerificarCancionesPendientes(int mesaId)
{
    var canciones = await _context.CancionesMesas
        .Where(c => c.IdMesa == mesaId && c.IdEstadoCancion == 1) // Estado 1 = Pendiente
        .Select(c => new {
            id = c.IdCancionMesa,
            detalle = c.Canciones,
            estadoEspecial = c.EstadoEspecial
        })
        .ToListAsync();

    return Ok(canciones);
}

[HttpPost("CierreMesa")]
public async Task<IActionResult> CierreMesa (int mesaId)
{
    var cmd = _context.Database.GetDbConnection().CreateCommand();
    cmd.CommandText = "ExtraerTotalMesa";
    cmd.CommandType = CommandType.StoredProcedure;

    cmd.Parameters.Add(new SqlParameter("@IdMesa", SqlDbType.Int) { Value = mesaId });

    _context.Database.OpenConnection();
    await cmd.ExecuteNonQueryAsync();
    _context.Database.CloseConnection();

    return Ok();

}

[HttpGet("ObtenerMesa")]
public async Task<IActionResult> ObtenerMesa(int mesaId)
{
    var mesa = await _context.Mesas
        .FirstOrDefaultAsync(m => m.IdMesa == mesaId);

    return Ok(new {
        idEstadoMesa = mesa?.IdEstadoMesa
    });
}

[HttpPost("ActualizarEstadoMesa")]
public async Task<IActionResult> ActualizarEstadoMesa(int mesaId, string nuevoEstado)
{
    // Validar si la mesa existe
    var mesa = await _context.Mesas.FindAsync(mesaId);
    if (mesa == null)
    {
        return NotFound("Mesa no encontrada.");
    }

    // Validar si el estado existe
    var estado = await _context.EstadosMesas
        .FirstOrDefaultAsync(e => e.NombreEstado.ToLower() == nuevoEstado.ToLower());
    if (estado == null)
    {
        return BadRequest("Estado no válido.");
    }

    // Actualizar el estado de la mesa
    mesa.IdEstadoMesa = estado.IdEstadoMesa;

    // Guardar cambios en la base de datos
    await _context.SaveChangesAsync();

    return Ok();
}

    }
}
