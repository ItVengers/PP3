-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2021 at 04:11 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbhoteles`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `hotel_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `habitaciones`
--

CREATE TABLE `habitaciones` (
  `idHabitacion` int(11) NOT NULL,
  `descripcion` varchar(20) DEFAULT NULL,
  `cantPax` int(2) DEFAULT NULL,
  `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `hoteles`
--

CREATE TABLE `hoteles` (
  `idHotel` int(11) NOT NULL,
  `descripcion` varchar(15) NOT NULL,
  `ubicacion` varchar(15) NOT NULL,
  `zona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `persona`
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
  `contraseña` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reservas`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tarifas`
--

CREATE TABLE `tarifas` (
  `idTarifa` int(11) NOT NULL,
  `precio` int(10) NOT NULL,
  `temporada_id` int(11) NOT NULL,
  `categoria_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `temporada`
--

CREATE TABLE `temporada` (
  `idTemporada` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `zona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `zonas`
--

CREATE TABLE `zonas` (
  `idZona` int(11) NOT NULL,
  `descripcion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`),
  ADD KEY `Fk_Habit` (`hotel_id`);

--
-- Indexes for table `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`idHabitacion`),
  ADD KEY `Fk_CatHabit` (`cat_id`);

--
-- Indexes for table `hoteles`
--
ALTER TABLE `hoteles`
  ADD PRIMARY KEY (`idHotel`),
  ADD KEY `FK_IdZona` (`zona_id`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`idPersona`),
  ADD UNIQUE KEY `mail` (`mail`);

--
-- Indexes for table `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `fk_idHabitacion` (`habitacion_id`),
  ADD KEY `fk_idCliente` (`persona_id`);

--
-- Indexes for table `tarifas`
--
ALTER TABLE `tarifas`
  ADD PRIMARY KEY (`idTarifa`),
  ADD KEY `fk_idcategoria` (`categoria_id`),
  ADD KEY `fk_idTemporada` (`temporada_id`);

--
-- Indexes for table `temporada`
--
ALTER TABLE `temporada`
  ADD PRIMARY KEY (`idTemporada`),
  ADD KEY `fk_idzona` (`zona_id`);

--
-- Indexes for table `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`idZona`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `idHabitacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hoteles`
--
ALTER TABLE `hoteles`
  MODIFY `idHotel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `persona`
--
ALTER TABLE `persona`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reservas`
--
ALTER TABLE `reservas`
  MODIFY `idReserva` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tarifas`
--
ALTER TABLE `tarifas`
  MODIFY `idTarifa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `temporada`
--
ALTER TABLE `temporada`
  MODIFY `idTemporada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zonas`
--
ALTER TABLE `zonas`
  MODIFY `idZona` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `FK_Hotel_Categoria` FOREIGN KEY (`hotel_id`) REFERENCES `hoteles` (`idHotel`);

--
-- Constraints for table `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD CONSTRAINT `FK_Habitacion_Categoria` FOREIGN KEY (`cat_id`) REFERENCES `categoria` (`idCategoria`);

--
-- Constraints for table `hoteles`
--
ALTER TABLE `hoteles`
  ADD CONSTRAINT `FK_ZonaHotel` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);

--
-- Constraints for table `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_ClienteReserva` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`idPersona`),
  ADD CONSTRAINT `FK_HabiReservas` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idHabitacion`);

--
-- Constraints for table `tarifas`
--
ALTER TABLE `tarifas`
  ADD CONSTRAINT `FK_TarifaCat` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`idCategoria`),
  ADD CONSTRAINT `FK_TempoTarifa` FOREIGN KEY (`temporada_id`) REFERENCES `temporada` (`idTemporada`);

--
-- Constraints for table `temporada`
--
ALTER TABLE `temporada`
  ADD CONSTRAINT `FK_ZonaTemp` FOREIGN KEY (`zona_id`) REFERENCES `zonas` (`idZona`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
