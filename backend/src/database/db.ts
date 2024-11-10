import {Pool, PoolClient, QueryResult} from "pg";
import "dotenv/config";

declare global {
    var connection: Pool | undefined
}

export default async function connect (): Promise<PoolClient> {
    if (global.connection) {
        return global.connection.connect();
    }

    
    const poolConfig = {
        user:process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined
    };

    try {
        const pool = new Pool(poolConfig);
        global.connection = pool;

        //Testando conecxao e consulta
        const client: PoolClient = await pool.connect();
        const res: QueryResult<any> = await client.query("SELECT NOW()");
        client.release();

        return pool.connect();
    }catch (error) {
        console.log("Erro ao conectar ao banco de dados", error);
        throw error;
    }
}