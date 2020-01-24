
const start = document.getElementById("btn-start");
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

// MODAL - HOW TO PLAY
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

// START GAME BUTTON
start.onclick = () => {
    location.href = "./jump.html";
}

