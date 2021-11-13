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
const mailer_1 = require("../config/mailer");
//import bcrypt from "bcrypt";
class UserController {
    listarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            console.log(id);
            const result = yield userModel_1.default.listarDatosUsuario(id);
            console.log(result.mail);
            res.status(200).json(result);
            return;
        });
    }
    listarhoteles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const hoteles = yield userModel_1.default.listarhoteles();
            console.log(hoteles);
            return res.json(hoteles);
        });
    }
    buscarID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRE AL METODO BUSCARID");
            const { desc } = req.params;
            console.log(desc);
            const id = yield userModel_1.default.buscarID(desc);
            console.log("SALI DEL METODO BUSCARID");
            console.log(id);
            return res.status(200).json(id);
        });
    }
    buscarFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRE AL METODO BUSCARFECHA");
            const { fecha } = req.params;
            console.log(fecha);
            const date = yield userModel_1.default.buscarFecha(fecha);
            console.log(date);
            console.log("SALI DEL METODO BUSCARID");
            res.status(200).json(date);
            return;
        });
    }
    modificarDatosUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { idPersona, nombre, apellido, dni, telefono, mail, contrasenia } = req.body;
            const result = yield userModel_1.default.modificarDatos(idPersona, nombre, apellido, dni, telefono, mail, contrasenia);
            res.status(200).json({ message: "DATOS ACTUALIZADOS!!" });
            return;
        });
    }
    signin(req, res) {
        console.log(req.body);
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mail, password } = req.body;
            const result = yield userModel_1.default.buscarUsuario(mail);
            //console.log(result.idPersona);
            console.log(mail, password);
            if (!result) {
                return res.status(404).json({ message: "Usuario no registrado" });
                //req.flash("error_session", "Usuario Incorrecto");
                //res.redirect("./error");
            }
            else {
                const checkPassword = yield userModel_1.default.validarPassword(password, result.contrasenia);
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
            const patronEmail = /[a-z0-9]{1,14}@[a-z0-9]{1,10}.[a-z]{2,3}/;
            const patronDNI = /^[0-9]{7,9}$/;
            const patronTelefono = /^[0-9]{8,10}$/;
            //MAIL
            if (datos.mail.length == 0) {
                res.status(403).json({ message: "No ha ingresado ningun MAIL!!" });
            }
            if (datos.mail.length > 27) {
                res.status(403).json({ message: "Excedió el limite maximo(27) de caracteres para el campo MAIL!!" });
            }
            if (datos.mail.length < 6) {
                res.status(403).json({ message: "El mail debe de contener entre 6 caracteres como minimo!!" });
            }
            if (!patronEmail.test(datos.mail)) {
                res.status(403).json({ message: "Mail invalido, debe ser example@dominio.com" });
            }
            //FUNCIONAN LAS VALIDACIONES
            // FIN MAIL
            //CONTRASEÑA
            if (datos.contrasenia.length == 0) {
                res.status(403).json({ message: "No ha ingresado ninguna CONTRASEÑA!!" });
            }
            if (datos.contrasenia.length > 20) {
                res.status(403).json({ message: "Excedió el limite maximo (20) de caracteres para el campo CONTRASEÑA!!" });
            }
            if (datos.contrasenia.length < 6) {
                res.status(403).json({ message: "La contraseña debe de contener entre 6 y 20 caracteres!!" });
            }
            if (!patronPass.test(datos.contrasenia)) {
                res.status(403).json({
                    message: "Contraseña invalida, debe debe ser alfanumerica y contener mayusculas."
                });
            }
            //FUNCIONAN LAS VALIDACIONES
            // FIN CONTRASEÑA
            //NOMBRE
            if (datos.nombre.length == 0) {
                res.status(403).json({
                    error: "No ha ingresado ningun nombre!!"
                });
            }
            if (datos.nombre.length > 14) {
                res.status(403).json({
                    error: "Excedió el limite maximo (14) de caracteres para el campo NOMBRE!!"
                });
            }
            if (datos.nombre.length < 3) {
                res.status(403).json({
                    error: "Nombre invalido, debe contener entre 3 y 14 caracteres!!"
                });
            }
            if (!patronNombre.test(datos.nombre)) {
                res.status(403).json({
                    error: "Nombre invalido, debe comenzar con mayuscula y no poseer numeros."
                });
            }
            //FUNCIONAN LAS VALIDACIONES		
            // FIN NOMBRE
            //APELLIDO
            if (datos.apellido.length == 0) {
                res.status(403).json({
                    error: "No ha ingresado ningun apellido!!"
                });
            }
            if (datos.apellido.length > 14) {
                res.status(403).json({
                    error: "Excedió el limite maximo (14) de caracteres para el campo APELLIDO!!"
                });
            }
            if (datos.apellido.length < 3) {
                res.status(403).json({
                    error: "Apellido invalido, debe contener entre 3 y 14 caracteres!!"
                });
            }
            if (!patronApellido.test(datos.apellido)) {
                res.status(403).json({
                    error: "Apellido invalido, debe comenzar con mayuscula y no poseer numeros."
                });
            }
            //FUNCIONAN LAS VALIDACIONES		
            // FIN APELLIDO
            //DNI
            if (datos.dni.length == 0) {
                res.status(403).json({
                    error: "No ha ingresado ningun DNI!!"
                });
            }
            if (datos.dni.length > 10) {
                res.status(403).json({
                    error: "Excedió el limite maximo (8) de digitos para el campo DNI!!"
                });
            }
            if (datos.dni.length < 8) {
                res.status(403).json({
                    error: "DNI invalido, debe contener entre 7 y 8 digitos!!"
                });
            }
            if (!patronDNI.test(datos.dni)) {
                res.status(403).json({
                    error: "DNI invalido, debe contener solo numeros, sin puntos ni espacios."
                });
            }
            //FUNCIONAN LAS VALIDACIONES
            // FIN DNI
            //TELEFONO
            if (datos.telefono.length == 0) {
                res.status(403).json({
                    error: "No ha ingresado ningun telefono!!"
                });
            }
            if (datos.telefono.length > 9) {
                res.status(403).json({
                    error: "Excedió el limite maximo (10) de digitos para el campo TELEFONO!!"
                });
            }
            if (datos.telefono.length < 7) {
                res.status(403).json({
                    error: "Telefono invalido, debe contener entre 8 y 10 digitos!!"
                });
            }
            if (!patronTelefono.test(datos.telefono)) {
                res.status(403).json({
                    error: "Telefono invalido, debe contener solo numeros, sin guiones ni espacios."
                });
            }
            // FIN TELEFONO
            const resultado = yield userModel_1.default.buscarUsuario(datos.mail);
            datos.contrasenia = yield userModel_1.default.encriptPass(datos.contrasenia);
            if (!resultado) {
                datos.rol = 'user';
                datos.legajo = 0;
                yield userModel_1.default.crearUsuario(datos);
                try {
                    yield mailer_1.transporter.sendMail({
                        from: '"SISRO Hoteles 👻" <info@sisrohoteles.com>',
                        to: datos.mail,
                        subject: 'Registro en SISRO exitoso!!',
                        html: `Hola ${datos.nombre}, ¡gracias por utilizar SISRO Hoteles! <button href="http://localhost:4200"> SISRO Hoteles </a>`
                    }); // ya podés ingresar a nuestro sitio clickeando el siguiente enlace:
                }
                catch (err) {
                    console.log("error: ", err);
                }
                res.status(200).json({
                    message: 'Usuario Registrado!',
                });
            }
            res.status(403).json({ message: 'Error, ya existe el usuario' });
        });
    }
}
// -------------------------------
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map