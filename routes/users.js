// userRouter.js (또는 원하는 파일명)
import validator from 'express-validator'
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.use(express.json());

// 로그인
router.post('/login', (req, res) => {
  // 로그인 로직
});

// 회원가입
router.post('/join', (req, res) => {
  // 회원가입 로직
});

// 회원 개별 조회 및 탈퇴
router
  .route('/reset')
  .post((req, res) => {
    // 개별 조회 로직
  })
  .put((req, res) => {
    // 회원 탈퇴 로직
  });

export default router;