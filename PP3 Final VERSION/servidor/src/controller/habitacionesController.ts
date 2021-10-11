import { Request, Response } from 'express';
import HabitacionesModel from "../models/habitacionesModel";
import jwt from "jsonwebtoken";
import habitacionesModel from '../models/habitacionesModel';
//import bcrypt from "bcrypt";
class HabitacionesController {


	public async habitacionesC(req: Request, res: Response) {    
		console.log("ESTOY EN EL METODO DEL BACKEND")
		const {fechaIngreso, fechaEgreso, cantPersona } = req.body;

		const result = await habitacionesModel.listarhabitaciones(fechaIngreso, fechaEgreso, cantPersona);
		//console.log(result.idPersona);
		console.log(result);
		return res.json(result);
		
    }
}

const habitacionesController = new HabitacionesController();
export default habitacionesController;
