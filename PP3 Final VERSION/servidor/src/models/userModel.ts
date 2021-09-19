import { createPool } from 'mysql2/promise';

class UserModel {
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



	async buscarUsuario(mail: string) {
		const encontrado: any = await this.db.query('SELECT * FROM persona WHERE mail = ?', [mail]);
		//Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
		if (encontrado.length > 1)
			return encontrado[0][0];
		return null;
	}

	async crearUsuario(persona: object) {
		const result: any = (await this.db.query('INSERT INTO persona SET ?', [persona]))[0].affectedRows;
		console.log(result);
		return result;
	}
	async crear(usuario: object) {
		const result = (await this.db.query('INSERT INTO persona SET ?', [usuario]))[0].affectedRows;
		console.log(result);
		return result;
	}

	async eliminar(id: string) {
		const art = (await this.db.query('DELETE FROM habitaciones WHERE idH = ?', [id]))[0].affectedRows;
		return art;
	}

	// async buscarNombre(descripcion: string) {
	//     const encontrado: any = await this.db.query('SELECT * FROM habitaciones WHERE descripcion = ?', [descripcion]);
	//     if (encontrado.length > 1)
	//         return encontrado[0][0];
	//     return null;
	// }

	async crearHabitacion(categoria: string, descripcion: string, precio: number) {
		const result = (await this.db.query("INSERT INTO habitaciones (categoria, descripcion, precio) values(?, ?, ?)", [categoria, descripcion, precio]))[0].affectedRows;
		console.log(result);
		return result;
	}

	async actualizar(id: string, categoria: string, descripcion: string, precio: number) {
		const result = (await this.db.query('UPDATE habitaciones SET categoria = ?,descripcion = ?, precio = ?  WHERE idH = ?', [categoria, descripcion, precio, id]))[0].affectedRows;
		console.log(result);
		return result;
	}
	// ----------------------------



	async modificarDatos(id: string, nombre: string, apellido: string, dni: string, telefono: string, mail: string, contrasenia: string,) {
		const result = (await this.db.query('UPDATE persona SET nombre = ?, apellido = ?,dni = ?, telefono = ?,	mail= ?, contrasenia= ?  WHERE idPersona = ?',
			[nombre, apellido, dni, telefono, mail, contrasenia, id]))[0].affectedRows;
		console.log(result);
		return result;
	}
	async listarDatosUsuario(id: string) {
		const persona = (await this.db.query('SELECT * FROM persona WHERE idPersona = ?', [id]));
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return persona[0][0];
	}

	async listarhoteles() {
		const hoteles = (await this.db.query('SELECT descripcion FROM hoteles'));
		return hoteles[0];
	}

	async buscarID(desc: string) {
		console.log("ENTRE AL USERMODEL");
		console.log(desc);
		const zona = (await this.db.query('SELECT zona_id FROM hoteles WHERE descripcion = ?', [desc]));
		if (zona.length >= 1) {
			console.log("SALI DEL USERMODEL");
			return zona[0][0];
		}
		return "VACIO";

	}

	async buscarFecha(date: string) {
		console.log("ENTRE AL USERMODEL");
		console.log(date);
		const fecha = (await this.db.query('SELECT zona_id FROM hoteles WHERE descripcion = ?', [date]));
		if (fecha.length >= 1) {
			console.log("SALI DEL USERMODEL");
			return fecha[0][0];
		}
		return "VACIO";
	}

	//--------------
	// ADMIN MODELS
	//--------------

	async listarReservas() {
		const reservas = await this.db.query('SELECT * FROM reservas');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return reservas[0];
	}
	async listarUsuarios() {
		const reservas = await this.db.query('SELECT * FROM persona');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return reservas[0];
	}

	async listarhabitaciones() {
		const habitaciones = await this.db.query('SELECT * FROM habitaciones');
		//console.log(usuarios[0]);
		//devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
		return habitaciones[0];
	}
}

const userModel: UserModel = new UserModel();
export default userModel;