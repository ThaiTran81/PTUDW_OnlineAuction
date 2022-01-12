import knex from "../utils/db.js";

export default {
    async findAllCurrentProduct(UID){
        const curPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND p.ownerUID = ' + UID + ' ORDER BY p.endDate ASC')
        return curPros[0];
    },
    async findCurrentProductByPage(UID, limit, offset){
        const curPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.endDate> NOW() AND p.ownerUID = ' + UID + ' ORDER BY p.endDate ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return curPros[0];
    },
    async findAllHasWinnerProduct(UID){
        const winPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.proID IN (SELECT proID FROM winauction) AND p.buyUID = -1 AND p.ownerUID = ' + UID + ' ORDER BY p.endDate ASC')
        return winPros[0];
    },
    async findHasWinnerProductByPage(UID, limit, offset){
        const winPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price, 0 AS isRate FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.proID IN (SELECT proID FROM winauction) AND p.buyUID = -1 AND p.ownerUID = ' + UID + ' ORDER BY p.isRated ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return winPros[0];
    },
    async findAllHasBuyerProduct(UID){
        const winPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.proID IN (SELECT proID FROM winauction) AND p.buyUID <> -1 AND p.ownerUID = ' + UID + ' ORDER BY p.endDate ASC')
        return winPros[0];
    },
    async findHasBuyerProductByPage(UID, limit, offset){
        const winPros = await knex.raw('SELECT p.*,u.UID,u.`name`,u.email,h.price, 0 AS isRate FROM product p JOIN historyauc h ON p.proID=h.proID JOIN (\n' +
            'SELECT h2.proID,MAX(h2.price) AS price FROM historyauc h2 JOIN currentauction c ON h2.UID=c.UID WHERE c.isBlock !=1 GROUP BY h2.proID) t1 ON t1.proID=h.proID AND h.price=t1.price JOIN users u ON h.UID=u.UID WHERE p.proID IN (SELECT proID FROM winauction) AND p.buyUID <> -1 AND p.ownerUID = ' + UID + ' ORDER BY p.isRated ASC LIMIT ' + limit + ' OFFSET ' + offset);
        return winPros[0];
    }
}