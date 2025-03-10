USE [master]
GO
/****** Object:  Database [KaraokeKaribu]    Script Date: 16/02/2025 14:00:37 ******/
CREATE DATABASE [KaraokeKaribu]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'KaraokeKaribu', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KaraokeKaribu.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'KaraokeKaribu_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\KaraokeKaribu_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [KaraokeKaribu] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [KaraokeKaribu].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [KaraokeKaribu] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET ARITHABORT OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [KaraokeKaribu] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [KaraokeKaribu] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET  ENABLE_BROKER 
GO
ALTER DATABASE [KaraokeKaribu] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [KaraokeKaribu] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET RECOVERY FULL 
GO
ALTER DATABASE [KaraokeKaribu] SET  MULTI_USER 
GO
ALTER DATABASE [KaraokeKaribu] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [KaraokeKaribu] SET DB_CHAINING OFF 
GO
ALTER DATABASE [KaraokeKaribu] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [KaraokeKaribu] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [KaraokeKaribu] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [KaraokeKaribu] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'KaraokeKaribu', N'ON'
GO
ALTER DATABASE [KaraokeKaribu] SET QUERY_STORE = ON
GO
ALTER DATABASE [KaraokeKaribu] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [KaraokeKaribu]
GO
/****** Object:  Table [dbo].[CancionesMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CancionesMesa](
	[IdCancionMesa] [int] IDENTITY(1,1) NOT NULL,
	[IdMesa] [int] NOT NULL,
	[Canciones] [varchar](max) NOT NULL,
	[IdEstadoCancion] [int] NOT NULL,
	[FechaRegistro] [datetime] NOT NULL,
	[EstadoEspecial] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCancionMesa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadosCancion]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadosCancion](
	[IdEstadoCancion] [int] IDENTITY(1,1) NOT NULL,
	[NombreEstado] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEstadoCancion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadosMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadosMesa](
	[IdEstadoMesa] [int] IDENTITY(1,1) NOT NULL,
	[NombreEstado] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEstadoMesa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EstadosPedido]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EstadosPedido](
	[IdEstadoPedido] [int] IDENTITY(1,1) NOT NULL,
	[NombreEstado] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEstadoPedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HistorialCierre]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialCierre](
	[IdCierre] [int] IDENTITY(1,1) NOT NULL,
	[FechaCierre] [datetime] NULL,
	[TotalGeneral] [decimal](10, 2) NOT NULL,
	[Comentarios] [varchar](255) NULL,
	[IdUsuario] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCierre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Mesas]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Mesas](
	[IdMesa] [int] IDENTITY(1,1) NOT NULL,
	[NumeroMesa] [int] NOT NULL,
	[Capacidad] [int] NOT NULL,
	[EstadoEspecial] [bit] NULL,
	[IdEstadoMesa] [int] NOT NULL,
	[FechaCreacion] [datetime] NULL,
	[Credencial] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdMesa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pedidos]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pedidos](
	[IdPedido] [int] IDENTITY(1,1) NOT NULL,
	[IdMesa] [int] NOT NULL,
	[IdProducto] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdEstadoPedido] [int] NOT NULL,
	[IdTrabajador] [int] NULL,
	[DetalleAdicional] [varchar](255) NULL,
	[Fecha] [datetime] NULL,
	[CodigoPedido] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPedido] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Productos]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Productos](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](255) NOT NULL,
	[Categoria] [varchar](50) NOT NULL,
	[Precio] [decimal](10, 2) NOT NULL,
	[ImagenURL] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Roles]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Roles](
	[IdRol] [int] IDENTITY(1,1) NOT NULL,
	[NombreRol] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TotalesMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TotalesMesa](
	[IdTotalMesa] [int] IDENTITY(1,1) NOT NULL,
	[IdMesa] [int] NOT NULL,
	[Total] [decimal](10, 2) NOT NULL,
	[Fecha] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[IdTotalMesa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuarios](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](100) NOT NULL,
	[IdRol] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[CancionesMesa] ADD  DEFAULT (getdate()) FOR [FechaRegistro]
GO
ALTER TABLE [dbo].[HistorialCierre] ADD  DEFAULT (getdate()) FOR [FechaCierre]
GO
ALTER TABLE [dbo].[Mesas] ADD  DEFAULT ((4)) FOR [Capacidad]
GO
ALTER TABLE [dbo].[Mesas] ADD  DEFAULT ((0)) FOR [EstadoEspecial]
GO
ALTER TABLE [dbo].[Mesas] ADD  DEFAULT (getdate()) FOR [FechaCreacion]
GO
ALTER TABLE [dbo].[Pedidos] ADD  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[Productos] ADD  DEFAULT (NULL) FOR [ImagenURL]
GO
ALTER TABLE [dbo].[TotalesMesa] ADD  DEFAULT (getdate()) FOR [Fecha]
GO
ALTER TABLE [dbo].[CancionesMesa]  WITH CHECK ADD FOREIGN KEY([IdEstadoCancion])
REFERENCES [dbo].[EstadosCancion] ([IdEstadoCancion])
GO
ALTER TABLE [dbo].[CancionesMesa]  WITH CHECK ADD FOREIGN KEY([IdMesa])
REFERENCES [dbo].[Mesas] ([IdMesa])
GO
ALTER TABLE [dbo].[HistorialCierre]  WITH CHECK ADD FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuarios] ([IdUsuario])
GO
ALTER TABLE [dbo].[Mesas]  WITH CHECK ADD FOREIGN KEY([IdEstadoMesa])
REFERENCES [dbo].[EstadosMesa] ([IdEstadoMesa])
GO
ALTER TABLE [dbo].[Pedidos]  WITH CHECK ADD FOREIGN KEY([IdEstadoPedido])
REFERENCES [dbo].[EstadosPedido] ([IdEstadoPedido])
GO
ALTER TABLE [dbo].[Pedidos]  WITH CHECK ADD FOREIGN KEY([IdMesa])
REFERENCES [dbo].[Mesas] ([IdMesa])
GO
ALTER TABLE [dbo].[Pedidos]  WITH CHECK ADD FOREIGN KEY([IdProducto])
REFERENCES [dbo].[Productos] ([IdProducto])
GO
ALTER TABLE [dbo].[Pedidos]  WITH CHECK ADD FOREIGN KEY([IdTrabajador])
REFERENCES [dbo].[Usuarios] ([IdUsuario])
GO
ALTER TABLE [dbo].[TotalesMesa]  WITH CHECK ADD FOREIGN KEY([IdMesa])
REFERENCES [dbo].[Mesas] ([IdMesa])
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD FOREIGN KEY([IdRol])
REFERENCES [dbo].[Roles] ([IdRol])
GO
/****** Object:  StoredProcedure [dbo].[ActualizarEstadoMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Actualizar el estado de una mesa
CREATE PROCEDURE [dbo].[ActualizarEstadoMesa]
    @IdMesa INT,
    @NuevoEstado INT
AS
BEGIN
    UPDATE Mesas
    SET IdEstadoMesa = @NuevoEstado
    WHERE IdMesa = @IdMesa;
END;

GO
/****** Object:  StoredProcedure [dbo].[ActualizarPedido]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Actualizar un pedido
CREATE PROCEDURE [dbo].[ActualizarPedido]
    @IdPedido INT,
    @IdUsuario INT,
    @IdEstadoPedido INT
AS
BEGIN
    DECLARE @IdRol INT;
    SELECT @IdRol = IdRol FROM Usuarios WHERE IdUsuario = @IdUsuario;

    IF @IdRol IN (1, 2)
    BEGIN
        UPDATE Pedidos
        SET IdEstadoPedido = @IdEstadoPedido
        WHERE IdPedido = @IdPedido;
    END
    ELSE
    BEGIN
        PRINT 'El usuario no tiene permisos para realizar esta operación.';
    END;
END;

GO
/****** Object:  StoredProcedure [dbo].[ActualizarRolUsuario]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Actualizar el rol de un usuario
CREATE PROCEDURE [dbo].[ActualizarRolUsuario]
    @IdUsuario INT,
    @NuevoRol INT
AS
BEGIN
    UPDATE Usuarios
    SET IdRol = @NuevoRol
    WHERE IdUsuario = @IdUsuario;
END;

GO
/****** Object:  StoredProcedure [dbo].[AgregarCancion]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AgregarCancion]
    @IdMesa INT,
    @Canciones VARCHAR(MAX)
AS
BEGIN
    DECLARE @EstadoEspecial BIT;
    SELECT @EstadoEspecial = EstadoEspecial FROM Mesas WHERE IdMesa = @IdMesa;

    
    BEGIN
        INSERT INTO CancionesMesa (IdMesa, Canciones, IdEstadoCancion, EstadoEspecial)
        VALUES (@IdMesa, @Canciones, 1, @EstadoEspecial );
    END
   
END;

GO
/****** Object:  StoredProcedure [dbo].[CambiarEstadoEspecialMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Cambiar el estado especial de una mesa
CREATE PROCEDURE [dbo].[CambiarEstadoEspecialMesa]
    @IdMesa INT,
    @NuevoEstadoEspecial BIT
AS
BEGIN
    UPDATE Mesas
    SET EstadoEspecial = @NuevoEstadoEspecial
    WHERE IdMesa = @IdMesa;
END;

GO
/****** Object:  StoredProcedure [dbo].[CerrarDia]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CerrarDia]
AS
BEGIN
    -- Guardar totales aplicando el cierre
    EXEC GuardarCierreTotales;

    -- Limpiar pedidos, canciones y restablecer mesas
    EXEC LimpiarMesasYCanciones;

    PRINT 'Cierre del día completado. Todos los datos han sido limpiados y las mesas restablecidas.';
END;

GO
/****** Object:  StoredProcedure [dbo].[ExtraerTotalMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Extraer el total de la mesa
CREATE PROCEDURE [dbo].[ExtraerTotalMesa]
    @IdMesa INT,
    @Total DECIMAL(10, 2) OUTPUT
AS
BEGIN
    -- Sumar el total de los pedidos según la mesa
    SELECT @Total = SUM(P.Cantidad * PR.Precio)
    FROM Pedidos P
    INNER JOIN Productos PR ON P.IdProducto = PR.IdProducto
    WHERE P.IdMesa = @IdMesa;

    -- Actualizar la tabla TotalesMesa con el nuevo total
    UPDATE TotalesMesa
    SET Total = Total + @Total
    WHERE IdMesa = @IdMesa;
    
    -- Verificar si se actualizó correctamente, si no, insertar un nuevo registro
    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO TotalesMesa (IdMesa, Total)
        VALUES (@IdMesa, @Total);
    END;

	-- Eliminar todos los pedidos asociados a la mesa
    DELETE FROM Pedidos
    WHERE IdMesa = @IdMesa;

    -- Eliminar las canciones asociadas a la mesa que tengan EstadoEspecial = 2 y Estado = 3
    DELETE FROM CancionesMesa
    WHERE IdMesa = @IdMesa AND IdEstadoCancion = 3;
END;
GO
/****** Object:  StoredProcedure [dbo].[GuardarCierreTotales]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GuardarCierreTotales]
    @IdUsuario INT
AS
BEGIN
    INSERT INTO HistorialCierre (FechaCierre, TotalGeneral, Comentarios, IdUsuario)
    SELECT GETDATE(), T.Total, 'Cierre automático', @IdUsuario
    FROM TotalesMesa T;

    -- Limpiar la tabla de totales después de guardar en el historial
    DELETE FROM TotalesMesa;
END;

GO
/****** Object:  StoredProcedure [dbo].[InsertarPedido]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[InsertarPedido] 
    @IdMesa INT, 
    @IdProducto INT, 
    @Cantidad INT, 
    @IdEstadoPedido INT, 
    @DetalleAdicional VARCHAR(255) = NULL, 
    @CodigoPedido VARCHAR(255) = NULL
AS 
BEGIN 
    INSERT INTO Pedidos (IdMesa, IdProducto, Cantidad, IdEstadoPedido, DetalleAdicional, CodigoPedido) 
    VALUES (@IdMesa, @IdProducto, @Cantidad, @IdEstadoPedido, @DetalleAdicional, @CodigoPedido); 
END;

GO
/****** Object:  StoredProcedure [dbo].[LimpiarMesasYCanciones]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LimpiarMesasYCanciones]
AS
BEGIN
    -- Eliminar pedidos
    DELETE FROM Pedidos;

    -- Eliminar canciones
    DELETE FROM CancionesMesa;

    -- Restablecer mesas al estado inicial
    UPDATE Mesas
    SET IdEstadoMesa = 1, EstadoEspecial = 0;
END;

GO
/****** Object:  StoredProcedure [dbo].[ListarCanciones]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Listar todas las canciones con ID único y mesa
CREATE PROCEDURE [dbo].[ListarCanciones]
AS
BEGIN
    SELECT CM.IdCancionMesa, CM.Canciones, M.NumeroMesa
    FROM CancionesMesa CM
    INNER JOIN Mesas M ON CM.IdMesa = M.IdMesa
    ORDER BY CM.FechaRegistro ASC;
END;

GO
/****** Object:  StoredProcedure [dbo].[ObtenerTotalSumado]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ObtenerTotalSumado]
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @TotalSumado INT;
    SELECT @TotalSumado = SUM(CAST(Total AS INT)) FROM TotalesMesa;
    RETURN @TotalSumado;
END;


GO
/****** Object:  StoredProcedure [dbo].[RegistrarMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Registrar una nueva mesa
CREATE PROCEDURE [dbo].[RegistrarMesa]
    @NumeroMesa INT,
    @Capacidad INT,
    @IdEstadoMesa INT
AS
BEGIN
    INSERT INTO Mesas (NumeroMesa, Capacidad, IdEstadoMesa)
    VALUES (@NumeroMesa, @Capacidad, @IdEstadoMesa);
END;

GO
/****** Object:  StoredProcedure [dbo].[RegistrarPedido]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Registrar un pedido
CREATE PROCEDURE [dbo].[RegistrarPedido]
    @IdMesa INT,
    @IdProducto INT,
    @Cantidad INT,
    @IdEstadoPedido INT,
    @DetalleAdicional VARCHAR(255),
    @CodigoPedido VARCHAR(255)
AS
BEGIN
    INSERT INTO Pedidos (IdMesa, IdProducto, Cantidad, IdEstadoPedido, DetalleAdicional, CodigoPedido)
    VALUES (@IdMesa, @IdProducto, @Cantidad, @IdEstadoPedido, @DetalleAdicional, @CodigoPedido);
END;

GO
/****** Object:  StoredProcedure [dbo].[RegistrarTotalMesa]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Procedimiento: Registrar el total de la mesa
CREATE PROCEDURE [dbo].[RegistrarTotalMesa]
    @IdMesa INT
AS
BEGIN
    DECLARE @Total DECIMAL(10, 2);
    SELECT @Total = SUM(P.Cantidad * PR.Precio)
    FROM Pedidos P
    INNER JOIN Productos PR ON P.IdProducto = PR.IdProducto
    WHERE P.IdMesa = @IdMesa AND P.IdEstadoPedido IN (1, 2);

    INSERT INTO TotalesMesa (IdMesa, Total)
    VALUES (@IdMesa, @Total);

    DELETE FROM Pedidos WHERE IdMesa = @IdMesa;
END;

GO
/****** Object:  StoredProcedure [dbo].[RegistrarUsuario]    Script Date: 16/02/2025 14:00:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Procedimiento: Registrar un nuevo usuario
CREATE PROCEDURE [dbo].[RegistrarUsuario]
    @Nombre VARCHAR(100),
    @IdRol INT
AS
BEGIN
    INSERT INTO Usuarios (Nombre, IdRol)
    VALUES (@Nombre, @IdRol);
END;

GO
USE [master]
GO
ALTER DATABASE [KaraokeKaribu] SET  READ_WRITE 
GO
