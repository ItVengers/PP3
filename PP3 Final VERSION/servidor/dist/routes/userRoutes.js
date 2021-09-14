"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main users!!!');
            //res.render("partials/principal");
        });
        this.router.get('/signin', userController_1.default.signin);
        this.router.post('/signin', userController_1.default.login);
        this.router.get('/signup', userController_1.default.signup);
        this.router.post('/signup', userController_1.default.addUser);
        this.router.get('/misdatos/:id', userController_1.default.listarUsuario);
        this.router.post('/modificardatos', userController_1.default.modificarDatosUsuario);
        this.router.get('/listarhoteles', userController_1.default.listarhoteles);
        this.router.get('/buscarId/:desc', userController_1.default.buscarID);
        this.router.get('/buscarFecha/:fecha', userController_1.default.buscarFecha);
    }
}
//Exportamos el enrutador con 
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=userRoutes.js.map