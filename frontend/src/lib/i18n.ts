export type Lang = "en" | "id";
export type Country = "AU" | "ID";

const LANG_KEY = "scamshield.lang";
const COUNTRY_KEY = "scamshield.country";

function browserIsIndonesian(): boolean {
  const langs = typeof navigator !== "undefined" ? navigator.languages ?? [navigator.language] : [];
  return langs.some((l) => l?.toLowerCase().startsWith("id"));
}

export function initialLang(): Lang {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "id") return saved;
  return browserIsIndonesian() ? "id" : "en";
}

export function initialCountry(): Country {
  const saved = localStorage.getItem(COUNTRY_KEY);
  if (saved === "AU" || saved === "ID") return saved;
  return browserIsIndonesian() ? "ID" : "AU";
}

export const saveLang = (l: Lang) => localStorage.setItem(LANG_KEY, l);
export const saveCountry = (c: Country) => localStorage.setItem(COUNTRY_KEY, c);

const en = {
  tagline: "Free scam checker",
  heroTitle: "Not sure if a message is a scam?",
  heroSub: "Paste the text message, WhatsApp, email or link below. We'll explain the warning signs in plain language.",
  country: "Country",
  australia: "Australia",
  indonesia: "Indonesia",
  language: "Language",
  privacy: "Don't paste passwords, PINs, card numbers or OTP codes.",
  privacySub: "We don't save your message.",
  inputLabel: "Suspicious message or link",
  placeholder: "Paste the message here…",
  chars: "characters",
  tooLong: "This message is too long. Please shorten it.",
  tryExample: "Try an example:",
  check: "Check it",
  checking: "Checking…",
  clear: "Clear",
  scammedBtn: "I've already been scammed",
  verdictLabel: "Our assessment",
  likely_scam: "Likely scam",
  suspicious: "Suspicious",
  no_obvious_red_flags: "No obvious red flags — still be careful",
  verdictNote: "We can never be 100% sure. If in doubt, don't respond.",
  scamType: "Likely scam type",
  redFlags: "Warning signs in this message",
  noRedFlags: "We didn't spot specific warning signs, but scammers keep changing tricks.",
  nextSteps: "What to do now",
  errorTitle: "Sorry, we couldn't check this right now",
  errorBody: "This is a problem on our side, not yours. Please try again in a moment. Until then: don't click links, don't reply, and don't send money.",
  rateLimited: "You've checked a lot of messages quickly. Please wait a minute and try again.",
  retry: "Try again",
  recheckLang: "Check again to see this in English",
  whatWeChecked: "What we checked",
  scammedTitle: "Already been scammed? Act fast",
  scammedSub: "Don't feel embarrassed — scams happen to smart people every day. Follow these steps:",
  scammedFor: "Help for",
  stillScammed: "Already sent money or details?",
  disclaimer: "ScamOrNot gives guidance only and can make mistakes. Not affiliated with any government or bank.",
  footerPrivacy: "Messages you paste are not stored.",
};

export type Dict = typeof en;

const id: Dict = {
  tagline: "Cek penipuan gratis",
  heroTitle: "Ragu apakah pesan ini penipuan?",
  heroSub: "Tempel SMS, WhatsApp, email atau link di bawah. Kami jelaskan tanda bahayanya dengan bahasa sederhana.",
  country: "Negara",
  australia: "Australia",
  indonesia: "Indonesia",
  language: "Bahasa",
  privacy: "Jangan tempel password, PIN, nomor kartu, atau kode OTP.",
  privacySub: "Kami tidak menyimpan pesan Anda.",
  inputLabel: "Pesan atau link yang mencurigakan",
  placeholder: "Tempel pesannya di sini…",
  chars: "karakter",
  tooLong: "Pesan terlalu panjang. Mohon dipersingkat.",
  tryExample: "Coba contoh:",
  check: "Cek sekarang",
  checking: "Sedang dicek…",
  clear: "Hapus",
  scammedBtn: "Saya sudah jadi korban",
  verdictLabel: "Penilaian kami",
  likely_scam: "Kemungkinan besar penipuan",
  suspicious: "Mencurigakan",
  no_obvious_red_flags: "Tidak ada tanda bahaya jelas — tetap waspada",
  verdictNote: "Kami tidak bisa 100% yakin. Jika ragu, jangan ditanggapi.",
  scamType: "Jenis penipuan",
  redFlags: "Tanda bahaya di pesan ini",
  noRedFlags: "Kami tidak menemukan tanda bahaya khusus, tapi penipu terus mengganti trik.",
  nextSteps: "Yang harus dilakukan sekarang",
  errorTitle: "Maaf, kami belum bisa mengecek sekarang",
  errorBody: "Ini masalah di sistem kami, bukan Anda. Silakan coba lagi sebentar lagi. Sementara itu: jangan klik link, jangan membalas, dan jangan transfer uang.",
  rateLimited: "Anda sudah mengecek banyak pesan dalam waktu singkat. Tunggu satu menit lalu coba lagi.",
  retry: "Coba lagi",
  recheckLang: "Cek lagi untuk melihat dalam Bahasa Indonesia",
  whatWeChecked: "Yang kami periksa",
  scammedTitle: "Sudah jadi korban? Segera bertindak",
  scammedSub: "Jangan malu — penipuan bisa menimpa siapa saja. Ikuti langkah berikut:",
  scammedFor: "Bantuan untuk",
  stillScammed: "Sudah terlanjur transfer atau memberi data?",
  disclaimer: "ScamOrNot hanya memberi panduan dan bisa keliru. Tidak berafiliasi dengan pemerintah atau bank mana pun.",
  footerPrivacy: "Pesan yang Anda tempel tidak disimpan.",
};

export const DICTS: Record<Lang, Dict> = { en, id };

export interface Sample {
  key: string;
  label: Record<Lang, string>;
  text: string;
}

export const SAMPLES: Sample[] = [
  {
    key: "delivery",
    label: { en: "Fake delivery SMS", id: "SMS paket palsu" },
    text: "AusPost: Your parcel could not be delivered due to an incomplete address. Update your details within 24hrs: https://auspost-redeliver.info/track",
  },
  {
    key: "apk",
    label: { en: "WhatsApp APK invite", id: "Undangan APK WhatsApp" },
    text: "Assalamualaikum, mohon maaf mengganggu. Ini undangan pernikahan kami, silakan dibuka ya kak 🙏 Undangan_Digital.apk",
  },
  {
    key: "mum",
    label: { en: "\"Hi Mum\" text", id: "Pesan \"Hi Mum\"" },
    text: "Hi Mum, I dropped my phone and this is my new number. Can you help me pay a bill today? I'll pay you back tomorrow x",
  },
];
