import { QueryResult } from "pg";
import Model from "./model";
import Title from "../../../classes/title";

export default class titleModel extends Model {

    constructor() {
        super("title");
    }
    
    async add(description: string) {
        try {
            const query: string = "INSERT INTO title (tx_description) VALUES ($1) RETURNING *";
            const result: QueryResult<any> = await (await this.client).query(query, [description]);
            return result.rows[0];
        }catch (error) {
            throw error;
        }finally {
            (await this.client).release();
        }
        
    }

    async update(title: Title) {
        try {
            const query: string = "UPDATE title SET tx_description = $2 WHERE id_title = $1 RETURNING *";
            const result: QueryResult<any> = await (await this.client).query(query, [title.id, title.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }

}