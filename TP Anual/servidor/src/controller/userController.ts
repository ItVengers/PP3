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
		console.log(result);
		console.log(mail, password);

		if (!result) {
			return res.status(404).json({ message: "Usuario no registrado" });
			//req.flash("error_session", "Usuario Incorrecto");
			//res.redirect("./error");
		}
		if (result.contrasenia == password && result.mail == mail) {
			//res.send({ "Bienvenido!": result.nombre }); 
			const token: string = jwt.sign({ _id: result.id }, "secretKey");
			res.status(200).json({ message: "Bienvenido " + result.nombre, token: token });
			return;
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
