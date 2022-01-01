import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js"

const router = express.Router();

router.get('/:catID', async function (req, res) {
    const catId = req.params.catID || 0;
    let list = await productModel.findByCatId(catId);
    const typeList = await categoryModel.findAllTypeByCat(catId);
    let typeID = req.query['type'] || undefined;

    let types = [];
    types.push({
        value: {typID: 0, typName:'Tất cả'},
        isCurType: true
    })
    if(typeID !== undefined && +typeID !== 0) {
        list = await productModel.findByType(typeID);
    }
    for (let i = 0; i < typeList.length; i++) {
        types.push({
            value: typeList[i],
            isCurType: typeList[i].typID === +typeID
        })
    }
    res.render('vwProduct/bycat', {
        products: list,
        categoryID: catId,
        types: types,
        empty: list.length === 0
    });
});

router.get('')


export default router;