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

function moveUnderline(target) {
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.parentElement.getBoundingClientRect();
    underline.style.left = `${rect.left - parentRect.left + rect.width / 2 - 15}px`;
}

navLinks.forEach(link => {
    link.addEventListener("mouseenter", (e) => {
        moveUnderline(e.target);
    });

    link.addEventListener("mouseleave", () => {
        const active = document.querySelector(".nav-link.active");
        if (active) moveUnderline(active);
    });
});

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop - sectionHeight / 2) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
            moveUnderline(link);
        }
    });
});

// Move underline to the first link on load
window.addEventListener("load", () => {
    const active = document.querySelector(".nav-link");
    if (active) {
        moveUnderline(active);
        underline.style.opacity = "1"; // show after positioning
    }
});