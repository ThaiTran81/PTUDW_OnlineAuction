import express from 'express';
import fetch from 'isomorphic-fetch';
import bcrypt from "bcrypt";
import userModel from "../models/users.model.js";
import auth from "../middlewares/auth.mdw.js";
import productModel from "../models/product.model.js";
import email from "../utils/email.js";
import otpModel from "../models/otpModel.js";


const router = express.Router();

router.get('/sign-in', function (req, res) {
    req.session.returnTo = req.headers.referer || '/';
    if (req.session.auth) return res.redirect(req.session.returnTo);
    res.render('vwAccount/signin', {layout: false});
});


router.get('/sign-up', function (req, res) {
    res.render('vwAccount/signup', {layout: false});
})

router.post('/sign-up', async function (req, res) {
    const user = await userModel.findUserByEmail(req.body.email);
    if (user !== null) {
        res.render('vwAccount/signup', {layout: false, failMsg: 'Email đã được đăng ký tài khoản'})
    }

    // getting site key from client side
    const response_key = req.body["g-recaptcha-response"];
    const secret_key = '6Lf8bNMdAAAAAHhcfA0GLANvf-JP2L3S0rTxjEJm';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    console.log(url);
    const rawPassword = req.body.pass;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);
    fetch(url, {
        method: "post",
    })
        .then((response) => response.json())
        .then(async (google_response) => {

            if (google_response.success === true) {
                const user = {
                    name: req.body.name,
                    address: req.body.address,
                    email: req.body.email,
                    password: hash,
                    type: 2
                }
                // await userModel.add(user);
                const otp = await otpModel.createOTP(user.email);
                await email.sendOTP(user.email, otp);
                return res.render('vwAccount/submitOtp', {
                    layout: false,
                    user
                });
            } else {
                return res.render('vwAccount/signup', {
                    layout: false,
                    failMsg: "Đăng ký thất bại, vui lòng xác nhận lại recaptcha "
                });
            }
        })
        .catch((error) => {
            // Some error while verify captcha
            return res.json({error});
        });
})

router.post('/verify-otp', async function (req, res) {
    const user = {
        email: req.body.email,
        name: req.body.name,
        address: req.body.address,
        password: req.body.password,
        type: req.body.type
    }
    const otp = req.body.otp;
    const confirm = await otpModel.findOtp(user.email);
    console.log(confirm);
    if (confirm.otp === otp) {
        await userModel.add(user);
        res.render('vwAccount/signin', {layout: false, successMsg: 'Đăng ký thành công, hãy thử đăng nhập'});
    } else {
        return res.render('vwAccount/signup', {
            layout: false,
            failMsg: "Đăng ký thất bại, mã otp không đúng "
        });
    }

})

router.post('/sign-in', async function (req, res) {
    const user = await userModel.findUserByEmail(req.body.email);

    if (user === null) {
        return res.render('vwAccount/signin', {layout: false, failMsg: 'Tài khoản hoặc mật khẩu không đúng'});
    }
    const ret = bcrypt.compareSync(req.body.password, user.password);
    if (ret === false) {
        return res.render('vwAccount/signin', {layout: false, failMsg: 'Tài khoản hoặc mật khẩu không đúng'});
    }
    delete user.password;
    req.session.auth = true;
    req.session.authUser = user;
    let url = req.session.returnTo || '/';
    res.redirect(url);
})


router.post('/logout', function (req, res) {
    req.session.auth = false;
    req.session.authUser = null;
    req.session.returnTo = req.headers.referer;
    let url = req.headers.referer || '/';
    res.redirect(url);
});

router.get('/admin', function (req, res) {
    res.render('admin/adminDashboard2', {layout: false});
});

router.get('/profile/:uid', auth, async function (req, res) {
    const uid = req.params.uid || res.locals.authUser.UID;
    const curBid = await productModel.findCurBid(uid);
    const winBid = await productModel.findWinBid(uid);
    const watchList = await productModel.findWatchList(uid);
    const historyBid = await productModel.findHistoryBid(uid);
    const profile = await userModel.findUserByUID(uid);
    const feedback = await userModel.getFeedbackByUID(uid);
    delete profile.password;
    console.log(feedback);
    console.log(curBid)
    if (+uid === res.locals.authUser.UID) {
        res.render('vwAccount/profile', {curBid, winBid, watchList, historyBid, profile, feedback});
    } else {
        res.render('vwAccount/profile', {profile, feedback});
    }

});

router.post('/watchlist/add', async function (req, res) {
    const proID = req.body.proID;
    const uid = req.body.uid;
    let lst = await productModel.findByWatchList(uid, proID);
    if (lst !== null) {
        return res.send('existed');
    }
    const add = await productModel.addToWatchList(uid, proID);

    res.send('success');
});

router.post('/watchlist/remove', async function (req, res) {
    const proID = req.body.proID;
    const uid = req.body.uid;
    const remove = await productModel.removeFromWatchList(uid, proID);
    res.send('success');
})

export default router;