const mysql = require('mysql2');

const db = mysql.createConnection({

    host: '127.0.0.1',
    user: 'root',
    password: '976axbTT!!',
    database: 'clothes'


});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = db;