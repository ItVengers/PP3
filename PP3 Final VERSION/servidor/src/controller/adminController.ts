import { Request, Response } from 'express';
import userModel from "../models/userModel";

class AdminController {


    public async buscarReserva(req: Request, res: Response) {
        console.log("METODO BUSCAR RESERVA:");

        
        const {habNo, fechain, fechaE} = req.body;

        console.log(habNo, fechain, fechaE);

        const reservaID = await userModel.buscarIdReserva(habNo, fechain, fechaE);

        console.log("Reserva nro:" + reservaID);

        const habitaciones = await userModel.cambiarEstadoAlCancelar(habNo);

        console.log(reservaID);
        return res.json(reservaID);
    }

    public async cancelarReservaAnticipadamente(req: Request, res: Response) {
        const {reservaID} = req.params;

        const actualizarEstadoReserva = await userModel.actualizarEstado_CO(reservaID);

        //console.log(actualizarEstadoReserva);
        return res.json(actualizarEstadoReserva);
    }





    public async habilitarHabitacion(req: Request, res: Response) {

        const {nroHab} = req.params;
        const habitaciones = await userModel.habilitarHabitacion(nroHab);
        //console.log(habitaciones);
        return res.json(habitaciones);
    }


    public async bloquearHabitacion(req: Request, res: Response) {

        const {nroHab} = req.params;
        const habitaciones = await userModel.bloquearHabitacion(nroHab);
        //console.log(habitaciones);
        return res.json(habitaciones);
    }

    public async verHabitaciones(req: Request, res: Response) {

        const habitaciones = await userModel.verHabitaciones();
        //console.log(habitaciones);
        return res.json(habitaciones);
    }

    public async checkOut(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.header("Authorization"));
        const { id } = req.params;

        const checkOut = await userModel.checkOut(id);

        const actualizarEstadoHabitacion = await userModel.actualizarEstado_CO(id);


        console.log(actualizarEstadoHabitacion);
        return res.json(actualizarEstadoHabitacion);
    }

    public async reservasConfirmadas(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.header("Authorization"));
        const reservasConfirmadas = await userModel.reservasConfirmadas();
        console.log(reservasConfirmadas);
        return res.json(reservasConfirmadas);
    }


    public async verificacionReserva(req: Request, res: Response) {
        console.log(req.body);
        //console.log(req.header("Authorization"));
        const { id } = req.params;

        const verificacionReserva = await userModel.verificacion(id);

        const actualizarEstadoHabitacion = await userModel.actualizarEstado(id);


        console.log(actualizarEstadoHabitacion);
        return res.json(actualizarEstadoHabitacion);
    }

    public async reservasPendientes(req: Request, res: Response) {
        // if (!req.session.auth) {
        //     req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
        //     res.redirect("./error");
        //     //res.redirect("/");
        // }
        console.log(req.body);
        console.log(req.header("Authorization"));
        const reservasPendientes = await userModel.reservasPendientes();
        console.log(reservasPendientes);
        return res.json(reservasPendientes);
    }

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

    public async listarReservas(req: Request, res: Response) {
        const result = await userModel.listarReservas();
        console.log(result);
        return res.json(result);
    }
    public async listarUsuarios(req: Request, res: Response) {
        const result = await userModel.listarUsuarios();
        console.log(result);
        return res.json(result);
    }
    public async listarHabitaciones(req: Request, res: Response) {
        const result = await userModel.listarhabitaciones();
        console.log(result);
        return res.json(result);
    }
    public async datosReservas(req: Request, res: Response) {
        const { idReserva } = req.params;
        console.log(idReserva);
        const result = await userModel.datosReserva(idReserva);
        console.log(result);
        return res.status(200).json(result);
    }
}

const adminController = new AdminController();
export default adminController;