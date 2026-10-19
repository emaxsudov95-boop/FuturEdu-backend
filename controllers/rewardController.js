import Reward from '../models/Reward.js';
import User from '../models/User.js';
import { initialRewards } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

let localRewards = [...initialRewards];

export const getRewards = async (req, res) => {
  try {
    try {
      const rewards = await Reward.find();
      if (rewards && rewards.length > 0) {
        return res.json({ success: true, count: rewards.length, data: rewards });
      }
    } catch (e) {}

    res.json({ success: true, count: localRewards.length, data: localRewards });
  } catch (error) {
    res.status(500).json({ message: 'Sovgʻalarni yuklashda xatolik' });
  }
};

export const purchaseReward = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const reward = localRewards.find(r => r.id === id || r._id === id);
    if (!reward) {
      return res.status(404).json({ message: 'Bunday sovgʻa topilmadi' });
    }

    // Tekshirish MongoDB
    try {
      const user = await User.findById(userId);
      if (user) {
        if (user.coins < reward.cost) {
          return res.status(400).json({
            message: `Yetarli coin mavjud emas! Sovgʻa narxi: ${reward.cost} Coin, sizda esa: ${user.coins} Coin.`
          });
        }

        user.coins -= reward.cost;
        user.inventory = user.inventory || [];
        user.inventory.push({
          rewardId: reward.id,
          title: reward.title,
          icon: reward.icon,
          purchasedAt: new Date()
        });

        await user.save();

        return res.json({
          success: true,
          message: `Tabriklaymiz! "${reward.title}" muvaffaqiyatli xarid qilindi! 🎉`,
          coinsLeft: user.coins,
          inventory: user.inventory
        });
      }
    } catch (e) {}

    // In-memory fallback
    const mockUsers = getMockUsers();
    const mock = mockUsers.find(u => u._id === userId);
    if (mock) {
      if ((mock.coins || 0) < reward.cost) {
        return res.status(400).json({
          message: `Yetarli coin mavjud emas! Sovgʻa narxi: ${reward.cost} Coin, sizda esa: ${mock.coins} Coin.`
        });
      }

      mock.coins -= reward.cost;
      mock.inventory = mock.inventory || [];
      mock.inventory.push({
        rewardId: reward.id,
        title: reward.title,
        icon: reward.icon,
        purchasedAt: new Date()
      });

      return res.json({
        success: true,
        message: `Tabriklaymiz! "${reward.title}" muvaffaqiyatli xarid qilindi! 🎉`,
        coinsLeft: mock.coins,
        inventory: mock.inventory
      });
    }

    res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
  } catch (error) {
    res.status(500).json({ message: 'Sovgʻani sotib olishda xatolik yuz berdi' });
  }
};
