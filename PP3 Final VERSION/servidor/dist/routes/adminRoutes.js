"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../controller/adminController"));
const verifyToken_1 = require("../lib/verifyToken");
class AdminRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => { res.send('Main!!!'); });
        this.router.get("/abmproductos", verifyToken_1.TokenValidation, adminController_1.default.abm);
        this.router.delete("/delete/:id", verifyToken_1.TokenValidation, adminController_1.default.delete);
        this.router.post("/agregar", verifyToken_1.TokenValidation, adminController_1.default.agregar);
        this.router.post("/modificar", verifyToken_1.TokenValidation, adminController_1.default.modificar);
        // ADMIN FUNCIONES
        this.router.get("/reservas/:id", adminController_1.default.listarReservas);
        this.router.get("/usuarios", adminController_1.default.listarUsuarios);
        this.router.get("/habitaciones", adminController_1.default.listarHabitaciones);
        this.router.get("/datosreservas/:idReserva", adminController_1.default.datosReservas);
        this.router.get("/confirmarreservas", adminController_1.default.reservasPendientes);
        this.router.get("/verificacion/:id", adminController_1.default.verificacionReserva);
        this.router.get("/reservasconfirmadas", adminController_1.default.reservasConfirmadas);
        this.router.get("/checkout/:id", adminController_1.default.checkOut);
        this.router.get("/verhabitaciones/:hotel_id", adminController_1.default.verHabitaciones);
        this.router.post("/bloquear", adminController_1.default.bloquearHabitacion);
        this.router.post("/habilitar", adminController_1.default.habilitarHabitacion);
        this.router.get("/cancelar/:reservaID", adminController_1.default.cancelarReservaAnticipadamente);
        this.router.post("/buscarReserva", adminController_1.default.buscarReserva);
        this.router.post("/ajuste", adminController_1.default.aplicarAjuste);
    }
}
const adminRoutes = new AdminRoutes();
exports.default = adminRoutes.router;
//# sourceMappingURL=adminRoutes.js.map