select * from categoria;
update categoria set hotel_id = 1 where idCategoria >=1;

insert into categoria (descripcion,tipo) 
values ("Individuales","Individuales"),("Individuales","Special"); # 1c -----
insert into categoria (descripcion,tipo) 
values ("Dobles","Suite"),("Dobles","Junior Suite"),("Dobles","Gran Suite"),("Dobles","Special"); # 1g / 2c ---- 
insert into categoria (descripcion,tipo) 
values ("Triples","Suite"),("Triples","Junior Suite"),("Triples","Gran Suite"),("Triples","Special"); # 1 g 1c / 3c  ---
insert into categoria (descripcion,tipo) 
values ("Cuadruples","Suite"),("Cuadruples","Special");# 1 grande 2 chicas / 2 grandes  / 4 chicas ---
insert into categoria (descripcion,tipo) 
values ("Quintuples","Suite"),("Quintuples","Special"); # 1 grande 3 chicas / 2 grandes 1 chica / 5 chicas
#----------------------------------------------

CREATE TABLE IF NOT EXISTS camas (
idCamas INT (2) NOT NULL auto_increment, primary key (idCamas),
descripcion VARCHAR (45) NOT NULL
);

select * from camas;

insert into camas (descripcion) 
values ("1 Individual"),("1 Doble"),("2 Individuales"),("1 Doble + 1 Individual"),("3 Individuales"),("1 Doble + 3 Individuales"),("2 Dobles"),("4 Individuales"),("1 Doble + 3 Individuales"),("2 Dobles + 1 Individual"),("5 Individuales");


select * from habitaciones;
delete from habitaciones where idHabitacion in (5,6);

ALTER TABLE habitaciones
  ADD CONSTRAINT FK_HabCam FOREIGN KEY (camas_id) REFERENCES camas (idCamas);




ALTER TABLE habitaciones ADD COLUMN camas_id int (2)  NOT NULL;


insert into habitaciones (cat_id, camas_id) 
values(1,1),(2,1),(3,2),(3,3),(7,4),(7,5),(13,7),(13,8),(15,9),(15,10),(15,11);

#----------------------------------------------

select * from hoteles;

insert into hoteles (descripcion,ubicacion,zona_id) 
values ("Hotel Sur Centro","Juan Manuel de Rosas 625",1),("Hotel del Plata","Alberti 9",6),("Hotel Cordoba","Santa Rosa 447",5);

#----------------------------------------------

select * from zonas;

insert into zonas (descripcion) values ("Patagonia"),("Cuyo"),("Norte"),("Litoral"),("Centro"),("Buenos Aires");

#-----------------------------------------------
select * from temporada;
update temporada set zona_id = 5 where idTemporada =6;

insert into temporada (descripcion,fecha_desde, fecha_hasta, zona_id) 
values ("Baja",19000621,19000922,6),("Media",19000320,19000621,6),("Alta",19000922,19000320,6);

#("FeriadosX3"),("FeriadosX4"),("FeriadosX5"),("Promociones");

/*Verano: inicia el 21 de diciembre y finaliza el 20 de marzo.

Otoño: inicia el 20 de marzo al 21 de junio.

Invierno: inicia el 21 de junio y finaliza el 22 de septiembre.

Primavera: inicia el 22 de septiembre al 21 de diciembre.*/

#-----------------------------------------------

select * from persona;
insert into persona (nombre,apellido,dni,direccion,telefono,legajo,rol) 
values ("Emiliano","De Vuono",12334567,"Saraza 123",98765432,1,"admin"),("Pablo","Antepazo",7654321,"Saraza 321",23456789,2,"admin"),("Javier","Muratore",1478523,"Saraza 132",96325874,3,"admin"),("test","testt",65475235,"test 132",41758235,4,"user");

#-----------------------------------------------

select * from tarifas;

insert into tarifas (precio,temporada_id,categoria_id) 
values (2650,2,7),(3200,3,7),(2750,2,3),(3700,3,3);

#-----------------------------------------------

select * from reservas;


truncate reservas;

insert	into reservas (fechaDesde,fechaHasta,fechaReserva,cantidadPax,precioTotal, estado, habitacion_id, persona_id) 
values (20210201,20210220,20201225,1,3800,"Pendiente",11,3),(20210101,20210120,20201210,2,7800,"Aprobado",13,6),(20210301,20210320,20210201,3,10800,"Pendiente",16,4),
(20210401,20210420,20210301,4,15800,"Aprobada",17,3),(20210501,20210520,20210401,5,30200,"Anulada",20,2);


#------------------------------------------------

select cat.tipo, c.descripcion from habitaciones h
inner join camas c on c.idCamas = h.camas_id
inner join categoria cat on cat.idCategoria = h.cat_id
where c.idCamas  between 2 and 3;

select h.idHabitacion, cat.tipo, c.descripcion from habitaciones h 
inner join camas c on c.idCamas = h.camas_id
inner join categoria cat on cat.idCategoria = h.cat_id;

select * from habitaciones h
inner join camas c on c.idCamas = h.camas_id
where h.cantPax like '2';
