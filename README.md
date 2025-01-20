<a name="readme-top"></a>

<div align="center">
  <h3><b>Sistema de Gestión de Restaurante/Bar/Karaoke</b></h3>
</div>

# 📗 Table of Contents

- [📖 About the Project](#about-project)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [🚀 Live Demo](#live-demo)
- [💻 Getting Started](#getting-started)
  - [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Usage](#usage)
  - [Run tests](#run-tests)
  - [Deployment](#triangular_flag_on_post-deployment)
- [👥 Authors](#authors)
- [🔭 Future Features](#future-features)
- [🤝 Contributing](#contributing)
- [⭐️ Show your support](#support)
- [🙏 Acknowledgements](#acknowledgements)
- [📝 License](#license)

# 📖 Sistema de Gestión de Restaurante/Bar/Karaoke <a name="about-project"></a>

Este proyecto es un sistema integral diseñado para la gestión eficiente de mesas, pedidos y consumos en un ambiente como un restaurante, bar o karaoke.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

-   [**ASP.NET Core MVC**](https://dotnet.microsoft.com/en-us/apps/aspnet)
-   [**Entity Framework**](https://docs.microsoft.com/en-us/ef/)
-   [**Bootstrap**](https://getbootstrap.com/)
-   [**JavaScript**](https://www.javascript.com/)
-   [**SQL Server**](https://www.microsoft.com/en-us/sql-server) (o tu base de datos de preferencia)
-   [**Razor Pages**](https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-7.0&tabs=visual-studio)
-   [**CSHTML**](https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-7.0)

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://getbootstrap.com/">Bootstrap</a></li>
    <li><a href="https://www.javascript.com/">JavaScript</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://dotnet.microsoft.com/en-us/apps/aspnet">ASP.NET Core MVC</a></li>
    <li><a href="https://docs.microsoft.com/en-us/ef/">Entity Framework</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.microsoft.com/en-us/sql-server">SQL Server</a></li>
  </ul>
</details>

### Key Features <a name="key-features"></a>

-   **Gestión de Mesas:** 
    - Control de estado de mesas (Activa, Inactiva, Pendiente).
    - Capacidad personalizable por mesa.
    - Cierre de mesa con registro de total acumulado.
-   **Gestión de Pedidos:** 
    - Registro de consumos con detalles del producto, cantidad, estado y notas.
    - Precios fijos con flexibilidad para promociones y descuentos.
    - Control de pedidos por estados (Pendiente, Servido, Cancelado).
-   **Productos y Categorías:** 
    - Base de datos predefinida con productos en categorías (Cócteles, Botellas, Comida, Cervezas).
    - Identificación única de productos para un procesamiento eficiente.
    -  Flexibilidad para agregar o modificar productos.
-   **Funcionalidades Específicas:** 
    - Cálculo del total general por mesa, considerando estados especiales.
    - Reporte detallado de totales y consumo por mesa.
-   **Cancionero Interactivo:** 
    - Visualización del QR para acceder al cancionero digital.
    - Botón de descarga del cancionero en PDF desde Google Drive.
-   **Configuración y Personalización:** 
    - Vistas personalizadas con Razor Pages y CSHTML.
    - Integración con Google Drive para compartir archivos.
    -  Mesas, productos y usuarios predefinidos para una fácil implementación.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Live Demo <a name="live-demo"></a>

- **[Agregar enlace a demo en vivo si está disponible]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

### Prerequisites

-   IDE (Visual Studio, VS Code)
-   .NET SDK
-   Git
-   SQL Server (o tu base de datos de preferencia)
-   Cuenta de Google Drive (para el cancionero)

### Setup

1.  Clonar el repositorio: `git clone https://github.com/mdg0410/Karaoke.git`
2.  Configurar la conexión a la base de datos en `appsettings.json`.
3.  Configurar la integración con Google Drive.
4.  Asegurarse de que la base de datos tenga las tablas y procedimientos almacenados necesarios.

### Install

1.  Restaurar los paquetes NuGet: `dotnet restore`
2.  Ejecutar las migraciones de Entity Framework: `dotnet ef database update`

### Usage

1.  Iniciar la aplicación: `dotnet run`

### Run tests

-   **[Describe cómo ejecutar las pruebas, si las hay]**

### Deployment

-   Puedes desplegar la aplicación en un servidor web compatible con ASP.NET Core.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Authors <a name="authors"></a>

-   👤 **mdg0410**

-   GitHub: [@mdg0410](https://github.com/mdg0410/)
-   Twitter: [@StevenLevoyer](https://twitter.com/StevenLevoyer)
-   LinkedIn: [Richard Steven Levoyer Chavez](https://www.linkedin.com/in/richard-steven-levoyer-chavez-9b902525b/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

-   [ ] **[Agregar funcionalidades futuras, Aprender de pruebas unitarias en ASP.Net y agregar las Pruebas Unitarias]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Se aceptan contribuciones. Por favor, crea un fork del repositorio y envía un pull request con tus cambios.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

Si te gusta este proyecto, ¡dale una estrella en GitHub!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🙏 Acknowledgements <a name="acknowledgements"></a>

-   **[Agradecimientos a personas o recursos que te hayan ayudado]**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📝 License <a name="license"></a>

-   This project is [MIT](https://github.com/mdg0410/Karaoke/blob/master/LICENSE.txt) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>