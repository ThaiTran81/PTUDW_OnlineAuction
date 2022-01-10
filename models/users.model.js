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
    },
    async findAllWaitSellers(){
        const waitList = await knex.raw('SELECT u.UID,u.email,u.`name`,u.addr,u.dob,u.good,u.dislike,us.askDate FROM users u JOIN upseller us ON u.UID=us.UID WHERE us.isAcpt=0');
        return waitList[0];
    },
    changeTypeUser(role, uid){
        return knex('users').where('UID',uid).update({type:role}).returning('UID');
    },
    removeFromWaitSeller(uid){
        return knex('upSeller').where('UID',uid).delete().returning('UID');
    }
}