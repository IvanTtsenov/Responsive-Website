const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const nextBtn = document.querySelector('.move.next');
const prevBtn = document.querySelector('.move.prev');

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