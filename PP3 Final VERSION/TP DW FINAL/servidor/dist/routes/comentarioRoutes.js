"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comentarioController_1 = __importDefault(require("../controller/comentarioController"));
const verifyToken_1 = require("../lib/verifyToken");
class ComentarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            //res.send('Main!!!');
            //se pone antes de cargar la primera ruta, para inicializar las variables de sesiones.
            req.session.auth = false;
            req.session.user = {};
            //res.render("partials/principal");
        });
        this.router.get('/list', verifyToken_1.TokenValidation, comentarioController_1.default.list);
        this.router.get('/find/:id', verifyToken_1.TokenValidation, comentarioController_1.default.find);
        this.router.post('/create', verifyToken_1.TokenValidation, comentarioController_1.default.create);
        this.router.delete('/delete/:id', verifyToken_1.TokenValidation, comentarioController_1.default.delete);
        this.router.get('/ordenar', verifyToken_1.TokenValidation, comentarioController_1.default.ordenar);
    }
}
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
//# sourceMappingURL=comentarioRoutes.js.map