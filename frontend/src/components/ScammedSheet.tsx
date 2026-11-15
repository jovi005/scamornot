import { LifeBuoy, Phone, ExternalLink, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RESOURCES, t } from "@/config/resources";
import type { Country, Dict, Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function ContactIcon({ href }: { href: string }) {
  if (href.startsWith("tel:")) return <Phone className="size-5" aria-hidden />;
  if (href.includes("wa.me")) return <MessageCircle className="size-5" aria-hidden />;
  return <ExternalLink className="size-5" aria-hidden />;
}

export default function ScammedSheet({ d, lang, country }: { d: Dict; lang: Lang; country: Country }) {
  const steps = RESOURCES[country];
  return (
    <Sheet>
      <SheetTrigger
        data-testid="emergency-help-button"
        className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-[#FECDD3] bg-[#FFF1F2] px-5 py-3 text-[17px] font-semibold text-[#9F1239] transition-[background-color,transform] duration-150 hover:bg-[#FFE4E6] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
      >
        <LifeBuoy className="size-5" aria-hidden /> {d.scammedBtn}
      </SheetTrigger>
      <SheetContent side="right" data-testid="emergency-help-modal" className="data-[side=right]:w-full data-[side=right]:sm:max-w-lg gap-0 overflow-y-auto bg-white">
        <SheetHeader className="border-b border-rose-100 bg-[#FFF1F2] p-6 pr-14">
          <SheetTitle className="text-2xl font-bold text-[#881337]">{d.scammedTitle}</SheetTitle>
          <SheetDescription className="text-[16px] text-[#9F1239]">
            {d.scammedSub}
          </SheetDescription>
          <p data-testid="emergency-country" className="text-[15px] font-semibold text-[#881337]">
            <span aria-hidden className="mr-1">{country === "AU" ? "🇦🇺" : "🇮🇩"}</span>
            {d.scammedFor}: {country === "AU" ? d.australia : d.indonesia}
          </p>
        </SheetHeader>
        <ol className="space-y-4 p-6">
          {steps.map((s, i) => (
            <li
              key={s.key}
              data-testid={`resource-step-${s.key}`}
              className={cn(
                "rounded-2xl border p-4",
                s.urgent ? "border-[#FECDD3] bg-[#FFF1F2]" : "border-slate-200 bg-white",
              )}
            >
              <div className="flex gap-3">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-[15px] font-bold text-white",
                    s.urgent ? "bg-[#E11D48]" : "bg-[#1D4ED8]",
                  )}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[18px] font-bold text-slate-900">{t(s.title, lang)}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-slate-700">{t(s.body, lang)}</p>
                  {s.contacts && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.contacts.map((c) => (
                        <a
                          key={c.href}
                          href={c.href}
                          target={c.href.startsWith("tel:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          data-testid={`resource-link-${s.key}-${c.display.replace(/[^a-z0-9]/gi, "").toLowerCase()}`}
                          className="inline-flex min-h-12 max-w-full flex-wrap items-center gap-x-2 break-all rounded-xl border border-blue-200 py-2 bg-[#EFF6FF] px-4 text-[16px] font-semibold text-[#1D4ED8] transition-colors duration-150 hover:bg-blue-100"
                        >
                          <ContactIcon href={c.href} />
                          <span className="text-slate-600 font-medium">{t(c.label, lang)}:</span> {c.display}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </SheetContent>
    </Sheet>
  );
}
