import { createPool } from 'mysql2/promise';

class UserModel {
	private db: any;
	constructor() {
		this.config(); //aplicamos la conexion con la BD.
	}

	async config() {//Parametro de conexion con la BD.
		this.db = await createPool({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'dbhoteles',
			connectionLimit: 10
		});
	}
    async  buscarUsuario(mail: string) {
		const encontrado: any = await this.db.query('SELECT * FROM persona WHERE mail = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async crearUsuario(persona: object){
		const result: any = (await this.db.query('INSERT INTO persona SET ?', [persona]))[0].affectedRows;
		console.log(result);
		return result;
	}
	async crear(usuario: object) {
		const result = (await this.db.query('INSERT INTO persona SET ?', [usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}
}

const userModel: UserModel = new UserModel();
export default userModel;