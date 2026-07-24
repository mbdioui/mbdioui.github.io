#!/usr/bin/env python3
"""
Generate one static HTML page per lesson (22 FR + 22 EN).

Each page follows the same pattern as the main page (index.html):
  - .navbar header (with About/Experience/Skills/Projects/Training/Contact)
  - .hero section (eyebrow + title + desc + actions)
  - .section-padding sections (back-nav, program, sidebar, etc.)
  - .footer footer

Body content is tabs-based (Théorie / Exercice / QCM / Erreurs / Résumé)
implemented in plain HTML; tab switching handled by scripts/formation-lesson.js.

Output:
  src/lecon-X-Y.html
  src/lecon-X-Y-us.html

Run:  python3 src/data/formation/build_lessons.py
"""
import json
from pathlib import Path

# Script lives at: <repo>/src/data/formation/build_lessons.py
# 4 levels up from the script = repo root.
ROOT = Path(__file__).resolve().parents[3]
INDEX_PATH = ROOT / "src" / "data" / "formation" / "formation-index.json"
LESSONS_DIR = ROOT / "src" / "data" / "formation" / "lessons"
OUT_DIR = ROOT / "src"
# No CV / flag links on formation pages — they must stay focused on the course.


# ── Shared CSS injected into every lesson page <head> ────────────
# (mirrors the :root tokens from index.html so var(--color-*) works)
ROOT_CSS = """
:root {
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-text: #0f172a;
  --color-text-muted: #475569;
  --color-primary: #10b981;
  --color-primary-dark: #047857;
  --color-secondary: #0ea5e9;
  --color-secondary-dark: #0369a1;
  --color-accent: #8b5cf6;
  --color-border: rgba(15, 23, 42, 0.08);
  --shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04);
  --shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.04);
  --radius-sm: 0.8rem;
  --radius-md: 1.2rem;
  --radius-lg: 2rem;
  --radius-full: 9999px;
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
  --container: min(90%, 1200px);
  --header-height: 7rem;
  --header-height-mobile: 6rem;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
""".strip()


def load_full_lesson(numero: str) -> dict:
    """Load the full JSON for a given lesson number, return first entry."""
    fname = f"lecon_{numero.replace('.', '_')}.json"
    with (LESSONS_DIR / fname).open(encoding="utf-8") as f:
        return json.load(f)[0]


def esc(s: str) -> str:
    if s is None:
        return ""
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


# ── Content labels (per language) ────────────────────────────────
LABELS = {
    "fr": {
        "theory": "Théorie",
        "analogy": "Analogie",
        "startingCode": "Code de départ",
        "solution": "Solution",
        "hints": "Indices",
        "explanation": "Explication",
        "why": "Pourquoi",
        "fix": "Correction",
        "nextPrefix": "Leçon suivante :",
        "requestAccess": "Demander l'accès",
        "locked": "VERROUILLÉ",
        "free": "OFFERT",
    },
    "en": {
        "theory": "Theory",
        "analogy": "Analogy",
        "startingCode": "Starting code",
        "solution": "Solution",
        "hints": "Hints",
        "explanation": "Explanation",
        "why": "Why",
        "fix": "Fix",
        "nextPrefix": "Next lesson:",
        "requestAccess": "Request access",
        "locked": "LOCKED",
        "free": "FREE",
    },
}


# ── Per-lesson content renderers ────────────────────────────────

def render_question(q: dict, idx: int, lang: str) -> str:
    labels = LABELS[lang]
    letters = ["A", "B", "C", "D"]
    options_html = ""
    for letter in letters:
        key = f"reponse{idx}{letter}"
        text = q.get(key, "")
        is_correct = letter == q.get(f"correct{idx}")
        options_html += (
            f'<button class="quiz-option" data-correct="{str(is_correct)}" type="button">'
            f'<span class="quiz-option-letter">{letter}</span>'
            f'<span>{esc(text)}</span></button>\n'
        )
    return f"""
      <div class="quiz-question" data-question="{idx}">
        <h4 class="quiz-question__title">
          <span class="quiz-question__num">{idx}</span>
          <span>{esc(q.get(f"question{idx}", ""))}</span>
        </h4>
        <div class="quiz-question__options">{options_html}</div>
        <div class="quiz-explanation">
          <div class="quiz-explanation__icon"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> {labels['explanation']}</div>
          <p class="quiz-explanation__text">{esc(q.get(f"explication{idx}", ""))}</p>
        </div>
      </div>"""


def render_error_block(q: dict, idx: int, lang: str) -> str:
    labels = LABELS[lang]
    return f"""
      <div class="lesson-error">
        <div class="lesson-error__icon"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>
        <div class="lesson-error__body">
          <h4 class="lesson-error__title">{esc(q.get(f"erreur{idx}", ""))}</h4>
          <p class="lesson-error__why"><strong>{labels['why']} :</strong> {esc(q.get(f"pourquoi{idx}", ""))}</p>
          <p class="lesson-error__fix"><strong>{labels['fix']} :</strong> {esc(q.get(f"correction{idx}", ""))}</p>
        </div>
      </div>"""


def render_hints(q: dict, lang: str) -> str:
    labels = LABELS[lang]
    items = "".join(
        f"<li>{esc(q.get(f'hint{i}', ''))}</li>" for i in (1, 2, 3) if q.get(f"hint{i}")
    )
    if not items:
        return ""
    return f'<h3 class="lesson-hints__title">{labels["hints"]}</h3><ol class="lesson-hints">{items}</ol>'


def render_full_content(lang: str, lesson: dict, next_href: str = "") -> str:
    labels = LABELS[lang]
    body = lesson[lang]
    q = body  # the JSON flattens questions onto the lang object

    # Theory block
    theory = f"""
      <section id="tab-theory" class="lesson-panel is-active">
        <div class="detail-block">
          <h3 class="detail-block__title">{labels['theory']}</h3>
          <p class="lesson-text">{esc(body.get('theorie', ''))}</p>
        </div>
        <div class="lesson-analogie">
          <span class="lesson-analogie__label">{labels['analogy']}</span>
          <p>{esc(body.get('analogie', ''))}</p>
        </div>
      </section>"""

    exercise = f"""
      <section id="tab-exercise" class="lesson-panel">
        <div class="detail-block">
          <h3 class="detail-block__title">{esc(body.get('exercice_titre', 'Exercice'))}</h3>
          <p class="lesson-text">{esc(body.get('exercice_instructions', ''))}</p>
        </div>
        <div class="detail-block">
          <span class="lesson-code-label">{labels['startingCode']}</span>
          <pre class="lesson-code"><code>{esc(body.get('exercice_code_depart', ''))}</code></pre>
        </div>
        {render_hints(q, lang)}
        <div class="detail-block">
          <span class="lesson-code-label">{labels['solution']}</span>
          <pre class="lesson-code"><code>{esc(body.get('exercice_solution', ''))}</code></pre>
        </div>
      </section>"""

    questions_html = "".join(render_question(q, i, lang) for i in (1, 2, 3))
    quiz = f"""
      <section id="tab-quiz" class="lesson-panel">
        <div class="lesson-quiz">{questions_html}</div>
      </section>"""

    errors_html = "".join(render_error_block(q, i, lang) for i in (1, 2, 3))
    errors = f"""
      <section id="tab-errors" class="lesson-panel">
        {errors_html}
      </section>"""

    next_text = esc(body.get("prochaine_lecon", ""))
    next_link = ""
    if next_text:
        href = esc(next_href) if next_href else "#"
        next_link = (
            f'<a class="lesson-next" href="{href}">'
            f'<i class="fa fa-arrow-right" aria-hidden="true"></i> '
            f'{labels["nextPrefix"]} <strong>{next_text}</strong></a>'
        )
    resume = f"""
      <section id="tab-resume" class="lesson-panel">
        <div class="lesson-resume">{esc(body.get('resume', ''))}</div>
        {next_link}
      </section>"""

    return theory + exercise + quiz + errors + resume


def render_teaser_content(lang: str, lesson: dict) -> str:
    """For teaser lessons: show only the objective + a 'locked' banner."""
    body = lesson[lang]
    is_en = lang == "en"
    contact_href = "index-us.html#contact" if is_en else "index.html#contact"
    cta = "Request full access" if is_en else "Demander l'accès complet"
    intro_title = "Objective" if is_en else "Objectif"
    preview_title = "Preview" if is_en else "Aperçu"
    locked_title = "Locked content" if is_en else "Contenu verrouillé"
    locked_body = (
        "This lesson is part of the full program. Request access via the contact form to unlock the theory, the exercise, the quiz and the corrections."
        if is_en
        else "Cette leçon fait partie du programme complet. Demande l'accès via le formulaire de contact pour débloquer la théorie, l'exercice, le quiz et les corrections."
    )
    return f"""
      <section id="tab-theory" class="lesson-panel is-active">
        <div class="detail-block">
          <h3 class="detail-block__title">{intro_title}</h3>
          <p class="lesson-text">{esc(body.get('objectif', ''))}</p>
        </div>
        <div class="detail-block">
          <h3 class="detail-block__title">{preview_title}</h3>
          <p class="lesson-text">{esc(body.get('preview_theorie', ''))}</p>
        </div>
        <div class="formation-access">
          <span class="formation-access__icon" aria-hidden="true">
            <i class="fa fa-lock"></i>
          </span>
          <div class="formation-access__body">
            <h3 class="formation-access__title">{locked_title}</h3>
            <p class="formation-access__text">{locked_body}</p>
            <div class="formation-access__actions">
              <a href="{contact_href}" class="btn btn--primary">
                <i class="fa fa-envelope" aria-hidden="true"></i> {cta}
              </a>
            </div>
          </div>
        </div>
      </section>"""


# ── Page builder ────────────────────────────────────────────────

def build_page(lang: str, index_entry: dict, full_lesson: dict | None, index: list) -> str:
    """Generate one static lesson page."""
    numero = index_entry["numero"]
    is_free = index_entry["access"] == "full"
    page_slug = f"lecon-{numero.replace('.', '-')}"
    is_en = lang == "en"

    # i18n strings
    if is_en:
        i18n = {
            "title": f"Mohamed BDIOUI | Lesson {numero}",
            "back": "Back to all lessons",
            "tabTheory": "Theory",
            "tabExercise": "Exercise",
            "tabQuiz": "Quiz",
            "tabErrors": "Common errors",
            "tabResume": "Summary",
            "stackTitle": "Stack taught",
            "free": "FREE",
            "locked": "LOCKED",
        }
    else:
        i18n = {
            "title": f"Mohamed BDIOUI | Leçon {numero}",
            "back": "Toutes les leçons",
            "tabTheory": "Théorie",
            "tabExercise": "Exercice",
            "tabQuiz": "Quiz",
            "tabErrors": "Erreurs courantes",
            "tabResume": "Résumé",
            "stackTitle": "Stack enseignée",
            "free": "OFFERT",
            "locked": "VERROUILLÉ",
        }

    home_href = "index-us.html" if is_en else "index.html"
    formation_href = "formation-us.html" if is_en else "formation.html"
    contact_href = f"{home_href}#contact"

    data = index_entry[lang]

    # Determine the real next lesson page from the ordered index
    next_href = ""
    next_numero = ""
    for idx, entry in enumerate(index):
        if entry["numero"] == numero:
            if idx + 1 < len(index):
                next_numero = index[idx + 1]["numero"]
            break
    if next_numero:
        suffix = "-us" if is_en else ""
        next_href = f"lecon-{next_numero.replace('.', '-')}{suffix}.html"

    if is_free and full_lesson:
        tab_content = render_full_content(lang, full_lesson, next_href)
        tab_nav = f"""
        <nav class="lesson-tabs" aria-label="Lesson sections">
          <a class="lesson-tabs__btn is-active" href="#tab-theory"><i class="fa fa-book" aria-hidden="true"></i> {i18n["tabTheory"]}</a>
          <a class="lesson-tabs__btn" href="#tab-exercise"><i class="fa fa-code" aria-hidden="true"></i> {i18n["tabExercise"]}</a>
          <a class="lesson-tabs__btn" href="#tab-quiz"><i class="fa fa-question-circle" aria-hidden="true"></i> {i18n["tabQuiz"]}</a>
          <a class="lesson-tabs__btn" href="#tab-errors"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {i18n["tabErrors"]}</a>
          <a class="lesson-tabs__btn" href="#tab-resume"><i class="fa fa-list-alt" aria-hidden="true"></i> {i18n["tabResume"]}</a>
        </nav>"""
    else:
        tab_content = render_teaser_content(lang, index_entry)
        tab_nav = ""

    if is_en:
        about_label = "About"
        exp_label = "Experience"
        skills_label = "Skills"
        projects_label = "Projects"
        training_label = "Training"
        contact_label = "Contact"
        built_by = "Built by"
        aria_back = "Back to home"
        aria_toggle = "Open/close menu"
        aria_nav = "Main navigation"
        social_label = "Social media"
    else:
        about_label = "À propos"
        exp_label = "Expérience"
        skills_label = "Compétences"
        projects_label = "Projets"
        training_label = "Formation"
        contact_label = "Contact"
        built_by = "Développé par"
        aria_back = "Retour à l'accueil"
        aria_toggle = "Ouvrir/fermer le menu"
        aria_nav = "Navigation principale"
        social_label = "Réseaux sociaux"

    return f"""<!DOCTYPE html>
<html lang="{'en' if is_en else 'fr'}" class="sr formation-page">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="shortcut icon" type="image/png" href="assets/favicon.png" />
  <title>{esc(i18n['title'])}</title>
  <meta name="description" content="{esc(data.get('objectif', ''))}" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="styles.scss" />
  <script defer src="https://unpkg.com/scrollreveal@4.0.0/dist/scrollreveal.min.js"></script>
  <style>{ROOT_CSS}</style>
</head>

<body>
  <input type="checkbox" id="menu-toggle" class="sr-only" aria-hidden="true" />

  <header class="navbar">
    <div class="navbar__container">
      <a href="{home_href}#top" class="navbar__brand" aria-label="{aria_back}">MB<span>.</span></a>

      <label for="menu-toggle" class="navbar__toggle" aria-label="{aria_toggle}" role="button" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <nav class="navbar__menu" aria-label="{aria_nav}">
        <a href="{home_href}#about" class="navbar__link">{about_label}</a>
        <a href="{home_href}#experience" class="navbar__link">{exp_label}</a>
        <a href="{home_href}#skills" class="navbar__link">{skills_label}</a>
        <a href="{home_href}#projects" class="navbar__link">{projects_label}</a>
        <a href="{formation_href}" class="navbar__link">{training_label}</a>
        <a href="{home_href}#contact" class="navbar__link">{contact_label}</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="lesson-hero-title">
      <div class="hero__bg" aria-hidden="true"></div>
      <div class="hero__grid" aria-hidden="true"></div>

      <div class="hero__content">
        <div class="hero__intro">
          <span class="hero__eyebrow">
            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
            {'Lesson' if is_en else 'Leçon'} {numero} · {'Module' if is_en else 'Module'} {index_entry['module']} · {i18n['free'] if is_free else i18n['locked']}
          </span>
          <h1 id="lesson-hero-title" class="hero__title">{esc(data['titre'])}</h1>
          <p class="hero__desc">{esc(data.get('objectif', ''))}</p>
          <div class="hero__actions">
            <a href="{formation_href}" class="btn btn--outline">
              <i class="fa fa-arrow-left" aria-hidden="true"></i> {i18n['back']}
            </a>
            {f'<a href="#tab-quiz" class="btn btn--primary"><i class="fa fa-question-circle" aria-hidden="true"></i> {i18n["tabQuiz"]}</a>' if is_free else f'<a href="{contact_href}" class="btn btn--primary"><i class="fa fa-envelope" aria-hidden="true"></i> {LABELS[lang]["requestAccess"]}</a>'}
          </div>
        </div>

        <div class="hero__visual">
          <div class="hero__card">
            <div class="lesson-hero-meta">
              <div class="lesson-hero-meta__item">
                <i class="fa fa-clock-o" aria-hidden="true"></i>
                <div>
                  <span class="lesson-hero-meta__label">{'Duration' if is_en else 'Durée'}</span>
                  <span class="lesson-hero-meta__value">{index_entry['duree_minutes']} min</span>
                </div>
              </div>
              <div class="lesson-hero-meta__item">
                <i class="fa fa-bookmark" aria-hidden="true"></i>
                <div>
                  <span class="lesson-hero-meta__label">{'Module' if is_en else 'Module'}</span>
                  <span class="lesson-hero-meta__value">{index_entry['module']}</span>
                </div>
              </div>
              <div class="lesson-hero-meta__item">
                <i class="fa fa-{'unlock' if is_free else 'lock'}" aria-hidden="true"></i>
                <div>
                  <span class="lesson-hero-meta__label">{'Access' if is_en else 'Accès'}</span>
                  <span class="lesson-hero-meta__value">{i18n['free'] if is_free else i18n['locked']}</span>
                </div>
              </div>
              <div class="lesson-hero-meta__item">
                <i class="fa fa-graduation-cap" aria-hidden="true"></i>
                <div>
                  <span class="lesson-hero-meta__label">{'Number' if is_en else 'Numéro'}</span>
                  <span class="lesson-hero-meta__value">{numero}</span>
                </div>
              </div>
            </div>
            <span class="hero__badge hero__badge--1">
              <i class="fa fa-code" aria-hidden="true"></i>
              Kotlin
            </span>
            <span class="hero__badge hero__badge--2">
              <i class="fa fa-android" aria-hidden="true"></i>
              Compose
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="lesson-content section-padding">
      <div class="container">
        {tab_nav}
        <div class="lesson-panels">{tab_content}</div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer__social" aria-label="{social_label}">
        <a href="https://buymeacoffee.com/mbdioui" target="_blank" rel="noreferrer" aria-label="Buy me a coffee"><i class="fa fa-coffee" aria-hidden="true"></i></a>
        <a href="https://www.linkedin.com/in/medsalahbdioui/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
        <a href="mailto:bdiouimedsalah@gmail.com" aria-label="Email"><i class="fa fa-envelope" aria-hidden="true"></i></a>
        <a href="https://github.com/mbdioui" target="_blank" rel="noreferrer" aria-label="GitHub"><i class="fa fa-github" aria-hidden="true"></i></a>
      </div>
      <p class="footer__text">
        © 2026 — {built_by} <a href="https://github.com/mbdioui" target="_blank" rel="noreferrer">Mohamed BDIOUI</a>
      </p>
    </div>
  </footer>

  <script defer type="module" src="index.js"></script>
  <script defer type="module" src="scripts/formation-lesson.js"></script>
</body>

</html>
"""


def main():
    with INDEX_PATH.open(encoding="utf-8") as f:
        index = json.load(f)

    out_dir = OUT_DIR
    generated = 0
    for entry in index:
        numero = entry["numero"]
        full = load_full_lesson(numero) if entry["access"] == "full" else None
        for lang in ("fr", "en"):
            html = build_page(lang, entry, full, index)
            page_slug = f"lecon-{numero.replace('.', '-')}"
            fname = f"{page_slug}-us.html" if lang == "en" else f"{page_slug}.html"
            (out_dir / fname).write_text(html, encoding="utf-8")
            generated += 1
    print(f"✅ Generated {generated} lesson pages ({generated // 2} FR + {generated // 2} EN)")


if __name__ == "__main__":
    main()
