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
            //const { habitaciones } = req.body;
            const result = yield habitacionesModel_1.default.listarhabitaciones();
            //console.log(result.idPersona);
            console.log(result);
            return res.json(result);
        });
    }
}
const habitacionesController = new HabitacionesController();
exports.default = habitacionesController;
//# sourceMappingURL=habitacionesController.js.map