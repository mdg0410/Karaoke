using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

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
    public virtual EstadosPedido IdEstadoPedidoNavigation { get; set; } = null!;

    [ForeignKey("IdMesa")]
    [InverseProperty("Pedidos")]
    public virtual Mesa IdMesaNavigation { get; set; } = null!;

    [ForeignKey("IdProducto")]
    [InverseProperty("Pedidos")]
    public virtual Producto IdProductoNavigation { get; set; } = null!;

    [ForeignKey("IdTrabajador")]
    [InverseProperty("Pedidos")]
    public virtual Usuario? IdTrabajadorNavigation { get; set; }
}
