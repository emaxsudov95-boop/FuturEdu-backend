import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import { initialQuizzes } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

let localQuizzes = [...initialQuizzes];

export const getQuizzes = async (req, res) => {
  try {
    const { subject, career } = req.query;
    try {
      let filter = {};
      if (subject && subject !== 'Barchasi') {
        filter.subject = subject;
      }
      if (career && career !== 'Barchasi') {
        filter.$or = [{ careerSlug: career }, { careerTitle: career }];
      }
      const quizzes = await Quiz.find(filter);
      if (quizzes && quizzes.length > 0) {
        return res.json({ success: true, count: quizzes.length, data: quizzes });
      }
    } catch (e) {}

    let filtered = localQuizzes;
    if (subject && subject !== 'Barchasi') {
      filtered = filtered.filter(q => q.subject.toLowerCase() === subject.toLowerCase());
    }
    if (career && career !== 'Barchasi') {
      filtered = filtered.filter(q => 
        (q.careerSlug && q.careerSlug.toLowerCase() === career.toLowerCase()) || 
        (q.careerTitle && q.careerTitle.toLowerCase().includes(career.toLowerCase()))
      );
    }

    res.json({ success: true, count: filtered.length, data: filtered });
  } catch (error) {
    res.status(500).json({ message: 'Testlarni yuklashda xatolik' });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      const quiz = await Quiz.findById(id);
      if (quiz) return res.json({ success: true, data: quiz });
    } catch (e) {}

    const found = localQuizzes.find(q => q.id === id || q._id === id);
    if (found) {
      return res.json({ success: true, data: found });
    }

    res.status(404).json({ message: 'Test topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik' });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // { questionIndex: selectedOptionIndex }
    const userId = req.user?.id;

    let quiz = localQuizzes.find(q => q.id === id || q._id === id);
    if (!quiz) {
      try {
        quiz = await Quiz.findById(id);
      } catch (e) {}
    }

    if (!quiz) {
      return res.status(404).json({ message: 'Test topilmadi' });
    }

    let correctCount = 0;
    const totalQuestions = quiz.questions.length;
    const reviewDetails = [];

    quiz.questions.forEach((q, idx) => {
      const selected = answers ? answers[idx] : undefined;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      reviewDetails.push({
        question: q.question,
        options: q.options,
        userSelected: selected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      });
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    // Hisoblangan Coin va XP: to'g'ri javoblarga mutanosib
    const earnedCoins = Math.round((correctCount / totalQuestions) * (quiz.coinsReward || 30));
    const earnedXp = Math.round((correctCount / totalQuestions) * (quiz.xpReward || 50));

    let motivationalMessage = "Barakalla! Bilim olishdan to'xtama!";
    if (percentage === 100) {
      motivationalMessage = "Dahoshiz! 100% to'g'ri bajardingiz! Siz haqiqiy chempionsiz! 🏆✨";
    } else if (percentage >= 70) {
      motivationalMessage = "Juda yaxshi natija! Kichik xatolarni ko'rib chiqsangiz, keyingi safar 100% bo'ladi! 🚀";
    } else {
      motivationalMessage = "Yaxshi urinish! Har bir xato — bu yangi narsani o'rganish imkoniyati. Izohlarni o'qib chiqing! 💡";
    }

    // Foydalanuvchi hisobiga qo'shish
    if (userId) {
      try {
        const u = await User.findById(userId);
        if (u) {
          u.coins = (u.coins || 0) + earnedCoins;
          u.xp = (u.xp || 0) + earnedXp;
          // Level hisoblash: har 150 XP da 1 level oshadi
          u.level = Math.floor(u.xp / 150) + 1;
          u.completedQuizzes.push({
            quizId: quiz.id || quiz._id,
            quizTitle: quiz.title,
            score: correctCount,
            maxScore: totalQuestions,
            coinsEarned: earnedCoins,
            date: new Date()
          });

          // Badge tekshirish: agar 100% bo'lsa
          if (percentage === 100 && !u.badges.some(b => b.id === 'b-perfect')) {
            u.badges.push({
              id: 'b-perfect',
              name: 'Mukammal Natija',
              icon: '💯',
              description: 'Birorta ham xatosiz test topshirdi',
              earnedAt: new Date()
            });
          }

          await u.save();
        }
      } catch (e) {
        const mockUsers = getMockUsers();
        const mock = mockUsers.find(u => u._id === userId);
        if (mock) {
          mock.coins = (mock.coins || 0) + earnedCoins;
          mock.xp = (mock.xp || 0) + earnedXp;
          mock.level = Math.floor(mock.xp / 150) + 1;
          mock.completedQuizzes.push({
            quizId: quiz.id || quiz._id,
            quizTitle: quiz.title,
            score: correctCount,
            maxScore: totalQuestions,
            coinsEarned: earnedCoins,
            date: new Date()
          });
          if (percentage === 100 && !mock.badges.some(b => b.id === 'b-perfect')) {
            mock.badges.push({
              id: 'b-perfect',
              name: 'Mukammal Natija',
              icon: '💯',
              description: 'Birorta ham xatosiz test topshirdi',
              earnedAt: new Date()
            });
          }
        }
      }
    }

    res.json({
      success: true,
      score: correctCount,
      total: totalQuestions,
      percentage,
      earnedCoins,
      earnedXp,
      message: motivationalMessage,
      review: reviewDetails
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ message: 'Natijani hisoblashda xatolik yuz berdi' });
  }
};
