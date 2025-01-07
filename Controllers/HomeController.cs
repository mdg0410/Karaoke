using System.Diagnostics;
using Karaoke.Data;
using Karaoke.Models;
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
            var productos = _context.Productos.ToList(); // Supongamos que tienes una tabla llamada "Productos"
            return View(productos);
        }

        public IActionResult Karaoke()
        {
            return View();
        }

        public IActionResult Privacy()
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