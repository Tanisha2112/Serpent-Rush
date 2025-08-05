// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
const board = document.getElementById('board');
const scoreBox = document.getElementById('scoreBox');
const hiscoreBox = document.getElementById('hiscoreBox');
const finalScore = document.getElementById('finalScore');
const startOverlay = document.getElementById('startOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');

let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];
food = {x: 6, y: 7};
let gameRunning = false;
let soundOn = true;

let hiscore = localStorage.getItem("hiscore");
let hiscoreval = hiscore ? JSON.parse(hiscore) : 0;
hiscoreBox.innerHTML = "HiScore: " + hiscoreval;



// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

let timersInterval; // global variable to store interval ID
let totalSeconds = 0;

function startTimer() {
    timerInterval = setInterval(() => {
        totalSeconds++;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        document.getElementById("clock").innerText =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    clearInterval(timerInterval); // 🕑 Stop the timer
    totalSeconds = 0; // reset timer
    document.getElementById("clock").innerText = "00:00"; // reset display
    startTimer()
    alert("Game Over. Press any key to play again!");
    

    // Reset everything
    snakeArr = [{ x: 13, y: 15 }];
    food = { x: 6, y: 7 };
    score = 0;
    scoreBox.innerHTML = "Score: 0";
    startTimer(); // 🔁 Restart the timer
    musicSound.play();
    return;
}

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
document.addEventListener("keydown", () => {
  audio.play(); 
});
hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    const hiscoreBox = document.getElementById("hiscoreBox")
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
// GAME TIMER
let gameSeconds = 0;
let timerInterval;

function startTimer() {
    gameSeconds = 0;
    updateGameTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        gameSeconds++;
        updateGameTimer();
    }, 1000);
}

function updateGameTimer() {
    const minutes = Math.floor(gameSeconds / 60).toString().padStart(2, '0');
    const seconds = (gameSeconds % 60).toString().padStart(2, '0');
    document.getElementById('gameTimer').innerText = `Time: ${minutes}:${seconds}`;
}

window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

document.addEventListener("keydown", () => {
    audio.play(); 
    startTimer(); // Start the timer when key is pressed
});


function startGame() {
    startOverlay.classList.add("hidden");
    musicSound.loop = true;
    musicSound.play();
    gameRunning = true;
    score = 0;
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    window.requestAnimationFrame(main);
}

function restartGame() {
    gameOverOverlay.classList.add("hidden");
    startGame();
}

function toggleSound() {
    soundOn = !soundOn;
    musicSound.muted = !soundOn;
    foodSound.muted = !soundOn;
    gameOverSound.muted = !soundOn;
    moveSound.muted = !soundOn;
    document.getElementById("soundBtn").textContent = soundOn ? "🔊" : "🔇";
}

function updateClock() {
    let clockBox = document.getElementById("clock");
    if (!clockBox) {
        console.error("Element with id 'clock' not found!");
        return;
    }

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    clockBox.innerHTML = `Time: ${hours}:${minutes}:${seconds}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // initial call

localStorage.removeItem("hiscore");
