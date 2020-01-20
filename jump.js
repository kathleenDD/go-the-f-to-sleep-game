// Don't forget to delete starting values and set the
// real values inside the function




// ===== STARTING VALUES =====
let startT = 30; // duration of the game in seconds
let plusT = 11; // additional time


// ===== KEYBOARD =====

function setKeys(e) {
    // use up and down arrow keys to move character
    const key = e.code;
    if (key === "ArrowUp" || key === "ArrowDown") {
        let direction = key === "ArrowDown" ? "down" : "up";
        moveChar(direction);
    }
}

// ===== CHARACTER =====

function setChar() {
    // generate character after countdown
    const character = document.getElementById("char-container");
    const charImg = document.createElement("img");
    charImg.className = "med-icon "; // there must be a space to separate the classes being added
    charImg.className += "pulse";
    // charImg.setAttribute("id", "character");
    charImg.src = "images/me.png";
    character.append(charImg);

    // position character
    character.style.gridColumn = "1";
    character.style.gridRow = "4/5";
}

function moveChar(direction) {
    // character movement
    const character = document.getElementById("char-container");
    let charPosition = Number(character.style.gridRow[0]);
    if (direction === "up" && charPosition-1 > 0) {
        character.style.gridRow = `${charPosition-1} / ${charPosition}`;
    }
    else if (direction === "down" && charPosition+1 < 8) {
        character.style.gridRow = `${charPosition+1} / ${charPosition+2}`;
    };

}

// ===== GENERATE SHEEP & OBSTACLES =====
function generateItems() {

}



// ===== FLOATING SHEEP =====

function setFloaters() {
    // position floating sheep
}


// ===== OBSTACLES =====

function setObstacles() {
    // position obstacles
}


// ===== SHEEP COUNTER =====

function setCounter() {
    // set HTML sheep counter
    let numSpan = document.getElementById("counter");
    numSpan.textContent = `${countSheep()}`
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
    wine.src="/images/bw-wine.png";
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
    } 
    else {
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

function countDown() {
    let printDiv = document.getElementById("print-container");
    let sec = document.getElementById("countdown").textContent;
    let counter = setInterval(() => {
        sec--;
        document.getElementById("countdown").textContent = sec;
        if (sec <= 0) {
            clearInterval(counter); // stops the counter
            printDiv.innerHTML = ""; // clears the countdown container
            startTimer(startT); // duration of the game
            setChar();
        }
    }, 1000);
    
}


// ============================================
// CALL FUNCTIONS

function initialize() {
    // houses main functions
    window.onload = countDown;
    window.onkeydown = setKeys;
    
}

initialize();


// Add function for sleep props that can make character invincible for a few sec