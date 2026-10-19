import Career from '../models/Career.js';
import User from '../models/User.js';
import { initialCareers } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

let localCareers = [...initialCareers];

export const getAllCareers = async (req, res) => {
  try {
    try {
      const careers = await Career.find();
      if (careers && careers.length > 0) {
        return res.json({ success: true, count: careers.length, data: careers });
      }
    } catch (e) {}

    return res.json({ success: true, count: localCareers.length, data: localCareers });
  } catch (error) {
    res.status(500).json({ message: 'Kasblarni yuklashda xatolik' });
  }
};

export const getCareerBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    try {
      const career = await Career.findOne({ slug });
      if (career) return res.json({ success: true, data: career });
    } catch (e) {}

    const found = localCareers.find(c => c.slug === slug || c.id === slug);
    if (found) {
      return res.json({ success: true, data: found });
    }

    res.status(404).json({ message: 'Bunday kasb topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik' });
  }
};

export const selectCareer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { careerTitle } = req.body;

    if (!careerTitle) {
      return res.status(400).json({ message: 'Kasb nomi kiritilmadi' });
    }

    let updatedUser;
    try {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: { selectedCareer: careerTitle },
          $inc: { coins: 25, xp: 30 } // Kasb tanlash uchun bonus rag'bat!
        },
        { new: true }
      );
      if (updatedUser) {
        return res.json({
          success: true,
          message: `Tabriklaymiz! Siz "${careerTitle}" yoʻnalishini tanladingiz. +25 Coin va +30 XP taqdim etildi! 🚀`,
          user: updatedUser
        });
      }
    } catch (e) {}

    const mockUsers = getMockUsers();
    const mock = mockUsers.find(u => u._id === userId);
    if (mock) {
      mock.selectedCareer = careerTitle;
      mock.coins = (mock.coins || 0) + 25;
      mock.xp = (mock.xp || 0) + 30;

      return res.json({
        success: true,
        message: `Tabriklaymiz! Siz "${careerTitle}" yoʻnalishini tanladingiz. +25 Coin va +30 XP taqdim etildi! 🚀`,
        user: mock
      });
    }

    res.status(200).json({
      success: true,
      message: `Tanlandi: ${careerTitle}`,
      careerTitle
    });
  } catch (error) {
    res.status(500).json({ message: 'Kasbni tanlashda xatolik' });
  }
};
