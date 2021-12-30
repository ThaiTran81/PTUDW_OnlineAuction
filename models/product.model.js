import db from '../utils/db.js';

export default {
  findAll() {
    return db('product');
  },

  findByCatId(typId) {
    return db('product').where('typID', typId);
  },
}
