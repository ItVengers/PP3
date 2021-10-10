#MUESTRA HABITACIONES DISPONIBLES TABLA HABITACIONES

select numeroHabitacion as "Habitaciones Disponibles" from habitaciones where estado = 1;

#-------------------------

(select numeroHabitacion as "Habitaciones Disponibles" from habitaciones where estado = 1)
UNION
(select h.numeroHabitacion as "Habitaciones Disponibles" from habitaciones h
left join reservas r on r.habitacion_id = h. idHabitacion
where r.estado_id = 2 
and  '' >= r.checkIn 
and '20211012' >= r.checkOut 
);

#-----------------------------------------
(select numeroHabitacion as "Habitaciones Disponibles" from habitaciones where estado = 1)
UNION
(select h.numeroHabitacion as "Habitaciones Disponibles" from habitaciones h
left join reservas r on r.habitacion_id = h. idHabitacion
where r.estado_id = 2 
and  CURDATE() >= r.checkIn 
and CURDATE() >= r.checkOut 
);







#----------------------------------------------------------------------------------------------------



#----------------------------------------------------------------------------------------------------

select * from reservas;
select * from habitaciones;
