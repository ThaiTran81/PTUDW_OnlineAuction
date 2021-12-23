import express from 'express';
import hashPass from 'bcrypt'

const router = express.Router();

router.get('/sign-in', function (req, res) {
    res.render('vwAccount/signin', {layout: false})
});



export default router;