import knex from '../utils/db.js';

export default {
    findAll() {
        return knex('product');
    },
    findByType(typID){
        return knex('product').where('product.typID','=',typID);
    },

    findByCatId(catid) {

        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .select('product.proID', 'product.typID', 'type.catID', 'product.proName', 'product.startPrice', 'product.buyNow', 'product.startDate', 'product.endDate')
            .where('type.catID','=', catid);
    },
    findPageByCatId(catId, limit, offset) {
        return db('product').where('CatID', catId).limit(limit).offset(offset);
    },
    findPageByType(catId, typeId, limit, offset){
        return knex('product')
            .join('type', 'product.typID', '=', 'type.typID')
            .select('product.proID', 'product.typID', 'type.catID', 'product.proName', 'product.startPrice', 'product.buyNow', 'product.startDate', 'product.endDate')
            .where('type.catID','=', catid).limit(limit).offset(offset);
    }
}
