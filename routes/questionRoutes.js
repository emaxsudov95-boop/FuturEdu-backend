import express from 'express';
import { getQuestions, createQuestion, addAnswer, likeQuestion } from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getQuestions);
router.post('/', protect, createQuestion);
router.post('/:id/answers', protect, addAnswer);
router.post('/:id/like', likeQuestion);

export default router;
