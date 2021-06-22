const boardBackground = 'black';
const snakeCol = 'lightblue';
const snakeBorder = 'darkblue';

//1 Making the snake
let snake = [ 
    {x: 200, y: 200}, 
    {x: 190, y: 200}, 
    {x: 180, y: 200}, 
    {x: 170, y: 200}, 
    {x: 160, y: 200},  
]
// Score
let score = 0;
// True if change direction
let changeDirection = false
// Food
let foodX;
let foodY; 
// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0

//2 Making the canvas
const snakeboard = document.getElementById('snakeboard');
// Return a two dimensional drawing context
const snakeboardCtx = snakeboard.getContext('2d');
// Start game
main();

generateFood();

document.addEventListener('keydown', Direction);

// Main function called repeatedly to keep the game running
function main() {
    if(gameOver()) return;
    
    changeDirection = false;
    setTimeout(function onTick(){
        clearCanvas();
        drawFood();
        moveSnake();
        drawSnake();
        // Repeat
        main()
    }, 100)
}
// Draw a border around the canvas
function clearCanvas() {
    // Select the colour to fill the drawing
    snakeboardCtx.fillStyle = boardBackground;
    // Draw a 'filled' rectangle to cover the entire canvas
    snakeboardCtx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a 'border' around the entire canvas
    snakeboardCtx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}
// Function that prints the parts of the snake
function drawSnake() {
    snake.forEach(drawSnakePart);
}
// Draw food
function drawFood() {
    snakeboardCtx.fillStyle = 'lightgreen';
    snakeboardCtx.strokestyle = 'darkgreen';
    snakeboardCtx.fillRect(foodX, foodY, 10, 10)
    snakeboardCtx.strokeRect(foodX, foodY, 10, 10)

}
// Draw one snake part
function drawSnakePart(snakePart) {
    // Set the colour of the snake part
    snakeboardCtx.fillStyle = snakeCol;
     // Set the border colour of the snake part
    snakeboardCtx.strokestyle = snakeBorder;
    // Draw a "filled" rectangle to represent the snake part at the coordinates the part is located
    snakeboardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}
// Adding boundary condition

function gameOver() {
    for(let i = 4; i < snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height -10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}

// Incorporating food and score
// Food

function randomFood(min, max){
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}
function generateFood(){
    foodX = randomFood(0, snakeboard.width - 10);
    foodY = randomFood(0, snakeboard.height - 10);
    snake.forEach(function eaten(part){
        const hasEaten = part.x == foodX && part.y == foodY;

        if(hasEaten) 
        generateFood();
    });
}
// 4 Using arroe key to change the snake's direction

// Change direction

function Direction(event){
    const leftKey = 37;
    const rightKey = 39;
    const upKey = 38;
    const downKey = 40;
// Prevent snake from reversing
    if(changeDirection) return;
    changeDirection = true;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if(keyPressed === leftKey && !goingRight){
        dx = -10;
        dy = 0;
    }

    if(keyPressed === upKey && !goingDown){
        dx = 0;
        dy = -10;
    }

    if(keyPressed === rightKey && !goingLeft){
        dx = 10;
        dy = 0;
    }

    if(keyPressed === downKey && !goingUp){
        dx = 0;
        dy = 10;
    }
}
// 3 Making the snake move automatically
function moveSnake() {
    // Create the new snake's head
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    // Add the new head to the beginning of the snake body
    snake.unshift(head);
    const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
    if(hasEatenFood) {
        // Increase score
        score += 1;
        // Display score on the screen
       document.getElementById('score').innerHTML ='Score: ' + score;
        
        // Generate new food
        generateFood();
    } else {
        snake.pop();
    }
}
