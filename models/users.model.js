import knex from "../utils/db.js";

export default {
    findCate(){
        return knex.select().from('user');
    }

    
}