using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("CancionesMesa")]
public partial class CancionesMesa
{
    [Key]
    public int IdCancionMesa { get; set; }

    public int IdMesa { get; set; }

    [Unicode(false)]
    public string Canciones { get; set; } = null!;

    public int IdEstadoCancion { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime FechaRegistro { get; set; }

    public int? EstadoEspecial { get; set; }

    [ForeignKey("IdEstadoCancion")]
    [InverseProperty("CancionesMesas")]
    public virtual EstadosCancion IdEstadoCancionNavigation { get; set; } = null!;

    [ForeignKey("IdMesa")]
    [InverseProperty("CancionesMesas")]
    public virtual Mesa IdMesaNavigation { get; set; } = null!;
}
