import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import detailModel from "../models/detail.model.js";
import protectEmail from "../middlewares/protectEmail.mdw.js";

const router = express.Router();

router.get('/category/:catID', async function (req, res) {

    const catId = req.params.catID || 1;
    const sort = req.query.sort || 'timeDesc';
    let nCategories = [];
    var selected = res.locals.lcCategories[0];
    var lst = res.locals.lcCategories;
    var filter = res.locals.sort;
    var lstType = await categoryModel.findAllTypeByCat(catId);

    for (let i=0; i<lst.length; i++) {
        if (lst[i].catID === +catId) {
            selected = lst[i];
        }
        else{
            nCategories.push(lst[i]);
        }
    }


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

    for(let i = 0; i< filter.length;i++){
        filter[i].isSelected = sort === filter[i].value;
    }
    var list;
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageByCatId_TimeDesc(catId,limit, offset);
            break;
        case "timeAsc":
            list = await productModel.findPageByCatId_TimeAsc(catId,limit, offset);
            break;
        case "priceAsc":
            list = await productModel.findPageByCatId_PriceAsc(catId, limit, offset);
            break;
        case "priceDesc":
            list = await productModel.findPageByCatId_PriceDesc(catId, limit, offset);
            break;
    }

    // list = await productModel.findPageByCatId(catId, limit, offset);
    res.render('vwProduct/byCat', {
        products: list,
        empty: list.length === 0,
        pageNumbers,
        lstCategories: nCategories,
        selectedCate: selected,
        types: lstType
    });
});

router.get('/category/:catID/type/:typeID', async function (req, res) {
    console.log(req.params.typeID)
    const catId = req.params.catID || 1;
    const typeId = req.params.typeID || 1;
    const sort = req.query.sort || 'timeDesc';
    let nCategories = [];
    var selectedCat = res.locals.lcCategories[0];
    var lst = res.locals.lcCategories;
    var filter = res.locals.sort;
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

    for(let i = 0; i< filter.length;i++){
        filter[i].isSelected = sort === filter[i].value;
    }
    var list;
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageByType_TimeDesc(catId, typeId,limit, offset);
            break;
        case "timeAsc":
            list = await productModel.findPageByType_TimeAsc(catId, typeId,limit, offset);
            break;
        case "priceAsc":
            list = await productModel.findPageByType_priceAsc(catId, typeId, limit, offset);
            break;
        case "priceDesc":
            list = await productModel.findPageByType_priceDesc(catId, typeId, limit, offset);
            break;
    }
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

router.get('/detail/:id', async function (req, res){
    const proID = req.params.id;
    const product = await detailModel.findById(proID);
    const description = await detailModel.getDescription(proID);
    const historyBid = await detailModel.findHistoryBid(proID);
    const currentPrice = historyBid.pop();
    historyBid.push(currentPrice);
    const currentBidder = await detailModel.findBidder(proID);
    if (product === null) {
        return res.redirect('/');
    }
    console.log(description);
    res.render('vwProduct/productDetail', { product, description, historyBid, currentPrice, currentBidder });
})


export default router;