export const initialCareers = [
  {
    id: "c-1",
    title: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    slug: "ai-engineer",
    category: "Texnologiya & IT",
    icon: "🤖",
    description: "Sun'iy intellekt, neyrotarmoqlar va aqlli robotlarni dasturlash bilan shug'ullanadigan kelajak kasbi.",
    averageSalary: "$2,000 - $6,000+",
    demandLevel: "Favqulodda yuqori",
    requiredSubjects: ["Matematika", "Informatika", "Ingliz tili", "Fizika"],
    keySkills: ["Python", "Mashinaviy o'rganish (ML)", "Oliy matematika", "Algoritmlar", "Mantiqiy tahlil"],
    roadmap: [
      { step: 1, title: "Matematika va Mantiq", desc: "Chiziqli algebra, ehtimollar nazariyasi va diskret matematikani puxta o'rganing.", recommendedBooks: ["Matematika 10-11 sinf", "Mantiqiy masalalar"] },
      { step: 2, title: "Python dasturlash tili", desc: "Python sintaksisi, OOP asoslari va ma'lumotlar tuzilmalarini o'zlashtiring.", recommendedBooks: ["Python asoslari", "Automate the Boring Stuff"] },
      { step: 3, title: "Ma'lumotlar bilan ishlash", desc: "Numpy, Pandas, Matplotlib kutubxonalari orqali ma'lumotlarni tahlil qilishni o'rganing.", recommendedBooks: ["Hands-On Machine Learning"] },
      { step: 4, title: "Neyrotarmoqlar va LLM", desc: "PyTorch yoki TensorFlow orqali chuqur o'rganish va generativ sun'iy intellekt modellarini quring.", recommendedBooks: ["Deep Learning by Ian Goodfellow"] }
    ],
    recommendedQuizzes: ["Informatika", "Matematika", "Mantiq"]
  },
  {
    id: "c-2",
    title: "Dasturchi (Full-Stack Web Developer)",
    slug: "software-engineer",
    category: "Texnologiya & IT",
    icon: "💻",
    description: "Veb-saytlar, mobil ilovalar va yirik dasturiy tizimlarning frontend va backend qismlarini yaratuvchi mutaxassis.",
    averageSalary: "$1,200 - $4,500",
    demandLevel: "Juda yuqori",
    requiredSubjects: ["Informatika", "Matematika", "Ingliz tili"],
    keySkills: ["JavaScript / TypeScript", "React / Vite", "Node.js & Express", "Ma'lumotlar bazasi (MongoDB / SQL)", "Git"],
    roadmap: [
      { step: 1, title: "Web asoslari (HTML, CSS, JS)", desc: "Web sahifalarning tuzilishi, chiroyli dizayn va dinamik harakatlarni yarating.", recommendedBooks: ["JavaScript Eloquent", "MDN Web Docs"] },
      { step: 2, title: "Zamonaviy Frontend kutubxonalari", desc: "React, TailwindCSS va zamonaviy SPA ilovalarni qurishni o'rganing.", recommendedBooks: ["React Documentation", "Modern JS Guide"] },
      { step: 3, title: "Backend va Ma'lumotlar bazasi", desc: "Node.js, Express, RESTful API va MongoDB bilan server qismini boshqaring.", recommendedBooks: ["Node.js in Action"] },
      { step: 4, title: "Xavfsizlik va Deploy", desc: "JWT autentifikatsiya, bulutli serverlar va real loyihalarni internetga joylash.", recommendedBooks: ["Web Security Basics"] }
    ],
    recommendedQuizzes: ["Informatika", "Ingliz tili", "Mantiq"]
  },
  {
    id: "c-3",
    title: "Shifokor va Jarroh (Doctor / Surgeon)",
    slug: "doctor-surgeon",
    category: "Tibbiyot va Sog'liqni saqlash",
    icon: "🩺",
    description: "Insonlar hayotini saqlab qoluvchi, kasalliklarni aniqlab davolovchi va yuqori texnologiyali jarrohlik amaliyotlarini bajaruvchi fidoiy soha.",
    averageSalary: "$1,500 - $5,000",
    demandLevel: "Doimiy zarur va hurmatli",
    requiredSubjects: ["Biologiya", "Kimyo", "Ona tili", "Fizika"],
    keySkills: ["Inson anatomiyasi", "Biokimyo", "Diqqatlilik va sabr-toqat", "Tez qaror qabul qilish", "Empatiya"],
    roadmap: [
      { step: 1, title: "Biologiya va Anatomiya poydevori", desc: "Hujayra tuzilishi, inson a'zolari va genetikani chuqur o'rganing.", recommendedBooks: ["Biologiya darsliklari", "Inson anatomiyasi atlasi"] },
      { step: 2, title: "Kimyo va Biokimyo", desc: "Organik va anorganik kimyo formulalari, reaksiyalar va dori vositalari ta'sirini bilib oling.", recommendedBooks: ["Umumiy kimyo asoslari"] },
      { step: 3, title: "Tibbiyot Akademiyasiga tayyorgarlik", desc: "DTM testlari va klinik amaliyotlar uchun fundamental bilimlarni mustahkamlang.", recommendedBooks: ["Tibbiy etika va deontologiya"] },
      { step: 4, title: "Amaliyot va Mutaxassislik", desc: "Zamonaviy diagnostika (MRT, UTT) va jarrohlik asboblari bilan ishlash.", recommendedBooks: ["Klinik jarrohlik qo'llanmasi"] }
    ],
    recommendedQuizzes: ["Biologiya", "Kimyo", "Mantiq"]
  },
  {
    id: "c-4",
    title: "Kiberxavfsizlik Mutaxassisi (Cybersecurity)",
    slug: "cyber-security",
    category: "Xavfsizlik & IT",
    icon: "🛡️",
    description: "Tizimlarni xakerlik hujumlaridan himoya qiluvchi, maxfiy ma'lumotlar xavfsizligini ta'minlovchi raqamli posbon.",
    averageSalary: "$1,800 - $5,500",
    demandLevel: "Favqulodda yuqori",
    requiredSubjects: ["Informatika", "Matematika", "Ingliz tili", "Fizika"],
    keySkills: ["Tarmoqlar (TCP/IP)", "Linux operatsion tizimi", "Kriptografiya", "Xavfsizlik tahlili", "Python"],
    roadmap: [
      { step: 1, title: "Kompyuter tarmoqlari asoslari", desc: "Internet protokollari, marshrutlash va portlar qanday ishlashini bilib oling.", recommendedBooks: ["Computer Networking: A Top-Down Approach"] },
      { step: 2, title: "Linux va Skriptlar", desc: "Linux terminali buyruqlari, Bash va Python yordamida avtomatlashtirish.", recommendedBooks: ["Linux Bible"] },
      { step: 3, title: "Kriptografiya va Zaifliklar", desc: "Shifrlash algoritmlari, xakerlik usullari va tizim himoyasini sinash.", recommendedBooks: ["Hacking: The Art of Exploitation"] },
      { step: 4, title: "Professional sertifikatlar", desc: "CEH, CompTIA Security+ darajasiga chiqish.", recommendedBooks: ["CompTIA Security+ Study Guide"] }
    ],
    recommendedQuizzes: ["Informatika", "Matematika", "Ingliz tili"]
  },
  {
    id: "c-5",
    title: "Arxitektor va 3D Dizayner (Architect)",
    slug: "architect-designer",
    category: "San'at va Muhandislik",
    icon: "🏛️",
    description: "Kelajak shaharlarini, zamonaviy binolarni va qulay shahar muhitini loyihalovchi kreativ muhandis.",
    averageSalary: "$1,000 - $3,500",
    demandLevel: "Yuqori",
    requiredSubjects: ["Chizmachilik va San'at", "Matematika", "Fizika"],
    keySkills: ["Fazoviy tasavvur", "AutoCAD / Revit", "3D Modellashtirish", "Materialshunoslik", "Estetika"],
    roadmap: [
      { step: 1, title: "Chizmachilik va Geometriya", desc: "Tekislikdagi va fazoviy shakllarni to'g'ri chizish hamda hisoblash.", recommendedBooks: ["Chizmachilik asoslari", "Fazoviy geometriya"] },
      { step: 2, title: "Fizika va Statika", desc: "Binolarning og'irlik kuchi, yuklama va shamolga bardoshligini hisoblash.", recommendedBooks: ["Qurilish mexanikasi"] },
      { step: 3, title: "Raqamli modellashtirish", desc: "AutoCAD, Blender, 3ds Max dasturlarida vizual loyihalar tayyorlash.", recommendedBooks: ["Digital Architectural Design"] },
      { step: 4, title: "Eko-arxitektura va Smart Cities", desc: "Yashil texnologiyalar va energiya tejamkor aqlli uylar loyihalash.", recommendedBooks: ["Sustainable Architecture"] }
    ],
    recommendedQuizzes: ["Fizika", "Matematika", "Mantiq"]
  },
  {
    id: "c-6",
    title: "Moliyachi va Biznes Tahlilchi (Financier)",
    slug: "finance-business",
    category: "Iqtisodiyot & Biznes",
    icon: "📊",
    description: "Kompaniyalar byudjeti, investitsiyalar, aksiyalar bozori va biznes daromadlarini tahlil qiluvchi soha.",
    averageSalary: "$1,200 - $4,000",
    demandLevel: "Yuqori",
    requiredSubjects: ["Matematika", "Ingliz tili", "Ona tili", "Mantiq"],
    keySkills: ["Moliyaviy modellashtirish", "Excel va PowerBI", "Statistika", "Strategik rejalashtirish", "Kripto/Bozor tahlili"],
    roadmap: [
      { step: 1, title: "Iqtisodiyot asoslari", desc: "Talab va taklif, inflyatsiya, bozor mexanizmlari va bank tizimi.", recommendedBooks: ["Iqtisodiyot asoslari - Mankiw"] },
      { step: 2, title: "Moliyaviy matematika va Excel", desc: "Daromadlilik formulalari, foiz hisob-kitoblari va katta jadvallar.", recommendedBooks: ["Financial Modeling in Excel"] },
      { step: 3, title: "Investitsiyalar va Tahlil", desc: "Aksiya, obligatsiya va startap loyihalarni baholash.", recommendedBooks: ["The Intelligent Investor"] },
      { step: 4, title: "Xalqaro sertifikatlar (CFA/ACCA)", desc: "Global moliya bozorlarida yetakchi mutaxassis bo'lish.", recommendedBooks: ["CFA Curriculum"] }
    ],
    recommendedQuizzes: ["Matematika", "Mantiq", "Ingliz tili"]
  }
];

export const initialQuizzes = [
  {
    id: "q-1",
    title: "Matematika: Mantiq va Sonlar Sehrli Olam",
    subject: "Matematika",
    icon: "📐",
    difficulty: "Oson",
    timeLimitMinutes: 8,
    coinsReward: 30,
    xpReward: 45,
    questions: [
      {
        question: "Agar 5 ta mushuk 5 ta sichqonni 5 daqiqada tutsa, 100 ta mushuk 100 ta sichqonni necha daqiqada tutadi?",
        options: ["100 daqiqada", "5 daqiqada", "1 daqiqada", "25 daqiqada"],
        correctIndex: 1,
        explanation: "1 ta mushuk 1 ta sichqonni 5 daqiqada tutadi. Shuning uchun 100 ta mushuk ham o'zining 100 ta sichqonini aynan 5 daqiqada tutib bo'ladi!"
      },
      {
        question: "Pifagor teoremasiga ko'ra to'g'ri burchakli uchburchakning katetlari 3 va 4 bo'lsa, gipotenuzasi nechaga teng?",
        options: ["5", "7", "6", "8"],
        correctIndex: 0,
        explanation: "c² = a² + b² = 3² + 4² = 9 + 16 = 25. ildiz ostida 25 esa 5 ga teng!"
      },
      {
        question: "Qaysi son o'zining kvadrati bilan o'ziga teng?",
        options: ["Faqat 1", "Faqat 0", "0 va 1", "-1 va 1"],
        correctIndex: 2,
        explanation: "0² = 0 va 1² = 1. Har ikkala sonning ham kvadrati o'ziga teng!"
      },
      {
        question: "Tenglamani yeching: 2x + 10 = 26. x ning qiymati nima?",
        options: ["6", "8", "7", "16"],
        correctIndex: 1,
        explanation: "2x = 26 - 10 = 16. x = 16 / 2 = 8. Barakalla!"
      }
    ]
  },
  {
    id: "q-2",
    title: "Informatika va Dasturlash Asoslari",
    subject: "Informatika",
    icon: "💻",
    difficulty: "O'rtacha",
    timeLimitMinutes: 10,
    coinsReward: 40,
    xpReward: 60,
    questions: [
      {
        question: "Dasturlashda o'zgaruvchi (variable) nima?",
        options: ["Xotirada ma'lumot saqlovchi nomlangan quti", "Kompyuter ekrani", "Internet kabeli", "Klaviatura tugmasi"],
        correctIndex: 0,
        explanation: "O'zgaruvchi bu kompyuter xotirasidagi ma'lum bir qiymatni saqlab turadigan nomlangan qutichadir."
      },
      {
        question: "Qaysi biri veb-sahifaning tashqi ko'rinishi va dizayni uchun javob beradi?",
        options: ["HTML", "CSS", "Python", "SQL"],
        correctIndex: 1,
        explanation: "CSS (Cascading Style Sheets) sahifaning ranglari, shriftlari va tartibini bezash uchun xizmat qiladi."
      },
      {
        question: "1 Bayt (Byte) necha bitdan iborat?",
        options: ["4 bit", "8 bit", "16 bit", "1024 bit"],
        correctIndex: 1,
        explanation: "1 Bayt aynan 8 ta bitdan (0 yoki 1) tashkil topadi."
      },
      {
        question: "JavaScript tilida qaysi kalit so'z orqali funksiya e'lon qilinadi?",
        options: ["func", "def", "function", "action"],
        correctIndex: 2,
        explanation: "JavaScriptda an'anaviy funksiyalar `function` kalit so'zi orqali yaratiladi."
      }
    ]
  },
  {
    id: "q-3",
    title: "Fizika: Koinot va Harakat Qonunlari",
    subject: "Fizika",
    icon: "⚡",
    difficulty: "O'rtacha",
    timeLimitMinutes: 10,
    coinsReward: 35,
    xpReward: 50,
    questions: [
      {
        question: "Nyutonning ikkinchi qonuni formulasi qaysi?",
        options: ["E = mc²", "F = m * a", "v = s / t", "P = U * I"],
        correctIndex: 1,
        explanation: "F = m * a (Kuch = massa ko'paytirilgan tezlanish) Nyutonning 2-qonunidir."
      },
      {
        question: "Yorug'likning vakuumdagi tezligi taxminan qancha?",
        options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "3,000 km/s"],
        correctIndex: 0,
        explanation: "Yorug'lik tezligi sekundiga qariyb 300 000 kilometrni tashkil qiladi! Bu koinotdagi eng yuqori tezlikdir."
      },
      {
        question: "Yerning erkin tushish tezlanishi (g) taxminan qanchaga teng?",
        options: ["9.8 m/s²", "5.4 m/s²", "12.2 m/s²", "1.6 m/s²"],
        correctIndex: 0,
        explanation: "Yer sirtida erkin tushish tezlanishi g ≈ 9.8 m/s² ga teng."
      }
    ]
  },
  {
    id: "q-4",
    title: "English for Young Explorers (Ingliz tili)",
    subject: "Ingliz tili",
    icon: "🌍",
    difficulty: "Oson",
    timeLimitMinutes: 7,
    coinsReward: 25,
    xpReward: 40,
    questions: [
      {
        question: "Qaysi gap grammatik jihatdan to'g'ri yozilgan?",
        options: ["She go to school every day.", "She goes to school every day.", "She going to school every day.", "She gone to school every day."],
        correctIndex: 1,
        explanation: "Present Simple zamonida 3-shaxs birlik (he, she, it) uchun fe'lga -s yoki -es qo'shimchasi qo'shiladi: She goes."
      },
      {
        question: "'Knowledge is power' iborasi o'zbek tiliga qanday tarjima qilinadi?",
        options: ["Bilim bu quvvat/kuch", "Vaqt bu oltin", "Do'stlik eng katta boylik", "Mehnat baxt keltiradi"],
        correctIndex: 0,
        explanation: "Knowledge — bilim, Power — kuch, quvvat. 'Bilim — bu kuch' degani!"
      },
      {
        question: "'Smart' so'zining sinonimi qaysi?",
        options: ["Clever", "Slow", "Heavy", "Dark"],
        correctIndex: 0,
        explanation: "Smart va Clever so'zlari ikkalasi ham 'aqlli, ziyrak' ma'nosini bildiradi."
      }
    ]
  },
  {
    id: "q-5",
    title: "Biologiya va Tabiat Sirlari",
    subject: "Biologiya",
    icon: "🌿",
    difficulty: "O'rtacha",
    timeLimitMinutes: 8,
    coinsReward: 30,
    xpReward: 45,
    questions: [
      {
        question: "O'simliklar quyosh nuri yordamida kislorod ishlab chiqarish jarayoni nima deb ataladi?",
        options: ["Fotosintez", "Nafas olish", "Bug'lanish", "Fermentatsiya"],
        correctIndex: 0,
        explanation: "Fotosintez jarayonida o'simlik barglaridagi xlorofill yordamida quyosh nuri va karbonat angidriddan glyukoza va kislorod hosil bo'ladi."
      },
      {
        question: "Inson tanasidagi eng katta ichki a'zo qaysi?",
        options: ["Yurak", "Jigar", "O'pka", "Buyrak"],
        correctIndex: 1,
        explanation: "Jigar inson tanasidagi eng yirik bez va eng katta ichki a'zodir (og'irligi taxminan 1.5 kg)."
      }
    ]
  },
  {
    id: "q-6",
    title: "Sun'iy Intellekt va Mashinaviy O'rganish Asoslari",
    subject: "Informatika",
    careerSlug: "ai-engineer",
    careerTitle: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    icon: "🤖",
    difficulty: "O'rtacha",
    timeLimitMinutes: 10,
    coinsReward: 45,
    xpReward: 65,
    questions: [
      {
        question: "Mashinaviy o'rganish (Machine Learning) nima?",
        options: [
          "Kompyuterning ma'lumotlar orqali mustaqil o'rganishi va xulosa chiqarishi",
          "Faqat matn terish dasturi",
          "Kompyuterni elektr tarmog'iga ulash usuli",
          "Monitor yorug'ligini sozlash"
        ],
        correctIndex: 0,
        explanation: "Mashinaviy o'rganish — bu sun'iy intellektning bo'limi bo'lib, kompyuter berilgan ma'lumotlar asosida mustaqil qonuniyatlarni topadi va o'rganadi."
      },
      {
        question: "Sun'iy neyrotarmoqlar tuzilishi nimadan ilhomlanib yaratilgan?",
        options: ["Inson miyasi va biologik neyronlaridan", "Avtomobil dvigatelidan", "Daraxt ildizidan", "Toshlarning joylashuvidan"],
        correctIndex: 0,
        explanation: "Sun'iy neyrotarmoqlar inson bosh miyasidagi biologik neyronlar va ular orasidagi sinapslar harakatiga taqlid qilib yaratilgan."
      },
      {
        question: "Sun'iy intellekt va ma'lumotlar bilan ishlashda eng ommabop dasturlash tili qaysi?",
        options: ["Python", "Pascal", "HTML", "BASIC"],
        correctIndex: 0,
        explanation: "Python o'zining qulay sintaksisi hamda Numpy, Pandas, PyTorch va TensorFlow kabi boy kutubxonalari tufayli AI sohasida 1-o'rinda turadi."
      }
    ]
  },
  {
    id: "q-7",
    title: "Web Dasturlash: Frontend va Zamonaviy JavaScript",
    subject: "Informatika",
    careerSlug: "software-engineer",
    careerTitle: "Dasturchi (Full-Stack Web Developer)",
    icon: "💻",
    difficulty: "O'rtacha",
    timeLimitMinutes: 10,
    coinsReward: 40,
    xpReward: 60,
    questions: [
      {
        question: "React kutubxonasida komponent (Component) nima?",
        options: [
          "Qayta ishlatiluvchi mustaqil interfeys bo'lagi (tugma, karta, menyu)",
          "Faqat CSS fayl",
          "Kompyuter protsessori",
          "Ma'lumotlar bazasi jadvali"
        ],
        correctIndex: 0,
        explanation: "Komponent — bu mustaqil, qayta ishlatiluvchi va o'z holatiga ega bo'lgan UI elementi hisoblanadi."
      },
      {
        question: "Server va brauzer o'rtasida ma'lumot almashish uchun qaysi format eng ko'p qo'llaniladi?",
        options: ["JSON (JavaScript Object Notation)", "MP3", "EXE", "DOCX"],
        correctIndex: 0,
        explanation: "JSON matnli, sodda va barcha tillar tushunadigan ma'lumot almashish standartidir."
      },
      {
        question: "DOM (Document Object Model) nima?",
        options: [
          "HTML hujjatining brauzer xotirasidagi ob'ektlar daraxti",
          "Internet tezligini o'lchovchi asbob",
          "Dasturlash tili",
          "Operatsion tizim"
        ],
        correctIndex: 0,
        explanation: "DOM — bu HTML elementlarini JavaScript orqali dinamik boshqarish imkonini beruvchi daraxtsimon tuzilmadir."
      }
    ]
  },
  {
    id: "q-8",
    title: "Tibbiyot va Inson Anatomiyasi Amaliyoti",
    subject: "Biologiya",
    careerSlug: "doctor-surgeon",
    careerTitle: "Shifokor va Jarroh (Doctor / Surgeon)",
    icon: "🩺",
    difficulty: "O'rtacha",
    timeLimitMinutes: 8,
    coinsReward: 35,
    xpReward: 50,
    questions: [
      {
        question: "Inson qonida kislorod tashuvchi qizil qon hujayralari qanday ataladi?",
        options: ["Eritrotsitlar", "Leykotsitlar", "Trombotsitlar", "Neyronlar"],
        correctIndex: 0,
        explanation: "Eritrotsitlar tarkibidagi gemoglobin oqsili o'pkadan to'qimalarga kislorod yetkazib beradi."
      },
      {
        question: "Inson yuragi necha kamerali tuzilishga ega?",
        options: ["4 kamerali (2 ta bo'lmacha, 2 ta qorincha)", "2 kamerali", "3 kamerali", "1 kamerali"],
        correctIndex: 0,
        explanation: "Inson yuragi 4 kamerali: o'ng va chap bo'lmacha hamda o'ng va chap qorinchadan iborat."
      },
      {
        question: "Suyaklarning mustahkam bo'lishi uchun qaysi mineral eng zarur?",
        options: ["Kalsiy (Ca)", "Temir (Fe)", "Yod (I)", "Xlor (Cl)"],
        correctIndex: 0,
        explanation: "Kalsiy va fosfor suyak to'qimasining asosiy qurilish materiali hisoblanadi."
      }
    ]
  },
  {
    id: "q-9",
    title: "Kiberxavfsizlik: Tizimlarni Himoyalash Asoslari",
    subject: "Informatika",
    careerSlug: "cyber-security",
    careerTitle: "Kiberxavfsizlik Mutaxassisi (Cybersecurity)",
    icon: "🛡️",
    difficulty: "Qiyin",
    timeLimitMinutes: 12,
    coinsReward: 50,
    xpReward: 75,
    questions: [
      {
        question: "Kiberxavfsizlikda 'Fishing' (Phishing) nimani anglatadi?",
        options: [
          "Soxta havolalar yoki xatlar orqali login va parollarni o'g'irlash",
          "Kompyuterni o'chirib qo'yish",
          "Internet tezligini oshirish",
          "Dastur kodini tozalash"
        ],
        correctIndex: 0,
        explanation: "Fishing — bu xakerlarning mashhur ijtimoiy muhandislik usuli bo'lib, soxta saytlar orqali foydalanuvchilarning maxfiy ma'lumotlarini o'g'irlashga qaratilgan."
      },
      {
        question: "Eng xavfsiz parol qaysi talablarga javob berishi kerak?",
        options: [
          "Kamida 12 ta belgi: katta-kichik harflar, raqamlar va maxsus belgilar (#, $, !)",
          "Faqat tug'ilgan yil",
          "12345678",
          "Faqat o'z ismi"
        ],
        correctIndex: 0,
        explanation: "Murakkab parol kamida 12 ta har xil registrli harf, raqam va maxsus belgilardan iborat bo'lishi shart."
      },
      {
        question: "Ikki bosqichli autentifikatsiya (2FA) nima uchun kerak?",
        options: [
          "Parol bilib olinganda ham qo'shimcha SMS yoki kod orqali hisobni himoyalash uchun",
          "Kompyuter xotirasini tejash uchun",
          "Ekran rangini chiroyli qilish uchun",
          "Faqat tezroq kirish uchun"
        ],
        correctIndex: 0,
        explanation: "2FA akkauntga paroldan tashqari yana ikkinchi tasdiqlovchi faktor (telefon kodi yoki ilova) qo'shib, xavfsizlikni 99% ga oshiradi."
      }
    ]
  },
  {
    id: "q-10",
    title: "Muhandislik va Fazoviy Geometriya Mashqlari",
    subject: "Fizika",
    careerSlug: "architect-designer",
    careerTitle: "Arxitektor va 3D Dizayner (Architect)",
    icon: "🏛️",
    difficulty: "O'rtacha",
    timeLimitMinutes: 10,
    coinsReward: 40,
    xpReward: 55,
    questions: [
      {
        question: "Bino va ko'priklarni qurishda eng mustahkam geometrik shakl qaysi?",
        options: ["Uchburchak", "Kvadrat", "Aylana", "Beshburchak"],
        correctIndex: 0,
        explanation: "Uchburchak shakli deformatsiyaga eng chidamli geometrik figura bo'lib, ko'priklar va bino karkaslarida 'ferma' sifatida qo'llaniladi."
      },
      {
        question: "3D modellashtirishda 'render' qilish nima?",
        options: [
          "3D modelga yorug'lik, soya va materiallar berib real tasvirga aylantirish",
          "Faylni o'chirish",
          "Klaviaturani tozalash",
          "Chizmani qog'ozga o'tkazish"
        ],
        correctIndex: 0,
        explanation: "Renderlash — bu kompyuter grafikasida 3D matematik modeldan fotorealistik yakuniy tasvir yaratish jarayonidir."
      }
    ]
  },
  {
    id: "q-11",
    title: "Kimyo: Moddalar Tuzilishi va Tibbiy Reaksiyalar",
    subject: "Kimyo",
    careerSlug: "doctor-surgeon",
    careerTitle: "Shifokor va Jarroh (Doctor / Surgeon)",
    icon: "🧪",
    difficulty: "O'rtacha",
    timeLimitMinutes: 9,
    coinsReward: 35,
    xpReward: 50,
    questions: [
      {
        question: "Suv molekulasining kimyoviy formulasi qaysi?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctIndex: 0,
        explanation: "Suv 2 ta vodorod va 1 ta kislorod atomidan (H2O) tashkil topgan."
      },
      {
        question: "Inson tanasidagi moddalar almashinuvida me'da shirasi kislotasi asosi nima?",
        options: ["Xlorid kislota (HCl)", "Sulfat kislota (H2SO4)", "Sirka kislota", "Fosfat kislota"],
        correctIndex: 0,
        explanation: "Oshqozon shirasidagi xlorid kislota (HCl) ovqat hazm bo'lishi va mikroblarni o'ldirishda hal qiluvchi rol o'ynaydi."
      }
    ]
  },
  {
    id: "q-12",
    title: "Ingliz Tili: Professional IT va Tech Terminology",
    subject: "Ingliz tili",
    careerSlug: "software-engineer",
    careerTitle: "Dasturchi (Full-Stack Web Developer)",
    icon: "🌍",
    difficulty: "O'rtacha",
    timeLimitMinutes: 8,
    coinsReward: 35,
    xpReward: 50,
    questions: [
      {
        question: "Dasturlashda 'Bug' (xato)ni tuzatish jarayoni nima deyiladi?",
        options: ["Debugging", "Refactoring", "Deploying", "Compiling"],
        correctIndex: 0,
        explanation: "'Debugging' — kod ichidagi xato va kamchiliklarni topib bartaraf etish demakdir."
      },
      {
        question: "'Open Source' iborasi dasturiy ta'minotda qanday ma'noni anglatadi?",
        options: ["Kodi ochiq va bepul foydalanish mumkin bo'lgan dastur", "Pullik dastur", "Faqat bir marta ishlaydigan dastur", "Xavfli virus"],
        correctIndex: 0,
        explanation: "'Open Source' — har qanday dasturchi o'rganishi va o'zgartirishi mumkin bo'lgan ochiq kodli dasturdir."
      }
    ]
  }
];

export const initialRewards = [
  {
    id: "r-1",
    title: "Oltin Daho Nishoni",
    description: "Profilingizda porlab turuvchi eksklyuziv oltin bilimdon belgisi.",
    cost: 100,
    category: "Nishon",
    icon: "🥇",
    badgeColor: "from-amber-400 to-yellow-600",
    popular: true
  },
  {
    id: "r-2",
    title: "AI Ustoz VIP Suhbat Huquqi",
    description: "Yoqimli AI ustozdan 24/7 shaxsiy tavsiyalar va dars tahlili.",
    cost: 150,
    category: "Imkoniyat",
    icon: "🧙‍♂️",
    badgeColor: "from-purple-500 to-indigo-600",
    popular: true
  },
  {
    id: "r-3",
    title: "Python Dasturlash Kitobi (PDF)",
    description: "O'quvchilar uchun sodda va qiziqarli dasturlash bo'yicha kitobcha.",
    cost: 120,
    category: "Kitob",
    icon: "📘",
    badgeColor: "from-blue-400 to-cyan-600",
    popular: false
  },
  {
    id: "r-4",
    title: "Eksklyuziv Kosmonavt Avatari",
    description: "Profilingiz uchun kosmik kiyimidagi ajoyib o'quvchi avatari.",
    cost: 80,
    category: "Avatar",
    icon: "👨‍🚀",
    badgeColor: "from-emerald-400 to-teal-600",
    popular: false
  },
  {
    id: "r-5",
    title: "Yosh Olim Sertifikati",
    description: "Platformani muvaffaqiyatli o'zlashtirganlik haqida maxsus raqamli sertifikat.",
    cost: 200,
    category: "Sertifikat",
    icon: "📜",
    badgeColor: "from-rose-400 to-pink-600",
    popular: true
  },
  {
    id: "r-6",
    title: "Super Mantiqchi Kubogi",
    description: "Mantiqiy savollarni eng ko'p yechgan o'quvchilar kubogi.",
    cost: 90,
    category: "Nishon",
    icon: "🏆",
    badgeColor: "from-yellow-400 to-orange-500",
    popular: false
  }
];

export const initialQuestions = [
  {
    id: "qna-1",
    title: "Dasturchi bo'lish uchun matematikani qanchalik chuqur bilish shart?",
    content: "Salom! Men 8-sinfda o'qiyman. Web-dasturchi bo'lmoqchiman, lekin ba'zida maktabdagi matematika qiyindek tuyuladi. Qaysi mavzularni ko'proq o'rganishim kerak?",
    subject: "Informatika",
    authorName: "Sardorbek",
    authorAvatar: "🚀",
    coinsBounty: 20,
    views: 142,
    solved: true,
    createdAt: new Date(Date.now() - 3600000 * 24),
    answers: [
      {
        authorName: "AI Ustoz Bilimdon",
        authorAvatar: "🤖",
        authorGrade: "Super AI Ustoz",
        content: "Salom Sardorbek! Ajoyib savol. Veb-dasturlash (HTML, CSS, JavaScript) boshlash uchun oddiy mantiqiy fikrlash va 4 amal kifoya qiladi! Keyinchalik algoritmlar, ma'lumotlar tuzilmasi yoki Sun'iy intellektga o'tganingda esa chiziqli algebra va ehtimollar nazariyasi kerak bo'ladi. Hozir asosiy e'tiboringni mantiqiy masalalarga qarat, qiyin formulalardan qo'rqma! Doimo olg'a! ✨",
        isAiAnswer: true,
        likes: 18,
        createdAt: new Date(Date.now() - 3600000 * 20)
      },
      {
        authorName: "Madina Aliyeva",
        authorAvatar: "👩‍🎓",
        authorGrade: "10-sinf",
        content: "O'zim ham 8-sinfda shunday o'ylardim. Ko'proq amaliy kod yozishni boshlasangiz, matematika o'z-o'zidan qiziq bo'lib qoladi!",
        isAiAnswer: false,
        likes: 7,
        createdAt: new Date(Date.now() - 3600000 * 12)
      }
    ]
  },
  {
    id: "qna-2",
    title: "Fizikada Nyuton olmaning tushishidan qanday qonun yaratgan?",
    content: "Darsda o'qituvchimiz gravitatsiya haqida gapirdilar. Nega Oy Yerga tushib ketmaydi, lekin olma tushadi?",
    subject: "Fizika",
    authorName: "Zuhraxon",
    authorAvatar: "🌟",
    coinsBounty: 15,
    views: 98,
    solved: false,
    createdAt: new Date(Date.now() - 3600000 * 10),
    answers: [
      {
        authorName: "AI Ustoz Bilimdon",
        authorAvatar: "🤖",
        authorGrade: "Super AI Ustoz",
        content: "Zuhraxon, juda chuqur va ajoyib savol! Aslida Oy ham har doim Yer tomonga 'tushmoqda', lekin uning aylanma tezligi juda yuqori (sekundiga 1 km)! Yer yumaloq bo'lgani sababli, Oy Yer sirtiga urilmasdan uning atrofida doimiy orbita bo'ylab aylanib turadi. Olmaning esa aylanma tezligi yo'q, shuning uchun u to'g'ri yerga tushadi!",
        isAiAnswer: true,
        likes: 12,
        createdAt: new Date(Date.now() - 3600000 * 8)
      }
    ]
  }
];

export const initialLeaderboard = [
  { id: "u-1", name: "Azizbek Rahimov", email: "azizbek@maktab.uz", avatar: "🦁", grade: "9-sinf", coins: 480, xp: 950, level: 6, league: "Olmos Liga", completedCount: 14, isBlocked: false, warningsCount: 0, selectedCareer: "Sun'iy Intellekt Muhandisi (AI Engineer)" },
  { id: "u-2", name: "Madina Aliyeva", email: "madina@maktab.uz", avatar: "👩‍🎓", grade: "10-sinf", coins: 410, xp: 820, level: 5, league: "Oltin Liga", completedCount: 12, isBlocked: false, warningsCount: 0, selectedCareer: "Shifokor va Jarroh (Doctor / Surgeon)" },
  { id: "u-3", name: "Jasur Mirzayev", email: "jasur@maktab.uz", avatar: "🚀", grade: "8-sinf", coins: 360, xp: 710, level: 5, league: "Oltin Liga", completedCount: 10, isBlocked: false, warningsCount: 1, selectedCareer: "Dasturchi (Full-Stack Web Developer)" },
  { id: "u-4", name: "Nilufar Qosimova", email: "nilufar@maktab.uz", avatar: "🌸", grade: "7-sinf", coins: 290, xp: 580, level: 4, league: "Kumush Liga", completedCount: 8, isBlocked: false, warningsCount: 0, selectedCareer: "Arxitektor va 3D Dizayner (Architect)" },
  { id: "u-5", name: "Temur Xoliqov", email: "temur@maktab.uz", avatar: "⚡", grade: "9-sinf", coins: 240, xp: 490, level: 3, league: "Kumush Liga", completedCount: 7, isBlocked: true, warningsCount: 2, selectedCareer: "Kiberxavfsizlik Mutaxassisi (Cybersecurity)" }
];

// Topshiriqlar (Assignments)
export const initialAssignments = [
  {
    id: "asn-1",
    title: "Pifagor teoremasi bo'yicha 5 ta amaliy masalani yechish",
    subject: "Matematika",
    description: "Darslikdagi 45-betdagi 1-5 gacha bo'lgan masalalarni daftarga chiroyli chizib, natijalarini yozing.",
    difficulty: "O'rtacha",
    coinsReward: 35,
    xpReward: 50,
    deadline: new Date(Date.now() + 86400000 * 3),
    submissionsCount: 18,
    status: "active"
  },
  {
    id: "asn-2",
    title: "HTML & CSS yordamida shaxsiy 'Portfolio' bosh sahifasini tuzish",
    subject: "Informatika",
    description: "Header, o'zingiz haqingizda ma'lumot va sevimli fanlaringiz aks etgan chiroyli web-sahifa kodi.",
    difficulty: "Qiyin",
    coinsReward: 50,
    xpReward: 80,
    deadline: new Date(Date.now() + 86400000 * 5),
    submissionsCount: 14,
    status: "active"
  },
  {
    id: "asn-3",
    title: "My Future Career in 100 words (Ingliz tilida insho)",
    subject: "Ingliz tili",
    description: "Kelajakda qaysi kasb egasi bo'lmoqchi ekanligingiz haqida Present Continuous va Future Simple ishlatib yozing.",
    difficulty: "Oson",
    coinsReward: 25,
    xpReward: 35,
    deadline: new Date(Date.now() + 86400000 * 2),
    submissionsCount: 24,
    status: "active"
  }
];

// To'lovlar (Payments)
export const initialPayments = [
  {
    id: "pay-101",
    studentName: "Azizbek Rahimov",
    studentEmail: "azizbek@maktab.uz",
    planName: "Olim Pro (Oylik)",
    amount: 49000,
    paymentMethod: "Payme",
    status: "Muvaffaqiyatli",
    transactionId: "TXN-8849204",
    createdAt: new Date(Date.now() - 3600000 * 12)
  },
  {
    id: "pay-102",
    studentName: "Madina Aliyeva",
    studentEmail: "madina@maktab.uz",
    planName: "Premium Yillik",
    amount: 390000,
    paymentMethod: "Click",
    status: "Muvaffaqiyatli",
    transactionId: "TXN-7738291",
    createdAt: new Date(Date.now() - 3600000 * 28)
  },
  {
    id: "pay-103",
    studentName: "Jasur Mirzayev",
    studentEmail: "jasur@maktab.uz",
    planName: "Boshlang'ich Kurs Paketi",
    amount: 29000,
    paymentMethod: "Uzum",
    status: "Kutilmoqda",
    transactionId: "TXN-1192834",
    createdAt: new Date(Date.now() - 3600000 * 4)
  }
];

// Bildirishnomalar (Announcements / Notifications)
export const initialNotifications = [
  {
    id: "ntf-1",
    title: "Respublika Yosh Dasturchilar bellashuvi boshlandi! 💻🏆",
    message: "Barcha informatika ixlosmandlari uchun 1000 Coin mukofotli katta sinov testlari platformaga yuklandi!",
    type: "contest",
    icon: "🏆",
    targetGrade: "Barchasi",
    createdAt: new Date(Date.now() - 3600000 * 5)
  },
  {
    id: "ntf-2",
    title: "Yangi fan bo'limi: Robototexnika va Sun'iy Intellekt!",
    message: "Endi sun'iy intellekt muhandisligi bo'yicha amaliy topshiriqlarni ham bajarishingiz mumkin.",
    type: "news",
    icon: "🤖",
    targetGrade: "8-11 sinflar",
    createdAt: new Date(Date.now() - 3600000 * 48)
  }
];

// Xavfsizlik Audit Jurnali (Audit Logs)
export const initialAuditLogs = [
  {
    id: "log-1",
    adminName: "Bosh Admin (SuperAdmin)",
    action: "Yangi test yaratildi",
    target: "Informatika va Dasturlash Asoslari",
    details: "4 ta yangi savol va AI tushuntirishlari qo'shildi",
    ip: "127.0.0.1",
    createdAt: new Date(Date.now() - 3600000 * 3)
  },
  {
    id: "log-2",
    adminName: "Bosh Admin (SuperAdmin)",
    action: "O'quvchiga Coin berildi",
    target: "Azizbek Rahimov (+50 Coin)",
    details: "Haftalik faollik va 1-o'rin sovg'asi",
    ip: "127.0.0.1",
    createdAt: new Date(Date.now() - 3600000 * 8)
  },
  {
    id: "log-3",
    adminName: "Bosh Admin (SuperAdmin)",
    action: "Foydalanuvchi bloklandi",
    target: "Temur Xoliqov",
    details: "Chatda noo'rin xabarlar yozgani sababli",
    ip: "127.0.0.1",
    createdAt: new Date(Date.now() - 3600000 * 20)
  }
];

// AI Ustoz ko'rsatkichlari (AI Tutor Stats & Settings)
export const initialAiSettings = {
  modelName: "Bilimdon AI Tutor v2.4 (O'zbekcha O'quvchi Rag'batlantiruvchi)",
  temperature: 0.7,
  maxDailyRequestsPerStudent: 100,
  totalQueriesAnswered: 1482,
  averageResponseTimeSec: 0.8,
  satisfactionRating: 98.4, // %
  personalityTone: "Do'stona, samimiy, rag'batlantiruvchi, bolalarga mos sodda analogiyalar",
  voiceEnabled: true
};
