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

	async listarhabitaciones(fechaIngreso: string, fechaEgreso: string, personas: number) {
		//const habitaciones = await this.db.query('select h.idHabitacion, h.checkIn, h.checkOut, h.estado, c.descripcion, t.precio from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = c.idCategoria where h.idHabitacion not in (select r.habitacion_id from reservas r inner join estado e on e.idEstado = r.estado_id where e.codigo = "PEN");');
		//const habitaciones = await this.db.query("CALL BusquedaHabitacionesDisponibles(?,?,?)",  [personas, fechaIngreso, fechaEgreso]);
		const habitaciones = await this.db.query('select h.idHabitacion, h.estado, c.descripcion, c.pasajeros, t.precio from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = c.idCategoria where h.idHabitacion not in (select r.habitacion_id from reservas r inner join estado e on e.idEstado = r.estado_id  where ((r.checkIn <= ? and r.checkOut > ?) or (r.checkIn <= ? and r.checkOut > ?)) AND (e.codigo = "PEN" OR e.codigo = "NOD")) and c.pasajeros = ?;', [fechaIngreso, fechaIngreso, fechaEgreso, fechaEgreso, personas]);
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}

	async crearReserva(fechaIngreso: string, fechaEgreso: string, fechaReserva: string, habitacion_id: string, estado: number, precio: number, idPersona: number) {
		const habitaciones = await this.db.query('INSERT INTO RESERVAS(checkIn, checkOut, fechaReserva, precioTotal, estado_id, habitacion_id, persona_id) VALUES(?,?,?,?,?,?,?)', [fechaIngreso, fechaEgreso, fechaReserva, precio, estado, habitacion_id, idPersona]);
		return habitaciones[0];
	}

	// ADMIN FUNCIONES -----------------

}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;