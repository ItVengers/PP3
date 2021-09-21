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
		const habitaciones = await this.db.query('select h.idHabitacion, cat.tipo, c.descripcion, t.precio from habitaciones h inner join camas c on c.idCamas = h.camas_id inner join categoria cat on cat.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = cat.idCategoria ');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
	// ADMIN FUNCIONES -----------------

}

const habitacionesModel: HabitacionesModel = new HabitacionesModel();
export default habitacionesModel;