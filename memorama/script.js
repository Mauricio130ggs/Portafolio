const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
];

let cards = [...colors, ...colors];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval = null;
let canFlip = true;

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            timer++;
            document.getElementById('timer').textContent = timer + 's';
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function createBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = '';
    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((color, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.color = color;
        card.dataset.index = i;
        
        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back" style="background-color: ${color}"></div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    startTimer();
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const color1 = card1.dataset.color;
    const color2 = card2.dataset.color;

    if (color1 === color2) {
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            document.getElementById('pairs').textContent = `${matchedPairs}/8`;
            flippedCards = [];
            canFlip = true;

            if (matchedPairs === 8) {
                winGame();
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function winGame() {
    stopTimer();
    document.getElementById('finalMoves').textContent = moves;
    document.getElementById('finalTime').textContent = timer;
    document.getElementById('winMessage').classList.add('show');
}

function resetGame() {
    stopTimer();
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    timer = 0;
    canFlip = true;
    document.getElementById('moves').textContent = '0';
    document.getElementById('pairs').textContent = '0/8';
    document.getElementById('timer').textContent = '0s';
    document.getElementById('winMessage').classList.remove('show');
    createBoard();
}

// Inicializar el juego cuando carga la página
createBoard();