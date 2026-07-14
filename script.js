const reveals = document.querySelectorAll(
    ".project-row, .about-card, .contact a"
);

function revealElements(){
    reveals.forEach(element=>{
        const windowHeight = window.innerHeight;
        const top = element.getBoundingClientRect().top;
        if(top < windowHeight - 100){
            element.classList.add("reveal");
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
revealElements();

function redirectToProject(url) {
    window.open(url, "_blank");
}

const projectCards = document.querySelectorAll(".project-row, .project-card");
projectCards.forEach(card => {
    card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        redirectToProject(url);
    });
});

(function () {
    const section = document.getElementById("stackSection");
    if (!section) return;

    const cards = Array.from(section.querySelectorAll(".project-card"));

    const startOffsets = [
        { x: 0,   y: 0   },  
        { x: 60,  y: 760 },  
        { x: -40, y: 1280 },  
    ];

    const cardRanges = [
        { start: 0,   end: 0   },  
        { start: 0,   end: 0.5 },  
        { start: 0.5, end: 1   },  
    ];

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function clamp(v, min, max) {
        return Math.min(Math.max(v, min), max);
    }

    function isMobile() {
        return window.innerWidth <= 900;
    }

    function onStackScroll() {
        if (isMobile()) {
            cards.forEach(card => { card.style.transform = ""; });
            return;
        }

        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;

        const scrolled = -rect.top;
        const runway = sectionHeight - viewportHeight;
        const rawProgress = runway > 0 ? clamp(scrolled / runway, 0, 1) : 0;

        cards.forEach((card, i) => {
            const offset = startOffsets[i];
            const range = cardRanges[i];

            const span = range.end - range.start;
            const localProgress = span > 0
                ? clamp((rawProgress - range.start) / span, 0, 1)
                : 0;
            const eased = easeOutCubic(localProgress);

            const y = offset.y * (1 - eased);
            const x = offset.x * (1 - eased);
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                onStackScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", onStackScroll);
    onStackScroll();
})();