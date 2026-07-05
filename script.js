
const reveals = document.querySelectorAll(
    ".project-card, .project-row, .about-card, .contact a"
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