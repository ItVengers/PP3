"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ComentarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            res.send('Main!!!');
            //res.render("partials/principal");
        });
        this.router.get('');
    }
}
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
//# sourceMappingURL=comentarioController.js.map