export interface Usuario{
	idReserva?: number;
	fechaDesde?: Date;
	fechaHasta?: Date;
	fechaReserva?: Date;
	cantidadPax?: number;
	precioTotal?: number;
	estado?: string;
	habitacion_id?: number;
	persona_id?: number;
}

//Todos los atributos los declaramos como opcionales para dar flexibilidad.