import User from '../models/User.js';
import { initialLeaderboard } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

export const getLeaderboard = async (req, res) => {
  try {
    let usersList = [];
    try {
      usersList = await User.find()
        .select('name avatar grade coins xp level selectedCareer')
        .sort({ coins: -1 })
        .limit(20);
    } catch (e) {}

    if (!usersList || usersList.length === 0) {
      const mockUsers = getMockUsers();
      // Combine mock users and seed leaderboard
      usersList = [...initialLeaderboard];
      mockUsers.forEach(mu => {
        if (!usersList.some(u => u.name === mu.name)) {
          usersList.push({
            id: mu._id,
            name: mu.name,
            avatar: mu.avatar,
            grade: mu.grade,
            coins: mu.coins,
            xp: mu.xp,
            level: mu.level,
            league: mu.level >= 5 ? 'Olmos Liga' : mu.level >= 3 ? 'Oltin Liga' : 'Kumush Liga'
          });
        }
      });
      usersList.sort((a, b) => b.coins - a.coins);
    }

    // Add rank and league calculation
    const formatted = usersList.map((u, idx) => {
      const level = u.level || 1;
      let league = 'Bronza Liga';
      if (level >= 6 || (u.coins || 0) >= 400) league = 'Olmos Liga 💎';
      else if (level >= 4 || (u.coins || 0) >= 250) league = 'Oltin Liga 🥇';
      else if (level >= 2 || (u.coins || 0) >= 100) league = 'Kumush Liga 🥈';

      return {
        rank: idx + 1,
        id: u._id || u.id,
        name: u.name,
        avatar: u.avatar || '🧑‍🎓',
        grade: u.grade || 'Oʻquvchi',
        coins: u.coins || 0,
        xp: u.xp || 0,
        level: level,
        league
      };
    });

    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ message: 'Reytingni yuklashda xatolik' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, avatar, grade, selectedCareer } = req.body;

    try {
      const updated = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            ...(name && { name }),
            ...(avatar && { avatar }),
            ...(grade && { grade }),
            ...(selectedCareer && { selectedCareer })
          }
        },
        { new: true }
      ).select('-password');

      if (updated) {
        return res.json({ success: true, message: 'Profil muvaffaqiyatli yangilandi!', user: updated });
      }
    } catch (e) {}

    const mockUsers = getMockUsers();
    const mock = mockUsers.find(u => u._id === userId);
    if (mock) {
      if (name) mock.name = name;
      if (avatar) mock.avatar = avatar;
      if (grade) mock.grade = grade;
      if (selectedCareer) mock.selectedCareer = selectedCareer;

      return res.json({
        success: true,
        message: 'Profil muvaffaqiyatli yangilandi!',
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
          streak: mock.streak
        }
      });
    }

    res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Profilni yangilashda xatolik' });
  }
};
