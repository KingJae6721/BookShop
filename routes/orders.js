import express from 'express';

const router = express.Router();
import {
    order,
    getOrders,
    getOrderDetail
} from '../controller/OrderController.js';

router.use(express.json());

//주문하기
router.post('/', order);

// 주문상품 상세조회
router.delete('/:id', getOrderDetail);

export default router;
