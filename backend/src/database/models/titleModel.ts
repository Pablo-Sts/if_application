import { PoolClient, QueryResult } from "pg";
import connect from "../db";

export default class titleModel {

    private client: Promise<PoolClient>;

    constructor() {
        this.client = connect();
    }

    async getTitle(id: number) {
        try {
            const query: string = "SELECT * FROM title WHERE id_title = $1";
            const result: QueryResult<any> = await (await this.client).query(query, [id]);
            return result.rows[0];
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            (await this.client).release();
        }
    }

    async getAllTitles() {
        try {
            const query: string = "SELECT * FROM title";
            const result: QueryResult<any> = await (await this.client).query(query);
            return result.rows[0];
        }catch(error) {
            console.log(error);
            throw error;
        } finally {
            (await this.client).release();
        }
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