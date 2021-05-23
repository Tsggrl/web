Sample-CRUD-table

For using extends options file in **"db/options.js"**: 

1. port your database;
2. password that database;
3. name of user, who control that database.
```javascript
module.exports = {
    host: 'localhost',
    port: 3306,
    password: '',
    user: '',
    database: 'db_products'
};
```
###### p.s: can create entry with only **english** letters!

## Run

```bash
npm run start
```
