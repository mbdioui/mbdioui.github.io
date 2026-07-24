// Formation page — entrypoint
// - Renders the lesson card grid (matches .project-card pattern from the homepage)
// - Handles module filter
// - Applies i18n to all [data-i18n] elements (innerHTML for bodies, textContent for labels)

import { UI } from "../data/formation-config";
import formationIndex from "../data/formation/formation-index.json";

const LANG = document.documentElement.lang === "en" ? "en" : "fr";
const t = UI[LANG];

// ── i18n ─────────────────────────────────────────────────────────
// textContent for short labels, innerHTML for paragraph bodies that
// contain <strong> tags.
const i18nTextNodes = document.querySelectorAll("[data-i18n]:not([data-i18n-html])");
i18nTextNodes.forEach((el) => {
  const key = el.getAttribute("data-i18n");
  if (t[key] != null) el.textContent = t[key];
});
const i18nHtmlNodes = document.querySelectorAll("[data-i18n-html]");
i18nHtmlNodes.forEach((el) => {
  const key = el.getAttribute("data-i18n-html");
  if (t[key] != null) el.innerHTML = t[key];
});

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Render a single lesson card ──────────────────────────────────
function renderCard(lesson) {
  const data = lesson[LANG];
  const isFree = lesson.access === "full";
  const slug = lesson.numero.replace(".", "-");
  const langSuffix = LANG === "en" ? "-us" : "";
  const href = `lecon-${slug}${langSuffix}.html`;
  const label = isFree ? t.cardOpen : `${t.cardPreview}: ${data.titre}`;

  const link = document.createElement("a");
  link.className = "lesson-card";
  link.href = href;
  link.setAttribute("data-id", lesson.id);
  link.setAttribute("data-module", String(lesson.module));
  link.setAttribute("data-access", lesson.access);
  link.setAttribute("aria-label", label);

  const numLabel = LANG === "fr" ? "Leçon" : "Lesson";
  const modLabel = LANG === "fr" ? "Module" : "Module";

  link.innerHTML = `
    <div class="lesson-card__top">
      <span class="lesson-card__num">${numLabel} ${lesson.numero} · ${modLabel} ${lesson.module}</span>
      <span class="lesson-card__duration"><i class="fa fa-clock-o" aria-hidden="true"></i> ${lesson.duree_minutes} ${t.cardDuration}</span>
    </div>

    <span class="lesson-card__badge ${isFree ? "lesson-card__badge--free" : "lesson-card__badge--locked"}">
      ${isFree ? `<i class="fa fa-unlock" aria-hidden="true"></i> ${t.badgeFree}` : `<i class="fa fa-lock" aria-hidden="true"></i> ${t.badgeLocked}`}
    </span>

    <h3 class="lesson-card__title">${escapeHtml(data.titre)}</h3>

    <p class="lesson-card__objectif">${escapeHtml(data.objectif)}</p>

    <div class="lesson-card__footer">
      <span>
        ${isFree ? `<i class="fa fa-arrow-right" aria-hidden="true"></i> ${t.cardOpen}` : `<i class="fa fa-eye" aria-hidden="true"></i> ${t.cardPreview}`}
      </span>
      <span class="lesson-card__module-tag">
        <i class="fa fa-bookmark" aria-hidden="true"></i> ${t.moduleLabel} ${lesson.module}
      </span>
    </div>
  `;

  return link;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

// ── Render the grid + update filter counts ─────────────────────
function renderGrid(lessons) {
  const grid = document.getElementById("formationGrid");
  if (!grid) return;
  grid.innerHTML = "";
  lessons.forEach((l) => grid.appendChild(renderCard(l)));

  const total = lessons.length;
  const m1 = lessons.filter((l) => l.module === 1).length;
  const m2 = lessons.filter((l) => l.module === 2).length;
  setText("filterCountAll", total);
  setText("filterCount1", m1);
  setText("filterCount2", m2);
}

// ── Module filter ────────────────────────────────────────────────
function setupFilter() {
  const btns = document.querySelectorAll(".formation-filter__btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.getAttribute("data-filter");
      const cards = document.querySelectorAll(".lesson-card");
      cards.forEach((card) => {
        const mod = card.getAttribute("data-module");
        if (filter === "all" || mod === filter) {
          card.classList.remove("lesson-card--hidden");
        } else {
          card.classList.add("lesson-card--hidden");
        }
      });
    });
  });
}

// ── Boot ─────────────────────────────────────────────────────────
function boot() {
  try {
    const lessons = formationIndex;
    renderGrid(lessons);
    setupFilter();

    if (window.ScrollReveal) {
      const sr = window.ScrollReveal();
      sr.reveal(".lesson-card", {
        distance: "20px",
        duration: 400,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        origin: "bottom",
        interval: 60,
        reset: false,
      });
    }
  } catch (e) {
    console.error("[formation] Failed to load:", e);
    const grid = document.getElementById("formationGrid");
    if (grid) {
      grid.innerHTML = `<div class="detail-block" style="grid-column: 1 / -1;"><p class="detail-block__text">${escapeHtml(t.error)}</p></div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", boot);
