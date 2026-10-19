import User from '../models/User.js';
import Quiz from '../models/Quiz.js';
import Assignment from '../models/Assignment.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';

import {
  initialLeaderboard,
  initialQuizzes,
  initialAssignments
} from '../seed/seedData.js';
import { getMockUsers } from './authController.js';

// Mock farzandlar ma'lumotlari (bitta ota-onaga bog'langan 3 nafar farzand)
let childrenStore = [
  {
    id: "child-1",
    name: "Azizbek Rahimov",
    avatar: "🦁",
    grade: "9-sinf",
    school: "14-sonli ixtisoslashtirilgan maktab",
    coins: 480,
    xp: 950,
    level: 6,
    rank: 1,
    league: "Olmos Liga 💎",
    selectedCareer: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    studyTimeMinutesToday: 105, // 1 soat 45 daqiqa
    testsCompletedToday: 3,
    accuracyRate: 92, // %
    activeTasksCount: 2,
    weeklyProgress: [
      { day: "Dush", minutes: 75, accuracy: 85 },
      { day: "Sesh", minutes: 90, accuracy: 90 },
      { day: "Chor", minutes: 60, accuracy: 80 },
      { day: "Pay", minutes: 110, accuracy: 95 },
      { day: "Jum", minutes: 85, accuracy: 88 },
      { day: "Shan", minutes: 120, accuracy: 96 },
      { day: "Yak", minutes: 105, accuracy: 92 }
    ],
    subjectMastery: [
      { subject: "Informatika & IT", percent: 96, status: "A'lo", color: "from-blue-500 to-indigo-600" },
      { subject: "Matematika", percent: 90, status: "A'lo", color: "from-violet-500 to-purple-600" },
      { subject: "Ingliz tili", percent: 84, status: "Yaxshi", color: "from-emerald-500 to-teal-600" },
      { subject: "Fizika", percent: 68, status: "E'tibor kerak", color: "from-amber-500 to-orange-600" },
      { subject: "Biologiya", percent: 75, status: "Qoniqarli", color: "from-rose-500 to-pink-600" }
    ],
    strengths: [
      "Mantiqiy algoritmlar va dasturlash masalalarini o'ta tez yechadi",
      "Pifagor va fazoviy geometriyani a'lo o'zlashtirgan",
      "Kunlik darslarni vaqtida bajarish intizomi yuqori"
    ],
    weaknesses: [
      "Fizikada Nyuton qonunlariga oid formulalarni qo'llashda biroz qiynalmoqda",
      "Ingliz tili murakkab zamonlari (Past Perfect) bo'yicha qo'shimcha mashq zarur"
    ],
    badges: [
      { name: "Oltin Daho", icon: "🥇", date: "2026-10-14" },
      { name: "Mukammal Natija (100%)", icon: "💯", date: "2026-10-16" },
      { name: "Mantiq Ustasi", icon: "🧩", date: "2026-10-17" }
    ],
    recentActivities: [
      { title: "Informatika: Web asoslari testini topshirdi", score: "4/4 (100%)", time: "Bugun, 09:30", type: "success" },
      { title: "Matematika amaliy topshirig'ini yukladi", score: "+35 Coin", time: "Bugun, 10:15", type: "task" },
      { title: "Fizika testidan 2 ta xato qildi", score: "2/4 (50%)", time: "Kecha, 18:20", type: "warning" }
    ]
  },
  {
    id: "child-2",
    name: "Madina Rahimova",
    avatar: "👩‍🎓",
    grade: "6-sinf",
    school: "14-sonli ixtisoslashtirilgan maktab",
    coins: 310,
    xp: 620,
    level: 4,
    rank: 5,
    league: "Oltin Liga 🥇",
    selectedCareer: "Shifokor va Biotexnolog",
    studyTimeMinutesToday: 65, // 1 soat 5 daqiqa
    testsCompletedToday: 2,
    accuracyRate: 85,
    activeTasksCount: 1,
    weeklyProgress: [
      { day: "Dush", minutes: 45, accuracy: 80 },
      { day: "Sesh", minutes: 60, accuracy: 85 },
      { day: "Chor", minutes: 50, accuracy: 78 },
      { day: "Pay", minutes: 70, accuracy: 90 },
      { day: "Jum", minutes: 60, accuracy: 82 },
      { day: "Shan", minutes: 90, accuracy: 92 },
      { day: "Yak", minutes: 65, accuracy: 85 }
    ],
    subjectMastery: [
      { subject: "Biologiya & Tabiat", percent: 94, status: "A'lo", color: "from-emerald-500 to-teal-600" },
      { subject: "Ona tili & Adabiyot", percent: 91, status: "A'lo", color: "from-purple-500 to-indigo-600" },
      { subject: "Ingliz tili", percent: 86, status: "Yaxshi", color: "from-blue-500 to-cyan-600" },
      { subject: "Matematika", percent: 74, status: "Qoniqarli", color: "from-amber-500 to-orange-600" }
    ],
    strengths: [
      "Tabiatshunoslik va biologiyaga qiziqishi o'ta yuqori",
      "Leksik boyligi va matnni tushunish qobiliyati a'lo"
    ],
    weaknesses: [
      "Matematikada kasrlar bilan hisob-kitob qilishda ko'proq mashq kerak"
    ],
    badges: [
      { name: "Tabiat Bilimdoni", icon: "🌿", date: "2026-10-12" },
      { name: "Faol Kitobxon", icon: "📚", date: "2026-10-15" }
    ],
    recentActivities: [
      { title: "Biologiya: Tabiat sirlari testini a'lo yechdi", score: "4/4 (100%)", time: "Bugun, 10:00", type: "success" },
      { title: "Ingliz tili lug'at testini topshirdi", score: "3/4 (75%)", time: "Bugun, 11:20", type: "success" }
    ]
  }
];

// Ota-ona obuna holati (Faqat 2 xil tarif: Tekin va Premium)
let parentSubscription = {
  isPremium: false,
  planId: "free",
  planName: "Tekin (Bepul)",
  price: "0",
  expiresAt: null,
  features: [
    "1 nafar farzandni monitoring qilish",
    "Kunlik sarflangan vaqt va test ballari",
    "Umumiy o'zlashtirish foizlari",
    "Haftalik qisqa hisobot"
  ]
};

// Ota-ona bildirishnomalari
let parentNotifications = [
  {
    id: "pnotif-1",
    childName: "Azizbek Rahimov",
    title: "Yangi Yutuq: 'Mantiq Ustasi' nishoni qo'lga kiritildi! 🏆",
    message: "Azizbek bugun mantiqiy savollar testini 100% bajardi va Olmos Ligada 1-o'ringa mustahkamlandi.",
    type: "achievement",
    time: "Bugun, 09:35",
    isRead: false
  },
  {
    id: "pnotif-2",
    childName: "Azizbek Rahimov",
    title: "E'tibor qaratish tavsiya etiladi: Fizika fani ⚠️",
    message: "Fizika bo'yicha so'nggi test natijasi 50% bo'ldi. Nyuton qonunlari mavzusini takrorlash tavsiya etiladi.",
    type: "alert",
    time: "Kecha, 18:25",
    isRead: true
  },
  {
    id: "pnotif-3",
    childName: "Madina Rahimova",
    title: "Kunlik o'quv maqsadi bajarildi ✨",
    message: "Madina bugun 1 soatdan ortiq vaqtini darslarga ajratdi va 2 ta testni muvaffaqiyatli topshirdi.",
    type: "info",
    time: "Bugun, 11:30",
    isRead: false
  }
];

// 1. Farzandlar ro'yxati (Faqat ushbu ota-onaga bog'langan farzandlar ko'rinadi)
export const getChildren = async (req, res) => {
  const { parent } = resolveParent(req);

  if (!parent || !parent.linkedChildren || parent.linkedChildren.length === 0) {
    return res.json({
      success: true,
      count: 0,
      data: []
    });
  }

  const linkedIds = parent.linkedChildren;
  const myChildren = childrenStore.filter(c => linkedIds.includes(c.id));

  res.json({
    success: true,
    count: myChildren.length,
    data: myChildren.map(c => ({
      id: c.id,
      name: c.name,
      avatar: c.avatar,
      grade: c.grade,
      school: c.school,
      level: c.level,
      coins: c.coins,
      accuracyRate: c.accuracyRate,
      league: c.league,
      selectedCareer: c.selectedCareer
    }))
  });
};

// 2. Farzandning to'liq dashboard ko'rsatkichlari
export const getChildDashboard = async (req, res) => {
  const { childId } = req.params;
  const { parent } = resolveParent(req);

  // Agar ota-onada umuman bola bo'lmasa:
  if (!parent || !parent.linkedChildren || parent.linkedChildren.length === 0) {
    return res.json({
      success: true,
      data: null,
      subscription: parentSubscription
    });
  }

  const child = childrenStore.find(c => c.id === childId);

  // Agar aynan so'ralgan childId topilmasa, ota-onaning 1-bog'langan bolasini berish
  const fallbackChild = child || childrenStore.find(c => parent.linkedChildren.includes(c.id)) || null;

  res.json({
    success: true,
    data: fallbackChild,
    subscription: parentSubscription
  });
};

// 3. AI Ota-ona Maslahatchisi (Parent AI Advice)
export const getParentAiAdvice = async (req, res) => {
  const { childId } = req.params;
  const child = childrenStore.find(c => c.id === childId) || childrenStore[0];

  const adviceData = {
    childName: child.name,
    overallAssessment: `${child.name} hozirda o'z sinfida eng faol va iqtidorli o'quvchilardan biri hisoblanadi. Uning o'rganish intizomi va qiziqishi yuqori darajada shakllangan.`,
    recommendations: [
      {
        title: "Fizika fanidan amaliy eksperimentlar o'tkazish",
        description: "Nyuton qonunlarini quruq formulalar bilan emas, uyda oddiy aravacha yoki to'p yordamida harakatlantirib ko'rsating. Bu mavzuni tasavvur qilishini osonlashtiradi.",
        category: "Darsga yordam"
      },
      {
        title: "Dam olish va ekran vaqtini me'yorda saqlash",
        description: "Azizbek kuniga 1.5 - 2 soat kompyuterda ta'lim olmoqda. Har 45 daqiqada 10 daqiqalik ko'z mashqlari va jismoniy tanaffus uyushtiring.",
        category: "Salomatlik"
      },
      {
        title: "Kasbga yo'naltirish: Sun'iy Intellekt",
        description: "U Sun'iy intellekt muhandisligini orzu qilmoqda. Unga Python dasturlash tili bo'yicha platformadagi kitoblarni birgalikda ko'rib chiqishni maslahat beramiz.",
        category: "Kelajak kasbi"
      }
    ],
    motivationalTip: "Bolani baho uchun emas, yangi bilim olgani va xatolaridan to'g'ri xulosa chiqargani uchun ko'proq maqtang. Bu unda ichki rag'batni (intrinsic motivation) kuchaytiradi."
  };

  res.json({
    success: true,
    data: adviceData
  });
};

// 4. Ota-onalar bildirishnomalari
export const getParentNotifications = async (req, res) => {
  res.json({
    success: true,
    count: parentNotifications.length,
    data: parentNotifications
  });
};

// 5. Obuna tarifini boshqarish va aktivlashtirish (Faqat 2 xil tarif: Tekin va Premium)
export const updateSubscription = async (req, res) => {
  const { planId, planName, paymentMethod, isPremium } = req.body;

  const isSwitchingToFree = 
    planId === 'free' || 
    isPremium === false || 
    planName?.toLowerCase().includes('tekin') || 
    planName?.toLowerCase().includes('baza');

  if (isSwitchingToFree) {
    parentSubscription.isPremium = false;
    parentSubscription.planId = 'free';
    parentSubscription.planName = "Tekin (Bepul)";
    parentSubscription.price = "0";
    parentSubscription.expiresAt = null;
    parentSubscription.features = [
      "1 nafar farzandni monitoring qilish",
      "Kunlik sarflangan vaqt va test ballari",
      "Umumiy o'zlashtirish foizlari",
      "Haftalik qisqa hisobot"
    ];

    return res.json({
      success: true,
      message: "Tekin (bepul) tarifi muvaffaqiyatli aktivlashtirildi!",
      data: parentSubscription
    });
  }

  // Premium tarifga o'tish va aktivlashtirish
  parentSubscription.isPremium = true;
  parentSubscription.planId = 'premium';
  parentSubscription.planName = "Premium";
  parentSubscription.price = "39 000";
  parentSubscription.expiresAt = new Date(Date.now() + 86400000 * 30);
  parentSubscription.features = [
    "Barcha farzandlarni bitta akkauntdan to'liq monitoring qilish",
    "AI Ota-ona individual maslahatchisi (24/7 jonli)",
    "Zaif va kuchli mavzular chuqur tahlili va uy mashqlari",
    "Rasmiy muhrli PDF hisobotlarni cheksiz yuklab olish",
    "Muntazam Telegram va SMS ogohlantirishlar"
  ];

  res.json({
    success: true,
    message: "Premium tarifi muvaffaqiyatli aktivlashtirildi! Barcha kengaytirilgan imkoniyatlar ochildi. 🎉",
    data: parentSubscription
  });
};

// 6. Hisobot ma'lumotlari (Kunlik, haftalik, oylik)
export const getReportData = async (req, res) => {
  const { childId } = req.params;
  const { period } = req.query; // 'daily', 'weekly', 'monthly'
  const child = childrenStore.find(c => c.id === childId) || childrenStore[0];

  res.json({
    success: true,
    period: period || "weekly",
    generatedAt: new Date(),
    child: {
      name: child.name,
      grade: child.grade,
      school: child.school,
      league: child.league,
      rank: child.rank,
      coins: child.coins,
      level: child.level
    },
    metrics: {
      totalStudyHours: period === 'monthly' ? "28.5 soat" : period === 'daily' ? "1.75 soat" : "9.2 soat",
      testsAttempted: period === 'monthly' ? 42 : period === 'daily' ? 3 : 14,
      averageScore: `${child.accuracyRate}%`,
      completedAssignments: period === 'monthly' ? 12 : period === 'daily' ? 1 : 4
    },
    subjectBreakdown: child.subjectMastery,
    strengths: child.strengths,
    weaknesses: child.weaknesses
  });
};

// Yordamchi: So'rovdan ota-ona profilini aniqlash
export const resolveParent = (req) => {
  let parentId = req.headers['x-parent-id'] || req.query?.parentId || req.body?.parentId;
  let token = req.headers['x-parent-token'] || req.headers.authorization;
  if (!parentId && token) {
    const raw = token.replace('Bearer ', '').trim();
    if (raw.startsWith('parent-token-')) {
      parentId = raw.replace('parent-token-', '');
    }
  }

  let parent = null;
  if (parentId) {
    parent = parentAccountsStore.find(p => p.id === parentId || p.phone === parentId || p.email === parentId);
  }
  if (!parent && parentAccountsStore.length > 0) {
    parent = parentAccountsStore[0];
  }
  return { parent, parentId };
};

// 7. Ota-onalar Ro'yxati (Parent Auth Store)
let parentAccountsStore = [
  {
    id: "parent-1",
    name: "Farhod Rahimov",
    phone: "+998 90 123 45 67",
    email: "farhod@bilimdon.uz",
    password: "password123",
    avatar: "👨‍💼",
    linkedChildren: [], // Yangi kirganda yoki ro'yxatdan o'tganda boshlang'ich bo'sh bo'ladi!
    createdAt: new Date()
  }
];

// Ota-ona ro'yxatdan o'tishi (Register) - UMUMAN BOLA KO'RINMAYDI
export const parentRegister = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, message: "Ism, telefon raqami va parol kiritilishi shart" });
    }

    const existing = parentAccountsStore.find(p => p.phone === phone || (email && p.email === email));
    if (existing) {
      return res.status(400).json({ success: false, message: "Ushbu telefon raqami bilan akkaunt allaqachon mavjud" });
    }

    const newParent = {
      id: `parent-${Date.now()}`,
      name,
      phone,
      email: email || `${phone.replace(/\D/g, '')}@parent.uz`,
      password,
      avatar: "👨‍💼",
      linkedChildren: [], // Bo'sh bo'ladi! Umuman hech qanaqa bola ko'rinmasin
      createdAt: new Date()
    };

    parentAccountsStore.push(newParent);

    res.json({
      success: true,
      message: "Ota-ona akkaunti muvaffaqiyatli yaratildi! Xush kelibsiz 🎉",
      token: `parent-token-${newParent.id}`,
      data: {
        id: newParent.id,
        name: newParent.name,
        phone: newParent.phone,
        email: newParent.email,
        avatar: newParent.avatar,
        linkedChildren: newParent.linkedChildren
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Ro'yxatdan o'tishda xatolik yuz berdi" });
  }
};

// Ota-ona kirishi (Login)
export const parentLogin = async (req, res) => {
  try {
    const { phoneOrEmail, password } = req.body;

    if (!phoneOrEmail || !password) {
      return res.status(400).json({ success: false, message: "Telefon raqami va parolni kiriting" });
    }

    let found = parentAccountsStore.find(p => 
      p.phone === phoneOrEmail || p.email === phoneOrEmail || p.phone.replace(/\s+/g, '') === phoneOrEmail.replace(/\s+/g, '')
    );

    if (!found) {
      found = {
        id: `parent-${Date.now()}`,
        name: "Hurmatli Ota-ona",
        phone: phoneOrEmail,
        email: `${phoneOrEmail}@parent.uz`,
        avatar: "👨‍💼",
        linkedChildren: [] // Yangi yaratilganda bola bo'lmaydi
      };
      parentAccountsStore.push(found);
    }

    res.json({
      success: true,
      message: "Muvaffaqiyatli kirdingiz! Farzandingiz ko'rsatkichlari tayyor.",
      token: `parent-token-${found.id}`,
      data: {
        id: found.id,
        name: found.name,
        phone: found.phone,
        email: found.email,
        avatar: found.avatar,
        linkedChildren: found.linkedChildren
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Kirishda xatolik yuz berdi" });
  }
};

// 8. Bola Qo'shish (Farzand ma'lumotlari kiritilganda platformadan qidirib bog'lash)
export const addChild = async (req, res) => {
  try {
    const { studentQuery, grade, school } = req.body;
    const { parent } = resolveParent(req);

    if (!studentQuery || !studentQuery.trim()) {
      return res.status(400).json({
        success: false,
        message: "Iltimos, farzandingizning platformadagi email manzili yoki to'liq ismini kiriting"
      });
    }

    if (!parent) {
      return res.status(401).json({
        success: false,
        message: "Ota-ona akkaunti aniqlanmadi. Iltimos, qaytadan tizimga kiring"
      });
    }

    const q = studentQuery.trim().toLowerCase();

    // 1-bosqich: MongoDB User to'plamidan qidirish
    let matchedStudent = null;
    try {
      matchedStudent = await User.findOne({
        role: { $ne: 'admin' },
        $or: [
          { email: { $regex: new RegExp(`^${q}$`, 'i') } },
          { name: { $regex: new RegExp(q, 'i') } }
        ]
      });
    } catch (e) {}

    // 2-bosqich: Mock Users ro'yxatidan qidirish
    if (!matchedStudent) {
      const mockUsers = typeof getMockUsers === 'function' ? getMockUsers() : [];
      matchedStudent = mockUsers.find(u => 
        u.email?.toLowerCase() === q || 
        u.name?.toLowerCase().includes(q) ||
        u._id === q
      );
    }

    // 3-bosqich: initialLeaderboard platforma o'quvchilari orasidan qidirish
    if (!matchedStudent) {
      matchedStudent = initialLeaderboard.find(u =>
        u.email?.toLowerCase() === q ||
        u.name?.toLowerCase().includes(q) ||
        u.id === q
      );
    }

    // 4-bosqich: childrenStore ichidan qidirish
    if (!matchedStudent) {
      matchedStudent = childrenStore.find(c => 
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase() === q
      );
    }

    // Agar o'quvchi topilmasa:
    if (!matchedStudent) {
      return res.status(404).json({
        success: false,
        message: `"${studentQuery}" ma'lumotlariga mos o'quvchi platformada topilmadi. Iltimos, farzandingiz platformada ro'yxatdan o'tganligini va to'g'ri email (masalan: azizbek@maktab.uz yoki dilshod@edulearn.uz) kiritganingizni tekshiring.`
      });
    }

    // Topilgan o'quvchi uchun unikal ID
    const studentId = matchedStudent._id ? matchedStudent._id.toString() : (matchedStudent.id || `child-${Date.now()}`);

    // Allaqachon bog'langanligini tekshirish
    parent.linkedChildren = parent.linkedChildren || [];
    if (parent.linkedChildren.includes(studentId) || parent.linkedChildren.includes(`child-${studentId}`)) {
      return res.status(400).json({
        success: false,
        message: `"${matchedStudent.name}" allaqachon akkauntingizga bog'langan!`
      });
    }

    // childrenStore da mavjud bo'lmasa, to'liq o'quv profilini shakllantirish
    let existingChild = childrenStore.find(c => c.id === studentId || c.name.toLowerCase() === matchedStudent.name.toLowerCase());
    
    if (!existingChild) {
      existingChild = {
        id: studentId,
        name: matchedStudent.name,
        avatar: matchedStudent.avatar || "🧑‍🎓",
        grade: matchedStudent.grade || grade || "8-sinf",
        school: school || "14-sonli ixtisoslashtirilgan maktab",
        coins: matchedStudent.coins || 200,
        xp: matchedStudent.xp || 400,
        level: matchedStudent.level || 3,
        rank: 3,
        league: matchedStudent.league || "Oltin Liga 🥇",
        selectedCareer: matchedStudent.selectedCareer || "Dasturchi (Software Engineer)",
        studyTimeMinutesToday: 85,
        testsCompletedToday: 2,
        accuracyRate: 88,
        activeTasksCount: 2,
        weeklyProgress: [
          { day: "Dush", minutes: 60, accuracy: 85 },
          { day: "Sesh", minutes: 75, accuracy: 88 },
          { day: "Chor", minutes: 50, accuracy: 80 },
          { day: "Pay", minutes: 90, accuracy: 92 },
          { day: "Jum", minutes: 70, accuracy: 86 },
          { day: "Shan", minutes: 100, accuracy: 94 },
          { day: "Yak", minutes: 85, accuracy: 88 }
        ],
        subjectMastery: [
          { subject: "Informatika & IT", percent: 92, status: "A'lo", color: "from-blue-500 to-indigo-600" },
          { subject: "Matematika", percent: 86, status: "Yaxshi", color: "from-violet-500 to-purple-600" },
          { subject: "Ingliz tili", percent: 82, status: "Yaxshi", color: "from-emerald-500 to-teal-600" },
          { subject: "Fizika", percent: 74, status: "Qoniqarli", color: "from-amber-500 to-orange-600" }
        ],
        strengths: [
          "Darslarni muntazam va intizomli bajaradi",
          "Mantiqiy topshiriqlarda yuqori natijalar ko'rsatmoqda"
        ],
        weaknesses: [
          "Fizika formulalari bo'yicha qo'shimcha amaliyot kerak"
        ],
        badges: matchedStudent.badges || [
          { name: "Faol O'quvchi", icon: "⭐", date: new Date().toLocaleDateString() },
          { name: "Bilimdon Qadam", icon: "🌱", date: new Date().toLocaleDateString() }
        ],
        recentActivities: [
          { title: "Informatika testini topshirdi", score: "4/4 (100%)", time: "Bugun, 10:15", type: "success" },
          { title: "Dars amaliyotini yakunladi", score: "+25 Coin", time: "Bugun, 11:30", type: "task" }
        ]
      };
      childrenStore.push(existingChild);
    }

    // Ota-onaga bolani biriktirish
    parent.linkedChildren.push(existingChild.id);

    // Bildirishnoma qo'shish
    parentNotifications.unshift({
      id: `pnotif-${Date.now()}`,
      childName: existingChild.name,
      title: "Yangi farzand hisobingizga ulandi! 👨‍👩‍👧",
      message: `${existingChild.name} ning ta'lim jarayoni va yutuqlarini endi doimiy kuzatib borishingiz mumkin.`,
      type: "info",
      time: "Hozirgina",
      isRead: false
    });

    res.json({
      success: true,
      message: `Farzandingiz ${existingChild.name} muvaffaqiyatli bog'landi! 🎉`,
      child: {
        id: existingChild.id,
        name: existingChild.name,
        avatar: existingChild.avatar,
        grade: existingChild.grade,
        school: existingChild.school,
        level: existingChild.level,
        coins: existingChild.coins,
        accuracyRate: existingChild.accuracyRate,
        league: existingChild.league,
        selectedCareer: existingChild.selectedCareer
      },
      linkedChildren: parent.linkedChildren
    });
  } catch (error) {
    console.error("addChild error:", error);
    res.status(500).json({ success: false, message: "Farzandni qo'shishda server xatoligi yuz berdi" });
  }
};

// Joriy ota-onani tekshirish
export const parentGetMe = async (req, res) => {
  const { parent } = resolveParent(req);
  res.json({
    success: true,
    data: parent || parentAccountsStore[0]
  });
};
