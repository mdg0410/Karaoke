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
    public class PedidoController : ControllerBase
    {
        private readonly KaraokeContext _context;

        public PedidoController(KaraokeContext context)
        {
            _context = context;
        }

        [HttpPost("EnviarPedido")]
        public async Task<IActionResult> EnviarPedido([FromBody] List<PedidoViewModel> carrito)
        {
            var ListaCanciones = _context.CancionesMesas.ToList();



            if (carrito == null || !carrito.Any())
            {
                return BadRequest("El carro de compras está vacío");
            }

            var codigoPedido = GenerarCodigoPedido(6);

            var certificados = carrito.Select(carrito => carrito.Credencial).ToList();
            //var validarCertificado = await _context.Mesas.FirstOrDefaultAsync(m => certificados.Contains(m.Credencial));

            //if (validarCertificado == null)
            //{
            //    return NotFound("Certificado no encontrado");
            //}

            Console.WriteLine(certificados);

            foreach (var producto in carrito)
            {
                var cmd = _context.Database.GetDbConnection().CreateCommand();
                cmd.CommandText = "InsertarPedido";
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.Add(new SqlParameter("@IdMesa", SqlDbType.Int) { Value = producto.IdMesa });
                cmd.Parameters.Add(new SqlParameter("@IdProducto", SqlDbType.Int) { Value = producto.IdProducto });
                cmd.Parameters.Add(new SqlParameter("@Cantidad", SqlDbType.Int) { Value = producto.Cantidad });
                cmd.Parameters.Add(new SqlParameter("@IdEstadoPedido", SqlDbType.Int) { Value = 1 });
                cmd.Parameters.Add(new SqlParameter("@DetalleAdicional", SqlDbType.NVarChar, 255) { Value = (object)producto.DetalleAdicional ?? DBNull.Value });
                cmd.Parameters.Add(new SqlParameter("@CodigoPedido", SqlDbType.NVarChar, 100) { Value = codigoPedido });

                _context.Database.OpenConnection();
                await cmd.ExecuteNonQueryAsync();
                _context.Database.CloseConnection();
            }

            return Ok("Pedido enviado correctamente");
        }

        private string GenerarCodigoPedido(int longitud)
        {
            const string caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(caracteres, longitud)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

}
