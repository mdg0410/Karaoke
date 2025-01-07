using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("HistorialCierre")]
public partial class HistorialCierre
{
    [Key]
    public int IdCierre { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FechaCierre { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal TotalGeneral { get; set; }

    [StringLength(255)]
    [Unicode(false)]
    public string? Comentarios { get; set; }

    public int IdUsuario { get; set; }

    [ForeignKey("IdUsuario")]
    [InverseProperty("HistorialCierres")]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
