import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import accountRoute from '../routes/account.route.js';
import productRoute from '../routes/product-user.route.js';
import sellerRoute from '../routes/seller.route.js';
import productModel from '../models/product.model.js'
import adminRoute from '../routes/admin.route.js';
import * as Console from "console";

export default function (app){
    app.get('/', async function (req, res){
        const list5End = await productModel.findTopEnd(5);
        const list5Bid = await productModel.findTopBid(5);
        const list5Price = await productModel.findTopPrice(5);
        res.render('home', {list5End, list5Bid, list5Price});
        console.log(res.locals.lcCategories)
    });

    app.get('/error', function (req, res){
        throw new Error('error');
    })

    app.use('/account', accountRoute);
    app.use('/product', productRoute);
    app.use('/category', productRoute);
    app.use('/seller', sellerRoute);
    app.use('/admin', adminRoute);

    app.use(function (req, res, next) {
        res.render('404',{layout: false});
    });

    app.use(function (err, req, res, next) {
        console.log(err);
        res.render('500', {layout: false});
    });
}