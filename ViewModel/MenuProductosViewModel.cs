using Karaoke.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Karaoke.ViewModels
{
    public class MenuProductosViewModel
    {
        public List<Producto> Productos { get; set; } = new List<Producto>();
        public List<Pedido> Pedidos { get; set; } = new List<Pedido>();
    }
}


