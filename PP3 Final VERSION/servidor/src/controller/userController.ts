import { Request, Response } from 'express';
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { transporter } from '../config/mailer'
//import bcrypt from "bcrypt";
class UserController {

	public async cancelarReservaAnticipadamente(req: Request, res: Response) {
        const { reservaID } = req.params;
        console.log(reservaID);

        const actualizarEstadoReserva = await userModel.actualizarReservaxCancelacion_Usuario(reservaID);

        //console.log(actualizarEstadoReserva);
        return res.json(actualizarEstadoReserva);
    }

	public async listarcategorias(req: Request, res: Response) {
		const{hotel, temporada} = req.body;
		const categorias = await userModel.listarCategorias(hotel, temporada);
		console.log(categorias);
		return res.json(categorias);
	}

	public async listartemporadas(req: Request, res: Response) {
		const temporadas = await userModel.listarTemporadas();
		console.log(temporadas);
		return res.json(temporadas);
	}

	public async listarUsuario(req: Request, res: Response) {
		console.log(req.params.id);
		const { id } = req.params;
		console.log(id);
		const result = await userModel.listarDatosUsuario(id);
		console.log(result.mail);
		res.status(200).json(result);
		return;
	}

	public async listarhoteles(req: Request, res: Response) {
		console.log(req.body);
		const hoteles = await userModel.listarhoteles();
		console.log(hoteles);
		return res.json(hoteles);
	}


	public async buscarID(req: Request, res: Response) {
		console.log("ENTRE AL METODO BUSCARID");
		const { desc } = req.params;
		console.log(desc);
		const id = await userModel.buscarID(desc);
		console.log("SALI DEL METODO BUSCARID");
		console.log(id)
		return res.status(200).json(id);

	}

	public async buscarFecha(req: Request, res: Response) {
		console.log("ENTRE AL METODO BUSCARFECHA");
		const { fecha } = req.params;
		console.log(fecha);
		const date = await userModel.buscarFecha(fecha);
		console.log(date);
		console.log("SALI DEL METODO BUSCARID");
		res.status(200).json(date);
		return;
	}


	public async modificarDatosUsuario(req: Request, res: Response) {
		console.log(req.body);
		const { idPersona, nombre, apellido, dni, telefono, mail, contrasenia } = req.body;
		const result = await userModel.modificarDatos(idPersona, nombre, apellido, dni, telefono, mail, contrasenia);
		res.status(200).json({ message: "DATOS ACTUALIZADOS!!" });
		return;
	}

	public signin(req: Request, res: Response) {
		console.log(req.body);
		res.render("partials/signinForm");
	}
	public async login(req: Request, res: Response) {
		const { mail, password } = req.body;
		const result = await userModel.buscarUsuario(mail);
		//console.log(result.idPersona);
		console.log(mail, password);


		if (!result) {
			return res.status(404).json({ message: "Usuario no registrado" });
			//req.flash("error_session", "Usuario Incorrecto");
			//res.redirect("./error");
		}
		else {
			// const checkPassword = await userModel.validarPassword(password, result.contrasenia);
			if (result.contrasenia == password && result.mail == mail) {
				// if (checkPassword == password && result.mail == mail) {

				//req.session.user = result;
				//req.session.auth = true;

				if (result?.rol == 'admin') {
					//req.session.admin = true;
					//res.redirect("../admin/home");
					const token: string = jwt.sign({ _id: result.id }, "secretKey");
					res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol: result.rol, idPersona: result.idPersona });
					return;
				}
				else {
					//req.session.admin = false;
					const token: string = jwt.sign({ _id: result.id }, "secretKey");
					res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol: result.rol, idPersona: result.idPersona });
					return;
				}

			}
			if (result.contrasenia != password || result.mail != mail) {
				//return res.status(404).json({ message: "Usuario no registrado" });
				return res.status(403).json({ message: "Usuario y/o contrase??a incorrectos" });

				//res.send("No estas registrado");
			}
		}
		//res.status(403).json({ message: "Usuario y/o contrase??a incorrectos" });
	}

	public signup(req: Request, res: Response) {
		console.log(req.body);
		res.render("partials/signupForm");
	}

	public async addUser(req: Request, res: Response) {
		const datos = req.body;
		delete datos.repassword;

		const patronNombre = /^[A-Z][A-Za-z]{3,14}$/;
		const patronApellido = /^[A-Z][A-Za-z]{3,14}$/;
		const patronPass = /^[A-Z][A-Za-z0-9]{6,20}$/;
		const patronEmail = /[a-z0-9]{1,14}@[a-z0-9]{1,10}.[a-z]{2,3}/;
		const patronDNI = /^[0-9]{7,9}$/;
		const patronTelefono = /^[0-9]{8,10}$/;

		//MAIL
		if (datos.mail.length == 0) {
			res.status(403).json({ message: "No ha ingresado ningun MAIL!!" });
		}
		if (datos.mail.length > 27) {
			res.status(403).json({ message: "Excedi?? el limite maximo(27) de caracteres para el campo MAIL!!" });
		}
		if (datos.mail.length < 6) {
			res.status(403).json({ message: "El mail debe de contener entre 6 caracteres como minimo!!" });
		}
		if (!patronEmail.test(datos.mail)) {
			res.status(403).json({ message: "Mail invalido, debe ser example@dominio.com" });
		}
		//FUNCIONAN LAS VALIDACIONES
		// FIN MAIL


		//CONTRASE??A
		if (datos.contrasenia.length == 0) {
			res.status(403).json({ message: "No ha ingresado ninguna CONTRASE??A!!" });
		}
		if (datos.contrasenia.length > 20) {
			res.status(403).json({ message: "Excedi?? el limite maximo (20) de caracteres para el campo CONTRASE??A!!" });
		}
		if (datos.contrasenia.length < 6) {
			res.status(403).json({ message: "La contrase??a debe de contener entre 6 y 20 caracteres!!" });
		}
		if (!patronPass.test(datos.contrasenia)) {
			res.status(403).json({
				message: "Contrase??a invalida, debe debe ser alfanumerica y contener mayusculas."
			});
		}
		//FUNCIONAN LAS VALIDACIONES
		// FIN CONTRASE??A


		//NOMBRE
		if (datos.nombre.length == 0) {
			res.status(403).json({
				error: "No ha ingresado ningun nombre!!"
			});
		}
		if (datos.nombre.length > 14) {
			res.status(403).json({
				error: "Excedi?? el limite maximo (14) de caracteres para el campo NOMBRE!!"
			});
		}
		if (datos.nombre.length < 3) {
			res.status(403).json({
				error: "Nombre invalido, debe contener entre 3 y 14 caracteres!!"
			});
		}
		if (!patronNombre.test(datos.nombre)) {
			res.status(403).json({
				error: "Nombre invalido, debe comenzar con mayuscula y no poseer numeros."
			});
		}
		//FUNCIONAN LAS VALIDACIONES		
		// FIN NOMBRE


		//APELLIDO
		if (datos.apellido.length == 0) {
			res.status(403).json({
				error: "No ha ingresado ningun apellido!!"
			});
		}
		if (datos.apellido.length > 14) {
			res.status(403).json({
				error: "Excedi?? el limite maximo (14) de caracteres para el campo APELLIDO!!"
			});
		}
		if (datos.apellido.length < 3) {
			res.status(403).json({
				error: "Apellido invalido, debe contener entre 3 y 14 caracteres!!"
			});
		}
		if (!patronApellido.test(datos.apellido)) {
			res.status(403).json({
				error: "Apellido invalido, debe comenzar con mayuscula y no poseer numeros."
			});
		}
		//FUNCIONAN LAS VALIDACIONES		
		// FIN APELLIDO


		//DNI
		if (datos.dni.length == 0) {
			res.status(403).json({
				error: "No ha ingresado ningun DNI!!"
			});
		}
		if (datos.dni.length > 10) {
			res.status(403).json({
				error: "Excedi?? el limite maximo (8) de digitos para el campo DNI!!"
			});
		}
		if (datos.dni.length < 8) {
			res.status(403).json({
				error: "DNI invalido, debe contener entre 7 y 8 digitos!!"
			});
		}
		if (!patronDNI.test(datos.dni)) {
			res.status(403).json({
				error: "DNI invalido, debe contener solo numeros, sin puntos ni espacios."
			});
		}
		//FUNCIONAN LAS VALIDACIONES
		// FIN DNI


		//TELEFONO
		if (datos.telefono.length == 0) {
			res.status(403).json({
				error: "No ha ingresado ningun telefono!!"
			});
		}
		if (datos.telefono.length > 9) {
			res.status(403).json({
				error: "Excedi?? el limite maximo (10) de digitos para el campo TELEFONO!!"
			});
		}
		if (datos.telefono.length < 7) {
			res.status(403).json({
				error: "Telefono invalido, debe contener entre 8 y 10 digitos!!"
			});
		}
		if (!patronTelefono.test(datos.telefono)) {
			res.status(403).json({
				error: "Telefono invalido, debe contener solo numeros, sin guiones ni espacios."
			});
		}
		// FIN TELEFONO

		const resultado = await userModel.buscarUsuario(datos.mail);
		// datos.contrasenia = await userModel.encriptPass(datos.contrasenia);
		if (!resultado) {
			datos.rol = 'user'
			datos.legajo = 0;
			await userModel.crearUsuario(datos);
			// // try {
			// // 	await transporter.sendMail({
			// // 		from: '"SISRO Hoteles ????" <info@sisrohoteles.com>',
			// // 		to: datos.mail,
			// // 		subject: 'Registro en SISRO exitoso!!',
			// // 		html: `Hola ${datos.nombre}, ??gracias por utilizar SISRO Hoteles! <button href="http://localhost:4200"> SISRO Hoteles </a>`
			// // 	}); // ya pod??s ingresar a nuestro sitio clickeando el siguiente enlace:

			// // }
			// // catch (err) {
			// // 	console.log("error: ", err)
			// // }


			res.status(200).json({
				message: 'Usuario Registrado!',
			});

			res.status(403).json({ message: 'Pase pase' });

		}
		res.status(403).json({ message: 'Error, ya existe el usuario' });
	}
}
// -------------------------------

const userController = new UserController();
export default userController;
