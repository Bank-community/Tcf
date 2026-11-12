// ===== Single place to edit content, contact details and figures =====
export const SITE = {
  name: 'Trust Community Fund',
  short: 'TCF',
  established: '23 जून 2024',
  phoneDisplay: '93040 95758',
  whatsapp: '919304095758', // country code 91 + number, digits only
  logo: 'https://ik.imagekit.io/nsyr92pse/tcf-icon-512.png', // or '/logo.png' after copying to /public
  provisional: true, // set false once figures are confirmed against official records
};

export const STATS = [
  { value: 32, suffix: '', label: 'सदस्य', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' },
  { value: 1500000, prefix: '₹', suffix: '+', label: 'कुल वितरित ऋण', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>' },
  { value: 50, suffix: '+', label: 'पूर्ण हुए ऋण', icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>' },
];


// Real Community Photos with rich metadata for Visual Diary
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'सभी (All)' },
  { id: 'chhath', label: 'छठ महापर्व' },
  { id: 'service', label: 'सेवा व वितरण' },
  { id: 'community', label: 'TCF परिवार' },
  { id: 'memories', label: 'स्मृतियां' }
];

export const IMAGES = [
  { 
    id: 1,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG_20261017_200709_BWDrKwvou.jpg', 
    alt: 'TCF Community Group Photo', 
    title: 'हमारी Community', 
    caption: 'TCF परिवार के सभी सदस्यों की सामूहिक तस्वीर व सौहार्द',
    category: 'community',
    tag: 'Community',
    date: 'अक्टूबर 2025'
  },
  { 
    id: 2,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20261017-WA0049_PPZ_Ft3-E.jpg', 
    alt: 'TCF Community Event', 
    title: 'सेवा और सहयोग', 
    caption: 'महापर्व के पावन अवसर पर समाज सेवा और आपसी सहायता',
    category: 'service',
    tag: 'Service',
    date: 'अक्टूबर 2025',
    isVideo: true
  },
  { 
    id: 3,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20261017-WA0044_jDZ51fne7.jpg', 
    alt: 'Community Togetherness', 
    title: 'एकजुटता व आस्था', 
    caption: 'छठ पूजा के पावन अवसर पर घाट पर सेवा और समर्पण',
    category: 'chhath',
    tag: 'Chhath Puja',
    date: 'छठ महापर्व 2025'
  },
  { 
    id: 4,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20261017-WA0043_xdafpgTkE.jpg', 
    alt: 'Chhath Puja Activity', 
    title: 'यादगार पल', 
    caption: 'सामुदायिक आयोजन में सक्रिय सहभागिता और उत्सव का उल्लास',
    category: 'chhath',
    tag: 'Chhath Puja',
    date: 'अक्टूबर 2025'
  },
  { 
    id: 5,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20261017-WA0046_a39zIfwOv.jpg', 
    alt: 'Community Food Distribution', 
    title: 'प्रसाद व भोजन वितरण', 
    caption: 'साथ मिलकर आगे बढ़ना और वंचितों के प्रति सेवा का संकल्प',
    category: 'service',
    tag: 'Distribution',
    date: 'अक्टूबर 2025'
  },  
  { 
    id: 6,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20251028-WA0013_ySe5ohLht.jpg', 
    alt: 'TCF Members at Event', 
    title: 'TCF प्रारंभिक बैठक', 
    caption: 'TCF के स्थापना काल और शुरुआती बैठकों की अनमोल स्मृतियां',
    category: 'memories',
    tag: 'Memories',
    date: 'जून 2024'
  },
  { 
    id: 7,
    src: 'https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/IMG-20261017-WA0028_IuxQu4M92.jpg', 
    alt: 'TCF Members at Event', 
    title: 'TCF परिवार मिलन', 
    caption: 'सदस्यों का आपसी विचार-विमर्श, योजनाएं और सामूहिक संवाद',
    category: 'community',
    tag: 'Family',
    date: 'अक्टूबर 2025'
  },
  {
    id: 8,
    src: 'https://ik.imagekit.io/kdtvm0r78/assets-task-01jyqe64mye7ca8pjrtcrewwfm-1750985924-img-1_xcFbHrb9F.webp',
    alt: 'TCF Chhath Celebration',
    title: 'महापर्व अर्घ्य व श्रद्धा',
    caption: 'भगवान भास्कर को सामूहिक अर्घ्य और संपूर्ण समाज की खुशहाली की कामना',
    category: 'chhath',
    tag: 'Chhath Puja',
    date: 'छठ 2025',
    isVideo: true
  }
];

export const MSGS = {
  info: 'नमस्ते, मुझे TCF (Trust Community Fund) के बारे में जानकारी चाहिए।',
  member: 'नमस्ते, मैं TCF की सदस्यता के बारे में जानकारी लेना चाहता/चाहती हूँ।',
  how: 'नमस्ते, कृपया बताइए कि TCF कैसे काम करता है।',
};
export const wa = (m) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(m)}`;

export const FAQ = [
  ['TCF क्या है?', 'TCF एक समुदाय आधारित योगदान और ऋण-सहयोग व्यवस्था है, जहाँ सदस्य मिलकर एक-दूसरे के सहयोग की नींव बनाते हैं।'],
  ['क्या TCF में ऋण की गारंटी है?', 'नहीं। कोई भी सहयोग TCF के लागू नियमों, पात्रता और उपलब्ध फंड के अधीन है। किसी ऋण, रिटर्न या लाभ की गारंटी नहीं दी जाती।'],
  ['सदस्य कैसे बनें?', 'नीचे दिए WhatsApp बटन से हमें संदेश भेजें। हमारी टीम सदस्यता की प्रक्रिया और नियम समझाएगी।'],
  ['योजना की पूरी जानकारी यहाँ क्यों नहीं है?', 'नियमों और योजनाओं की जानकारी सीधे बातचीत में दी जाती है, ताकि आपको सही और अद्यतन जानकारी मिल सके। सदस्यों की निजी जानकारी कभी सार्वजनिक नहीं की जाती।'],
  ['संपर्क कैसे करें?', `WhatsApp या कॉल: ${SITE.phoneDisplay}`],
];

// ===== Chhath Puja Donation Leaderboard Configuration (Demo Dataset) =====
export const LEADERBOARD_SETTINGS = {
  isDemo: false, // LIVE DATA MODE ENABLED
  campaignGoal: 10000, // Campaign goal ₹10,000
  title: 'छठ पूजा दानदाता लीडरबोर्ड',
  altTitle: 'छठ पूजा 2026 दानदाता रैंक बोर्ड',
  subtitle: 'Community Support • Bigger Impact • Stronger Together',
  englishEyebrow: 'TCF COMMUNITY • CHHATH PUJA',
  festivalTag: 'छठ पूजा 2026',
  badgeText: 'CHHATH PUJA SPECIAL',
  supportingCopy: 'आपका सहयोग, हमारी ताकत। साथ मिलकर इस छठ को और यादगार बनाएँ।',
  fullPageSupportingCopy: 'हर सहयोग मायने रखता है। आइए, मिलकर अपनी Community को मजबूत बनाएँ।',
  quote: 'छठ सिर्फ आस्था नहीं, बल्कि समाज को जोड़ने वाली एक सुंदर परंपरा है। आपका प्रत्येक सहयोग, इस परंपरा को और भी सशक्त बनाता है।',
  quoteAuthor: 'TCF Community',
};

// 10 Demo Members — Sorted strictly by donationAmount descending.
// If amounts tie, stableTieBreakOrder determines the rank.
// Likes NEVER affect rank.
// Fields intentionally excluded: donationCount, lastDonationDate.
export const LEADERBOARD_DONORS = [
  {
    id: 'keshav-mishra',
    name: 'Keshav Mishra',
    amount: 11000,
    photo: 'https://ik.imagekit.io/kdtvm0r78/assets-task-01jyqe64mye7ca8pjrtcrewwfm-1750985924-img-1_xcFbHrb9F.webp',
    initialLikes: 28,
    tieBreakOrder: 1,
  },
  {
    id: 'nitish-kumar',
    name: 'Nitish Kumar',
    amount: 5000,
    photo: 'https://ik.imagekit.io/kdtvm0r78/1000027744_y5prInZPD.jpg',
    initialLikes: 21,
    tieBreakOrder: 2,
  },
  {
    id: 'vikesh-kumar',
    name: 'Vikesh Kumar',
    amount: 5000,
    photo: 'https://ik.imagekit.io/kdtvm0r78/IMG_20261007_142624_phAxmpaXH.jpg',
    initialLikes: 19,
    tieBreakOrder: 3,
  },
  {
    id: 'suraj-kumar',
    name: 'Suraj Kumar',
    amount: 3000,
    photo: 'https://ik.imagekit.io/kdtvm0r78/1000086662__1__P_bSQOtao.jpg',
    initialLikes: 15,
    tieBreakOrder: 4,
  },
  {
    id: 'mithilesh-sahni',
    name: 'Mithilesh Sahni',
    amount: 2000,
    photo: 'https://ik.imagekit.io/kdtvm0r78/1000071835__3__Q0sa0mlUb.jpg',
    initialLikes: 14,
    tieBreakOrder: 5,
  },
  {
    id: 'rahul-verma',
    name: 'Rahul Verma',
    amount: 1500,
    photo: null,
    initialLikes: 9,
    tieBreakOrder: 6,
  },
  {
    id: 'amit-kumar',
    name: 'Amit Kumar',
    amount: 1000,
    photo: null,
    initialLikes: 8,
    tieBreakOrder: 7,
  },
  {
    id: 'aditya-singh',
    name: 'Aditya Singh',
    amount: 1000,
    photo: null,
    initialLikes: 7,
    tieBreakOrder: 8,
  },
  {
    id: 'rakesh-yadav',
    name: 'Rakesh Yadav',
    amount: 800,
    photo: null,
    initialLikes: 6,
    tieBreakOrder: 9,
  },
  {
    id: 'pankaj-kumar',
    name: 'Pankaj Kumar',
    amount: 500,
    photo: null,
    initialLikes: 5,
    tieBreakOrder: 10,
  },
];

// Pure sorting function: Rank is determined strictly by total donation amount
export const getSortedLeaderboard = (data = LEADERBOARD_DONORS) => {
  return [...data]
    .sort((a, b) => {
      if (b.amount !== a.amount) {
        return b.amount - a.amount;
      }
      return (a.tieBreakOrder || 0) - (b.tieBreakOrder || 0);
    })
    .map((item, index) => ({
      ...item,
      rank: index + 1,
    }));
};

// Indian Currency Formatter helper
export const formatINR = (val) => '₹' + Number(val || 0).toLocaleString('en-IN');

// Backward compatible DONORS export (used by any legacy components)
export const DONORS = LEADERBOARD_DONORS.map((d) => ({
  name: d.name,
  amount: formatINR(d.amount),
  img: d.photo || 'https://ik.imagekit.io/kdtvm0r78/assets-task-01jyqe64mye7ca8pjrtcrewwfm-1750985924-img-1_xcFbHrb9F.webp',
  msg: 'छठ पूजा सहयोग',
}));

// ===== Firebase Configuration & Live Connection =====
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCW3i42Uw58fqfxQ66WTBquT-J7ZRiKsCA",
  authDomain: "trust-community-fund.firebaseapp.com",
  databaseURL: "https://trust-community-fund-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "trust-community-fund",
  storageBucket: "trust-community-fund.firebasestorage.app",
  messagingSenderId: "478966463578",
  appId: "1:478966463578:web:a632a60e6c9ee163c06c63"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';

export const useLiveLeaderboard = () => {
  const [liveDonors, setLiveDonors] = useState([]);
  
  useEffect(() => {
    const eventsRef = ref(db, 'donations/events');
    const unsubscribe = onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const aggregated = {};
        Object.values(data).forEach(event => {
          if (event.incomes) {
            Object.values(event.incomes).forEach(income => {
              // Custom member या रजिस्टर्ड मेम्बर को अलग-अलग पहचानें
              const id = income.memberId && income.memberId !== '__CUSTOM__' ? income.memberId : income.memberName;
              if (!aggregated[id]) {
                aggregated[id] = {
                  id: id,
                  name: income.memberName || 'Unknown',
                  amount: 0,
                  photo: income.profilePicUrl || null,
                  initialLikes: 0,
                  tieBreakOrder: income.timestamp || Date.now()
                };
              }
              aggregated[id].amount += parseFloat(income.amount || 0);
              if (income.profilePicUrl) aggregated[id].photo = income.profilePicUrl;
            });
          }
        });
        setLiveDonors(Object.values(aggregated));
      } else {
        setLiveDonors([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return { liveDonors };
};