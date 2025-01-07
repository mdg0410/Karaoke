using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Models;

public partial class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    public int IdRol { get; set; }

    [InverseProperty("IdUsuarioNavigation")]
    public virtual ICollection<HistorialCierre> HistorialCierres { get; set; } = new List<HistorialCierre>();

    [ForeignKey("IdRol")]
    [InverseProperty("Usuarios")]
    public virtual Role IdRolNavigation { get; set; } = null!;

    [InverseProperty("IdTrabajadorNavigation")]
    public virtual ICollection<Pedido> Pedidos { get; set; } = new List<Pedido>();
}
