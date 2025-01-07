using System;
using System.Collections.Generic;
using Karaoke.Models;
using Microsoft.EntityFrameworkCore;

namespace Karaoke.Data;

public partial class KaraokeContext : DbContext
{
    public KaraokeContext()
    {
    }

    public KaraokeContext(DbContextOptions<KaraokeContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CancionesMesa> CancionesMesas { get; set; }

    public virtual DbSet<EstadosCancion> EstadosCancions { get; set; }

    public virtual DbSet<EstadosMesa> EstadosMesas { get; set; }

    public virtual DbSet<EstadosPedido> EstadosPedidos { get; set; }

    public virtual DbSet<HistorialCierre> HistorialCierres { get; set; }

    public virtual DbSet<Mesa> Mesas { get; set; }

    public virtual DbSet<Pedido> Pedidos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<TotalesMesa> TotalesMesas { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-2FRCDQT;Database=KaraokeKaribu;Trusted_Connection=True;Encrypt=False;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CancionesMesa>(entity =>
        {
            entity.HasKey(e => e.IdCancionMesa).HasName("PK__Cancione__0F514985FBE18201");

            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdEstadoCancionNavigation).WithMany(p => p.CancionesMesas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Canciones__IdEst__59FA5E80");

            entity.HasOne(d => d.IdMesaNavigation).WithMany(p => p.CancionesMesas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Canciones__IdMes__59063A47");
        });

        modelBuilder.Entity<EstadosCancion>(entity =>
        {
            entity.HasKey(e => e.IdEstadoCancion).HasName("PK__EstadosC__7D855CA80C16507A");
        });

        modelBuilder.Entity<EstadosMesa>(entity =>
        {
            entity.HasKey(e => e.IdEstadoMesa).HasName("PK__EstadosM__4952840417225B63");
        });

        modelBuilder.Entity<EstadosPedido>(entity =>
        {
            entity.HasKey(e => e.IdEstadoPedido).HasName("PK__EstadosP__86B983719885AED3");
        });

        modelBuilder.Entity<HistorialCierre>(entity =>
        {
            entity.HasKey(e => e.IdCierre).HasName("PK__Historia__7BB331EFADE88B9A");

            entity.Property(e => e.FechaCierre).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.HistorialCierres)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Historial__IdUsu__534D60F1");
        });

        modelBuilder.Entity<Mesa>(entity =>
        {
            entity.HasKey(e => e.IdMesa).HasName("PK__Mesas__4D7E81B1308C648B");

            entity.Property(e => e.Capacidad).HasDefaultValue(4);
            entity.Property(e => e.EstadoEspecial).HasDefaultValue(false);
            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdEstadoMesaNavigation).WithMany(p => p.Mesas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Mesas__IdEstadoM__412EB0B6");
        });

        modelBuilder.Entity<Pedido>(entity =>
        {
            entity.HasKey(e => e.IdPedido).HasName("PK__Pedidos__9D335DC3A6420D81");

            entity.Property(e => e.Fecha).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdEstadoPedidoNavigation).WithMany(p => p.Pedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pedidos__IdEstad__4AB81AF0");

            entity.HasOne(d => d.IdMesaNavigation).WithMany(p => p.Pedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pedidos__IdMesa__48CFD27E");

            entity.HasOne(d => d.IdProductoNavigation).WithMany(p => p.Pedidos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Pedidos__IdProdu__49C3F6B7");

            entity.HasOne(d => d.IdTrabajadorNavigation).WithMany(p => p.Pedidos).HasConstraintName("FK__Pedidos__IdTraba__4BAC3F29");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.IdProducto).HasName("PK__Producto__09889210C8840A6F");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PK__Roles__2A49584C2FA15293");
        });

        modelBuilder.Entity<TotalesMesa>(entity =>
        {
            entity.HasKey(e => e.IdTotalMesa).HasName("PK__TotalesM__F917368D67DDCA17");

            entity.Property(e => e.Fecha).HasDefaultValueSql("(getdate())");

            entity.HasOne(d => d.IdMesaNavigation).WithMany(p => p.TotalesMesas)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__TotalesMe__IdMes__4F7CD00D");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuarios__5B65BF97FBED1D85");

            entity.HasOne(d => d.IdRolNavigation).WithMany(p => p.Usuarios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Usuarios__IdRol__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
