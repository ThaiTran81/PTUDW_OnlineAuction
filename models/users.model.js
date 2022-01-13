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
    async findUserByUID(UID) {
        const list = await knex('users').where('UID', UID);
        if (list.length === 0) {
            return null;
        }
        return list[0];
    },
    async findAllWaitSellers(){
        const waitList = await knex.raw('SELECT u.UID,u.email,u.`name`,u.addr,u.dob,u.good,u.dislike,us.askDate FROM users u JOIN upseller us ON u.UID=us.UID WHERE us.isAcpt=0');
        return waitList[0];
    },
    changeTypeUser(role, email){
        return knex('users').where('email',email).update({type:role}).returning('UID');
    },
    removeFromWaitSeller(uid){
        return knex('upSeller').where('UID',uid).delete().returning('UID');
    },
    findPageUser(limit, offset){
        return knex('users').where('type','>',0).limit(limit).offset(offset);
    },
    async countAllUser(){
        const lst = await knex('users').where('type','>',0).count({amount: 'UID'});
        return lst[0].amount;
    },
    async getFeedbackByUID(uid){
        const lst = await knex.raw('SELECT p.proID,p.proName,u.UID,u.`name`,r.content,r.Type,r.sendTime FROM rating r JOIN product p ON r.ratingProID=p.proID JOIN users u ON u.UID=r.UIDRater WHERE r.UID='+uid);
        if(lst[0].length === 0){
            return null;
        }
        return lst[0];
    }
}