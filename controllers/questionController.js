import Question from '../models/Question.js';
import User from '../models/User.js';
import { initialQuestions } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

let localQuestions = [...initialQuestions];

export const getQuestions = async (req, res) => {
  try {
    const { subject } = req.query;
    try {
      let filter = {};
      if (subject && subject !== 'Barchasi') filter.subject = subject;
      const questions = await Question.find(filter).sort({ createdAt: -1 });
      if (questions && questions.length > 0) {
        return res.json({ success: true, count: questions.length, data: questions });
      }
    } catch (e) {}

    let list = localQuestions;
    if (subject && subject !== 'Barchasi') {
      list = localQuestions.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ message: 'Savollarni olishda xatolik' });
  }
};

export const createQuestion = async (req, res) => {
  try {
    const { title, content, subject } = req.body;
    const user = req.user;

    if (!title || !content) {
      return res.status(400).json({ message: 'Sarlavha va savol matnini kiriting!' });
    }

    // AI Ustoz avtomatik tushunarli do'stona birinchi javob tayyorlaydi
    const aiGeneratedAnswer = {
      authorName: 'AI Ustoz Bilimdon',
      authorAvatar: '🤖',
      authorGrade: 'Super AI Ustoz',
      content: `Salom do'stim! Ajoyib savol berdingiz. "${title}" mavzusi juda qiziq va muhim. Ushbu savolga quyidagicha sodda yondashamiz: Bilim olishda qadam-baqadam izlanish eng to'g'ri yo'ldir. Qolgan o'quvchilarimiz ham o'z fikrlarini yozishlarini kutib qolamiz! O'rganishdan aslo to'xtamang! 🌟`,
      isAiAnswer: true,
      likes: 1,
      createdAt: new Date()
    };

    const newQ = {
      id: 'qna-' + Date.now(),
      title,
      content,
      subject: subject || 'Umumiy',
      authorName: user?.name || 'Ziyrak Oʻquvchi',
      authorAvatar: '🎓',
      coinsBounty: 15,
      views: 1,
      solved: false,
      createdAt: new Date(),
      answers: [aiGeneratedAnswer]
    };

    try {
      const created = await Question.create(newQ);
      return res.status(201).json({ success: true, message: 'Savolingiz chop etildi va AI Ustoz javob berdi! 🚀', data: created });
    } catch (e) {
      localQuestions.unshift(newQ);
      return res.status(201).json({ success: true, message: 'Savolingiz chop etildi va AI Ustoz javob berdi! 🚀', data: newQ });
    }
  } catch (error) {
    res.status(500).json({ message: 'Savol joylashda xatolik' });
  }
};

export const addAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user = req.user;

    if (!content) {
      return res.status(400).json({ message: 'Javob matni boʻsh boʻlmasligi kerak' });
    }

    const answerObj = {
      authorName: user?.name || "O'quvchi",
      authorAvatar: user?.avatar || '🧑‍🎓',
      authorGrade: user?.grade || 'Oʻquvchi',
      content,
      isAiAnswer: false,
      likes: 0,
      createdAt: new Date()
    };

    // Foydalanuvchiga javob bergani uchun +10 Coin rag'bat!
    if (user?.id) {
      try {
        await User.findByIdAndUpdate(user.id, { $inc: { coins: 10, xp: 15 } });
      } catch (e) {
        const mockUsers = getMockUsers();
        const mock = mockUsers.find(u => u._id === user.id);
        if (mock) {
          mock.coins = (mock.coins || 0) + 10;
          mock.xp = (mock.xp || 0) + 15;
        }
      }
    }

    try {
      const q = await Question.findById(id);
      if (q) {
        q.answers.push(answerObj);
        await q.save();
        return res.json({ success: true, message: "Javobingiz qabul qilindi! Sizga +10 Coin taqdim etildi! 🎉", answer: answerObj });
      }
    } catch (e) {}

    const localQ = localQuestions.find(q => q.id === id || q._id === id);
    if (localQ) {
      localQ.answers.push(answerObj);
      return res.json({ success: true, message: "Javobingiz qabul qilindi! Sizga +10 Coin taqdim etildi! 🎉", answer: answerObj });
    }

    res.status(404).json({ message: 'Savol topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Javob yozishda xatolik' });
  }
};

export const likeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const q = localQuestions.find(item => item.id === id || item._id === id);
    if (q) {
      q.views = (q.views || 0) + 1;
      return res.json({ success: true, views: q.views });
    }
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: 'Xatolik' });
  }
};
