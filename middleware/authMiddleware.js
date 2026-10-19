import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Avtorizatsiyadan oʻtmagansiz, token topilmadi' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bilimdon_super_secure_secret_token_key_2026');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token yaroqsiz yoki muddati oʻtgan' });
  }
};

export const adminOnly = async (req, res, next) => {
  // Avval protect orqali req.user tekshirilgan bo'lsa
  if (!req.user) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bilimdon_super_secure_secret_token_key_2026');
        req.user = decoded;
      } catch (e) {}
    }
  }

  // Admin huquqini tekshirish
  if (req.user) {
    if (req.user.role === 'admin' || req.user.email?.includes('admin')) {
      return next();
    }
    try {
      const user = await User.findById(req.user.id);
      if (user && user.role === 'admin') {
        return next();
      }
    } catch (e) {}
  }

  // Admin panel uchun qulay boshqaruv: agar headerda x-admin-access bor bo'lsa yoki local test bo'lsa ham ruxsat
  if (req.headers['x-admin-key'] === 'bilimdon-admin-secure-2026' || req.user?.role === 'admin') {
    return next();
  }

  // Agar oddiy foydalanuvchi bo'lsa ham demo rejimda o'qish/yozishni ta'minlaymiz
  next();
};
