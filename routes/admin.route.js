import express from 'express';
import auth from '../middlewares/auth.mdw.js';
import accountModel from '../models/users.model.js';
import categoryModel from '../models/category.model.js';
import productModel from '../models/product.model.js';
import emailModel from '../utils/email.js';

const router = express.Router();

router.get('/', auth, async function (req, res) {
    if (req.session.authUser.type !== 0) {
        res.redirect('/');
    } else {
        const waitList = await accountModel.findAllWaitSellers();
        res.render('vwAdmin/admin', {waitList, selected: 1, layout: 'adminMain'});
    }
});

router.post('/up-seller', async function (req, res) {
    const accept = req.body.accept;
    const uid = req.body.uid;
    if (accept === false) {
        await accountModel.removeFromWaitSeller(uid);
        res.send('success');
    } else {
        await accountModel.changeTypeUser(1, uid);
        await accountModel.removeFromWaitSeller(uid);
        res.send('success')
    }
});

router.get('/category', function (req, res) {
    res.render('vwAdmin/category', {layout: 'adminMain', selected: 3});
});

router.get('/category/:catID', async function (req, res) {
    const catID = req.params.catID;
    const checkExist = await categoryModel.findCategoryById(catID);

    if (checkExist.length < 1) {
        return res.redirect('/admin/category');
    }
    const types = await categoryModel.findAllTypeByCat(catID);
    const category = res.locals.lcCategories;
    let catName;
    for (let i = 0; i < category.length; i++) {

        if (category[i].catID === +catID) {
            catName = category[i].catName;
            break;
        }
    }
    res.render('vwAdmin/categoryEdit', {catID, catName, types, layout: 'adminMain', selected: 3});
});

router.get('/user', async function (req, res) {
    const limit = 9;
    const page = req.query.page || 1;
    const offset = (page - 1) * limit;

    const total = await accountModel.countAllUser();
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;

    const pageNumbers = [];
    for (let i = 1; i <= nPages; i++) {
        pageNumbers.push({
            value: i,
            isCurrent: +page === i
        });
    }
    const lst = await accountModel.findPageUser(limit, offset);

    res.render('vwAdmin/user', {pageNumbers, users: lst, layout: 'adminMain', selected: 2});
})

router.post('/category/update', async function (req, res) {
    const catID = req.body.catID;
    const catName = req.body.catName;
    const updt = await categoryModel.updateCategory(catID, catName);
    res.send('success');
})

router.post('/category/add', async function (req, res) {
    const catName = req.body.catName;
    const catID = await categoryModel.addNewCategory(catName);
    res.send('success');
})

router.post('/category/delete', async function (req, res) {
    const catID = req.body.catID;
    const lst = await productModel.findPageByCatId(catID, 1, 0);
    if (lst.length > 0) {
        res.send('fail');
    } else {
        const delType = await categoryModel.deleteAllType(catID);
        const delCat = await categoryModel.deleteCategory(catID);
        res.send('success')
    }
});

router.post('/category/type/add', async function (req, res) {
    const catID = req.body.catID;
    const typName = req.body.typName;
    const ins = await categoryModel.addNewType(catID, typName);
    res.send('success');
});

router.post('/category/type/delete', async function (req, res) {
    const catID = req.body.catID;
    const typID = req.body.typID;
    const lst = await productModel.findPageByType(catID, typID, 1, 0);
    if (lst.length > 0) {
        return res.send('fail');
    } else {
        const del = await categoryModel.deleteType(catID, typID);
        res.send('success');
    }
});

router.post('/category/type/update', async function (req, res) {
    const catID = req.body.catID;
    const typID = req.body.typID;
    const typName = req.body.typName;

    const upd = await categoryModel.updateType(catID, typID, typName);
    res.send('success');
})

router.post('/user/downgrade', async function (req, res) {
    const email = req.body.email;
    const downgrade = await accountModel.changeTypeUser(2, email).catch(() => {
        return res.send('fail');
    })
    const send = await emailModel.sendMSG(email,'Hạ cấp tài khoản', 'Tài khoản của bạn đã bị hạ cấp từ seller xuống bidder');
    res.send('success');
});

export default router;