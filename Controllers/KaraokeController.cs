using System.Diagnostics;
using Karaoke.Data;
using Karaoke.Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

public class KaraokeController : Controller
{
    // Acción para mostrar el formulario
    public IActionResult Index()
    {
        return View();
    }

    // Acción para procesar el formulario
    [HttpPost]
    public IActionResult EnviarFormulario(string datos)
    {
        // Validar formato con regex (1-9999 en grupos separados por '-')
        string pattern = @"^([1-9][0-9]{0,3})-([1-9][0-9]{0,3})-([1-9][0-9]{0,3})$";
        if (!Regex.IsMatch(datos, pattern))
        {
            ViewBag.Error = "El formato de los datos es incorrecto. Use el formato: 123-456-789 (solo números del 1 al 9999).";
            return View("Index");
        }

        // Procesar datos (puedes enviar a la DB o cualquier otra lógica)
        ViewBag.Success = "Datos enviados correctamente.";
        return View("Index");
    }
}
