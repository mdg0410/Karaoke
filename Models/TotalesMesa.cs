using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("TotalesMesa")]
public partial class TotalesMesa
{
    [Key]
    public int IdTotalMesa { get; set; }

    public int IdMesa { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Total { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? Fecha { get; set; }

    [ForeignKey("IdMesa")]
    [InverseProperty("TotalesMesas")]
    public virtual Mesa IdMesaNavigation { get; set; } = null!;
}
