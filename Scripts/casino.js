const casinoBtn = document.querySelector('.casino_start');
const casinoPrizes = document.querySelectorAll('.game_contents');
const casinoImages = document.querySelectorAll('.game_cards');
const winner = document.querySelector('.winner');
const winnerWrapepr = document.querySelector('.winner .wrapper');
const winnerPop = document.querySelector('.pop-up');
const closeBtn = document.querySelector('.close-btn');
const winnerMessage = document.querySelector('.winningMessage');
let randomIndex = null;
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


let isClicked = false;
function gameLogic() {
    casinoPrizes.forEach(prize => {
        prize.classList.remove('random');
    });
    randomIndex = getRandomInt(casinoPrizes.length);
    casinoPrizes[randomIndex].classList.add('random');
}

casinoBtn.addEventListener('click', () => {
    if (isClicked) {
        return;
    }
    isClicked = true;
    casinoBtn.disabled = true;
    casinoBtn.classList.add('disabled');
    let intervalId = setInterval(gameLogic, 200);

    setTimeout(() => {
        clearInterval(intervalId);
        isClicked = false;
        casinoBtn.disabled = false;
        casinoBtn.classList.remove('disabled');
        prisePop(randomIndex);
    }, 3000);
});

function prisePop(randomIndex) {
    const prizeName = casinoImages[randomIndex].getAttribute('prize');
    winnerPop.src = `../Sources/${prizeName}.png`
    winner.classList.remove('hidden');
    if (document.documentElement.lang.toLowerCase() === "en".toLowerCase()) {
        if (prizeName.toLowerCase() === "explode".toLowerCase()) {
            winnerMessage.textContent = "Oops! Try Again.";
        } else {
            winnerMessage.textContent = "Congratulations! You've won!"
        }
    } else if (document.documentElement.lang.toLowerCase() === "bg".toLowerCase()) {
        if (prizeName.toLowerCase() === "explode".toLowerCase()) {
            winnerMessage.textContent = "Опа! Опитайте отново!";
        } else {
            winnerMessage.textContent = "Поздравления! Вие спечелихте!"
        }
    }
}

closeBtn.addEventListener('click', () => {
    winner.classList.add('hidden');
});