
function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile)))/i.test(ua);
    const isMobile = /mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua);
    if (isTablet) return "tablet";
    if (isMobile) return "mobile";
    return "desktop";
}

let deviceType = getDeviceType();
const body = document.querySelector("body");
if (deviceType == "mobile") {
    body.classList.add("mobile");
} else if (deviceType == "tablet") {
    body.classList.add("tablet");
} else if (deviceType == "desktop" && !body.classList.contains("desktop")) {
    body.classList.add("desktop");
}

const currentPage = window.location.pathname.split("/").pop().split(".")[0] 
const menu = document.querySelector(".menu");
const pages = document.querySelector(".pages_wrapper");
const pagesLinks = document.querySelectorAll(".pages_links");
menu.addEventListener("click", () => {
    pages.classList.toggle("hidden");
});

pagesLinks.forEach(el => {
    if(el.classList.contains("active")){
        el.classList.remove("active")
    }
    if(currentPage === el.getAttribute("data-page")){
        el.classList.add("active");
    }
});



