let lullabySound = new Audio("/audio/twinkle twinkle.mp3");
lullabySound.loop = false;
lullabySound.volume = 0.3;
// lullabySound.play();

// START GAME BUTTON
const start = document.getElementById("btn-start");

start.onclick = () => {
    location.href = "./game.html";
}

// CHOOSE GAME MODE BUTTON


// MODAL - HOW TO PLAY

let modal = document.querySelector(".modal");
let trigger = document.querySelector(".trigger");
let closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.onclick = toggleModal;
closeButton.onclick = toggleModal;
// trigger.addEventListener("click", toggleModal);
// closeButton.addEventListener("click", toggleModal);
// window.addEventListener("click", windowOnClick);

