import express from 'express';
import {engine} from 'express-handlebars';
import morgan from 'morgan';


import activate_locals_middleware from './middlewares/locals.mdw.js';
import activate_route_middleware from './middlewares/routes.mdw.js';

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));
app.engine('hbs', engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.set("views", "./views");

activate_locals_middleware(app);
activate_route_middleware(app);

const port = 3000;
app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
})


