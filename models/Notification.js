import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['news', 'contest', 'quiz', 'alert'], default: 'news' },
  icon: { type: String, default: '📢' },
  targetGrade: { type: String, default: 'Barchasi' },
  createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default Notification;
