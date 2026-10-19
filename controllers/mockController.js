import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import AuditLog from '../models/AuditLog.js';
import { getMockUsers } from './authController.js';

// Admin tomonidan sozlanuvchi MOK Test parametrlari
let mockSettings = {
  entryCostCoins: 30,        // Test boshlash narxi (coin)
  cashbackThreshold: 80,     // Coin qaytarish uchun minimal ball (100 dan)
  timeLimitMinutes: 20,      // Test davomiyligi (daqiqa)
  highScoreBonusCoins: 20,   // 90+ ball uchun qo'shimcha bonus coin
  perfectScoreBonusCoins: 50,// 100 ball uchun qo'shimcha bonus coin
  questionCount: 10          // Har bir testda beriladigan savollar soni
};

// Fanlar ro'yxati
export const MOCK_SUBJECTS = [
  {
    id: 'matematika',
    name: 'Matematika',
    icon: '📐',
    color: 'from-blue-600 to-indigo-700',
    description: 'Algebra, geometriya, tenglamalar, logarifmlar va mantiqiy masalalar',
    badge: 'Aniq fanlar'
  },
  {
    id: 'informatika',
    name: 'Informatika & Dasturlash',
    icon: '💻',
    color: 'from-emerald-600 to-teal-700',
    description: 'Python, algoritmlar, maʼlumotlar tuzilmasi, tarmoqlar va kompyuter savodxonligi',
    badge: 'IT & Texnologiya'
  },
  {
    id: 'ingliz-tili',
    name: 'Ingliz tili',
    icon: '🇬🇧',
    color: 'from-violet-600 to-purple-700',
    description: 'Grammar (Conditionals, Tenses), Vocabulary, Phrasal verbs va matn tahlili',
    badge: 'Xorijiy tillar'
  },
  {
    id: 'fizika',
    name: 'Fizika',
    icon: '⚡',
    color: 'from-amber-600 to-orange-700',
    description: 'Mexanika, Nyuton qonunlari, elektr zaryadlari, optika va termodinamika',
    badge: 'Tabiiy fanlar'
  },
  {
    id: 'kimyo',
    name: 'Kimyo',
    icon: '🧪',
    color: 'from-rose-600 to-pink-700',
    description: 'Davriy qonun, kimyoviy bogʻlanishlar, reaksiyalar tenglamasi va eritmalar',
    badge: 'Tabiiy fanlar'
  },
  {
    id: 'biologiya',
    name: 'Biologiya',
    icon: '🧬',
    color: 'from-teal-600 to-cyan-700',
    description: 'Hujayra biologiyasi, genetika, DNK, fotosintez va inson anatomiyasi',
    badge: 'Hayot haqidagi fan'
  },
  {
    id: 'ona-tili',
    name: 'Ona tili va Adabiyot',
    icon: '📖',
    color: 'from-fuchsia-600 to-rose-700',
    description: 'Morfologiya, sintaksis, imlo qoidalari va oʻzbek adabiyoti durdonalari',
    badge: 'Gumanitar'
  },
  {
    id: 'tarix',
    name: 'Tarix',
    icon: '🏛️',
    color: 'from-yellow-600 to-amber-700',
    description: 'Oʻzbekiston va jahon tarixi, Amir Temur saltanati, muhim sanalar va davlatlar',
    badge: 'Gumanitar'
  }
];

// Savollar bazasi (Har bir fanga turli qiyinlikdagi boy savollar)
const QUESTION_BANK = {
  matematika: [
    {
      id: 'm-1',
      question: 'Agar 2^(x+3) = 64 boʻlsa, x ning qiymatini toping.',
      options: ['2', '3', '4', '5'],
      correctIndex: 1, // 3, chunki 2^6 = 64 -> x+3=6 = 3
      difficulty: 'Oson',
      explanation: '64 = 2^6 ga teng. Demak, 2^(x+3) = 2^6 asoslari teng boʻlgani uchun darajalari ham teng boʻladi: x + 3 = 6 => x = 3.'
    },
    {
      id: 'm-2',
      question: 'Toʻgʻri burchakli uchburchakning gipotenuzasi 10 sm, katetlaridan biri 6 sm boʻlsa, ikkinchi katetini toping.',
      options: ['7 sm', '8 sm', '9 sm', '12 sm'],
      correctIndex: 1, // 8
      difficulty: 'Oson',
      explanation: 'Pifagor teoremasiga koʻra: a² + b² = c². 6² + b² = 10² => 36 + b² = 100 => b² = 64 => b = 8 sm.'
    },
    {
      id: 'm-3',
      question: 'Funksiyaning hosilasini toping: f(x) = 3x³ - 5x² + 7x - 9.',
      options: ['9x² - 10x + 7', '6x² - 5x + 7', '9x³ - 10x² + 7', '3x² - 10x'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Darajali funksiya hosilasi formulasi: (x^n)\' = n*x^(n-1). f\'(x) = 3*(3x²) - 5*(2x) + 7 = 9x² - 10x + 7.'
    },
    {
      id: 'm-4',
      question: 'Arifmetik progressiyada a₁ = 4 va d = 3 boʻlsa, 10-hadi (a₁₀) nechiga teng?',
      options: ['28', '31', '34', '37'],
      correctIndex: 1, // 31
      difficulty: "O'rtacha",
      explanation: 'a_n = a₁ + (n-1)*d formulasi boʻyicha: a₁₀ = 4 + (10 - 1)*3 = 4 + 27 = 31.'
    },
    {
      id: 'm-5',
      question: 'Tenglamani yeching: log₂(x - 2) = 4.',
      options: ['14', '16', '18', '20'],
      correctIndex: 2, // 18
      difficulty: "O'rtacha",
      explanation: 'Logarifm taʼrifiga koʻra: x - 2 = 2⁴ => x - 2 = 16 => x = 18.'
    },
    {
      id: 'm-6',
      question: 'Idishda 3 ta oq va 5 ta qora shar bor. Tavakkaliga olingan sharning oq boʻlish ehtimolini toping.',
      options: ['3/8', '5/8', '1/3', '3/5'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Jami sharlar soni n = 3 + 5 = 8. Oq sharlar soni m = 3. Ehtimollik: P = m / n = 3/8.'
    },
    {
      id: 'm-7',
      question: 'Agar sin(α) = 3/5 va α birinchi chorakda boʻlsa, cos(α) ni toping.',
      options: ['4/5', '1/5', '2/5', '5/4'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Asosiy trigonometrik ayniyat: sin²(α) + cos²(α) = 1. cos²(α) = 1 - 9/25 = 16/25 => cos(α) = 4/5 (birinchi chorakda musbat).'
    },
    {
      id: 'm-8',
      question: 'Integralni hisoblang: ∫ (4x³ + 2x) dx.',
      options: ['x⁴ + x² + C', '12x² + 2 + C', '4x⁴ + 2x² + C', 'x⁴ + 2x² + C'],
      correctIndex: 0,
      difficulty: 'Qiyin',
      explanation: 'Boshlangʻich funksiya qoidasi: ∫ 4x³ dx = 4*(x⁴/4) = x⁴, ∫ 2x dx = 2*(x²/2) = x². Natija: x⁴ + x² + C.'
    },
    {
      id: 'm-9',
      question: 'Doiraning radiusi 2 barobar orttirilsa, uning yuzi necha barobar ortadi?',
      options: ['2 barobar', '4 barobar', '8 barobar', '16 barobar'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Doira yuzi S = πR² formulasi bilan hisoblanadi. Radius 2 marta oshganda yuza 2² = 4 barobarga ortadi.'
    },
    {
      id: 'm-10',
      question: 'Cheksiz kamayuvchi geometrik progressiyada b₁ = 12, q = 1/3. Uning yigʻindisini (S) toping.',
      options: ['16', '18', '24', '36'],
      correctIndex: 1, // 18
      difficulty: 'Qiyin',
      explanation: 'Cheksiz kamayuvchi progressiya yigʻindisi: S = b₁ / (1 - q). S = 12 / (1 - 1/3) = 12 / (2/3) = 12 * 3 / 2 = 18.'
    }
  ],

  informatika: [
    {
      id: 'it-1',
      question: 'Python dasturlash tilida roʻyxat (list) oxiriga yangi element qoʻshish uchun qaysi metod ishlatiladi?',
      options: ['add()', 'append()', 'push()', 'insertEnd()'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Pythonda roʻyxat oxiriga element qoʻshish uchun append() metodi xizmat qiladi.'
    },
    {
      id: 'it-2',
      question: 'Ikkilik sanoq sistemasidagi 1011₂ soni oʻnlik sanoq sistemasida nechiga teng?',
      options: ['9', '11', '13', '15'],
      correctIndex: 1, // 11
      difficulty: "O'rtacha",
      explanation: '1011₂ = 1*2³ + 0*2² + 1*2¹ + 1*2⁰ = 8 + 0 + 2 + 1 = 11.'
    },
    {
      id: 'it-3',
      question: 'Binar qidiruv (Binary Search) algoritmining oʻrtacha va eng yomon holatdagi vaqt murakkabligi (Big-O) qanday?',
      options: ['O(N)', 'O(log N)', 'O(N²)', 'O(1)'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'Binar qidiruv har bir qadamda qidiruv sohasini ikkiga boʻladi, shuning uchun uning vaqt murakkabligi O(log N) dir.'
    },
    {
      id: 'it-4',
      question: 'Web dasturlashda sahifaning tuzilishi (skeleti) qaysi til orqali yaratiladi?',
      options: ['CSS', 'JavaScript', 'HTML', 'Python'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: 'HTML (HyperText Markup Language) veb-sahifaning tuzilishini yaratish uchun ishlatiladi.'
    },
    {
      id: 'it-5',
      question: 'Pythonda quyidagi kod natijasi nima boʻladi: print(type([1, 2, 3]))?',
      options: ["<class 'tuple'>", "<class 'list'>", "<class 'set'>", "<class 'dict'>"],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Kvadrat qavs [] orqali roʻyxat (list) turi belgilanadi.'
    },
    {
      id: 'it-6',
      question: 'SQL tilida maʼlumotlar jadvalidan barcha yozuvlarni tanlab olish uchun qaysi kalit soʻz ishlatiladi?',
      options: ['GET', 'FIND', 'SELECT', 'FETCH'],
      correctIndex: 2,
      difficulty: "O'rtacha",
      explanation: 'Relyatsion maʼlumotlar bazasida yozuvlarni olish uchun "SELECT * FROM jadval" buyrugʻi qoʻllaniladi.'
    },
    {
      id: 'it-7',
      question: 'Kompakt flesh xotirada 4 Gigabayt (GB) necha Megabaytga (MB) teng?',
      options: ['400 MB', '4000 MB', '4096 MB', '40960 MB'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: '1 GB = 1024 MB. 4 GB = 4 * 1024 = 4096 MB.'
    },
    {
      id: 'it-8',
      question: 'OOP (Obyektga yoʻnaltirilgan dasturlash) ning asosiy ustunlariga qaysi biri KIRMEYDI?',
      options: ['Inkapsulyatsiya', 'Polimorfizm', 'Kompilyatsiya', 'Merosxoʻrlik (Inheritance)'],
      correctIndex: 2,
      difficulty: "O'rtacha",
      explanation: 'OOP asosiy ustunlari: Inkapsulyatsiya, Merosxoʻrlik, Polimorfizm va Abstraksiya. Kompilyatsiya esa dasturni mashina tiliga oʻgirish jarayonidir.'
    },
    {
      id: 'it-9',
      question: 'Quyidagi kod natijasi nima boʻladi: x = [1, 2]; y = x; y.append(3); print(len(x))?',
      options: ['2', '3', 'Xatolik', 'None'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'Pythonda roʻyxatlar havolaviy (reference) tur hisoblanadi. y = x qilinganda ular bitta xotira manziliga koʻrsatadi, y ga qoʻshilgan element x da ham aks etadi.'
    },
    {
      id: 'it-10',
      question: 'Kompyuter tarmoqlarida xavfsiz maʼlumot uzatish protokoli qaysi?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'HTTPS (HyperText Transfer Protocol Secure) SSL/TLS shifrlash orqali xavfsiz ulanishni kafolatlaydi.'
    }
  ],

  'ingliz-tili': [
    {
      id: 'eng-1',
      question: 'Choose the correct form: If it rains tomorrow, we _____ at home.',
      options: ['will stay', 'stayed', 'would stay', 'staying'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'First Conditional qoidasi: If + Present Simple, will + V1 (kelajakdagi real ehtimol).'
    },
    {
      id: 'eng-2',
      question: 'She has been living in Tashkent _____ 2018.',
      options: ['for', 'since', 'in', 'during'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Aniq boshlangʻich yil yoki vaqt nuqtasi koʻrsatilganda Present Perfect Continuousda "since" ishlatiladi.'
    },
    {
      id: 'eng-3',
      question: 'Choose the synonym of the word "ENORMOUS":',
      options: ['Tiny', 'Huge', 'Fragile', 'Ancient'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: '"Enormous" ulkan, bahaybat degani boʻlib, uning sinonimi "Huge" hisoblanadi.'
    },
    {
      id: 'eng-4',
      question: 'If I _____ you, I would study harder for the exam.',
      options: ['am', 'was', 'were', 'had been'],
      correctIndex: 2,
      difficulty: "O'rtacha",
      explanation: 'Second Conditional (noreal maslahat yoki xayoliy vaziyatda): "If I were you, I would...".'
    },
    {
      id: 'eng-5',
      question: 'The car was repaired _____ my brother yesterday.',
      options: ['with', 'by', 'from', 'of'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Passive Voice (majhul nisbatda) ish-harakatni bajargan shaxs "by" predlogi orqali ifodalanadi.'
    },
    {
      id: 'eng-6',
      question: 'What does the idiom "A piece of cake" mean?',
      options: ['Very delicious food', 'Something very easy to do', 'A difficult challenge', 'An expensive gift'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: '"A piece of cake" ingliz tilida biror narsa oʻta oson va yengil ekanligini bildiradi.'
    },
    {
      id: 'eng-7',
      question: 'By the time the teacher arrived, the students _____ the test.',
      options: ['finished', 'have finished', 'had finished', 'will finish'],
      correctIndex: 2,
      difficulty: 'Qiyin',
      explanation: 'Oʻtmishda bitta harakat ikkinchisidan oldin tugallangan boʻlsa, Past Perfect (had + V3) ishlatiladi.'
    },
    {
      id: 'eng-8',
      question: 'Neither Nodir nor his friends _____ ready for the competition.',
      options: ['is', 'are', 'was', 'has been'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'Neither... nor birikmasida feʼl oxirgi oʻrinda turgan ega ("his friends" - koʻplik) bilan moslashadi: "are".'
    },
    {
      id: 'eng-9',
      question: 'He insisted _____ paying for the dinner.',
      options: ['at', 'on', 'to', 'for'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: '"Insist" feʼli doimo "on" predlogi bilan birga keladi: insist on doing something.'
    },
    {
      id: 'eng-10',
      question: 'Choose the correct spelling:',
      options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Ingliz tilida toʻgʻri yozilishi: "Accommodation" (ikkita c va ikkita m).'
    }
  ],

  fizika: [
    {
      id: 'ph-1',
      question: 'Nyutonning ikkinchi qonuni formulasini koʻrsating.',
      options: ['F = m * a', 'E = m * c²', 'P = F / S', 'A = F * s'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Nyutonning II qonuniga koʻra jismga taʼsir qiluvchi kuch uning massasi va tezlanishi koʻpaytmasiga teng: F = ma.'
    },
    {
      id: 'ph-2',
      question: 'Vakuumda yorugʻlik tezligi (c) taxminan qanchaga teng?',
      options: ['300 000 km/s', '150 000 km/s', '30 000 km/s', '3 000 000 km/s'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Yorugʻlikning vakuumdagi tezligi c ≈ 300 000 km/s (yoki 3*10⁸ m/s) dir.'
    },
    {
      id: 'ph-3',
      question: 'Om qonuniga koʻra oʻtkazgichdagi tok kuchi (I) nimaga teng?',
      options: ['I = U / R', 'I = U * R', 'I = R / U', 'I = U² * R'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Zanjir qismi uchun Om qonuni: Tok kuchi kuchlanishga toʻgʻri, qarshilikka teskari mutanosib: I = U / R.'
    },
    {
      id: 'ph-4',
      question: 'Kinetik energiya formulasi qaysi?',
      options: ['E_k = (m * v²) / 2', 'E_k = m * g * h', 'E_k = k * x² / 2', 'E_k = F * v'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Harakatdagi jismning kinetik energiyasi uning massasi va tezligi kvadratining yarmiga teng: E_k = mv²/2.'
    },
    {
      id: 'ph-5',
      question: 'Yer yuzasida erkin tushish tezlanishi (g) ning qiymati taxminan qancha?',
      options: ['5.8 m/s²', '9.8 m/s²', '12.4 m/s²', '15.0 m/s²'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Erkin tushish tezlanishi g ≈ 9.8 m/s² (yoki masalalarda yaxlit 10 m/s²) ga teng.'
    },
    {
      id: 'ph-6',
      question: 'Bosimning Xalqaro birliklar sistemasidagi (SI) oʻlchov birligi nima?',
      options: ['Joul (J)', 'Paskal (Pa)', 'Nyuton (N)', 'Vatt (W)'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Bosim birligi Fransuz olimi Blez Paskal sharafiga Paskal (Pa = N/m²) deb ataladi.'
    },
    {
      id: 'ph-7',
      question: 'Qavariq linzadan fokal masofada (F) joylashgan jismning tasviri qayerda hosil boʻladi?',
      options: ['Linza markazida', 'Cheksizlikda', '2F nuqtada', 'Hosil boʻlmaydi'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'Fokus masofasidagi nuqtadan chiqqan nurlar linzadan soʻng oʻzaro parallel ketadi, yaʼni tasvir cheksizlikda deb olinadi.'
    },
    {
      id: 'ph-8',
      question: 'Termodinamikaning birinchi qonuni qaysi fundamental qonunning ifodasi hisoblanadi?',
      options: ['Impulsning saqlanish qonuni', 'Energiyaning saqlanish qonuni', 'Gravitatsiya qonuni', 'Kulon qonuni'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Termodinamikaning 1-qonuni (Q = ΔU + A) energiyaning saqlanish va bir turdan ikkinchi turga aylanish qonunidir.'
    },
    {
      id: 'ph-9',
      question: 'Qarshiligi 10 Om va 15 Om boʻlgan ikki oʻtkazgich ketma-ket ulanganda umumiy qarshilik necha Om boʻladi?',
      options: ['6 Om', '12.5 Om', '25 Om', '150 Om'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: 'Ketma-ket ulanishda qarshiliklar toʻgʻridan-toʻgʻri qoʻshiladi: R_um = R₁ + R₂ = 10 + 15 = 25 Om.'
    },
    {
      id: 'ph-10',
      question: 'Foton energiyasi E = h * ν formulasida h qanday kattalik?',
      options: ['Gravitatsiya doimiysi', 'Plank doimiysi', 'Bolsman doimiysi', 'Avogadro soni'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'h — Maks Plank sharafiga nomlangan Plank doimiysi boʻlib, h ≈ 6.626 * 10⁻³⁴ J*s ga teng.'
    }
  ],

  kimyo: [
    {
      id: 'ch-1',
      question: 'Suvning kimyoviy formulasi qaysi?',
      options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Suv molekulasi ikkita vodorod va bitta kislorod atomidan tashkil topgan: H₂O.'
    },
    {
      id: 'ch-2',
      question: 'Mendeleyev davriy jadvalidagi 1-raqamli kimyoviy element qaysi?',
      options: ['Geliy (He)', 'Vodorod (H)', 'Litiy (Li)', 'Kislorod (O)'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Eng yengil va davriy jadvaldagi 1-element Vodorod (H) hisoblanadi.'
    },
    {
      id: 'ch-3',
      question: 'Oddiy osh tuzining kimyoviy nomi va formulasi qanday?',
      options: ['Kalsiy karbonat (CaCO₃)', 'Natriy xlorid (NaCl)', 'Kaliy gidroksid (KOH)', 'Magniy sulfat (MgSO₄)'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Osh tuzi natriy va xlor ionlaridan iborat Natriy xlorid (NaCl) birikmasidir.'
    },
    {
      id: 'ch-4',
      question: 'Neytral muhitda lakmus qogʻozi qanday rangga kiradi?',
      options: ['Qizil', 'Binafsha', 'Koʻk', 'Sariq'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Lakmus neytral muhitda (pH=7) binafsha, kislotada qizil, ishqorda koʻk rang oladi.'
    },
    {
      id: 'ch-5',
      question: 'Avogadro soni (N_A) nechiga teng?',
      options: ['6.02 * 10²³ mol⁻¹', '3.14 * 10²³ mol⁻¹', '9.8 * 10²⁴ mol⁻¹', '1.6 * 10⁻¹⁹ mol⁻¹'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: '1 mol moddadagi zarralar soni N_A = 6.022 * 10²³ ga teng.'
    },
    {
      id: 'ch-6',
      question: 'Kislorodning havodagi hajmiy ulushi taxminan necha foizni tashkil qiladi?',
      options: ['10%', '21%', '50%', '78%'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Atmosfera havosining 78% ini azot, taxminan 21% ini kislorod tashkil etadi.'
    },
    {
      id: 'ch-7',
      question: 'Qaysi metall xona haroratida suyuq holatda boʻladi?',
      options: ['Simob (Hg)', 'Qoʻrgʻoshin (Pb)', 'Alyuminiy (Al)', 'Temir (Fe)'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Simob (Hg) normal sharoitda va xona haroratida suyuq boʻlgan yagona metalldir.'
    },
    {
      id: 'ch-8',
      question: 'Metanning kimyoviy formulasi qaysi?',
      options: ['CH₄', 'C₂H₆', 'C₃H₈', 'C₄H₁₀'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Toʻyingan uglevodorodlar (alkanlar) ning eng oddiy vakili Metan — CH₄ dir.'
    },
    {
      id: 'ch-9',
      question: 'Quyidagi moddalardan qaysi biri kuchli kislota hisoblanadi?',
      options: ['Sulfat kislota (H₂SO₄)', 'Sirka kislota (CH₃COOH)', 'Uglerod kislota (H₂CO₃)', 'Suv (H₂O)'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'H₂SO₄ (sulfat kislota) eritmada toʻliq dissotsiatsiyalanuvchi anorganik kuchli kislotadir.'
    },
    {
      id: 'ch-10',
      question: 'Oksidlanish-qaytarilish reaksiyalarida elektron bergan atom nima deb ataladi?',
      options: ['Oksidlovchi', 'Qaytaruvchi', 'Katalizator', 'Indikator'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: 'Elektron beruvchi atom qaytaruvchi boʻladi (oʻzi esa oksidlanadi).'
    }
  ],

  biologiya: [
    {
      id: 'bio-1',
      question: 'Oʻsimliklarda quyosh nuri taʼsirida organik modda va kislorod hosil boʻlish jarayoni nima deb ataladi?',
      options: ['Nafas olish', 'Fotosintez', 'Transpiratsiya', 'Glikoliz'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Fotosintez — xloroplastlarda yorugʻlik yordamida CO₂ va suvdan glyukoza va O₂ sintezlanishidir.'
    },
    {
      id: 'bio-2',
      question: 'Odam organizmida qonni butun tanaga haydab beruvchi asosiy aʼzo qaysi?',
      options: ['Jigar', 'Oʻpka', 'Yurak', 'Oshqozon'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: 'Yurak — toʻrt kamerali muskul aʼzosi boʻlib, qon aylanish tizimining markaziy nasosidir.'
    },
    {
      id: 'bio-3',
      question: 'Irsiyat va oʻzgaruvchanlik qonuniyatlarini oʻrganuvchi fan qaysi?',
      options: ['Ekologiya', 'Genetika', 'Anatomiya', 'Mikrobiologiya'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Irsiy belgilarning nasldan-naslga oʻtish qonuniyatlarini Genetika fani oʻrganadi (asoschisi Gregor Mendel).'
    },
    {
      id: 'bio-4',
      question: 'Hujayraning "energiya stansiyasi" deb qaysi organoid ataladi?',
      options: ['Mitoxondriya', 'Ribosoma', 'Lizosoma', 'Vakuola'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Mitoxondriyada ATF (adenozintrifosfat) sintezlanadi, shuning uchun u hujayraning energiya stansiyasi deyiladi.'
    },
    {
      id: 'bio-5',
      question: 'Odamning tana hujayrasida nechtadan xromosoma mavjud?',
      options: ['23 ta', '46 ta (23 juft)', '48 ta', '92 ta'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Normal inson somatik (tana) hujayrasida 46 ta (23 juft) xromosoma boʻladi.'
    },
    {
      id: 'bio-6',
      question: 'DNK molekulasida Adenin (A) ga qaysi komplementar asos toʻgʻri keladi?',
      options: ['Guanin (G)', 'Sitozin (C)', 'Timin (T)', 'Urasil (U)'],
      correctIndex: 2,
      difficulty: "O'rtacha",
      explanation: 'Komplementarlik qoidasiga koʻra DNKda A-T (ikkita vodorod bogʻ) va G-C (uchta bogʻ) birikadi.'
    },
    {
      id: 'bio-7',
      question: 'Qonning qizil qon tanachalari (eritrositlar) ning asosiy vazifasi nima?',
      options: ['Mikroblarni oʻldirish', 'Kislorodni toʻqimalarga tashish', 'Qonni ivitish', 'Gormon ishlab chiqarish'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Eritrotsitlar tarkibidagi gemoglobin oqsil oʻpkadan kislorodni qabul qilib toʻqimalarga yetkazadi.'
    },
    {
      id: 'bio-8',
      question: 'Hujayra nazariyasining asoschilari kimlar?',
      options: ['Mendel va Morqan', 'Shleyden va Shvann', 'Darvin va Uollas', 'Paster va Kox'],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: '1838-1839 yillarda M. Shleyden va T. Shvann barcha tirik mavjudotlar hujayralardan tuzilganligini isbotlagan.'
    },
    {
      id: 'bio-9',
      question: 'Oʻsimlik hujayrasida boʻlib, hayvon hujayrasida boʻlmaydigan qism qaysi?',
      options: ['Yadro', 'Hujayra qobigʻi (tsellyuloza devor)', 'Sitoplazma', 'Mitoxondriya'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Tsellyulozadan iborat qattiq hujayra devori faqat oʻsimlik hujayralariga xosdir.'
    },
    {
      id: 'bio-10',
      question: 'Odam organizmida qondagi qand (glyukoza) miqdorini tushiruvchi gormon qaysi?',
      options: ['Adrenalin', 'Insulin', 'Tiroksin', 'Glukagon'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Oshqozonosti bezi ishlab chiqaruvchi Insulin gormoni qondagi glyukoza darajasini pasaytiradi.'
    }
  ],

  'ona-tili': [
    {
      id: 'uz-1',
      question: 'Oʻzbek tilida urgʻu odatda soʻzning qaysi boʻgʻiniga tushadi?',
      options: ['Birinchi boʻgʻinga', 'Ikkinchi boʻgʻinga', 'Oxirgi boʻgʻinga', 'Urgʻu tushmaydi'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: 'Oʻzbek adabiy tilida urgʻu qoidaga koʻra soʻzning oxirgi boʻgʻiniga tushadi (istisnolardan tashqari).'
    },
    {
      id: 'uz-2',
      question: '"Oʻtkan kunlar" ilk oʻzbek realistik romanining muallifi kim?',
      options: ['Choʻlpon', 'Abdulla Qodiriy', 'Fitrat', 'Oybek'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: '"Oʻtkan kunlar" va "Mehrobdan chayon" romanlari Abdulla Qodiriy qalamiga mansub.'
    },
    {
      id: 'uz-3',
      question: 'Quyidagi soʻzlardan qaysi biri toʻgʻri yozilgan?',
      options: ['Muttasil', 'Mutassil', 'Mutasil', 'Muttassil'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Imlo lugʻatiga koʻra "muttasil" (ikkita t va bitta s bilan) toʻgʻri yoziladi.'
    },
    {
      id: 'uz-4',
      question: 'Feʼlning harakat nomi shakli qaysi qoʻshimchalar yordamida yasaladi?',
      options: ['-gan, -kan', '-ish, -moq, -v', '-ib, -gach', '-roq, -dek'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Harakat nomi qoʻshimchalari: -(i)sh, -moq, -(o)v (masalan: oʻqish, yozmoq, saylov).'
    },
    {
      id: 'uz-5',
      question: 'Alisher Navoiyning besh dostondan iborat ulkan asari nima deb ataladi?',
      options: ['Devoni Foniy', 'Xamsa', 'Muhokamat ul-lugʻatayn', 'Lison ut-tayr'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Alisher Navoiy turkiy tilda birinchi boʻlib besh dostondan iborat "Xamsa" (Beshlik) yaratgan.'
    },
    {
      id: 'uz-6',
      question: 'Qaysi gapda tinish belgisi notoʻgʻri qoʻllangan?',
      options: [
        'Kitob — bilim manbayi.',
        'Bahor keldi va, gullar ochildi.',
        'Ustoz, sizga katta rahmat!',
        'U aytdi: "Ertaga dars boʻladi".'
      ],
      correctIndex: 1,
      difficulty: 'Qiyin',
      explanation: '"va" bogʻlovchisidan keyin vergul qoʻyilmaydi: "Bahor keldi va gullar ochildi".'
    },
    {
      id: 'uz-7',
      question: '"Zukko" soʻzining maʼnodoshini toping.',
      options: ['Dangasa', 'Ziyrak, aqlli', 'Gʻamgin', 'Kamsuqum'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: '"Zukko" aqli raso, zehni oʻtkir, ziyrak insonlarga nisbatan ishlatiladi.'
    },
    {
      id: 'uz-8',
      question: 'Otning nechta kelishik shakli bor?',
      options: ['4 ta', '5 ta', '6 ta', '7 ta'],
      correctIndex: 2,
      difficulty: 'Oson',
      explanation: 'Oʻzbek tilida 6 ta kelishik bor: Bosh, Qaratqich, Tushum, Joʻnalish, Oʻrin-payt, Chiqish kelishiklari.'
    },
    {
      id: 'uz-9',
      question: 'Erkin Vohidov qalamiga mansub mashhur sheʼriy doston qaysi?',
      options: ['Ruhlar isyoni', 'Surat bilan suhbat', 'Oʻzbegim', 'Tong nafasi'],
      correctIndex: 0,
      difficulty: "O'rtacha",
      explanation: 'Hind shoiri Nazrul Islom hayotiga bagʻishlangan "Ruhlar isyoni" dostoni Erkin Vohidovning shoh asaridir.'
    },
    {
      id: 'uz-10',
      question: 'Bosh va ergash gapdan tashkil topgan gap nima deb ataladi?',
      options: ['Bogʻlangan qoʻshma gap', 'Ergashgan qoʻshma gap', 'Bogʻlovchisiz qoʻshma gap', 'Oddiy yoyiq gap'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Biri ikkinchisiga tobe boʻlib kelgan qoʻshma gap "Ergashgan qoʻshma gap" deb ataladi.'
    }
  ],

  tarix: [
    {
      id: 'his-1',
      question: 'Sohibqiron Amir Temur qaysi yilda tavallud topgan?',
      options: ['1336-yil 9-aprel', '1370-yil 10-aprel', '1221-yil 15-mart', '1405-yil 18-fevral'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Amir Temur 1336-yil 9-aprelda Kesh (Shahrisabz) yaqinidagi Xoʻja Ilgʻor qishlogʻida tugʻilgan.'
    },
    {
      id: 'his-2',
      question: 'Mirzo Ulugʻbek Samarqandda qanday noyob ilmiy bino qurdirgan?',
      options: ['Katta kutubxona', 'Astronomik rasadxona (Observatoriya)', 'Qalʼa devori', 'Kema zavodi'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Mirzo Ulugʻbek 1424-1428 yillarda Samarqandda dunyoga mashhur rasadxona barpo etib, 1018 ta yulduz jadvalini tuzgan.'
    },
    {
      id: 'his-3',
      question: 'Ikkinchi jahon urushi qaysi yillarda boʻlib oʻtgan?',
      options: ['1914–1918', '1939–1945', '1941–1945', '1920–1930'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Ikkinchi jahon urushi 1939-yil 1-sentyabrda boshlanib, 1945-yil 2-sentyabrda yakunlangan.'
    },
    {
      id: 'his-4',
      question: 'Oʻzbekiston Respublikasining Davlat Mustaqilligi qachon eʼlon qilingan?',
      options: ['1990-yil 20-iyun', '1991-yil 31-avgust', '1991-yil 1-sentyabr', '1992-yil 8-dekabr'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: '1991-yil 31-avgustda Oʻzbekiston Respublikasining davlat mustaqilligi toʻgʻrisida qonun qabul qilindi, 1-sentyabr Mustaqillik kuni deb belgilandi.'
    },
    {
      id: 'his-5',
      question: 'Jaloliddin Manguberdi qaysi bosqinchilarga qarshi mardonavor kurashgan?',
      options: ['Arab xalifaligi', 'Moʻgʻul bosqinchilari (Chingizxon)', 'Aleksandr Makedonskiy', 'Rim legionlari'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: 'Jaloliddin Manguberdi XIII asr boshida Chingizxon boshchiligidagi moʻgʻul qoʻshinlariga qarshi jasorat koʻrsatgan.'
    },
    {
      id: 'his-6',
      question: 'Qadimgi dunyoning yetti moʻjizasidan biri — Misr ehromlarining eng kattasi qaysi?',
      options: ['Xafra ehromi', 'Xops (Xeops) ehromi', 'Mikerin ehromi', 'Sfinks'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'Misrdagi eng ulkan piramida firʼavn Xeops (Xufu) ehromi hisoblanadi.'
    },
    {
      id: 'his-7',
      question: 'Buyuk Ipak yoʻli qaysi mamlakatlarni qaysi qitʼa bilan bogʻlagan?',
      options: ['Sharqiy Osiyo (Xitoy) ni Oʻrta dengiz va Yevropa bilan', 'Afrika va Avstraliyani', 'Shimoliy va Janubiy Amerikani', 'Hindiston va Yaponiyani'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Buyuk Ipak yoʻli qadimda Xitoydan boshlanib Markaziy Osiyo orqali Yevropa va Oʻrta yer dengizi davlatlariga borgan.'
    },
    {
      id: 'his-8',
      question: 'Zahiriddin Muhammad Bobur Hindistonda qaysi sulolaga asos solgan?',
      options: ['Gʻaznaviylar', 'Boburiylar (Buyuk Moʻgʻullar)', 'Usmoniylar', 'Somoniylar'],
      correctIndex: 1,
      difficulty: 'Oson',
      explanation: '1526-yilda Bobur Panipat jangidagi gʻalabadan soʻng Hindistonda Boburiylar saltanatiga asos soldi.'
    },
    {
      id: 'his-9',
      question: 'Buyuk alloma Abu Ali ibn Sino qaysi mashhur tibbiy asarning muallifi?',
      options: ['Al-Qonun fit-tibb (Tib qonunlari)', 'Astronomiya asoslari', 'Hindiston', 'Ziji Koʻragoniy'],
      correctIndex: 0,
      difficulty: 'Oson',
      explanation: 'Ibn Sino (Avitsenna) ning "Tib qonunlari" (Al-Qonun fit-tibb) asari bir necha asrlar davomida Yevropa universitetlarida darslik boʻlgan.'
    },
    {
      id: 'his-10',
      question: 'BMT (Birlashgan Millatlar Tashkiloti) qaysi yilda tashkil topgan?',
      options: ['1919-yil', '1945-yil', '1955-yil', '1991-yil'],
      correctIndex: 1,
      difficulty: "O'rtacha",
      explanation: 'BMT Ikkinchi jahon urushidan soʻng dunyoda tinchlikni saqlash maqsadida 1945-yil 24-oktyabrda tuzilgan.'
    }
  ]
};

// Saqlanuvchi MOK urinishlari (attempts store)
let mockAttemptsStore = [
  {
    id: 'mock-att-101',
    userId: 'demo-user-1',
    userName: "O'quvchi Dilshod",
    subjectId: 'matematika',
    subjectName: 'Matematika',
    subjectIcon: '📐',
    score: 90, // 100 dan
    correctCount: 9,
    totalQuestions: 10,
    entryCost: 30,
    refundedCoins: 30,
    bonusCoins: 20,
    isRefunded: true,
    badgeEarned: {
      id: 'badge-mock-gold',
      name: 'MOK Oltin Bilimdon (90+)',
      icon: '🥇',
      description: 'MOK testda 90 ball to‘pladi va coinlarini 100% qaytarib oldi'
    },
    timeSpentSeconds: 640,
    submittedAt: new Date(Date.now() - 86400000 * 2),
    claimed: true
  },
  {
    id: 'mock-att-102',
    userId: 'demo-user-1',
    userName: "O'quvchi Dilshod",
    subjectId: 'informatika',
    subjectName: 'Informatika & Dasturlash',
    subjectIcon: '💻',
    score: 80,
    correctCount: 8,
    totalQuestions: 10,
    entryCost: 30,
    refundedCoins: 30,
    bonusCoins: 0,
    isRefunded: true,
    badgeEarned: {
      id: 'badge-mock-silver',
      name: 'MOK Chempion',
      icon: '🥈',
      description: 'MOK testda 80 ball bilan coinlarini to‘liq qaytardi'
    },
    timeSpentSeconds: 520,
    submittedAt: new Date(Date.now() - 86400000 * 1),
    claimed: true
  }
];

// Vaqtincha test jarayonidagi faol sessiyalar
let activeSessionsStore = {};

// Yordamchi: So'rovdan foydalanuvchini (MongoDB yoki mock) ishonchli aniqlash
export const resolveUser = async (req) => {
  let userId = req.user?.id || req.user?._id;

  // Agar req.user bo'lmasa, Bearer tokendan o'qish
  if (!userId) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'bilimdon_super_secure_secret_token_key_2026');
        userId = decoded?.id || decoded?._id;
      } catch (e) {}
    }
  }

  // Agar body yoki queryda userId bo'lsa
  if (!userId && req.body?.userId) userId = req.body.userId;
  if (!userId && req.query?.userId) userId = req.query.userId;

  let targetUser = null;
  if (userId) {
    try {
      targetUser = await User.findById(userId);
    } catch (e) {}

    if (!targetUser) {
      const mockUsers = getMockUsers();
      targetUser = mockUsers.find(u => u._id === userId || u.id === userId || u.email === userId);
    }
  }

  // Agar hali ham topilmasa, MongoDB dagi birinchi o'quvchi
  if (!targetUser) {
    try {
      targetUser = await User.findOne();
    } catch (e) {}
  }

  // Agar bazada umuman foydalanuvchi bo'lmasa, mock foydalanuvchi
  if (!targetUser) {
    const mockUsers = getMockUsers();
    targetUser = mockUsers[0];
  }

  return {
    user: targetUser,
    userId: targetUser?._id?.toString() || targetUser?.id || userId || 'demo-user-1'
  };
};

// 1. MOK Test ma'lumotlari, fanlar va joriy sozlamalar
export const getMockExamInfo = async (req, res) => {
  try {
    const { user: targetUser } = await resolveUser(req);
    const userCoins = targetUser?.coins !== undefined ? targetUser.coins : 0;

    res.json({
      success: true,
      settings: mockSettings,
      subjects: MOCK_SUBJECTS,
      userCoins
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'MOK test maʼlumotlarini yuklashda xatolik' });
  }
};

// 2. Testni boshlash (Coin darhol yechiladi va faqat tanlangan fan savollari beriladi)
export const startMockTest = async (req, res) => {
  try {
    const { subjectId } = req.body;

    if (!subjectId) {
      return res.status(400).json({ success: false, message: 'Iltimos, fanni tanlang' });
    }

    const subjectObj = MOCK_SUBJECTS.find(s => s.id === subjectId);
    if (!subjectObj) {
      return res.status(404).json({ success: false, message: 'Tanlangan fan topilmadi' });
    }

    // Foydalanuvchi hisobini aniqlash
    const { user: targetUser, userId } = await resolveUser(req);
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Foydalanuvchi hisobi topilmadi' });
    }

    const currentCoins = targetUser?.coins !== undefined ? targetUser.coins : 0;
    if (currentCoins < mockSettings.entryCostCoins) {
      return res.status(400).json({
        success: false,
        message: `MOK test boshlash uchun hisobingizda kamida ${mockSettings.entryCostCoins} coin boʻlishi kerak. Hozirgi balansingiz: ${currentCoins} coin.`
      });
    }

    // Tangani DARHOL yechish (Coin ayrilishi)
    targetUser.coins = Math.max(0, currentCoins - mockSettings.entryCostCoins);
    if (typeof targetUser.save === 'function') {
      await targetUser.save();
    }

    // Savollarni tanlab olish
    const allQuestions = QUESTION_BANK[subjectId] || QUESTION_BANK.matematika;
    const selectedQuestions = allQuestions.slice(0, mockSettings.questionCount);

    const sessionId = `mock-sess-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    // Faol sessiyani saqlash (to'g'ri javoblari bilan)
    activeSessionsStore[sessionId] = {
      sessionId,
      userId,
      userMongoId: targetUser._id?.toString(),
      userName: targetUser.name || "O'quvchi",
      subjectId,
      subjectName: subjectObj.name,
      subjectIcon: subjectObj.icon,
      entryCost: mockSettings.entryCostCoins,
      questions: selectedQuestions,
      startedAt: Date.now(),
      timeLimitMinutes: mockSettings.timeLimitMinutes,
      submitted: false
    };

    // O'quvchiga savollar yuboriladi (to'g'ri javobsiz, ko'chirib olmasligi uchun)
    const clientQuestions = selectedQuestions.map((q, idx) => ({
      index: idx,
      id: q.id,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty
    }));

    res.json({
      success: true,
      message: `${subjectObj.name} boʻyicha MOK test boshlandi! ${mockSettings.entryCostCoins} coin balansingizdan yechildi.`,
      sessionId,
      subject: subjectObj,
      entryCost: mockSettings.entryCostCoins,
      remainingCoins: targetUser.coins,
      timeLimitMinutes: mockSettings.timeLimitMinutes,
      questions: clientQuestions,
      cashbackThreshold: mockSettings.cashbackThreshold
    });
  } catch (error) {
    console.error('MOK start error:', error);
    res.status(500).json({ success: false, message: 'Testni boshlashda xatolik yuz berdi' });
  }
};

// 3. Testni topshirish va 100 ballik tizimda natijani hisoblash
export const submitMockTest = async (req, res) => {
  try {
    const { sessionId, answers, timeSpentSeconds } = req.body;

    const session = activeSessionsStore[sessionId];
    if (!session) {
      return res.status(404).json({ success: false, message: 'Test sessiyasi topilmadi yoki muddati tugagan' });
    }

    if (session.submitted) {
      return res.status(400).json({ success: false, message: 'Bu test allaqachon topshirilgan!' });
    }

    session.submitted = true;

    // Natijani hisoblash
    let correctCount = 0;
    const totalQuestions = session.questions.length;
    const reviewDetails = [];

    session.questions.forEach((q, idx) => {
      const userSelected = answers ? answers[idx] : undefined;
      const isCorrect = userSelected === q.correctIndex;
      if (isCorrect) correctCount++;

      reviewDetails.push({
        index: idx,
        question: q.question,
        options: q.options,
        userSelected,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation,
        difficulty: q.difficulty
      });
    });

    // 100 ballik hisoblash
    const score = Math.round((correctCount / totalQuestions) * 100);

    let refundedCoins = 0;
    let bonusCoins = 0;
    let isRefunded = false;
    let badgeAwarded = null;

    // 80+ ball: Sarflagan coinlari avtomatik qaytariladi!
    if (score >= mockSettings.cashbackThreshold) {
      refundedCoins = session.entryCost;
      isRefunded = true;
    }

    // 100 ball olganlarga alohida super bonus
    if (score === 100) {
      bonusCoins = mockSettings.perfectScoreBonusCoins;
      badgeAwarded = {
        id: 'badge-mock-perfect',
        name: 'MOK Mukammal Daho (100 ball)',
        icon: '👑',
        description: 'MOK imtihonda 100 ballik mutlaq mukammal natija ko‘rsatdi'
      };
    } else if (score >= 90) {
      // 90+ ball olganlarga oltin bonus
      bonusCoins = mockSettings.highScoreBonusCoins;
      badgeAwarded = {
        id: 'badge-mock-gold',
        name: 'MOK Oltin Bilimdon (90+)',
        icon: '🥇',
        description: 'MOK imtihonda 90+ ball to‘plab sarflagan coinlarini qaytardi va bonus yutdi'
      };
    } else if (isRefunded) {
      badgeAwarded = {
        id: 'badge-mock-silver',
        name: 'MOK Chempion',
        icon: '🥈',
        description: 'MOK testda 80+ ball bilan sarflagan coinlarini to‘liq qaytarib oldi'
      };
    }

    const totalCoinsToCredit = refundedCoins + bonusCoins;

    // Foydalanuvchi balansini aniqlash va yangilash
    let updatedUserCoins = 0;
    let targetUser = null;
    const effectiveUserId = session.userMongoId || session.userId;
    if (effectiveUserId) {
      try {
        targetUser = await User.findById(effectiveUserId);
      } catch (e) {}
      if (!targetUser) {
        const mockUsers = getMockUsers();
        targetUser = mockUsers.find(u => u._id === effectiveUserId || u.id === effectiveUserId);
      }
    }
    if (!targetUser) {
      const resolved = await resolveUser(req);
      targetUser = resolved.user;
    }

    if (targetUser) {
      targetUser.coins = (targetUser.coins || 0) + totalCoinsToCredit;
      targetUser.xp = (targetUser.xp || 0) + score; // To'plangan ball miqdorida XP

      if (badgeAwarded && !targetUser.badges?.some(b => b.id === badgeAwarded.id)) {
        targetUser.badges = targetUser.badges || [];
        targetUser.badges.push({ ...badgeAwarded, earnedAt: new Date() });
      }

      if (typeof targetUser.save === 'function') {
        await targetUser.save();
      }
      updatedUserCoins = targetUser.coins;
    }

    // Urinishlar tarixiga saqlash
    const attemptRecord = {
      id: `mock-att-${Date.now()}`,
      userId: targetUser?._id?.toString() || session.userId,
      userName: targetUser?.name || session.userName || "O'quvchi",
      subjectId: session.subjectId,
      subjectName: session.subjectName,
      subjectIcon: session.subjectIcon,
      score,
      correctCount,
      totalQuestions,
      entryCost: session.entryCost,
      refundedCoins,
      bonusCoins,
      isRefunded,
      badgeEarned: badgeAwarded,
      timeSpentSeconds: timeSpentSeconds || 600,
      submittedAt: new Date(),
      claimed: true,
      reviewDetails
    };

    mockAttemptsStore.unshift(attemptRecord);
    delete activeSessionsStore[sessionId]; // Sessiyani tozalash

    res.json({
      success: true,
      score,
      correctCount,
      totalQuestions,
      entryCost: session.entryCost,
      refundedCoins,
      bonusCoins,
      totalCoinsToCredit,
      isRefunded,
      badgeAwarded,
      updatedUserCoins,
      timeSpentSeconds,
      review: reviewDetails
    });
  } catch (error) {
    console.error('MOK submit error:', error);
    res.status(500).json({ success: false, message: 'Natijani hisoblashda xatolik yuz berdi' });
  }
};

// 4. O'quvchining MOK testlar tarixi va rivojlanish statistikasi
export const getMyMockHistory = async (req, res) => {
  try {
    const { userId } = await resolveUser(req);

    const userAttempts = mockAttemptsStore.filter(a => 
      a.userId === userId || a.userId === 'demo-user-1' || !a.userId
    );

    const totalAttempts = userAttempts.length;
    const averageScore = totalAttempts > 0 
      ? Math.round(userAttempts.reduce((acc, curr) => acc + curr.score, 0) / totalAttempts) 
      : 0;
    
    const refundedCount = userAttempts.filter(a => a.isRefunded).length;
    const successRate = totalAttempts > 0 ? Math.round((refundedCount / totalAttempts) * 100) : 0;
    
    const totalCoinsRefunded = userAttempts.reduce((acc, curr) => acc + (curr.refundedCoins || 0), 0);
    const totalBonusCoinsEarned = userAttempts.reduce((acc, curr) => acc + (curr.bonusCoins || 0), 0);
    const bestScore = totalAttempts > 0 ? Math.max(...userAttempts.map(a => a.score)) : 0;

    res.json({
      success: true,
      stats: {
        totalAttempts,
        averageScore,
        successRate,
        totalCoinsRefunded,
        totalBonusCoinsEarned,
        bestScore
      },
      history: userAttempts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Tarixni yuklashda xatolik yuz berdi' });
  }
};

// 5. Admin: Sozlamalar va statistikani olish
export const getAdminMockSettings = async (req, res) => {
  try {
    const totalAttempts = mockAttemptsStore.length;
    const totalCoinsSpent = mockAttemptsStore.reduce((acc, curr) => acc + (curr.entryCost || 0), 0);
    const totalCoinsRefunded = mockAttemptsStore.reduce((acc, curr) => acc + (curr.refundedCoins || 0), 0);
    const totalBonusCoins = mockAttemptsStore.reduce((acc, curr) => acc + (curr.bonusCoins || 0), 0);
    const passCount = mockAttemptsStore.filter(a => a.isRefunded).length;
    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

    res.json({
      success: true,
      settings: mockSettings,
      stats: {
        totalAttempts,
        totalCoinsSpent,
        totalCoinsRefunded,
        totalBonusCoins,
        passRate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Admin MOK maʼlumotlarini yuklashda xatolik' });
  }
};

// 6. Admin: Sozlamalarni yangilash (Coin narxi, chegara, vaqt, bonuslar)
export const updateAdminMockSettings = async (req, res) => {
  try {
    const {
      entryCostCoins,
      cashbackThreshold,
      timeLimitMinutes,
      highScoreBonusCoins,
      perfectScoreBonusCoins
    } = req.body;

    if (entryCostCoins !== undefined) mockSettings.entryCostCoins = Number(entryCostCoins);
    if (cashbackThreshold !== undefined) mockSettings.cashbackThreshold = Number(cashbackThreshold);
    if (timeLimitMinutes !== undefined) mockSettings.timeLimitMinutes = Number(timeLimitMinutes);
    if (highScoreBonusCoins !== undefined) mockSettings.highScoreBonusCoins = Number(highScoreBonusCoins);
    if (perfectScoreBonusCoins !== undefined) mockSettings.perfectScoreBonusCoins = Number(perfectScoreBonusCoins);

    // Audit log
    try {
      await AuditLog.create({
        id: 'log-' + Date.now(),
        adminName: 'Bosh Admin',
        action: 'MOK_SETTINGS_UPDATED',
        target: 'MOK Test Tizimi',
        details: `MOK narxi: ${mockSettings.entryCostCoins} coin, Qaytarish chegarasi: ${mockSettings.cashbackThreshold} ball`,
        ip: req.ip || '127.0.0.1',
        createdAt: new Date()
      });
    } catch (e) {}

    res.json({
      success: true,
      message: 'MOK Test sozlamalari muvaffaqiyatli saqlandi!',
      settings: mockSettings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Sozlamalarni yangilashda xatolik' });
  }
};
