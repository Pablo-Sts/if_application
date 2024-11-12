import { QueryResult } from "pg";
import Institution from "../../../classes/institution";
import Model from "./model";

export default class InstitutionModel extends Model {

    constructor() {
        super("Institution");
    }

    async add(institution: Institution) {
        try {
            const query: string = "INSERT INTO institution (tx_acronym, tx_description) VALUES ($1 $2)";
            const result: QueryResult<any> = await (await this.client).query(query, [institution.acronym, institution.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }

    async update(institution: Institution) {
        try {
            const query: string = "UPDATE institution SET tx_acronym = $2, tx_description = $3 WHERE id_institution = $1";
            const result: QueryResult<any> = await (await this.client).query(query, [institution.id, institution.acronym, institution.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release()
        }
    }

}