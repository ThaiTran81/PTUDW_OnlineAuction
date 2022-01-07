import categoryModel from '../models/category.model.js';


export default function (app) {

    //check session
    app.use(async function (req, res, next) {

        if (typeof (req.session.auth) === 'undefined') {
            req.session.auth = false;
        }

        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;

        next();
    });
    // get parent cat
    app.use(async function (req, res, next) {
        res.locals.lcCategories = await categoryModel.findCate();
        next();
    });

    // get sub cat
    app.use(function (req, res, next) {
        res.locals.lcCategories.forEach(async item=>{
            item.types = await categoryModel.findAllTypeByCat(item['catID']);
        })
        next();
    });
}