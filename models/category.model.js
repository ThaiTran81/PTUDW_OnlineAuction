import knex from "../utils/db.js";

export default {
    findCate(){
        return knex.select().from('category');
    },
    findAllTypeByCat(id){
        console.log(id);
        const rows =  knex('type').where('catID', id);
        if(rows.length ===0) return null;
        return rows;
    }
}