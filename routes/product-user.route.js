import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from"../models/category.model.js"
const router = express.Router();

router.get('/:catID', async function (req, res) {
    const catId = req.params.catID || 0;
    const list = await productModel.findByCatId(catId);
    const typeList = await categoryModel.findAllTypeByCat(catId);
    console.log(list);
    res.render('vwProduct/bycat', {products: list, types: typeList, empty: list.length === 0});
})

export default router;