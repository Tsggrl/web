/* jshint esversion: 6 */
'use strict;';
//creating of database with table, and insert data

const CREATEDB = "CREATE DATABASE IF NOT EXISTS db_products";
const T_PRODUCTS = "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255), price FLOAT, rating FLOAT, PRIMARY KEY (id));"; 
const INSERT = "INSERT INTO products (name, price, rating) VALUES ('Uncharted 4', '50', '5'), ('Heavy Rain', '35', '5'), ('Batman: arkham knight', '50', '4.5'), ('God Of War', '120', '5');";
 
//products - id[int, autoincrement], name[varchar], price[float], rating[float]
module.exports = function createDB() { 
    connection.connect(function(err) {
    if (err) 
        throw err;
    else console.log("Server is running");
    connection.query(CREATEDB, function(err, result) {
         if (err) 
            throw err;
        else console.log("db's been created!: " + result);
    });
    connection.query("USE db_products", function(err, result) {
        if (err) 
           throw err;
       else console.log("db_products is using: " + result);
   });
    connection.query(T_PRODUCTS, function(err, result) {
         if (err) 
            throw err;
        else console.log("table's been created!: " + result);
    });
    connection.query(INSERT, function(err, result) {
         if (err) 
            throw err;
        else console.log("data's been insert!: " + result);
    });
});
};
