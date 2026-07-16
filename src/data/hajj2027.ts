export interface Hajj2027Package {
  id: string;
  name: { bn: string; en: string };
  price: { bn: string; en: string };
  duration: { bn: string; en: string };
  flight: { bn: string; en: string };
  makkahHotel: { bn: string; en: string };
  madinahHotel: { bn: string; en: string };
  extraAccommodation: { bn: string; en: string } | null;
  roomSharing: { bn: string; en: string };
  specialNote: { bn: string; en: string };
}

export interface CommonService {
  icon: string;
  bn: string;
  en: string;
}

export interface ContentData {
  packages: Hajj2027Package[];
  commonServices: CommonService[];
  included: { bn: string[]; en: string[] };
  excluded: { bn: string[]; en: string[] };
  terms: { bn: string[]; en: string[] };
  hajjPacking: {
    men: { bn: string[]; en: string[] };
    women: { bn: string[]; en: string[] };
    both: { bn: string[]; en: string[] };
  };
  umrahPacking: {
    men: { bn: string[]; en: string[] };
    women: { bn: string[]; en: string[] };
    both: { bn: string[]; en: string[] };
  };
  contacts: { bn: { label: string; value: string }[]; en: { label: string; value: string }[] };
}

export const hajj2027Data: ContentData = {
  packages: [
    {
      id: "package-b",
      name: { bn: "প্যাকেজ বি", en: "Package B" },
      price: { bn: "৫,৭৫,০০০ টাকা (সম্ভাব্য)", en: "5,75,000 BDT (Estimated)" },
      duration: { bn: "৩৭-৪২ দিন", en: "37-42 days" },
      flight: {
        bn: "ঢাকা-জেদ্দা-মদিনা-ঢাকা সরাসরি ফ্লাইট",
        en: "Direct flight (Dhaka-Jeddah-Madinah-Dhaka)",
      },
      makkahHotel: {
        bn: "স্ট্যান্ডার্ড হোটেল (১০০০-১৫০০ মিটার দূরত্বে)",
        en: "Standard Hotel (1000-1500 meters distance)",
      },
      madinahHotel: {
        bn: "মানসম্মত হোটেল (৫০০-৭০০ মিটার দূরত্বে)",
        en: "Quality Hotel (500-700 meters distance)",
      },
      extraAccommodation: {
        bn: "শিশা/আজিজিয়াতে ৪-৭ দিন আবাসন সুবিধা",
        en: "Shisha/Aziziyah: 4-7 days of accommodation",
      },
      roomSharing: { bn: "প্রতি রুমে ৫/৬ জন", en: "5/6 persons per room" },
      specialNote: {
        bn: "একই রুমে স্বামী-স্ত্রী বা যেকোনো ২ জন আলাদা থাকতে চাইলে আলোচনা সাপেক্ষে অতিরিক্ত খরচ যুক্ত হবে।",
        en: "Extra charges apply for couples or any 2 persons wanting to share a private room (subject to discussion).",
      },
    },
    {
      id: "package-a",
      name: { bn: "প্যাকেজ এ", en: "Package A" },
      price: { bn: "৬,৭৫,০০০ টাকা", en: "6,75,000 BDT" },
      duration: { bn: "৩৭-৪২ দিন", en: "37-42 days" },
      flight: {
        bn: "ঢাকা-জেদ্দা-মদিনা-ঢাকা সরাসরি ফ্লাইট",
        en: "Direct flight (Dhaka-Jeddah-Madinah-Dhaka)",
      },
      makkahHotel: {
        bn: "স্ট্যান্ডার্ড হোটেল (৫০০-৮০০ মিটার দূরত্বে)",
        en: "Standard Hotel (500-800 meters distance)",
      },
      madinahHotel: {
        bn: "স্ট্যান্ডার্ড হোটেল (৩০০-৫০০ মিটার দূরত্বে)",
        en: "Standard Hotel (300-500 meters distance)",
      },
      extraAccommodation: {
        bn: "আজিজিয়াতে মানসম্মত হোটেল (মিনা জামারার কাছাকাছি)",
        en: "Aziziyah: Quality hotel near Mina Jamara",
      },
      roomSharing: { bn: "প্রতি রুমে ৪/৫ জন", en: "4/5 persons per room" },
      specialNote: {
        bn: "একই রুমে স্বামী-স্ত্রী বা যেকোনো ২ জন আলাদা থাকতে চাইলে আলোচনা সাপেক্ষে অতিরিক্ত খরচ যুক্ত হবে।",
        en: "Extra charges apply for couples or any 2 persons wanting to share a private room (subject to discussion).",
      },
    },
    {
      id: "standard",
      name: { bn: "স্ট্যান্ডার্ড", en: "Standard" },
      price: { bn: "৭,৭৫,০০০ টাকা (সম্ভাব্য)", en: "7,75,000 BDT (Estimated)" },
      duration: { bn: "৩৭-৪২ দিন", en: "37-42 days" },
      flight: {
        bn: "ঢাকা-জেদ্দা-মদিনা-ঢাকা সরাসরি ফ্লাইট",
        en: "Direct flight (Dhaka-Jeddah-Madinah-Dhaka)",
      },
      makkahHotel: {
        bn: "স্ট্যান্ডার্ড হোটেল (৩০০-৬০০ মিটার দূরত্বে)",
        en: "Standard Hotel (300-600 meters distance)",
      },
      madinahHotel: {
        bn: "স্ট্যান্ডার্ড হোটেল (১০০-৪০০ মিটার দূরত্বে)",
        en: "Standard Hotel (100-400 meters distance)",
      },
      extraAccommodation: null,
      roomSharing: { bn: "প্রতি রুমে ৩/৪ জন", en: "3/4 persons per room" },
      specialNote: {
        bn: "একই রুমে স্বামী-স্ত্রী বা যেকোনো ২ জন আলাদা থাকতে চাইলে আলোচনা সাপেক্ষে অতিরিক্ত খরচ যুক্ত হবে।",
        en: "Extra charges apply for couples or any 2 persons wanting to share a private room (subject to discussion).",
      },
    },
    {
      id: "vip",
      name: { bn: "ভিআইপি", en: "VIP" },
      price: { bn: "৮,৫০,০০০ টাকা", en: "8,50,000 BDT" },
      duration: { bn: "৩৭-৪২ দিন", en: "37-42 days" },
      flight: {
        bn: "ঢাকা-জেদ্দা-মদিনা-ঢাকা সরাসরি ফ্লাইট",
        en: "Direct flight (Dhaka-Jeddah-Madinah-Dhaka)",
      },
      makkahHotel: {
        bn: "৫ তারকা অভিজাত হোটেল (সাফওয়া/ক্লক টাওয়ার/মক্কা টাওয়ার) যা মসজিদুল হারামের চত্বর সংলগ্ন।",
        en: "5-Star luxury hotel (Safwah / Clock Tower / Makkah Tower) adjacent to Masjid al-Haram courtyard.",
      },
      madinahHotel: {
        bn: "৩/৪ তারকা মানসম্মত হোটেল (১০০-৩০০ মিটারের মধ্যে) মারকাজিয়া সেন্ট্রাল এরিয়া।",
        en: "3/4-Star quality hotel (within 100-300 meters) in Markazia Central Area.",
      },
      extraAccommodation: {
        bn: "আজিজিয়াতে মানসম্মত হোটেল (মিনা জামারার কাছাকাছি)।",
        en: "Aziziyah: Quality hotel near Mina Jamara.",
      },
      roomSharing: { bn: "প্রতি রুমে ৪/৫ জন", en: "4/5 persons per room" },
      specialNote: {
        bn: "একই রুমে স্বামী-স্ত্রী বা যেকোনো ২ জন আলাদা থাকতে চাইলে আলোচনা সাপেক্ষে অতিরিক্ত খরচ যুক্ত হবে।",
        en: "Extra charges apply for couples or any 2 persons wanting to share a private room (subject to discussion).",
      },
    },
  ],

  commonServices: [
    { icon: "🍽️", bn: "৩ বেলা মানসম্মত বাঙালি খাবার", en: "3 quality Bengali meals daily" },
    { icon: "🚌", bn: "এসি বাসে যাতায়াত, সম্পূর্ণ হজ্জ ভিসা ও বিমা প্রসেসিং", en: "AC Bus transportation, Hajj visa, and insurance processing" },
    { icon: "🎒", bn: "ইহরাম প্যাকেজ ও প্রি-ডিপার্চার ট্রেনিং", en: "Ihram pack and pre-departure training" },
    { icon: "🕌", bn: "মক্কা ও মদিনার ঐতিহাসিক স্থানসমূহ জিয়ারত", en: "Ziyarah of historical sites in Makkah & Madinah" },
    { icon: "⛺", bn: "এসি তাঁবু সুবিধা - মিনা ও আরাফাত (ডি ক্যাটাগরি)", en: "AC tent facilities in Mina & Arafat - Category D" },
    { icon: "👳", bn: "অভিজ্ঞ আলেমদের দ্বারা গাইড বা পরিচালনা", en: "Guided by experienced Islamic scholars" },
    { icon: "📋", bn: "নুসুক (Nusuk) অ্যাপের মাধ্যমে রিয়াজুল জান্নাহর জিয়ারত", en: "Rawdah (Riyazul Jannah) visit via Nusuk App" },
  ],

  included: {
    bn: [
      "হজ্জ ভিসা প্রসেসিং",
      "বিমান টিকিট (ঢাকা-জেদ্দা-মদিনা-ঢাকা)",
      "নির্ধারিত পরিবহন",
      "আবাসন (নির্ধারিত হোটেল)",
      "৩ বেলা খাবার",
      "হজ্জ প্রশিক্ষণ",
      "অভিজ্ঞ গাইড",
      "জরুরি সহায়তা",
      "উপহার হিসেবে হজ্জ কিট",
      "মক্কা-মদিনা জিয়ারত ও নুসুক অ্যাপের মাধ্যমে রিয়াজুল জান্নাহ",
    ],
    en: [
      "Hajj visa processing",
      "Air ticket (Dhaka-Jeddah-Madinah-Dhaka)",
      "Designated transportation",
      "Accommodation (designated hotels)",
      "3 meals a day",
      "Hajj training",
      "Experienced guide",
      "Emergency assistance",
      "Complimentary Hajj kit",
      "Makkah-Madinah Ziyarah & Rawdah visit via Nusuk App",
    ],
  },

  excluded: {
    bn: [
      "হাদি/দম/কোরবানি",
      "টিকিট পরিবর্তন বা রি-ইস্যু খরচ",
      "ব্যক্তিগত খরচ ও চিকিৎসা ব্যয়",
      "ভিআইপি তাঁবু ও বাস সার্ভিস",
      "জেদ্দা/তায়েফ/হুদাইবিয়া/বদর/ওয়াদি জিন/তাবুক ইত্যাদি জিয়ারত",
    ],
    en: [
      "Qurbani (Hadi/Dam/Animal sacrifice)",
      "Ticket change or re-issue fees",
      "Personal and medical expenses",
      "VIP tents and VIP bus service",
      "Additional Ziyarah (Jeddah, Taif, Hudaibiyah, Badr, Wadi Jinn, Tabuk, etc.)",
    ],
  },

  terms: {
    bn: [
      "সরকারি নীতিমালা অনুযায়ী প্যাকেজ মূল্য পরিবর্তনশীল।",
      "বায়োমেট্রিক, টিকা ও মেডিকেল টেস্টের খরচ যাত্রীর নিজের।",
      "মহিলা যাত্রীর সাথে অবশ্যই মাহরাম থাকতে হবে।",
      "যাবতীয় লেনদেনের রশিদ সংরক্ষণ করতে হবে।",
    ],
    en: [
      "Package price is subject to change according to government policies.",
      "Biometrics, vaccinations, and medical tests must be done at the pilgrim's own expense.",
      "Female pilgrims must be accompanied by a Mahram.",
      "Receipts for all financial transactions must be preserved.",
    ],
  },

  hajjPacking: {
    men: {
      bn: [
        "ইহরামের কাপড় (২ সেট)",
        "কোমরের বেল্ট (১টি)",
        "স্যান্ডেল/স্পঞ্জ (২ জোড়া)",
        "পরিধেয় বস্ত্র (৩/৪ সেট)",
        "চাদর ও চামড়ার মোজা (প্রয়োজনে)",
        "পাতলা জায়নামাজ",
        "লুঙ্গি, গেঞ্জি, টুপি",
        "তোয়ালে/গামছা",
        "মেলামাইনের প্লেট ও গ্লাস",
        "ব্রাশ, পেস্ট ও টিস্যু",
        "বিছানার চাদর ও হাওয়া বালিশ",
        "পাসপোর্ট, মিনা, পাথর ও স্যান্ডেলের ব্যাগ",
        "ট্রাভেল ব্যাগ",
        "প্রেসক্রিপশনসহ প্রয়োজনীয় ওষুধ",
      ],
      en: [
        "2 sets of Ihram clothes",
        "1 waist belt",
        "2 pairs of sandals/sponges",
        "3/4 sets of regular clothes",
        "1 shawl & leather socks (if needed)",
        "1 thin prayer mat",
        "2 lungis, undershirts, cap",
        "1 towel",
        "1 melamine plate & glass",
        "Toothbrush & toothpaste, tissues",
        "1 bedsheet & air pillow",
        "Passport, Mina, stone & sandal bags",
        "1 travel bag",
        "Necessary medicines with prescriptions",
      ],
    },
    women: {
      bn: [
        "ইহরামের বোরকা (২ সেট)",
        "ইহরাম ক্যাপ (১টি)",
        "হিজাব (২ সেট)",
        "ছোট কাঁচি (চুল কাটার জন্য)",
        "সালোয়ার কামিজ (৩/৪ সেট)",
        "তোয়ালে, চাদর ও চামড়ার মোজা (প্রয়োজনে)",
        "জায়নামাজ",
        "প্লেট ও গ্লাস",
        "ব্রাশ-পেস্ট ও টিস্যু",
        "বেডশিট ও হাওয়া বালিশ",
        "প্রয়োজনীয় ব্যাগসমূহ",
        "২০-৩০ হাত রশি",
        "ব্যক্তিগত জিনিসপত্র",
      ],
      en: [
        "2 sets of Burqa for Ihram",
        "1 Ihram cap",
        "2 sets of Hijabs",
        "Small scissors (for hair trimming)",
        "3/4 sets of Salwar Kameez",
        "Towel, shawl & leather socks (if needed)",
        "Prayer mat",
        "Melamine plate & glass",
        "Toothbrush & toothpaste, tissues",
        "Bedsheet, air pillow",
        "Necessary bags",
        "20-30 cubits (hands) of rope",
        "Personal items",
      ],
    },
    both: {
      bn: [
        "ভ্যাসলিন",
        "কচটেপ",
        "ব্লেড, রেজার",
        "তেল, লোশন/অলিভ অয়েল",
        "ডিটারজেন্ট, সাবান",
        "ছোট ছাতা",
        "কটন বার",
        "শুকনো খাবার",
      ],
      en: [
        "Vaseline",
        "Scotch tape",
        "Blades, razor/trimmer",
        "Oil, lotion/olive oil",
        "Laundry detergent, soap",
        "Small umbrella",
        "Cotton buds",
        "Dry food",
      ],
    },
  },

  umrahPacking: {
    men: {
      bn: [
        "ইহরামের কাপড় (২ সেট)",
        "কোমরের বেল্ট (১টি)",
        "স্যান্ডেল/স্পঞ্জ (২ জোড়া)",
        "পরিধেয় বস্ত্র (৩/৪ সেট)",
        "পাতলা জায়নামাজ",
        "তোয়ালে/গামছা",
        "মেলামাইনের প্লেট ও গ্লাস",
        "ব্রাশ, পেস্ট ও টিস্যু",
        "ট্রাভেল ব্যাগ",
        "প্রেসক্রিপশনসহ প্রয়োজনীয় ওষুধ",
        "ছোট ব্যাগ (পাসপোর্ট ও মূল্যবান জিনিসের জন্য)",
        "চাদর (প্রয়োজনে)",
        "টুপি",
        "বিছানার চাদর ও হাওয়া বালিশ",
        "লুঙ্গি, গেঞ্জি",
        "ব্যাগ (ওমরাহ ও স্যান্ডেলের জন্য)",
      ],
      en: [
        "2 sets of Ihram clothes",
        "1 waist belt",
        "2 pairs of sandals/sponges",
        "3/4 sets of regular clothes",
        "1 thin prayer mat",
        "1 towel",
        "1 melamine plate & glass",
        "Toothbrush & toothpaste, tissues",
        "1 travel bag",
        "Necessary medicines with prescriptions",
        "Small bag (for passport & valuables)",
        "1 shawl (if needed)",
        "1 cap",
        "1 bedsheet & air pillow",
        "Lungi, undershirts",
        "Bag for Umrah items & sandals",
      ],
    },
    women: {
      bn: [
        "ইহরামের বোরকা (২ সেট)",
        "ইহরাম ক্যাপ (১টি)",
        "হিজাব (২ সেট)",
        "ছোট কাঁচি (চুল কাটার জন্য)",
        "সালোয়ার কামিজ (৩/৪ সেট)",
        "তোয়ালে, চাদর ও চামড়ার মোজা (প্রয়োজনে)",
        "জায়নামাজ",
        "প্লেট ও গ্লাস",
        "ব্রাশ-পেস্ট ও টিস্যু",
        "বেডশিট ও হাওয়া বালিশ",
        "প্রয়োজনীয় ব্যাগসমূহ",
        "২০-৩০ হাত রশি",
        "ব্যক্তিগত জিনিসপত্র",
        "ছোট ছাতা",
        "পানি ও শুকনো খাবার",
      ],
      en: [
        "2 sets of Burqa for Ihram",
        "1 Ihram cap",
        "2 sets of Hijabs",
        "Small scissors (for hair trimming)",
        "3/4 sets of Salwar Kameez",
        "Towel, shawl & leather socks (if needed)",
        "Prayer mat",
        "Melamine plate & glass",
        "Toothbrush & toothpaste, tissues",
        "Bedsheet, air pillow",
        "Necessary bags",
        "20-30 cubits (hands) of rope",
        "Personal items",
        "Small umbrella",
        "Water & dry food",
      ],
    },
    both: {
      bn: [
        "ভ্যাসলিন",
        "কচটেপ",
        "ব্লেড, রেজার",
        "তেল, লোশন/অলিভ অয়েল",
        "ডিটারজেন্ট, সাবান",
        "কটন বার",
        "শুকনো খাবার",
      ],
      en: [
        "Vaseline",
        "Scotch tape",
        "Blades, razor/trimmer",
        "Oil, lotion/olive oil",
        "Laundry detergent, soap",
        "Cotton buds",
        "Dry food",
      ],
    },
  },

  contacts: {
    bn: [
      { label: "হেড অফিস", value: "৩৪ পুরানা পল্টন, ঢাকা (01879-216736)" },
      { label: "কুমিল্লা অফিস", value: "ধানসিঁড়ি, চান্দিনা, কুমিল্লা (01877-761101)" },
    ],
    en: [
      { label: "Head Office", value: "34 Purana Palton, Dhaka (01879-216736)" },
      { label: "Comilla Office", value: "Dhansiri, Chandina, Comilla (01877-761101)" },
    ],
  },
};

export const packageColors: Record<string, string> = {
  "package-b": "from-emerald-500 to-teal-600",
  "package-a": "from-blue-500 to-indigo-600",
  "standard": "from-violet-500 to-purple-600",
  "vip": "from-amber-500 to-orange-600",
};

export const packageAccentColors: Record<string, string> = {
  "package-b": "bg-emerald-50 border-emerald-200 text-emerald-700",
  "package-a": "bg-blue-50 border-blue-200 text-blue-700",
  "standard": "bg-violet-50 border-violet-200 text-violet-700",
  "vip": "bg-amber-50 border-amber-200 text-amber-700",
};
