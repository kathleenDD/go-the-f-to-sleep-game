// add sounds - wine, sheep collected, obstacle touched


// ===== GLOBAL =====
// I am fully aware that this is not good practice

const giggleSound = new Audio("./audio/giggle.mp3");
const lullabySound = new Audio("./audio/twinkle twinkle.mp3");
const collectSound = new Audio("./audio/coin-collect.mp3");
const timesUpSound = new Audio("./audio/times_up.mp3");
const mainSong = new Audio("./audio/game.mp3");

mainSong.loop = true;
mainSong.volume = 0.2;
mainSong.play();

var animationId;
const keyState = {};
const player = {
  x: 0,
  y: 0,
  isAirbourne: false,
  direction: 180
};
const sheepElements = [];
const sheepCollected = [];
var sheepIntervalId = null;
var obsIsTouched = false;
const obsElements = [];
var obsIntervalId = null;


// ===== CHARACTER =====

function updateChar(player) {
  const character = document.getElementById("character");
  character.style.backgroundImage = "url(../images/me.png)";
  character.style.transform = `rotateY(${player.direction}deg) translate(${
    player.direction === 0 ? player.x : -player.x
  }px, ${-player.y}px)`;
}

function moveChar(direction) {
  // character movement, up or down
  if (direction === "right" && player.x < 370) {
    player.x += 3;
    player.direction = 180;
    return;
  }
  if (direction === "left" && player.x > 0) {
    player.x -= 3;
    player.direction = 0;
  }
}

function fallChar(player) {
  let intervalId = setInterval(() => {
    if (player.y === 0) {
      player.isAirbourne = false;
      clearInterval(intervalId);
      return;
    }
    player.y -= 12;
  }, 15);
}

function jumpChar(player) {
  let limit = 0;
  if (!player.isAirbourne) {
    player.isAirbourne = true;
    let intervalId = setInterval(() => {
      if (limit > 25) {
        fallChar(player);
        clearInterval(intervalId);
      }
      player.y += 12;
      limit++;
    }, 25);
  }
}

// ===== GENERATE SHEEP & OBSTACLES =====

function setItems() {
  // generate sheep
  sheepIntervalId = setInterval(() => {
    createSheep();
  }, Math.floor(Math.random() * (3000 - 500) + 500));
  // generate obstacles
  obsIntervalId = setInterval(() => {
    createObstacles();
  }, Math.floor(Math.random() * (5000 - 2000) + 2000));
}

// ===== SHEEP =====

function createSheep() {
  const gameWindow = document.getElementById("game-window");
  const newSheep = document.createElement("div");
  newSheep.className = "sheep";
  newSheep.style.backgroundImage = "url(./images/sheep.png)";
  const xy = {}; // where coordinates and current DOM will be saved which will then be pushed to the array
  const x = 400;
  const y = Math.floor(Math.random() * 200); // could be any number???
  xy.x = x;
  xy.y = y;
  newSheep.style.transform = `translate(${x}px,${y}px)`;
  xy.element = newSheep;
  sheepElements.push(xy);
  gameWindow.appendChild(newSheep);
}

function moveSheep(arr) {
  // array to be passed is sheepElements
  for (let i = 0; i < arr.length; i += 1) {
    let el = arr[i].element;
    el.style.transform = `translate(${arr[i].x}px,${arr[i].y}px)`;
    arr[i].x -= Math.floor(Math.random() * 5);
    if (arr[i].x < -500) {
      arr.shift();
    }
  }
}

// ===== SHEEP COUNTER =====

function countSheep() {
  const numSheep = document.getElementById("counter");
  numSheep.textContent = sheepCollected.length; // prints the length of sheepCollected array
}

// ===== OBSTACLES =====

function createObstacles() {
  const gameWindow = document.getElementById("game-window");
  const obstacle = document.createElement("div");
  obstacle.className = "obstacles";
  // create random obstacles
  const obsImages = [
    "url(./images/robot.png)",
    "url(./images/gamepad.png)",
    "url(./images/ice-cream.png)"
  ];
  let randNum = Math.floor(Math.random() * obsImages.length);
  obstacle.style.backgroundImage = obsImages[randNum];
  const xy = {};
  const x = 400;
  const y = Math.floor(Math.random() * 300);
  xy.x = x;
  xy.y = y;
  obstacle.style.transform = `translate(${x}px,${y}px)`;
  xy.element = obstacle;
  obsElements.push(xy);
  gameWindow.appendChild(obstacle);
}

function moveObstacles(arr) {
  // arr to be passed is obsElements
  for (let i = 0; i < arr.length; i += 1) {
    let el = arr[i].element;
    el.style.transform = `translate(${arr[i].x}px,${arr[i].y}px)`;
    arr[i].x -= Math.floor(Math.random() * 4);
    if (arr[i].x < -500) {
      arr.shift();
    }
  }
}

// ===== COLLISION =====

function sheepCollision(arr) {
  const character = document.getElementById("character");
  const rect1 = character.getBoundingClientRect();

  for (let i = 0; i < arr.length; i++) {
    let sheepEl = arr[i].element;
    let rect2 = sheepEl.getBoundingClientRect();
    if (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    ) {
      winReaction();
      collectSound.play();
      sheepEl.style.backgroundImage = ""; // to clear the image of sheep once collected
      sheepCollected.push(arr.splice(i, 1)); // remove from array and push to collected array
    }
  }
}

function obsCollision(arr) {
  const character = document.getElementById("character");
  const rect1 = character.getBoundingClientRect();

  for (let i = 0; i < arr.length; i++) {
    let obsEl = arr[i].element;
    let rect2 = obsEl.getBoundingClientRect();
    if (
      rect1.x < rect2.x + 25 &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + 25 &&
      rect1.y + rect1.height > rect2.y
    ) {
      // DO SOMETHING FOR OBSTACLES !!!
      loseReaction();
      giggleSound.play();
      obsEl.style.backgroundImage = "";
      if (obsIsTouched === false) obsIsTouched = true;
      arr.splice(i, 1);
    }
  }
}

// ===== WINE & ADDITIONAL TIME =====

function serveWine() {
  // changes color when more time is needed
  let wine = document.querySelector(".wine");
  wine.src = "./images/bw-wine.png";
  wine.classList.remove("wine");
}

function addTime() {
  // adds more time when necessary
  if (sheepCollected.length < 50) {
    if (document.querySelector(".wine")) {
      serveWine();
      startTimer(11); // adds 10 more seconds
    } else {
      endGame();
    }
  } else {
    endGame();
  }
}

// ===== REACTIONS PER COLLISION=====

function winReaction() {
  // prints message per each collision
  let reactFace = document.querySelector(".btm-face");
  let printBox = document.getElementById("msg-container");
  let message = document.createElement("p");

  const winImages = [
    "./animojis/serious1.png",
    "./animojis/sleepy2.png",
    "./animojis/sleepy1.png",
    "./animojis/serious2.png"
  ];
  let randNum = Math.floor(Math.random() * winImages.length);
  reactFace.src = winImages[randNum];
  // message.className = "message";
  // message.innerHTML = "Dodo time";
  // printBox.appendChild(message);
  // printBox.style.visibility = visible;
}

function loseReaction() {
  let reactFace = document.querySelector(".btm-face");
  let printBox = document.getElementById("msg-container");
  let message = document.createElement("p");
  const loseImages = [
    "./animojis/happy2.png",
    "./animojis/hyper1.png",
    "./animojis/hyper2.png",
    "./animojis/happy3.png"
  ];
  let randNum = Math.floor(Math.random() * loseImages.length);
  reactFace.src = loseImages[randNum];
  // message.className = "message";
  // message.innerHTML = "Weeee!!!!";
  // printBox.appendChild(message);
  // printBox.style.visibility = visible;
  
}

// ===== END GAME: WIN OR LOSE =====

function printMsg() {
    // modal
    let modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    let msg = document.createElement("p");
  
    // I could have done better code than this:
    if (sheepCollected.length >= 50) {
      msg.innerHTML = `<p class="text-em">You Win!</p><br>`;
      msg.innerHTML += `<img class ="lrg-icon pulse" src="./animojis/dodo1.png"><br><br>`
      msg.innerHTML += `Don't you wish it's this easy in reality??<br><br>`;
    } else {
      msg.innerHTML = `<p class="text-em">You Lose!</p><br>`;
      msg.innerHTML += `<img class="lrg-icon pulse" src="./animojis/hyper2.png"><br><br>`
      msg.innerHTML += `But it's okay, it's still not as bad as in real life.<br><br>`;
    }
  
    msg.innerHTML +=
    `<button class="btn hvr-pulse-grow" id="btn-start"
    onclick="window.location.reload();">TRY AGAIN</button>
    <button class="btn hvr-pulse-grow" id="btn-home"
    onclick="location.href='./index.html'">HOME</button>`;
  
    modalContent.append(msg);
    modal.classList.toggle("show-modal");
}

function endGame() {
  // pop up for when player won or lost
  const gameWindow = document.getElementById("game-window");
  printMsg();
  gameWindow.innerHTML = "";
  clearInterval(sheepIntervalId);
  clearInterval(obsIntervalId);
  window.cancelAnimationFrame(animationId);
}

// ===== END GAME MODAL =====

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");

function toggleModal() {
  modalBox.classList.toggle("show-modal");
}

// ===== TIMER =====

function startTimer(num) {
  // starts 30s timer
  let timer = setInterval(() => {
    num--;
    document.getElementById("timer").textContent = num;
    if (num <= 0) {
      clearInterval(timer); // stops timer
      addTime();
    }
  }, 1000);
}

// ===== COUNTDOWN on window load =====

function countDown() {
  let printDiv = document.getElementById("print-container");
  let sec = document.getElementById("countdown").textContent;
  let counter = setInterval(() => {
    sec--;
    document.getElementById("countdown").textContent = sec;
    if (sec <= 0) {
      clearInterval(counter); // stops the counter
      printDiv.innerHTML = ""; // clears the countdown container
      initialize();
    }
  }, 1000);
}

// ===== "Main" Functions =====

function initialize() {

  startTimer(30);
  animationId = requestAnimationFrame(main);
  setItems();
}

// let tietime=0;
// setInterval(() =>  tietime++ ,1000)

const main = () => {
  if(obsIsTouched === true) {
    obsIsTouched = false;
    setTimeout(() => {
      requestAnimationFrame(main)
      // tietime = 0;
    },2000)
    return;
  }

  if (keyState["Space"]) jumpChar(player);
  if (keyState["ArrowRight"]) moveChar("right");
  if (keyState["ArrowLeft"]) moveChar("left");
  updateChar(player);
  moveSheep(sheepElements);
  moveObstacles(obsElements);
  sheepCollision(sheepElements);
  obsCollision(obsElements);
  countSheep();
  animationId = requestAnimationFrame(main);
};

window.onkeydown = function(e) {
  keyState[e.code] = true;
};

window.onkeyup = function(e) {
  keyState[e.code] = false;
};

window.onload = countDown;

// POSSIBLE ADDITIONS:
// space and double space for jump and double jump
// Choose character
// Choose game mode
// Add function for sleep props that can make character invincible for a few sec
