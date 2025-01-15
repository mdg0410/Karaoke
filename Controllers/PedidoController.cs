using System.Data;
using Karaoke.Data;
using Karaoke.ViewModels;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//using System;
//using System.Linq;
//using Karaoke.Models;
//using System.Threading.Tasks;
//using System.Collections.Generic;

namespace Karaoke.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PedidoController : Controller
    {
        private readonly KaraokeContext _context;

        public PedidoController(KaraokeContext context)
        {
            _context = context;
        }
     
        // Método para enviar el pedido. Parametros esperados: IdMesa, IdProducto, Cantidad, DetalleAdicional, Credencial
        // Salida: Mensaje de confirmación
        [HttpPost("EnviarPedido")]
        public async Task<IActionResult> EnviarPedido([FromBody] List<PedidoViewModel> carrito)
        {
            
            if (carrito == null || !carrito.Any())
            {
                return BadRequest("El carro de compras está vacío");
            }

            var codigoPedido = GenerarCodigoPedido(6);

            var certificados = carrito.Select(carrito => carrito.Credencial).ToList();
            var validarCertificado = await _context.Mesas.FirstOrDefaultAsync(m => certificados.Contains(m.Credencial));

            if (validarCertificado == null)
            {
                Console.WriteLine("Certificado no encontrado");
                return NotFound("Certificado no encontrado");
            }

                foreach (var producto in carrito)
                {
                    // Validar si el producto es una canción
                    // Si es una canción, se actualiza el estado especial de la canción a 2
                    if (producto.IdProducto == 23 && !string.IsNullOrEmpty(producto.DetalleAdicional))
                    {
                        var detalles = producto.DetalleAdicional.Split(',');
                        foreach (var item in detalles)
                        {
                            if (int.TryParse(item.Trim(), out int idCancionMesa))
                            {
                                var cancionMesa = await _context.CancionesMesas.FindAsync(idCancionMesa);
                                if (cancionMesa != null)
                                {
                                    cancionMesa.EstadoEspecial = 2;
                                    _context.CancionesMesas.Update(cancionMesa);
                                }
                            }
                        }
                        await _context.SaveChangesAsync();
                    }
                }


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
            Console.WriteLine("Pedido enviado correctamente");

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
