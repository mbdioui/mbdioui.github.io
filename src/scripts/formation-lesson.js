// Lesson page — entrypoint
// - Tab switching (click tab → activate matching panel + tab button)
// - QCM interactivity (click option → reveal correct/wrong + explanation)
// - Locked-content page: nothing interactive to do here

(function () {
  // ── Tabs: switch panels + tab button active state ─────────────────────
  const tabLinks = document.querySelectorAll(".lesson-tabs__btn");
  const panels = document.querySelectorAll(".lesson-panel");

  function activateTab(hash) {
    if (!hash) hash = "#tab-theory";
    tabLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === hash));
    panels.forEach((p) => p.classList.toggle("is-active", "#" + p.id === hash));
  }

  if (tabLinks.length) {
    tabLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        // Prevent the browser from jumping; we manage the active class ourselves
        e.preventDefault();
        const hash = link.getAttribute("href");
        history.replaceState(null, "", hash);
        activateTab(hash);
      });
    });
    // Initial active state from URL hash (or default to first tab)
    activateTab(window.location.hash);
  }

  // ── QCM: click an option, mark correct/wrong, reveal explanation ─────
  function isCorrect(opt) {
    const v = opt.getAttribute("data-correct");
    // Python wrote "True"/"False" but defensively accept both casings
    return v === "true" || v === "True" || v === "1";
  }

  const questions = document.querySelectorAll(".quiz-question");
  questions.forEach((q) => {
    const options = q.querySelectorAll(".quiz-option");
    const explanation = q.querySelector(".quiz-explanation");
    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        if (opt.disabled) return;
        // Lock the question
        options.forEach((o) => {
          o.disabled = true;
          if (isCorrect(o)) o.classList.add("is-correct");
        });
        if (!isCorrect(opt)) {
          opt.classList.add("is-wrong");
          q.classList.add("is-wrong");
        } else {
          q.classList.add("is-correct");
        }
        if (explanation) explanation.classList.add("is-revealed");
      });
    });
  });
})();
