import express from 'express';
import usersModel from '../models/users.model.js';
import sellerModel from "../models/seller.model.js"

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

export default router;