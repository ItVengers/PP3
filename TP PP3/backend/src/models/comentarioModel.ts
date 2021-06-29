import { createPool } from 'mysql2/promise';

class ComentarioModel {
    private db: any;
    constructor() {
        this.config(); //aplicamos la conexion con la BD.
    }

    async config() {//Parametro de conexion con la BD.
        this.db = await createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'testing',
            connectionLimit: 10
        });
    }

    async listar() {//Devuelve todas las filas de la tabla usuario
        //const db=this.connection;
        const comentario = await this.db.query('SELECT * FROM comentario ORDER BY fcreacion desc');
        //console.log(usuarios[0]);
        //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
        return comentario[0];
    }

    async buscarId(id: string) {
        const encontrado: any = await this.db.query('SELECT * FROM comentario WHERE id = ?', [id]);
        //Ojo la consulta devuelve una tabla de una fila. (Array de array) Hay que desempaquetar y obtener la unica fila al enviar
        if (encontrado.length > 1)
            return encontrado[0];
        return null;
    }
  

    //Devuelve 1 si logro crear un nuevo usuario de la tabla usuarios
    async crear(comentario: object) {
        const result = (await this.db.query('INSERT INTO comentario SET ?', [comentario]))[0].affectedRows;
        console.log(result);
        return result;
    }

    //Devuelve 1 si logro eliminar el usuario indicado por id
    async eliminar(id: string) {
        const comentario = (await this.db.query('DELETE FROM comentario WHERE ID = ?', [id]))[0].affectedRows;
        console.log(comentario);
        return comentario;
    }

    async ordenar() {
        //const db=this.connection;
        const comentario = await this.db.query('SELECT * FROM comentario ORDER BY fcreacion asc');
        //console.log(usuarios[0]);
        //devuelve tabla mas propiedades. Solo debemos devolver tabla. Posicion 0 del array devuelto.
        return comentario[0];
    }

}

//Exportamos el enrutador con 

const comentarioModel: ComentarioModel = new ComentarioModel();
export default comentarioModel;
