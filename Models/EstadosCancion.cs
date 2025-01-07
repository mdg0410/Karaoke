using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

[Table("EstadosCancion")]
public partial class EstadosCancion
{
    [Key]
    public int IdEstadoCancion { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string NombreEstado { get; set; } = null!;

    [InverseProperty("IdEstadoCancionNavigation")]
    public virtual ICollection<CancionesMesa> CancionesMesas { get; set; } = new List<CancionesMesa>();
}
