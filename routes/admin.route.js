import express from 'express';
import auth from '../middlewares/auth.mdw.js'
import accountModel from '../models/users.model.js'

const router = express.Router();

router.get('/', auth, async function (req, res) {
    if (req.session.authUser.type !== 0) {
        res.redirect('/');
    } else {
        const waitList = await accountModel.findAllWaitSellers();
        res.render('vwAdmin/admin',{waitList, layout:'adminMain'});
    }
});

router.post('/up-seller', function (req, res){

});

export default router;