import knex from "../utils/db.js";

export default {
    findCate(){
        return knex.select().from('category');
    },
    findCategoryById(catID){
        return knex('category').where('catID', catID);
    },
    findAllTypeByCat(id){
        const rows =  knex('type').where('catID', id);
        if(rows.length ===0) return null;
        return rows;
    },
    addNewCategory(catName){
        return knex('category').insert({'catName': catName}).returning('catID');
    },
    deleteCategory(catID){
        return knex('category').where('catID', catID).delete('catID');
    },
    deleteAllType(catID){
        return knex('type').where('catID', catID).delete('typID','catID');
    },
    addNewType(catID, typName){
        return knex('type').where('catID', catID).insert({'catID':catID, 'typName': typName});
    },
    updateCategory(catID, catName){
        return knex('category').where('catID', catID).update({'catName': catName});
    },
    updateType(catID, typID, typName){
        return knex('type').where({'catID': catID, 'typID': typID}).update({'typName': typName});
    },
    deleteType(catID, typID){
        return knex('type').where({'catID': catID, 'typID': typID}).delete();
    }
}