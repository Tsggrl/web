Sample-CRUD-table

For using extends options file in "db/options.js":

port your database;
password that database;
name of user, who control that database.
module.exports = {
    host: 'localhost',
    port: 3306,
    password: '',
    user: '',
    database: 'db_products'
};
p.s: can create entry with only english letters!
Run
npm run start
