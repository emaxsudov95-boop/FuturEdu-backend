import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Oson', "O'rtacha", 'Qiyin'], default: "O'rtacha" },
  coinsReward: { type: Number, default: 25 },
  xpReward: { type: Number, default: 40 },
  deadline: { type: Date, required: true },
  submissionsCount: { type: Number, default: 0 },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

const Assignment = mongoose.models.Assignment || mongoose.model('Assignment', assignmentSchema);
export default Assignment;
