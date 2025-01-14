using Microsoft.AspNetCore.Mvc;

namespace Karaoke.ViewModels
{
    public class CancionViewModel
    {
        public int IdMesa { get; set; }
        public required string Canciones { get; set; }
      
    }
}
