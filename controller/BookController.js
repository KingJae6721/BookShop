import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes'


const allBooks = (req, res) => {
    let { category_id, news, limit, currentPage } = req.query;

    //limit : 페이지 당 도서 수  
    //currentPage : 현재 페이지 번호
    //offset : (페이지 번호 -1) * limit
    let offset = limit * (currentPage - 1);
    console.log(offset);

    let sql = `SELECT *,(SELECT count(*) FROM likes 
        WHERE books.id = liked_book_id) AS likes FROM books`;
    let values = []
    if (category_id && news) {
        sql += " WHERE category_id=? AND pub_date BETWEEN DATE_SUB(NOW() , INTERVAL 3 year) AND NOW()";
        values.push(category_id);
        //values.push(category_id, news); //news쓸데없음
        console.log(values)
    } else if (category_id) {
        sql += " WHERE category_id=?";
        values.push(category_id);
    } else if (news) {
        sql += "WHERE pub_date BETWEEN DATE_SUB(NOW() , INTERVAL 3 year) AND NOW()";
        values.push(news);
    }

    sql += " LIMIT ? OFFSET ?";
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
    let {user_id}=req.body;
    let book_id  = req.params.id;
    book_id=parseInt(book_id)
    let sql = `SELECT *,
            (SELECT count(*) FROM likes WHERE liked_book_id=books.id) AS likes,
            (SELECT EXISTS (SELECT * FROM likes WHERE user_id=? AND liked_book_id=?)) AS liked
        FROM books
        LEFT JOIN category
        ON books.category_id = category.category_id
        WHERE books.id=?`;
        let values= [user_id,book_id,book_id]
        console.log(values);
        
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