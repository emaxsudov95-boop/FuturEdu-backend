import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import Career from '../models/Career.js';
import Reward from '../models/Reward.js';
import Question from '../models/Question.js';
import Assignment from '../models/Assignment.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';

import {
  initialLeaderboard,
  initialQuizzes,
  initialCareers,
  initialRewards,
  initialQuestions,
  initialAssignments,
  initialPayments,
  initialNotifications,
  initialAuditLogs,
  initialAiSettings
} from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

// Local In-Memory Store state
let localStudents = [...initialLeaderboard];
let localQuizzes = initialQuizzes;
let localCareers = initialCareers;
let localRewards = initialRewards;
let localQuestions = initialQuestions;
let localAssignments = [...initialAssignments];
let localPayments = [...initialPayments];
let localNotifications = [...initialNotifications];
let localAuditLogs = [...initialAuditLogs];
let localAiSettings = { ...initialAiSettings };

// Yordamchi: Audit Log yozish
const logAdminAction = async (action, target, details, ip = '127.0.0.1') => {
  const newLog = {
    id: 'log-' + Date.now(),
    adminName: 'Bosh Admin',
    action,
    target,
    details,
    ip,
    createdAt: new Date()
  };
  try {
    await AuditLog.create(newLog);
  } catch (e) {
    localAuditLogs.unshift(newLog);
  }
};

// 1. Dashboard Statistika & Grafiklar
export const getDashboardStats = async (req, res) => {
  try {
    const mockUsers = getMockUsers();
    const allStudents = [...localStudents];
    mockUsers.forEach(mu => {
      if (!allStudents.some(s => s.name === mu.name)) {
        allStudents.push({
          id: mu._id,
          name: mu.name,
          email: mu.email,
          grade: mu.grade,
          coins: mu.coins,
          xp: mu.xp,
          level: mu.level,
          completedCount: mu.completedQuizzes?.length || 1,
          isBlocked: false,
          warningsCount: 0,
          selectedCareer: mu.selectedCareer
        });
      }
    });

    const totalStudents = allStudents.length;
    const activeStudents = allStudents.filter(s => !s.isBlocked).length;
    const totalCoinsInCirculation = allStudents.reduce((acc, curr) => acc + (curr.coins || 0), 0);
    const totalQuizzesCount = localQuizzes.length;
    const totalAssignmentsCount = localAssignments.length;
    const totalRevenue = localPayments
      .filter(p => p.status === 'Muvaffaqiyatli')
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Haftalik o'quvchilar faolligi (Dushanbadan Yakshanbagacha)
    const weeklyActivity = [
      { day: 'Dush', testlar: 45, faol: 38 },
      { day: 'Sesh', testlar: 52, faol: 44 },
      { day: 'Chor', testlar: 68, faol: 55 },
      { day: 'Pay', testlar: 61, faol: 50 },
      { day: 'Jum', testlar: 84, faol: 72 },
      { day: 'Shan', testlar: 95, faol: 89 },
      { day: 'Yak', testlar: 110, faol: 104 }
    ];

    // Fanlar bo'yicha qiziqish foizi
    const subjectsBreakdown = [
      { subject: 'Matematika', percent: 32, count: '142 test' },
      { subject: 'Informatika', percent: 28, count: '128 test' },
      { subject: 'Ingliz tili', percent: 18, count: '84 test' },
      { subject: 'Fizika', percent: 14, count: '65 test' },
      { subject: 'Boshqalar', percent: 8, count: '36 test' }
    ];

    res.json({
      success: true,
      stats: {
        totalStudents,
        activeStudents,
        totalQuizzesCount,
        totalAssignmentsCount,
        totalCoinsInCirculation,
        totalRevenue,
        weeklyActivity,
        subjectsBreakdown,
        aiSatisfaction: localAiSettings.satisfactionRating
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Statistika yuklashda xatolik' });
  }
};

// 2. O'quvchilar Boshqaruvi
export const getStudents = async (req, res) => {
  try {
    const { search, grade, status } = req.query;
    const mockUsers = getMockUsers();
    let list = [...localStudents];

    mockUsers.forEach(mu => {
      if (!list.some(s => s.name === mu.name)) {
        list.push({
          id: mu._id,
          name: mu.name,
          email: mu.email,
          avatar: mu.avatar,
          grade: mu.grade,
          coins: mu.coins,
          xp: mu.xp,
          level: mu.level,
          completedCount: mu.completedQuizzes?.length || 1,
          isBlocked: false,
          warningsCount: 0,
          selectedCareer: mu.selectedCareer
        });
      }
    });

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q));
    }
    if (grade && grade !== 'Barchasi') {
      list = list.filter(s => s.grade === grade);
    }
    if (status === 'blocked') {
      list = list.filter(s => s.isBlocked);
    } else if (status === 'active') {
      list = list.filter(s => !s.isBlocked);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ message: 'Oʻquvchilarni yuklashda xatolik' });
  }
};

export const toggleBlockStudent = async (req, res) => {
  try {
    const { id } = req.params;
    let found = localStudents.find(s => s.id === id || s._id === id);
    if (!found) {
      const mockUsers = getMockUsers();
      found = mockUsers.find(u => u._id === id);
    }

    if (!found) {
      return res.status(404).json({ message: 'Oʻquvchi topilmadi' });
    }

    found.isBlocked = !found.isBlocked;
    const statusText = found.isBlocked ? "bloklandi" : "faollashtirildi";

    await logAdminAction(
      `Oʻquvchi holati oʻzgartirildi: ${statusText}`,
      found.name,
      `Akkaunt holati: ${statusText}`
    );

    res.json({
      success: true,
      message: `${found.name} akkaunti muvaffaqiyatli ${statusText}!`,
      isBlocked: found.isBlocked
    });
  } catch (error) {
    res.status(500).json({ message: 'Bloklashda xatolik' });
  }
};

export const adjustCoins = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, reason } = req.body; // Masalan: +50 yoki -20

    const coinVal = parseInt(amount, 10);
    if (isNaN(coinVal)) {
      return res.status(400).json({ message: 'Notoʻgʻri coin miqdori' });
    }

    let found = localStudents.find(s => s.id === id || s._id === id);
    if (!found) {
      const mockUsers = getMockUsers();
      found = mockUsers.find(u => u._id === id);
    }

    if (!found) {
      return res.status(404).json({ message: 'Oʻquvchi topilmadi' });
    }

    found.coins = Math.max(0, (found.coins || 0) + coinVal);

    await logAdminAction(
      `Coin oʻzgarishi: ${coinVal > 0 ? '+' + coinVal : coinVal}`,
      found.name,
      `Sabab: ${reason || 'Admin tomonidan sozlandi'}`
    );

    res.json({
      success: true,
      message: `${found.name} hisobiga ${coinVal > 0 ? '+' + coinVal : coinVal} Coin amalga oshirildi!`,
      coins: found.coins
    });
  } catch (error) {
    res.status(500).json({ message: 'Coin oʻzgartirishda xatolik' });
  }
};

export const warnStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    let found = localStudents.find(s => s.id === id || s._id === id);
    if (!found) {
      const mockUsers = getMockUsers();
      found = mockUsers.find(u => u._id === id);
    }

    if (!found) {
      return res.status(404).json({ message: 'Oʻquvchi topilmadi' });
    }

    found.warningsCount = (found.warningsCount || 0) + 1;

    await logAdminAction(
      'Oʻquvchiga ogohlantirish berildi',
      found.name,
      `Sabab: ${reason || 'Qoidabuzarlik'}. Jami ogohlantirishlar: ${found.warningsCount}`
    );

    res.json({
      success: true,
      message: `${found.name} ga ogohlantirish yuborildi! (Jami: ${found.warningsCount})`,
      warningsCount: found.warningsCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Ogohlantirishda xatolik' });
  }
};

// 3. Testlar CRUD Boshqaruvi
export const createQuiz = async (req, res) => {
  try {
    const { title, subject, difficulty, timeLimitMinutes, coinsReward, xpReward, questions, icon } = req.body;

    if (!title || !subject || !questions || questions.length === 0) {
      return res.status(400).json({ message: 'Sarlavha, fan va savollarni toʻliq kiriting!' });
    }

    const newQuiz = {
      id: 'q-' + Date.now(),
      title,
      subject,
      difficulty: difficulty || "O'rtacha",
      timeLimitMinutes: Number(timeLimitMinutes) || 10,
      coinsReward: Number(coinsReward) || 30,
      xpReward: Number(xpReward) || 50,
      icon: icon || '📝',
      questions: questions.map(q => ({
        question: q.question,
        options: q.options || [],
        correctIndex: Number(q.correctIndex) || 0,
        explanation: q.explanation || "AI Ustoz: To'g'ri javob puxta tanlandi."
      })),
      createdAt: new Date()
    };

    localQuizzes.unshift(newQuiz);

    await logAdminAction(
      'Yangi test yaratildi',
      title,
      `Fan: ${subject}, Savollar soni: ${questions.length}`
    );

    res.status(201).json({
      success: true,
      message: `"${title}" testi muvaffaqiyatli yaratildi va oʻquvchilar katalogiga qoʻshildi!`,
      data: newQuiz
    });
  } catch (error) {
    res.status(500).json({ message: 'Test yaratishda xatolik' });
  }
};

export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const index = localQuizzes.findIndex(q => q.id === id || q._id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'Test topilmadi' });
    }

    localQuizzes[index] = {
      ...localQuizzes[index],
      ...req.body,
      updatedAt: new Date()
    };

    await logAdminAction('Test tahrirlandi', localQuizzes[index].title, `Test ID: ${id}`);

    res.json({
      success: true,
      message: 'Test muvaffaqiyatli yangilandi!',
      data: localQuizzes[index]
    });
  } catch (error) {
    res.status(500).json({ message: 'Testni yangilashda xatolik' });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quizToDelete = localQuizzes.find(q => q.id === id || q._id === id);
    localQuizzes = localQuizzes.filter(q => q.id !== id && q._id !== id);

    await logAdminAction(
      'Test oʻchirildi',
      quizToDelete?.title || id,
      'Test platformadan butunlay oʻchirildi'
    );

    res.json({
      success: true,
      message: 'Test muvaffaqiyatli oʻchirildi!'
    });
  } catch (error) {
    res.status(500).json({ message: 'Oʻchirishda xatolik' });
  }
};

// 4. Topshiriqlar Boshqaruvi
export const getAssignments = async (req, res) => {
  res.json({ success: true, count: localAssignments.length, data: localAssignments });
};

export const createAssignment = async (req, res) => {
  try {
    const { title, subject, description, difficulty, coinsReward, xpReward, deadline } = req.body;

    if (!title || !subject || !description) {
      return res.status(400).json({ message: 'Barcha maydonlarni toʻldiring' });
    }

    const newAsn = {
      id: 'asn-' + Date.now(),
      title,
      subject,
      description,
      difficulty: difficulty || "O'rtacha",
      coinsReward: Number(coinsReward) || 30,
      xpReward: Number(xpReward) || 45,
      deadline: deadline ? new Date(deadline) : new Date(Date.now() + 86400000 * 3),
      submissionsCount: 0,
      status: 'active',
      createdAt: new Date()
    };

    localAssignments.unshift(newAsn);

    await logAdminAction('Yangi topshiriq qoʻshildi', title, `Fan: ${subject}`);

    res.status(201).json({
      success: true,
      message: `"${title}" topshirigʻi yaratildi!`,
      data: newAsn
    });
  } catch (error) {
    res.status(500).json({ message: 'Topshiriq yaratishda xatolik' });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  localAssignments = localAssignments.filter(a => a.id !== id);
  await logAdminAction('Topshiriq oʻchirildi', id, 'Topshiriq oʻchirildi');
  res.json({ success: true, message: 'Topshiriq muvaffaqiyatli oʻchirildi' });
};

// 5. Kasblar va Fanlar Boshqaruvi
export const createCareer = async (req, res) => {
  try {
    const { title, slug, category, icon, description, averageSalary, demandLevel, requiredSubjects, keySkills, roadmap } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Kasb nomi va tavsifini kiriting' });
    }

    const newCareer = {
      id: 'c-' + Date.now(),
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      category: category || 'Texnologiya & IT',
      icon: icon || '💼',
      description,
      averageSalary: averageSalary || '$1,000 - $3,000',
      demandLevel: demandLevel || 'Yuqori',
      requiredSubjects: requiredSubjects || ['Matematika', 'Informatika'],
      keySkills: keySkills || ['Mantiqiy tahlil', 'Amaliyot'],
      roadmap: roadmap || [
        { step: 1, title: 'Asoslar', desc: 'Boshlangʻich fanlar va asosiy tushunchalarni oʻrganish' },
        { step: 2, title: 'Amaliyot', desc: 'Real masalalar va loyihalar ustida ishlash' }
      ]
    };

    localCareers.push(newCareer);

    await logAdminAction('Yangi kasb yoʻnalishi qoʻshildi', title, `Soha: ${category}`);

    res.status(201).json({
      success: true,
      message: `"${title}" kasbi katalogga qoʻshildi!`,
      data: newCareer
    });
  } catch (error) {
    res.status(500).json({ message: 'Kasb qoʻshishda xatolik' });
  }
};

export const deleteCareer = async (req, res) => {
  const { id } = req.params;
  localCareers = localCareers.filter(c => c.id !== id && c.slug !== id);
  await logAdminAction('Kasb oʻchirildi', id, 'Kasb oʻchirildi');
  res.json({ success: true, message: 'Kasb muvaffaqiyatli oʻchirildi' });
};

// 6. Sovg'alar va Mukofotlar Boshqaruvi
export const createReward = async (req, res) => {
  try {
    const { title, description, cost, category, icon, popular } = req.body;

    if (!title || !cost) {
      return res.status(400).json({ message: 'Sarlavha va narxni kiriting' });
    }

    const newRew = {
      id: 'r-' + Date.now(),
      title,
      description: description || 'Oʻquvchilar uchun qimmatli sovrin',
      cost: Number(cost),
      category: category || 'Nishon',
      icon: icon || '🎁',
      popular: Boolean(popular)
    };

    localRewards.push(newRew);

    await logAdminAction('Yangi sovgʻa qoʻshildi', title, `Narxi: ${cost} Coin`);

    res.status(201).json({
      success: true,
      message: `"${title}" sovgʻasi doʻkonga qoʻshildi!`,
      data: newRew
    });
  } catch (error) {
    res.status(500).json({ message: 'Sovgʻa qoʻshishda xatolik' });
  }
};

export const deleteReward = async (req, res) => {
  const { id } = req.params;
  localRewards = localRewards.filter(r => r.id !== id && r._id !== id);
  await logAdminAction('Sovgʻa oʻchirildi', id, 'Sovgʻa oʻchirildi');
  res.json({ success: true, message: 'Sovgʻa muvaffaqiyatli oʻchirildi' });
};

// 7. To'lovlar va Tariflar
export const getPayments = async (req, res) => {
  res.json({ success: true, count: localPayments.length, data: localPayments });
};

export const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const payment = localPayments.find(p => p.id === id);
  if (payment) {
    payment.status = status;
    await logAdminAction('Toʻlov holati oʻzgartirildi', payment.transactionId, `Yangi holat: ${status}`);
    return res.json({ success: true, message: `Toʻlov holati: ${status}`, data: payment });
  }
  res.status(404).json({ message: 'Toʻlov topilmadi' });
};

// 8. Moderatsiya (Chat va Savol-Javob)
export const getModerationItems = async (req, res) => {
  // Savollar va javoblar ro'yxati
  const items = [];
  localQuestions.forEach(q => {
    items.push({
      id: q.id || q._id,
      type: 'Savol',
      author: q.authorName,
      title: q.title,
      content: q.content,
      subject: q.subject,
      createdAt: q.createdAt
    });
    (q.answers || []).forEach((a, idx) => {
      items.push({
        id: `${q.id || q._id}_ans_${idx}`,
        parentQuestionId: q.id || q._id,
        type: a.isAiAnswer ? 'AI Javob' : 'Oʻquvchi javobi',
        author: a.authorName,
        title: `"${q.title}" ga javob`,
        content: a.content,
        subject: q.subject,
        createdAt: a.createdAt
      });
    });
  });

  res.json({ success: true, count: items.length, data: items });
};

export const deleteModerationItem = async (req, res) => {
  const { id } = req.params;

  if (id.includes('_ans_')) {
    const [qId, , aIdx] = id.split('_');
    const q = localQuestions.find(item => item.id === qId || item._id === qId);
    if (q && q.answers) {
      q.answers.splice(parseInt(aIdx, 10), 1);
    }
  } else {
    localQuestions = localQuestions.filter(q => q.id !== id && q._id !== id);
  }

  await logAdminAction('Nooʻrin xabar oʻchirildi', id, 'Moderator tomonidan oʻchirildi');
  res.json({ success: true, message: 'Xabar muvaffaqiyatli oʻchirildi!' });
};

// 9. Bildirishnomalar (Announcements)
export const getNotifications = async (req, res) => {
  res.json({ success: true, count: localNotifications.length, data: localNotifications });
};

export const sendNotification = async (req, res) => {
  try {
    const { title, message, type, icon, targetGrade } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: 'Sarlavha va xabar matnini kiriting' });
    }

    const newNtf = {
      id: 'ntf-' + Date.now(),
      title,
      message,
      type: type || 'news',
      icon: icon || '📢',
      targetGrade: targetGrade || 'Barchasi',
      createdAt: new Date()
    };

    localNotifications.unshift(newNtf);

    await logAdminAction('Yangi eʼlon yuborildi', title, `Guruh: ${targetGrade || 'Barchasi'}`);

    res.status(201).json({
      success: true,
      message: 'Bildirishnoma barcha oʻquvchilarga yuborildi!',
      data: newNtf
    });
  } catch (error) {
    res.status(500).json({ message: 'Eʼlon yuborishda xatolik' });
  }
};

// 10. Xavfsizlik Audit Jurnali (Audit Logs)
export const getAuditLogs = async (req, res) => {
  res.json({ success: true, count: localAuditLogs.length, data: localAuditLogs });
};

// 11. AI Ustoz Nazorati & Sozlamalari
export const getAiStats = async (req, res) => {
  res.json({ success: true, data: localAiSettings });
};

export const updateAiSettings = async (req, res) => {
  const { temperature, personalityTone, voiceEnabled } = req.body;
  if (temperature !== undefined) localAiSettings.temperature = temperature;
  if (personalityTone !== undefined) localAiSettings.personalityTone = personalityTone;
  if (voiceEnabled !== undefined) localAiSettings.voiceEnabled = voiceEnabled;

  await logAdminAction('AI Ustoz sozlamalari yangilandi', 'AI Model', `Tone: ${personalityTone}`);

  res.json({
    success: true,
    message: 'AI Ustoz sozlamalari saqlandi!',
    data: localAiSettings
  });
};
