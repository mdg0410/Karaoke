using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("EstadosMesa")]
public partial class EstadosMesa
{
    [Key]
    public int IdEstadoMesa { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string NombreEstado { get; set; } = null!;

    [InverseProperty("IdEstadoMesaNavigation")]
    public virtual ICollection<Mesa> Mesas { get; set; } = new List<Mesa>();
}
