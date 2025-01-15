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
    public class KaraokeController : ControllerBase
    {
        private readonly KaraokeContext _context;

        public KaraokeController(KaraokeContext context)
        {
            _context = context;
        }

        // Método para enviar el formulario de canciones. Parametros esperados: IdMesa y Canciones
        // Salida: Mensaje de confirmación
        [HttpPost("EnviarFormulario")]
        public async Task<IActionResult> EnviarFormulario([FromBody] List<CancionViewModel> data)
        {
            foreach (var cancion in data)
            {
                var cmd = _context.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "AgregarCancion";
                cmd.CommandType = CommandType.StoredProcedure;

                // Envía el ID de la mesa y las canciones como texto 
                cmd.Parameters.Add(new SqlParameter("@IdMesa", SqlDbType.Int) { Value = cancion.IdMesa });
                cmd.Parameters.Add(new SqlParameter("@Canciones", SqlDbType.VarChar) { Value = cancion.Canciones });

                _context.Database.OpenConnection();
                await cmd.ExecuteNonQueryAsync();
                _context.Database.CloseConnection();
            }

            return Ok(new { message = "Datos enviados correctamente" });
        }


        // Método para obtener las canciones de la mesa. No recibe parámetros
        // Salida: Lista de canciones total, proximamente se usara un procedimiento almacenado
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
