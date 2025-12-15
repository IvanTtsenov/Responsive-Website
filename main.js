const menu = document.querySelector(".menu");
const pages = document.querySelector(".pages_wrapper");
const pagesLinks = document.querySelectorAll(".pages_links");
const body = document.querySelector("body");
const langBtn = document.querySelector(".language");
const langMenu = document.querySelector(".languageChoose");
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.move.next');
const prevBtn = document.querySelector('.move.prev');
function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile)))/i.test(ua);
    const isMobile = /mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua);
    if (isTablet) return "tablet";
    if (isMobile) return "mobile";
    return "desktop";
}

function getDeviceOrientation() {
    return window.matchMedia("(orientation: portrait)").matches
        ? "portrait"
        : "landscape";
}

function updateOrientationClasses() {
    const body = document.body;

    body.classList.remove("portrait", "landscape");

    if (window.matchMedia("(orientation: portrait)").matches) {
        body.classList.add("portrait");
    } else {
        body.classList.add("landscape");
    }
}

updateOrientationClasses();
window.addEventListener("orientationchange", updateOrientationClasses);

let deviceType = getDeviceType();
if (deviceType == "mobile") {
    body.classList.add("mobile");
    pages.classList.add("hidden");
} else if (deviceType == "tablet") {
    body.classList.add("tablet");
    pages.classList.add("hidden");
} else if (deviceType == "desktop" && !body.classList.contains("desktop")) {
    body.classList.add("desktop");
}

let currentPage = window.location.pathname.split("/").pop().split(".")[0]
if (currentPage === "index") {
    currentPage = "";
}


menu.addEventListener("click", (e) => {
    e.stopPropagation();
    if (deviceType != "desktop") {
        pages.classList.toggle("hidden");
    } else {
        pages.classList.toggle("open");
    }
});

document.addEventListener("click", (e) => {
    const clickedInsideMenu = pages.contains(e.target) || menu.contains(e.target);

    if (!clickedInsideMenu && !pages.classList.contains("hidden") && deviceType != "desktop") {
        pages.classList.add("hidden");
    } else if (!clickedInsideMenu && pages.classList.contains("open") && deviceType === "desktop") {
        pages.classList.remove("open");
    }

    const clickedInsideLangBtn = langBtn.contains(e.target) || menu.contains(e.target);

    if (!clickedInsideLangBtn && langBtn.classList.contains("open")) {
        langMenu.classList.toggle("hidden");
        langBtn.classList.remove("open");
    }
});

pagesLinks.forEach(el => {
    el.classList.remove("active")

    if (currentPage === el.getAttribute("data-page")) {
        el.classList.add("active");
    }
});

langBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langMenu.classList.toggle("hidden");
    langBtn.classList.toggle("open");
});

if (window.location.pathname.split("/")[1].toUpperCase() == "BG") {
    langBtn.childNodes[0].textContent = "BG";
    document.documentElement.setAttribute("lang", "bg");
} else {
    langBtn.childNodes[0].textContent = "EN";
    document.documentElement.setAttribute("lang", "en");
}

let current = 0;
let interval;
const delay = 4000;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('current'));
    dots.forEach(dot => dot.classList.remove('current'));

    slides[index].classList.add('current');
    dots[index].classList.add('current');
    current = index;
}

function nextSlide() {
    current = (current + 1) % slides.length;
    showSlide(current);
}

function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
}

function startAuto() {
    interval = setInterval(nextSlide, delay);
}

function stopAuto() {
    clearInterval(interval);
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAuto();
    startAuto();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAuto();
    startAuto();
});

dots.forEach(dot => {
    dot.addEventListener('click', e => {
        showSlide(+e.target.dataset.index);
        stopAuto();
        startAuto();
    });
});

const slider = document.querySelector('.slideshow_container');
slider.addEventListener('mouseenter', stopAuto);
slider.addEventListener('mouseleave', startAuto);

let startX = 0;

slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextSlide();
    if (endX - startX > 50) prevSlide();
});
startAuto();