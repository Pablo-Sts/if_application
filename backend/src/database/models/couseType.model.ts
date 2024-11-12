import { QueryResult } from "pg";
import CourseType from "../../../classes/courseType";
import Model from "./model";

export default class CourseTypeModel extends Model {
    
    constructor() {
        super("course_type");
    }

    async add(courseType: CourseType) {
        try {
            const query: string = "INSERT INTO course_type (tx_description) VALUES ($1)";
            const result: QueryResult<any> = await (await this.client).query(query, [courseType.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }

    async update(courseType: CourseType) {
        try {
            const query: string = "UPDATE course_type SET tx_description = $2 WHERE id_course_type = $1";
            const result: QueryResult<any> = await (await this.client).query(query, [courseType.id, courseType.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }
}