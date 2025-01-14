using Microsoft.AspNetCore.Mvc;

namespace Karaoke.ViewModels
{
    public class PedidoViewModel
    {
        public int IdMesa { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public string? DetalleAdicional { get; set; }
        public string? Credencial { get; set; }

    }
}
