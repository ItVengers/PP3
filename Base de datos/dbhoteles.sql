-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-10-2021 a las 17:54:13
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.2.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbhoteles`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `pasajeros` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `descripcion`, `hotel_id`, `pasajeros`) VALUES
(1, 'Individual', 1, 1),
(2, 'Individual Suite', 1, 1),
(3, 'Dobles Junior Suite', 1, 2),
(4, 'Dobles Suite', 1, 2),
(7, 'Triples Junior Suite', 1, 3),
(8, 'Triples Suite', 1, 3),
(13, 'Cuadruples Junior Su', 1, 4),
(14, 'Cuadruples Suite', 1, 4),
(15, 'Quintuples Junior Su', 1, 5),
(16, 'Quintuples Suite', 1, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(2) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `descripcion`) VALUES
(1, 'Disponible'),
(2, 'No Disponible'),
(3, 'Finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `idHabitacion` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `estado` int(2) NOT NULL,
  `checkIn` date DEFAULT NULL,
  `checkOut` date DEFAULT NULL,
  `numeroHabitacion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`idHabitacion`, `cat_id`, `estado`, `checkIn`, `checkOut`, `numeroHabitacion`) VALUES
(11, 1, 1, NULL, NULL, 1),
(12, 2, 1, NULL, NULL, 2),
(13, 3, 1, NULL, NULL, 3),
(14, 3, 2, '2021-11-01', '2021-11-15', 4),
(15, 7, 1, NULL, NULL, 5),
(16, 7, 1, NULL, NULL, 10),
(17, 13, 2, '2021-12-10', '2021-12-23', 11),
(18, 13, 1, NULL, NULL, 12),
(19, 15, 1, NULL, NULL, 13),
(20, 15, 2, '2022-01-01', '2022-01-31', 14),
(21, 15, 1, NULL, NULL, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoteles`
--

CREATE TABLE `hoteles` (
  `idHotel` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `ubicacion` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `zona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `hoteles`
--

INSERT INTO `hoteles` (`idHotel`, `descripcion`, `ubicacion`, `zona_id`) VALUES
(1, 'Hotel Sur Centro', 'Juan Manuel de Rosas 625', 1),
(2, 'Hotel del Plata', 'Alberti 9', 6),
(3, 'Hotel Cordoba', 'Santa Rosa 447', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

CREATE TABLE `persona` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `dni` int(10) NOT NULL,
  `telefono` int(10) NOT NULL,
  `legajo` int(5) DEFAULT NULL,
  `rol` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `contrasenia` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `persona`
--

INSERT INTO `persona` (`idPersona`, `nombre`, `apellido`, `dni`, `telefono`, `legajo`, `rol`, `mail`, `contrasenia`) VALUES
(1, 'Emiliano', 'DeVuono', 37400650, 34216578, 1, 'admin', 'emi@devuono.com', 'Emiliano123'),
(2, 'Javier', 'Muratore', 27666389, 49210880, 1, 'user', 'javi@muratore', 'Javier123'),
(3, 'Pablo', 'Antepazo', 37400650, 1122334455, 0, 'user', 'pablo@antepazo.com', 'Pablo1234'),
(4, 'Mariano', 'Rosi', 12345678, 12345678, 0, 'user', 'mariano@rosi.com', 'Mariano123'),
(6, 'Gonzalo', 'Avalos', 42312451, 34343434, NULL, 'user', 'gonzalo@avalos.com', 'Gonzalo123'),
(7, 'Sandra', 'Rodriguez', 23232323, 12121212, NULL, 'user', 'sandra@rodriguez.com', 'Sandra123'),
(8, 'Diego', 'Pardo', 23232323, 34343434, NULL, 'user', 'diego@pardo.com', 'Diego123'),
(9, 'Marian', 'Marian', 33445566, 1122335566, NULL, 'user', 'marian@mail.com', 'Marian11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `idReserva` int(11) NOT NULL,
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `fechaReserva` datetime NOT NULL,
  `precioTotal` int(10) NOT NULL,
  `estado_id` int(1) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`idReserva`, `checkIn`, `checkOut`, `fechaReserva`, `precioTotal`, `estado_id`, `habitacion_id`, `persona_id`) VALUES
(1, '2021-02-01', '2021-02-20', '2020-12-25 00:00:00', 3800, 3, 11, 3),
(2, '2021-01-01', '2021-01-20', '2020-12-10 00:00:00', 7800, 3, 13, 6),
(3, '2021-03-01', '2021-03-20', '2021-02-01 00:00:00', 10800, 3, 16, 4),
(4, '2021-04-01', '2021-04-20', '2021-03-01 00:00:00', 15800, 3, 17, 3),
(5, '2021-05-01', '2021-05-20', '2021-04-01 00:00:00', 30200, 3, 20, 2),
(6, '2021-11-01', '2021-11-15', '2000-02-02 11:01:02', 6500, 2, 14, 9),
(7, '2022-01-01', '2022-01-31', '2021-10-01 00:00:00', 25000, 2, 20, 6),
(8, '2021-12-10', '2021-12-23', '2021-09-07 00:00:00', 10500, 2, 17, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

CREATE TABLE `tarifas` (
  `idTarifa` int(11) NOT NULL,
  `precio` int(10) NOT NULL,
  `temporada_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`idTarifa`, `precio`, `temporada_id`, `categoria_id`) VALUES
(1, 1350, 1, 1),
(2, 1750, 2, 1),
(3, 2430, 2, 2),
(4, 2650, 2, 7),
(5, 3200, 3, 7),
(6, 2750, 2, 3),
(7, 3700, 3, 3),
(8, 6000, 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporada`
--

CREATE TABLE `temporada` (
  `idTemporada` int(11) NOT NULL,
  `descripcion` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `zona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `temporada`
--

INSERT INTO `temporada` (`idTemporada`, `descripcion`, `fecha_desde`, `fecha_hasta`, `zona_id`) VALUES
(1, 'Baja', '1900-12-22', '1900-03-20', 1),
(2, 'Media', '1900-03-21', '1900-06-21', 1),
(3, 'Alta', '1900-06-22', '1900-12-21', 1),
(4, 'Baja', '1900-06-22', '1900-09-22', 5),
(5, 'Media', '1900-03-21', '1900-06-21', 5),
(6, 'Alta', '1900-09-23', '1900-03-20', 5),
(7, 'Baja', '1900-06-22', '1900-09-22', 6),
(8, 'Media', '1900-03-21', '1900-06-21', 6),
(9, 'Alta', '1900-09-23', '1900-03-20', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `idZona` int(11) NOT NULL,
  `descripcion` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`idZona`, `descripcion`) VALUES
(1, 'Patagonia'),
(2, 'Cuyo'),
(3, 'Norte'),
(4, 'Litoral'),
(5, 'Centro'),
(6, 'Buenos Aires');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `Fk_Habit` (`hotel_id`);

--
-- Indices de la tabla `estado`
--
ALTER TABLE `estado`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `Fk_CatHabit` (`cat_id`);

--
-- Indices de la tabla `hoteles`
--
ALTER TABLE `hoteles`
  ADD PRIMARY KEY (`idHotel`),
  ADD KEY `FK_IdZona` (`zona_id`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `fk_idEstado` (`estado_id`),
  ADD KEY `fk_idHabitacion` (`habitacion_id`),
  ADD KEY `fk_idCliente` (`persona_id`);

--
-- Indices de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD PRIMARY KEY (`idTarifa`),
  ADD KEY `fk_idcategoria` (`categoria_id`),
  ADD KEY `fk_idTemporada` (`temporada_id`);

--
-- Indices de la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD PRIMARY KEY (`idTemporada`),
  ADD KEY `fk_idzona` (`zona_id`);

--
-- Indices de la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`idZona`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `hoteles`
--
ALTER TABLE `hoteles`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `idTarifa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `temporada`
--
ALTER TABLE `temporada`
  MODIFY `idTemporada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `idZona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `FK_Hotel_Categoria` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`idHotel`);

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `FK_Habitacion_Categoria` FOREIGN KEY (`cat_id`) REFERENCES `categoria` (`idCategoria`);

--
-- Filtros para la tabla `hoteles`
--
ALTER TABLE `hoteles`
  ADD CONSTRAINT `FK_ZonaHotel` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_ClienteReserva` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`idPersona`),
  ADD CONSTRAINT `FK_EstadoReserva` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`idEstado`),
  ADD CONSTRAINT `FK_HabReservas` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`);

--
-- Filtros para la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD CONSTRAINT `FK_TarifaCat` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `FK_TempoTarifa` FOREIGN KEY (`temporada_id`) REFERENCES `temporada` (`idTemporada`);

--
-- Filtros para la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD CONSTRAINT `FK_ZonaTemp` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
