CREATE DATABASE IF NOT EXISTS dbCadenaHoteles;

USE dbCadenaHoteles;

#Tabla usuarios externos (login/Registrarse)
CREATE TABLE IF NOT EXISTS tCliente(
IdCliente INT NOT NULL AUTO_INCREMENT,
Nombre varchar(20) NOT NULL,
Mail varchar(50) NOT NULL,
Password varchar(32),
  PRIMARY KEY (IdUsers),
  UNIQUE KEY(Mail)
  );
  
#Tabla Datos Sensibles de los usuarios externos
CREATE TABLE IF NOT EXISTS tPersona(
IdPersona INT NOT NULL AUTO_INCREMENT,
Apellido varchar(20) NOT NULL,
DNI int(10) NOT NULL,
Direccion varchar(15),
Telefono int(10) NOT NULL,
  PRIMARY KEY (IdPersona),
  FK_IdCliente INT,
  CONSTRAINT FK_Cliente_Persona FOREIGN KEY (FK_IdCliente) REFERENCES tUsuario(IdCliente) 
  );
  
#Tabla usuarios internos de la cadena de hoteles (login)  
  CREATE TABLE IF NOT EXISTS tUserInt(
IdUsersInt INT NOT NULL AUTO_INCREMENT,
Mail varchar(50) NOT NULL,
password varchar(32),
Rol varchar(10) NOT NULL,
  PRIMARY KEY (IdUsersInt),
  UNIQUE KEY(Mail)  
  );
  
#Tabla de Usuarios internos de la cadena de hoteles (datos sensibles) 
  CREATE TABLE IF NOT EXISTS tPersonal(
IdPersonal INT NOT NULL AUTO_INCREMENT,
Nombre varchar(20) NOT NULL,
Apellido varchar(20) NOT NULL,
Mail varchar(50) NOT NULL,
Direccion varchar(20),
Telefono int(10) NOT NULL,
Legajo int(5) NOT NULL,
  PRIMARY KEY (IdPersonal),
  Fk_IdUsersInt INT,
  CONSTRAINT FK_UsuarioInt_Personal FOREIGN KEY (Fk_IdUsersInt) REFERENCES tUserInt(IdUsersInt) 
  );
  
  
  #Tabla de las categorias de las habitaciones
  CREATE TABLE IF NOT EXISTS tCategoria(
IdCategoria INT NOT NULL AUTO_INCREMENT,
Descripcion varchar(20) NOT NULL,
Tipo varchar(20) NOT NULL,
PRIMARY KEY (IdCategoria)
);

 #Tabla de las Tarifas de las habitaciones
  CREATE TABLE IF NOT EXISTS tTarifas(
IdTarifa INT NOT NULL AUTO_INCREMENT,
Precio int(10) NOT NULL,
PRIMARY KEY (IdTarifa),
Fk_IdHotel INT,
  CONSTRAINT FK_Hotel_Tarifa FOREIGN KEY (Fk_IdHotel) REFERENCES tHotel(IdHotel) 
);

 #Tabla de los hoteles de la cadena
  CREATE TABLE IF NOT EXISTS tHoteles(
IdHotel INT NOT NULL AUTO_INCREMENT,
Descripcion varchar(15) NOT NULL,
Ubicacion varchar(15) not null,
PRIMARY KEY (IdHotel)
);

#Tabla de las Temporadas 
  CREATE TABLE IF NOT EXISTS tTemporada(
IdTemporada INT NOT NULL AUTO_INCREMENT,
Descripcion varchar(20) NOT NULL,
PRIMARY KEY (IdTemporada),
Fk_IdTarifaTemp INT,
  CONSTRAINT FK_Temporada_Tarifa FOREIGN KEY (Fk_IdTarifaTemp) REFERENCES tTarifas(IdTarifa) 
);

#Tabla de las Habitaciones 
  CREATE TABLE IF NOT EXISTS tHabitaciones(
IdHabitacion INT NOT NULL AUTO_INCREMENT,
Descripcion varchar(20),
CantPersonas int(5),
PRIMARY KEY (IdHabitacion),
Fk_HotelHabit INT,
  CONSTRAINT FK_Habitacion_Hotel FOREIGN KEY (Fk_HotelHabit) REFERENCES tHoteles(IdHotel),
  Fk_IdCategHabit INT,
  CONSTRAINT FK_Habitacion_Categoria FOREIGN KEY (Fk_IdCategHabit) REFERENCES tCategoria(IdCategoria) ,
  Fk_IdTarifaHabit INT,
  CONSTRAINT FK_Habitacion_Tarifa FOREIGN KEY (Fk_IdTarifaHabit) REFERENCES tTarifas(IdTarifa) ,
  Fk_IdTempHabit INT,
  CONSTRAINT FK_Habitacion_Temporada FOREIGN KEY (Fk_IdTempHabit) REFERENCES tTemporada(IdTemporada) 
);

#Tabla de las Reservas 
  CREATE TABLE IF NOT EXISTS tReserva(
IdReserva INT NOT NULL AUTO_INCREMENT,
FechaDesde date NOT NULL,
FechaHasta date NOT NULL,
CantidadPersonas int(5) NOT NULL,
PrecioTotal int(10) NOT NULL,
Estado varchar(10) NOT NULL,
PRIMARY KEY (IdReserva),
Fk_PersonaReserva INT,
  CONSTRAINT FK_Reserva_Persona FOREIGN KEY (Fk_PersonaReserva) REFERENCES tPersona(IdPersona),
  Fk_IdHabitReserva INT,
  CONSTRAINT FK_Reserva_Habitacion FOREIGN KEY (Fk_IdHabitReserva) REFERENCES tHabitacion(IdHabitacion) ,
  Fk_IdHotelReserva INT,
  CONSTRAINT FK_Reserva_Hotel FOREIGN KEY (Fk_IdHotelReserva) REFERENCES tHotel(IdHotel) ,
  Fk_IdPersonalReserva INT,
  CONSTRAINT FK_Reserva_Personal FOREIGN KEY (Fk_IdPersonalReserva) REFERENCES tPersonal(IdPersonal) 
);

  
  
  
  
  
