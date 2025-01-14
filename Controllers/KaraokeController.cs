using Microsoft.AspNetCore.Mvc;
using Karaoke.Data;
using Karaoke.Models;
using Karaoke.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;


namespace Karaoke.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KaraokeController : Controller
    {
        private readonly KaraokeContext _context;

        public KaraokeController(KaraokeContext context)
        {
            _context = context;
        }

        [HttpPost("EnviarFormulario")]
        public async Task<IActionResult> EnviarFormulario([FromBody] List<CancionViewModel> data)
        {
            foreach (var cancion in data)
            {
                var cmd = _context.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "AgregarCancion";  // Asegúrate de que el nombre del SP esté correcto
                cmd.CommandType = CommandType.StoredProcedure;

                // Envía el ID de la mesa, las canciones como texto y el estado de la canción
                cmd.Parameters.Add(new SqlParameter("@IdMesa", SqlDbType.Int) { Value = cancion.IdMesa });
                cmd.Parameters.Add(new SqlParameter("@Canciones", SqlDbType.VarChar) { Value = cancion.Canciones });  // Canción como texto

                _context.Database.OpenConnection();
                await cmd.ExecuteNonQueryAsync();
                _context.Database.CloseConnection();
            }

            return Ok(new { message = "Datos enviados correctamente" });
        }

        [HttpGet("ObtenerCanciones")]
        public async Task<IActionResult> ObtenerCanciones()
        {
            try
            {
                var canciones = await _context.CancionesMesas
                    .Select(c => new
                    {
                        c.IdCancionMesa,
                        c.IdMesa,
                        c.Canciones,
                        c.IdEstadoCancion,
                        c.EstadoEspecial
                    })
                    .ToListAsync();

                return Ok(canciones);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }


    }
}
