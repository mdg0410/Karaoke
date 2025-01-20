    using System.Diagnostics;
    using Karaoke.Data;
    using Karaoke.Models;
    using Karaoke.ViewModels;
    using Microsoft.AspNetCore.Mvc;

namespace Karaoke.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly KaraokeContext _context;

        public HomeController(ILogger<HomeController> logger, KaraokeContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult MenuProductos()
        {
            var productos = _context.Productos.ToList();
            var pedidos = _context.Pedidos.ToList();

            var viewModel = new MenuProductosViewModel
            {
                Productos = productos,
                Pedidos = pedidos
            };  

            return View(viewModel);
        }

        public IActionResult Cancionero()
        {
            return View();
        }

       public IActionResult Karaoke()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
