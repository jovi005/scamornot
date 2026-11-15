from typing import List, Literal

from pydantic import BaseModel, Field

MAX_MESSAGE_CHARS = 3000

Verdict = Literal["likely_scam", "suspicious", "no_obvious_red_flags"]
Language = Literal["en", "id"]
Country = Literal["AU", "ID"]


class CheckRequest(BaseModel):
    message: str = Field(min_length=1, max_length=MAX_MESSAGE_CHARS)
    language: Language = "en"
    country: Country = "AU"


class CheckResult(BaseModel):
    verdict: Verdict
    scam_type: str
    red_flags: List[str]
    next_steps: List[str]
