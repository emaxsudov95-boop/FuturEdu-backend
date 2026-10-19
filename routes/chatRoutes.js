import express from 'express';
import { 
  getCareerChat, 
  sendChatMessage, 
  getAllRoomsAdmin, 
  deleteChatMessage 
} from '../controllers/chatController.js';

const router = express.Router();

// O'quvchi uchun: o'zining bitta kasb chatini olish va xabar yozish
router.get('/messages/:careerSlug', getCareerChat);
router.post('/messages/:careerSlug', sendChatMessage);

// Admin uchun: Barcha kasb chatlarini ko'rish va boshqarish
router.get('/admin/all-rooms', getAllRoomsAdmin);
router.delete('/admin/messages/:messageId', deleteChatMessage);

export default router;
