import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
  authorAvatar: { type: String, default: '🧑‍🎓' },
  authorGrade: { type: String, default: 'Oʻquvchi' },
  content: { type: String, required: true },
  isAiAnswer: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  subject: { type: String, required: true },
  authorName: { type: String, required: true },
  authorAvatar: { type: String, default: '🎓' },
  coinsBounty: { type: Number, default: 15 },
  answers: [answerSchema],
  views: { type: Number, default: 0 },
  solved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
export default Question;
