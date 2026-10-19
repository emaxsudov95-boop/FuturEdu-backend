import express from 'express';
import {
  getChildren,
  addChild,
  getChildDashboard,
  getParentAiAdvice,
  getParentNotifications,
  updateSubscription,
  getReportData,
  parentRegister,
  parentLogin,
  parentGetMe
} from '../controllers/parentController.js';

const router = express.Router();

// Auth routes for parent
router.post('/auth/register', parentRegister);
router.post('/auth/login', parentLogin);
router.get('/auth/me', parentGetMe);

router.get('/children', getChildren);
router.post('/children/add', addChild);
router.get('/dashboard/:childId', getChildDashboard);
router.get('/ai-advice/:childId', getParentAiAdvice);
router.get('/notifications', getParentNotifications);
router.post('/subscription', updateSubscription);
router.get('/report/:childId', getReportData);

export default router;
