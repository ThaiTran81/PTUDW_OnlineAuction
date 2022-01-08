import {engine} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {
    app.engine('hbs', engine({
        extname: '.hbs',
        helpers: {
            format_number(val) {
                return numeral(val).format('0,0') + ' ₫';
            },
            equal(val1, val2) {
                return val1 == val2;
            },
            getName(fullname) {
                const arr = fullname.split(" ");
                return arr[arr.length - 1];
            },
            protect_email(user_email) {
                    var avg, splitted, part1, part2;
                    splitted = user_email.split("@");
                    part1 = splitted[0];
                    avg = part1.length / 2;
                    part1 = part1.substring(0, (part1.length - avg));
                    part2 = splitted[1];
                    return part1 + "...@" + part2;
            },

            section: hbs_sections()
        }
    }))
    ;
    app.set('view engine', 'hbs');
    app.set('views', './views');
}