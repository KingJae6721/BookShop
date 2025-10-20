import conn from '../mariadb.js'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import validator from 'express-validator'
import { param, body, validationResult } from 'express-validator';;
import dotenv from 'dotenv';

dotenv.config();

const join = (req, res) => {
    if (req.body == {}) {
        res.status(400).json({
            message: `입력값 다시 확인해주세요`
        })
    }
    else {
        const { email, password } = req.body
        let sql = `INSERT INTO users ( email,  password)
                 VALUES ( ?, ?)`
        let values = [email, password]
        conn.query(
            sql,
            values,
            function (err, results) {
                if (err) {
                    console.error(err)
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        message: `입력값 다시 확인해주세요`,
                        error: err.message
                    }).end()
                }

                return res.status(StatusCodes.CREATED).json(results);
            }
        );
    }
}

const login = (req, res) => {

    const { email, password } = req.body
    console.log(req.body)
    let sql = `SELECT * FROM users WHERE email = ?`
    conn.query(
        sql,
        email,
        function (err, results) {
            if (err) {
                console.error(err)
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: `입력값 다시 확인해주세요`,
                    error: err.message
                }).end()
            }

            let loginUser = results[0]
            if (loginUser && loginUser.password == password) {

                const token = jwt.sign({
                    email: loginUser.email
                }, process.env.PRIVATE_KEY, {
                    expiresIn: '5m',
                    issuer: 'yj'
                });//유효기간

                res.cookie("token", token, {
                    httpOnly: true
                })

                res.status(StatusCodes.OK).json({
                    message: `${loginUser.email}님 로그인되었습니다`,
                    token: token,
                })

            } else if (loginUser && loginUser != password) {
                //401 : Unauthorized 403 : Forbidden 접근권리 없음
                res.status(StatusCodes.UNAUTHORIZED).json({
                    message: `로그인 실패, 아이디와 비밀번호를 다시 확인해주세요(비밀번호틀림)`
                    //유효한 요청과 값도 유효하지만 거절당했을 때
                })
            } else {
                res.status(StatusCodes.FORBIDDEN).json({
                    message: `로그인 실패, 아이디와 비밀번호를 다시 확인해주세요(회원정보 없음)`
                })
            }
        }
    )
}

const passwordResetRequest = (req, res) => {

}
const passwordReset = (req, res) => {

}


export  { join, login, passwordReset, passwordResetRequest };;