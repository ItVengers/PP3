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
    // - - encriptación de password
    // encriptPass = async(password: string): Promise<string> => {
    //     const salt = await bcryptjs.genSalt(10);
    //     return await bcryptjs.hash(password, salt);
    // }
    // validarPassword = async function (password: string, passwordHash: string): Promise<boolean> {		
    //     return await bcryptjs.compare(password, passwordHash);
    // }
    // -- Fin Encriptación
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
            const hoteles = (yield this.db.query('SELECT idHotel, descripcion FROM hoteles'));
            return hoteles[0];
        });
    }
    buscarID(desc) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ENTRE AL USERMODEL");
            console.log(desc);
            const id = (yield this.db.query('SELECT idHotel FROM hoteles WHERE descripcion = ?', [desc]));
            if (id.length >= 1) {
                console.log("SALI DEL USERMODEL");
                return id[0][0];
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
    //--------------
    // ADMIN MODELS ----------------
    //--------------
    listarReservas() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield this.db.query('SELECT * FROM reservas');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return reservas[0];
        });
    }
    listarUsuarios() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservas = yield this.db.query('SELECT * FROM persona');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return reservas[0];
        });
    }
    listarhabitaciones() {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('SELECT * FROM habitaciones');
            //console.log(usuarios[0]);
            //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
            return habitaciones[0];
        });
    }
    datosReserva(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id);
            const reservaDato = yield this.db.query('SELECT * FROM reservas WHERE idReserva = ?', [id]);
            return reservaDato[0][0];
        });
    }
    reservasPendientes() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservasPendientes = yield this.db.query('select r.idReserva,p.nombre, p.apellido,r.checkIn as Ingreso,r.checkOut as Egreso,r.precioTotal as "Precio_Final",r.habitacion_id, e.descripcion from reservas r inner join estado e on e.idEstado = r.estado_id inner join persona p on p.idPersona = r.persona_id where checkIn = curdate() and estado_id = 4');
            return reservasPendientes[0];
        });
    }
    verificacion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const verificacion = yield this.db.query('update reservas set estado_id = 2 where idreserva = ?', [id]);
            return verificacion[0];
        });
    }
    actualizarEstado(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualizarEstado = yield this.db.query('update habitaciones h inner join reservas r on r.habitacion_id = h.idHabitacion set h.estado = r.estado_id, h.checkIn = r.checkIn, h.checkOut = r.checkOut where r.idReserva = ?;', [id]);
            return actualizarEstado[0];
        });
    }
    reservasConfirmadas() {
        return __awaiter(this, void 0, void 0, function* () {
            const reservasConfirmadas = yield this.db.query('select r.idReserva,p.nombre, p.apellido,r.checkIn as Ingreso,r.checkOut as Egreso,r.precioTotal as "Precio_Final",r.habitacion_id, e.descripcion from reservas r inner join estado e on e.idEstado = r.estado_id inner join persona p on p.idPersona = r.persona_id where checkOut = curdate() and estado_id = 2');
            return reservasConfirmadas[0];
        });
    }
    checkOut(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkOut = yield this.db.query('update reservas set estado_id = 3 where idreserva = ?', [id]);
            return checkOut[0];
        });
    }
    actualizarEstado_CO(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const actualizarEstado = yield this.db.query('update habitaciones h inner join reservas r on r.habitacion_id = h.idHabitacion set h.estado = 1, h.checkIn = null, h.checkOut = null where r.idReserva = ?;', [id]);
            return actualizarEstado[0];
        });
    }
    verHabitaciones() {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('select h.numeroHabitacion, c.descripcion, h.checkIn, h.checkOut, h.estado, e.descripcion as "desc",c.hotel_id from habitaciones h inner join categoria c on c.idCategoria = h.cat_id inner join estado e on e.idEstado = h.estado;');
            return habitaciones[0];
        });
    }
    bloquearHabitacion(nroHab) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('update habitaciones h set h.estado = 6 where h.numeroHabitacion = ?;', [nroHab]);
            return habitaciones[0];
        });
    }
    habilitarHabitacion(nroHab) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('update habitaciones h set h.estado = 1 where h.numeroHabitacion = ?;', [nroHab]);
            return habitaciones[0];
        });
    }
    cambiarEstadoAlCancelar(nroHab) {
        return __awaiter(this, void 0, void 0, function* () {
            const habitaciones = yield this.db.query('update habitaciones h set h.estado = 1, h.checkIn = null, h.checkOut = null where h.numeroHabitacion = ?;', [nroHab]);
            return habitaciones[0];
        });
    }
    buscarIdReserva(nroHab, fechaI, fechaE) {
        return __awaiter(this, void 0, void 0, function* () {
            const reserva = yield this.db.query('select idReserva from reservas r inner join habitaciones h on h.idHabitacion = r.habitacion_id where r.checkin = ? and r.checkout = ? and h.numeroHabitacion = ? and r.estado_id = 2;', [fechaI, fechaE, nroHab]);
            console.log("ESTE ES EL VALOR RESERVA:" + reserva);
            return reserva[0][0];
        });
    }
    actualizarReservaxCancelacion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("METODO ACTUALIZAR ESTADO POR CANCELACION: ");
            const reserva = yield this.db.query('update reservas set estado_id = 3, checkOut = curdate() where idreserva = ?', [id]);
            return reserva[0];
        });
    }
    listarTemporadas() {
        return __awaiter(this, void 0, void 0, function* () {
            const temporadas = (yield this.db.query('SELECT idTemporada, descripcion FROM temporada'));
            return temporadas[0];
        });
    }
    listarCategorias() {
        return __awaiter(this, void 0, void 0, function* () {
            const temporadas = (yield this.db.query('select distinct descripcion from categoria'));
            return temporadas[0];
        });
    }
    aplicarAjuste(categoria, hotel, ajuste, temporada) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(categoria, hotel, temporada, ajuste);
            const ajusteAplicado = yield this.db.query('update tarifas t inner join categoria c on t.categoria_id = c.idCategoria  inner join hoteles h on c.hotel_id = h.idHotel inner join temporada temp on temp.idTemporada = t.temporada_id set t.precio = (t.precio + t.precio * ?)  where temp.descripcion = "?" and c.descripcion = "?" and h.descripcion = "?"', [ajuste, temporada, categoria, hotel]);
            return ajusteAplicado[0];
        });
    }
}
const userModel = new UserModel();
exports.default = userModel;
//# sourceMappingURL=userModel.js.map