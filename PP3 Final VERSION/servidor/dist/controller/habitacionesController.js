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
const mailer_1 = require("../config/mailer");
const habitacionesModel_1 = __importDefault(require("../models/habitacionesModel"));
//import bcrypt from "bcrypt";
class HabitacionesController {
    buscarReservasXUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ESTOY EN EL METODO DEL BACKEND");
            const { IdPersona } = req.params;
            console.log(IdPersona);
            const result = yield habitacionesModel_1.default.buscarReservasxUsuario(IdPersona);
            //console.log(result.idPersona);
            console.log(result);
            return res.json(result);
        });
    }
    habitacionesC(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ESTOY EN EL METODO DEL BACKEND");
            const { fechaIngreso, fechaEgreso, cantPersona, hotel, fechaingresoAcortada } = req.body;
            const result = yield habitacionesModel_1.default.listarhabitaciones(fechaIngreso, fechaEgreso, cantPersona, hotel, fechaingresoAcortada);
            //console.log(result.idPersona);
            console.log(result);
            return res.json(result);
        });
    }
    crearReserva(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecCheckIn, fecCheckOut, fecReserva, habId, precio, status, perId } = req.body;
            const result = yield habitacionesModel_1.default.crearReserva(fecCheckIn, fecCheckOut, fecReserva, habId, status, precio, perId);
            console.log(result);
            res.status(200).json({ message: "RESERVA HECHA!!" });
            try {
                yield mailer_1.transporter.sendMail({
                    from: '"SISRO Hoteles ????" <info@sisrohoteles.com>',
                    to: "mail@prueba.com",
                    // donde dice {result.nombre} ir??a la variable que toma el nombre del usuario, anteponiendo un $, quedar??a ${result.nombre}
                    subject: 'Solicitud de reserva exitosa',
                    html: `Hola {result.nombre}, ??tu solicitud de reserva fue confirmada! <br>
		Para terminar con tu reserva es necesaria una se??a por el 50% <br>
		<br>
		Datos Reserva: <br>
		Fecha de Check In: ${fecCheckIn}<br>
		Fecha de Check Out: ${fecCheckOut}<br>
		Identificador de habitaci??n: ${habId}<br>
		Status: ${status}<br>
		Precio total: ${precio}<br>
		PerId: ${perId} <br>
		<br>
		??Como realizar la se??a? <br>
		La se??a se puede realizar por medio de transferencia bancaria o deposito <br>
		 (para Mercado Pago solicitar un enlace por mail) <br>
		Datos Bancarios:<br>
		CBU: 0002514839965489621<br>
		ALIAS: CESAR.OKEY.SUE??O<br>
		Nombre: Elena Garqueta<br>
		Banco Galicia<br>
		<br>
		Al realizar la se??a, enviar un comprobante al mail reservas@sisrohoteles.com.ar<br>
		Recibir?? la confirmaci??n de la recepci??n dentro de las 48hs de haber enviado la misma.<br>
		<br>
		ATENCI??N<br>
		Sino se realiza la reserva en las pr??ximas 72hs el Hotel <br>
		puede tomar la libertad de volver a poner la habitaci??n como disponible<br>
		sin consulta previa.<br>

		Ingresa a nuestra Web:<br>
		<button href="http://localhost:4200"> SISRO Hoteles </a>`
                }); // ya pod??s ingresar a nuestro sitio clickeando el siguiente enlace:
            }
            catch (err) {
                console.log("error: ", err);
            }
        });
    }
}
const habitacionesController = new HabitacionesController();
exports.default = habitacionesController;
// const resultado = await userModel.buscarUsuario(datos.mail);
// datos.contrasenia = await userModel.encriptPass(datos.contrasenia);
// try{
// 	await transporter.sendMail({
// 		from: '"SISRO Hoteles ????" <info@sisrohoteles.com>',
// 		to:datos.mail,
// 		subject:'Registro en SISRO exitoso!!',
// 		html:`Hola ${datos.nombre}, ??gracias por utilizar SISRO Hoteles! <button href="http://localhost:4200"> SISRO Hoteles </a>`
// 	}); // ya pod??s ingresar a nuestro sitio clickeando el siguiente enlace:
// }
// catch(err){
// console.log("error: ",err)
// }
//# sourceMappingURL=habitacionesController.js.map