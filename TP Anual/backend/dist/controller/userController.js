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
            console.log(result.idPersona);
            console.log(mail, password);
            if (!result) {
                return res.status(404).json({ message: "Usuario no registrado" });
                //req.flash("error_session", "Usuario Incorrecto");
                //res.redirect("./error");
            }
            if (result.contrasenia == password && result.mail == mail) {
                //req.session.user = result;
                //req.session.auth = true;
                if ((result === null || result === void 0 ? void 0 : result.rol) == 'admin') {
                    //req.session.admin = true;
                    //res.redirect("../admin/home");
                    const token = jsonwebtoken_1.default.sign({ _id: result.id }, "secretKey");
                    res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol: result.rol, idPersona: result.idPersona });
                    return;
                }
                else {
                    //req.session.admin = false;
                    const token = jsonwebtoken_1.default.sign({ _id: result.id }, "secretKey");
                    res.status(200).json({ message: "Bienvenido " + result.nombre, token: token, rol: result.rol, idPersona: result.idPersona });
                    return;
                }
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
            const patronNombre = /^[A-Z][A-Za-z]{3,14}$/;
            const patronApellido = /^[A-Z][A-Za-z]{3,14}$/;
            const patronPass = /^[A-Z][A-Za-z0-9]{6,20}$/;
            const patronEmail = /[a-z0-9]{1,10}@[a-z0-9]{1,10}.[a-z]{2,3}/;
            const patronDNI = /^[0-9]{7,9}$/;
            const patronTelefono = /^[0-9]{8,10}$/;
            if (!patronEmail.test(datos.mail)) {
                res.status(403).json({ message: "Mail invalido" });
            }
            if (!patronPass.test(datos.contrasenia)) {
                res.status(403).json({ message: "Contraseña invalida" });
            }
            if (!patronNombre.test(datos.nombre)) {
                res.status(403).json({ message: "Nombre invalido" });
            }
            if (!patronApellido.test(datos.apellido)) {
                res.status(403).json({ message: "Apellido invalido" });
            }
            if (!patronDNI.test(datos.dni)) {
                res.status(403).json({ message: "DNI deberia ser numerico sin puntos!!" });
            }
            if (!patronTelefono.test(datos.telefono)) {
                res.status(403).json({ message: "Telefono invalido" });
            }
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