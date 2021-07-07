import { Router, Request, Response } from 'express';
import comentarioController from '../controller/comentarioController';
import { TokenValidation } from '../lib/verifyToken';

class ComentarioRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            //res.send('Main!!!');
            //se pone antes de cargar la primera ruta, para inicializar las variables de sesiones.
            req.session.auth = false;
            req.session.user = {};
            //res.render("partials/principal");
        });

        this.router.get('/list', TokenValidation, comentarioController.list);
        this.router.get('/find/:id', TokenValidation, comentarioController.find);
        this.router.post('/create', TokenValidation, comentarioController.create);
        this.router.delete('/delete/:id', TokenValidation, comentarioController.delete);
        this.router.get('/ordenar', TokenValidation, comentarioController.ordenar);

    }
}


const comentarioRoutes = new ComentarioRoutes();
export default comentarioRoutes.router;