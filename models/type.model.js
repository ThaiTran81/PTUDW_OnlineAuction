import knex from "../utils/db.js";

export default {
    findType(){
        return knex.select().from('type');
    }
}