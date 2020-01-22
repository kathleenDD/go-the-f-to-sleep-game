// Don't forget to delete starting values and set the
// real values inside the function

// ===== STARTING VALUES =====
let startT = 30; // duration of the game in seconds
let plusT = 6; // additional time

const gameWindow = document.getElementById("game-window");
const sheepElements = [];
const obsElements = [];

const keyState = {};
const player = {
  x: 0,
  y: 0,
  isAirbourne: false,
  direction: 180
};

// x (0-400)
// y (0-340)

window.onkeydown = function(e) {
  keyState[e.code] = true;
};

window.onkeyup = function(e) {
  keyState[e.code] = false;
};

const draw = () => {
  if (keyState["Space"]) jumpChar(player);
  if (keyState["ArrowRight"]) moveChar("right");
  if (keyState["ArrowLeft"]) moveChar("left");
  updateChar(player);
  moveSheep(sheepElements);
  moveObstacles(obsElements);
  requestAnimationFrame(draw);
};

// randSheep();
// moveSheep(sheepElements);

// ===== KEYBOARD =====

// ===== GENERATE SHEEP & OBSTACLES =====
function setItems() {
  setInterval(() => {
    createSheep();
  }, Math.floor(Math.random() * (3000 - 2000) + 2000));

  setInterval(() => {
    createObstacles();
  }, Math.floor(Math.random() * (5000 - 1000) + 1000));
}

function createSheep() {
  // generates sheep one by one
  const gameWindow = document.getElementById("game-window");
  const newSheep = document.createElement("div");
  newSheep.className = "sheep";
  newSheep.style.backgroundImage = "url(/../images/sheep.png)";
  const xy = {};
  const x = 400;
  const y = Math.floor(Math.random() * 340);
  xy.x = x;
  xy.y = y;
  newSheep.style.transform = `translate(${x}px,${y}px)`;
  xy.element = newSheep;
  sheepElements.push(xy);
  gameWindow.appendChild(newSheep);
}

function moveSheep(arr) {
  // exactly the same as moveSheep()
  for (let i = 0; i < arr.length; i += 1) {
    let el = arr[i].element;
    el.style.transform = `translate(${arr[i].x}px,${arr[i].y}px)`;
    arr[i].x -= Math.floor(Math.random() * 4);
    if (arr[i].x < -200) {
      arr.shift();
    }
  }
}

// x (0-400)
// y (0-340)

// ===== OBSTACLES =====
function createObstacles() {
  const gameWindow = document.getElementById("game-window");
  const obstacle = document.createElement("div");
  obstacle.className = "obstacles";
  const obsImages = [
    "url(/../images/robot.png)",
    "url(/../images/gamepad.png",
    "/images/ice-cream.png"
  ];
  let randNum = Math.floor(Math.random() * obsImages.length);
  obstacle.style.backgroundImage = obsImages[randNum];
  const xy = {};
  const x = 400;
  const y = Math.floor(Math.random() * 340);
  xy.x = x;
  xy.y = y;
  obstacle.style.transform = `translate(${x}px,${y}px)`;
  xy.element = obstacle;
  obsElements.push(xy);
  gameWindow.appendChild(obstacle);
}

function moveObstacles(arr) {
  // move obstacles
  for (let i = 0; i < arr.length; i += 1) {
    let el = arr[i].element;
    el.style.transform = `translate(${arr[i].x}px,${arr[i].y}px)`;
    arr[i].x -= Math.floor(Math.random() * 4);
    if (arr[i].x < -200) {
      arr.shift();
    }
  }
}

// ===== SHEEP COUNTER =====
function setCounter() {
  // set HTML sheep counter
  let numSpan = document.getElementById("counter");
  numSpan.textContent = `${countSheep()}`;
}

function countSheep() {
  // increase number whenever character collides with sheep
  // must return a number
  return 10; // test
}

// ===== REACTIONS PER COLLISION=====
function changeFace() {
  // changes face at the bottom
}

function printMsg() {
  // prints message per each collision
}

// ===== WIN OR LOSE =====
function winOrLose() {
  // pop up for when player won or lost
}

// ===== CHARACTER =====
function updateChar(player) {
  const character = document.getElementById("character");
  character.style.backgroundImage = "url(/images/me.png)";

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
      if (limit > 20) {
        fallChar(player);
        clearInterval(intervalId);
      }
      player.y += 12;
      limit++;
    }, 25);
  }
}

// ===== WINE =====
function serveWine() {
  // changes color when more time is needed
  let wine = document.querySelector(".wine");
  wine.src = "/images/bw-wine.png";
  wine.classList.remove("wine");
}

function addTime(numSheep) {
  // adds more time when necessary
  // let numSheep = 10;
  if (numSheep() < 50) {
    if (document.querySelector(".wine")) {
      serveWine();
      startTimer(plusT); // adds 10 more seconds
    }
  } else {
    winOrLose();
  }
}

// ===== TIMER =====
function startTimer(num) {
  // starts 30s timer
  let timer = setInterval(() => {
    num--;
    document.getElementById("timer").textContent = num;
    if (num <= 0) {
      clearInterval(timer); // stops timer
      addTime(countSheep);
    }
  }, 2500);
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
      //   initialize();
      startTimer(startT);
      requestAnimationFrame(draw);
      setItems();
    }
  }, 1000);
}

window.onload = countDown;

// POSSIBLE ADDITIONS:
// Choose character
// Choose game mode
// Add function for sleep props that can make character invincible for a few sec
