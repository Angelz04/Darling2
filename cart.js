const cartButton = document.getElementById("btnCart");
const modal = document.querySelector(".modalCart");
const closeButton = document.getElementById("closeModal");

const toggleModal = (button, modal) => {
    button.addEventListener("click", () => {
        modal.classList.toggle("hidden");
        modal.classList.toggle("show");
    })
}


toggleModal(cartButton, modal);
toggleModal(closeButton, modal);