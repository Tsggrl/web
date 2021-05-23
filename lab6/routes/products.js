/* jshint esversion: 6 */
"use strict;";

const mysql = require('mysql');
const options = require('../db/options');
const connection = mysql.createConnection(options);

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});

exports.index = function(req, res) {
    if (req.query.sort) {
        let params = (req.query.sort).split('_');
        let sql = "SELECT * FROM products ORDER BY " + params[0].toLowerCase() + " " + params[1];
      
        connection.query(sql, function(err, result) {
            if (err) {
                throw err;
            }
            else {
                console.log(result, 'ORDER BY');
                res.render('index', {data: result}); 
            } 
        });    
    }
    else {
        connection.query("SELECT * FROM products", function(err, result) {
            if (err) {
                throw err;
            }
            else  {
                console.log(result);
                res.render('index', {data: result});
            } 
            });
        }
};

exports.delete = function (req, res) {
    connection.query('DELETE FROM products WHERE id = ?', [req.params.id], function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.sendStatus(200);
            console.log(`Data was deleted`);
        }
    });
};

exports.add = function(req, res) {
    let data = {
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating
     };
     // inserting into the mySQL
    connection.query('INSERT INTO products SET ?', data, function(err) {
        if (err) {
            throw err;
        }
        else {
            console.log(`Data was inserted`);
            res.redirect('back');
        }
    });
};

exports.update = function(req, res) {
    
    let id = req.params.id;

    let data = {
        name:req.body.NAME,
        price:req.body.PRICE,
        rating:req.body.RATING
     };
    
    connection.query("UPDATE products set ? WHERE id = ?",[data, id], function(err) {
        if (err) {
            throw err;
        }
        else {
            console.log(`Data was updated`);
            res.sendStatus(200);
        }
    });
};
