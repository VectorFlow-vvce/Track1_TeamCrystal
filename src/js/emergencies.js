// ===== Emergency Data — 12 Types, Bilingual, Stitch Design Icons =====
const EMERGENCIES = [
  {
    id: "snake-bite",
    icon: "dangerous",
    bgColor: "#FFF7ED",
    iconColor: "#EA580C",
    title: { en: "Snake Bite", hi: "सांप का काटना" },
    steps: [
      { en: "Keep the person calm and still. Movement spreads venom faster.", hi: "व्यक्ति को शांत और स्थिर रखें। हिलने से ज़हर तेज़ी से फैलता है।" },
      { en: "Remove any rings, watches, or tight clothing near the bite before swelling starts.", hi: "सूजन शुरू होने से पहले काटने के पास की अंगूठी, घड़ी या तंग कपड़े हटा दें।" },
      { en: "Keep the bitten limb below heart level.", hi: "काटे गए अंग को हृदय के स्तर से नीचे रखें।" },
      { en: "Cover the bite with a clean, dry bandage.", hi: "काटने की जगह को साफ, सूखी पट्टी से ढकें।" },
      { en: "Get to a hospital immediately for anti-venom.", hi: "एंटी-वेनम के लिए तुरंत अस्पताल जाएं।" }
    ],
    dos: [
      { en: "Keep the person calm and immobile", hi: "व्यक्ति को शांत और स्थिर रखें" },
      { en: "Note the time of the bite", hi: "काटने का समय नोट करें" },
      { en: "Remove jewelry near bite area", hi: "काटने के पास के गहने हटाएं" }
    ],
    donts: [
      { en: "Do NOT cut the wound or try to suck out venom", hi: "घाव को काटें नहीं या ज़हर चूसने की कोशिश न करें" },
      { en: "Do NOT apply a tourniquet", hi: "टूर्निकेट न लगाएं" },
      { en: "Do NOT apply ice or cold packs", hi: "बर्फ या ठंडी पट्टी न लगाएं" }
    ]
  },
  {
    id: "seizure",
    icon: "psychology",
    bgColor: "#F3E8FF",
    iconColor: "#9333EA",
    title: { en: "Seizure", hi: "दौरा/मिर्गी" },
    steps: [
      { en: "Clear the area around the person of hard or sharp objects.", hi: "व्यक्ति के आसपास से कठोर या नुकीली वस्तुएं हटाएं।" },
      { en: "Place something soft under their head.", hi: "उनके सिर के नीचे कुछ नरम रखें।" },
      { en: "Turn them gently onto their side (recovery position).", hi: "उन्हें धीरे से करवट पर लिटाएं (रिकवरी पोज़िशन)।" },
      { en: "Time the seizure. If it lasts more than 5 minutes, call 108.", hi: "दौरे का समय नोट करें। 5 मिनट से ज़्यादा हो तो 108 पर कॉल करें।" },
      { en: "Stay with them until they are fully conscious.", hi: "पूरी तरह होश आने तक उनके साथ रहें।" }
    ],
    dos: [
      { en: "Protect their head", hi: "उनके सिर की रक्षा करें" },
      { en: "Time the seizure", hi: "दौरे का समय नोट करें" },
      { en: "Turn on side after seizure stops", hi: "दौरा रुकने के बाद करवट पर लिटाएं" }
    ],
    donts: [
      { en: "Do NOT hold them down or restrain them", hi: "उन्हें दबाकर या रोककर न रखें" },
      { en: "Do NOT put anything in their mouth", hi: "उनके मुंह में कुछ भी न डालें" },
      { en: "Do NOT tilt the head back", hi: "सिर को पीछे न झुकाएं" }
    ]
  },
  {
    id: "choking",
    icon: "air",
    bgColor: "#EFF6FF",
    iconColor: "#2563EB",
    title: { en: "Choking", hi: "गला घुटना" },
    steps: [
      { en: "Ask 'Are you choking?' If they cannot speak or cough, act immediately.", hi: "'क्या आपका गला घुट रहा है?' अगर बोल या खांस नहीं सकते, तुरंत कार्रवाई करें।" },
      { en: "Stand behind the person. Wrap your arms around their waist.", hi: "व्यक्ति के पीछे खड़े हों। अपनी बाहें उनकी कमर के चारों ओर लपेटें।" },
      { en: "Make a fist with one hand, place it above the navel.", hi: "एक हाथ की मुट्ठी बनाएं, नाभि के ऊपर रखें।" },
      { en: "Give quick upward thrusts (Heimlich maneuver). Repeat until object comes out.", hi: "तेज़ ऊपर की ओर धक्के दें (हेमलिक मैन्यूवर)। वस्तु निकलने तक दोहराएं।" },
      { en: "If person becomes unconscious, lower them to ground and begin CPR.", hi: "अगर व्यक्ति बेहोश हो जाए, ज़मीन पर लिटाएं और CPR शुरू करें।" }
    ],
    dos: [
      { en: "Encourage coughing if they can", hi: "अगर खांस सकते हैं तो खांसने के लिए प्रोत्साहित करें" },
      { en: "Use back blows + abdominal thrusts", hi: "पीठ पर थपकी + पेट पर धक्के दें" }
    ],
    donts: [
      { en: "Do NOT put fingers in the mouth blindly", hi: "अंधाधुंध मुंह में उंगली न डालें" },
      { en: "Do NOT give water to drink", hi: "पानी पीने को न दें" }
    ]
  },
  {
    id: "burns",
    icon: "local_fire_department",
    bgColor: "#FEF2F2",
    iconColor: "#DC2626",
    title: { en: "Burns", hi: "जलना" },
    steps: [
      { en: "Cool the burn under cool (not cold) running water for at least 10 minutes.", hi: "जले हुए हिस्से को कम से कम 10 मिनट तक ठंडे (बर्फीले नहीं) बहते पानी में रखें।" },
      { en: "Remove clothing and jewelry near the burn, unless stuck to skin.", hi: "जले के पास के कपड़े और गहने हटाएं, जब तक कि त्वचा से चिपके न हों।" },
      { en: "Cover with a clean, non-fluffy material like cling film or clean cloth.", hi: "साफ, गैर-रोएंदार सामग्री जैसे क्लिंग फिल्म या साफ कपड़े से ढकें।" },
      { en: "Do not break any blisters that form.", hi: "बनने वाले किसी भी छाले को न फोड़ें।" },
      { en: "Seek medical help for burns larger than your palm.", hi: "हथेली से बड़े जलने पर चिकित्सा सहायता लें।" }
    ],
    dos: [
      { en: "Cool with running water for 10+ minutes", hi: "10+ मिनट तक बहते पानी से ठंडा करें" },
      { en: "Cover loosely with clean material", hi: "साफ सामग्री से ढीला ढकें" }
    ],
    donts: [
      { en: "Do NOT apply toothpaste, butter, or oil", hi: "टूथपेस्ट, मक्खन या तेल न लगाएं" },
      { en: "Do NOT use ice directly on the burn", hi: "जले पर सीधे बर्फ का उपयोग न करें" },
      { en: "Do NOT break blisters", hi: "छालों को न फोड़ें" }
    ]
  },
  {
    id: "heart-attack",
    icon: "heart_broken",
    bgColor: "#FFF1F2",
    iconColor: "#E11D48",
    title: { en: "Heart Attack", hi: "दिल का दौरा" },
    steps: [
      { en: "Call 108 immediately. Every minute matters.", hi: "तुरंत 108 पर कॉल करें। हर मिनट मायने रखता है।" },
      { en: "Have the person sit down and rest in a comfortable position.", hi: "व्यक्ति को बैठाकर आरामदायक स्थिति में रखें।" },
      { en: "If available, give one aspirin (325mg) to chew slowly.", hi: "अगर उपलब्ध हो, एक एस्पिरिन (325mg) धीरे-धीरे चबाने को दें।" },
      { en: "Loosen any tight clothing around chest and neck.", hi: "छाती और गर्दन के आसपास के तंग कपड़े ढीले करें।" },
      { en: "If person becomes unconscious and stops breathing, begin CPR.", hi: "अगर व्यक्ति बेहोश हो जाए और सांस रुक जाए, तो CPR शुरू करें।" }
    ],
    dos: [
      { en: "Call 108 immediately", hi: "तुरंत 108 पर कॉल करें" },
      { en: "Give aspirin if available", hi: "अगर उपलब्ध हो तो एस्पिरिन दें" },
      { en: "Keep the person calm", hi: "व्यक्ति को शांत रखें" }
    ],
    donts: [
      { en: "Do NOT let the person walk or exert themselves", hi: "व्यक्ति को चलने या मेहनत न करने दें" },
      { en: "Do NOT ignore chest pain as 'gas'", hi: "सीने के दर्द को 'गैस' समझकर अनदेखा न करें" },
      { en: "Do NOT give water if person is unconscious", hi: "बेहोश व्यक्ति को पानी न दें" }
    ]
  },
  {
    id: "drowning",
    icon: "waves",
    bgColor: "#ECFEFF",
    iconColor: "#0891B2",
    title: { en: "Drowning", hi: "डूबना" },
    steps: [
      { en: "Get the person out of water safely. Do not put yourself at risk.", hi: "व्यक्ति को सुरक्षित रूप से पानी से बाहर निकालें। खुद को खतरे में न डालें।" },
      { en: "Call 108 immediately.", hi: "तुरंत 108 पर कॉल करें।" },
      { en: "Check if they are breathing. If not, begin CPR immediately.", hi: "जांचें कि क्या वे सांस ले रहे हैं। अगर नहीं, तुरंत CPR शुरू करें।" },
      { en: "If breathing, place in recovery position (on their side).", hi: "अगर सांस ले रहे हैं, रिकवरी पोज़िशन में रखें (करवट पर)।" },
      { en: "Keep them warm with a blanket or dry clothes.", hi: "कंबल या सूखे कपड़ों से गर्म रखें।" }
    ],
    dos: [
      { en: "Start CPR if not breathing", hi: "सांस न हो तो CPR शुरू करें" },
      { en: "Keep them warm", hi: "उन्हें गर्म रखें" }
    ],
    donts: [
      { en: "Do NOT try to drain water from lungs", hi: "फेफड़ों से पानी निकालने की कोशिश न करें" },
      { en: "Do NOT leave them alone", hi: "उन्हें अकेला न छोड़ें" }
    ]
  },
  {
    id: "fracture",
    icon: "skeleton",
    bgColor: "#F8FAFC",
    iconColor: "#475569",
    title: { en: "Fracture", hi: "हड्डी टूटना" },
    steps: [
      { en: "Do not move the injured area. Keep it as still as possible.", hi: "चोटिल हिस्से को हिलाएं नहीं। जितना हो सके स्थिर रखें।" },
      { en: "Apply a splint using stiff material (stick, cardboard) padded with cloth.", hi: "कठोर सामग्री (छड़ी, गत्ता) से कपड़े की गद्दी लगाकर स्प्लिंट लगाएं।" },
      { en: "Apply ice wrapped in cloth to reduce swelling (20 min on, 20 min off).", hi: "सूजन कम करने के लिए कपड़े में लपेटी बर्फ लगाएं (20 मिनट लगाएं, 20 मिनट हटाएं)।" },
      { en: "Elevate the injured limb if possible.", hi: "अगर संभव हो तो चोटिल अंग को ऊपर उठाएं।" },
      { en: "Get to a hospital for X-ray and proper treatment.", hi: "एक्स-रे और उचित उपचार के लिए अस्पताल जाएं।" }
    ],
    dos: [
      { en: "Immobilize the area", hi: "हिस्से को स्थिर करें" },
      { en: "Use a padded splint", hi: "गद्दीदार स्प्लिंट का उपयोग करें" }
    ],
    donts: [
      { en: "Do NOT try to straighten the bone", hi: "हड्डी को सीधा करने की कोशिश न करें" },
      { en: "Do NOT move the person unnecessarily", hi: "व्यक्ति को अनावश्यक रूप से न हिलाएं" }
    ]
  },
  {
    id: "severe-bleeding",
    icon: "blood_pressure",
    bgColor: "#FEF2F2",
    iconColor: "#B91C1C",
    title: { en: "Severe Bleeding", hi: "गंभीर रक्तस्राव" },
    steps: [
      { en: "Apply firm, direct pressure on the wound with a clean cloth.", hi: "साफ कपड़े से घाव पर सीधा मजबूत दबाव लगाएं।" },
      { en: "Do not remove the cloth. If soaked, add more layers on top.", hi: "कपड़ा न हटाएं। अगर भीग जाए, ऊपर और परतें लगाएं।" },
      { en: "If possible, elevate the bleeding area above the heart.", hi: "अगर संभव हो, रक्तस्राव वाले हिस्से को हृदय से ऊपर उठाएं।" },
      { en: "Keep the person lying down and warm.", hi: "व्यक्ति को लिटाकर गर्म रखें।" },
      { en: "Call 108 if bleeding does not stop in 10 minutes.", hi: "अगर 10 मिनट में खून न रुके तो 108 पर कॉल करें।" }
    ],
    dos: [
      { en: "Apply direct pressure continuously", hi: "लगातार सीधा दबाव लगाएं" },
      { en: "Keep the person warm and calm", hi: "व्यक्ति को गर्म और शांत रखें" }
    ],
    donts: [
      { en: "Do NOT remove blood-soaked bandages", hi: "खून से भीगी पट्टियां न हटाएं" },
      { en: "Do NOT apply a tourniquet unless trained", hi: "प्रशिक्षित न हों तो टूर्निकेट न लगाएं" }
    ]
  },
  {
    id: "unconscious",
    icon: "bed",
    bgColor: "#EEF2FF",
    iconColor: "#4F46E5",
    title: { en: "Unconscious Person", hi: "बेहोश व्यक्ति" },
    steps: [
      { en: "Check if the person is responsive — tap shoulders and shout.", hi: "जांचें कि व्यक्ति प्रतिक्रिया दे रहा है — कंधे थपथपाएं और ज़ोर से बोलें।" },
      { en: "Call 108 immediately.", hi: "तुरंत 108 पर कॉल करें।" },
      { en: "Check breathing — look, listen, feel for 10 seconds.", hi: "सांस जांचें — 10 सेकंड तक देखें, सुनें, महसूस करें।" },
      { en: "If breathing, place in recovery position (on their side).", hi: "अगर सांस ले रहे हैं, रिकवरी पोज़िशन में रखें (करवट पर)।" },
      { en: "If not breathing, begin CPR: 30 chest compressions, 2 breaths.", hi: "अगर सांस नहीं, CPR शुरू करें: 30 छाती दबाव, 2 सांसें।" }
    ],
    dos: [
      { en: "Check airway and breathing first", hi: "पहले वायुमार्ग और सांस जांचें" },
      { en: "Place in recovery position if breathing", hi: "सांस हो तो रिकवरी पोज़िशन में रखें" }
    ],
    donts: [
      { en: "Do NOT give food or water", hi: "खाना या पानी न दें" },
      { en: "Do NOT slap or throw water on face", hi: "थप्पड़ न मारें या चेहरे पर पानी न फेंकें" }
    ]
  },
  {
    id: "electric-shock",
    icon: "bolt",
    bgColor: "#FEFCE8",
    iconColor: "#CA8A04",
    title: { en: "Electric Shock", hi: "बिजली का झटका" },
    steps: [
      { en: "Do NOT touch the person if they are still in contact with the electrical source.", hi: "अगर व्यक्ति अभी भी बिजली के स्रोत के संपर्क में है तो उन्हें न छुएं।" },
      { en: "Turn off the power source or use a dry non-conducting object to separate them.", hi: "बिजली का स्रोत बंद करें या सूखी गैर-चालक वस्तु से अलग करें।" },
      { en: "Call 108 immediately.", hi: "तुरंत 108 पर कॉल करें।" },
      { en: "Check breathing and pulse. Begin CPR if needed.", hi: "सांस और नब्ज़ जांचें। ज़रूरत हो तो CPR शुरू करें।" },
      { en: "Cover any burns with a clean dry cloth.", hi: "किसी भी जले को साफ सूखे कपड़े से ढकें।" }
    ],
    dos: [
      { en: "Turn off power first", hi: "पहले बिजली बंद करें" },
      { en: "Use dry wood/plastic to separate from source", hi: "स्रोत से अलग करने के लिए सूखी लकड़ी/प्लास्टिक का उपयोग करें" }
    ],
    donts: [
      { en: "Do NOT touch the person while connected to power", hi: "बिजली से जुड़े व्यक्ति को न छुएं" },
      { en: "Do NOT use wet objects", hi: "गीली वस्तुओं का उपयोग न करें" }
    ]
  },
  {
    id: "heat-stroke",
    icon: "device_thermostat",
    bgColor: "#FFF7ED",
    iconColor: "#C2410C",
    title: { en: "Heat Stroke", hi: "लू लगना" },
    steps: [
      { en: "Move the person to a cool, shaded area immediately.", hi: "व्यक्ति को तुरंत ठंडी, छायादार जगह पर ले जाएं।" },
      { en: "Remove excess clothing.", hi: "अतिरिक्त कपड़े हटाएं।" },
      { en: "Cool them rapidly — pour cool water, fan them, apply wet cloths to neck, armpits, groin.", hi: "तेज़ी से ठंडा करें — ठंडा पानी डालें, पंखा करें, गर्दन, बगल, जांघों पर गीले कपड़े लगाएं।" },
      { en: "If conscious, give small sips of cool water.", hi: "अगर होश में हैं, ठंडे पानी की छोटी-छोटी घूंट दें।" },
      { en: "Call 108 if temperature is very high or person is confused/unconscious.", hi: "अगर तापमान बहुत ज़्यादा है या व्यक्ति भ्रमित/बेहोश है तो 108 पर कॉल करें।" }
    ],
    dos: [
      { en: "Move to shade and cool rapidly", hi: "छाया में ले जाएं और तेज़ी से ठंडा करें" },
      { en: "Give water if conscious", hi: "होश में हों तो पानी दें" }
    ],
    donts: [
      { en: "Do NOT give very cold or ice water to drink", hi: "बहुत ठंडा या बर्फ का पानी पीने को न दें" },
      { en: "Do NOT leave them in the sun", hi: "उन्हें धूप में न छोड़ें" }
    ]
  },
  {
    id: "allergic-reaction",
    icon: "eco",
    bgColor: "#F0FDF4",
    iconColor: "#16A34A",
    title: { en: "Allergic Reaction", hi: "एलर्जी प्रतिक्रिया" },
    steps: [
      { en: "Call 108 if the person has difficulty breathing or swelling of face/throat.", hi: "अगर सांस लेने में कठिनाई या चेहरे/गले में सूजन हो तो 108 पर कॉल करें।" },
      { en: "If they have an EpiPen, help them use it on outer thigh.", hi: "अगर उनके पास EpiPen है, बाहरी जांघ पर उपयोग करने में मदद करें।" },
      { en: "Have them sit upright to help breathing.", hi: "सांस लेने में मदद के लिए सीधा बैठाएं।" },
      { en: "Loosen tight clothing.", hi: "तंग कपड़े ढीले करें।" },
      { en: "Monitor breathing until help arrives.", hi: "मदद आने तक सांस पर नज़र रखें।" }
    ],
    dos: [
      { en: "Use EpiPen if available", hi: "उपलब्ध हो तो EpiPen का उपयोग करें" },
      { en: "Keep them upright", hi: "उन्हें सीधा बैठाए रखें" }
    ],
    donts: [
      { en: "Do NOT give oral medication if throat is swollen", hi: "गला सूजा हो तो मुंह से दवा न दें" },
      { en: "Do NOT leave them alone", hi: "उन्हें अकेला न छोड़ें" }
    ]
  }
];
