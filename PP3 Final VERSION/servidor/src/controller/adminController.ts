import { Request, Response } from 'express';
import userModel from "../models/userModel";

class AdminController {

    public async abm(req: Request, res: Response) {
        // if (!req.session.auth) {
        //     req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
        //     res.redirect("./error");
        //     //res.redirect("/");
        // }
        console.log(req.body);
        console.log(req.header("Authorization"));
        const habitaciones = await userModel.listarhabitaciones();
        console.log(habitaciones);
        return res.json(habitaciones);
    }

    public async delete(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.header("Authorization"));
        const { id } = req.params;
        const habitaciones = await userModel.eliminar(id);
        return res.json({ message: "Se eliminó la habitacion" });
    }

    public async agregar(req: Request, res: Response) {
        const { categoria, descripcion, precio } = req.body;
        console.log(req.body);
        console.log(req.header("Authorization"));
        //const busqueda = await userModel.buscarNombre(descripcion);
        //if (!busqueda) {
        const result = await userModel.crearHabitacion(categoria, descripcion, precio);
        //}
        return res.json({ message: "Se agregó una nueva habitacion" });

    }

    public async modificar(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.header("Authorization"));
        const { idH, categoria, descripcion, precio } = req.body;
        const result = await userModel.actualizar(idH, categoria, descripcion, precio);
        return res.json({ message: "Se actualizó la habitacion" });

    }
}


const adminController = new AdminController();
export default adminController;