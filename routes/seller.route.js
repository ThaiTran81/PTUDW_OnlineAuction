import express from 'express';
import usersModel from '../models/users.model.js';
import sellerModel from "../models/seller.model.js"

const router = express.Router();

router.get('/:id', async function(req, res){
    const UID = req.params.id;
    const curPros = await sellerModel.findAllCurrentProduct(UID);
    const winPros = await sellerModel.findAllHasWinnerProduct(UID);
    const user = await usersModel.findUserByUID(UID);

    const limit = 6;

    const curProPage = req.query.curProPage || 1;
    const curProOffset = (curProPage - 1) * limit;

    const totalCurPros = curPros.length;
    let nCurProPages = Math.floor(totalCurPros / limit);
    if (totalCurPros % limit > 0) nCurProPages++;

    const curProPageNumbers = [];
    for (let i = 1; i <= nCurProPages; i++) {
        curProPageNumbers.push({
            value: i,
            isCurrent: +curProPage === i
        });
    }

    const curProlist = await sellerModel.findCurrentProductByPage(UID, limit, curProOffset);

    const winProPage = req.query.winProPage || 1;
    const winProOffset = (winProPage - 1) * limit;

    const totalWinPros = winPros.length;
    let nWinProPages = Math.floor(totalWinPros / limit);
    if (totalWinPros % limit > 0) nWinProPages++;

    const winProPageNumbers = [];
    for (let i = 1; i <= nWinProPages; i++) {
        winProPageNumbers.push({
            value: i,
            isCurrent: +winProPage === i
        });
    }

    const winProlist = await sellerModel.findHasWinnerProductByPage(UID, limit, winProOffset);

    res.render('vwSeller/seller', {
        user,
        curProducts: curProlist,
        winProducts: winProlist,
        curProPageNumbers,
        winProPageNumbers
    });
});

export default router;