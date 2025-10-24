import express from 'express';
import {
    addToCart,
    getCartItems,
    removeCartItems
} from '../controller/CartController.js'
const router = express.Router();

router.use(express.json());
  
// 장바구니담기
router.post('/', addToCart);
// 장바구니조회//장바구니에서 선택한 주문 예상 상품 목록 조회
router.get('/', getCartItems);

// 장바구니 도서조회
router.delete('/:id', removeCartItems);



export default router;
