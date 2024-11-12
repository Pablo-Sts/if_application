import { PoolClient, QueryResult } from "pg";
import connect from "../db";

export default class Model {
    private targetTable: string;
    protected client: Promise<PoolClient>;

    constructor(targetTable: string) {
        this.client =  connect();
        this.targetTable = targetTable;
    }

    async getAll() {
        try {
            const query: string = `SELECT * FROM ${this.targetTable}`; // Consulta SQL para buscar todos os registros na tabela
            const result: QueryResult<any> = await (await this.client).query(query);
            return result.rows[0];
        }catch(error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }

    async delete(id: number) {
        try {
            const query: string = `DELETE FROM ${this.targetTable} WHERE id_${this.targetTable} = $1 RETURNING *`; // Consulta SQL para deleter os itens de uma tabela com um id específico
            const result: QueryResult<any> = await (await this.client).query(query, [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }
}