
import { Router, Request, Response } from 'express';
import habitacionesController from '../controller/habitacionesController';
import { TokenValidation } from '../lib/verifyToken';


class HabitacionesRoutes {
	public router: Router = Router();
	constructor() {
		this.config();
	}
	config(): void {
		this.router.get('/', (req: Request, res: Response) => {
			res.send('habitaciones!!!');
			//res.render("partials/principal");
		});
		this.router.post('/listarhabitaciones', habitacionesController.habitacionesC);
		// this.router.post('/listarhabitaciones',TokenValidation,habitacionesController.habitacionesC);
		this.router.post('/crearreserva', habitacionesController.crearReserva);

		this.router.get('/buscarreservas/:IdPersona', habitacionesController.buscarReservasXUsuario);


	}
}

//Exportamos el enrutador con 

const habitacionesRouter = new HabitacionesRoutes();
export default habitacionesRouter.router;

