import { AlertOctagon, AlertTriangle, ShieldCheck, Flag, ListChecks } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type Verdict = "likely_scam" | "suspicious" | "no_obvious_red_flags";

export interface CheckResult {
  verdict: Verdict;
  scam_type: string;
  red_flags: string[];
  next_steps: string[];
}

const STYLES: Record<Verdict, { wrap: string; badge: string; emoji: string; Icon: typeof AlertOctagon }> = {
  likely_scam: {
    wrap: "bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]",
    badge: "bg-[#DC2626] text-white",
    emoji: "🔴",
    Icon: AlertOctagon,
  },
  suspicious: {
    wrap: "bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]",
    badge: "bg-[#F59E0B] text-[#78350F]",
    emoji: "🟠",
    Icon: AlertTriangle,
  },
  no_obvious_red_flags: {
    wrap: "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]",
    badge: "bg-[#15803D] text-white",
    emoji: "🟢",
    Icon: ShieldCheck,
  },
};

export default function ResultCard({ result, d }: { result: CheckResult; d: Dict }) {
  const s = STYLES[result.verdict];
  const isGreen = result.verdict === "no_obvious_red_flags";
  return (
    <section
      aria-live="polite"
      data-testid="verdict-result-card"
      className="mt-8 space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className={cn("rounded-2xl border-2 p-5 sm:p-6", s.wrap)}>
        <p className="text-[15px] font-semibold uppercase tracking-wide opacity-80">{d.verdictLabel}</p>
        <div className="mt-2 flex items-start gap-3">
          <s.Icon className="mt-1 size-8 shrink-0" aria-hidden />
          <h2 data-testid="verdict-label" className="text-2xl sm:text-[28px] font-bold leading-tight">
            <span aria-hidden className="mr-2">{s.emoji}</span>
            {d[result.verdict]}
          </h2>
        </div>
        <p className="mt-3 text-[16px] opacity-90">{d.verdictNote}</p>
        {result.verdict !== "no_obvious_red_flags" && (
        <div data-testid="scam-type-row" className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[15px] font-semibold">{d.scamType}:</span>
          <span data-testid="scam-type" className={cn("rounded-full px-3 py-1 text-[15px] font-semibold", s.badge)}>
            {result.scam_type}
          </span>
        </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-[22px] font-bold text-slate-900">
          {isGreen ? (
            <ShieldCheck className="size-6 text-[#15803D]" aria-hidden />
          ) : (
            <Flag className="size-6 text-[#DC2626]" aria-hidden />
          )}{" "}
          <span data-testid="flags-heading">{isGreen ? d.whatWeChecked : d.redFlags}</span>
        </h3>
        {result.red_flags.length ? (
          <ul data-testid="red-flags-list" className="mt-4 space-y-3">
            {result.red_flags.map((f, i) => (
              <li key={i} data-testid={`red-flag-${i}`} className="flex gap-3 text-[17px] leading-relaxed text-slate-800">
                <span className={cn("mt-2.5 size-2 shrink-0 rounded-full", isGreen ? "bg-[#15803D]" : "bg-[#DC2626]")} aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p data-testid="no-red-flags" className="mt-3 text-[17px] text-slate-700">{d.noRedFlags}</p>
        )}
      </div>

      <div className="rounded-2xl border border-blue-200 bg-[#EFF6FF] p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-[22px] font-bold text-[#1E3A8A]">
          <ListChecks className="size-6 text-[#1D4ED8]" aria-hidden /> {d.nextSteps}
        </h3>
        <ol data-testid="next-steps-list" className="mt-4 space-y-3">
          {result.next_steps.map((step, i) => (
            <li key={i} data-testid={`next-step-${i}`} className="flex gap-3 text-[17px] leading-relaxed text-slate-800">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-[15px] font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
