"""Criterion: Indonesia likely-scam next steps mention IASC (OJK 157 or WhatsApp 081157157157)."""


def test_indonesian_family_impersonation_mentions_iasc(client):
    body = {
        "message": "Mah, ini nomor baru aku, HP lama hilang. Tolong transfer 2 juta ke rekening ini sekarang ya, darurat banget.",
        "language": "id",
        "country": "ID",
    }
    resp = client.post("/check", json=body)
    assert resp.status_code == 200, resp.text
    data = resp.json()

    assert data["verdict"] in ("likely_scam", "suspicious"), data

    steps_text = " ".join(data["next_steps"])
    mentions_iasc = any(
        token in steps_text for token in ["IASC", "157", "081157157157", "OJK"]
    )
    assert mentions_iasc, f"next_steps did not mention IASC/OJK/157: {data['next_steps']}"
