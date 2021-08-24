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
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.db = yield promise_1.createPool({
                host: 'remotemysql.com',
                user: '868JNygZMY',
                password: 'HOP6t1Lq7X',
                database: '868JNygZMY',
                connectionLimit: 10
            });
        });
    }
    listarhabitaciones() {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('select h.idHabitacion, cat.tipo, c.descripcion from habitaciones h inner join camas c on c.idCamas = h.camas_id inner join categoria cat on cat.idCategoria = h.cat_id');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return habitaciones[0];
        });
    }
}
const habitacionesModel = new HabitacionesModel();
exports.default = habitacionesModel;
//# sourceMappingURL=habitacionesModel.js.map