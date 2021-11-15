"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
class AdminController {
    aplicarAjuste(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoria, hotel, ajuste, temporada } = req.body;
            console.log(categoria, hotel, ajuste, temporada);
            const ajusteAplicado = yield userModel_1.default.aplicarAjuste(categoria, hotel, ajuste, temporada);
            console.log(ajusteAplicado);
            return res.json({ message: "Se modifico satisfactoriamente el precio!" });
        });
    }
    buscarReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("METODO BUSCAR RESERVA:");
            const { habNo, fechain, fechaE } = req.body;
            console.log(habNo, fechain, fechaE);
            const reservaID = yield userModel_1.default.buscarIdReserva(habNo, fechain, fechaE);
            console.log("Reserva nro:" + reservaID);
            const habitaciones = yield userModel_1.default.cambiarEstadoAlCancelar(habNo);
            console.log(reservaID);
            return res.json(reservaID);
        });
    }
    cancelarReservaAnticipadamente(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reservaID } = req.params;
            console.log(reservaID);
            const actualizarEstadoReserva = yield userModel_1.default.actualizarReservaxCancelacion(reservaID);
            //console.log(actualizarEstadoReserva);
            return res.json(actualizarEstadoReserva);
        });
    }
    habilitarHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nroHab } = req.params;
            const habitaciones = yield userModel_1.default.habilitarHabitacion(nroHab);
            //console.log(habitaciones);
            return res.json(habitaciones);
        });
    }
    bloquearHabitacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nroHab } = req.params;
            const habitaciones = yield userModel_1.default.bloquearHabitacion(nroHab);
            //console.log(habitaciones);
            return res.json(habitaciones);
        });
    }
    verHabitaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield userModel_1.default.verHabitaciones();
            //console.log(habitaciones);
            return res.json(habitaciones);
        });
    }
    checkOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            const { id } = req.params;
            const checkOut = yield userModel_1.default.checkOut(id);
            const actualizarEstadoHabitacion = yield userModel_1.default.actualizarEstado_CO(id);
            console.log(actualizarEstadoHabitacion);
            return res.json(actualizarEstadoHabitacion);
        });
    }
    reservasConfirmadas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            const reservasConfirmadas = yield userModel_1.default.reservasConfirmadas();
            console.log(reservasConfirmadas);
            return res.json(reservasConfirmadas);
        });
    }
    verificacionReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            //console.log(req.header("Authorization"));
            const { id } = req.params;
            const verificacionReserva = yield userModel_1.default.verificacion(id);
            const actualizarEstadoHabitacion = yield userModel_1.default.actualizarEstado(id);
            console.log(actualizarEstadoHabitacion);
            return res.json(actualizarEstadoHabitacion);
        });
    }
    reservasPendientes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!req.session.auth) {
            //     req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            //     res.redirect("./error");
            //     //res.redirect("/");
            // }
            console.log(req.body);
            console.log(req.header("Authorization"));
            const reservasPendientes = yield userModel_1.default.reservasPendientes();
            console.log(reservasPendientes);
            return res.json(reservasPendientes);
        });
    }
    abm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // if (!req.session.auth) {
            //     req.flash("error_session", "Debes iniciar sesion para ver esta seccion");
            //     res.redirect("./error");
            //     //res.redirect("/");
            // }
            console.log(req.body);
            console.log(req.header("Authorization"));
            const habitaciones = yield userModel_1.default.listarhabitaciones();
            console.log(habitaciones);
            return res.json(habitaciones);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            const { id } = req.params;
            const habitaciones = yield userModel_1.default.eliminar(id);
            return res.json({ message: "Se eliminó la habitacion" });
        });
    }
    agregar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoria, descripcion, precio } = req.body;
            console.log(req.body);
            console.log(req.header("Authorization"));
            //const busqueda = await userModel.buscarNombre(descripcion);
            //if (!busqueda) {
            const result = yield userModel_1.default.crearHabitacion(categoria, descripcion, precio);
            //}
            return res.json({ message: "Se agregó una nueva habitacion" });
        });
    }
    modificar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            const { idH, categoria, descripcion, precio } = req.body;
            const result = yield userModel_1.default.actualizar(idH, categoria, descripcion, precio);
            return res.json({ message: "Se actualizó la habitacion" });
        });
    }
    listarReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userModel_1.default.listarReservas();
            console.log(result);
            return res.json(result);
        });
    }
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userModel_1.default.listarUsuarios();
            console.log(result);
            return res.json(result);
        });
    }
    listarHabitaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userModel_1.default.listarhabitaciones();
            console.log(result);
            return res.json(result);
        });
    }
    datosReservas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idReserva } = req.params;
            console.log(idReserva);
            const result = yield userModel_1.default.datosReserva(idReserva);
            console.log(result);
            return res.status(200).json(result);
        });
    }
}
const adminController = new AdminController();
exports.default = adminController;
//# sourceMappingURL=adminController.js.map