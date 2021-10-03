-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: remotemysql.com:3306
-- Tiempo de generación: 02-10-2021 a las 00:20:51
-- Versión del servidor: 8.0.13-4
-- Versión de PHP: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `868JNygZMY`
--
CREATE DATABASE IF NOT EXISTS `dbhoteles` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `dbhoteles`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `camas`
--

CREATE TABLE `camas` (
  `idCamas` int(2) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `camas`
--

INSERT INTO `camas` (`idCamas`, `descripcion`) VALUES
(1, '1 Individual'),
(2, '1 Doble'),
(3, '2 Individuales'),
(4, '1 Doble + 1 Individual'),
(5, '3 Individuales'),
(6, '1 Doble + 3 Individuales'),
(7, '2 Dobles'),
(8, '4 Individuales'),
(9, '1 Doble + 3 Individuales'),
(10, '2 Dobles + 1 Individual'),
(11, '5 Individuales');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `descripcion`, `tipo`, `hotel_id`) VALUES
(1, 'Individual', 'Individual', 1),
(2, 'Individual', 'Special', 1),
(3, 'Dobles', 'Suite', 1),
(4, 'Dobles', 'Junior Suite', 1),
(5, 'Dobles', 'Gran Suite', 1),
(6, 'Dobles', 'Special', 1),
(7, 'Triples', 'Suite', 1),
(8, 'Triples', 'Junior Suite', 1),
(9, 'Triples', 'Gran Suite', 1),
(10, 'Triples', 'Special', 1),
(13, 'Cuadruples', 'Suite', 1),
(14, 'Cuadruples', 'Special', 1),
(15, 'Quintuples', 'Suite', 1),
(16, 'Quintuples', 'Special', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `idHabitacion` int(11) NOT NULL,
  `cantPax` int(2) DEFAULT NULL,
  `cat_id` int(11) NOT NULL,
  `camas_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`idHabitacion`, `cantPax`, `cat_id`, `camas_id`) VALUES
(11, NULL, 1, 1),
(12, NULL, 2, 1),
(13, NULL, 3, 2),
(14, NULL, 3, 3),
(15, NULL, 7, 4),
(16, NULL, 7, 5),
(17, NULL, 13, 7),
(18, NULL, 13, 8),
(19, NULL, 15, 9),
(20, NULL, 15, 10),
(21, NULL, 15, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoteles`
--

CREATE TABLE `hoteles` (
  `idHotel` int(11) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `ubicacion` varchar(40) NOT NULL,
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
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `dni` int(10) NOT NULL,
  `telefono` int(10) NOT NULL,
  `legajo` int(5) DEFAULT NULL,
  `rol` varchar(10) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `contrasenia` varchar(32) NOT NULL
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
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `fechaReserva` datetime NOT NULL,
  `cantidadPax` int(5) NOT NULL,
  `precioTotal` int(10) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`idReserva`, `fechaDesde`, `fechaHasta`, `fechaReserva`, `cantidadPax`, `precioTotal`, `estado`, `habitacion_id`, `persona_id`) VALUES
(1, '2021-02-01', '2021-02-20', '2020-12-25 00:00:00', 1, 3800, 'Pendiente', 11, 3),
(2, '2021-01-01', '2021-01-20', '2020-12-10 00:00:00', 2, 7800, 'Aprobado', 13, 6),
(3, '2021-03-01', '2021-03-20', '2021-02-01 00:00:00', 3, 10800, 'Pendiente', 16, 4),
(4, '2021-04-01', '2021-04-20', '2021-03-01 00:00:00', 4, 15800, 'Aprobada', 17, 3),
(5, '2021-05-01', '2021-05-20', '2021-04-01 00:00:00', 5, 30200, 'Anulada', 20, 2);

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
  `descripcion` varchar(20) NOT NULL,
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
  `descripcion` varchar(20) NOT NULL
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
-- Indices de la tabla `camas`
--
ALTER TABLE `camas`
  ADD PRIMARY KEY (`idCamas`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `Fk_Habit` (`hotel_id`);

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `Fk_CatHabit` (`cat_id`),
  ADD KEY `FK_HabCam` (`camas_id`);

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
-- AUTO_INCREMENT de la tabla `camas`
--
ALTER TABLE `camas`
  MODIFY `idCamas` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  ADD CONSTRAINT `FK_Hotel_Categoria` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`idhotel`);

--
-- Filtros para la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `FK_HabCam` FOREIGN KEY (`camas_id`) REFERENCES `camas` (`idcamas`),
  ADD CONSTRAINT `FK_Habitacion_Categoria` FOREIGN KEY (`cat_id`) REFERENCES `categoria` (`idcategoria`);

--
-- Filtros para la tabla `hoteles`
--
ALTER TABLE `hoteles`
  ADD CONSTRAINT `FK_ZonaHotel` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_ClienteReserva` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`idpersona`),
  ADD CONSTRAINT `FK_HabiReservas` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idhabitacion`);

--
-- Filtros para la tabla `tarifas`
--
ALTER TABLE `tarifas`
  ADD CONSTRAINT `FK_TarifaCat` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`idcategoria`),
  ADD CONSTRAINT `FK_TempoTarifa` FOREIGN KEY (`temporada_id`) REFERENCES `temporada` (`idtemporada`);

--
-- Filtros para la tabla `temporada`
--
ALTER TABLE `temporada`
  ADD CONSTRAINT `FK_ZonaTemp` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
