using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Karaoke.Data;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MesaController : ControllerBase
    {
        private readonly KaraokeContext _context;
        public MesaController(KaraokeContext context)
        {
            _context = context;
        }

        [HttpPost("Validar/{idMesa}")]
        public async Task<IActionResult> Validar(int idMesa)
        {
            Console.WriteLine("¡Hola, Mundo!");
            // Obtén la mesa desde la base de datos
            var mesa = await _context.Mesas.FindAsync(idMesa);

            if (mesa == null)
            {
                return NotFound(new { message = "Mesa no encontrada" });
            }

            if (mesa.IdEstadoMesa == 2) // Estado 2 significa "Ocupado"
            {
                return BadRequest(new { message = "La mesa ya está ocupada" });
            }

            // Cambiar estado a ocupado (2)
            mesa.IdEstadoMesa = 2;

            // Generar credencial (puede ser un GUID)
            mesa.Credencial = Guid.NewGuid().ToString();

            await _context.SaveChangesAsync();

            return Ok(new { message = "Mesa validada", credencial = mesa.Credencial });
        }

        [HttpPost("Finalizar/{idMesa}")]
        public async Task<IActionResult> Finalizar(int idMesa)
        {
            var mesa = await _context.Mesas.FindAsync(idMesa);

            if (mesa == null)
            {
                return NotFound(new { message = "Mesa no encontrada" });
            }

            mesa.IdEstadoMesa = 0; // Disponible
            mesa.Credencial = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Mesa finalizada" });
        }
    }
}

