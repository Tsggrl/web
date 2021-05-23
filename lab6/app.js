/*jshint esversion: 6 */
"use strict;";

/**
 *  connect modules
 * @param {Object} mysql For using of database
 * @param {Object} express For using of epress
 * @param {Object} exphbs 
 * @param {Object} mysql Module for using of database
 * @param {Object} mysql Module for using of database
 */


const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const router = require('./routes/products');

const app = express();

//const createDb = require('./db/createDb');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs', 
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', '.hbs');

app.get('/', router.index);
app.post('/add', router.add);
app.delete('/:id', router.delete);
app.put('/:id', router.update);

app.listen(3000, () => console.log(`listening on port 3000!`));
