"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacionesController_1 = __importDefault(require("../controller/habitacionesController"));
class HabitacionesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('habitaciones!!!');
            //res.render("partials/principal");
        });
        this.router.post('/listarhabitaciones', habitacionesController_1.default.habitacionesC);
        // this.router.post('/listarhabitaciones',TokenValidation,habitacionesController.habitacionesC);
        this.router.post('/crearreserva', habitacionesController_1.default.crearReserva);
    }
}
//Exportamos el enrutador con 
const habitacionesRouter = new HabitacionesRoutes();
exports.default = habitacionesRouter.router;
//# sourceMappingURL=habitacionesRoutes.js.map