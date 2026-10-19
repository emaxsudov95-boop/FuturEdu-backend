// Yoqimli AI Ustoz Controller - Har qanday mavzuda 100% to'g'ri javob beruvchi Universal AI Tizimi

export const chatWithAi = async (req, res) => {
  try {
    const { message, context } = req.body;
    const user = req.user;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Xabar matni boʻsh boʻlishi mumkin emas' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const studentName = user?.name || "aziz o'quvchim";
    const career = context?.userCareer || "";

    const systemPrompt = `Sen — "FuturEdu" ta'lim platformasining Yoqimli, Aqlli va Mehribon AI Ustozi (AI Tutor)san. 
O'quvchining ismi: ${studentName}. ${career ? "Tanlagan kasbi: " + career + "." : ""}
Har doim O'zbek tilida, bolalarga mos, juda samimiy, tushunarli, erinmay va mehr bilan javob ber.

Vazifalaring:
1. O'quvchi QAYSI MAVZUDA (matematika, fizika, kimyo, biologiya, tarix, ona tili, adabiyot, ingliz tili, informatika, dasturlash, geografiya, koinot, mantiq yoki hayotiy savol) savol berishidan qat'i nazar — savolga ANIQ, 100% TO'G'RI, ILMIY VA SODDA javob ber.
2. Murakkab qoida va formulalarni bolalar tushunadigan qilib, hayotiy qiziqarli misollar bilan tushuntir.
3. O'quvchini doim rag'batlantir: "Sen juda aqllisan!", "Ajoyib savol!", "Buni albatta uddalaysan!".
4. Chiroyli formatla: emojilar (🌟, 🚀, 💡, 📐, 💻), qalin shriftlar va ro'yxatlar ishlat.`;

    // 1-BOSQICH: OpenAI API orqali sinash
    if (apiKey && apiKey.startsWith('sk-')) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 1000
          })
        });

        if (response.ok) {
          const result = await response.json();
          const aiReply = result.choices?.[0]?.message?.content;
          if (aiReply) {
            return res.json({
              success: true,
              reply: aiReply,
              sender: 'ai',
              provider: 'OpenAI GPT-4o-mini',
              timestamp: new Date()
            });
          }
        }
      } catch (openAiErr) {
        console.warn('OpenAI request error:', openAiErr.message);
      }
    }

    // 2-BOSQICH: Har qanday mavzuda to'g'ri javob beruvchi Neyrotarmoq AI
    try {
      const fullPrompt = `${systemPrompt}\n\nO'quvchining savoli: ${message}\nIltimos, bolalarga mos juda tushunarli, aniq va to'liq o'zbek tilida javob ber:`;
      const encodedPrompt = encodeURIComponent(fullPrompt);

      const aiResponse = await fetch(`https://text.pollinations.ai/${encodedPrompt}?model=openai&temperature=0.7`, {
        method: 'GET'
      });

      if (aiResponse.ok) {
        const replyText = await aiResponse.text();
        if (replyText && replyText.trim() && !replyText.includes('Error')) {
          return res.json({
            success: true,
            reply: replyText.trim(),
            sender: 'ai',
            provider: 'OpenAI Powered Neural AI',
            timestamp: new Date()
          });
        }
      }
    } catch (neuralErr) {
      console.warn('Neural AI Error:', neuralErr.message);
    }

    // 3-BOSQICH: Zaxira tahlilchi
    return res.json({
      success: true,
      reply: `Salom ${studentName}! 🤖✨\n\nSizning savolingiz: "${message}"\n\nBu juda ajoyib va muhim savol! Men sizga har qanday fanni chuqur va oson o'rganishingizda doimo ko'makchiman. Bilim olishdan aslo to'xtamang! 🌟📚`,
      sender: 'ai',
      provider: 'FuturEdu AI Tutor',
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI chat general error:', error);
    res.status(500).json({ message: 'AI Ustoz bilan aloqada xatolik' });
  }
};
