Snake Game - Key Learnings

The HTML `<canvas>` element lets you draw graphics via scripting, usually with JavaScript. It's like a blank slate in your browser where you can create anything from simple shapes to intricate animations or even games. You can draw lines, circles, and other shapes, manipulate images, and create interactive elements—all in a web context. It's versatile but relies heavily on your coding skills to bring those visuals to life.


Example:

```
<body>
  <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;"></canvas>

  <script>
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    context.fillStyle = '#FF0000';
    context.fillRect(10, 10, 150, 75);
  </script>
</body>
```

1. `var context = canvas.getContext('2d');`: This line gets the "2D rendering context" for the canvas. Think of it like the paintbrush that lets you draw on the canvas.
2. `context.fillStyle = '#FF0000';`: This sets the color for the paintbrush. In this case, it's red (`#FF0000`).
3. `context.fillRect(10, 10, 150, 75);`: This draws a filled rectangle. The numbers specify the position and size: starting at coordinates (10, 10) and extending 150 pixels wide and 75 pixels tall.

So, with these three lines, you're grabbing your paintbrush, choosing your color, and painting a rectangle on your canvas.


**To add text to your canvas:**

Example:

let canvas = document.getElementById('myCanvas');

let context = canvas.getContext('2d');

// Set the text properties
context.font = '20px Arial'; // Sets the font size and family.
context.fillStyle = '#000000'; // Text color
context.fillText('Hello, Canvas!', 50, 50); // The text and its coordinates



Logic behind Snake Game Code:

1. **Initial Setup**

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // Size of the grid and snake parts
const canvasSize = 400; // Canvas size (width and height)

canvas.width = canvasSize;
canvas.height = canvasSize;

* **`canvas`** : This line gets the `canvas` element from your HTML using its `id`. This is where the game will be drawn.
* **`ctx`** : The `getContext('2d')` method gives us a drawing context for the canvas. This allows us to draw shapes, like the snake and food, on the canvas. Think of it like the paintbrush that lets you draw on the canvas.
* **`gridSize`** : This sets the size of each square (grid cell) that the snake moves through. It’s 20 pixels wide/tall.
* **`canvasSize`** : This sets the width and height of the canvas to 400 pixels, so the game area will be 400px by 400px.
* **`canvas.width = canvasSize` & `canvas.height = canvasSize`** : These lines ensure the canvas is sized properly according to the `canvasSize` variable.



2. **Game Variables**

let snake = [{ x: 80, y: 80 }]; // Initial snake body (1 part)
let food = generateFood(); // Initial food
let direction = 'RIGHT'; // Snake's starting direction
let score = 0;
let gameOver = false;

* **`snake`** : This is an array that stores the snake’s position. Initially, the snake has only one part (a head) at coordinates `{ x: 80, y: 80 }`.
* **`food`** : This stores the position of the food on the canvas. The function `generateFood()` will generate the food’s coordinates randomly.
* **`direction`** : This variable stores the current direction the snake is moving in. Initially, it’s set to 'RIGHT'.
* **`score`** : The score starts at 0, and it will increase each time the snake eats food.
* **`gameOver`** : This boolean (`true` or `false`) tells us whether the game is over. It starts as `false` (the game is not over).



3. **Drawing the Game**

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'darkgreen'; // Green for head, dark green for body
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    document.getElementById('score').innerText =`Score: ${score}`;
}

* **`ctx.clearRect(0, 0, canvas.width, canvas.height)`** : Clears the canvas before drawing the next frame.
* **`snake.forEach(...)`** : Loops through each segment of the snake and draws it on the canvas. The head is drawn in green, and the body in dark green.
* **`ctx.fillStyle = 'red'; ctx.fillRect(food.x, food.y, gridSize, gridSize);`** : This draws the food in red.
* **`document.getElementById('score').innerText = `Score: ${score}`;`** : Updates the score on the webpage.



4. **Handling Key Presses**

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

* **`document.addEventListener('keydown', (event) => {...})`** : This listens for a key press event (like pressing an arrow key) and runs the code inside the function when a key is pressed.
* **`event.key`** : This tells us which key was pressed. We check if it's an arrow key (up, down, left, or right).
* **`direction !== 'UP'` (etc.)** : These checks prevent the snake from turning in the opposite direction. For example, if the snake is moving 'RIGHT', it can't immediately turn 'LEFT' because it would crash into itself.



5. **Generating Food**

function generateFood() {
    const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x, y };
}

* **`generateFood()`** : This function creates random food positions on the canvas.
* **`Math.random()`** : Generates a random number between 0 and 1.
* **`Math.floor()`** : Rounds down the number to the nearest whole number.
* **`(canvasSize / gridSize)`** : This gives the number of grid cells in the canvas (400px canvas divided by 20px grid size = 20 grid cells).
* **`* gridSize`** : Multiplies the random number by the grid size to make sure the food aligns with the grid.
* **`return { x, y }`** : This returns the x and y coordinates of the food.



6. **Game Loop**

function gameLoop() {
    if (gameOver) {
        alert(`Game Over! Your score is ${score}`);
        return;
    }

    setTimeout(() => {
        updateSnake();
        checkCollisions();
        drawGame();
        gameLoop();
    }, 100); // 100ms interval for the game loop
}

* **`gameLoop()`** : This is the main function that runs the game repeatedly. It updates the game, checks for collisions, and redraws the canvas.
* **`if (gameOver)`** : If the game is over, it shows a "Game Over" message with the player's score and stops the game by using `return`.
* **`setTimeout()`** : This method waits for 100 milliseconds (0.1 second) and then runs the function inside it. It creates a delay for each frame of the game, making it run smoothly.
* **`gameLoop()` (recursive call)** : The game loop calls itself to run again after the timeout.


7. **Updating Snake**

function updateSnake() {
    const head = { ...snake[0] };

    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    snake.unshift(head); // Add new head to the snake array

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove the tail of the snake if no food was eaten
    }
}

* **`const head = { ...snake[0] };`** : This creates a copy of the snake’s head (the first element in the `snake` array).
* **`if (direction === 'UP') head.y -= gridSize;`** : Depending on the direction, we move the snake’s head by adjusting its x or y position.
* **`snake.unshift(head);`** : Adds the new head to the front of the snake array.
* **`if (head.x === food.x && head.y === food.y)`** : This checks if the snake's head has reached the food. If it has, the score increases and new food is generated.
* **`snake.pop();`** : If no food was eaten, this removes the last segment of the snake (its tail) to simulate movement.



8. **Checking Collisions**

function checkCollisions() {
    const head = snake[0];

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver = true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
        }
    }
}

* **`checkCollisions()`** : This function checks if the snake collides with walls or itself.
* **`if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize)`** : If the snake's head goes outside the boundaries of the canvas, it ends the game (`gameOver = true`).
* **`for (let i = 1; i < snake.length; i++)`** : This loop checks if the snake’s head is touching any part of its body (excluding the head itself). If it does, the game is over.
