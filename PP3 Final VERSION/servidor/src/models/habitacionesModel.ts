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
		const habitaciones = await this.db.query('select h.idHabitacion, cat.tipo, c.descripcion from habitaciones h inner join camas c on c.idCamas = h.camas_id inner join categoria cat on cat.idCategoria = h.cat_id');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
	
}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;