import express from 'express';
import auth from '../middlewares/auth.mdw.js';
import accountModel from '../models/users.model.js';
import categoryModel from '../models/category.model.js'

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
})

router.get('/category/:catID', async function (req, res) {
    const catID = req.params.catID;
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
})

router.post('/category/edit', function (req, res){

})

router.post('/category/add', async function (req, res){
    console.log(req.body)
    const catName = req.body.catName;
    const catID = await categoryModel.addNewCategory(catName);
    console.log('catName');
    res.send(catID);
})
export default router;