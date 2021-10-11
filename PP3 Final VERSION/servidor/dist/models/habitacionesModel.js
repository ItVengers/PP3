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
class HabitacionesModel {
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
    listarhabitaciones(fechaIngreso, fechaEgreso, personas) {
        return __awaiter(this, void 0, void 0, function* () {
            //const habitaciones = await this.db.query('select h.idHabitacion, h.checkIn, h.checkOut, h.estado, c.descripcion, t.precio from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = c.idCategoria where h.idHabitacion not in (select r.habitacion_id from reservas r inner join estado e on e.idEstado = r.estado_id where e.codigo = "PEN");');
            //const habitaciones = await this.db.query("CALL BusquedaHabitacionesDisponibles(?,?,?)",  [personas, fechaIngreso, fechaEgreso]);
            const habitaciones = yield this.db.query('select h.idHabitacion, h.checkIn, h.checkOut, h.estado, c.descripcion from habitaciones h inner join categoria c on c.idCategoria = h.cat_id where h.idHabitacion not in (select r.habitacion_id from reservas r inner join estado e on e.idEstado = r.estado_id  where ((r.checkIn <= ? and r.checkOut > ?) or (r.checkIn <= ? and r.checkOut > ?)) AND (e.codigo = "PEN" OR e.codigo = "NOD")) and c.pasajeros = ?;', [fechaIngreso, fechaIngreso, fechaEgreso, fechaEgreso, personas]);
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return habitaciones[0];
        });
    }
}
const habitacionesModel = new HabitacionesModel();
exports.default = habitacionesModel;
//# sourceMappingURL=habitacionesModel.js.map