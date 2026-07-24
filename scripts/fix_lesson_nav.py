#!/usr/bin/env python3
"""Add prev/next navigation to all lesson HTML files (idempotent)."""
import re
from pathlib import Path

LESSONS = [
    "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "1.10",
    "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19", "1.20",
    "2.1", "2.2",
]

SRC = Path("/Users/medsalahbdioui/mbdioui.github.io/src")
NAV_RE = re.compile(r'<div class="lesson-nav[^"]*">.*?</div>\s*', re.DOTALL)


def build_nav(prev_num, next_num, lang, suffix):
    prev_link = ""
    if prev_num:
        prev_file = f"lecon-{prev_num.replace('.', '-')}{suffix}.html"
        prev_label = "Leçon précédente" if lang == "fr" else "Previous lesson"
        prev_link = (
            f'<a class="lesson-prev" href="{prev_file}">'
            f'<i class="fa fa-arrow-left" aria-hidden="true"></i> '
            f'<strong>{prev_label}</strong></a>'
        )

    next_link = ""
    if next_num:
        next_file = f"lecon-{next_num.replace('.', '-')}{suffix}.html"
        next_label = "Leçon suivante" if lang == "fr" else "Next lesson"
        next_link = (
            f'<a class="lesson-next" href="{next_file}">'
            f'<i class="fa fa-arrow-right" aria-hidden="true"></i> '
            f'<strong>{next_label}</strong></a>'
        )

    nav_class = "lesson-nav" + (" lesson-nav--start" if not prev_link else "")
    items = "\n          ".join([item for item in (prev_link, next_link) if item])
    return f'<div class="{nav_class}">\n          {items}\n        </div>'


def find_matching_close(html, open_tag, close_tag, start_idx):
    """Return index of the matching close_tag for open_tag found at start_idx."""
    open_tag_len = len(open_tag)
    close_tag_len = len(close_tag)
    depth = 1
    pos = start_idx + open_tag_len
    while depth > 0 and pos < len(html):
        next_open = html.find(open_tag, pos)
        next_close = html.find(close_tag, pos)
        if next_close == -1:
            return -1
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + open_tag_len
        else:
            depth -= 1
            if depth == 0:
                return next_close
            pos = next_close + close_tag_len
    return -1


def insert_nav(html, nav_block):
    # Full-access lessons have a resume panel: place nav just before its closing </section>.
    resume_open = html.find('<section id="tab-resume"')
    if resume_open != -1:
        close_idx = find_matching_close(html, "<section", "</section>", resume_open)
        if close_idx != -1:
            return html[:close_idx] + "\n        " + nav_block + "\n      " + html[close_idx:]

    # Locked lessons: insert nav just before the closing </div> of .lesson-panels.
    panels_open = html.find('<div class="lesson-panels">')
    if panels_open != -1:
        close_idx = find_matching_close(html, "<div", "</div>", panels_open)
        if close_idx != -1:
            return html[:close_idx] + "\n\n        " + nav_block + "\n      " + html[close_idx:]

    return html


def main():
    for i, num in enumerate(LESSONS):
        prev_num = LESSONS[i - 1] if i > 0 else None
        next_num = LESSONS[i + 1] if i < len(LESSONS) - 1 else None

        for lang, suffix in [("fr", ""), ("en", "-us")]:
            file = SRC / f"lecon-{num.replace('.', '-')}{suffix}.html"
            if not file.exists():
                print(f"MISSING: {file}")
                continue
            html = file.read_text(encoding="utf-8")
            clean_html = NAV_RE.sub("", html)

            nav_block = build_nav(prev_num, next_num, lang, suffix)
            new_html = insert_nav(clean_html, nav_block)

            if new_html != html:
                file.write_text(new_html, encoding="utf-8")
                print(f"UPDATED: {file.name} (prev={prev_num}, next={next_num})")
            else:
                print(f"NO CHANGE: {file.name}")


if __name__ == "__main__":
    main()
