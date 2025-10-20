import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes'


const allBooks = (req, res) => {
}

const bookDetail = (req, res) => {
  
};
const booksByCategory = (req, res) => {
    let { category_id } = req.query;
    
    let sql = "SELECT * FROM books WHERE category_id=?";
    conn.query(sql, category_id,
        (err, results) => {
            if (err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            if (results.length)
                return res.status(StatusCodes.OK).json(results);
            else
                return res.status(StatusCodes.NOT_FOUND).end();

        });
};

export {
    allBooks,
    bookDetail,
    booksByCategory
};