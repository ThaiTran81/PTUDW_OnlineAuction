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
    //by cat
    async findPageByCatId(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID= ' + catId + ' LIMIT ' + limit + ' OFFSET ' + offset);
        return proByCat[0];
    },
    async findPageByCatId_TimeAsc(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID= ' + catId + ' ORDER BY p.endDate ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByCat[0];
    },
    async findPageByCatId_PriceAsc(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID= ' + catId + ' ORDER BY h.price ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByCat[0];
    },
    async findPageByCatId_PriceDesc(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID= ' + catId + ' ORDER BY h.price DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByCat[0];
    },
    async findPageByCatId_TimeDesc(catId, limit, offset) {
        const proByCat = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN type ON type.typID=p.typID WHERE p.endDate> NOW() AND type.catID=' + catId + ' ORDER BY p.endDate DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByCat[0];
    },
    // by type
    async findPageByType(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID=' + typeId + ' LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByType_TimeAsc(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID=' + typeId + ' ORDER BY p.endDate ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByType_TimeDesc(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID=' + typeId + ' ORDER BY p.endDate DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByType_priceDesc(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID=' + typeId + ' ORDER BY h.price DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByType_priceAsc(catId, typeId, limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND typID=' + typeId + ' ORDER BY h.price ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    // all
    async findPageByAll_TimeAsc(limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW()' + ' ORDER BY p.endDate ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByAll_TimeDesc(limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW()' + ' ORDER BY p.endDate DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByAll_priceDesc(limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW()' + ' ORDER BY h.price DESC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async findPageByAll_priceAsc(limit, offset) {
        const proByType = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW()' + ' ORDER BY h.price ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return proByType[0];
    },
    async countByAll() {
        const list = await knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .where('endDate', '>', new Date()).count({amount: 'proID'});
        return list[0].amount;
    },
    async countByCatId(catId) {
        const list = await knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .where('CatID', catId).andWhere('endDate', '>', new Date()).count({amount: 'proID'});
        return list[0].amount;
    },

    async findTopEnd(n) {
        const top_end = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY p.endDate ASC LIMIT ' + n)
        return top_end[0];
    },

    async findTopBid(n) {
        const topBid = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY p.BidCount DESC LIMIT ' + n);
        return topBid[0];
    },

    async findTopPrice(n) {
        const topPrice = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() ORDER BY h.price DESC LIMIT ' + n)
        return topPrice[0];
    },

    async findCurBid(uID) {
        const curBid = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN currentauction c1 ON c1.proID=p.proID WHERE p.endDate> NOW() AND c1.UID=' + uID + ' LIMIT 12')
        return curBid[0];
    },
    async findWinBid(uID) {
        const winBid = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate< NOW() AND h.UID=' + uID);
        return winBid[0];
    },
    async findWatchList(uID) {
        const watchList = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN watchlist w ON w.proID=p.proID WHERE w.UID=' + uID);
        return watchList[0];
    },
    async findHistoryBid(uID) {
        const historyBid = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID JOIN currentauction c2 ON c2.proID=p.proID WHERE p.endDate<=NOW() AND c2.UID=' + uID);
        return historyBid[0];
    },
    async findById(proID) {
        const list = await knex.raw('SELECT p.*,u.* FROM product p JOIN users u ON p.ownerUID = u.UID WHERE p.proID = ' + proID);
        if (list.length === 0)
            return null;

        return list[0][0];
    }
}
