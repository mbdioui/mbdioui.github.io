#!/usr/bin/env python3
"""
One-shot script: extract a light index + copy full lessons for the portfolio.

Source: formation_android/lecon_*.json (22 lessons, FR+EN)
Output (placed in src/data/formation/ so Parcel can serve them):
  - src/data/formation/formation-index.json  (metadata + truncated preview)
  - src/data/formation/lessons/lecon_*.json  (full content, ~330 ko total)

Run:  python3 src/data/formation/build_index.py
"""
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent.parent.parent
SRC = ROOT / "formation_android"
OUT = ROOT / "src" / "data" / "formation"
LESSONS_OUT = OUT / "lessons"

FREE_LESSONS = {"1.1", "1.2", "1.3"}
PREVIEW_CHARS = 280


def detect_module(numero: str) -> int:
    return int(numero.split(".")[0])


def truncate(text: str, limit: int) -> str:
    if not text:
        return ""
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut + "…"


def _lesson_sort_key(src_file: Path) -> tuple:
    """Sort by module then by lesson sequence number (1.2 < 1.10)."""
    numero = src_file.stem.replace("lecon_", "").replace("_", ".")
    module, seq = numero.split(".")
    return (int(module), int(seq))


def build_index():
    index = []
    for src_file in sorted(SRC.glob("lecon_*.json"), key=_lesson_sort_key):
        with src_file.open(encoding="utf-8") as f:
            data = json.load(f)
        lesson = data[0]
        numero = lesson["lecon_numero"]
        module = detect_module(numero)
        access = "full" if numero in FREE_LESSONS else "teaser"
        entry = {
            "id": f"lecon_{numero.replace('.', '_')}",
            "numero": numero,
            "module": module,
            "duree_minutes": lesson.get("duree_minutes", 0),
            "theme": lesson.get("lecon_theme", ""),
            "access": access,
            "fr": {
                "titre": lesson["fr"]["titre"],
                "objectif": lesson["fr"]["objectif"],
                "preview_theorie": truncate(lesson["fr"]["theorie"], PREVIEW_CHARS),
            },
            "en": {
                "titre": lesson["en"]["titre"],
                "objectif": lesson["en"]["objectif"],
                "preview_theorie": truncate(lesson["en"]["theorie"], PREVIEW_CHARS),
            },
        }
        index.append(entry)
    return index


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    LESSONS_OUT.mkdir(parents=True, exist_ok=True)

    index = build_index()

    index_path = OUT / "formation-index.json"
    with index_path.open("w", encoding="utf-8") as f:
        json.dump(index, f, ensure_ascii=False, indent=2)

    for src_file in sorted(SRC.glob("lecon_*.json")):
        dest = LESSONS_OUT / src_file.name
        shutil.copy2(src_file, dest)

    full_count = sum(1 for e in index if e["access"] == "full")
    teaser_count = sum(1 for e in index if e["access"] == "teaser")
    total_minutes = sum(e["duree_minutes"] for e in index)
    modules = sorted({e["module"] for e in index})

    print(f"✅ Index written: {index_path}")
    print(f"   {len(index)} leçons ({full_count} full, {teaser_count} teaser)")
    print(f"   Modules: {modules}")
    print(f"   Durée totale: {total_minutes} min (~{total_minutes / 60:.1f}h)")
    print(f"✅ Lessons copied to {LESSONS_OUT}")


if __name__ == "__main__":
    main()
