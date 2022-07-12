let scroll = 0;
const scrollImg = document.getElementById('scroll');
const topImg = document.getElementById('top');
const projects = document.getElementById('projects');
const projectsBand = document.getElementById('projects-band');

function SetScroll() {
    scroll = window.scrollY;
    console.log(scroll);
    if (scroll > 40) {
        scrollImg.style.display = "none";
        topImg.style.display = "block";
        projectsBand.style.display = "block";
        topImg.style.opacity = (scroll - 40)/20;

        if (scroll < 248) {
            projects.style.left = 0 + (scroll - 40)/10 + "vw";
            projects.style.opacity = (scroll - 40)/85;
            projectsBand.style.opacity = (scroll - 40)/85;
        }
    }
    else {
        projectsBand.style.display = "none";
        scrollImg.style.display = "block";
        scrollImg.style.opacity = 1 - (scroll/40);
        topImg.style.display = "none";
        projects.style.left = "-" + 100 + "vw";
    }
}

function ScrollPos(pos) {
    window.scrollTo(pos, 0);
}