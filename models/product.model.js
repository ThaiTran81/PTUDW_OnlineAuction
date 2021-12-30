import knex from '../utils/db.js';

export default {
    findAll() {
        return knex('product');
    },

    findByCatId(catid) {

        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .select('product.proID', 'product.typID', 'type.catID', 'product.proName', 'product.startPrice', 'product.buyNow', 'product.startDate', 'product.endDate')
            .where('type.catID','=', catid);
    },
}
