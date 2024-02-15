window.addEventListener("load", () => {
    mostrarProductosEnPayment();
});

const mostrarProductosEnPayment = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const orderSummaryContainer = document.querySelector(".order-summary-container");
    const subtotalValueElement = document.getElementById("subtotalValue");
    const discountValueElement = document.getElementById("discountValue");
    const totalValueElement = document.getElementById("totalValue");

    orderSummaryContainer.innerHTML = ""; 

    if (carrito.length === 0) {
        orderSummaryContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    carrito.forEach((item) => {
        const productHTML = `
            <div class="order-container">
                <img class="product-img" src="${item.producto.imagenes[0]}" alt="${item.producto.nombre}" />
                <div class="product-info">
                    <h3>${item.producto.nombre}</h3>
                    <h4>Code: ${item.producto.codigo}</h4>
                </div>
                <h5>$${(item.producto.precioUnitario * item.cantidad).toFixed(2)}</h5>
                <img class="delete-icon" src="../assets/deleate icon.png" alt="Delete icon" data-product-id="${item.producto.id}">
            </div>
        `;
        orderSummaryContainer.innerHTML += productHTML;
    });

    // Calcula el subtotal y el descuento (15%)
    const subtotal = carrito.reduce((acc, item) => acc + (item.producto.precioUnitario * item.cantidad), 0);
    const discount = subtotal * 0.15;
    const total = subtotal - discount;

    subtotalValueElement.textContent = `$${subtotal.toFixed(2)}`;
    discountValueElement.textContent = `-$${discount.toFixed(2)}`;
    totalValueElement.textContent = `$${total.toFixed(2)}`;

    // Agregar eventos de clic a los botones de eliminar
    const deleteButtons = document.querySelectorAll(".delete-icon");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            eliminarProductoDelCarrito(productId);
        });
    });
};

const eliminarProductoDelCarrito = (productId) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter((item) => item.producto.id !== productId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductosEnPayment(); 
};

document.addEventListener("DOMContentLoaded", () => {
    const proceedToPaymentButton = document.querySelector(".total-btn");
    proceedToPaymentButton.addEventListener("click", () => {
        window.location.href = "../pages/Purchase-Confirmation.html";
    });
});