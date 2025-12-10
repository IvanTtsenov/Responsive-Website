
  function getDeviceType() {
    const ua = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile)))/i.test(ua);
    const isMobile = /mobile|iphone|ipod|android.*mobile|blackberry|iemobile|opera mini/i.test(ua);
    if (isTablet) return "tablet";
    if (isMobile) return "mobile";
    if (window.innerWidth <= 767) return "mobile";
    if (window.innerWidth <= 1024) return "tablet";
    return "desktop";
  }

  let deviceType = getDeviceType();
  const body = document.querySelector("body");
  if(deviceType == "mobile"){
    body.classList.add("mobile");
  }else if(deviceType == "tablet"){
    body.classList.add("tablet");
  }else if(deviceType == "desktop" && !body.classList.contains("desktop")){
    body.classList.add("desktop");
  }

  const menu = document.querySelector(".menu");
  const pages = document.querySelector(".pages_wrapper");

    menu.addEventListener("click", () => {
      pages.classList.toggle("hidden");
    });

