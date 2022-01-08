import knex from '../utils/db.js';

export default {
    findAll() {
        return knex('product');
    },
    findByType(typID) {
        return knex('product').where('product.typID', '=', typID);
    },

    findByCatId(catid) {

        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .select('product.proID', 'product.typID', 'type.catID', 'product.proName', 'product.startPrice', 'product.buyNow', 'product.startDate', 'product.endDate')
            .where('type.catID', '=', catid);
    },
    async findPageByCatId(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID= '+catId+ ' LIMIT '+ limit+ ' OFFSET '+ offset);
        return proByCat[0];
    },
    async findPageByType(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID='+typeId +' LIMIT ' +limit +' OFFSET ' +offset);
        return proByType[0];
    },
    async countByCatId(catId) {
        const list = await knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .where('CatID', catId).andWhere('endDate','>', new Date()).count({amount: 'proID'});
        return list[0].amount;
    },

    async findTopEnd(n) {
        const top_end= await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY p.endDate ASC LIMIT '+n)
        return top_end[0];
    },

    async findTopBid(n) {
        const topBid = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY p.BidCount DESC LIMIT ' + n);
        return topBid[0];
    },

    async findTopPrice(n){
        const topPrice = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY h.price DESC LIMIT '+n)
        return topPrice[0];
    },

    async findProductPriceAndUser(id) {
        const priceUser = await knex.raw('SELECT u.`name`,\n' +
            '       u.email,\n' +
            '       h.price\n' +
            'FROM historyauc h\n' +
            'JOIN currentauction c ON h.UID = c.UID\n' +
            'JOIN users u ON u.UID = h.UID\n' +
            'WHERE h.proID = ' + id + ' ' +
            '  AND c.isBlock!=1\n' +
            'ORDER BY h.price DESC\n' +
            'LIMIT 1')
        return priceUser[0][0];
    },

    async findBidCount(id){
        const count = await knex.raw('SELECT COUNT(*) AS bidCount \n' +
            'FROM historyauc h INNER JOIN currentauction c ON h.UID = c.UID\n' +
            'WHERE c.isBlock!=1 AND h.proID ='+id)
        return count[0][0];
    }
}
