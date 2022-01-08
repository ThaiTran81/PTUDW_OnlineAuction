import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import accountRoute from '../routes/account.route.js';
import productRoute from '../routes/product-user.route.js';
import productModel from '../models/product.model.js'

export default function (app){
    app.get('/', async function (req, res){
        const list5End = await productModel.findTopEnd(5);
        const list5Bid = await productModel.findTopBid(5);
        const list5Price = await productModel.findTopPrice(5);
        res.render('home', {list5End, list5Bid, list5Price});
    });

    app.use('/account', accountRoute);
    app.use('/product', productRoute);

    app.use(function (req, res, next) {
        // res.render('404', { layout: false });
        res.send("Chưa tạo trang 404");
    });
}