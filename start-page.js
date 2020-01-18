// START GAME BUTTON
let start = document.getElementById("btn-start");

start.onclick = () => {
    location.href = "/game.html";
}

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

