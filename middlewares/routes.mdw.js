import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import accountRoute from '../routes/account.route.js';
import productRoute from '../routes/product-user.route.js';

export default function (app){
    app.get('/', function (req, res){
        res.render('home');
    });

    app.get('/prooduct', function (req, res){
        res.render('', {layout: false})
    })

    app.use('/account', accountRoute);
    app.use('/category', productRoute);

    app.use(function (req, res, next) {
        // res.render('404', { layout: false });
        res.send("Chưa tạo trang 404");
    });
}