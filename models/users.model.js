import knex from "../utils/db.js";

export default {
    findCate() {
        return knex.select().from('user');
    },

    add(user) {
        return knex('users').insert({
            name: user.name,
            addr: user.address,
            email: user.email,
            password: user.password,
            type: user.type
        });
    },
    async findUserByEmail(email) {
        const list = await knex('users').where('email', email);
        if (list.length === 0) {
            return null;
        }
        return list[0];
    }
}