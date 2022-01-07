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
    findPageByCatId(catId, limit, offset) {
        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .where('type.CatID', catId).limit(limit).offset(offset);
    },
    findPageByType(catId, typeId, limit, offset) {
        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .select('product.proID', 'product.typID', 'type.catID', 'product.proName', 'product.startPrice', 'product.buyNow', 'product.startDate', 'product.endDate')
            .where({'type.catID':catId, 'type.typID':typeId}).limit(limit).offset(offset);
    },
    async countByCatId(catId) {
        const list = await knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .where('CatID', catId).count({amount: 'proID'});
        return list[0].amount;
    },

    findTop5End(){
        return knex('product').limit(5).where('endDate','>',Date.now()).orderBy('endDate')
    }
}
