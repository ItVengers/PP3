import { Router, Request, Response } from 'express';
import adminController from '../controller/adminController';
import { TokenValidation } from '../lib/verifyToken';

class AdminRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => { res.send('Main!!!'); });

        this.router.get("/abmproductos", TokenValidation, adminController.abm);

        this.router.delete("/delete/:id", TokenValidation, adminController.delete);

        this.router.post("/agregar", TokenValidation, adminController.agregar);

        this.router.post("/modificar", TokenValidation, adminController.modificar);

        // ADMIN FUNCIONES

        this.router.get("/reservas", adminController.listarReservas);
        this.router.get("/usuarios", adminController.listarUsuarios);
        this.router.get("/habitaciones", adminController.listarHabitaciones);
        
        this.router.get("/datosreservas/:idReserva", adminController.datosReservas);

        this.router.get("/confirmarreservas", adminController.reservasPendientes);

        this.router.get("/verificacion/:id", adminController.verificacionReserva);

        this.router.get("/reservasconfirmadas", adminController.reservasConfirmadas);

        this.router.get("/checkout/:id", adminController.checkOut);

        this.router.get("/verhabitaciones", adminController.verHabitaciones);


    }
}

const adminRoutes = new AdminRoutes();
export default adminRoutes.router;