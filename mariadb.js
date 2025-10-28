import mariadb from 'mysql2';

const connection = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Bookshop',
    dateString: true

});


export default connection;