using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("EstadosPedido")]
public partial class EstadosPedido
{
    [Key]
    public int IdEstadoPedido { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string NombreEstado { get; set; } = null!;

    [InverseProperty("IdEstadoPedidoNavigation")]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
