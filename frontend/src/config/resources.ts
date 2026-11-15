// ─────────────────────────────────────────────────────────────────────────────
// "I've already been scammed" — official resources per country.
// Edit this file to update phone numbers, links or wording. Each text field has
// an English (en) and Bahasa Indonesia (id) version.
// ─────────────────────────────────────────────────────────────────────────────
import type { Country, Lang } from "@/lib/i18n";

export interface Localized {
  en: string;
  id: string;
}

export interface ResourceContact {
  label: Localized;
  /** Shown to the user */
  display: string;
  /** href: "tel:…", "https://…" or "https://wa.me/…" */
  href: string;
}

export interface ResourceStep {
  key: string;
  title: Localized;
  body: Localized;
  urgent?: boolean;
  contacts?: ResourceContact[];
}

export const RESOURCES: Record<Country, ResourceStep[]> = {
  AU: [
    {
      key: "bank",
      urgent: true,
      title: { en: "Contact your bank immediately", id: "Segera hubungi bank Anda" },
      body: {
        en: "Call the number on the back of your card or use your bank's official app. Ask them to stop payments and lock your cards.",
        id: "Telepon nomor di balik kartu Anda atau gunakan aplikasi resmi bank. Minta mereka menghentikan pembayaran dan memblokir kartu.",
      },
    },
    {
      key: "scamwatch",
      title: { en: "Report to Scamwatch", id: "Laporkan ke Scamwatch" },
      body: {
        en: "Scamwatch is the Australian Government's scam reporting service. Your report helps warn others.",
        id: "Scamwatch adalah layanan pelaporan penipuan Pemerintah Australia. Laporan Anda membantu memperingatkan orang lain.",
      },
      contacts: [{ label: { en: "Website", id: "Situs web" }, display: "scamwatch.gov.au", href: "https://www.scamwatch.gov.au" }],
    },
    {
      key: "reportcyber",
      title: { en: "ReportCyber — if money or personal info was lost", id: "ReportCyber — jika uang atau data pribadi hilang" },
      body: {
        en: "Report cybercrime to the Australian Cyber Security Centre.",
        id: "Laporkan kejahatan siber ke Australian Cyber Security Centre.",
      },
      contacts: [
        { label: { en: "Website", id: "Situs web" }, display: "cyber.gov.au", href: "https://www.cyber.gov.au/report-and-recover/report" },
        { label: { en: "Phone", id: "Telepon" }, display: "1300 292 371", href: "tel:1300292371" },
      ],
    },
    {
      key: "idcare",
      title: { en: "IDCARE — free identity support", id: "IDCARE — bantuan identitas gratis" },
      body: {
        en: "If your personal details were shared, IDCARE can help you make a recovery plan.",
        id: "Jika data pribadi Anda sudah diberikan, IDCARE dapat membantu membuat rencana pemulihan.",
      },
      contacts: [
        { label: { en: "Website", id: "Situs web" }, display: "idcare.org", href: "https://www.idcare.org" },
        { label: { en: "Phone", id: "Telepon" }, display: "1800 595 160", href: "tel:1800595160" },
      ],
    },
    {
      key: "danger",
      urgent: true,
      title: { en: "Call 000 if you are in immediate danger", id: "Hubungi 000 jika Anda dalam bahaya" },
      body: {
        en: "If you feel threatened or unsafe, call emergency services now.",
        id: "Jika Anda merasa terancam atau tidak aman, segera hubungi layanan darurat.",
      },
      contacts: [{ label: { en: "Emergency", id: "Darurat" }, display: "000", href: "tel:000" }],
    },
  ],
  ID: [
    {
      key: "bank",
      urgent: true,
      title: { en: "Contact your bank immediately", id: "Segera hubungi bank Anda" },
      body: {
        en: "Use the call centre number on the back of your card or the official bank app. Ask them to block your account/card and hold transfers.",
        id: "Hubungi call center di balik kartu atau lewat aplikasi resmi bank. Minta blokir rekening/kartu dan tahan transfer.",
      },
    },
    {
      key: "iasc",
      title: { en: "Report to IASC via OJK", id: "Laporkan ke IASC melalui OJK" },
      body: {
        en: "The Indonesia Anti-Scam Centre (IASC) handles scam reports through the OJK contact centre.",
        id: "Indonesia Anti-Scam Centre (IASC) menerima laporan penipuan melalui Kontak OJK.",
      },
      contacts: [
        { label: { en: "OJK hotline", id: "Kontak OJK" }, display: "157", href: "tel:157" },
        { label: { en: "WhatsApp", id: "WhatsApp" }, display: "081157157157", href: "https://wa.me/6281157157157" },
      ],
    },
    {
      key: "cekrekening",
      title: { en: "Check & report the account at cekrekening.id", id: "Cek & laporkan rekening di cekrekening.id" },
      body: {
        en: "Check whether the bank account you paid has been reported, and report it.",
        id: "Periksa apakah rekening tujuan transfer sudah pernah dilaporkan, lalu laporkan.",
      },
      contacts: [{ label: { en: "Website", id: "Situs web" }, display: "cekrekening.id", href: "https://cekrekening.id" }],
    },
    {
      key: "lapor",
      title: { en: "File a complaint at LAPOR!", id: "Buat pengaduan di LAPOR!" },
      body: {
        en: "The national public complaints service.",
        id: "Layanan pengaduan masyarakat nasional.",
      },
      contacts: [{ label: { en: "Website", id: "Situs web" }, display: "lapor.go.id", href: "https://www.lapor.go.id" }],
    },
    {
      key: "apk",
      urgent: true,
      title: { en: "Installed an APK file?", id: "Sempat menginstal file APK?" },
      body: {
        en: "Turn off internet, uninstall the app, then change your m-banking passwords and PIN from ANOTHER device.",
        id: "Matikan internet, hapus aplikasinya, lalu ganti password dan PIN m-banking dari perangkat LAIN.",
      },
    },
  ],
};

export const t = (l: Localized, lang: Lang) => l[lang];
