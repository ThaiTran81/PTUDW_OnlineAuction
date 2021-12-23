import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import accountRoute from '../routes/account.route.js';

export default function (app){
    app.get('/', function (req, res){
        res.render('home');
    });

    app.use('/account', accountRoute);

    // app.get('/sign-in', function (req, res){
    //     res.render('signin',{layout: false})
    // })
}