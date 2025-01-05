

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); //this method gives us a drawing context for the canvas. This allows us to draw shapes, like the snake and food

const gridSize = 20; // Size of the grid and snake parts
const canvasSize = 400; // Canvas size (width and height)

canvas.width = canvasSize; //These lines ensure the canvas is sized properly according to the `canvasSize` variable
canvas.height = canvasSize;


let snake, food, direction, score, gameOver;
let highScore = localStorage.getItem('highScore') || 0; // Get high score from localStorage
// Update the high score display
document.getElementById('highScore').innerText = `Highest Score: ${highScore}`;

document.getElementById('startButton').addEventListener('click', startGame);

let gameSpeed = 200; // Default speed is medium (200ms)
// Speed Buttons Event Listeners
const speedOne = document.getElementById('speedOne');
const speedTwo = document.getElementById('speedTwo');
const speedThree = document.getElementById('speedThree');

speedOne.addEventListener('click', ()=>{
    changeSpeed(300);
    speedOne.style.background = 'lightgreen';
    speedTwo.style.background = 'rgb(208, 241, 16)';
    speedThree.style.background = 'rgb(208, 241, 16)';
});
speedTwo.addEventListener('click', ()=> {
    changeSpeed(200);
    speedTwo.style.background = 'lightgreen';
    speedOne.style.background = 'rgb(208, 241, 16)'; 
    speedThree.style.background = 'rgb(208, 241, 16)';
});
speedThree.addEventListener('click', ()=> {
    changeSpeed(100);
    speedThree.style.background = 'lightgreen';
    speedOne.style.background = 'rgb(208, 241, 16)';
    speedTwo.style.background = 'rgb(208, 241, 16)';
});

function changeSpeed(speed){
    gameSpeed = speed; // Set the new game speed
}

function startGame() {
    // Reset game state
    snake = [{ x: 80, y: 80 }];// This is an array that stores the snake’s position. Initially, the snake has only one part (a head) at coordinates `{ x: 80, y: 80 }`
    food = generateFood();// Initial food. This stores the position of the food on the canvas. The function generateFood() will generate the food’s coordinates randomly.
    direction = 'RIGHT';// Snake's starting direction
    score = 0;
    gameOver = false; //This boolean (true or false) tells us whether the game is over. It starts as false (the game is not over).
    document.getElementById('score').innerText = `Score: ${score}`;
    
    // Start the game loop
    gameLoop();
    // Hide the start button after game starts
    document.getElementById('startButton').style.display = 'none';
     // Hide speed buttons after game starts
     document.getElementById('speedButtons').style.display = 'none';
}



function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing the next frame

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#99cc00' : '#006600'; // Green for head, dark green for body
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeStyle = 'black'; //sets the border color to black
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);//draws the border around the same rectangle we filled earlier
    });

    // Draw food
    ctx.fillStyle = '#cc3333';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(food.x, food.y, gridSize, gridSize);

    // Update score on the webpage
    document.getElementById('score').innerText = `Score: ${score}`; // Is this necessary? As it is already in line 56
}



// Handle arrow key input for snake movement
document.addEventListener('keydown', (event) => {
    //This tells us which key was pressed. We check if it's an arrow key (up, down, left, or right).
    //Additional checks prevent the snake from turning in the opposite direction. For example, if the snake is moving 'RIGHT', it can't immediately turn 'LEFT' because it would crash into itself.
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT'; 
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

function generateFood() {
    //This function creates random food positions on the canvas.
    //(canvasSize / gridSize): This gives the number of grid cells in the canvas (400px canvas divided by 20px grid size = 20 grid cells).
    // * gridSize: Multiplies the random number by the grid size to make sure the food aligns with the grid.
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    // console.log(x,y);
    return { x, y };
}

function gameLoop() {
    //This is the main function that runs the game repeatedly. It updates the game, checks for collisions, and redraws the canvas.
    if (gameOver) {
          // Check if the score is a new high score
        if(score > highScore){
            highScore = score;
            localStorage.setItem('highScore', highScore);// Save the new high score to localStorage
        }

        // alert(`Game Over! Your score is ${score}. Highest score: ${highScore}`);
         // Show the start button and speed buttons again after game ends
        document.getElementById('startButton').style.display = 'inline';
        document.getElementById('speedButtons').style.display = 'block';
        // Update the high score display
        document.getElementById('highScore').innerText = `Highest Score: ${highScore}`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Set the text properties
        ctx.font = '20px Sixtyfour Convergence'; // This font already comes with color so no additional ctx.fillStyle is needed
        ctx.fillText(`Game Over!`, 30, 150); // The text and its coordinates
        ctx.fillText(`Your score is ${score}.`, 30, 200);
        ctx.fillText(`Try again.`, 30, 250);

        setTimeout(()=>{
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 4000); // The text will display only for 4s in canvas, afterwards will clear

        return;
    }

    setTimeout(() => {
        updateSnake();
        checkCollisions();
        drawGame();
        gameLoop(); //(recursive call): The game loop calls itself to run again after the timeout.
    }, gameSpeed); //  Use the selected speed interval (100ms, 200ms, or 300ms)
}

function updateSnake() {
    const head = { ...snake[0] };// creates a copy of the snake’s head (the first element in the snake array).
    // console.log(snake);
    // console.log(head);

    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head); // Add new head to the snake array

    // Check if the snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 1;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the tail of the snake if no food was eaten
    }
}

function checkCollisions() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
    }

    // Check self-collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}


// Start the game
gameLoop();
