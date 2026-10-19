import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: String, enum: ['Nishon', 'Kitob', 'Imkoniyat', 'Avatar', 'Sertifikat'], default: 'Nishon' },
  icon: { type: String, default: '🎁' },
  badgeColor: { type: String, default: 'from-amber-400 to-amber-600' },
  popular: { type: Boolean, default: false }
});

const Reward = mongoose.models.Reward || mongoose.model('Reward', rewardSchema);
export default Reward;
