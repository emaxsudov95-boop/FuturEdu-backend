import express from 'express';
import { getRewards, purchaseReward } from '../controllers/rewardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getRewards);
router.post('/:id/purchase', protect, purchaseReward);

export default router;
