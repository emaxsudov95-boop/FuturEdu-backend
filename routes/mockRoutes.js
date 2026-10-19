import express from 'express';
import {
  getMockExamInfo,
  startMockTest,
  submitMockTest,
  getMyMockHistory,
  getAdminMockSettings,
  updateAdminMockSettings
} from '../controllers/mockController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// O'quvchi MOK test marshrutlari
router.get('/info', getMockExamInfo);
router.post('/start', startMockTest);
router.post('/submit', submitMockTest);
router.get('/history', getMyMockHistory);

// Admin MOK test sozlamalari
router.get('/admin/settings', adminOnly, getAdminMockSettings);
router.put('/admin/settings', adminOnly, updateAdminMockSettings);

export default router;
