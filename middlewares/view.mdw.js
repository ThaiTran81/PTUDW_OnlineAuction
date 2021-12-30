import {engine} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0') + ' VNĐ';
            },
            equal(val1, val2) {
                console.log(val1,val2);
                return val1 === val2;
            },

            section: hbs_sections()
        }
    }))
    ;
    app.set('view engine', 'hbs');
    app.set('views', './views');
}