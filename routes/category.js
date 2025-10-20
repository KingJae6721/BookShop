import express from 'express';
import {
    allCategory
} from '../controller/CategoryController.js'
const router = express.Router();

router.use(express.json());

// 전체 도서 조회
router.get('/', allCategory);
 

export default router;
