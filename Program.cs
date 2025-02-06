using Karaoke.Data;
using Karaoke.Hubs;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

// Context for the database

builder.Services.AddDbContext<KaraokeContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
    });


// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapHub<KaraokeHub>("/karaokeHub");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Ruta personalizada para el m�todo Validar
app.MapControllerRoute(
    name: "mesaValidar",
    pattern: "{controller=Mesa}/{action=Validar}/{idMesa?}");

app.MapControllerRoute(
    name: "pedidoEnviar",
    pattern: "{controller=Pedido}/{action=EnviarPedido}/{carrito?}");

app.MapControllerRoute(
    name: "enviarFormulario",
    pattern: "{controller=Karaoke}/{action=EnviarFormulario}/{data?}");

app.MapControllerRoute(
    name: "actualizarMesa",
    pattern: "{controller=Admin}/{action=ActualizarMesa}/{idMesa?}/{idEstadoMesa?}");

app.MapControllerRoute(
    name: "actualizarEstadoEspecial",
    pattern: "{controller=Admin}/{action=ActualizarEstadoEspecial}/{idMesa?}/{idEstadoMesa?}");

app.MapControllerRoute(
    name: "actualizarEstadoPedido",
    pattern: "{controller=Admin}/{action=ActualizarEstadoPedido}/{codigoPedido?}/{nuevoEstado?}");

//En construcci�n


app.MapControllerRoute(
    name: "cerrarMesa",
    pattern: "{controller=Admin}/{action=ActualizarEstadoEspecial}/{idMesa?}");

app.MapControllerRoute(
    name: "cerrarCancionesMesa",
    pattern: "{controller=Admin}/{action=ActualizarEstadoEspecial}/{idMesa?}");

app.MapControllerRoute(
    name: "actualizarEstadoMesa",
    pattern: "{controller=Admin}/{action=ActualizarEstadoMesa}/{idMesa?}/{idEstadoMesa?}");

//Fin de construcci�n

app.MapControllers();

app.Run();
