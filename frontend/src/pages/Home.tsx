import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Lock, ShieldCheck, Loader2, RotateCcw, CloudOff, Search, X } from "lucide-react";
import { apiPost, ApiError } from "@/lib/api";
import {
  DICTS,
  SAMPLES,
  initialCountry,
  initialLang,
  saveCountry,
  saveLang,
  type Country,
  type Lang,
} from "@/lib/i18n";
import ResultCard, { type CheckResult } from "@/components/ResultCard";
import ScammedSheet from "@/components/ScammedSheet";
import { cn } from "@/lib/utils";

const MAX = 3000;

interface CheckRequest {
  message: string;
  language: Lang;
  country: Country;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [country, setCountry] = useState<Country>(initialCountry);
  const [message, setMessage] = useState("");
  // Set when the language changes after a result: the old result is cleared and we offer a re-check.
  const [langChanged, setLangChanged] = useState(false);
  const d = DICTS[lang];

  const check = useMutation({
    mutationFn: (body: CheckRequest) => apiPost<CheckResult>("/check", body),
  });

  const changeLang = (l: Lang) => {
    if (l === lang) return;
    if (check.isSuccess) {
      check.reset();
      setLangChanged(true);
    }
    setLang(l);
    saveLang(l);
    document.documentElement.lang = l;
  };
  const changeCountry = (c: Country) => {
    setCountry(c);
    saveCountry(c);
  };

  const trimmed = message.trim();
  const tooLong = message.length > MAX;
  const canSubmit = trimmed.length > 0 && !tooLong && !check.isPending;
  const submit = () => {
    if (!canSubmit) return;
    setLangChanged(false);
    check.mutate({ message: trimmed, language: lang, country });
  };

  const rateLimited = check.error instanceof ApiError && check.error.status === 429;
  const pct = Math.min(100, (message.length / MAX) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="/" data-testid="brand-logo" className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#1D4ED8] text-white shadow-sm">
              <ShieldCheck className="size-6" aria-hidden />
            </span>
            <span className="leading-tight">
              <span className="block text-[20px] font-extrabold tracking-tight text-[#0F172A]">ScamOrNot</span>
              <span className="block text-[13px] font-medium text-slate-500">{d.tagline}</span>
            </span>
          </a>

          <div className="flex items-end gap-2">
            <label htmlFor="country-select" className="flex flex-col">
              <span className="px-1 text-[12px] font-semibold uppercase tracking-wide text-slate-500">{d.country}</span>
            <select
              id="country-select"
              data-testid="country-selector"
              value={country}
              onChange={(e) => changeCountry(e.target.value as Country)}
              className="h-12 min-w-[150px] cursor-pointer rounded-xl border-2 border-[#1D4ED8] bg-white px-3 text-[17px] font-bold text-[#1E3A8A] shadow-sm transition-colors duration-150 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <option value="AU">🇦🇺 {d.australia}</option>
              <option value="ID">🇮🇩 {d.indonesia}</option>
            </select>
            </label>

            <div className="flex flex-col">
              <span className="px-1 text-[12px] font-semibold uppercase tracking-wide text-slate-500">{d.language}</span>
            <div role="group" aria-label={d.language} className="flex h-12 rounded-xl border-2 border-slate-200 bg-slate-100 p-1">
              {(["en", "id"] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  data-testid={`lang-toggle-${l}`}
                  aria-pressed={lang === l}
                  onClick={() => changeLang(l)}
                  className={cn(
                    "min-w-11 rounded-lg px-3 text-[15px] font-bold transition-[background-color,color] duration-150",
                    lang === l ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-600 hover:text-slate-900",
                  )}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <h1 data-testid="hero-title" className="text-[32px] sm:text-[40px] font-extrabold leading-[1.15] tracking-tight text-[#0F172A]">
          {d.heroTitle}
        </h1>
        <p className="mt-3 max-w-2xl text-[18px] leading-relaxed text-slate-600">{d.heroSub}</p>

        <div
          data-testid="privacy-notice"
          className="mt-7 flex items-start gap-3 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4"
        >
          <Lock className="mt-0.5 size-6 shrink-0 text-[#2563EB]" aria-hidden />
          <div>
            <p className="text-[17px] font-bold text-[#1E3A8A]">{d.privacy}</p>
            <p className="text-[15px] text-[#1E40AF]">{d.privacySub}</p>
          </div>
        </div>

        <form
          className="mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 sm:p-5 shadow-sm transition-[border-color,box-shadow] duration-150 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100">
            <label htmlFor="msg" className="text-[16px] font-semibold text-slate-800">{d.inputLabel}</label>
            <textarea
              id="msg"
              data-testid="scam-input-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={d.placeholder}
              rows={7}
              maxLength={MAX + 500}
              className="mt-2 block w-full resize-y bg-transparent text-[18px] leading-relaxed text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <div className="mt-2 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={cn("h-full rounded-full transition-[width] duration-200", tooLong ? "bg-[#DC2626]" : pct > 85 ? "bg-[#F59E0B]" : "bg-[#1D4ED8]")}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span
                data-testid="char-counter"
                aria-live="polite"
                className={cn("text-[14px] font-medium tabular-nums", tooLong ? "text-[#DC2626]" : "text-slate-500")}
              >
                {message.length} / {MAX} {d.chars}
              </span>
            </div>
            {tooLong && (
              <p data-testid="too-long-error" role="alert" className="mt-2 text-[15px] font-semibold text-[#DC2626]">
                {d.tooLong}
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[15px] font-medium text-slate-500">{d.tryExample}</span>
            {SAMPLES.map((s) => (
              <button
                key={s.key}
                type="button"
                data-testid={`sample-btn-${s.key}`}
                onClick={() => setMessage(s.text)}
                className="min-h-10 rounded-full border border-slate-300 bg-white px-3.5 text-[14px] font-semibold text-slate-700 transition-[background-color,border-color] duration-150 hover:border-blue-400 hover:bg-blue-50"
              >
                {s.label[lang]}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              data-testid="check-scam-button"
              disabled={!canSubmit}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-8 text-[19px] font-bold text-white shadow-md shadow-blue-900/15 transition-[background-color,transform,opacity] duration-150 hover:bg-[#1E40AF] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            >
              {check.isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" aria-hidden /> {d.checking}
                </>
              ) : (
                <>
                  <Search className="size-5" aria-hidden /> {d.check}
                </>
              )}
            </button>
            {message && !check.isPending && (
              <button
                type="button"
                data-testid="clear-input-button"
                onClick={() => {
                  setMessage("");
                  setLangChanged(false);
                  check.reset();
                }}
                className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl px-4 text-[16px] font-semibold text-slate-600 transition-colors duration-150 hover:bg-slate-100"
              >
                <X className="size-4" aria-hidden /> {d.clear}
              </button>
            )}
            <div className="sm:ml-auto">
              <ScammedSheet d={d} lang={lang} country={country} />
            </div>
          </div>
        </form>

        {check.isError && (
          <div
            role="alert"
            data-testid="friendly-error-card"
            className="mt-8 rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-sm animate-in fade-in duration-200"
          >
            <div className="flex items-start gap-3">
              <CloudOff className="mt-0.5 size-7 shrink-0 text-slate-500" aria-hidden />
              <div>
                <h2 className="text-[20px] font-bold text-slate-900">{d.errorTitle}</h2>
                <p className="mt-1 text-[17px] leading-relaxed text-slate-700">{rateLimited ? d.rateLimited : d.errorBody}</p>
                <button
                  type="button"
                  data-testid="retry-analysis-button"
                  onClick={submit}
                  disabled={!canSubmit}
                  className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-[#1D4ED8] px-5 text-[16px] font-bold text-[#1D4ED8] transition-colors duration-150 hover:bg-blue-50 disabled:opacity-50"
                >
                  <RotateCcw className="size-4" aria-hidden /> {d.retry}
                </button>
              </div>
            </div>
          </div>
        )}

        {langChanged && trimmed && !check.isPending && (
          <div className="mt-8 animate-in fade-in duration-200">
            <button
              type="button"
              data-testid="recheck-language-button"
              onClick={submit}
              disabled={!canSubmit}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-[#1D4ED8] bg-white px-5 text-[16px] font-bold text-[#1D4ED8] transition-colors duration-150 hover:bg-blue-50 disabled:opacity-50"
            >
              <RotateCcw className="size-4" aria-hidden /> {d.recheckLang}
            </button>
          </div>
        )}

        {check.isSuccess && check.data && <ResultCard result={check.data} d={d} />}
      </main>

      <footer className="bg-[#0F172A] text-[#F8FAFC]">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck className="size-5 text-[#60A5FA]" aria-hidden /> ScamOrNot
          </div>
          <p data-testid="footer-disclaimer" className="mt-3 text-[16px] leading-relaxed text-[#CBD5E1]">
            {d.disclaimer}
          </p>
          <p className="mt-1 text-[14px] text-[#94A3B8]">{d.footerPrivacy}</p>
        </div>
      </footer>
    </div>
  );
}
