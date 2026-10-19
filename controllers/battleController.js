import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { initialLeaderboard, initialCareers } from '../seed/seedData.js';
import { getMockUsers } from './authController.js';
import { resolveUser } from './mockController.js';

// Foydalanuvchilarning Battle ko'rsatkichlari (Battle stats store)
let userBattleStatsStore = {
  'demo-user-1': {
    battleRating: 1250,
    league: 'Kumush Liga 🥈',
    totalBattles: 14,
    wins: 10,
    losses: 3,
    draws: 1,
    winStreak: 3,
    highestStreak: 5,
    coinsEarned: 520,
    badges: [
      { id: 'b-battle-first', name: 'Jangovar Daho', icon: '⚔️', description: 'Birinchi bilim jangida g‘alaba qozondi' },
      { id: 'b-battle-streak', name: 'Yengilmas Bahodir', icon: '🔥', description: 'Ketma-ket 3 ta jangda g‘olib bo‘ldi' }
    ]
  }
};

// Battle Tarixi (Match History store)
let battleHistoryStore = [
  {
    id: 'btl-101',
    userId: 'demo-user-1',
    userName: "O'quvchi Dilshod",
    userAvatar: '🧑‍🎓',
    opponentName: 'Jasur Mirzayev',
    opponentAvatar: '🚀',
    opponentGrade: '8-sinf',
    careerTitle: "Dasturchi (Software Engineer)",
    careerIcon: '💻',
    myScore: 480,
    opponentScore: 350,
    myCorrectCount: 4,
    opponentCorrectCount: 3,
    totalQuestions: 5,
    result: 'victory', // victory, defeat, draw
    ratingDelta: +28,
    coinsEarned: 50,
    xpEarned: 80,
    date: new Date(Date.now() - 3600000 * 5)
  },
  {
    id: 'btl-102',
    userId: 'demo-user-1',
    userName: "O'quvchi Dilshod",
    userAvatar: '🧑‍🎓',
    opponentName: 'Madina Aliyeva',
    opponentAvatar: '👩‍🎓',
    opponentGrade: '10-sinf',
    careerTitle: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    careerIcon: '🤖',
    myScore: 390,
    opponentScore: 420,
    myCorrectCount: 3,
    opponentCorrectCount: 4,
    totalQuestions: 5,
    result: 'defeat',
    ratingDelta: -12,
    coinsEarned: 10,
    xpEarned: 30,
    date: new Date(Date.now() - 86400000 * 1)
  },
  {
    id: 'btl-103',
    userId: 'demo-user-1',
    userName: "O'quvchi Dilshod",
    userAvatar: '🧑‍🎓',
    opponentName: 'Nilufar Qosimova',
    opponentAvatar: '🌸',
    opponentGrade: '7-sinf',
    careerTitle: "Dasturchi (Software Engineer)",
    careerIcon: '💻',
    myScore: 500,
    opponentScore: 320,
    myCorrectCount: 5,
    opponentCorrectCount: 3,
    totalQuestions: 5,
    result: 'victory',
    ratingDelta: +32,
    coinsEarned: 50,
    xpEarned: 90,
    date: new Date(Date.now() - 86400000 * 2)
  }
];

// Sohalarga oid boy savollar bazasi (Battle savollari 15 soniya ichida yechishga moslangan)
const BATTLE_QUESTIONS_BY_CAREER = {
  'ai-engineer': [
    {
      id: 'bq-ai-1',
      subject: 'Informatika',
      question: 'Sunʼiy intellektda neyron tarmogʻining oʻrganish tezligini belgilovchi parametr nima deb ataladi?',
      options: ['Learning Rate (O‘rganish surʼati)', 'Epoch soni', 'Batch Size', 'Activation Layer'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Learning Rate (O‘rganish tezligi) neyronlar og‘irliklarini har bir qadamda qanchalik o‘zgartirishni boshqaruvchi asosiy giperparametridir.'
    },
    {
      id: 'bq-ai-2',
      subject: 'Matematika',
      question: 'Mashinaviy oʻrganishda 2D koordinata tekisligida A(0, 0) va B(3, 4) nuqtalar orasidagi Yevklid masofasi qancha?',
      options: ['5', '7', '12', '25'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Yevklid masofasi: d = √((x₂ - x₁)² + (y₂ - y₁)²) = √(3² + 4²) = √(9 + 16) = √25 = 5.'
    },
    {
      id: 'bq-ai-3',
      subject: 'Informatika',
      question: 'Pythonda chuqur oʻrganish (Deep Learning) uchun eng ommabop kutubxonalardan biri qaysi?',
      options: ['PyTorch', 'Django', 'Flask', 'Bootstrap'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'PyTorch va TensorFlow zamonaviy sunʼiy intellekt va neyrotarmoqlarni yaratishda jahon standarti hisoblanadi.'
    },
    {
      id: 'bq-ai-4',
      subject: 'Ingliz tili',
      question: 'What does "NLP" stand for in Artificial Intelligence field?',
      options: ['Natural Language Processing', 'New Linear Program', 'Network Logic Protocol', 'Node Link Packet'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'NLP — Natural Language Processing (Tabiiy tilni qayta ishlash), matnlar va ovozlarni tushunuvchi AI sohasi.'
    },
    {
      id: 'bq-ai-5',
      subject: 'Matematika & Mantiq',
      question: 'Ehtimollar nazariyasida tanga 2 marta tashlanganda ikkalasida ham "Gerb" tushish ehtimoli qanday?',
      options: ['1/4 (25%)', '1/2 (50%)', '3/4 (75%)', '1/8 (12.5%)'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Har bir tashlash mustaqil: 1/2 * 1/2 = 1/4 (25%).'
    },
    {
      id: 'bq-ai-6',
      subject: 'Informatika',
      question: 'Sunʼiy intellekt inson kabi mustaqil o‘ylashini tekshiruvchi mashhur sinov nima deb ataladi?',
      options: ['Tyuring testi', 'Pifagor testi', 'Nyuton testi', 'Eynshteyn tajribasi'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: '1950-yilda Alan Tyuring mashinaning aql-idrokini baholash uchun "Tyuring testi"ni taklif qilgan.'
    }
  ],

  'software-engineer': [
    {
      id: 'bq-se-1',
      subject: 'Informatika',
      question: 'JavaScript tilida oʻzgaruvchi qiymatini oʻzgarmas qilib eʼlon qilish uchun qaysi kalit soʻz ishlatiladi?',
      options: ['const', 'let', 'var', 'static'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: '"const" (constant) o‘zgaruvchining qiymatini qayta tayinlashdan himoyalaydi.'
    },
    {
      id: 'bq-se-2',
      subject: 'Informatika',
      question: 'Veb brauzerda maʼlumotlarni foydalanuvchi kompyuterida doimiy saqlash mexanizmi qaysi?',
      options: ['localStorage', 'DNS Server', 'CPU Cache', 'RAM Buffer'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'localStorage brauzer yopilgandan keyin ham maʼlumotlarni brauzerda saqlab qoladi.'
    },
    {
      id: 'bq-se-3',
      subject: 'Matematika',
      question: 'Quyidagi kod: for (let i = 0; i < 5; i++) necha marta aylanadi?',
      options: ['5 marta', '4 marta', '6 marta', 'Cheksiz'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'i = 0, 1, 2, 3, 4 qiymatlarida sikl roppa-rosa 5 marta ishlaydi.'
    },
    {
      id: 'bq-se-4',
      subject: 'Informatika',
      question: 'Git versiyalarni boshqarish tizimida oʻzgarishlarni serverga yuklash buyrugʻi qaysi?',
      options: ['git push', 'git pull', 'git commit', 'git clone'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: '"git push" lokal kiritilgan commitlarni GitHub yoki GitLab kabi masofaviy serverga yuboradi.'
    },
    {
      id: 'bq-se-5',
      subject: 'Ingliz tili',
      question: 'In programming, what does API stand for?',
      options: ['Application Programming Interface', 'Automated Personal Internet', 'Advanced Python Index', 'Active Process Indicator'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'API — Application Programming Interface (Dasturiy ilovalararo o‘zaro aloqa interfeysi).'
    },
    {
      id: 'bq-se-6',
      subject: 'Informatika',
      question: 'CSS-da elementlarni moslashuvchan qator va ustunlarga terish uchun qaysi zamonaviy usul ishlatiladi?',
      options: ['Flexbox / Grid', 'Float / Clear', 'Table layout', 'Inline-block'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Flexbox va CSS Grid zamonaviy veb-dizaynda elementlarni joylashtirishning eng kuchli standartidir.'
    }
  ],

  'cyber-security': [
    {
      id: 'bq-cs-1',
      subject: 'Kiberxavfsizlik',
      question: 'Tarmoqqa kiruvchi va chiquvchi xavfli trafikni nazorat qiluvchi "raqamli devor" nima?',
      options: ['Firewall (Brandmauer)', 'Router', 'Switch', 'Modem'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Firewall tarmoq xavfsizligining birinchi qalqoni bo‘lib, shubhali ulanishlarni bloklaydi.'
    },
    {
      id: 'bq-cs-2',
      subject: 'Informatika',
      question: 'Foydalanuvchi fayllarini shifrlab, ochish uchun to‘lov talab qiladigan zararli dastur turi nima?',
      options: ['Ransomware (Tovlamachi virus)', 'Adware', 'Spyware', 'Cookie'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Ransomware tizimdagi muhim maʼlumotlarni shifrlab oladi va kiberjinoyatchilar pul talab qiladi.'
    },
    {
      id: 'bq-cs-3',
      subject: 'Matematika & Kriptografiya',
      question: 'Kriptografiyada ommaviy kalit (Public key) va maxfiy kalit (Private key) ga asoslangan shifrlash qanday ataladi?',
      options: ['Asimmetrik shifrlash (RSA)', 'Simmetrik shifrlash', 'Oddiy kodlash', 'Binar arxitektura'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Asimmetrik shifrlashda shifrlash uchun bitta ochiq kalit, yechish uchun boshqa maxfiy kalit ishlatiladi.'
    },
    {
      id: 'bq-cs-4',
      subject: 'Kiberxavfsizlik',
      question: 'DDoS hujumi (Distributed Denial of Service) ning asosiy maqsadi nima?',
      options: ['Serverga haddan tashqari ko‘p soxta so‘rov yuborib ishdan chiqarish', 'Parollarni o‘g‘irlash', 'Fayllarni o‘chirish', 'Internet tezligini oshirish'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'DDoS hujumi serverni botnet orqali so‘rovlar bilan to‘ldirib, real foydalanuvchilar kira olmaydigan qilib qo‘yadi.'
    },
    {
      id: 'bq-cs-5',
      subject: 'Ingliz tili',
      question: 'Which term describes hackers who help organizations identify and fix security flaws?',
      options: ['White Hat (Oq qalpoqli)', 'Black Hat', 'Dark Web', 'Malware'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'White Hat (Etik xakerlar) tizimlarni himoyalash va kamchiliklarni bartaraf etish uchun qonuniy ishlaydi.'
    }
  ],

  'doctor-surgeon': [
    {
      id: 'bq-doc-1',
      subject: 'Biologiya & Anatomiya',
      question: 'Inson organizmidagi eng katta ichki aʼzo qaysi?',
      options: ['Jigar', 'Yurak', 'Oshqozon', 'Taloq'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Jigar insonning eng katta ichki aʼzosi (vazni taxminan 1.5 kg) bo‘lib, moddalar almashinuvida 500 dan ortiq vazifani bajaradi.'
    },
    {
      id: 'bq-doc-2',
      subject: 'Kimyo & Tibbiyot',
      question: 'Inson qonidagi gemoglobin oqsilining markazida qaysi metall ioni joylashgan?',
      options: ['Temir (Fe)', 'Mis (Cu)', 'Kalsiy (Ca)', 'Magniy (Mg)'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Gemoglobin markazida Fe²⁺ ioni bo‘lib, kislorodni o‘ziga biriktirib butun tanaga tashiydi.'
    },
    {
      id: 'bq-doc-3',
      subject: 'Biologiya',
      question: 'Inson miyasining muvozanat va harakatlarni muvofiqlashtirishga masʼul qismi qaysi?',
      options: ['Miyacha (Cerebellum)', 'Gipotalamus', 'Uzunchoq miya', 'Gipofiz'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Miyacha (Cerebellum) gavda muvozanatini saqlash va murakkab harakatlarni aniq bajarishni boshqaradi.'
    },
    {
      id: 'bq-doc-4',
      subject: 'Biologiya & Fiziologiya',
      question: 'Sogʻlom insonning normal tinch holatdagi yurak urishi (puls) daqiqasiga taxminan necha marta?',
      options: ['60 - 80 marta', '30 - 40 marta', '120 - 150 marta', '15 - 25 marta'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Katta yoshli inson tinch holatda bo‘lganda normal puls 60–80 zarba/daqiqani tashkil etadi.'
    },
    {
      id: 'bq-doc-5',
      subject: 'Kimyo',
      question: 'Oshqozonda ovqat hazm bo‘lishiga yordam beruvchi kislota qaysi?',
      options: ['Xlorid kislota (HCl)', 'Sulfat kislota (H₂SO₄)', 'Azot kislota (HNO₃)', 'Sirka kislota'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Oshqozon shirasidagi HCl fermentlarni faollashtiradi va zararli bakteriyalarni nobud qiladi.'
    }
  ],

  'architect-designer': [
    {
      id: 'bq-arch-1',
      subject: 'Fizika & Muhandislik',
      question: 'Ko‘prik va binolarda og‘irlik yuklamasini eng teng taqsimlovchi egri chiziqli konstruksiya nima?',
      options: ['Arka (Ravoq)', 'Kvadrat', 'Trapetsiya', 'Prizma'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Arka (Ravoq) siqilish kuchini yerga optimal uzatadi, shuning uchun qadimdan ko‘priklar arka shaklida quriladi.'
    },
    {
      id: 'bq-arch-2',
      subject: 'Geometriya & Sanʼat',
      question: 'Sanʼat va arxitekturada mukammal mutanosiblik deb hisoblanuvchi "Oltin kesim" (Golden Ratio) nisbati taxminan nechaga teng?',
      options: ['1.618 (Phi)', '3.141 (Pi)', '2.718 (Euler)', '1.414'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Oltin kesim (Φ ≈ 1.618) tabiat va klassik arxitekturada ko‘zga eng yoqimli nisbat hisoblanadi.'
    },
    {
      id: 'bq-arch-3',
      subject: 'Dizayn & 3D',
      question: '3D grafika va arxitektura chizmalarida modelning 3 o‘qi qaysi harflar bilan belgilanadi?',
      options: ['X, Y, Z', 'A, B, C', 'U, V, W', 'R, G, B'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Fazoviy koordinata tizimi: X (kenglik), Y (balandlik), Z (chuqurlik) o‘qlaridan iborat.'
    },
    {
      id: 'bq-arch-4',
      subject: 'Fizika',
      question: 'Zilzilaga bardoshli zamonaviy binolar poydevoriga qanday xavfsizlik moslamalari o‘rnatiladi?',
      options: ['Seysmik izolyatorlar va dempferlar', 'Temir simlar', 'Qumli qatlam', 'Og‘ir toshlar'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Seysmik amortizator va dempferlar yer silkinishi energiyasini yutib, binoni yiqilishdan saqlaydi.'
    },
    {
      id: 'bq-arch-5',
      subject: 'Sanʼat & Tarix',
      question: 'Samarqanddagi Registon maydonida nechta mahobatli madrasa joylashgan?',
      options: ['3 ta (Ulug‘bek, Sherdor, Tillakori)', '2 ta', '4 ta', '5 ta'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Registon meʼmoriy ansambli Ulug‘bek, Sherdor va Tillakori madrasalaridan iborat jahon durdonasidir.'
    }
  ],

  'finance-business': [
    {
      id: 'bq-fin-1',
      subject: 'Iqtisodiyot & Biznes',
      question: 'Tovarlar va xizmatlar narxining umumiy oshib, pul qadrining pasayishi iqtisodiyotda nima deb ataladi?',
      options: ['Inflyatsiya', 'Deflyatsiya', 'Stagflatsiya', 'Dividendlash'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Inflyatsiya — pulning xarid qobiliyati pasayishi va narx-navo oshish jarayonidir.'
    },
    {
      id: 'bq-fin-2',
      subject: 'Matematika & Moliya',
      question: '1,000,000 so‘m omonatga yillik 20% oddiy foiz qo‘shilsa, 1 yildan so‘ng jami summa qancha bo‘ladi?',
      options: ['1,200,000 so‘m', '1,100,000 so‘m', '1,400,000 so‘m', '2,000,000 so‘m'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: '20% foyda = 1,000,000 * 0.20 = 200,000 so‘m. Jami summa: 1,200,000 so‘m.'
    },
    {
      id: 'bq-fin-3',
      subject: 'Biznes',
      question: 'Startap yoki kompaniyaning barcha xarajatlari va daromadlari teng bo‘lgan nuqta nima deb ataladi?',
      options: ['Zararsizlik nuqtasi (Break-even)', 'Sof foyda', 'Marja', 'Likvidlik'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'Break-even point — daromad xarajatni to‘liq qoplagan, foyda ham, zarar ham nol bo‘lgan nuqta.'
    },
    {
      id: 'bq-fin-4',
      subject: 'Ingliz tili & Moliya',
      question: 'In business, what is "ROI"?',
      options: ['Return on Investment (Investitsiya daromadliligi)', 'Rate of Interest', 'Risk of Inflation', 'Real Output Index'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: 'ROI — kiritilgan investitsiyadan olingan sof foyda foizini o‘lchovchi asosiy ko‘rsatkich.'
    },
    {
      id: 'bq-fin-5',
      subject: 'Matematika',
      question: 'Aksiya narxi 100 dollardan 125 dollarga ko‘tarilsa, u necha foizga o‘sgan bo‘ladi?',
      options: ['25%', '20%', '15%', '30%'],
      correctIndex: 0,
      timeLimitSeconds: 15,
      explanation: '(125 - 100) / 100 * 100% = 25% o‘sish.'
    }
  ]
};

// Potensial bot / online o'quvchilar ro'yxati (Matchmaking uchun)
const PEER_OPPONENTS = [
  { id: 'peer-1', name: 'Jasur Mirzayev', avatar: '🚀', grade: '8-sinf', rating: 1240, level: 3, winRate: '68%', careerSlug: 'software-engineer', careerTitle: 'Dasturchi (Full-Stack Web Developer)' },
  { id: 'peer-2', name: 'Madina Aliyeva', avatar: '👩‍🎓', grade: '10-sinf', rating: 1380, level: 5, winRate: '75%', careerSlug: 'doctor-surgeon', careerTitle: 'Shifokor va Jarroh (Doctor / Surgeon)' },
  { id: 'peer-3', name: 'Azizbek Rahimov', avatar: '🦁', grade: '9-sinf', rating: 1520, level: 6, winRate: '84%', careerSlug: 'ai-engineer', careerTitle: "Sun'iy Intellekt Muhandisi (AI Engineer)" },
  { id: 'peer-4', name: 'Nilufar Qosimova', avatar: '🌸', grade: '7-sinf', rating: 1180, level: 4, winRate: '62%', careerSlug: 'architect-designer', careerTitle: 'Arxitektor va 3D Dizayner' },
  { id: 'peer-5', name: 'Temur Xoliqov', avatar: '⚡', grade: '9-sinf', rating: 1290, level: 3, winRate: '65%', careerSlug: 'cyber-security', careerTitle: 'Kiberxavfsizlik Mutaxassisi' },
  { id: 'peer-6', name: 'Samandar Zokirov', avatar: '🎯', grade: '8-sinf', rating: 1220, level: 3, winRate: '60%', careerSlug: 'finance-business', careerTitle: 'Moliyachi va Biznes Tahlilchi' },
  { id: 'peer-7', name: 'Zuhra Karimova', avatar: '🌟', grade: '9-sinf', rating: 1310, level: 4, winRate: '71%', careerSlug: 'ai-engineer', careerTitle: "Sun'iy Intellekt Muhandisi" },
  { id: 'peer-8', name: 'Bobur Rustamov', avatar: '🔥', grade: '10-sinf', rating: 1450, level: 5, winRate: '79%', careerSlug: 'software-engineer', careerTitle: 'Dasturchi (Full-Stack Developer)' }
];

// Faol janglar sessiyalari
let activeBattlesStore = {};

// 1. Foydalanuvchining Battle profili va statistikasi
export const getBattleProfile = async (req, res) => {
  try {
    const { user, userId } = await resolveUser(req);

    let stats = userBattleStatsStore[userId];
    if (!stats) {
      stats = {
        battleRating: 1200,
        league: 'Kumush Liga 🥈',
        totalBattles: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        winStreak: 0,
        highestStreak: 0,
        coinsEarned: 0,
        badges: []
      };
      userBattleStatsStore[userId] = stats;
    }

    // Foydalanuvchining joriy kasbini aniqlash
    const selectedCareer = user?.selectedCareer || "Sun'iy Intellekt Muhandisi (AI Engineer)";
    
    // Mos keluvchi kasb obyektini topish
    let careerObj = initialCareers.find(c => 
      c.title.toLowerCase().includes(selectedCareer.toLowerCase()) || 
      selectedCareer.toLowerCase().includes(c.title.toLowerCase())
    ) || initialCareers[0];

    // Mavjud barcha sohalar
    const availableSpheres = initialCareers.map(c => ({
      id: c.slug,
      slug: c.slug,
      title: c.title,
      icon: c.icon,
      requiredSubjects: c.requiredSubjects
    }));

    res.json({
      success: true,
      user: {
        id: userId,
        name: user?.name || "O'quvchi Dilshod",
        avatar: user?.avatar || '🧑‍🎓',
        coins: user?.coins || 0,
        xp: user?.xp || 0,
        level: user?.level || 2,
        selectedCareer: selectedCareer,
        careerObj
      },
      stats,
      availableSpheres
    });
  } catch (error) {
    console.error('getBattleProfile error:', error);
    res.status(500).json({ success: false, message: 'Battle profilini yuklashda xatolik' });
  }
};

// 2. Raqib Qidirish va Matchmaking
export const findBattleMatch = async (req, res) => {
  try {
    const { careerSlug } = req.body;
    const { user, userId } = await resolveUser(req);

    // Foydalanuvchi statistikasini olish
    let stats = userBattleStatsStore[userId] || {
      battleRating: 1200,
      league: 'Kumush Liga 🥈',
      totalBattles: 0,
      wins: 0,
      losses: 0
    };

    // Foydalanuvchi kasbini aniqlash
    let targetCareer = null;
    if (careerSlug) {
      targetCareer = initialCareers.find(c => c.slug === careerSlug);
    }
    if (!targetCareer) {
      const userCareerName = user?.selectedCareer || '';
      targetCareer = initialCareers.find(c => userCareerName.includes(c.title) || c.title.includes(userCareerName)) || initialCareers[0];
    }

    // Raqibni tanlash: foydalanuvchi reytingiga eng yaqin o'quvchi
    const userRating = stats.battleRating || 1200;
    // O'zidan boshqa eng yaqin reytingli raqibni saralash
    const candidates = PEER_OPPONENTS.filter(p => p.name !== user?.name);
    candidates.sort((a, b) => Math.abs(a.rating - userRating) - Math.abs(b.rating - userRating));

    // Eng yaqin raqib yoki tasodifiy eng yaxshi nomzod
    const chosenOpponent = candidates[0] || PEER_OPPONENTS[0];

    // Savollarni tanlash (Soha bo'yicha 5 ta maxsus savol)
    const careerKey = targetCareer.slug in BATTLE_QUESTIONS_BY_CAREER 
      ? targetCareer.slug 
      : 'software-engineer';

    const questionPool = BATTLE_QUESTIONS_BY_CAREER[careerKey] || BATTLE_QUESTIONS_BY_CAREER['software-engineer'];
    // 5 ta savolni aralashtirib olish
    const shuffled = [...questionPool].sort(() => 0.5 - Math.random());
    const battleQuestions = shuffled.slice(0, 5);

    const battleId = `battle-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    // Faol jang sessiyasini saqlash
    activeBattlesStore[battleId] = {
      battleId,
      userId,
      userName: user?.name || "O'quvchi",
      userAvatar: user?.avatar || '🧑‍🎓',
      userRating,
      opponent: chosenOpponent,
      career: targetCareer,
      questions: battleQuestions,
      createdAt: Date.now(),
      submitted: false
    };

    // O'quvchiga savollar (jonli raundlar uchun correctIndex va explanation bilan) yuboriladi
    const clientQuestions = battleQuestions.map((q, idx) => ({
      index: idx,
      id: q.id,
      subject: q.subject,
      question: q.question,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      timeLimitSeconds: q.timeLimitSeconds || 15
    }));

    res.json({
      success: true,
      battleId,
      career: {
        title: targetCareer.title,
        icon: targetCareer.icon,
        slug: targetCareer.slug,
        requiredSubjects: targetCareer.requiredSubjects
      },
      opponent: {
        id: chosenOpponent.id,
        name: chosenOpponent.name,
        avatar: chosenOpponent.avatar,
        grade: chosenOpponent.grade,
        rating: chosenOpponent.rating,
        level: chosenOpponent.level,
        winRate: chosenOpponent.winRate,
        careerTitle: targetCareer.title
      },
      questions: clientQuestions,
      totalRounds: clientQuestions.length
    });
  } catch (error) {
    console.error('findBattleMatch error:', error);
    res.status(500).json({ success: false, message: 'Raqib topishda xatolik yuz berdi' });
  }
};

// 3. Jang Natijalarini Topshirish va Baholash
export const submitBattleResult = async (req, res) => {
  try {
    const { battleId, roundsData } = req.body; // roundsData: [ { roundIndex, userSelected, userSpentSeconds, opponentCorrect, opponentSpentSeconds } ]
    const { user, userId } = await resolveUser(req);

    const session = activeBattlesStore[battleId];
    if (!session) {
      return res.status(404).json({ success: false, message: 'Battle sessiyasi topilmadi yoki yakunlangan' });
    }

    if (session.submitted) {
      return res.status(400).json({ success: false, message: 'Bu jang allaqachon topshirilgan!' });
    }

    session.submitted = true;

    let userTotalScore = 0;
    let opponentTotalScore = 0;
    let userCorrectCount = 0;
    let opponentCorrectCount = 0;
    let userTotalTime = 0;
    const roundsReview = [];

    session.questions.forEach((q, idx) => {
      const rData = (roundsData && roundsData[idx]) || {};
      const userSelected = rData.userSelected;
      const userTime = rData.userSpentSeconds !== undefined ? rData.userSpentSeconds : 10;
      userTotalTime += userTime;

      const isUserCorrect = userSelected === q.correctIndex;
      if (isUserCorrect) {
        userCorrectCount++;
        // To'g'ri javob uchun 100 ball + tezlik bonusi (har qolgan soniya uchun 3 ball)
        const speedBonus = Math.max(0, (q.timeLimitSeconds - userTime) * 3);
        userTotalScore += (100 + speedBonus);
      }

      // Raqib simulyatsiyasi (haqiqiy vaqtli yoki yuborilgan natija bo'yicha)
      const isOpponentCorrect = rData.opponentCorrect !== undefined 
        ? rData.opponentCorrect 
        : (Math.random() < 0.75); // 75% raqib aniqligi
      const oppTime = rData.opponentSpentSeconds || Math.floor(Math.random() * 6) + 4; // 4-9 sekund

      if (isOpponentCorrect) {
        opponentCorrectCount++;
        const oppSpeedBonus = Math.max(0, (q.timeLimitSeconds - oppTime) * 3);
        opponentTotalScore += (100 + oppSpeedBonus);
      }

      roundsReview.push({
        index: idx,
        question: q.question,
        options: q.options,
        userSelected,
        correctIndex: q.correctIndex,
        isUserCorrect,
        isOpponentCorrect,
        userTime,
        oppTime,
        explanation: q.explanation
      });
    });

    // G'olibni aniqlash
    let result = 'draw';
    if (userTotalScore > opponentTotalScore) {
      result = 'victory';
    } else if (userTotalScore < opponentTotalScore) {
      result = 'defeat';
    }

    // Mukofotlar va Reyting (Elo) hisoblash
    let ratingDelta = 0;
    let coinsEarned = 0;
    let xpEarned = 0;

    let userStats = userBattleStatsStore[userId] || {
      battleRating: 1200,
      league: 'Kumush Liga 🥈',
      totalBattles: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      winStreak: 0,
      highestStreak: 0,
      coinsEarned: 0,
      badges: []
    };

    userStats.totalBattles++;

    if (result === 'victory') {
      userStats.wins++;
      userStats.winStreak++;
      if (userStats.winStreak > (userStats.highestStreak || 0)) {
        userStats.highestStreak = userStats.winStreak;
      }

      // Reyting oshishi: Raqib kuchiga ko'ra
      const opponentRating = session.opponent?.rating || 1200;
      const ratingDiff = opponentRating - userStats.battleRating;
      const baseGain = 25;
      const bonusGain = Math.round(ratingDiff * 0.05);
      const streakBonus = Math.min(15, userStats.winStreak * 2);
      ratingDelta = Math.max(15, Math.min(45, baseGain + bonusGain + streakBonus));

      coinsEarned = 50; // G'olibga 50 coin!
      xpEarned = 80;
    } else if (result === 'defeat') {
      userStats.losses++;
      userStats.winStreak = 0;
      ratingDelta = -15;
      coinsEarned = 10; // Ishtirok uchun taskin
      xpEarned = 25;
    } else {
      userStats.draws++;
      ratingDelta = +5;
      coinsEarned = 25;
      xpEarned = 45;
    }

    userStats.battleRating = Math.max(800, userStats.battleRating + ratingDelta);
    userStats.coinsEarned = (userStats.coinsEarned || 0) + coinsEarned;

    // Liga yangilash
    if (userStats.battleRating >= 1500) {
      userStats.league = 'Olmos Liga 💎';
    } else if (userStats.battleRating >= 1350) {
      userStats.league = 'Oltin Liga 🥇';
    } else if (userStats.battleRating >= 1150) {
      userStats.league = 'Kumush Liga 🥈';
    } else {
      userStats.league = 'Bronza Liga 🥉';
    }

    // Badge tekshirish
    const newBadges = [];
    userStats.badges = userStats.badges || [];

    // 1. Birinchi g'alaba
    if (userStats.wins === 1 && !userStats.badges.some(b => b.id === 'b-battle-first')) {
      const b1 = { id: 'b-battle-first', name: 'Jangovar Daho', icon: '⚔️', description: 'Birinchi bilim jangida g‘alaba qozondi' };
      userStats.badges.push(b1);
      newBadges.push(b1);
    }
    // 2. 3 ta ketma-ket g'alaba (Win streak)
    if (userStats.winStreak >= 3 && !userStats.badges.some(b => b.id === 'b-battle-streak')) {
      const b2 = { id: 'b-battle-streak', name: 'Yengilmas Bahodir', icon: '🔥', description: 'Ketma-ket 3 ta jangda g‘olib bo‘ldi' };
      userStats.badges.push(b2);
      newBadges.push(b2);
    }
    // 3. Tezkor Qoplon (O'rtacha 5 sekunddan tez)
    const avgTime = userTotalTime / session.questions.length;
    if (avgTime <= 5 && userCorrectCount >= 4 && !userStats.badges.some(b => b.id === 'b-battle-speed')) {
      const b3 = { id: 'b-battle-speed', name: 'Tezkor Qoplon', icon: '⚡', description: 'Jangda chaqmoqdek tez va to‘g‘ri javob berdi' };
      userStats.badges.push(b3);
      newBadges.push(b3);
    }
    // 4. Olmos Gladiator
    if (userStats.battleRating >= 1500 && !userStats.badges.some(b => b.id === 'b-battle-diamond')) {
      const b4 = { id: 'b-battle-diamond', name: 'Olmos Gladiator', icon: '👑', description: 'Battle arenasida 1500+ Olmos Ligaga chiqdi' };
      userStats.badges.push(b4);
      newBadges.push(b4);
    }

    userBattleStatsStore[userId] = userStats;

    // Foydalanuvchi hisobiga coin va XP qo'shish
    let updatedCoins = 0;
    if (user) {
      user.coins = (user.coins || 0) + coinsEarned;
      user.xp = (user.xp || 0) + xpEarned;

      newBadges.forEach(nb => {
        if (!user.badges?.some(b => b.id === nb.id)) {
          user.badges = user.badges || [];
          user.badges.push({ ...nb, earnedAt: new Date() });
        }
      });

      if (typeof user.save === 'function') {
        await user.save();
      }
      updatedCoins = user.coins;
    }

    // Tarixga yozish
    const historyItem = {
      id: `btl-${Date.now()}`,
      userId,
      userName: user?.name || session.userName || "O'quvchi",
      userAvatar: user?.avatar || '🧑‍🎓',
      opponentName: session.opponent?.name || 'Raqib',
      opponentAvatar: session.opponent?.avatar || '👤',
      opponentGrade: session.opponent?.grade || '9-sinf',
      careerTitle: session.career?.title || 'Soha jangi',
      careerIcon: session.career?.icon || '⚔️',
      myScore: userTotalScore,
      opponentScore: opponentTotalScore,
      myCorrectCount: userCorrectCount,
      opponentCorrectCount: opponentCorrectCount,
      totalQuestions: session.questions.length,
      result,
      ratingDelta,
      coinsEarned,
      xpEarned,
      date: new Date()
    };

    battleHistoryStore.unshift(historyItem);
    delete activeBattlesStore[battleId];

    res.json({
      success: true,
      result,
      myScore: userTotalScore,
      opponentScore: opponentTotalScore,
      myCorrectCount: userCorrectCount,
      opponentCorrectCount: opponentCorrectCount,
      totalQuestions: session.questions.length,
      ratingDelta,
      newRating: userStats.battleRating,
      newLeague: userStats.league,
      winStreak: userStats.winStreak,
      coinsEarned,
      xpEarned,
      updatedCoins,
      newBadges,
      roundsReview
    });
  } catch (error) {
    console.error('submitBattleResult error:', error);
    res.status(500).json({ success: false, message: 'Jang natijalarini hisoblashda xatolik' });
  }
};

// 4. Foydalanuvchining Battle Tarixi
export const getBattleHistory = async (req, res) => {
  try {
    const { userId } = await resolveUser(req);
    const myHistory = battleHistoryStore.filter(b => b.userId === userId || b.userId === 'demo-user-1' || !b.userId);

    res.json({
      success: true,
      history: myHistory
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Tarixni yuklashda xatolik' });
  }
};

// 5. Battle Ligasi Peshqadamlari (Leaderboard)
export const getBattleLeaderboard = async (req, res) => {
  try {
    const list = [
      { rank: 1, name: "Azizbek Rahimov", avatar: "🦁", rating: 1520, league: "Olmos Liga 💎", wins: 28, winRate: "84%", career: "Sun'iy Intellekt Muhandisi" },
      { rank: 2, name: "Bobur Rustamov", avatar: "🔥", rating: 1450, league: "Oltin Liga 🥇", wins: 24, winRate: "79%", career: "Dasturchi" },
      { rank: 3, name: "Madina Aliyeva", avatar: "👩‍🎓", rating: 1380, league: "Oltin Liga 🥇", wins: 21, winRate: "75%", career: "Shifokor va Jarroh" },
      { rank: 4, name: "Zuhra Karimova", avatar: "🌟", rating: 1310, league: "Kumush Liga 🥈", wins: 18, winRate: "71%", career: "Sun'iy Intellekt Muhandisi" },
      { rank: 5, name: "Temur Xoliqov", avatar: "⚡", rating: 1290, league: "Kumush Liga 🥈", wins: 16, winRate: "65%", career: "Kiberxavfsizlik Mutaxassisi" },
      { rank: 6, name: "O'quvchi Dilshod (Siz)", avatar: "🧑‍🎓", rating: 1250, league: "Kumush Liga 🥈", wins: 10, winRate: "71%", career: "Sun'iy Intellekt Muhandisi", isMe: true },
      { rank: 7, name: "Jasur Mirzayev", avatar: "🚀", rating: 1240, league: "Kumush Liga 🥈", wins: 15, winRate: "68%", career: "Dasturchi" },
      { rank: 8, name: "Samandar Zokirov", avatar: "🎯", rating: 1220, league: "Kumush Liga 🥈", wins: 13, winRate: "60%", career: "Moliyachi va Biznes Tahlilchi" },
      { rank: 9, name: "Nilufar Qosimova", avatar: "🌸", rating: 1180, league: "Kumush Liga 🥈", wins: 11, winRate: "62%", career: "Arxitektor va 3D Dizayner" }
    ];

    res.json({
      success: true,
      leaderboard: list
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Reytingni yuklashda xatolik' });
  }
};
