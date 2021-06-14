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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import bcrypt from "bcrypt";
class UserController {
    signin(req, res) {
        console.log(req.body);
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, password } = req.body;
            const result = yield userModel_1.default.buscarUsuario(mail);
            console.log(result);
            console.log(mail, password);
            if (!result) {
                return res.status(404).json({ message: "Usuario no registrado" });
                //req.flash("error_session", "Usuario Incorrecto");
                //res.redirect("./error");
            }
            if (result.contrasenia == password && result.mail == mail) {
                //res.send({ "Bienvenido!": result.nombre }); 
                const token = jsonwebtoken_1.default.sign({ _id: result.id }, "secretKey");
                res.status(200).json({ message: "Bienvenido " + result.nombre, token: token });
                return;
            }
            if (result.contrasenia != password || result.mail != mail) {
                //return res.status(404).json({ message: "Usuario no registrado" });
                return res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
                //res.send("No estas registrado");
            }
            //res.status(403).json({ message: "Usuario y/o contraseña incorrectos" });
        });
    }
    signup(req, res) {
        console.log(req.body);
        res.render("partials/signupForm");
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = req.body;
            delete datos.repassword;
            const resultado = yield userModel_1.default.buscarUsuario(datos.mail);
            if (!resultado) {
                datos.rol = 'user';
                yield userModel_1.default.crearUsuario(datos);
                res.status(200).json({
                    message: 'Usuario Registrado!',
                });
            }
            res.status(403).json({ message: 'Error, ya existe el usuario' });
        });
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map