import express from 'express';
import usersModel from '../models/users.model.js';
import sellerModel from "../models/seller.model.js"
import categoryModel from "../models/category.model.js"
import productModel from "../models/product.model.js"
import detailModel from "../models/detail.model.js";

const router = express.Router();

router.get('/current-product/:id', async function(req, res){
    const UID = req.params.id;
    const pros = await sellerModel.findAllCurrentProduct(UID);

    const limit = 6;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await pros.length;
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await sellerModel.findCurrentProductByPage(UID, limit, offset);

    res.render('vwSeller/currentProduct', {
        products: list,
        pageNumbers
    });
});

router.get('/has-winner-product/:id', async function(req, res){
    const UID = req.params.id;
    const pros = await sellerModel.findAllHasWinnerProduct(UID);

    const limit = 6;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await pros.length;
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await sellerModel.findHasWinnerProductByPage(UID, limit, offset);

    res.render('vwSeller/hasWinnerProduct', {
        products: list,
        pageNumbers
    });
});

router.get('/has-buyer-product/:id', async function(req, res){
    const UID = req.params.id;
    const pros = await sellerModel.findAllHasBuyerProduct(UID);

    const limit = 6;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await pros.length;
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }

    const list = await sellerModel.findHasBuyerProductByPage(UID, limit, offset);

    res.render('vwSeller/hasBuyerProduct', {
        products: list,
        pageNumbers
    });
});

router.get('/types/:catID', async function (req, res) {
    const catID = req.params.catID;
    let types = await categoryModel.findAllTypeByCat(catID);

    res.send(types);
})

router.post('/addProduct/:id', async function (req, res){
    const uid = req.params.id;

    let a = 0, b = 0, n = 0;
    if (req.body.autoExtendAuction == 'on') {
        a = 1;
    }
    if (req.body.allowBadBidder == 'on') {
        b = 1;
    }
    if (req.body.allowNewBidder == 'on') {
        n = 1;
    }
    const d = new Date();
    const product = {
        typID: req.body.productType,
        proName: req.body.productName,
        ownerUID: uid,
        startPrice: req.body.startPrice,
        buyNow: req.body.orgPrice,
        startDate: d,
        endDate: req.body.endTime,
        autoExtend: a,
        stepPrice: req.body.stepPrice,
        allowBadBidder: b,
        allowNewBidder: n
    }
    const temp = await productModel.addNewProduct(product);
    console.log(temp)
    const des = {
        proID: temp,
        description: req.body.desContent
    }
    await detailModel.addDescription(des);

    res.redirect('/seller/current-product/' + uid);
})

export default router;