import { PoolClient, QueryResult } from "pg";
import connect from "../db";

export default class titleModel {

    private client: Promise<PoolClient>;

    constructor() {
        this.client = connect();
    }
    
    async addTitle(description: string) {
        try {
            const query: string = "INSERT INTO title (tx_description) VALUES ($1) RETURNING *";
            const result: QueryResult<any> = await (await this.client).query(query, [description]);
            return result.rows[0];
        }catch (error) {
            console.log(error);
            throw error;
        }finally {
            (await this.client).release();
        }
        
    }
}