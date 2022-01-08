import express from 'express';
import fetch from 'isomorphic-fetch';
import bcrypt from "bcrypt";
import userModel from "../models/users.model.js";


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
                await userModel.add(user);
                return res.render('vwAccount/signin', {
                    layout: false,
                    successMsg: "Đăng ký thành công vui lòng hoàn tất đăng nhập"
                });
            } else {
                // return res.send({response: "Failed"});
            }
        })
        .catch((error) => {
            // Some error while verify captcha
            return res.json({error});
        });
})

router.post('/sign-in', async function (req, res) {
    const user = await userModel.findUserByEmail(req.body.email);

    if (user === null){
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
    res.render('admin/adminDashboard', {layout: false});
})

export default router;