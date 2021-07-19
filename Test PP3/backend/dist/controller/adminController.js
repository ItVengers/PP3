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
}
const adminController = new AdminController();
exports.default = adminController;
//# sourceMappingURL=adminController.js.map