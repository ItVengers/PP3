#CAMBIOS CATEGORIAS

select * from categoria;

delete from categoria where idCategoria in (5,6,9,10);

update categoria set tipo = "Junior Suite" where tipo = "Junior Suite 1";

alter table categoria drop column tipo;

UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Individual Suite' WHERE (`idCategoria` = '2');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Dobles Junior Suite' WHERE (`idCategoria` = '3');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Dobles Suite' WHERE (`idCategoria` = '4');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Triples Junior Suite' WHERE (`idCategoria` = '7');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Triples Suite' WHERE (`idCategoria` = '8');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Cuadruples Junior Suite' WHERE (`idCategoria` = '13');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Cuadruples Suite' WHERE (`idCategoria` = '14');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Quintuples Junior Suite' WHERE (`idCategoria` = '15');
UPDATE `dbhoteles`.`categoria` SET `descripcion` = 'Quintuples Suite' WHERE (`idCategoria` = '16');

alter table categoria add column pasajeros int (1) not null;

UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '1' WHERE (`idCategoria` = '1');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '1' WHERE (`idCategoria` = '2');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '2' WHERE (`idCategoria` = '3');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '2' WHERE (`idCategoria` = '4');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '3' WHERE (`idCategoria` = '7');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '3' WHERE (`idCategoria` = '8');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '4' WHERE (`idCategoria` = '13');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '4' WHERE (`idCategoria` = '14');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '5' WHERE (`idCategoria` = '15');
UPDATE `dbhoteles`.`categoria` SET `pasajeros` = '5' WHERE (`idCategoria` = '16');


#----------------------------------------------------------------------------
# CAMBIOS EN HABITACIONES

select * from habitaciones;

alter table habitaciones drop column cantPax;
alter table habitaciones drop column camas_id;
alter table habitaciones add column numeroHabitacion int (10) not null;

ALTER TABLE habitaciones ADD COLUMN estado int (2)  NOT NULL;
ALTER TABLE habitaciones ADD COLUMN checkIn date;
ALTER TABLE habitaciones ADD COLUMN checkOut date;

UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '1' WHERE (`idHabitacion` = '11');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '2' WHERE (`idHabitacion` = '12');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '3' WHERE (`idHabitacion` = '13');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '4' WHERE (`idHabitacion` = '14');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '5' WHERE (`idHabitacion` = '15');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '10' WHERE (`idHabitacion` = '16');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '11' WHERE (`idHabitacion` = '17');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '12' WHERE (`idHabitacion` = '18');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '13' WHERE (`idHabitacion` = '19');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '14' WHERE (`idHabitacion` = '20');
UPDATE `dbhoteles`.`habitaciones` SET `numeroHabitacion` = '15' WHERE (`idHabitacion` = '21');

#MODIFICACIONES DE LAS HABITACIONES CUANDO LAS RESERVAS ESTAN EN ESTADO 2 Y LAS HABITACIONES DISPONIBLES SE PONEN EN ESTADO 1 DISPONIBLE
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '2', `checkIn` = '20211101', `checkOut` = '20211115' WHERE (`idHabitacion` = '14');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '2', `checkIn` = '20211210', `checkOut` = '20211223' WHERE (`idHabitacion` = '17');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '11');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '12');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '13');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '15');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '16');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '18');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '19');
UPDATE `dbhoteles`.`habitaciones` SET `estado` = '1' WHERE (`idHabitacion` = '21');
#----------------------------------------------------------------------------
#CREA TABLA ESTADO
select * from estado;

CREATE TABLE IF NOT EXISTS estado (
idEstado INT (2) NOT NULL auto_increment, primary key (idEstado),
descripcion VARCHAR (45) NOT NULL
);

insert into estado (descripcion) 
values ("Disponible"),("No Disponible"),("Finalizado");

#----------------------------------------------------------------------------
#BORRAR LA FK DE CAMAS

ALTER TABLE `dbhoteles`.`habitaciones` 
DROP FOREIGN KEY `FK_HabCam`;
ALTER TABLE `dbhoteles`.`habitaciones` 
DROP INDEX `FK_HabCam` ;
;

#----------------------------------------------------------------------------
#ELIMINAR LA TABLA CAMAS	

drop table camas;


#----------------------------------------------------------------------------
#ELIMINAR LA TABLA RESERVAS (PRIMERO ELIMINAR LAS FK) Y DPS BORRAR LA TABLA Y TIRAR DE NUEVO LA QUE ESTA ABAJO
select * from reservas;


CREATE TABLE `reservas` (
  `idReserva` int(11) NOT NULL auto_increment, primary key (idReserva),
  `checkIn` date NOT NULL,
  `checkOut` date NOT NULL,
  `fechaReserva` datetime NOT NULL,
  `precioTotal` int(10) NOT NULL,
  `estado_id` int(1) NOT NULL,
  `habitacion_id` int(11) NOT NULL,
  `persona_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `reservas`
  ADD KEY `fk_idEstado` (`estado_id`),
  ADD KEY `fk_idHabitacion` (`habitacion_id`),
  ADD KEY `fk_idCliente` (`persona_id`);
  
  ALTER TABLE `reservas`
  ADD CONSTRAINT `FK_EstadoReserva` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`idEstado`),
  ADD CONSTRAINT `FK_ClienteReserva` FOREIGN KEY (`persona_id`) REFERENCES `persona` (`idpersona`),
  ADD CONSTRAINT `FK_HabReservas` FOREIGN KEY (`habitacion_id`) REFERENCES `habitaciones` (`idhabitacion`);

#RESERVAS FINALIZADAS
insert	into reservas (checkIn,checkOut,fechaReserva,precioTotal, estado_id, habitacion_id, persona_id) 
values (20210201,20210220,20201225,3800,3,11,3),(20210101,20210120,20201210,7800,3,13,6),(20210301,20210320,20210201,10800,3,16,4),
(20210401,20210420,20210301,15800,3,17,3),(20210501,20210520,20210401,30200,3,20,2);
    
#RESERVAS CON ESTADO NO DISPONIBLE
insert	into reservas (checkIn,checkOut,fechaReserva,precioTotal, estado_id, habitacion_id, persona_id) 
values (20211101,20211115,202110102,6500,2,14,9);   

insert	into reservas (checkIn,checkOut,fechaReserva,precioTotal, estado_id, habitacion_id, persona_id) 
values (20211210,20211223,20210907,10500,2,17,8); 

insert	into reservas (checkIn,checkOut,fechaReserva,precioTotal, estado_id, habitacion_id, persona_id) 
values (20220101,20220131,20211001,25000,2,20,6);

insert	into reservas (checkIn,checkOut,fechaReserva,precioTotal, estado_id, habitacion_id, persona_id) 
values (20211003,20211013,20211003,5000,2,13,4); 
#----------------------------------------------------------------------------

-- Mejora tabla de estados
alter table estado add column codigo varchar(3);
update estado set codigo = 'DIS' where idEstado = 1;
update estado set codigo = 'NOD' where idEstado = 2;
update estado set codigo = 'FIN' where idEstado = 3;
INSERT INTO estado (idEstado, descripcion, codigo) VALUES (4, 'Pendiente', 'PEN');
INSERT INTO estado (idEstado, descripcion, codigo) VALUES (5, 'Cancelada', 'CAN');

#----------------------------------------------------------------------------
#BORRAR EL HOTEL DE LA COSTA
call BorrarHotel (2);


-- Agregar Hoteles
call AgregarHotel ('Holiday Inn Cordoba','Fray Luis Beltran Y Manuel Cardeñosa 5008',5);
call AgregarHotel ('Howard Johnson La Cañada Hotel & Suites','Figueroa Alcorta 20', 5);
call AgregarHotel ('NH Córdoba Urbano','Marcelo T. de Alvear 363',5);

select * from hoteles;

#----------------------------------------------------------------------------
select * from zonas;


select * from temporada;

select * from habitaciones;

select * from persona;



select * from tarifas;
select * from reservas;
select * from categoria;
select * from estado;

#QUERY QUE SACA LA CANTIDAD DE DIAS DE UNA RESERVA
 
select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(checkOut,checkIn ) as 'Total' from reservas where idReserva=9;

#QUERY QUE SACA LA CANTIDAD DE DIAS DE TODAS LAS RESERVAS
 
select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(checkOut,checkIn ) as 'Total' from reservas;

#CAMBIO DE INT A FLOAT EN EL TIPO DE DATO DEL PRECIO
ALTER TABLE `dbhoteles`.`tarifas` 
CHANGE COLUMN `precio` `precio` FLOAT(10) NOT NULL ;

call BusquedaHabitacionesDisponibles (2,'2021-10-03','2021-10-12');
call AgregarTarifa (5575,5,14);




