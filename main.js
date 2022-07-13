let scroll = 0;
const scrollImg = document.getElementById('scroll');
const topImg = document.getElementById('top');
const projects = document.getElementById('projects');
const projectsBox1 = document.getElementById('projects-box1');
const projectsBox2 = document.getElementById('projects-box2');
const title = document.getElementById('title');
const projectsBand = document.getElementById('projects-band');
const aboutBand = document.getElementById('about-band');
const aboutWord = document.getElementById('about-word');
const aboutText = document.getElementById('about-text');
const skillsBand = document.getElementById('skills-band');
const skillsWord = document.getElementById('skills-word');
const skillsText1 = document.getElementById('skills-text1');
const skillsText2 = document.getElementById('skills-text2');


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
        else {
            projects.style.left = 20.5 + "vw";
            projectsBand.style.opacity = 1;
        }
        if (scroll < 440) {
            projectsBox1.style.left = -50 + (scroll - 40)/8 + "vw";
            projectsBox1.style.opacity = (scroll - 40)/350;
        }
        else 
            projectsBox1.style.left = 0 + "vw";

        if (scroll < 632) {
            projectsBox2.style.left = -100 + (scroll - 40)/6 + "vw";
            projectsBox2.style.opacity = (scroll - 40)/550;
        }
        else 
            projectsBox2.style.left = 0 + "vw";
    }
    else {
        projectsBand.style.display = "none";
        scrollImg.style.display = "block";
        scrollImg.style.opacity = 1 - (scroll/40);
        topImg.style.display = "none";
        projects.style.left = -100 + "vw";
    }

    if (scroll > 850) {
        if (scroll < 1250) 
            aboutBand.style.opacity = (scroll - 825)/325;

        if (scroll < 1100) {
            aboutWord.style.left = (scroll - 825)/30 + "vw";
        }
        if (scroll < 1400) {
            aboutText.style.left = (scroll - 825)/20 + "vw";
        }
    }

    if (scroll > 1400) {
        if (scroll < 1800) 
            skillsBand.style.opacity = (scroll - 1400)/325;

        if (scroll < 1650) {
            skillsWord.style.left = (scroll - 1400)/30 + "vw";
        }
        if (scroll < 1950) {
            skillsText1.style.left = (scroll - 1400)/15 + "vw";
            skillsText2.style.left = (scroll - 1400)/10 + "vw";
        }
    }
}

function ScrollPos(pos) {
    window.scrollTo({
        top: pos,
        behavior: 'smooth',
    });
}