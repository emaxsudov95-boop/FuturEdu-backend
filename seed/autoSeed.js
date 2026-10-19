import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Career from '../models/Career.js';
import Quiz from '../models/Quiz.js';
import Reward from '../models/Reward.js';
import Question from '../models/Question.js';
import Assignment from '../models/Assignment.js';
import Notification from '../models/Notification.js';

import {
  initialCareers,
  initialQuizzes,
  initialRewards,
  initialQuestions,
  initialAssignments,
  initialNotifications,
  initialLeaderboard
} from './seedData.js';

export const seedDatabaseIfEmpty = async () => {
  try {
    // 1. Foydalanuvchilar (Users)
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 MongoDB Atlas: Foydalanuvchilar bazasini boshlang\'ich to\'ldirish...');
      const defaultPasswordHash = await bcrypt.hash('123456', 10);
      
      const seedUsers = [
        {
          name: "Dilshodbek Olimov",
          email: "dilshod@edulearn.uz",
          password: defaultPasswordHash,
          role: "student",
          avatar: "🧑‍💻",
          grade: "9-sinf",
          coins: 250,
          xp: 420,
          level: 3,
          selectedCareer: "Sun'iy Intellekt Muhandisi (AI Engineer)",
          badges: [
            { id: "b-1", name: "Birinchi Qadam", icon: "🌱", description: "FuturEdu platformasiga qo'shildi", earnedAt: new Date() },
            { id: "b-2", name: "Ziyrak O'quvchi", icon: "⭐", description: "Birinchi testni a'lo yechdi", earnedAt: new Date() }
          ],
          completedQuizzes: [
            { quizId: "q-1", quizTitle: "Matematika: Mantiq va Sonlar Sehrli Olam", score: 4, maxScore: 4, coinsEarned: 30, date: new Date() }
          ],
          inventory: [
            { rewardId: "r-1", title: "Oltin Daho Nishoni", icon: "🥇", purchasedAt: new Date() }
          ],
          streak: 4
        },
        {
          name: "Bosh Administrator",
          email: "admin@futuredu.uz",
          password: await bcrypt.hash('admin123', 10),
          role: "admin",
          avatar: "🛡️",
          grade: "Admin",
          coins: 9999,
          xp: 10000,
          level: 10,
          selectedCareer: "Platforma Boshqaruvchisi",
          badges: [],
          completedQuizzes: [],
          inventory: []
        }
      ];

      // initialLeaderboard foydalanuvchilarini ham qo'shamiz
      for (const lbUser of initialLeaderboard) {
        seedUsers.push({
          name: lbUser.name,
          email: lbUser.email,
          password: defaultPasswordHash,
          role: "student",
          avatar: lbUser.avatar,
          grade: lbUser.grade,
          coins: lbUser.coins,
          xp: lbUser.xp,
          level: lbUser.level,
          selectedCareer: lbUser.selectedCareer,
          badges: [
            { id: `b-${lbUser.id}`, name: "Chempion", icon: "🏆", description: "Yetakchilar safida", earnedAt: new Date() }
          ],
          completedQuizzes: [],
          inventory: []
        });
      }

      await User.insertMany(seedUsers);
      console.log(`✅ ${seedUsers.length} ta foydalanuvchi MongoDB Atlas bazasiga saqlandi.`);
    }

    // 2. Kasblar (Careers)
    const careerCount = await Career.countDocuments();
    if (careerCount === 0) {
      console.log('🌱 MongoDB Atlas: Kasblar yo\'riqnomasini to\'ldirish...');
      await Career.insertMany(initialCareers);
      console.log(`✅ ${initialCareers.length} ta kasb MongoDB Atlas bazasiga saqlandi.`);
    }

    // 3. Testlar (Quizzes)
    const quizCount = await Quiz.countDocuments();
    if (quizCount === 0) {
      console.log('🌱 MongoDB Atlas: Fan testlarini to\'ldirish...');
      await Quiz.insertMany(initialQuizzes);
      console.log(`✅ ${initialQuizzes.length} ta test MongoDB Atlas bazasiga saqlandi.`);
    }

    // 4. Sovg'alar va Tangalar Do'koni (Rewards)
    const rewardCount = await Reward.countDocuments();
    if (rewardCount === 0) {
      console.log('🌱 MongoDB Atlas: Do\'kon sovg\'alarini to\'ldirish...');
      await Reward.insertMany(initialRewards);
      console.log(`✅ ${initialRewards.length} ta sovg'a MongoDB Atlas bazasiga saqlandi.`);
    }

    // 5. Savol-Javob hamjamiyati (Questions)
    const questionCount = await Question.countDocuments();
    if (questionCount === 0) {
      console.log('🌱 MongoDB Atlas: Savol-javob jamoasi ma\'lumotlarini to\'ldirish...');
      await Question.insertMany(initialQuestions);
      console.log(`✅ ${initialQuestions.length} ta savol-javob MongoDB Atlas bazasiga saqlandi.`);
    }

    // 6. Topshiriqlar (Assignments)
    if (Assignment) {
      const assignCount = await Assignment.countDocuments();
      if (assignCount === 0 && initialAssignments?.length > 0) {
        await Assignment.insertMany(initialAssignments);
      }
    }

    // 7. Bildirishnomalar (Notifications)
    if (Notification) {
      const notifCount = await Notification.countDocuments();
      if (notifCount === 0 && initialNotifications?.length > 0) {
        await Notification.insertMany(initialNotifications);
      }
    }

    console.log('🎉 MongoDB Atlas ("futuredu" DB) ma\'lumotlar bilan to\'liq ta\'minlandi!');
  } catch (err) {
    console.error('⚠️ Avtomatik ma\'lumot kiritishda xatolik:', err.message);
  }
};
