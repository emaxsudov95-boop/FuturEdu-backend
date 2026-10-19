import express from 'express';
import { getLeaderboard, updateProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/leaderboard', getLeaderboard);
router.put('/profile', protect, updateProfile);

export default router;
