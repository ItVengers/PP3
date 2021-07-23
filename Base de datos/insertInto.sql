select * from categoria;

insert into categoria (descripcion,tipo) values ("Individuales","Indibiduales"),("Individuales","Special");
insert into categoria (descripcion,tipo) values ("Dobles","Suite"),("Dobles","Junior Suite"),("Dobles","Gran Suite"),("Dobles","Special");
insert into categoria (descripcion,tipo) values ("Triples","Suite"),("Triples","Junior Suite"),("Triples","Gran Suite"),("Triples","Special");
#----------------------------------------------

select * from habitaciones;

#----------------------------------------------

select * from hoteles;

insert into hoteles (descripcion,ubicacion,zona_id) values ("Hotel Sur Centro","Juan Manuel de Rosas 625",1),("Hotel del Plata","Alberti 9",6),("Hotel Cordoba","Santa Rosa 447",5);

#----------------------------------------------

select * from zonas;

insert into zonas (descripcion) values ("Patagonia"),("Cuyo"),("Norte"),("Litoral"),("Centro"),("Buenos Aires");

#-----------------------------------------------
select * from temporada;

insert into ttemporada (descripcion) values ("Baja"),("Media"),("Alta"),("FeriadosX3"),("FeriadosX4"),("FeriadosX5"),("Promociones");

#-----------------------------------------------

select * from persona;
insert into tpersona (nombre,apellido,dni,direccion,telefono,legajo,rol) values ("Emiliano","De Vuono",12334567,"Saraza 123",98765432,1,"admin"),("Pablo","Antepazo",7654321,"Saraza 321",23456789,2,"admin"),("Javier","Muratore",1478523,"Saraza 132",96325874,3,"admin"),("test","testt",65475235,"test 132",41758235,4,"user");
