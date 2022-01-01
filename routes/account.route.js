import express from 'express';
import hashPass from 'bcrypt';
import fetch from 'isomorphic-fetch';

const router = express.Router();

router.get('/sign-in', function (req, res) {
    res.render('vwAccount/signin', {layout: false})
});

router.post('/signup', function (req, res) {
    // getting site key from client side
    const response_key = req.body["g-recaptcha-response"];
    const secret_key = '6Lf8bNMdAAAAAHhcfA0GLANvf-JP2L3S0rTxjEJm';
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    fetch(url, {
        method: "post",
    })
        .then((response) => response.json())
        .then((google_response) => {

            if (google_response.success === true) {
                return res.send('success');
            } else {
                return res.send({response: "Failed"});
            }
        })
        .catch((error) => {
            // Some error while verify captcha
            return res.json({error});
        });
})



export default router;