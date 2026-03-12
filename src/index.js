import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// ── Navbar: add shadow when scrolled ──────────────────────────────────────────
const navbar = document.getElementById("navbar");

if (navbar) {
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
}

// ── Navbar: mobile hamburger toggle ───────────────────────────────────────────
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the mobile menu when any nav link is clicked
  navLinks.querySelectorAll(".navbar__link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Close the mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navbar.contains(e.target)) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ── Navbar: highlight active section on scroll ────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinkEls = document.querySelectorAll(".navbar__link[href^='#']");

if (sections.length && navLinkEls.length) {
  const highlightActiveLink = () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkEls.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", highlightActiveLink, { passive: true });
  highlightActiveLink(); // run once on load
}
