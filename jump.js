// Don't forget to delete starting values and set the
// real values inside the function

// ===== STARTING VALUES =====
let startT = 30; // duration of the game in seconds
let plusT = 6; // additional time

const keyState = {};
// const character = document.getElementById("character");
const player = {
  x: 0,
  y: 0,
  isAirbourne: false,
  direction: 180
};

// const obstacles= {
//     x: 1300,
// }

window.onkeydown = function(e) {
  this.console.log(keyState);
  keyState[e.code] = true;
};

window.onkeyup = function(e) {
  keyState[e.code] = false;
};

const draw = () => {
  if (keyState["ArrowUp"]) jumpChar(player);
  if (keyState["ArrowRight"]) moveChar("right");
  if (keyState["ArrowLeft"]) moveChar("left");
  updateChar(player);
  requestAnimationFrame(draw);
  // setSheep();
};

// ===== KEYBOARD =====
// function setKeys(e) {
//   // set up and down arrow keys to move character
//   const key = e.code;
//   if (key === "ArrowRight") moveChar("right");
//   if (key === "ArrowLeft") moveChar("left");
//   if (key === "ArrowUp") jumpChar(player);
// }

// ===== CHARACTER =====
function updateChar(player) {
  // generate character, function called after countdown
  // const player = {
  //     x: 0,
  //     y: 0,
  //     isAirbourne: false,
  //     direction: 180,
  // }
  const character = document.getElementById("character");
  // character.className = "pulse";
  // const charImg = document.createElement("img");
  // charImg.className = "med-icon "; // there must be a space to separate the classes being added
  // charImg.className += "pulse";
  // charImg.src = "images/me.png";
  // character.append(charImg);
  // position character:
  // character.style.gridColumn = "1";
  // character.style.gridRow = "4/5";

  character.style.transform = `rotateY(${player.direction}deg) translate(${
    player.direction === 0 ? player.x : -player.x
  }px, ${-player.y}px)`;

//   console.log(character);
//   console.log(player.direction);
}

function moveChar(direction) {
  // character movement, up or down
//   console.log(direction);
  if (direction === "right" && player.x < 370) {
    player.x += 10;
    player.direction = 180;
    return;
  }
  else if (direction === "left" && player.x > 0) {
    player.x -= 10;
    player.direction = 0;
  }

//   console.log(player.x);
  // const character = document.getElementById("character");
  // let charPosition = Number(character.style.gridRow[0]);
  // if (direction === "up" && charPosition-1 > 0) {
  //     character.style.gridRow = `${charPosition-1} / ${charPosition}`;
  // }
  // else if (direction === "down" && charPosition+1 < 8) {
  //     character.style.gridRow = `${charPosition+1} / ${charPosition+2}`;
  // };
}

function fallChar(player) {
  let intervalId = setInterval(() => {
    if (player.y === 0) {
      player.isAirbourne = false;
      clearInterval(intervalId);
      return;
    }
    player.y -= 5;
  }, 15);
}

function jumpChar(player) {
  let limit = 0;
  if (!player.isAirbourne) {
    player.isAirbourne = true;
    let intervalId = setInterval(() => {
      if (limit > 30) {
        fallChar(player);
        clearInterval(intervalId);
      }
      player.y += 10;
      limit++;
    }, 15);
  }
}

// ===== GENERATE SHEEP & OBSTACLES =====
function generateItems() {}

// ===== FLOATING SHEEP =====
function setSheep() {
  // generate floating sheep
  const grid = document.getElementById("game-window");
  const sheep = document.createElement("span");
  const sheepImg = document.createElement("img");
  sheepImg.className = "icon";
  sheepImg.src = "images/sheep.png";
  sheep.append(sheepImg);
  // position sheep
  const gridStart = Math.floor(Math.random() * 8);
  sheep.style.gridRow = `${gridStart} / ${gridStart + 1}`;
  sheep.style.gridColumn = "8";
  grid.appendChild(sheep);
}

// ===== OBSTACLES =====
function setObstacles() {
  // position obstacles
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
    //   initialize();
      startTimer(startT); 
      requestAnimationFrame(draw);
    }
  }, 1000);
}

// ===== FUNCTIONS TO BE CALLED AFTER countdown =====
function initialize() {
  // if (keyState["ArrowUp"]) jump(player);
  // if (keyState["ArrowRight"]) moveChar("right");
  // if (keyState["ArrowLeft"]) moveChar("left");
  // window.onkeydown = setKeys;
  // window.onkeyup = fallChar;
  startTimer(startT); // duration of the game
  requestAnimationFrame(draw);
  // setChar(character,player);
  // setSheep();
  // requestAnimationFrame(initialize);
}

// requestAnimationFrame(initialize);

window.onload = countDown;

// POSSIBLE ADDITIONS:
// Choose character
// Choose game mode
// Add function for sleep props that can make character invincible for a few sec
