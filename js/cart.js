const cartButton = document.getElementById("btnCart");
const modal = document.querySelector(".modalCart");
const closeButton = document.getElementById("closeModal");

const toggleModal = (button, modal) => {
    button.addEventListener("click", () => {
        modal.classList.toggle("hidden");
        modal.classList.toggle("show");
    })
}

window.addEventListener("load", () => {
    mostrarProductosEnCarrito();
});

const mostrarProductosEnCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cartProductsContainer = document.getElementById("cartProducts");
    const totalCheckContainer = document.getElementById("totalCheckContainer");

    cartProductsContainer.innerHTML = ""; 

    if (carrito.length === 0) {
        cartProductsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach((item) => {
        const productHTML = `
            <div class="cart-product">
                <img class="product-img" src="${item.producto.imagenes[0]}" alt="${item.producto.nombre}" />
                <div class="cart-product-info">
                    <h3>${item.producto.nombre}</h3>
                    <h4>Code: ${item.producto.codigo}</h4>
                    <h5>$${item.producto.precioUnitario}</h5>
                </div>
                <div class="cart-product-edit">
                    <img src="../assets/Edit Icon.png" alt="Edit Icon" />
                    <h4>x${item.cantidad}</h4>
                </div>
                <img class="cart-line" src="../assets/Cart Line.png" alt="Cart Line" />
            </div>
        `;
        cartProductsContainer.innerHTML += productHTML;
    });

    // Calcular el total de la compra
    const total = carrito.reduce((acc, item) => acc + (item.producto.precioUnitario * item.cantidad), 0);
    
    // Agregar total y botón de continuar
    totalCheckContainer.innerHTML = `
        <img class="cart-line" src="../assets/Cart Line.png" alt="Cart Line" />
        <div class="totalCheck">
            <h3>Total</h3>
            <h4>$${total.toFixed(2)}</h4>
        </div>
        <button id="continueButton">Continue to check out</button>
    `;

    continueButton.addEventListener("click", () => {
        window.location.href = "../pages/Payment.html";
    });
};

toggleModal(cartButton, modal);
toggleModal(closeButton, modal);