import mongoose from 'mongoose';
import { seedDatabaseIfEmpty } from '../seed/autoSeed.js';

let isConnected = false;
let retryInterval = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://sensey:Tz02wW4baigi38jQ@hakaton-sensey.uklgntq.mongodb.net/futuredu?retryWrites=true&w=majority&appName=hakaton-sensey';
  const isAtlas = uri.includes('mongodb.net') || uri.includes('+srv');

  const attemptConnect = async () => {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 6000,
      });
      isConnected = true;
      if (retryInterval) {
        clearInterval(retryInterval);
        retryInterval = null;
      }

      console.log(`\n======================================================`);
      console.log(`✅ MongoDB Atlas ("futuredu" DB) muvaffaqiyatli ulandi!`);
      console.log(`🌐 Server Host: ${conn.connection.host}`);
      console.log(`📦 Database: ${conn.connection.name}`);
      console.log(`======================================================\n`);

      // Boshlang'ich ma'lumotlarni tekshirib to'ldirish
      await seedDatabaseIfEmpty();
      return true;
    } catch (error) {
      isConnected = false;
      if (isAtlas) {
        console.warn(`\n⚠️  Diqqat: MongoDB Atlas klasteriga ulanib bo'lmadi.`);
        console.warn(`📌 Xatolik sababi: ${error.message}`);
        console.warn(`💡 MUHIM ESLATMA: Agar birinchi marta ulanayotgan bo'lsangiz:`);
        console.warn(`   1. MongoDB Atlas saytiga kiring: https://cloud.mongodb.com`);
        console.warn(`   2. Chap menyudan "Network Access" bo'limiga o'ting`);
        console.warn(`   3. "+ Add IP Address" tugmasini bosib "Allow Access from Anywhere" (0.0.0.0/0) ni tanlang va tasdiqlang!`);
        console.warn(`🔄 Tizim fonda har 15 soniyada qayta ulanishni tekshirib turadi...\n`);
      } else {
        console.warn(`⚠️ Mahalliy MongoDB serveriga ulanib bo'lmadi: ${error.message}`);
      }
      return false;
    }
  };

  const initialSuccess = await attemptConnect();

  // Agar dastlab ulanolmasa, har 15 soniyada avtomatik qayta sinab turadi
  if (!initialSuccess && !retryInterval) {
    retryInterval = setInterval(async () => {
      if (!isConnected) {
        await attemptConnect();
      }
    }, 15000);
  }

  return initialSuccess;
};
