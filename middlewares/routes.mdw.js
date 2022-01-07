import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import accountRoute from '../routes/account.route.js';
import productRoute from '../routes/product-user.route.js';
import productModel from '../models/product.model.js'

export default function (app){
    app.get('/', async function (req, res){
        const list5End = await productModel.findTopEnd(5);
        var list5Bid = await productModel.findTopBid(5);
        list5Bid = list5Bid[0];
        res.render('home', {list5End, list5Bid});
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