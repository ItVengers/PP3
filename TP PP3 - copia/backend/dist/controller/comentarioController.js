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
const comentarioModel_1 = __importDefault(require("../models/comentarioModel"));
class ComentarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.header("Authorization"));
            console.log(req.body);
            //console.log(req.header("Authorization"));
            const comentario = yield comentarioModel_1.default.listar();
            console.log(comentario);
            return res.json(comentario);
            //res.send('Listado de usuarios!!!');
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            console.log(req.header("Authorization"));
            const { id } = req.params;
            const comentario = yield comentarioModel_1.default.buscarId(id);
            if (comentario) {
                return res.json(comentario);
            }
            res.status(404).json({ message: "Comentario no Encontrado" });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const comentario = req.body;
            console.log(req.body);
            console.log(req.header("Authorization"));
            //res.send('Usuario agregado!!!');
            // const busqueda = await comentarioModel.buscarNombre(comentario.nombre);
            // if (!busqueda) {
            // if (comentario.descripcion.length == 0 || comentario.descripcion.length > 1000) {
            //     res.json({ message: 'Comentario no guardado!!' });
            // }
            // if (comentario.imagen.length == 0) {
            //     res.json({ message: 'Comentario no guardado!!' });
            // }
            const result = yield comentarioModel_1.default.crear(comentario);
            return res.status(200).json({ message: 'Comentario Agregado' });
            // }
            // return res.status(403).json({ message: 'User exists!!' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            const result = yield comentarioModel_1.default.eliminar(id);
            return res.json({ message: "Comentario Eliminado" });
            //res.redirect('../controls');
        });
    }
    ordenar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.header("Authorization"));
            const result = yield comentarioModel_1.default.ordenar();
            //return res.json({ text: 'deleting a user ' + id });
            //res.redirect('../controls');
            console.log(result);
            return res.json(result);
        });
    }
}
const comentarioController = new ComentarioController();
exports.default = comentarioController;
//# sourceMappingURL=comentarioController.js.map