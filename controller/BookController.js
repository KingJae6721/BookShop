import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes'


const allBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;

    //limit : 페이지 당 도서 수  
    //currentPage : 현재 페이지 번호
    //offset : (페이지 번호 -1) * limit
    let offset = limit * (currentPage-1);
    console.log(offset);
    
    let sql = "SELECT * FROM books";
    let values =[]
    if (category_id && news) {
        sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW() , INTERVAL 3 year) AND NOW()";
        values.push(category_id); 
        console.log(values)
    } else if (category_id) {
        sql +=" WHERE category_id=?";
        values.push(category_id) ;
    } else if (news) {
        sql += "WHERE pub_date BETWEEN DATE_SUB(NOW() , INTERVAL 2 year) AND NOW()";
        values.push(news) ;
    }

    sql+= " LIMIT ? OFFSET ?";
    values.push(parseInt(limit), parseInt(offset));

    conn.query(sql, values,
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

}

const bookDetail = (req, res) => {

    let { id } = req.params;

    let sql = `SELECT * FROM books LEFT JOIN category 
    ON books.category_id = category.id WHERE books.id=?;`;
    conn.query(sql, id,
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