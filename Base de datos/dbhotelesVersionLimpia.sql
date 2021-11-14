-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-11-2021 a las 21:09:12
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

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarCategoria` (IN `pDescripcion` VARCHAR(50), IN `pHotelId` INT(11), IN `pPasajeros` INT(1))  BEGIN
     
 insert into categoria (descripcion, hotel_id, pasajeros) 
 values (pDescripcion,pHotelId, pPasajeros);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarHabitacion` (IN `pCat_id` INT(1), IN `pEstado` INT(2), IN `pNumeroHabitacion` INT(10))  BEGIN
     
 insert into habitaciones (cat_id, estado, numeroHabitacion) 
 values (pCat_id, pEstado, pNumeroHabitacion);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarHotel` (IN `pDescripcion` VARCHAR(50), IN `pUbicacion` VARCHAR(40), IN `pZona_id` INT(11))  BEGIN
     
 insert into hoteles (descripcion, ubicacion , zona_id) 
 values (pDescripcion,pUbicacion, pZona_id);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarPersona` (IN `pNombre` VARCHAR(20), IN `pApellido` VARCHAR(20), IN `pDni` INT(10), IN `pTelefono` INT(10), IN `pLegajo` INT(5), IN `pRol` VARCHAR(10), IN `pMail` VARCHAR(50), IN `pContrasenia` VARCHAR(32))  BEGIN
     
 insert into persona (nombre,apellido,dni,telefono,legajo,rol,mail,contrasenia) 
values (pNombre,pApellido,pDni,pTelefono,pLegajo,pRol,pMail,pContrasenia);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarReserva` (IN `pCheckIn` DATE, IN `pCheckOut` DATE, IN `pFechaReserva` DATETIME, IN `pPrecioTotal` FLOAT(10), IN `PEstado_id` INT(1), IN `pHabitacion_id` INT(11), IN `pPersona_id` INT(11))  BEGIN
     
 insert into reservas (checkIn,checkOut,fechaReserva,precioTotal,estado_id,habitacion_id,persona_id) 
 values ( pCheckIn, pCheckOut, pFechaReserva, pPrecioTotal, PEstado_id, pHabitacion_id , pPersona_id );

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `AgregarTarifa` (IN `pPrecio` FLOAT(10), IN `pTemporada_id` INT(11), IN `pCategoria_id` INT(11))  BEGIN
     
 insert into tarifas (precio,temporada_id,categoria_id) 
 values (pPrecio,pTemporada_id, pCategoria_id);

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarCategoria` (IN `pIdCategoria` INT(11))  BEGIN

DELETE FROM categoria
WHERE idCategoria = pIdCategoria;     

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarHabitacion` (IN `pIdHabitacion` INT(11))  BEGIN

DELETE FROM habitaciones
WHERE idHabitacion = pIdHabitacion;     

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarHotel` (IN `pIdHotel` INT(11))  BEGIN

DELETE FROM hoteles
WHERE idHotel = pIdHotel;     

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarPersona` (IN `pIdPersona` INT(11))  BEGIN

DELETE FROM persona
WHERE idPersona = pIdPersona;     

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BorrarTarifa` (IN `pIdTarifa` INT(11))  BEGIN

DELETE FROM tarifas
WHERE idTarifa = pIdTarifa;     

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `BusquedaHabitacionesDisponibles` (IN `pPersona` INT(1), IN `pCheckIn` VARCHAR(20), IN `pCheckOut` VARCHAR(20))  BEGIN
     
    select h.idHabitacion, h.checkIn, h.checkOut, h.estado, c.descripcion, t.precio 
from habitaciones h
            inner join categoria c on c.idCategoria = h.cat_id
            inner join tarifas t on t.categoria_id = c.idCategoria
where h.idHabitacion not in (
	select r.habitacion_id
from reservas r 
            inner join estado e on e.idEstado = r.estado_id 
where ((r.checkIn <= pCheckIn and r.checkOut > pCheckIn) or 
                (r.checkIn <= pCheckOut and r.checkOut > pCheckOut)) and e.codigo = 'PEN'
    )
 and c.pasajeros = pPersona;
      

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `CancelarReserva` (IN `pIdReserva` INT(11))  BEGIN
 

update reservas set estado_id = 5 where idReserva = pIdReserva;  

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultaDiasReserva` (IN `pIdReserva` INT(11), IN `pCheckIn` DATE, IN `pCheckOut` DATE)  BEGIN
     
 select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(pCheckOut,pCheckIn ) as 'Total' from reservas where idReserva= pIdReserva;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ConsultaDiasTodasLasReserva` (IN `pIdReserva` INT(11), IN `pCheckIn` DATE, IN `pCheckOut` DATE)  BEGIN
     
 select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(pCheckOut,pCheckIn ) as 'Total' from reservas;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarCategoria` (IN `pIdCategoria` INT(11), IN `pDescripcion` VARCHAR(50), IN `pHotelId` INT(11), IN `pPasajeros` INT(1))  BEGIN

UPDATE categoria SET 
descripcion = pDescripcion,
hotel_id = pHotelId,
pasajeros = pPasajeros
WHERE idCategoria = pIdCategoria;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarHabitacion` (IN `pIdHabitacion` INT(11), IN `pCat_id` INT(1), IN `pEstado` INT(2), `pCheckIn` DATE, `pCheckOut` DATE, IN `pNumeroHabitacion` INT(10))  BEGIN

UPDATE habitaciones SET 
cat_id = pCat_id,
estado = pEstado,
checkIn = pCheckIn,
checkOut = pCheckOut,
numeroHabitacion = pNumeroHabitacion
WHERE idHabitacion = pIdHabitacion;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarHotel` (IN `pIdHotel` INT(11), IN `pDescripcion` VARCHAR(50), IN `pUbicacion` VARCHAR(40), IN `pZona_id` INT(11))  BEGIN

UPDATE hoteles SET 
descripcion = pDescripcion,
ubicacion = pUbicacion,
zona_id = pZona_id 
WHERE idHotel = pIdHotel;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarPersona` (IN `pIdPersona` INT(11), IN `pNombre` VARCHAR(20), IN `pApellido` VARCHAR(20), IN `pDni` INT(10), IN `pTelefono` INT(10), IN `pLegajo` INT(5), IN `pRol` VARCHAR(10), IN `pMail` VARCHAR(50), IN `pContrasenia` VARCHAR(32))  BEGIN

UPDATE persona SET 

nombre = pNombre,
apellido = pApellido,
dni = pDni,
telefono = pTelefono,
legajo = pLegajo,
rol = pRol,
mail = pMail,
contrasenia = pContrasenia
WHERE idPersona = pIdPersona;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarReserva` (IN `pIdReserva` INT(11), IN `pCheckIn` DATE, IN `pCheckOut` DATE, IN `pFechaReserva` DATETIME, IN `pPrecioTotal` FLOAT(10), IN `PEstado_id` INT(1), IN `pHabitacion_id` INT(11), IN `pPersona_id` INT(11))  BEGIN

UPDATE reservas SET 
checkIn = pCheckIn,
checkOut = pCheckOut,
fechaReserva = pFechaReserva,
precioTotal = pPrecioTotal,
estado_id = PEstado_id,
habitacion_id = pHabitacion_id,
persona_id = pPersona_id

WHERE idReserva = pIdReserva;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ModificarTarifa` (IN `pIdTarifa` INT(11), IN `pPrecio` FLOAT(10), IN `pTemporada_id` INT(11), IN `pCategoria_id` INT(11))  BEGIN

UPDATE tarifas SET 
precio = pPrecio,
temporada_id = pTemporada_id,
categoria_id = pCategoria_id
WHERE idTarifa = pIdTarifa;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `PendienteReserva` (IN `pIdReserva` INT(11))  BEGIN
 

update reservas set estado_id = 4 where idReserva = pIdReserva;  

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
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
(5, 'Triples Junior Suite', 1, 3),
(6, 'Triples Suite', 1, 3),
(7, 'Cuadruples Junior Suite', 1, 4),
(8, 'Cuadruples Suite', 1, 4),
(9, 'Quinduples Junior Suite', 1, 5),
(10, 'Quintuples Suite', 1, 5),
(11, 'Individual', 2, 1),
(12, 'Individual Suite', 2, 1),
(13, 'Dobles Junior Suite', 2, 2),
(14, 'Dobles Suite', 2, 2),
(15, 'Triples Junior Suite', 2, 3),
(16, 'Triples Suite', 2, 3),
(17, 'Cuadruples Junior Suite', 2, 4),
(18, 'Cuadruples Suite', 2, 4),
(19, 'Quintuples Junior Suite', 2, 5),
(20, 'Quintuples Suite', 2, 5),
(21, 'Individual', 3, 1),
(22, 'Individual Suite', 3, 1),
(23, 'Dobles Junior Suite', 3, 2),
(24, 'Dobles Suite', 3, 2),
(25, 'Triples Junior Suite', 3, 3),
(26, 'Triples Suite', 3, 3),
(27, 'Cuadruples Junior Suite', 3, 4),
(28, 'Cuadruples Suite', 3, 4),
(29, 'Quintuples Junior Suite', 3, 5),
(30, 'Quintuples Suite', 3, 5),
(31, 'Individual', 4, 1),
(32, 'Individual Suite', 4, 1),
(33, 'Dobles Junior Suite', 4, 2),
(34, 'Dobles Suite', 4, 2),
(35, 'Triples Junior Suite', 4, 3),
(36, 'Triples Suite', 4, 3),
(37, 'Cuadruples Junior Suite', 4, 4),
(38, 'Cuadruples Suite', 4, 4),
(39, 'Quintuples Junior Suite', 4, 5),
(40, 'Quintuples Suite', 4, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

CREATE TABLE `estado` (
  `idEstado` int(2) NOT NULL,
  `descripcion` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `codigo` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `estado`
--

INSERT INTO `estado` (`idEstado`, `descripcion`, `codigo`) VALUES
(1, 'Disponible', 'DIS'),
(2, 'No Disponible', 'NOD'),
(3, 'Finalizado', 'FIN'),
(4, 'Pendiente', 'PEN'),
(5, 'Cancelada', 'CAN'),
(6, 'Bloqueado', 'BLO');

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
(1, 1, 1, NULL, NULL, 1),
(2, 2, 1, NULL, NULL, 2),
(3, 3, 1, NULL, NULL, 3),
(4, 4, 1, NULL, NULL, 4),
(5, 5, 1, NULL, NULL, 5),
(6, 6, 1, NULL, NULL, 6),
(7, 7, 1, NULL, NULL, 7),
(8, 8, 1, NULL, NULL, 8),
(9, 9, 1, NULL, NULL, 9),
(10, 10, 1, NULL, NULL, 10),
(11, 1, 1, NULL, NULL, 11),
(12, 2, 1, NULL, NULL, 12),
(13, 3, 1, NULL, NULL, 13),
(14, 4, 1, NULL, NULL, 14),
(15, 5, 1, NULL, NULL, 15),
(16, 6, 1, NULL, NULL, 16),
(17, 7, 1, NULL, NULL, 17),
(18, 8, 1, NULL, NULL, 18),
(19, 9, 1, NULL, NULL, 19),
(20, 10, 1, NULL, NULL, 20),
(21, 1, 1, NULL, NULL, 21),
(22, 2, 1, NULL, NULL, 22),
(23, 3, 1, NULL, NULL, 23),
(24, 4, 1, NULL, NULL, 24),
(25, 5, 1, NULL, NULL, 25),
(26, 6, 1, NULL, NULL, 26),
(27, 7, 1, NULL, '0000-00-00', 27),
(28, 8, 1, NULL, NULL, 28),
(29, 9, 1, NULL, NULL, 29),
(30, 10, 1, NULL, NULL, 30),
(31, 11, 1, NULL, NULL, 1),
(32, 11, 1, NULL, NULL, 11),
(33, 11, 1, NULL, NULL, 21),
(34, 12, 1, NULL, NULL, 2),
(35, 12, 1, NULL, NULL, 12),
(36, 12, 1, NULL, NULL, 22),
(37, 13, 1, NULL, NULL, 3),
(38, 13, 1, NULL, NULL, 13),
(39, 13, 1, NULL, NULL, 23),
(40, 14, 1, NULL, NULL, 4),
(41, 14, 1, NULL, NULL, 14),
(42, 14, 1, NULL, NULL, 24),
(43, 15, 1, NULL, NULL, 5),
(44, 15, 1, NULL, NULL, 15),
(45, 15, 1, NULL, NULL, 25),
(46, 16, 1, NULL, NULL, 6),
(47, 16, 1, NULL, NULL, 16),
(48, 16, 1, NULL, NULL, 26),
(49, 17, 1, NULL, NULL, 7),
(50, 17, 1, NULL, NULL, 17),
(51, 17, 1, NULL, NULL, 27),
(52, 18, 1, NULL, NULL, 0),
(76, 18, 1, NULL, NULL, 18),
(77, 18, 1, NULL, NULL, 28),
(78, 19, 1, NULL, NULL, 9),
(79, 19, 1, NULL, NULL, 19),
(80, 19, 1, NULL, NULL, 29),
(81, 20, 1, NULL, NULL, 10),
(82, 20, 1, NULL, NULL, 20),
(83, 20, 1, NULL, NULL, 30),
(84, 21, 1, NULL, NULL, 1),
(85, 21, 1, NULL, NULL, 11),
(86, 21, 1, NULL, NULL, 21),
(87, 22, 1, NULL, NULL, 2),
(88, 22, 1, NULL, NULL, 12),
(89, 22, 1, NULL, NULL, 22),
(90, 23, 1, NULL, NULL, 3),
(91, 23, 1, NULL, NULL, 13),
(92, 23, 1, NULL, NULL, 23),
(93, 24, 1, NULL, NULL, 4),
(94, 24, 1, NULL, NULL, 14),
(95, 24, 1, NULL, NULL, 24),
(96, 25, 1, NULL, NULL, 5),
(97, 25, 1, NULL, NULL, 15),
(98, 25, 1, NULL, NULL, 25),
(99, 26, 1, NULL, NULL, 6),
(100, 26, 1, NULL, NULL, 16),
(101, 26, 1, NULL, NULL, 26),
(102, 27, 1, NULL, NULL, 7),
(103, 27, 1, NULL, NULL, 17),
(104, 27, 1, NULL, NULL, 27),
(105, 28, 1, NULL, NULL, 8),
(106, 28, 1, NULL, NULL, 18),
(107, 28, 1, NULL, NULL, 28),
(108, 29, 1, NULL, NULL, 9),
(109, 29, 1, NULL, NULL, 19),
(110, 29, 1, NULL, NULL, 29),
(111, 30, 1, NULL, NULL, 10),
(112, 30, 1, NULL, NULL, 20),
(113, 30, 1, NULL, NULL, 30),
(114, 31, 1, NULL, NULL, 1),
(115, 31, 1, NULL, NULL, 11),
(116, 31, 1, NULL, NULL, 21),
(117, 32, 1, NULL, NULL, 2),
(118, 32, 1, NULL, NULL, 12),
(119, 32, 1, NULL, NULL, 22),
(120, 33, 1, NULL, NULL, 3),
(121, 33, 1, NULL, NULL, 13),
(122, 33, 1, NULL, NULL, 23),
(123, 34, 1, NULL, NULL, 4),
(124, 34, 1, NULL, NULL, 14),
(125, 34, 1, NULL, NULL, 24),
(126, 35, 1, NULL, NULL, 5),
(127, 35, 1, NULL, NULL, 15),
(128, 35, 1, NULL, NULL, 25),
(129, 36, 1, NULL, NULL, 6),
(130, 36, 1, NULL, NULL, 16),
(131, 36, 1, NULL, NULL, 26),
(132, 37, 1, NULL, NULL, 7),
(133, 37, 1, NULL, NULL, 17),
(134, 37, 1, NULL, NULL, 27),
(135, 38, 1, NULL, NULL, 8),
(136, 38, 1, NULL, NULL, 18),
(137, 38, 1, NULL, NULL, 28),
(138, 39, 1, NULL, NULL, 9),
(139, 39, 1, NULL, NULL, 19),
(140, 39, 1, NULL, NULL, 29),
(141, 40, 1, NULL, NULL, 10),
(142, 40, 1, NULL, NULL, 20),
(143, 40, 1, NULL, NULL, 30);

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
(1, 'Hotel Cordoba', 'Santa Rosa 447', 5),
(2, 'Holiday Inn Cordoba', 'Fray Luis Beltran Y Manuel Cardeñosa 500', 5),
(3, 'Howard Johnson La Cañada Hotel & Suites', 'Figueroa Alcorta 20', 5),
(4, 'NH Córdoba Urbano', 'Marcelo T. de Alvear 363', 5);

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
  `precioTotal` float NOT NULL,
  `estado_id` int(1) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas`
--

CREATE TABLE `tarifas` (
  `idTarifa` int(11) NOT NULL,
  `precio` float NOT NULL,
  `temporada_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tarifas`
--

INSERT INTO `tarifas` (`idTarifa`, `precio`, `temporada_id`, `categoria_id`) VALUES
(1, 2478, 1, 1),
(2, 3345, 2, 1),
(3, 3990, 3, 1),
(4, 7331, 3, 10),
(5, 3775, 2, 2),
(6, 4223, 3, 2),
(7, 3115, 1, 3),
(8, 3810, 2, 3),
(9, 4321, 3, 3),
(10, 4322, 1, 4),
(11, 4798, 2, 4),
(12, 5186, 3, 4),
(13, 4964, 1, 5),
(14, 5253, 2, 5),
(15, 5711, 3, 5),
(16, 5019, 1, 6),
(17, 5371, 2, 6),
(18, 6022, 3, 6),
(19, 5119, 1, 7),
(20, 5669, 2, 7),
(21, 6377, 3, 7),
(22, 5493, 1, 8),
(23, 5829, 2, 8),
(24, 6538, 3, 8),
(25, 6326, 1, 9),
(26, 6767, 2, 9),
(27, 7899, 3, 9),
(28, 6666, 1, 10),
(29, 6999, 2, 10),
(30, 7331, 3, 10),
(31, 2478, 1, 11),
(32, 3345, 2, 11),
(33, 3990, 3, 11),
(34, 2785, 1, 12),
(35, 3775, 2, 12),
(36, 4223, 3, 12),
(37, 3115, 1, 13),
(38, 3810, 2, 13),
(39, 4321, 3, 13),
(40, 4322, 1, 14),
(41, 4798, 2, 14),
(42, 5186, 3, 14),
(43, 4964, 1, 15),
(44, 5253, 2, 15),
(45, 5711, 3, 15),
(46, 5019, 1, 16),
(47, 5371, 2, 16),
(48, 6022, 3, 16),
(49, 5119, 1, 17),
(50, 5669, 2, 17),
(51, 6377, 3, 17),
(52, 5493, 1, 18),
(53, 5829, 2, 18),
(54, 6538, 3, 18),
(55, 6326, 1, 19),
(56, 6767, 2, 19),
(57, 7899, 3, 19),
(58, 6666, 1, 20),
(59, 6999, 2, 20),
(60, 7331, 3, 20),
(61, 2478, 1, 21),
(62, 3345, 2, 21),
(63, 3990, 3, 21),
(64, 2785, 1, 22),
(65, 3775, 2, 22),
(66, 4223, 3, 22),
(67, 3115, 1, 23),
(68, 3810, 2, 23),
(69, 4321, 3, 23),
(70, 4322, 1, 24),
(71, 4798, 2, 24),
(72, 5186, 3, 24),
(73, 4964, 1, 25),
(74, 5253, 2, 25),
(75, 5711, 3, 25),
(76, 5019, 1, 26),
(77, 5371, 2, 26),
(78, 6022, 3, 26),
(79, 5119, 1, 27),
(80, 5669, 2, 27),
(81, 6377, 3, 27),
(82, 5493, 1, 28),
(83, 5829, 2, 28),
(84, 6538, 3, 28),
(85, 6326, 1, 29),
(86, 6767, 2, 29),
(87, 7899, 3, 29),
(88, 6666, 1, 30),
(89, 6999, 2, 30),
(90, 7331, 3, 30),
(91, 2478, 1, 31),
(92, 3345, 2, 31),
(93, 3990, 3, 31),
(94, 2785, 1, 32),
(95, 3775, 2, 32),
(96, 4223, 3, 32),
(97, 3115, 1, 33),
(98, 3810, 2, 33),
(99, 4321, 3, 33),
(100, 4322, 1, 34),
(101, 4798, 2, 34),
(102, 5186, 3, 34),
(103, 4964, 1, 35),
(104, 5253, 2, 35),
(105, 5711, 3, 35),
(106, 5019, 1, 36),
(107, 5371, 2, 36),
(108, 6022, 3, 36),
(109, 5119, 1, 37),
(110, 5669, 2, 37),
(111, 6377, 3, 37),
(112, 5493, 1, 38),
(113, 5829, 2, 38),
(114, 6538, 3, 38),
(115, 6326, 1, 39),
(116, 6767, 2, 39),
(117, 7899, 3, 39),
(118, 6666, 1, 40),
(119, 6999, 2, 40),
(120, 7331, 3, 40);

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
(1, 'Baja', '1900-06-22', '1900-09-22', 5),
(2, 'Media', '1900-03-21', '1900-06-21', 5),
(3, 'Alta', '1900-09-23', '1900-03-20', 5);

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
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de la tabla `estado`
--
ALTER TABLE `estado`
  MODIFY `idEstado` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT de la tabla `hoteles`
--
ALTER TABLE `hoteles`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `idTarifa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

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
