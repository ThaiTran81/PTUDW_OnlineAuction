import knex from '../utils/db.js';

export default {
    async findById(proID) {
        const list = await knex.raw('SELECT p.*,u.* FROM product p JOIN users u ON p.ownerUID = u.UID WHERE p.proID = ' + proID);
        if (list.length === 0)
            return null;

        return list[0][0];
    },
    async getDescription(proID) {
        const list = await knex.raw('SELECT d.* FROM product p JOIN description d ON p.proID = d.proID WHERE p.proID = ' + proID);
        if (list.length === 0)
            return null;

        return list[0];
    },
    async findHistoryBid(proID) {
        const list = await knex.raw('SELECT h.price, h.aucTime, u.* FROM historyauc h JOIN users u ON h.UID = u.UID WHERE h.proID = ' + proID);
        if (list.length === 0)
            return null;

        return list[0].sort((a, b) => (a.price > b.price) ? 1 : -1);
    },
    async findBidder(proID) {
        const list = await knex.raw('SELECT c.*, u.* FROM currentauction c JOIN users u ON c.UID = u.UID WHERE proID = ' + proID);
        if (list.length === 0)
            return null;

        return list[0];
    }
}
