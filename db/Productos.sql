-- Crear la tabla de Productos
CREATE TABLE Productos (
    IdProducto INT PRIMARY KEY IDENTITY(1,1),    -- Identificador �nico del producto
    Nombre VARCHAR(255) NOT NULL,                  -- Nombre del producto
    Categoria VARCHAR(50) NOT NULL,                -- Categor�a del producto
    Precio DECIMAL(10, 2) NOT NULL                 -- Precio del producto
);

INSERT INTO Productos (Nombre, Categoria, Precio) VALUES
('Combo C�cteles (3 por $10)', 'Combo', 10.00),
('Combo Jarra (1x$15 - 2x$20)', 'Combo', 20.00),
('Michelada', 'C�ctel', 5.00),
('Jarra (1x$15)', 'C�ctel', 15.00),
('Margarita', 'C�ctel', 6.00),
('Mojito', 'C�ctel', 5.00),
('C�ctel Laguna Azul', 'C�ctel', 4.00),
('C�ctel Sexo en la Playa', 'C�ctel', 4.00),
('C�ctel Padrino', 'C�ctel', 5.00),
('C�ctel Pi�a Colada', 'C�ctel', 5.00),
('Salchi/Papicarne', 'Comida', 3.00),
('Nachos Queso/Carne', 'Comida', 5.00),
('Pilsener', 'Cerveza', 8.00),
('Club', 'Cerveza', 9.00),
('Heineken', 'Cerveza', 10.00),
('Ron Abuelo', 'Botella', 20.00),
('Antioque�o', 'Botella', 25.00),
('Whisky Old Times', 'Botella', 30.00),
('Ron Bacardi', 'Botella', 40.00),
('Tequila Charro', 'Botella', 40.00),
('Jhonnie Rojo', 'Botella', 40.00),
('Jagermeister', 'Botella', 50.00);