// Local paths to my images inside the images folder
const cardImages = [
    'images/image1.jpg', 'images/image1.jpg',
    'images/image2.jpg', 'images/image2.jpg',
    'images/image3.jpg', 'images/image3.jpg',
    'images/image4.jpg', 'images/image4.jpg',
    'images/image5.jpg', 'images/image5.jpg',
    'images/image6.jpg', 'images/image6.jpg',
    'images/image7.jpg', 'images/image7.jpg',
    'images/image8.jpg', 'images/image8.jpg'
];

let gameBoard = document.getElementById('gameBoard');
let scoreDisplay = document.getElementById('score');
let resetButton = document.getElementById('resetButton');

let flippedCards = [];
let matchedPairs = 0;
let score = 0;

// Shuffle cards
function shuffleCards() {
    cardImages.sort(() => 0.5 - Math.random());
}

// Create and render cards on the board
function createCards() {
    gameBoard.innerHTML = ''; // Clear the game board before rendering
    cardImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', index);

        const frontImage = document.createElement('img');
        frontImage.setAttribute('src', image);  // Local image path
        frontImage.classList.add('front');
        frontImage.style.size = '30px';
        card.appendChild(frontImage);

        card.addEventListener('click', () => flipCard(card, image));

        gameBoard.appendChild(card);
    });
}

// Flip a card
function flipCard(card, image) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        const frontImage = card.querySelector('.front');
        frontImage.style.display = 'block';  // Show the front image when flipped
        flippedCards.push({ card, image });

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if the two flipped cards match
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.image === secondCard.image) {
        matchedPairs++;
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        flippedCards = [];
        if (matchedPairs === cardImages.length / 2) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            firstCard.card.querySelector('.front').style.display = 'none'; // Hide the front image again
            secondCard.card.querySelector('.front').style.display = 'none'; // Hide the front image again
            flippedCards = [];
        }, 2000);
    }
}

// Reset the game
function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    shuffleCards();
    createCards();
}

// Initialize the game
shuffleCards();
createCards();

// Reset button event listener
resetButton.addEventListener('click', resetGame);
