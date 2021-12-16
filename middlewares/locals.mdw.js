import categoryModel from '../models/category.model.js';


export default function (app) {

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