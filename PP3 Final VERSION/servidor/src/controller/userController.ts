import { Request, Response } from 'express';
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
class UserController {

	public signin(req: Request, res: Response) {
		console.log(req.body);
		res.render("partials/signinForm");
	}
	public async login(req: Request, res: Response) {
		const { mail, password } = req.body;
		const result = await userModel.buscarUsuario(mail);
		console.log(result.idPersona);
		console.log(mail, password);

		if (!result) {
			return res.status(404).json({ message: "Usuario no registrado" });
			//req.flash("error_session", "Usuario Incorrecto");
			//res.redirect("./error");
		}
		if (result.contrasenia == password && result.mail == mail) {
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
			return res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });

			//res.send("No estas registrado");
		}
		//res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
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
			res.status(403).json({ message: "Excedió el limite maximo(27) de caracteres para el campo MAIL!!" });
		}
		if (datos.mail.length < 6) {
			res.status(403).json({ message: "El mail debe de contener entre 6 caracteres como minimo!!" });
		}
		if (!patronEmail.test(datos.mail)) {
			res.status(403).json({ message: "Mail invalido, debe ser example@dominio.com" });
		}
		//FUNCIONAN LAS VALIDACIONES
		// FIN MAIL


		//CONTRASEÑA
		if (datos.contrasenia.length == 0) {
			res.status(403).json({ message: "No ha ingresado ninguna CONTRASEÑA!!" });
		}
		if (datos.contrasenia.length > 20) {
			res.status(403).json({ message: "Excedió el limite maximo (20) de caracteres para el campo CONTRASEÑA!!" });
		}
		if (datos.contrasenia.length < 6) {
			res.status(403).json({ message: "La contraseña debe de contener entre 6 y 20 caracteres!!" });
		}
		if (!patronPass.test(datos.contrasenia)) {
			res.status(403).json({
				message: "Contraseña invalida, debe debe ser alfanumerica y contener mayusculas."
			});
		}
		//FUNCIONAN LAS VALIDACIONES
		// FIN CONTRASEÑA


		//NOMBRE
		if (datos.nombre.length == 0) {
			res.status(403).json({
				error: "No ha ingresado ningun nombre!!"
			});
		}
		if (datos.nombre.length > 14) {
			res.status(403).json({
				error: "Excedió el limite maximo (14) de caracteres para el campo NOMBRE!!"
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
				error: "Excedió el limite maximo (14) de caracteres para el campo APELLIDO!!"
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
				error: "Excedió el limite maximo (8) de digitos para el campo DNI!!"
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
				error: "Excedió el limite maximo (10) de digitos para el campo TELEFONO!!"
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
		if (!resultado) {
			datos.rol = 'user'
			await userModel.crearUsuario(datos);

			res.status(200).json({
				message: 'Usuario Registrado!',
			});
		}
		res.status(403).json({ message: 'Error, ya existe el usuario' });
	}
}

const userController = new UserController();
export default userController;
