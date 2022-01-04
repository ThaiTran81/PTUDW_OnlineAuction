import express from 'express';
import fetch from 'isomorphic-fetch';
import bcrypt from "bcrypt";
import userModel from "../models/users.model.js";


const router = express.Router();

router.get('/sign-in', function (req, res) {
    res.render('vwAccount/signin', {layout: false})
});

router.post('/signup', function (req, res) {
    // getting site key from client side
    const response_key = req.body["g-recaptcha-response"];
    const secret_key = '6Lf8bNMdAAAAAHhcfA0GLANvf-JP2L3S0rTxjEJm';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    const rawPassword = req.body.resgist_password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(rawPassword, salt);

    fetch(url, {
        method: "post",
    })
        .then((response) => response.json())
        .then(async (google_response) => {

            if (google_response.success === true) {

                const user = {
                    email: req.body.resgist_email,
                    password: hash,
                    phone: req.body.phone,
                    type: 2
                }
                await userModel.add(user);
                return res.send('Đăng ký thành công');
            } else {
                return res.send({response: "Failed"});
            }
        })
        .catch((error) => {
            // Some error while verify captcha
            return res.json({error});
        });
})

router.post('/sign-in', async function (req, res){
    const user = await userModel.findUserByEmail(req.body.email);

    if (user===null){
        res.send('not found');
    }
    return res.send(user);
    // const ret = bcrypt.compareSync(req.body.password, user.password);
    // if (ret===false){
    //     res.send('fail password');
    // }
    // delete user.password;
    // req.session.auth = true;
    // req.session.authUser = user;
    // res.send('true password');
})


export default router;