import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  isBlocked: { type: Boolean, default: false },
  warningsCount: { type: Number, default: 0 },
  avatar: { type: String, default: '🎓' },
  grade: { type: String, default: '8-sinf' },
  coins: { type: Number, default: 100 },
  xp: { type: Number, default: 50 },
  level: { type: Number, default: 1 },
  selectedCareer: { type: String, default: 'Dasturchi (Software Engineer)' },
  badges: [
    {
      id: String,
      name: String,
      icon: String,
      description: String,
      earnedAt: { type: Date, default: Date.now }
    }
  ],
  completedQuizzes: [
    {
      quizId: String,
      quizTitle: String,
      score: Number,
      maxScore: Number,
      coinsEarned: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  inventory: [
    {
      rewardId: String,
      title: String,
      icon: String,
      purchasedAt: { type: Date, default: Date.now }
    }
  ],
  streak: { type: Number, default: 3 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
