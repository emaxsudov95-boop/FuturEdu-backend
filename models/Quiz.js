import mongoose from 'mongoose';

const questionItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  explanation: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true }, // Matematika, Fizika, Ona tili, Ingliz tili, Informatika, Kimyo, Biologiya, Mantiq
  icon: { type: String, default: '📚' },
  difficulty: { type: String, enum: ['Oson', "O'rtacha", 'Qiyin'], default: "O'rtacha" },
  timeLimitMinutes: { type: Number, default: 10 },
  coinsReward: { type: Number, default: 30 },
  xpReward: { type: Number, default: 50 },
  questions: [questionItemSchema],
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
