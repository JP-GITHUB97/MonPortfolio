// Helpers
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

/* Year */
$("#year").textContent = new Date().getFullYear();

/* Mobile nav */
const navToggle = $("#navToggle");
const navLinks = $("#navLinks");

navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
});

/* Close nav on click (mobile) */
$$(".nav__link").forEach(a => {
    a.addEventListener("click", () => {
        if (navLinks.classList.contains("is-open")) {
            navLinks.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
});

/* Reveal on scroll */
const revealEls = $$(".reveal");
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("is-visible");
    });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

/* Active nav link while scrolling */
const sections = ["accueil", "apropos", "projets", "competences", "experience", "contact", "galerie"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

const navItems = $$(".nav__link");

const setActive = () => {
    let currentId = "accueil";
    const y = window.scrollY + 140;

    for (const s of sections) {
        if (s.offsetTop <= y) currentId = s.id;
    }

    navItems.forEach(a => {
        const href = a.getAttribute("href");
        const id = href && href.startsWith("#") ? href.slice(1) : "";
        a.classList.toggle("is-active", id === currentId);
    });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();

/* Gallery lightbox */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");
const lightboxCaption = $("#lightboxCaption");
const lightboxClose = $("#lightboxClose");

const openLightbox = (src, alt, caption) => {
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightboxCaption.textContent = caption || "";
};

const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    lightboxCaption.textContent = "";
};

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
});

$$(".gallery__item").forEach(item => {
    item.addEventListener("click", () => {
        const img = $("img", item);
        const cap = $("figcaption", item);
        openLightbox(img.src, img.alt, cap ? cap.textContent : "");
    });
});

(() => {
    const el = document.getElementById("typewriter");
    if (!el) return;

    const words = [
        "Je suis :",
        "Ingénieur GTB/GTC",
        "Automatisme & Supervision"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 70;      // vitesse écriture
    const deletingSpeed = 40;    // vitesse effacement
    const pauseAfterWord = 900;  // pause après un mot complet

    function tick() {
        const current = words[wordIndex];

        if (!isDeleting) {
            charIndex++;
            el.textContent = current.substring(0, charIndex);

            if (charIndex === current.length) {
                isDeleting = true;
                return setTimeout(tick, pauseAfterWord);
            }
            return setTimeout(tick, typingSpeed);
        } else {
            charIndex--;
            el.textContent = current.substring(0, charIndex);

            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            return setTimeout(tick, deletingSpeed);
        }
    }

    tick();
})();
