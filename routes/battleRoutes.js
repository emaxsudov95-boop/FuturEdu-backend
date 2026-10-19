import express from 'express';
import {
  getBattleProfile,
  findBattleMatch,
  submitBattleResult,
  getBattleHistory,
  getBattleLeaderboard
} from '../controllers/battleController.js';

const router = express.Router();

router.get('/profile', getBattleProfile);
router.post('/match', findBattleMatch);
router.post('/submit', submitBattleResult);
router.get('/history', getBattleHistory);
router.get('/leaderboard', getBattleLeaderboard);

export default router;
