
import { Router, Request, Response } from 'express';
import userController from '../controller/userController';


class UserRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', (req: Request, res: Response) => {
			res.send('Main users!!!');
			//res.render("partials/principal");
		});
		this.router.get('/signin', userController.signin);
		this.router.post('/signin', userController.login);

		this.router.get('/signup', userController.signup);
		this.router.post('/signup', userController.addUser);

		this.router.get('/misdatos/:id', userController.listarUsuario);
		this.router.post('/modificardatos', userController.modificarDatosUsuario);

		this.router.get('/listarhoteles', userController.listarhoteles);
		this.router.get('/buscarId/:desc', userController.buscarID)
		this.router.get('/buscarFecha/:fecha', userController.buscarFecha)

		

	}

}

//Exportamos el enrutador con 

const userRoutes = new UserRoutes();
export default userRoutes.router;