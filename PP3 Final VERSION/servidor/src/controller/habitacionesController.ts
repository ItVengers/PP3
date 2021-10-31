import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { transporter } from '../config/mailer';
import habitacionesModel from '../models/habitacionesModel';
import userModel from '../models/userModel';
//import bcrypt from "bcrypt";
class HabitacionesController {

	public async buscarReservasXUsuario(req: Request, res: Response) {
		console.log("ESTOY EN EL METODO DEL BACKEND")
		const { IdPersona } = req.params;
		console.log(IdPersona)
		const result = await habitacionesModel.buscarReservasxUsuario(IdPersona);
		//console.log(result.idPersona);
		console.log(result);
		return res.json(result);

	}



	public async habitacionesC(req: Request, res: Response) {
		console.log("ESTOY EN EL METODO DEL BACKEND")
		const { fechaIngreso, fechaEgreso, cantPersona } = req.body;

		const result = await habitacionesModel.listarhabitaciones(fechaIngreso, fechaEgreso, cantPersona);
		//console.log(result.idPersona);
		console.log(result);
		return res.json(result);

	}

	public async crearReserva(req: Request, res: Response) {
		const { fecCheckIn, fecCheckOut, fecReserva, habId, precio, status, perId } = req.body;
		const result = await habitacionesModel.crearReserva(fecCheckIn, fecCheckOut, fecReserva, habId, status, precio, perId);
		console.log(result);
		res.status(200).json({ message: "RESERVA HECHA!!" });
		try {
			await transporter.sendMail({
				from: '"SISRO Hoteles 👻" <info@sisrohoteles.com>',
				to: "mail@prueba.com", //iría un user.mail, para que tome el mail del usuario
				// donde dice {result.nombre} iría la variable que toma el nombre del usuario, anteponiendo un $, quedaría ${result.nombre}
				subject: 'Solicitud de reserva exitosa',
				html: `Hola {result.nombre}, ¡tu solicitud de reserva fue confirmada! <br>
		Para terminar con tu reserva es necesaria una seña por el 50% <br>
		<br>
		Datos Reserva: <br>
		Fecha de reserva: ${result.fecReserva}<br>
		Fecha de Check In: ${result.fecCheckIn}<br>
		Fecha de Check Out: ${result.fecCheckOut}<br>
		Identificador de habitación: ${result.habId}<br>
		Status: ${result.status}<br>
		Precio por noche: ${result.precio}<br>
		PerId: ${result.perId} <br>
		<br>
		¿Como realizar la seña? <br>
		La seña se puede realizar por medio de transferencia bancaria o deposito <br>
		 (para Mercado Pago solicitar un enlace por mail) <br>
		Datos Bancarios:<br>
		CBU: 0002514839965489621<br>
		ALIAS: CESAR.OKEY.SUEÑO<br>
		Nombre: Elena Garqueta<br>
		Banco Galicia<br>
		<br>
		Al realizar la seña, enviar un comprobante al mail reservas@sisrohoteles.com.ar<br>
		Recibirá la confirmación de la recepción dentro de las 48hs de haber enviado la misma.<br>
		<br>
		ATENCIÓN<br>
		Sino se realiza la reserva en las próximas 72hs el Hotel <br>
		puede tomar la libertad de volver a poner la habitación como disponible<br>
		sin consulta previa.<br>

		Ingresa a nuestra Web:<br>
		<button href="http://localhost:4200"> SISRO Hoteles </a>`
			}); // ya podés ingresar a nuestro sitio clickeando el siguiente enlace:

		}
		catch (err) {
			console.log("error: ", err)
		}

	}
}

const habitacionesController = new HabitacionesController();
export default habitacionesController;

// const resultado = await userModel.buscarUsuario(datos.mail);
// datos.contrasenia = await userModel.encriptPass(datos.contrasenia);
// try{
// 	await transporter.sendMail({
// 		from: '"SISRO Hoteles 👻" <info@sisrohoteles.com>',
// 		to:datos.mail,
// 		subject:'Registro en SISRO exitoso!!',
// 		html:`Hola ${datos.nombre}, ¡gracias por utilizar SISRO Hoteles! <button href="http://localhost:4200"> SISRO Hoteles </a>`
// 	}); // ya podés ingresar a nuestro sitio clickeando el siguiente enlace:

// }
// catch(err){
// console.log("error: ",err)
// }

