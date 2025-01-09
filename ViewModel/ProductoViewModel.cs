using Microsoft.AspNetCore.Mvc;

namespace Karaoke.ViewModels
{
    public class ProductoViewModel
    {
        public int IdMesa { get; set; }
        public int IdProducto { get; set; }
        public int Cantidad { get; set; }
        public string? DetalleAdicional { get; set; }
    }
}
