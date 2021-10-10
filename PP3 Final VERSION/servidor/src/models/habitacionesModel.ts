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

	async listarhabitaciones() {
		const habitaciones = await this.db.query('(select numeroHabitacion as "Habitaciones Disponibles" from habitaciones where estado = 1) UNION (select h.numeroHabitacion as "Habitaciones Disponibles" from habitaciones h left join reservas r on r.habitacion_id = h. idHabitacion where r.estado_id = 2 and  CURDATE() <= r.checkIn and CURDATE() <= r.checkOut	)');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
	// ADMIN FUNCIONES -----------------

}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;