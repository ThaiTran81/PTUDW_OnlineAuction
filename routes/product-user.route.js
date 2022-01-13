import express from "express";
import productModel from "../models/product.model.js";
import categoryModel from "../models/category.model.js";
import detailModel from "../models/detail.model.js";
import userslModel from "../models/users.model.js";
import auth from "../middlewares/auth.mdw.js";
import emailModel from "../utils/email.js";

const router = express.Router();

router.get('/', async function (req, res) {
    const keyword = req.query.keyword;
    let catID = req.query.catID || null;
    const typID = req.query.typID || null;
    const sort = req.query.sort || 'timeDesc'
    let page = req.query.page || 1;
    let selectedCate = {'catID': '', 'catName': 'Tất cả'};
    let nCategories = [];
    const lst = res.locals.lcCategories;
    let filter = res.locals.sort;
    let lstType;
    let selectedType;

    if (keyword.trim().length===0) {
        if( catID===null) catID='';
        res.redirect('/product/category/' + catID);
    }

    for (let i = 0; i < lst.length; i++) {
        if (lst[i].catID === +catID) {
            selectedCate = lst[i];
        } else {
            nCategories.push(lst[i]);
        }
    }

    const limit = 12;
    const offset = (page - 1) * limit;

    const total = await productModel.countBySearch(keyword,catID, typID);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
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
    let list=null;

    for (let i = 0; i < filter.length; i++) {
        filter[i].isSelected = sort === filter[i].value;
    }
    let keyword_format = keyword.trim().replace('  ',' ').replace(' ',' +');
    switch (sort) {
        case "timeDesc":
            list = await productModel.findPageBySearch(keyword_format,catID, typID,'DESC', 'time',limit,offset);
            break;
        case "timeAsc":
            list = await productModel.findPageBySearch(keyword_format,catID, typID,'ASC', 'time',limit,offset);
            break;
        case "priceAsc":
            list = await productModel.findPageBySearch(keyword_format,catID, typID,'ASC', 'price',limit,offset);
            break;
        case "priceDesc":
            list = await productModel.findPageBySearch(keyword_format,catID, typID,'DESC', 'price',limit,offset);
            break;
    }

    res.render('vwProduct/bySearch', {
        empty: list===null,
        products: list,
        lstCategories: nCategories,
        selectedCate,
        selectedType,
        selectedSort: sort,
        keyword,
        types: lstType,
        pageNumbers
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
    let approvedMsg = '*';
    let blocked = 0;
    if (res.locals.authUser != null) {
        for (let i = 0; i < currentBidder.length; i++) {
            if (res.locals.authUser.UID == currentBidder[i].UID) {
                if (currentBidder[i].isBlock == 1) {
                    approvedMsg = approvedMsg + 'Tài khoản đã bị từ chối khỏi cuộc đấu giá này';
                    blocked = 1
                    break;
                }
            }
        }
        if (blocked === 0) {
            if (product.allowNewBidder == 0) {
                if (res.locals.authUser.good == 0 && res.locals.authUser.dislike == 0) {
                    approvedMsg = approvedMsg + 'Sản phẩm đấu giá này không cho phép tài khoản mới tham gia';
                    blocked = 1;
                }
            }
            if (blocked === 0) {
                if (product.allowBadBidder == 0) {
                    if (res.locals.authUser.good < 4 * res.locals.authUser.dislike) {
                        approvedMsg = approvedMsg + 'Tài khoản không đủ điểm đánh giá để tham đấu giá';
                        blocked = 1;
                    }
                }
                if (blocked === 0) {
                    approvedMsg = approvedMsg + 'Giá tham gia tối thiểu: ' + (parseInt(currentPrice.price) + parseInt(product.stepPrice));
                }
            }
        }
    }
    else {
        approvedMsg = approvedMsg + 'Vui lòng đăng nhập trươc khi tham gia đấu giá';
        blocked = 1;
    }
    const del = [];
    for (let i = 0; i < currentBidder.length; i++) {
        if (currentBidder[i].isBlock == 1) {
            del.push(i);
        }
    }
    if (del.length != 0) {
        let count = 0;
        for (let i = 0; i < del.length; i++) {
            currentBidder.splice(del[i] - count, 1);
            count = count + 1;
        }
    }
    res.render('vwProduct/productDetail', { product, relatePros, description, historyBid, currentPrice, currentBidder, approvedMsg, blocked });
})

router.post('/detail/:id/bid',auth, async function (req, res) {
    const proID = req.params.id;
    let product = await detailModel.findById(proID);
    let historyBid = await detailModel.findHistoryBid(proID);
    let currentPrice = historyBid.pop();
    historyBid.push(currentPrice);
    let currentBidder = await detailModel.findBidder(proID);
    if (product === null) {
        return res.redirect('/');
    }
    const inputPrice = req.body.price;
    if (res.locals.authUser.UID === product.ownerUID) {
    }
    else {
        if (parseInt(inputPrice) >= parseInt(currentPrice.price) + parseInt(product.stepPrice)) {
            let isExisted = 0;
            let currentBidderMaxPrice = 0;
            let currentBidderUID;
            let currentBidderEmail;
            for (let i = 0; i < currentBidder.length; i++) {
                if (currentBidder[i].UID == res.locals.authUser.UID) {
                    isExisted = 1;
                }
                if (currentBidder[i].UID == currentPrice.UID) {
                    currentBidderMaxPrice = parseInt(currentBidder[i].maxPrice);
                    currentBidderUID = currentBidder[i].UID;
                    currentBidderEmail = currentBidder[i].email;
                }
            }
            if (isExisted == 0) {
                const bidder = {
                    UID: res.locals.authUser.UID,
                    proID: proID,
                    maxPrice: inputPrice
                }
                await detailModel.addAuctionBidder(bidder);
            }
            else {
                await detailModel.updateMaxPrice(inputPrice, proID, res.locals.authUser.UID);
            }
            if (currentPrice.UID != res.locals.authUser.UID) {
                let bidPrice = 0;
                let bid;
                let content;
                if (parseInt(inputPrice) >= parseInt(currentBidderMaxPrice) + parseInt(product.stepPrice)) {
                    bidPrice = parseInt(currentBidderMaxPrice) + parseInt(product.stepPrice);
                    bid = {
                        UID: res.locals.authUser.UID,
                        proID: proID,
                        price: bidPrice
                    }
                    content = "Tên sản phẩm: " + product.proName + '\nGiá đặt vào: ' + bidPrice;
                    await emailModel.sendMSG(res.locals.authUser.email,'Đã đặt giá thành công', content);
                    await emailModel.sendMSG(currentBidderEmail,'Đã có người đặt giá cao hơn', content);
                } else {
                    bidPrice = parseInt(inputPrice);
                    bid = {
                        UID: currentBidderUID,
                        proID: proID,
                        price: bidPrice
                    }
                    content = "Tên sản phẩm: " + product.proName + '\nGiá đặt vào: ' + bidPrice;
                    await emailModel.sendMSG(currentBidderEmail,'Đã đặt giá thành công', content);
                }
                // if (product.autoExtend == 1) {
                //     console.log(product.endDate);
                //     console.log(new Date());
                //     console.log(product.endDate - (new Date()));
                //     // await detailModel.updateEndTime(product.ownerUID)
                // }
                await detailModel.addAuctionBid(bid);
                const user = await userslModel.findUserByUID(product.ownerUID);
                await emailModel.sendMSG(user.email,'Đã có người đặt giá', content);
            }
        }
    }
    const url = '/product/detail/' + proID;
    res.redirect(url);
})

router.post('/detail/:id/addDes',auth, async function (req, res) {
    const proID = req.params.id;

    const des = {
        proID: proID,
        description: req.body.desAddContent
    }
    await detailModel.addDescription(des);

    const url = '/product/detail/' + proID;
    res.redirect(url);
})

router.post('/detail/:id/removeBidder',auth, async function (req, res) {
    const proID = req.params.id;

    await detailModel.updateBlock(1, proID, req.body.bidderUid);

    const product = await detailModel.findById(proID);
    console.log(req.body)
    const bidder = await userslModel.findUserByUID(req.body.bidderUid);

    const content = 'Người bán đã từ chối lượt ra giá của bạn tại sản phẩm ' + product.proName;
    await emailModel.sendMSG(bidder.email,'Từ chối lượt ra giá', content);

    const url = '/product/detail/' + proID;
    res.redirect(url);
})


export default router;