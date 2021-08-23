import { createPool } from 'mysql2/promise';
import { ObjectTypeDeclaration } from 'typescript';

class HabitacionesModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'remotemysql.com',
			user: '868JNygZMY',
			password: 'HOP6t1Lq7X',
			database: '868JNygZMY',
			connectionLimit: 10
		});
	}
	async listarhabitaciones() {
		const habitaciones = await this.db.query('SELECT * FROM habitaciones');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
	async prueba() {
		const habitaciones = await this.db.query('SELECT id_Habitacion, cat_id, camas_id FROM habitaciones');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;