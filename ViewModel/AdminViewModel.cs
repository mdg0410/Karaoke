using Karaoke.Models;

namespace Karaoke.ViewModels
{
    public class AdminViewModel
    {
        public MesasViewModel Mesas { get; set; } = new(); // Initialize with an empty MesasViewModel
        public PedidosViewModel Pedidos { get; set; } = new(); // Initialize with an empty PedidosViewModel
        public CancionesViewModel Canciones { get; set; } = new(); // Initialize with an empty CancionesViewModel
        public UsuariosViewModel Usuarios { get; set; } = new(); // Initialize with an empty UsuariosViewModel
        public TotalesViewModel Totales { get; set; } = new(); // Initialize with an empty TotalViewModel
    }

    public class MesasViewModel
    {
        public List<Mesa> ListaMesas { get; set; } = new(); // Initialize with an empty list of Mesa
        public List<EstadosMesa> EstadosMesa { get; set; } = new(); // Initialize with an empty list of EstadosMesa
    }

    public class PedidosViewModel
    {
        public List<Pedido> ListaPedidos { get; set; } = new(); // Initialize with an empty list of Pedido
        public List<EstadosPedido> EstadosPedido { get; set; } = new(); // Initialize with an empty list of EstadosPedido
        public List<Producto> Productos { get; set; } = new(); // Initialize with an empty list of Producto
    }

    public class CancionesViewModel
    {
        public List<CancionesMesa> ListaCanciones { get; set; } = new(); // Initialize with an empty list of CancionesMesa
        public List<EstadosCancion> EstadosCancion { get; set; } = new(); // Initialize with an empty list of EstadosCancion
    }

    public class UsuariosViewModel
    {
        public List<Usuario> ListaUsuarios { get; set; } = new(); // Initialize with an empty list of Usuario
        public List<Role> Roles { get; set; } = new(); // Initialize with an empty list of Role
    }

    public class TotalesViewModel
    {
        public decimal TotalGeneral { get; set; }
    }


}