// import conn from '../mariadb.js'
import mariadb from 'mysql2/promise'
import { StatusCodes } from 'http-status-codes'


const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'Bookshop',
        dateString: true

    });
    const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } = req.body;
    let delivery_id;
    let order_id;


    let sql = `INSERT INTO delivery (address, receiver, contact) VALUES (?,?,?);`;
    //const delivery_id = SELECT max(id) form delivery;
    let values = [delivery.address, delivery.receiver, delivery.contact];

    let [results] = await conn.query(sql, values);
    delivery_id=results.insertId;
    
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
    VALUES (?, ?, ?, ?, ? );`;
    values = [firstBookTitle, totalQuantity, totalPrice, userId, delivery_id];
    let [results1] = await conn.query(sql, values);
    order_id=results1.insertId

    sql = `INSERT INTO orderedBook (order_id, book_id, quantity)
            VALUES ?`;
    values = [];

    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    });
    res.json(await conn.query(sql, [values]));
};

const getOrders = (req, res) => {

    const { book_id, quantity, user_id } = req.body;

};

const getOrderDetail = (req, res) => {

    const { book_id, quantity, user_id } = req.body;
};




export {
    order,
    getOrders,
    getOrderDetail
};