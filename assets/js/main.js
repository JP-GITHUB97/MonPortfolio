// Burger menu
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

if (burger && nav) {
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav--open");
    });

    // Close menu on link click (mobile)
    nav.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => nav.classList.remove("nav--open"));
    });
}

// Active link on scroll
const sections = ["home", "about", "projects", "skills", "experience", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

const links = Array.from(document.querySelectorAll(".nav__link"));

function setActiveLink() {
    const y = window.scrollY + 120;
    let currentId = "home";

    for (const s of sections) {
        if (s.offsetTop <= y) currentId = s.id;
    }

    links.forEach((l) => {
        const target = l.getAttribute("href").replace("#", "");
        l.classList.toggle("active", target === currentId);
    });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Year
document.getElementById("year").textContent = new Date().getFullYear();
