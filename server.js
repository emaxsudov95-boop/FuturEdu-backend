import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

// Marshrutlar
import authRoutes from './routes/authRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import rewardRoutes from './routes/rewardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import mockRoutes from './routes/mockRoutes.js';
import battleRoutes from './routes/battleRoutes.js';
import { getNotifications, getAssignments } from './controllers/adminController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));
app.use(express.json());

// API Marshrutlari
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/users', userRoutes);

// MOK Test Marshruti
app.use('/api/mock', mockRoutes);

// Battle (Bilim Jangi) Marshruti
app.use('/api/battle', battleRoutes);

// Kasb Chatlari Marshruti
app.use('/api/chat', chatRoutes);

// Admin Marshrutlari
app.use('/api/admin', adminRoutes);

// Ota-onalar Paneli Marshrutlari
app.use('/api/parent', parentRoutes);

// O'quvchilar uchun bildirishnomalar va topshiriqlar ochiq endpointi
app.get('/api/notifications', getNotifications);
app.get('/api/assignments', getAssignments);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDist = path.join(__dirname, '../frontend/dist');

// Frontend statik fayllarini ulash
app.use(express.static(frontendDist));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'FuturEdu - Oʻquvchilar uchun interaktiv taʼlim platformasi',
    version: '1.3.0',
    adminPanel: 'ready',
    parentDashboard: 'ready',
    time: new Date()
  });
});

// SPA fallback barcha sahifalar uchun
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(frontendDist, 'index.html'));
});

// 404 handler API uchun
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Bunday API sahifa mavjud emas' });
});

// Serverni ishga tushirish
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 FuturEdu Ta'lim Serveri http://localhost:${PORT} manzilida muvaffaqiyatli ishga tushdi!`);
  });
};

startServer();
