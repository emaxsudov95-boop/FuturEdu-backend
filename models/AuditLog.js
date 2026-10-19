import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  adminName: { type: String, default: 'Bosh Admin' },
  action: { type: String, required: true }, // Masalan: "O'quvchi bloklandi", "Yangi test yaratildi"
  target: { type: String, required: true },
  details: { type: String },
  ip: { type: String, default: '127.0.0.1' },
  createdAt: { type: Date, default: Date.now }
});

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', auditLogSchema);
export default AuditLog;
