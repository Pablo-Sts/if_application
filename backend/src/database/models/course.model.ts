import { QueryResult } from "pg";
import Course from "../../../classes/course";
import Model from "./model";

export default class CourseModel extends Model {
    
    constructor() {
        super("course");
    }

    async add(course: Course) {
        try {
            const query: string = "INSERT INTO course (id_institution, in_course_type, tx_description) VALUES ($1 $2 $3)";
            const result: QueryResult<any> = await (await this.client).query(query, [course.id_institution, course.course_type, course.description]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }

    async update(course: Course) {
        try {
            const query: string = "UPDATE course SET id_institution = $2, in_course_type = $3, tx_description = $4 WHERE id_course = $1";
            const result: QueryResult<any> = await (await this.client).query(query, [...Object.values(course)]);
            return result.rows[0];
        } catch (error) {
            throw error;
        } finally {
            (await this.client).release();
        }
    }
}