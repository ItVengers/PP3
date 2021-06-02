USE dbhoteles;

#Tabla usuarios externos (Registrarse)
/*CREATE TABLE IF NOT EXISTS cliente(
idCliente INT NOT NULL AUTO_INCREMENT,
mail varchar(50) NOT NULL,
contraseña varchar(32),
  PRIMARY KEY (IdCliente),
  UNIQUE KEY(Mail)
  );*/

  
#Tabla Datos Sensibles de los usuarios externos
CREATE TABLE IF NOT EXISTS persona(
idPersona INT NOT NULL, primary key (idPersona),
nombre varchar(20) NOT NULL,
apellido varchar(20) NOT NULL,
dni int(10) NOT NULL,
direccion varchar(35),
telefono int(10) NOT NULL,
legajo int(5) NOT NULL,
rol varchar(10) NOT NULL,
mail varchar(50) NOT NULL,
contraseña varchar(32),
UNIQUE KEY(Mail)
);
  

/*ALTER TABLE
persona
ADD CONSTRAINT
FK_UserInt_Persona
FOREIGN KEY
(IdPersona)
REFERENCES
empleados(idEmpleados);*/
  

  
  
#Tabla usuarios internos de la cadena de hoteles (login)  
  /*CREATE TABLE IF NOT EXISTS empleados(
idEmpleados INT NOT NULL,
mail varchar(50) NOT NULL,
contraseña varchar(32),
  UNIQUE KEY(Mail),
   KEY Fk_idPersonal(idEmpleados),
  CONSTRAINT FK_UsuarioInt_Personal FOREIGN KEY (idEmpleados) REFERENCES persona(idPersona) 
  );*/
  
 
  
  #Tabla de las categorias de las habitaciones
  CREATE TABLE IF NOT EXISTS categoria(
idCategoria INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20) NOT NULL,
tipo varchar(20) NOT NULL,
hotel_id int not null,
PRIMARY KEY (idCategoria),
key Fk_Habit(hotel_id),
  CONSTRAINT FK_Hotel_Categoria FOREIGN KEY (hotel_id) REFERENCES hoteles(idHotel)
);

#Tabla de las Habitaciones 
  CREATE TABLE IF NOT EXISTS habitaciones(
idHabitacion INT NOT NULL AUTO_INCREMENT, primary key(idHabitacion),
descripcion varchar(20),
cantPax int(2),
cat_id int not null,
key Fk_CatHabit(cat_id),
  CONSTRAINT FK_Habitacion_Categoria FOREIGN KEY (cat_id) REFERENCES categoria(idCategoria)
);

/*ALTER TABLE habitaciones add column hotel_id int(2) not null;
ALTER TABLE  dbcadenahoteles.habitaciones
ADD CONSTRAINT FK_Hotel_Habit
FOREIGN KEY (hotel_id) REFERENCES dbcadenahoteles.hoteles (idHotel);*/


#Tabla de los hoteles de la cadena
  CREATE TABLE IF NOT EXISTS hoteles (
    idHotel INT NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(15) NOT NULL,
    ubicacion VARCHAR(15) NOT NULL,
    zona_id int not null,
    PRIMARY KEY (idHotel),
  KEY FK_IdZona(zona_id),
  CONSTRAINT FK_ZonaHotel FOREIGN KEY (zona_id) REFERENCES zonas(idZona));

#Tabla de las Temporadas 

  CREATE TABLE IF NOT EXISTS temporada(
idTemporada INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20) NOT NULL,
fecha_desde date not null,
fecha_hasta date not null,
zona_id int not null,
PRIMARY KEY (idTemporada),
	KEY fk_idzona (zona_id),
  CONSTRAINT FK_ZonaTemp FOREIGN KEY (zona_id) REFERENCES zonas(idZona)
);

#Tabla de las Zonas 

  CREATE TABLE IF NOT EXISTS zonas(
idZona INT NOT NULL AUTO_INCREMENT,
descripcion varchar(20) NOT NULL,
PRIMARY KEY (idZona)
);


 #Tabla de las Tarifas 
  CREATE TABLE IF NOT EXISTS tarifas(
idTarifa INT NOT NULL AUTO_INCREMENT,
precio int(10) NOT NULL,
temporada_id int not null,
categoria_id int not null,
PRIMARY KEY (idTarifa),
key fk_idcategoria(categoria_id),
  CONSTRAINT FK_TarifaCat FOREIGN KEY (categoria_id) REFERENCES categoria(idCategoria),
  KEY fk_idTemporada (temporada_id),
  CONSTRAINT FK_TempoTarifa FOREIGN KEY (temporada_id) REFERENCES temporada(idTemporada)
);



#Tabla de las Reservas 
  CREATE TABLE IF NOT EXISTS reservas(
idReserva INT NOT NULL AUTO_INCREMENT,
fechaDesde date NOT NULL,
fechaHasta date NOT NULL,
fechaReserva datetime not null,
cantidadPax int(5) NOT NULL,
precioTotal int(10) NOT NULL,
estado varchar(10) NOT NULL,
habitacion_id int not null,
persona_id int not null,
PRIMARY KEY (idReserva),
KEY fk_idHabitacion (habitacion_id),
  CONSTRAINT FK_HabiReservas FOREIGN KEY (habitacion_id) REFERENCES habitaciones(idHabitacion),
  KEY fk_idCliente (persona_id),
  CONSTRAINT FK_ClienteReserva FOREIGN KEY (persona_id) REFERENCES persona(idPersona));