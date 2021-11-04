#BUSCAR HABITACIONES DISPONIBLES

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BusquedaHabitacionesDisponibles (IN pPersona int(1), IN pCheckIn VARCHAR(20), IN pCheckOut VARCHAR(20)) BEGIN
     
    select h.idHabitacion, h.checkIn, h.checkOut, h.estado, c.descripcion, t.precio 
from habitaciones h
            inner join categoria c on c.idCategoria = h.cat_id
            inner join tarifas t on t.categoria_id = c.idCategoria
where h.idHabitacion not in (
	select r.habitacion_id
from reservas r 
            inner join estado e on e.idEstado = r.estado_id 
where ((r.checkIn <= pCheckIn and r.checkOut > pCheckIn) or 
                (r.checkIn <= pCheckOut and r.checkOut > pCheckOut)) and (e.codigo = 'PEN' OR e.codigo = 'NOD')
    )
 and c.pasajeros = pPersona;
      

END$$




#----------------------------------------------------------
#Agregar Habitacion

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarHabitacion (IN pCat_id int(1), IN pEstado int(2), IN pNumeroHabitacion int(10)) BEGIN
     
 insert into habitaciones (cat_id, estado, numeroHabitacion) 
 values (pCat_id, pEstado, pNumeroHabitacion);

END$$

#----------------------------------------------------------
#Borrar Habitacion

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BorrarHabitacion (IN pIdHabitacion int(11))
 BEGIN

DELETE FROM habitaciones
WHERE idHabitacion = pIdHabitacion;     

END$$


#----------------------------------------------------------
#Modificar Habitacion
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarHabitacion (IN pIdHabitacion INT(11), IN pCat_id int(1), IN pEstado int(2), pCheckIn date, pCheckOut date, IN pNumeroHabitacion int(10))
BEGIN

UPDATE habitaciones SET 
cat_id = pCat_id,
estado = pEstado,
checkIn = pCheckIn,
checkOut = pCheckOut,
numeroHabitacion = pNumeroHabitacion
WHERE idHabitacion = pIdHabitacion;

END$$


#----------------------------------------------------------
#Agregar Categoria

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarCategoria (IN pDescripcion varchar(50), IN pHotelId int(11), IN pPasajeros int(1)) BEGIN
     
 insert into categoria (descripcion, hotel_id, pasajeros) 
 values (pDescripcion,pHotelId, pPasajeros);

END$$

#----------------------------------------------------------
#Borrar Categoria

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BorrarCategoria (IN pIdCategoria int(11))
 BEGIN

DELETE FROM categoria
WHERE idCategoria = pIdCategoria;     

END$$

#----------------------------------------------------------
#Modificar Categoria

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarCategoria (IN pIdCategoria INT(11), IN pDescripcion varchar(50), IN pHotelId int(11), IN pPasajeros int(1))
BEGIN

UPDATE categoria SET 
descripcion = pDescripcion,
hotel_id = pHotelId,
pasajeros = pPasajeros
WHERE idCategoria = pIdCategoria;

END$$

#----------------------------------------------------------
#Agregar Persona

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarPersona (IN pNombre varchar(20), IN pApellido varchar(20), IN pDni int(10), IN pTelefono int(10), IN pLegajo int(5), IN pRol varchar(10), IN pMail varchar(50), IN pContrasenia varchar(32))
BEGIN
     
 insert into persona (nombre,apellido,dni,telefono,legajo,rol,mail,contrasenia) 
values (pNombre,pApellido,pDni,pTelefono,pLegajo,pRol,pMail,pContrasenia);

END$$

#----------------------------------------------------------
#Borrar Persona
DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BorrarPersona (IN pIdPersona int(11))
 BEGIN

DELETE FROM persona
WHERE idPersona = pIdPersona;     

END$$

#----------------------------------------------------------
#Modificar Persona
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarPersona (IN pIdPersona INT(11), IN pNombre varchar(20), IN pApellido varchar(20), IN pDni int(10), IN pTelefono int(10), IN pLegajo int(5), IN pRol varchar(10), IN pMail varchar(50), IN pContrasenia varchar(32))
BEGIN

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

#----------------------------------------------------------
#Agregar Tarifa

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarTarifa (IN pPrecio float(10), IN pTemporada_id int(11), IN pCategoria_id int(11)) BEGIN
     
 insert into tarifas (precio,temporada_id,categoria_id) 
 values (pPrecio,pTemporada_id, pCategoria_id);

END$$

#----------------------------------------------------------
#Borrar Tarifa

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BorrarTarifa (IN pIdTarifa int(11))
 BEGIN

DELETE FROM tarifas
WHERE idTarifa = pIdTarifa;     

END$$

#----------------------------------------------------------
#Modificar Tarifa
DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarTarifa (IN pIdTarifa INT(11), IN pPrecio float(10), IN pTemporada_id int(11), IN pCategoria_id int(11))
BEGIN

UPDATE tarifas SET 
precio = pPrecio,
temporada_id = pTemporada_id,
categoria_id = pCategoria_id
WHERE idTarifa = pIdTarifa;

END$$

#----------------------------------------------------------
#Agregar Reserva

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarReserva (IN pCheckIn date, IN pCheckOut date, in pFechaReserva datetime, in pPrecioTotal FLOAT(10), in PEstado_id int (1), in pHabitacion_id int (11), in pPersona_id int(11)) BEGIN
     
 insert into reservas (checkIn,checkOut,fechaReserva,precioTotal,estado_id,habitacion_id,persona_id) 
 values ( pCheckIn, pCheckOut, pFechaReserva, pPrecioTotal, PEstado_id, pHabitacion_id , pPersona_id );

END$$

#----------------------------------------------------------
#Cancelar Reserva

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE CancelarReserva (IN pIdReserva int(11))
 BEGIN
 

update reservas set estado_id = 5 where idReserva = pIdReserva;  

END$$

#----------------------------------------------------------
#Modificar Reserva

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarReserva (IN pIdReserva int(11), IN pCheckIn date, IN pCheckOut date, in pFechaReserva datetime, in pPrecioTotal FLOAT(10), in PEstado_id int (1), in pHabitacion_id int (11), in pPersona_id int(11))
BEGIN

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

#----------------------------------------------------------
#Reserva Pendiente

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE PendienteReserva (IN pIdReserva int(11))
 BEGIN
 

update reservas set estado_id = 4 where idReserva = pIdReserva;  

END$$

#----------------------------------------------------------

#Agregar Hotel

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE AgregarHotel (IN pDescripcion varchar(50), IN pUbicacion varchar(40), IN pZona_id int(11)) BEGIN
     
 insert into hoteles (descripcion, ubicacion , zona_id) 
 values (pDescripcion,pUbicacion, pZona_id);

END$$

#----------------------------------------------------------
#Borrar Hotel

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE BorrarHotel (IN pIdHotel int(11))
 BEGIN

DELETE FROM hoteles
WHERE idHotel = pIdHotel;     

END$$
#----------------------------------------------------------
#Modificar Hotel

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE ModificarHotel (IN pIdHotel INT(11), IN pDescripcion varchar(50), IN pUbicacion varchar(40), IN pZona_id int(11))
BEGIN

UPDATE hoteles SET 
descripcion = pDescripcion,
ubicacion = pUbicacion,
zona_id = pZona_id 
WHERE idHotel = pIdHotel;

END$$

#----------------------------------------------------------
# Consulta dias de una reserva

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE ConsultaDiasReserva (IN pIdReserva int(11),IN pCheckIn date, IN pCheckOut date) BEGIN
     
 select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(pCheckOut,pCheckIn ) as 'Total' from reservas where idReserva= pIdReserva;

END$$

# Consulta dias de todas las reservas

DELIMITER $$
CREATE DEFINER=root@localhost PROCEDURE ConsultaDiasTodasLasReserva (IN pIdReserva int(11),IN pCheckIn date, IN pCheckOut date) BEGIN
     
 select checkIn as 'Check In', checkOut as 'Check Out', DATEDIFF(pCheckOut,pCheckIn ) as 'Total' from reservas;

END$$
#----------------------------------------------------------
# Reservas con precio
