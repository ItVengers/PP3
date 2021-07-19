"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenValidation = void 0;
const TokenValidation = (req, res, next) => {
    var _a;
    //Recuperamos la cabecera y la dividimos en 2
    let token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");
    console.log(token);
    if (!token)
        return res.status(401).json("Acceso denegado");
    next();
};
exports.TokenValidation = TokenValidation;
//# sourceMappingURL=verifyToken.js.map