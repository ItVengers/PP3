export interface Usuario{
	id?: number;
	nombre?: string;
	apellido?: string;
	dni?: number;
	telefono?: number;
	legajo?: number;
	rol?: string;
	mail?: string;
	contrasenia?: string;
}

//Todos los atributos los declaramos como opcionales para dar flexibilidad.