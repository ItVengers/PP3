import { createPool } from 'mysql2/promise';
import { ObjectTypeDeclaration } from 'typescript';

class HabitacionesModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	// async config() {//Parametro de conexion con la BD.
	//     this.db = await createPool({
	// 		host: 'remotemysql.com',
	// 		user: '868JNygZMY',
	// 		password: 'vsXA45H28F',
	// 		database: '868JNygZMY',
	// 		connectionLimit: 10
	//     });
	// }

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: '127.0.0.1',
			user: 'root',
			password: '',
			database: 'dbhoteles',
			connectionLimit: 10
		});
	}

	async listarhabitaciones(fechaIngreso: string, fechaEgreso: string, personas: number, hotel: string, fechaingresoAcortada: string) {
		const habitaciones = await this.db.query('select h.idHabitacion, ht.descripcion, h.estado, c.descripcion, t.precio from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = c.idCategoria inner join hoteles ht  on ht.idHotel = c.hotel_id where ((h.estado = 1 or (h.estado = 2 and (h.checkIn >= ? or h.checkOut <= ?))) and h.idHabitacion not in (select r.habitacion_id  from reservas r  inner join estado e on e.idEstado = r.estado_id  inner join habitaciones h on h.idHabitacion = r.habitacion_id  where ((r.checkIn <= ? and r.checkOut > ?) or (r.checkIn <= ? and r.checkOut > ?)) and (e.codigo = "PEN" or e.codigo = "NOD" or h.estado = 6) or r.checkIn between ? and ?  and e.codigo <> "FIN" )) and t.temporada_id = (select distinct idTemporada from temporada temp inner join tarifas tar on tar.temporada_id = temp.idTemporada where temp.fecha_desde <= ? and temp.fecha_hasta >= ?) and c.pasajeros = ? and ht.idHotel = ?;', [fechaIngreso, fechaIngreso, fechaIngreso, fechaIngreso, fechaEgreso, fechaEgreso, fechaIngreso, fechaEgreso, fechaingresoAcortada, fechaingresoAcortada, personas, hotel]);
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}

	async crearReserva(fechaIngreso: string, fechaEgreso: string, fechaReserva: string, habitacion_id: string, estado: number, precio: number, idPersona: number) {
		const habitaciones = await this.db.query('INSERT INTO RESERVAS(checkIn, checkOut, fechaReserva, precioTotal, estado_id, habitacion_id, persona_id) VALUES(?,?,?,?,?,?,?)', [fechaIngreso, fechaEgreso, fechaReserva, precio, estado, habitacion_id, idPersona]);
		return habitaciones[0];
	}

	async buscarReservasxUsuario(idPersona: string) {
		const habitaciones = await this.db.query('SELECT r.idReserva, r.checkIn, r.checkOut, r.fechaReserva, r.precioTotal, e.descripcion, r.habitacion_id FROM RESERVAS r inner join estado e on e.idEstado = r.estado_id WHERE persona_id = ?', [idPersona]);
		return habitaciones[0];
	}

	// ADMIN FUNCIONES -----------------

}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;