const categories = {
    fruits: ["🍎", "🍌", "🍒", "🍇", "🍉", "🍍", "🍊", "🍓"],
    emojis: ["😊", "😂", "🥺", "😍", "😎", "😜", "😱", "🤔"],
    animals: ["🐶", "🐱", "🐻", "🦁", "🐯", "🐸", "🐸", "🦊"],
    planets: ["🌍", "🪐", "🌕", "🌑", "🌟", "☄️", "🪐", "🌌"],
    landmarks: ["🗿", "🗽", "🗼", "⛩️", "🕌", "🕋", "⛲", "🛕"]
};

let selectedCategory = [];
let shuffledCards = [];
let flippedCards = [];
let score = 0;
let timer = 30;
let gameTimer;


document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", (e) => startGame(e.target.dataset.category));
});

function startGame(category) {
    selectedCategory = [...categories[category], ...categories[category]];
    shuffledCards = shuffle(selectedCategory);
    document.getElementById("landing-page").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    createCards(shuffledCards);
    startTimer();
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(cards) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";
    cards.forEach((cardValue, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", index);
        card.addEventListener("click", handleCardClick);
        card.innerHTML = "";
        container.appendChild(card);

        
    });
}

function handleCardClick(event) {
    const clickedCard = event.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains("flipped")) {
        clickedCard.classList.add("flipped");
        clickedCard.innerHTML = shuffledCards[clickedCard.getAttribute("data-id")];
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards[0].style.backgroundColor = flippedCards[1].style.backgroundColor = "green";
        score += 10;
        updateScore();
        flippedCards = [];
        checkForWin();
    } else {
        setTimeout(() => {
            flippedCards[0].classList.remove("flipped");
            flippedCards[1].classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function updateScore() {
    document.getElementById("score").innerText = score;
}
function startTimer() {
    gameTimer = setInterval(() => {
        if (timer > 0) {
            timer--; 
            document.getElementById("timer").innerText = timer; 
        } else {
            clearInterval(gameTimer); 
            gameOver("You lost ☹️! Time's up.");
        }
    }, 1000);
}


function checkForWin() {
    if (document.querySelectorAll(".flipped").length === shuffledCards.length) {
        clearInterval(gameTimer);
        gameOver("Congratulations, You Win 🥳!");
    }
}

function gameOver(message) {
    alert(message); 
    let tryAgain = confirm("You lost! Wanna try again?");
    if (tryAgain) {
        restartGame();
    } else {
        document.getElementById("game-message").innerText = "Thanks for playing!";
    }
}


function restartGame() {
    score = 0;
    timer = 30;
    document.getElementById("timer").innerText = timer; 
    

    
    startGame(selectedCategory); 
    startTimer();
}

function checkForMatch() {
    if (flippedCards[0].innerHTML === flippedCards[1].innerHTML) {
        flippedCards[0].style.backgroundColor = flippedCards[1].style.backgroundColor = "green";
        score += 10;
        updateScore();
        flippedCards = [];
        checkForWin();
    } else {
     
        setTimeout(() => {
            flippedCards[0].classList.remove("flipped");
            flippedCards[1].classList.remove("flipped");
            flippedCards[0].innerHTML = "";
            flippedCards[1].innerHTML = "";
            flippedCards = [];
        }, 1000); 
    }
}


