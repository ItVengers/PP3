import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    //Recuperamos la cabecera y la dividimos en 2
    let token: any = (req.header("Authorization")?.split('Baerer ', 2));
    //tomamos la parte que nos interesa, el token, para despues evaluar.
    token = token['1'];
    console.log("Evaluando token recibido");
    console.log(token);
    if (!token)
        return res.status(401).json("Acceso denegado");
    next();
}