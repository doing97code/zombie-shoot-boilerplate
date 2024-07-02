// Iteration 1: Declare variables required for this game
const aud = document.getElementById("audio");
const gameBody = document.getElementById("game-body");
const livesContainer = document.getElementById("lives");
const timerElement = document.getElementById("timer");

let lives = 3;
let timer = 60;

// Iteration 1.2: Add shotgun sound
document.onclick = function () {
    aud.play();
}

// Iteration 1.3: Add background sound
const backgroundAudio = new Audio('./assets/background.mp3');
backgroundAudio.loop = true;
backgroundAudio.play();

// Iteration 1.4: Add lives
function updateLives() {
    livesContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const life = document.createElement('span');
        life.classList.add('life');
        livesContainer.appendChild(life);
    }
}

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombie = document.createElement('div');
    zombie.classList.add('zombie-image');

    // Randomly set the left position
    zombie.style.left = `${Math.random() * (window.innerWidth - 150)}px`;

    // Randomly select a zombie image
    const zombieNumber = getRandomInt(1, 5);
    zombie.style.backgroundImage = `url('./assets/zombie-${zombieNumber}.png')`;

    zombie.onclick = function () {
        destroyZombie(zombie);
    }
    gameBody.appendChild(zombie);

    // Iteration 3: Write a function to check if the player missed a zombie
    setTimeout(function () {
        if (gameBody.contains(zombie)) {
            missZombie(zombie);
        }
    }, 3000);
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    gameBody.removeChild(zombie);
    aud.play();
}

function missZombie(zombie) {
    gameBody.removeChild(zombie);
    lives--;
    updateLives();
    if (lives <= 0) {
        gameOver();
    }
}

// Iteration 5: Creating timer
function startTimer() {
    const timerInterval = setInterval(function () {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    updateLives();
    startTimer();
    spawnZombie();
}

function spawnZombie() {
    createZombie();
    setTimeout(spawnZombie, 2000); // Spawn a new zombie every 2 seconds
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Start the game when the page loads
window.onload = startGame;

function gameOver() {
    // alert('Game Over!');
    window.location.href = "game-over.html"; // Reload the game
}
