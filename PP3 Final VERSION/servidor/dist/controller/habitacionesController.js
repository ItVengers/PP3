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
const habitacionesModel_1 = __importDefault(require("../models/habitacionesModel"));
//import bcrypt from "bcrypt";
class HabitacionesController {
    habitacionesC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ESTOY EN EL METODO DEL BACKEND");
            const { fechaIngreso, fechaEgreso, cantPersona } = req.body;
            const result = yield habitacionesModel_1.default.listarhabitaciones(fechaIngreso, fechaEgreso, cantPersona);
            //console.log(result.idPersona);
            console.log(result);
            return res.json(result);
        });
    }
    crearReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ESTOY EN EL METODO CREAR RESERVA");
            const { fecCheckIn, fecCheckOut, fechaReserva, habId, precio, status, perId } = req.body;
            console.log(req.body);
            const result = yield habitacionesModel_1.default.crearReserva(fecCheckIn, fecCheckOut, fechaReserva, habId, precio, status, perId);
            console.log(result);
            res.status(200).json({ message: "RESERVA HECHA!!" });
        });
    }
}
const habitacionesController = new HabitacionesController();
exports.default = habitacionesController;
//# sourceMappingURL=habitacionesController.js.map