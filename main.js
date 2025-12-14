const menu = document.querySelector(".menu");
const pages = document.querySelector(".pages_wrapper");
const pagesLinks = document.querySelectorAll(".pages_links");
const body = document.querySelector("body");
const langBtn = document.querySelector(".language");
const langMenu = document.querySelector(".languageChoose");

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


