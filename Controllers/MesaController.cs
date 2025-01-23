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

        [HttpGet("Certificado")]
        public async Task<IActionResult> Certificado()
        {
            try
            {
                var mesas = await _context.Mesas.
                    Select(m => new
                    {
                        m.IdMesa,
                        m.Credencial,
                        m.IdEstadoMesa,
                    }).ToListAsync();
                return Ok(mesas);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // Validar mesa y generar credencial
        // Se pasa por el body el id de la mesa
        // Se devuelve un mensaje de confirmación y la credencial
        [HttpPost("Validar/{idMesa}")]
        public async Task<IActionResult> Validar(int idMesa)
        {
            var mesa = await _context.Mesas.FindAsync(idMesa);

            if (mesa == null)
            {
                return BadRequest(new { message = "Mesa no encontrada" });
            }

            if (mesa.IdEstadoMesa == 2)
            {
                return BadRequest(new { message = "La mesa ya está ocupada" });
            }

            mesa.IdEstadoMesa = 2; //Estado 2: Ocupado

            mesa.Credencial = Guid.NewGuid().ToString();// Generar credencial

            await _context.SaveChangesAsync();

            return Ok(new { message = "Mesa validada", credencial = mesa.Credencial });
        }

        // Finalizar mesa
        // Se pasa por el body el id de la mesa
        // Se devuelve un mensaje de confirmación
        // Proximamente se agrega logica para limpiar, cerrar y liberar la mesa 
        [HttpPost("Finalizar/{idMesa}")]
        public async Task<IActionResult> Finalizar(int idMesa)
        {
            var mesa = await _context.Mesas.FindAsync(idMesa);

            if (mesa == null)
            {
                return BadRequest(new { message = "Mesa no encontrada" });
            }

            mesa.IdEstadoMesa = 0; //Estado 0: Disponible
            mesa.Credencial = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Mesa finalizada" });
        }
    }
}

