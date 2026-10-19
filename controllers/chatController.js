// Kasb bo'yicha maxsus chat xonalari boshqaruvi
let chatRoomsStore = {
  'ai-engineer': {
    careerTitle: "Sun'iy Intellekt Muhandisi (AI Engineer)",
    icon: "🤖",
    color: "from-blue-600 to-indigo-600",
    description: "Sunʼiy intellekt, neyrotarmoqlar va aqlli tizimlar boʻyicha oʻquvchilar va mentorlar muloqot xonasi",
    messages: [
      {
        id: "msg-ai-1",
        senderName: "Azizbek Rahimov",
        senderAvatar: "🦁",
        senderRole: "Oʻquvchi (9-sinf)",
        text: "Assalomu alaykum barchaga! Python'da birinchi sodda neyrotarmoq modelimni o'rgatdim! 🚀",
        time: "10:15",
        isPinned: false
      },
      {
        id: "msg-ai-2",
        senderName: "Jasurbek Aliyev",
        senderAvatar: "🧑‍💻",
        senderRole: "Oʻquvchi (10-sinf)",
        text: "Ajoyib Azizbek! Qaysi datasetdan foydalanding? MNIST raqamlarinimi?",
        time: "10:18",
        isPinned: false
      },
      {
        id: "msg-ai-3",
        senderName: "Azizbek Rahimov",
        senderAvatar: "🦁",
        senderRole: "Oʻquvchi (9-sinf)",
        text: "Ha, MNIST qo'lyozma raqamlarini 98% aniqlikda taniyapti! Keyingisi NLP bo'ladi.",
        time: "10:20",
        isPinned: false
      },
      {
        id: "msg-ai-4",
        senderName: "Bosh Administrator",
        senderAvatar: "🛡️",
        senderRole: "Admin / Mentor",
        text: "Barakalla yosh olimlar! Ertaga soat 16:00 da AI kasbiy amaliyoti bo'yicha yangi master-klass va sovrinli viktorina bo'ladi! Qatnashishni unutmang. ✨",
        time: "10:30",
        isPinned: true
      }
    ]
  },
  'software-engineer': {
    careerTitle: "Dasturchi (Full-Stack Web Developer)",
    icon: "💻",
    color: "from-violet-600 to-purple-600",
    description: "Web dasturlash, frontend, backend va JavaScript boʻyicha dasturchilar hamjamiyati",
    messages: [
      {
        id: "msg-sw-1",
        senderName: "Madina Rahimova",
        senderAvatar: "👩‍🎓",
        senderRole: "Oʻquvchi (6-sinf)",
        text: "Salom dasturchilar! React'da useState bilan useEffect qanday ishlashini kim yaxshi tushuntirib bera oladi?",
        time: "09:30",
        isPinned: false
      },
      {
        id: "msg-sw-2",
        senderName: "Sardorbek",
        senderAvatar: "👨‍💻",
        senderRole: "Oʻquvchi (8-sinf)",
        text: "Salom Madina! useState bu ma'lumotni saqlab turuvchi quti, useEffect esa sahifa yuklanganda yoki o'sha ma'lumot o'zgarganda ishga tushadigan reaksiyadir.",
        time: "09:35",
        isPinned: false
      },
      {
        id: "msg-sw-3",
        senderName: "Madina Rahimova",
        senderAvatar: "👩‍🎓",
        senderRole: "Oʻquvchi (6-sinf)",
        text: "Katta rahmat Sardorbek! Endi o'z loyihamda sinab ko'raman! 🎉",
        time: "09:40",
        isPinned: false
      }
    ]
  },
  'doctor-surgeon': {
    careerTitle: "Shifokor va Jarroh (Doctor / Surgeon)",
    icon: "🩺",
    color: "from-emerald-600 to-teal-600",
    description: "Inson anatomiyasi, biologiya va kelajak tibbiyotiga qiziquvchi oʻquvchilar xonasi",
    messages: [
      {
        id: "msg-doc-1",
        senderName: "Shahlo Karimova",
        senderAvatar: "👩‍⚕️",
        senderRole: "Oʻquvchi (9-sinf)",
        text: "Assalomu alaykum! Biologiyadan inson qon aylanish tizimi bo'yicha kimda qisqa eslatma bor?",
        time: "11:05",
        isPinned: false
      },
      {
        id: "msg-doc-2",
        senderName: "Shahzod Mirzayev",
        senderAvatar: "👨‍⚕️",
        senderRole: "Oʻquvchi (10-sinf)",
        text: "Kichik qon aylanish doirasi o'ng qorinchadan boshlanib o'pkaga boradi va kislorodga to'yinib chap bo'lmachaga qaytadi. Katta doira esa chap qorinchadan butun tanaga tarqaladi!",
        time: "11:12",
        isPinned: false
      }
    ]
  },
  'cyber-security': {
    careerTitle: "Kiberxavfsizlik Mutaxassisi (Cybersecurity)",
    icon: "🛡️",
    color: "from-amber-600 to-rose-600",
    description: "Tizimlar xavfsizligi, shifrlash va xakerlikdan himoyalanish boʻyicha yosh mutaxassislar chati",
    messages: [
      {
        id: "msg-cs-1",
        senderName: "Kamron Rustamov",
        senderAvatar: "🥷",
        senderRole: "Oʻquvchi (9-sinf)",
        text: "Salom do'stlar! Parollarni shifrlashda nima uchun oddiy MD5 emas, bcrypt yoki Argon2 algoritmlari ishlatiladi?",
        time: "10:50",
        isPinned: false
      },
      {
        id: "msg-cs-2",
        senderName: "Bosh Administrator",
        senderAvatar: "🛡️",
        senderRole: "Admin / Kiberxavfsizlik Mutaxassisi",
        text: "Juda yaxshi savol Kamron! MD5 juda tez hisoblangani uchun xakerlar uni rainbow table yordamida tez ochib tashlaydi. Bcrypt esa 'salt' qo'shib ataylab sekinlashtiriladi.",
        time: "10:55",
        isPinned: true
      }
    ]
  },
  'architect-designer': {
    careerTitle: "Arxitektor va 3D Dizayner (Architect)",
    icon: "🏛️",
    color: "from-rose-600 to-pink-600",
    description: "Kelajak shaharlari, fazoviy chizmalar va 3D modellashtirish ijodkorlari chati",
    messages: [
      {
        id: "msg-ar-1",
        senderName: "Lobar Ergasheva",
        senderAvatar: "🎨",
        senderRole: "Oʻquvchi (8-sinf)",
        text: "Blender dasturida birinchi zamonaviy eko-uy modelimni tugatdim! Chiroqlar va oynalar juda chiroyli chiqdi.",
        time: "11:25",
        isPinned: false
      },
      {
        id: "msg-ar-2",
        senderName: "Bobur Tursunov",
        senderAvatar: "📐",
        senderRole: "Oʻquvchi (9-sinf)",
        text: "Zo'r Lobar! Quyosh panellarini ham loyihaga qo'shdingizmi? Eko-arxitekturada juda muhim.",
        time: "11:29",
        isPinned: false
      }
    ]
  }
};

// Kasb nomidan slugni aniqlash yordamchisi
const resolveSlug = (careerIdentifier) => {
  if (!careerIdentifier) return 'ai-engineer';
  const lower = careerIdentifier.toLowerCase();
  if (lower.includes('intellekt') || lower.includes('ai')) return 'ai-engineer';
  if (lower.includes('dastur') || lower.includes('web') || lower.includes('software')) return 'software-engineer';
  if (lower.includes('shifokor') || lower.includes('doctor') || lower.includes('jarroh')) return 'doctor-surgeon';
  if (lower.includes('kiber') || lower.includes('cyber') || lower.includes('xavfsizlik')) return 'cyber-security';
  if (lower.includes('arxitekt') || lower.includes('dizayn') || lower.includes('architect')) return 'architect-designer';
  return 'ai-engineer';
};

// 1. O'quvchi uchun: faqat o'zining kasb chati xabarlarini olish
export const getCareerChat = async (req, res) => {
  try {
    const { careerSlug } = req.params;
    const slug = resolveSlug(careerSlug);
    const room = chatRoomsStore[slug] || chatRoomsStore['ai-engineer'];

    res.json({
      success: true,
      data: {
        slug,
        careerTitle: room.careerTitle,
        icon: room.icon,
        color: room.color,
        description: room.description,
        totalMessages: room.messages.length,
        messages: room.messages
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Chat xabarlarini yuklashda xatolik" });
  }
};

// 2. Yangi xabar yuborish (O'quvchi yoki Admin)
export const sendChatMessage = async (req, res) => {
  try {
    const { careerSlug } = req.params;
    const { text, senderName, senderAvatar, senderRole } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Xabar matni bo'sh bo'lishi mumkin emas" });
    }

    const slug = resolveSlug(careerSlug);
    if (!chatRoomsStore[slug]) {
      chatRoomsStore[slug] = {
        careerTitle: "Kasbiy Hamjamiyat",
        icon: "💬",
        color: "from-blue-600 to-indigo-600",
        description: "O'quvchilar muloqot xonasi",
        messages: []
      };
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const newMsg = {
      id: `msg-${Date.now()}`,
      senderName: senderName || req.user?.name || "Oʻquvchi",
      senderAvatar: senderAvatar || req.user?.avatar || "🦁",
      senderRole: senderRole || "Oʻquvchi",
      text: text.trim(),
      time: timeStr,
      isPinned: false
    };

    chatRoomsStore[slug].messages.push(newMsg);

    res.json({
      success: true,
      message: "Xabar yuborildi",
      data: newMsg
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xabar yuborishda xatolik" });
  }
};

// 3. Admin uchun: BARCHA kasb chatlarini ro'yxati va monitoringi
export const getAllRoomsAdmin = async (req, res) => {
  try {
    const roomsSummary = Object.entries(chatRoomsStore).map(([slug, room]) => {
      const lastMsg = room.messages[room.messages.length - 1] || null;
      return {
        slug,
        careerTitle: room.careerTitle,
        icon: room.icon,
        color: room.color,
        description: room.description,
        totalMessages: room.messages.length,
        lastMessage: lastMsg ? {
          text: lastMsg.text,
          senderName: lastMsg.senderName,
          time: lastMsg.time
        } : null,
        messages: room.messages
      };
    });

    res.json({
      success: true,
      count: roomsSummary.length,
      data: roomsSummary
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Admin chatlarini yuklashda xatolik" });
  }
};

// 4. Admin uchun: Noo'rin xabarni o'chirish
export const deleteChatMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    let deleted = false;
    Object.values(chatRoomsStore).forEach(room => {
      const idx = room.messages.findIndex(m => m.id === messageId);
      if (idx !== -1) {
        room.messages.splice(idx, 1);
        deleted = true;
      }
    });

    if (deleted) {
      res.json({ success: true, message: "Noo'rin xabar muvaffaqiyatli o'chirildi" });
    } else {
      res.status(404).json({ success: false, message: "Xabar topilmadi" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Xabarni o'chirishda xatolik" });
  }
};
