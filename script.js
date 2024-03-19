const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasSize = 400;
const gridSize = 20;
const snakeSpeed = 110; // en milisegundos

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let intervalId;
canvas.width = canvasSize;
canvas.height = canvasSize;
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    drawSnake();
    drawFood();
}
function drawSnake() {
    snake.forEach((segment, index) => {
        const gradient = ctx.createLinearGradient(segment.x * gridSize, segment.y * gridSize, (segment.x + 1) * gridSize, (segment.y + 1) * gridSize);
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(1, 'darkgreen');
        ctx.fillStyle = gradient;
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });
}
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}
function moveSnake() {
    let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Si la serpiente llega al borde reaparece en el lado opuesto
    if (newHead.x < 0) {
        newHead.x = canvasSize / gridSize - 1;
    } else if (newHead.x >= canvasSize / gridSize) {
        newHead.x = 0;
    } else if (newHead.y < 0) {
        newHead.y = canvasSize / gridSize - 1;
    } else if (newHead.y >= canvasSize / gridSize) {
        newHead.y = 0;
    }
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        generateFood();
        score++;
        document.getElementById('score').textContent = score;
    } else {
        snake.pop();
    }
}
function generateFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize));
    food.y = Math.floor(Math.random() * (canvasSize / gridSize));
}
function checkCollision() {
    const head = snake[0]; 
    // Comprobar si la cabeza de la serpiente choca consigo misma
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    
    // No es necesario verificar colisión con los bordes porque la serpiente atraviesa los bordes
    return false;
}
function changeDirection(event) {
    const key = event.keyCode;
    if (key === 37 && dx === 0) { 
        dx = -1;
        dy = 0;
    } else if (key === 38 && dy === 0) { 
        dx = 0;
        dy = -1;
    } else if (key === 39 && dx === 0) { 
        dx = 1;
        dy = 0;
    } else if (key === 40 && dy === 0) { 
        dx = 0;
        dy = 1;
    }
}
function startGame() {
    document.getElementById('game-title').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('buttons-container').style.display = 'none';
    document.addEventListener('keydown', changeDirection);
    generateFood();
    score = 0;
    document.getElementById('score').textContent = score;
    intervalId = setInterval(gameLoop, snakeSpeed);
}
function gameLoop() {
    if (checkCollision()) {
        clearInterval(intervalId);
        alert('Game Over! Your score: ' + score);
        document.getElementById('buttons-container').style.display = 'block';
        return;
    }

    moveSnake();
    draw();
}
function restartGame() {
    snake = [{ x: 10, y: 10 }];
    dx = 0;
    dy = 0;
    startGame();
}
document.getElementById('restart-button').addEventListener('click', restartGame);

//genrador para puntos animados par el gusano 
document.addEventListener('DOMContentLoaded', function() {
    const body = document.querySelector('body');
    const dotsCount = 100; // Cantidad de puntos a generar

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = Math.random() * 100 + 'vw'; // Posición aleatoria horizontal
        dot.style.top = Math.random() * 100 + 'vh'; // Posición aleatoria vertical
        body.appendChild(dot);
    }
});