import { Request, Response } from 'express';
import userModel from "../models/userModel";

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
			res.status(200).json({ message: "Bienvenido " + result.nombre });
			return;
		}
		if (result.contrasenia != password || result.mail != mail) {
			//return res.status(404).json({ message: "Usuario no registrado" });
			return res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });

			//res.send("No estas registrado");
		}
		//res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });

	}


}

const userController = new UserController();
export default userController;
