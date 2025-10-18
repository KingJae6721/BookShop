// userRouter.js (또는 원하는 파일명)
import validator from 'express-validator'
import express from 'express';
import { param, body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import conn from '../mariadb.js'
import { StatusCodes } from 'http-status-codes';
import { login, join, passwordReset, passwordResetRequest } from '../controller/UserController.js'

dotenv.config();

const router = express.Router();

router.use(express.json());

// 로그인
router.post('/login', login)

router.post('/join', join)

// 회원 개별 조회 및 탈퇴
router
  .route('/reset')

  //비밀번호 초기화 요청
  .post(passwordResetRequest)

  //비밀번호 초기화
  .put(passwordReset);

export default router;