using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

public partial class Mesa
{
    [Key]
    public int IdMesa { get; set; }

    public int NumeroMesa { get; set; }

    public int Capacidad { get; set; }

    public bool? EstadoEspecial { get; set; }

    public int IdEstadoMesa { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaCreacion { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Credencial { get; set; }

    [InverseProperty("IdMesaNavigation")]
    public virtual ICollection<CancionesMesa> CancionesMesas { get; set; } = new List<CancionesMesa>();

    [ForeignKey("IdEstadoMesa")]
    [InverseProperty("Mesas")]
    public virtual EstadosMesa IdEstadoMesaNavigation { get; set; } = null!;

    [InverseProperty("IdMesaNavigation")]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();

    [InverseProperty("IdMesaNavigation")]
    public virtual ICollection<TotalesMesa> TotalesMesas { get; set; } = new List<TotalesMesa>();
}
