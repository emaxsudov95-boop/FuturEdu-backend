import express from 'express';
import {
  getDashboardStats,
  getStudents,
  toggleBlockStudent,
  adjustCoins,
  warnStudent,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  getAssignments,
  createAssignment,
  deleteAssignment,
  createCareer,
  deleteCareer,
  createReward,
  deleteReward,
  getPayments,
  updatePaymentStatus,
  getModerationItems,
  deleteModerationItem,
  getNotifications,
  sendNotification,
  getAuditLogs,
  getAiStats,
  updateAiSettings
} from '../controllers/adminController.js';
import { adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Barcha admin marshrutlarini adminOnly middleware himoyalaydi
router.use(adminOnly);

// Dashboard
router.get('/dashboard', getDashboardStats);

// O'quvchilar
router.get('/students', getStudents);
router.post('/students/:id/toggle-block', toggleBlockStudent);
router.post('/students/:id/adjust-coins', adjustCoins);
router.post('/students/:id/warn', warnStudent);

// Testlar
router.post('/quizzes', createQuiz);
router.put('/quizzes/:id', updateQuiz);
router.delete('/quizzes/:id', deleteQuiz);

// Topshiriqlar
router.get('/assignments', getAssignments);
router.post('/assignments', createAssignment);
router.delete('/assignments/:id', deleteAssignment);

// Kasblar
router.post('/careers', createCareer);
router.delete('/careers/:id', deleteCareer);

// Sovg'alar
router.post('/rewards', createReward);
router.delete('/rewards/:id', deleteReward);

// To'lovlar
router.get('/payments', getPayments);
router.post('/payments/:id/status', updatePaymentStatus);

// Moderatsiya
router.get('/moderation', getModerationItems);
router.delete('/moderation/:id', deleteModerationItem);

// Bildirishnomalar
router.get('/notifications', getNotifications);
router.post('/notifications', sendNotification);

// Xavfsizlik Audit Jurnali
router.get('/audit-logs', getAuditLogs);

// AI Ustoz
router.get('/ai/stats', getAiStats);
router.put('/ai/settings', updateAiSettings);

export default router;
