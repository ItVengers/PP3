import { Request, Response } from 'express';
import userModel from "../models/userModel";

class AdminController {


    public async aplicarAjuste(req: Request, res: Response) {

        const { categoria, hotel, ajuste, temporada } = req.body;

        const ID = await userModel.aplicarAjuste(categoria, hotel, ajuste, temporada);
        
        // const ID = await userModel.buscarIdTarifa(categoria, hotel, temporada);
        // console.log(ID);

        // let precio = ID + (ID * ajuste);

        // console.log(precio);

        return res.json({ message: "Se modifico satisfactoriamente el precio!" });
    }

    public async buscarReserva(req: Request, res: Response) {
        console.log("METODO BUSCAR RESERVA:");

        const { habNo, fechain, fechaE } = req.body;

        console.log(habNo, fechain, fechaE);

        const reservaID = await userModel.buscarIdReserva(habNo, fechain, fechaE);

        console.log("Reserva nro:" + reservaID);

        const habitaciones = await userModel.cambiarEstadoAlCancelar(habNo);

        console.log(reservaID);
        return res.json(reservaID);
    }

    public async cancelarReservaAnticipadamente(req: Request, res: Response) {
        const { reservaID } = req.params;
        console.log(reservaID);

        const actualizarEstadoReserva = await userModel.actualizarReservaxCancelacion(reservaID);

        //console.log(actualizarEstadoReserva);
        return res.json(actualizarEstadoReserva);
    }

    public async habilitarHabitacion(req: Request, res: Response) {
        const { nroHabitacion, nroHot } = req.body;
        const habitaciones = await userModel.habilitarHabitacion(nroHabitacion, nroHot);
        //console.log(habitaciones);
        return res.json(habitaciones);
    }


    public async bloquearHabitacion(req: Request, res: Response) {
        const { nroHabitacion, nroHot } = req.body;
        // const {nroHab} = req.params;
        const habitaciones = await userModel.bloquearHabitacion(nroHabitacion, nroHot);
        //console.log(habitaciones);
        return res.json(habitaciones);
    }

    public async verHabitaciones(req: Request, res: Response) {
        const { hotel_id } = req.params;
        const habitaciones = await userModel.verHabitaciones(hotel_id);
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
        return res.json({ message: "Se elimin?? la habitacion" });
    }

    public async agregar(req: Request, res: Response) {
        const { categoria, descripcion, precio } = req.body;
        console.log(req.body);
        console.log(req.header("Authorization"));
        //const busqueda = await userModel.buscarNombre(descripcion);
        //if (!busqueda) {
        const result = await userModel.crearHabitacion(categoria, descripcion, precio);
        //}
        return res.json({ message: "Se agreg?? una nueva habitacion" });

    }

    public async modificar(req: Request, res: Response) {
        console.log(req.body);
        console.log(req.header("Authorization"));
        const { idH, categoria, descripcion, precio } = req.body;
        const result = await userModel.actualizar(idH, categoria, descripcion, precio);
        return res.json({ message: "Se actualiz?? la habitacion" });

    }

    public async listarReservas(req: Request, res: Response) {
        const{id} = req.params;
        const result = await userModel.listarReservas(id);
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