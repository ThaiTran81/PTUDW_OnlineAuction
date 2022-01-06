import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js"

const router = express.Router();

router.get('/', async function (req, res){

})

router.get('/:catID', async function (req, res) {

    const catId = req.params.catID || 1;
    let nCategories = [];
    var selected = res.locals.lcCategories[0];
    var lst = res.locals.lcCategories;
    var lstType = await categoryModel.findAllTypeByCat(catId);

    for (let i=0; i<lst.length; i++) {
        console.log(lst[i]);
        if (lst[i].catID === +catId) {
            selected = lst[i];
        }
        else{
            nCategories.push(lst[i]);
        }
    }
    console.log(selected);
    const limit = 12;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countByCatId(catId);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await productModel.findPageByCatId(catId, limit, offset);
    res.render('vwProduct/byCat', {
        products: list,
        empty: list.length === 0,
        pageNumbers,
        lstCategories: nCategories,
        selectedCate: selected,
        types: lstType
    });
});

router.get('/:catID/:typeID', async function (req, res) {

    const catId = req.params.catID || 1;
    const typeId = req.params.typeID || 1;
    let nCategories = [];
    var selectedCat = res.locals.lcCategories[0];
    var lst = res.locals.lcCategories;
    var lstType = await categoryModel.findAllTypeByCat(catId);
    var selectedType = lstType[0];

    for (let i=0; i<lst.length; i++) {
        if (lst[i].catID === +catId) {
            selectedCat = lst[i];
        }
        else{
            nCategories.push(lst[i]);
        }
    }

    for (let i=0; i<lstType.length; i++) {
        if (lstType[i].typID === +typeId) {
            selectedType = lstType[i];
            lstType.splice(i,1);
        }
    }

    console.log(selectedCat);
    const limit = 12;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countByCatId(catId);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await productModel.findPageByType(catId,typeId, limit, offset);
    res.render('vwProduct/byType', {
        products: list,
        empty: list.length === 0,
        pageNumbers,
        lstCategories: nCategories,
        selectedCate: selectedCat,
        types: lstType,
        selectedType
    });
});


export default router;