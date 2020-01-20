class Game {
    constructor() {
        this.sheep = [];
        this.sheepLimit = 100;
        this.obstacles = [];
        this.obstaclesLimit = 10;
        this.wine = 3;
        this.character = character;
    }
}


//  SETUP

function setChar() {
    // generate character
    let charBox = document.getElementById("char-container");
    let character = document.createElement("img");
    character.className = "med-icon "; // there must be a space to separate the classes being added
    character.className += "pulse";
    character.setAttribute("id", "character");
    character.src = "images/supermom2.png";
    charBox.append(character);

    // position character
    

}

function setKeys(e) {
    // set keys to be used
    // spacebar for jumping
    const keyPressed = e.code;
    if (keyPressed === "Space") {
        jumpChar();
    }
}

function setFloaters() {
    // position floating sheep
}

function setObstacles() {
    // position obstacles
}

function setCounter() {
    // set HTML sheep counter
    let numSpan = document.getElementById("counter");
    numSpan.textContent = `${countSheep()}`
}

function setWine() {
    // set wine
    let numOfWine = 3;
    let wineRack = document.getElementById("wine-container");

}

//  ===========================================
// LOGIC

function winOrLose() {

}

function jumpChar() {
    const char = document.getElementById("character");
}

function changeFace() {
    // changes face with changing message
}

function printMsg() {
    // prints message per each collision
}


function serveWine(numOfWine) {
    // changes color when more time is needed
    let numOfSheep = countSheep;
    numOfWine -= 1;
    if (numOfSheep < 50 && numOfWine > 0) {
        const wine = document.querySelectorAll(".wine")
        wine.src="/images/bw-wine.png"
        startTimer(10);
    } else {
        winOrLose();
    }
}

function countSheep() {
    // increase number whenever character collides with sheep
    // must return a number
}

function moveObjects() {

}

function startTimer(num) { 
    // starts 30s timer
    // let printTime = document.getElementById("timer").textContent;
    let timer = setInterval(() => {
        num--;
        document.getElementById("timer").textContent = num;
        if (num <= 0) {
            clearInterval(timer);
            serveWine();
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
            printDiv.innerHTML = ""; // clears the container
            
            // calls the ff functions after countdown:
            startTimer(30);
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

// initialize();


// countdown 321 before game starts
// Add when there is time:
// Add function for sleep props that can make character invincible for a few secs