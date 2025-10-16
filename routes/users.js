const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); //
dotenv.config();


router.use(express.json());

//로그인

router.post(
    `/login`,
    (req, res) => {


    })

//회원가입
router.post(
    `/join`,
    (req, res) => {

    })

//회원개별조회
router
    .route(`/reset`)
    .post(
        (req, res) => {


        })
    .put(
        (req, res) => {//회원개별탈퇴
          
        })
module.exports = router