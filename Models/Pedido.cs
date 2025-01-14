using Karaoke.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public partial class Pedido
{
    [Key]
    public int IdPedido { get; set; }

    public int IdMesa { get; set; }

    public int IdProducto { get; set; }

    public int Cantidad { get; set; }

    public int IdEstadoPedido { get; set; }

    public int? IdTrabajador { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? DetalleAdicional { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? CodigoPedido { get; set; }

    [ForeignKey("IdEstadoPedido")]
    [InverseProperty("Pedidos")]
    public virtual EstadosPedido? IdEstadoPedidoNavigation { get; set; }

    [ForeignKey("IdMesa")]
    [InverseProperty("Pedidos")]
    public virtual Mesa? IdMesaNavigation { get; set; }

    [ForeignKey("IdProducto")]
    [InverseProperty("Pedidos")]
    public virtual Producto? IdProductoNavigation { get; set; }

    [ForeignKey("IdTrabajador")]
    [InverseProperty("Pedidos")]
    public virtual Usuario? IdTrabajadorNavigation { get; set; }
}
