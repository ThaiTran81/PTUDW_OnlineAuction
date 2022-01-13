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
    async findRelateProduct(proID, typID, n) {
        const list = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND p.typID = ' + typID + ' AND p.proID <> ' + proID + ' ORDER BY p.endDate ASC LIMIT '+ n)
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
    },
    async checkBidderInAuction(proID, UID) {
        const list = await knex.raw('SELECT * FROM currentauction WHERE proID = ' + proID + ' AND UID = ' + UID);
        if (list[0].length === 0)
            return 0;

        return list[0];
    },
    addAuctionBidder(bidder) {
        return knex('currentauction').insert({
            UID: bidder.UID,
            proID: bidder.proID,
            maxPrice: bidder.maxPrice
        });
    },
    addAuctionBid(bid) {
        return knex('historyauc').insert({
            aucTime: new Date(),
            UID: bid.UID,
            proID: bid.proID,
            price: bid.price
        });
    },
    async updateMaxPrice(maxPrice, proID, UID) {
        return knex.raw('UPDATE currentauction SET maxPrice = ' + maxPrice + ' WHERE proID = ' + proID + ' AND UID = ' + UID);
    }
}
