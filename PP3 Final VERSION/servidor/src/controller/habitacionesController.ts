import { Request, Response } from 'express';
import HabitacionesModel from "../models/habitacionesModel";
import jwt from "jsonwebtoken";
import habitacionesModel from '../models/habitacionesModel';
//import bcrypt from "bcrypt";
class HabitacionesController {


	public async habitacionesC(req: Request, res: Response) {
		console.log("ESTOY EN EL METODO DEL BACKEND")
		const { fechaIngreso, fechaEgreso, cantPersona } = req.body;

		const result = await habitacionesModel.listarhabitaciones(fechaIngreso, fechaEgreso, cantPersona);
		//console.log(result.idPersona);
		console.log(result);
		return res.json(result);

	}

	public async crearReserva(req: Request, res: Response) {
		const { fecCheckIn, fecCheckOut, fecReserva, habId, precio, status, perId } = req.body;
		const result = await habitacionesModel.crearReserva(fecCheckIn, fecCheckOut, fecReserva, habId, status, precio, perId);
		console.log(result);
		res.status(200).json({ message: "RESERVA HECHA!!" });
	}
}

const habitacionesController = new HabitacionesController();
export default habitacionesController;
