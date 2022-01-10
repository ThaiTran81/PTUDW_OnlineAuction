import categoryModel from '../models/category.model.js';


export default function (app) {

    //check session
    app.use(async function (req, res, next) {

        if (typeof (req.session.auth) === 'undefined') {
            req.session.auth = false;
        }

        res.locals.auth = req.session.auth;
        res.locals.authUser = req.session.authUser;

        res.locals.sort = [{value: 'timeDesc', name:'Sắp xếp theo thời gian kết thúc giảm dần', isSelected: true},
            {value:'timeAsc', name:'Sắp xếp theo thời gian kết thúc tăng dần', isSelected: false},
            {value: 'priceDesc', name:'Sắp xếp theo giá giảm dần', isSelected: false},
            {value: 'priceAsc', name: 'Sắp xếp theo giá tăng dần', isSelected: false}];

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