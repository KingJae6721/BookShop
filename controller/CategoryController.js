import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes'

const allCategory = (req, res) => {
    let { category_id } = req.query;
    
    let sql = "SELECT * FROM category";
    conn.query(sql,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            } 
                return res.status(StatusCodes.OK).json(results);
        });
};

export {
    allCategory
};