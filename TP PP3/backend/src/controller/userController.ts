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
		const patronEmail = /[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}/;
		const patronDNI = /^[0-9]{7,9}$/;
		const patronTelefono = /^[0-9]{8,10}$/;
		
		if (!patronEmail.test(datos.mail)) {
			res.status(403).json({ message: "Mail invalido" });
		}
		if (!patronPass.test(datos.contrasenia)) {
			res.status(403).json({ message: "Contraseña invalida" });
		}
		if (!patronNombre.test(datos.nombre)) {
			res.status(403).json({ message: "Nombre invalido" });
		}
		if (!patronApellido.test(datos.apellido)) {
			res.status(403).json({ message: "Apellido invalido" });
		}
		if (!patronDNI.test(datos.dni)) {
			res.status(403).json({ message: "DNI deberia ser numerico sin puntos!!" });
		}
		if (!patronTelefono.test(datos.telefono)) {
			res.status(403).json({ message: "Telefono invalido" });
		}
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
