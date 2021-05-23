USE jrnv31o067vlipqm;

#Tabla usuarios externos (Registrarse)
CREATE TABLE IF NOT EXISTS tCliente(
idCliente INT NOT NULL AUTO_INCREMENT,
nombre varchar(20) NOT NULL,
mail varchar(50) NOT NULL,
contraseña varchar(32),
  PRIMARY KEY (IdCliente),
  UNIQUE KEY(Mail)
  );
  
#Tabla Datos Sensibles de los usuarios externos
CREATE TABLE IF NOT EXISTS tPersona(
idPersona INT NOT NULL,
nombre varchar(20) NOT NULL,
apellido varchar(20) NOT NULL,
dni int(10) NOT NULL,
direccion varchar(35),
telefono int(10) NOT NULL,
legajo int(5) NOT NULL,
rol varchar(10) NOT NULL,
  KEY FK_IdCliente(IdPersona),
  CONSTRAINT FK_ClientePersona FOREIGN KEY (IdPersona) REFERENCES tCliente(IdCliente));
  /*KEY FK_IdUserInt(IdPersona),
  CONSTRAINT FK_UserInt_Persona FOREIGN KEY (IdPersona) REFERENCES tUserInt(idUsersInt)
  );*/
  
  ALTER TABLE
tPersona
ADD CONSTRAINT
FK_UserInt_Persona
FOREIGN KEY
(IdPersona)
REFERENCES
tUserInt(idUsersInt);
  

  
  
#Tabla usuarios internos de la cadena de hoteles (login)  
  CREATE TABLE IF NOT EXISTS tUserInt(
idUsersInt INT NOT NULL,
mail varchar(50) NOT NULL,
contraseña varchar(32),
  UNIQUE KEY(Mail),
   KEY Fk_idPersonal(idUsersInt),
  CONSTRAINT FK_UsuarioInt_Personal FOREIGN KEY (idUsersInt) REFERENCES tPersona(idPersona) 
  );
  
 
  
  #Tabla de las categorias de las habitaciones
  CREATE TABLE IF NOT EXISTS tCategoria(
idCategoria INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20) NOT NULL,
tipo varchar(20) NOT NULL,
PRIMARY KEY (idCategoria)
);

#Tabla de las Habitaciones 
  CREATE TABLE IF NOT EXISTS tHabitaciones(
idHabitacion INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20),
cantPax int(5),
PRIMARY KEY (idHabitacion),
key Fk_CategHabit(idHabitacion),
  CONSTRAINT FK_Habitacion_Categoria FOREIGN KEY (idHabitacion) REFERENCES tCategoria(idCategoria)
);

ALTER TABLE thabitaciones add column hotel_id int(2) not null;
ALTER TABLE  dbcadenahoteles.thabitaciones
ADD CONSTRAINT FK_Hotel_Habit
FOREIGN KEY (hotel_id) REFERENCES dbcadenahoteles.thoteles (idHotel);


#Tabla de los hoteles de la cadena
  CREATE TABLE IF NOT EXISTS tHoteles(
idHotel INT NOT NULL AUTO_INCREMENT,
descripcion varchar(15) NOT NULL,
ubicacion varchar(15) not null,
PRIMARY KEY (idHotel)
);

#Tabla de las Temporadas 
  CREATE TABLE IF NOT EXISTS tTemporada(
idTemporada INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20) NOT NULL,
PRIMARY KEY (idTemporada)
);


 #Tabla de las Tarifas 
  CREATE TABLE IF NOT EXISTS tTarifas(
idTarifa INT NOT NULL AUTO_INCREMENT,
precio int(10) NOT NULL,
hotel_id int not null,
temporada_id int not null,
habitacion_id int not null,
PRIMARY KEY (idTarifa),
	KEY fk_idHotel (hotel_id),
  CONSTRAINT FK_HotelTarifa FOREIGN KEY (hotel_id) REFERENCES tHoteles(idHotel),
    KEY fk_idTemporada (temporada_id),
  CONSTRAINT FK_TempoTarifa FOREIGN KEY (temporada_id) REFERENCES tTemporada(idTemporada),
  KEY fk_idHabitacion (habitacion_id),
  CONSTRAINT FK_HabitTarifa FOREIGN KEY (habitacion_id) REFERENCES tHabitaciones(idHabitacion)
);



#Tabla de las Reservas 
  CREATE TABLE IF NOT EXISTS tReserva(
idReserva INT NOT NULL AUTO_INCREMENT,
fechaDesde date NOT NULL,
fechaHasta date NOT NULL,
cantidadPersonas int(5) NOT NULL,
precioTotal int(10) NOT NULL,
estado varchar(10) NOT NULL,
habitacion_id int not null,
cliente_id int not null,
PRIMARY KEY (idReserva),
KEY fk_idHabitacion (habitacion_id),
  CONSTRAINT FK_HabitReserva FOREIGN KEY (habitacion_id) REFERENCES tHabitaciones(idHabitacion),
  KEY fk_idCliente (cliente_id),
  CONSTRAINT FK_ClienteReserva FOREIGN KEY (cliente_id) REFERENCES tcliente(idCliente));