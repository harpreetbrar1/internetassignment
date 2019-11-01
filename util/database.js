const mysql = require('mysql2');

// connect to a database peoplebook running on your localmachine
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'peoplebook'
});

module.exports = pool.promise();