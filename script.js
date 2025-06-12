window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Under line
const navLinks = document.querySelectorAll(".nav-link");
const underline = document.querySelector(".nav-underline");
const sections = document.querySelectorAll("section, .home");
let activeLink = null;

// Move underline under target element
function moveUnderline(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.parentElement.getBoundingClientRect();
    underline.style.left = `${rect.left - parentRect.left + rect.width / 2 - 15}px`;
}

// Set a new active link
function setActiveLink(link) {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    activeLink = link;
    moveUnderline(link);
}

// Hover: move underline to hovered link
navLinks.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        moveUnderline(e.target);
    });

    // Optional: clicking manually sets active
    link.addEventListener("click", (e) => {
        setActiveLink(e.target);
    });
});

// Mouse leaves navbar → return underline to current active
document.querySelector(".navbar-ul").addEventListener("mouseleave", () => {
    if (activeLink) moveUnderline(activeLink);
});

// Scroll → update active link and underline
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 2) {
            current = section.getAttribute("id");
        }
    });

    const matchingLink = [...navLinks].find(link => link.getAttribute("href") === `#${current}`);
    if (matchingLink && matchingLink !== activeLink) {
        setActiveLink(matchingLink);
    }
});

// Initial setup on load
window.addEventListener("load", () => {
    const initial = document.querySelector(".nav-link.active") || navLinks[0];
    setActiveLink(initial);
    underline.style.opacity = "1";
});

// Gallery scroll bar
 