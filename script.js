/* ============================================
   PORTFOLIO — Interactions
   ============================================ */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", () => {
    // -------- Year
    const yearNode = $("#year");
    if (yearNode) yearNode.textContent = String(new Date().getFullYear());

    // -------- Mobile nav
    const navToggle = $("#nav-toggle");
    const navContent = $("#nav-content");
    if (navToggle && navContent) {
      const closeMenu = () => {
        navContent.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      };
      navToggle.addEventListener("click", () => {
        const open = navContent.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
      $$("a", navContent).forEach((a) => a.addEventListener("click", closeMenu));
      document.addEventListener("keydown", (e) => e.key === "Escape" && closeMenu());
      window.addEventListener("resize", () => {
        if (window.innerWidth > 960) closeMenu();
      });
    }

    // -------- Header scroll state + scroll progress
    const header = $("#site-header");
    const bar = $("#scroll-bar");
    const updateScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 20);
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (y / max) * 100 : 0;
        bar.style.width = pct.toFixed(2) + "%";
      }
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    // -------- Reveal on scroll
    const revealNodes = $$(".reveal");
    if ("IntersectionObserver" in window && !prefersReducedMotion) {
      revealNodes.forEach((n, i) => {
        n.style.transitionDelay = Math.min(i * 60, 280) + "ms";
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );
      revealNodes.forEach((n) => io.observe(n));
    } else {
      revealNodes.forEach((n) => n.classList.add("in-view"));
    }

    // -------- Active nav link via section observer
    const navLinks = $$("#nav-content a[data-nav]");
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      const setActive = (id) => {
        navLinks.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + id)
        );
      };
      const so = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => so.observe(s));
    }

    // -------- Subtle parallax on hero mesh
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!prefersReducedMotion && isFinePointer) {
      const meshes = $$(".mesh");
      window.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        meshes.forEach((m, i) => {
          const f = (i + 1) * 10;
          m.style.translate = `${x * f}px ${y * f}px`;
        });
      });
    }
  });
})();

