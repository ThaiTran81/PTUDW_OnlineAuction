import express from 'express';
import hashPass from 'bcrypt'

const router = express.Router();

router.get('/', function (req, res) {
    res.render('signin', {layout: false})
});



export default router;