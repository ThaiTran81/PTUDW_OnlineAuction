import knex from "../utils/db.js";

export default {
    findCate(){
        return knex.select().from('user');
    },

    add(user){
        return knex('users').insert({email: user.email, password: user.password, type: user.type});
    }

    
}