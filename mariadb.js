import  mariadb from 'mysql2';

const connection = mariadb.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'BookShop',
    dateString : true

})

export default connection;