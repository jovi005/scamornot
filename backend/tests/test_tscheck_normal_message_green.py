"""Criterion: Normal, benign message -> no_obvious_red_flags verdict with no block/delete advice."""

BLOCK_WORDS = ["block", "delete", "report them", "hapus", "blokir"]


def test_normal_message_returns_green(client):
    body = {
        "message": "Hey it's Sam from the FIT2004 study group, are we still meeting at the library at 3pm tomorrow?",
        "language": "en",
        "country": "AU",
    }
    resp = client.post("/check", json=body)
    assert resp.status_code == 200, resp.text
    data = resp.json()

    assert data["verdict"] == "no_obvious_red_flags", data
    assert data["scam_type"] in ("None identified", "—", "None") or "none" in data["scam_type"].lower()

    steps_text = " ".join(data["next_steps"]).lower()
    for w in BLOCK_WORDS:
        assert w not in steps_text, f"next_steps told user to '{w}': {data['next_steps']}"
