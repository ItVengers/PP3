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
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
class UserModel {
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }
    // async config() {//Parametro de conexion con la BD.
    //     this.db = await createPool({
    // 		host: 'remotemysql.com',
    // 		user: '868JNygZMY',
    // 		password: 'vsXA45H28F',
    // 		database: '868JNygZMY',
    // 		connectionLimit: 10
    //     });
    // }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'dbhoteles',
                connectionLimit: 10
            });
        });
    }
    buscarUsuario(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            const encontrado = yield this.db.query('SELECT * FROM persona WHERE mail = ?', [mail]);
            //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
            if (encontrado.length > 1)
                return encontrado[0][0];
            return null;
        });
    }
    crearUsuario(persona) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO persona SET ?', [persona]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    crear(usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('INSERT INTO persona SET ?', [usuario]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    eliminar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const art = (yield this.db.query('DELETE FROM habitaciones WHERE idH = ?', [id]))[0].affectedRows;
            return art;
        });
    }
    // async buscarNombre(descripcion: string) {
    //     const encontrado: any = await this.db.query('SELECT * FROM habitaciones WHERE descripcion = ?', [descripcion]);
    //     if (encontrado.length > 1)
    //         return encontrado[0][0];
    //     return null;
    // }
    crearHabitacion(categoria, descripcion, precio) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query("INSERT INTO habitaciones (categoria, descripcion, precio) values(?, ?, ?)", [categoria, descripcion, precio]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    actualizar(id, categoria, descripcion, precio) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE habitaciones SET categoria = ?,descripcion = ?, precio = ?  WHERE idH = ?', [categoria, descripcion, precio, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    // ----------------------------
    listarhabitaciones() {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('SELECT * FROM habitaciones');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return habitaciones[0];
        });
    }
    modificarDatos(id, nombre, apellido, dni, telefono, mail, contrasenia) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (yield this.db.query('UPDATE persona SET nombre = ?, apellido = ?,dni = ?, telefono = ?,	mail= ?, contrasenia= ?  WHERE idPersona = ?', [nombre, apellido, dni, telefono, mail, contrasenia, id]))[0].affectedRows;
            console.log(result);
            return result;
        });
    }
    listarDatosUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const persona = (yield this.db.query('SELECT * FROM persona WHERE idPersona = ?', [id]));
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return persona[0][0];
        });
    }
    listarhoteles() {
        return __awaiter(this, void 0, void 0, function* () {
            const hoteles = (yield this.db.query('SELECT descripcion FROM hoteles'));
            return hoteles[0];
        });
    }
    buscarID(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRE AL USERMODEL");
            console.log(desc);
            const zona = (yield this.db.query('SELECT zona_id FROM hoteles WHERE descripcion = ?', [desc]));
            if (zona.length >= 1) {
                console.log("SALI DEL USERMODEL");
                return zona[0][0];
            }
            return "VACIO";
        });
    }
    buscarFecha(date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRE AL USERMODEL");
            console.log(date);
            const fecha = (yield this.db.query('SELECT zona_id FROM hoteles WHERE descripcion = ?', [date]));
            if (fecha.length >= 1) {
                console.log("SALI DEL USERMODEL");
                return fecha[0][0];
            }
            return "VACIO";
        });
    }
}
const userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map