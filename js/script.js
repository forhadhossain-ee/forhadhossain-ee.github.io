(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-navigation");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const progressBar = document.querySelector("#scroll-progress-bar");
  const year = document.querySelector("#footer-year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (year) year.textContent = String(new Date().getFullYear());

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const setMenuOpen = (open) => {
    if (!menuButton || !mobileMenu) return;
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  };

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    });
  }

  const sectionLinks = navLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter((item) => item.section);

  const activateLink = (activeId) => {
    sectionLinks.forEach(({ link, section }) => {
      const active = section.id === activeId;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) activateLink(visible.target.id);
    }, { rootMargin: "-28% 0px -62% 0px", threshold: [0, 0.15, 0.35, 0.6] });

    sectionLinks.forEach(({ section }) => sectionObserver.observe(section));
  }

  let scrollTicking = false;
  const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    scrollTicking = false;
  };

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollProgress);
      scrollTicking = true;
    }
  }, { passive: true });

  updateScrollProgress();
})();