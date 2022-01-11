import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import detailModel from "../models/detail.model.js";
import protectEmail from "../middlewares/protectEmail.mdw.js";

const router = express.Router();

router.get('/', async function (req, res) {
    const keyword = req.query.keyword;
    const catID = req.query.catID;
    const typID = req.query.typID;
    const sort = req.query.sort || 'timeDesc'
    const page = req.query.page || 0;
    let selectedCate = {'catID': '', 'catName': 'Tất cả'};
    let nCategories = [];
    const lst = res.locals.lcCategories;
    let lstType;
    let selectedType;

    if (keyword.length===0) {
        res.redirect('/product/category/' + catID);
    }

    for (let i = 0; i < lst.length; i++) {
        if (lst[i].catID === +catID) {
            selectedCate = lst[i];
        } else {
            nCategories.push(lst[i]);
        }
    }

    if (selectedCate !== '') {
        lstType = await categoryModel.findAllTypeByCat(catID);
        for (let i = 0; i < lstType.length; i++) {
            if (lstType[i].typID === +typID) {
                selectedType = lstType[i];
                lstType.splice(i, 1);
            }
        }
    }

    res.render('vwProduct/bySearch', {
        lstCategories: nCategories,
        selectedCate,
        selectedType,
        selectedSort: sort,
        keyword,
        types: lstType
    })
})

router.get('/category', async function (req, res) {
    const sort = req.query.sort || 'timeDesc';
    var selected = {
        catID: "",
        catName: 'Tất cả',
    }

    var lst = res.locals.lcCategories;
    var filter = res.locals.sort;

    const limit = 12;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await productModel.countByAll();
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    for (let i = 0; i < filter.length; i++) {
        filter[i].isSelected = sort === filter[i].value;
    }
    var list;
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageByAll_TimeDesc(limit, offset);
            break;
        case "timeAsc":
            list = await productModel.findPageByAll_TimeAsc(limit, offset);
            break;
        case "priceAsc":
            list = await productModel.findPageByAll_priceAsc(limit, offset);
            break;
        case "priceDesc":
            list = await productModel.findPageByAll_priceDesc(limit, offset);
            break;
    }

    // list = await productModel.findPageByCatId(catId, limit, offset);
    res.render('vwProduct/byCat', {
        products: list,
        empty: list.length === 0,
        pageNumbers,
        lstCategories: lst,
        selectedCate: selected,
        selectedSort: sort,
    });

})

router.get('/category/:catID', async function (req, res) {

    const catId = req.params.catID || 1;
    const sort = req.query.sort || 'timeDesc';
    let nCategories = [];
    var selected = res.locals.lcCategories[0];
    var lst = res.locals.lcCategories;
    var filter = res.locals.sort;
    var lstType = await categoryModel.findAllTypeByCat(catId);

    for (let i = 0; i < lst.length; i++) {
        if (lst[i].catID === +catId) {
            selected = lst[i];
        } else {
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

    for (let i = 0; i < filter.length; i++) {
        filter[i].isSelected = sort === filter[i].value;
    }
    var list;
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageByCatId_TimeDesc(catId, limit, offset);
            break;
        case "timeAsc":
            list = await productModel.findPageByCatId_TimeAsc(catId, limit, offset);
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
        types: lstType,
        selectedSort: sort
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

    for (let i = 0; i < lst.length; i++) {
        if (lst[i].catID === +catId) {
            selectedCat = lst[i];
        } else {
            nCategories.push(lst[i]);
        }
    }

    for (let i = 0; i < lstType.length; i++) {
        if (lstType[i].typID === +typeId) {
            selectedType = lstType[i];
            lstType.splice(i, 1);
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

    for (let i = 0; i < filter.length; i++) {
        filter[i].isSelected = sort === filter[i].value;
    }
    var list;
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageByType_TimeDesc(catId, typeId, limit, offset);
            break;
        case "timeAsc":
            list = await productModel.findPageByType_TimeAsc(catId, typeId, limit, offset);
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
        selectedType,
        selectedSort: sort
    });
});

router.get('/detail/:id', async function (req, res) {
    const proID = req.params.id;
    const product = await detailModel.findById(proID);
    const description = await detailModel.getDescription(proID);
    const relatePros = await detailModel.findRelateProduct(product.proID, product.typID, 5);
    const historyBid = await detailModel.findHistoryBid(proID);
    const currentPrice = historyBid.pop();
    historyBid.push(currentPrice);
    const currentBidder = await detailModel.findBidder(proID);
    if (product === null) {
        return res.redirect('/');
    }
    console.log(product.proID);
    res.render('vwProduct/productDetail', {product, relatePros, description, historyBid, currentPrice, currentBidder});
})


export default router;