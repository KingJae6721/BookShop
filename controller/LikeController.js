import conn from '../mariadb.js';
import { StatusCodes } from 'http-status-codes'

const addLike = (req, res) => {
    let { id } = req.params;
    let { user_id } = req.body;

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)`;
    let values = [user_id, id];
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
const removeLike = (req, res) => {
    const { id } = req.params; // book_id
    const { user_id } = req.body;

    const sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
    const values = [user_id, id];
    conn.query(sql, values, (err, results) => {
        if (err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).json(results);
    });
};

export {
    addLike,
    removeLike
};