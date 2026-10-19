import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  planName: { type: String, required: true }, // 'Boshlang'ich', 'Olim Pro', 'Premium Yillik'
  amount: { type: Number, required: true }, // UZS
  paymentMethod: { type: String, enum: ['Payme', 'Click', 'Uzum', 'Karta'], default: 'Payme' },
  status: { type: String, enum: ['Muvaffaqiyatli', 'Kutilmoqda', 'Bekor qilindi'], default: 'Muvaffaqiyatli' },
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema);
export default Payment;
