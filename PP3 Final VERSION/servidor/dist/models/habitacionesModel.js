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
    listarhabitaciones(fechaIngreso, fechaEgreso, personas, hotel, fechaingresoAcortada) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('select h.idHabitacion, ht.descripcion, h.estado, c.descripcion, t.precio from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join tarifas t on t.categoria_id = c.idCategoria inner join hoteles ht  on ht.idHotel = c.hotel_id where ((h.estado = 1 or (h.estado = 2 and (h.checkIn >= ? or h.checkOut <= ?))) and h.idHabitacion not in (select r.habitacion_id  from reservas r  inner join estado e on e.idEstado = r.estado_id  inner join habitaciones h on h.idHabitacion = r.habitacion_id  where ((r.checkIn <= ? and r.checkOut > ?) or (r.checkIn <= ? and r.checkOut > ?)) and (e.codigo = "PEN" or e.codigo = "NOD" or h.estado = 6) or r.checkIn between ? and ?  and e.codigo <> "FIN" and e.codigo <> "CAN" )) and t.temporada_id = (select distinct idTemporada from temporada temp inner join tarifas tar on tar.temporada_id = temp.idTemporada where temp.fecha_desde <= ? and temp.fecha_hasta >= ?) and c.pasajeros = ? and ht.idHotel = ?;', [fechaIngreso, fechaIngreso, fechaIngreso, fechaIngreso, fechaEgreso, fechaEgreso, fechaIngreso, fechaEgreso, fechaingresoAcortada, fechaingresoAcortada, personas, hotel]);
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return habitaciones[0];
        });
    }
    crearReserva(fechaIngreso, fechaEgreso, fechaReserva, habitacion_id, estado, precio, idPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('INSERT INTO RESERVAS(checkIn, checkOut, fechaReserva, precioTotal, estado_id, habitacion_id, persona_id) VALUES(?,?,?,?,?,?,?)', [fechaIngreso, fechaEgreso, fechaReserva, precio, estado, habitacion_id, idPersona]);
            return habitaciones[0];
        });
    }
    buscarReservasxUsuario(idPersona) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('SELECT r.idReserva, r.checkIn, r.checkOut, r.fechaReserva, r.precioTotal, e.descripcion, r.habitacion_id FROM RESERVAS r inner join estado e on e.idEstado = r.estado_id WHERE persona_id = ?', [idPersona]);
            return habitaciones[0];
        });
    }
}
const habitacionesModel = new HabitacionesModel();
exports.default = habitacionesModel;
//# sourceMappingURL=habitacionesModel.js.map