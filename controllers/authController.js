import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { initialLeaderboard } from '../seed/seedData.js';

// In-Memory store fallback
let mockUsers = [
  {
    _id: "demo-user-1",
    name: "O'quvchi Dilshod",
    email: "dilshod@edulearn.uz",
    passwordHash: bcrypt.hashSync("123456", 10),
    avatar: "🧑‍🎓",
    grade: "8-sinf",
    coins: 160,
    xp: 220,
    level: 2,
    selectedCareer: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    badges: [
      { id: "b-1", name: "Birinchi Qadam", icon: "🌱", description: "Platformaga muvaffaqiyatli qo'shildi", earnedAt: new Date() },
      { id: "b-2", name: "Ziyrak O'quvchi", icon: "⭐", description: "Birinchi testni a'lo yechdi", earnedAt: new Date() }
    ],
    completedQuizzes: [
      { quizId: "q-1", quizTitle: "Matematika: Mantiq va Sonlar Sehrli Olam", score: 4, maxScore: 4, coinsEarned: 30, date: new Date() }
    ],
    inventory: [
      { rewardId: "r-1", title: "Oltin Daho Nishoni", icon: "🥇", purchasedAt: new Date() }
    ],
    streak: 4
  }
];

export const getMockUsers = () => mockUsers;

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET || 'bilimdon_super_secure_secret_token_key_2026', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, grade, avatar } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Iltimos, barcha maydonlarni toʻldiring!' });
    }

    // Try MongoDB first
    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Bu email orqali allaqachon roʻyxatdan oʻtilgan!' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        grade: grade || '8-sinf',
        avatar: avatar || '🧑‍🎓',
        coins: 100, // Ro'yxatdan o'tish bonusi
        xp: 50,
        level: 1,
        badges: [
          { id: 'b-welcome', name: 'Xush kelibsiz!', icon: '🎉', description: "Platformaga a'zo bo'ldi", earnedAt: new Date() }
        ]
      });

      return res.status(201).json({
        success: true,
        message: "Tabriklaymiz! Sizga 100 Coin va 50 XP sovg'a berildi! 🎁",
        token: generateToken(user._id, user.email),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          grade: user.grade,
          coins: user.coins,
          xp: user.xp,
          level: user.level,
          selectedCareer: user.selectedCareer,
          badges: user.badges,
          inventory: user.inventory || [],
          streak: user.streak || 1
        }
      });
    } catch (mongoError) {
      // In-Memory Fallback
      const exists = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        return res.status(400).json({ message: 'Bu email orqali allaqachon roʻyxatdan oʻtilgan!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email,
        passwordHash: hashedPassword,
        grade: grade || '8-sinf',
        avatar: avatar || '🧑‍🎓',
        coins: 100,
        xp: 50,
        level: 1,
        selectedCareer: "Dasturchi (Full-Stack Web Developer)",
        badges: [
          { id: 'b-welcome', name: 'Xush kelibsiz!', icon: '🎉', description: "Platformaga a'zo bo'ldi", earnedAt: new Date() }
        ],
        completedQuizzes: [],
        inventory: [],
        streak: 1
      };
      mockUsers.push(newUser);

      return res.status(201).json({
        success: true,
        message: "Tabriklaymiz! Sizga 100 Coin va 50 XP sovg'a berildi! 🎁",
        token: generateToken(newUser._id, newUser.email),
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          grade: newUser.grade,
          coins: newUser.coins,
          xp: newUser.xp,
          level: newUser.level,
          selectedCareer: newUser.selectedCareer,
          badges: newUser.badges,
          inventory: newUser.inventory,
          streak: newUser.streak
        }
      });
    }
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server xatoligi yuz berdi' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email va parolni kiriting!' });
    }

    try {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          success: true,
          token: generateToken(user._id, user.email),
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            grade: user.grade,
            coins: user.coins,
            xp: user.xp,
            level: user.level,
            selectedCareer: user.selectedCareer,
            badges: user.badges || [],
            inventory: user.inventory || [],
            streak: user.streak || 1
          }
        });
      }
    } catch (e) {
      // Mongo fallback
    }

    // Check Mock users
    const mockUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (mockUser && (await bcrypt.compare(password, mockUser.passwordHash))) {
      return res.json({
        success: true,
        token: generateToken(mockUser._id, mockUser.email),
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          avatar: mockUser.avatar,
          grade: mockUser.grade,
          coins: mockUser.coins,
          xp: mockUser.xp,
          level: mockUser.level,
          selectedCareer: mockUser.selectedCareer,
          badges: mockUser.badges || [],
          inventory: mockUser.inventory || [],
          streak: mockUser.streak || 1
        }
      });
    }

    return res.status(401).json({ message: "Noto'g'ri email yoki parol kiritildi!" });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server xatoligi yuz berdi' });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user.id;
    try {
      const user = await User.findById(userId).select('-password');
      if (user) {
        return res.json({ success: true, user });
      }
    } catch (e) {}

    const mock = mockUsers.find(u => u._id === userId);
    if (mock) {
      return res.json({
        success: true,
        user: {
          id: mock._id,
          name: mock.name,
          email: mock.email,
          avatar: mock.avatar,
          grade: mock.grade,
          coins: mock.coins,
          xp: mock.xp,
          level: mock.level,
          selectedCareer: mock.selectedCareer,
          badges: mock.badges,
          inventory: mock.inventory,
          streak: mock.streak,
          completedQuizzes: mock.completedQuizzes
        }
      });
    }

    res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Xatolik' });
  }
};
