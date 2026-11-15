# ScamOrNot — spec

Free bilingual (EN / Bahasa Indonesia) scam checker for Australia & Indonesia. No accounts, no database writes.

## Flows
- Header: EN/ID toggle (`lang-toggle-en|id`) and country select AU/ID (`country-selector`), independent. Defaults detected from browser (`id*` → ID + Indonesia, else EN + Australia), saved in localStorage (`scamshield.lang`, `scamshield.country`).
- Checker: paste message (max 3000 chars, counter) → "Check it" → POST `/api/check` → result card: verdict (🔴 likely_scam / 🟠 suspicious / 🟢 no_obvious_red_flags), scam_type, red_flags[], next_steps[]. Example buttons fill the box.
- Friendly error card + retry on any failure (502 ai_unavailable, 429 rate_limited).
- "I've already been scammed" → right-side sheet with country-specific steps from `frontend/src/config/resources.ts` (editable config).

## API
- `POST /api/check` body `{message (1..3000), language: "en"|"id", country: "AU"|"ID"}` → `CheckResult {verdict, scam_type, red_flags, next_steps}`.
- Rate limit: 10 requests / 60 s per client IP (in-memory) → 429.
- LLM: Gemini 3 Flash (`gemini-3-flash-preview`) via emergentintegrations + EMERGENT_LLM_KEY. Message treated as untrusted data (prompt-injection = red flag); leans to "suspicious" when unsure; malformed verdict → "suspicious".
- Pasted messages are never stored or logged.

## Behaviour rules (v2)
- Changing EN/ID after a result clears it and shows `recheck-language-button` ("Check again to see this in English" / "...Bahasa Indonesia"); no auto re-run.
- 🟢 results: scam type row hidden; list heading "What we checked" (`flags-heading`).
- Prompt: only evidence present in text, conditional phrasing for unknown context, no jargon, ordinary messages → 🟢 with gentle advice, AU→Scamwatch / ID→IASC (157, WA 081157157157) in next steps.
- Header country select has visible "Country" label; panel header reads "Help for: Australia|Indonesia".
