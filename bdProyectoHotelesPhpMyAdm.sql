-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-05-2021 a las 17:37:05
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
-- Base de datos: `dbcadenahoteles`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `pNombre` VARCHAR(20), `pApellido` VARCHAR(20), `pDireccion` VARCHAR(20), `pTelefono` INT(10), `pLegajo` INT(5), `pRol` VARCHAR(10), `pMail` VARCHAR(50), `pContraseña` VARCHAR(32))  BEGIN
insert into tPersonal (nombre, apellido, direccion, telefono, legajo, rol) values (pNombre, pApellido, pDireccion, pTelefono, pLegajo, pRol);
insert into tUserInt (idUsersInt, mail, contraseña) values (last_insert_id(), pMail, pContraseña);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `registro` (IN `pNombre` VARCHAR(20), IN `pMail` VARCHAR(50), IN `pContraseña` VARCHAR(32), `pApellido` VARCHAR(20), `pDni` INT(10), `pDireccion` VARCHAR(15), `pTelefono` INT(10))  BEGIN
insert into tcliente (nombre,mail,contraseña) values (pNombre,pMail,pContraseña);
insert into tpersona (idPersona,apellido,dni,direccion,telefono) values (last_insert_id(),pApellido,pDni,pDireccion,pTelefono);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tcategoria`
--

CREATE TABLE `tcategoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tcliente`
--

CREATE TABLE `tcliente` (
  `idCliente` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `contraseña` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tcliente`
--

INSERT INTO `tcliente` (`idCliente`, `nombre`, `mail`, `contraseña`) VALUES
(1, 'pablo', 'pablo@pablito.com.ar', 'megustalajapi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thabitaciones`
--

CREATE TABLE `thabitaciones` (
  `idHabitacion` int(11) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `cantPax` int(5) DEFAULT NULL,
  `hotel_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `thoteles`
--

CREATE TABLE `thoteles` (
  `idHotel` int(11) NOT NULL,
  `descripcion` varchar(15) NOT NULL,
  `ubicacion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tpersona`
--

CREATE TABLE `tpersona` (
  `idPersona` int(11) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `dni` int(10) NOT NULL,
  `direccion` varchar(15) DEFAULT NULL,
  `telefono` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tpersona`
--

INSERT INTO `tpersona` (`idPersona`, `apellido`, `dni`, `direccion`, `telefono`) VALUES
(1, 'mosquera', 35222658, 'entre la cola', 1562452158);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tpersonal`
--

CREATE TABLE `tpersonal` (
  `idPersonal` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `direccion` varchar(20) DEFAULT NULL,
  `telefono` int(10) NOT NULL,
  `legajo` int(5) NOT NULL,
  `rol` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `treserva`
--

CREATE TABLE `treserva` (
  `idReserva` int(11) NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `cantidadPersonas` int(5) NOT NULL,
  `precioTotal` int(10) NOT NULL,
  `estado` varchar(10) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ttarifas`
--

CREATE TABLE `ttarifas` (
  `idTarifa` int(11) NOT NULL,
  `precio` int(10) NOT NULL,
  `hotel_id` int(11) NOT NULL,
  `temporada_id` int(11) NOT NULL,
  `habitacion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ttemporada`
--

CREATE TABLE `ttemporada` (
  `idTemporada` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tuserint`
--

CREATE TABLE `tuserint` (
  `idUsersInt` int(11) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `contraseña` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tcategoria`
--
ALTER TABLE `tcategoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `tcliente`
--
ALTER TABLE `tcliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indices de la tabla `thabitaciones`
--
ALTER TABLE `thabitaciones`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `Fk_CategHabit` (`idHabitacion`),
  ADD KEY `FK_Hotel_Habit` (`hotel_id`);

--
-- Indices de la tabla `thoteles`
--
ALTER TABLE `thoteles`
  ADD PRIMARY KEY (`idHotel`);

--
-- Indices de la tabla `tpersona`
--
ALTER TABLE `tpersona`
  ADD KEY `FK_IdCliente` (`idPersona`);

--
-- Indices de la tabla `tpersonal`
--
ALTER TABLE `tpersonal`
  ADD PRIMARY KEY (`idPersonal`);

--
-- Indices de la tabla `treserva`
--
ALTER TABLE `treserva`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `fk_idHabitacion` (`habitacion_id`),
  ADD KEY `fk_idCliente` (`cliente_id`);

--
-- Indices de la tabla `ttarifas`
--
ALTER TABLE `ttarifas`
  ADD PRIMARY KEY (`idTarifa`),
  ADD KEY `fk_idHotel` (`hotel_id`),
  ADD KEY `fk_idTemporada` (`temporada_id`),
  ADD KEY `fk_idHabitacion` (`habitacion_id`);

--
-- Indices de la tabla `ttemporada`
--
ALTER TABLE `ttemporada`
  ADD PRIMARY KEY (`idTemporada`);

--
-- Indices de la tabla `tuserint`
--
ALTER TABLE `tuserint`
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `Fk_idPersonal` (`idUsersInt`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tcategoria`
--
ALTER TABLE `tcategoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tcliente`
--
ALTER TABLE `tcliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `thabitaciones`
--
ALTER TABLE `thabitaciones`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `thoteles`
--
ALTER TABLE `thoteles`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tpersonal`
--
ALTER TABLE `tpersonal`
  MODIFY `idPersonal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `treserva`
--
ALTER TABLE `treserva`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ttarifas`
--
ALTER TABLE `ttarifas`
  MODIFY `idTarifa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ttemporada`
--
ALTER TABLE `ttemporada`
  MODIFY `idTemporada` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `thabitaciones`
--
ALTER TABLE `thabitaciones`
  ADD CONSTRAINT `FK_Habitacion_Categoria` FOREIGN KEY (`idHabitacion`) REFERENCES `tcategoria` (`idCategoria`),
  ADD CONSTRAINT `FK_Hotel_Habit` FOREIGN KEY (`hotel_id`) REFERENCES `thoteles` (`idHotel`);

--
-- Filtros para la tabla `tpersona`
--
ALTER TABLE `tpersona`
  ADD CONSTRAINT `FK_ClientePersona` FOREIGN KEY (`idPersona`) REFERENCES `tcliente` (`idCliente`);

--
-- Filtros para la tabla `treserva`
--
ALTER TABLE `treserva`
  ADD CONSTRAINT `FK_ClienteReserva` FOREIGN KEY (`cliente_id`) REFERENCES `tcliente` (`idCliente`),
  ADD CONSTRAINT `FK_HabitReserva` FOREIGN KEY (`habitacion_id`) REFERENCES `thabitaciones` (`idHabitacion`);

--
-- Filtros para la tabla `ttarifas`
--
ALTER TABLE `ttarifas`
  ADD CONSTRAINT `FK_HabitTarifa` FOREIGN KEY (`habitacion_id`) REFERENCES `thabitaciones` (`idHabitacion`),
  ADD CONSTRAINT `FK_HotelTarifa` FOREIGN KEY (`hotel_id`) REFERENCES `thoteles` (`idHotel`),
  ADD CONSTRAINT `FK_TempoTarifa` FOREIGN KEY (`temporada_id`) REFERENCES `ttemporada` (`idTemporada`);

--
-- Filtros para la tabla `tuserint`
--
ALTER TABLE `tuserint`
  ADD CONSTRAINT `FK_UsuarioInt_Personal` FOREIGN KEY (`idUsersInt`) REFERENCES `tpersonal` (`idPersonal`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
