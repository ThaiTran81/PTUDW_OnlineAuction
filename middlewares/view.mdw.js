import {engine} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';
import moment from 'moment';

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
            count_array(arr){
                return arr.length || 0;
            },
            format_date(date) {
                return  new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
            },
            format_name(name) {
                return '**** ' + name.split(' ').pop();
            },
            cal_rating_point(like, dislike) {
                return Math.round((like / (dislike+like)) * 100) + ' %';
            },
            check_block(isBlock) {
                if (isBlock == 0)
                    return true;
                return false;
            },
            format_dob(val) {
                return moment(val).format('MM/DD/YYYY');
            },
            section: hbs_sections()
        }
    }))
    ;
    app.set('view engine', 'hbs');
    app.set('views', './views');
}