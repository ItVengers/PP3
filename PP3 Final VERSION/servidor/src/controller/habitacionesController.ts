import { Request, Response } from 'express';
import HabitacionesModel from "../models/habitacionesModel";
import jwt from "jsonwebtoken";
import habitacionesModel from '../models/habitacionesModel';
//import bcrypt from "bcrypt";
class HabitacionesController {


	public async habitacionesC(req: Request, res: Response) {    
		//const { habitaciones } = req.body;
		const result = await habitacionesModel.listarhabitaciones();
		//console.log(result.idPersona);
		console.log(result);
		return res.json(result);
		
    }
}

const habitacionesController = new HabitacionesController();
export default habitacionesController;
