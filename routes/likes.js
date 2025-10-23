import express from 'express';
  
const router = express.Router();
import {addLike, removeLike} from '../controller/LikeController.js';

router.use(express.json());
  
// 좋아요추가
router.post('/:id', addLike);

// 좋아요 삭제
router.delete('/:id', removeLike);

export default router;
