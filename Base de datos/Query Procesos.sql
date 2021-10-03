SELECT numeroHabitacion FROM habitaciones WHERE habitaciones.estado = 2 AND checkOut <= checkIn
UNION
SELECT numeroHabitacion FROM habitaciones LEFT JOIN reservas WHERE habitaciones.estado = 1 AND NOT checkIn BETWEEN reservas.checkIn and reservas.checkOut;

select * from habitaciones h 
where  h.estado = 1
and not exists (select * from reservas where reservas between (checkIn ,checkOut)) ;
