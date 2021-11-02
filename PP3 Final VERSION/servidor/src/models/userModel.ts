import { createPool } from 'mysql2/promise';
import  bcryptjs from 'bcryptjs';

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

	// - - encriptación de password
	encriptPass = async(password: string): Promise<string> => {
        const salt = await bcryptjs.genSalt(10);
        return await bcryptjs.hash(password, salt);
    }

	
	validarPassword = async function (password: string, passwordHash: string): Promise<boolean> {		
        return await bcryptjs.compare(password, passwordHash);
    }

	// -- Fin Encriptación

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
	// ADMIN MODELS ----------------
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

	async datosReserva(id:string){
		console.log(id);
		const reservaDato = await this.db.query('SELECT * FROM reservas WHERE idReserva = ?', [id]);
		return reservaDato[0][0];
	}

	
	async reservasPendientes(){
		const reservasPendientes = await this.db.query('select r.idReserva,p.nombre, p.apellido,r.checkIn as Ingreso,r.checkOut as Egreso,r.precioTotal as "Precio_Final",r.habitacion_id, e.descripcion from reservas r inner join estado e on e.idEstado = r.estado_id inner join persona p on p.idPersona = r.persona_id where fechaReserva = curdate() and estado_id = 4');
		return reservasPendientes[0];
	}

	async verificacion(id: string){
		const verificacion = await this.db.query('update reservas set estado_id = 2 where idreserva = ?', [id]);
		return verificacion[0];
	}

	async actualizarEstado(id: string){
		const actualizarEstado = await this.db.query('update habitaciones h inner join reservas r on r.habitacion_id = h.idHabitacion set h.estado = r.estado_id, h.checkIn = r.checkIn, h.checkOut = r.checkOut where r.idReserva = ?;', [id]);
		return actualizarEstado[0];
	}
	
}

const userModel: UserModel = new UserModel();
export default userModel;