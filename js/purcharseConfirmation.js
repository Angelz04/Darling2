window.addEventListener("load", () => {
    mostrarProductosEnPayment();
    actualizarDatosFormulario();
});

const actualizarDatosFormulario = () => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    const totalCompra = parseFloat(localStorage.getItem("totalCompra")) || 0;
    if (formData) {
        document.getElementById("customerName").textContent = formData.name;
        document.getElementById("totalValue").textContent = `$${totalCompra.toFixed(2)}`;
        document.getElementById("orderNumber").textContent = generarNumeroPedido(); 
    }
    const fechaActual = new Date();
    const fechaFormateada = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;
    document.getElementById("fecha").textContent = fechaFormateada; 
};

const mostrarProductosEnPayment = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const orderContainer = document.querySelector(".order-container2");
    orderContainer.innerHTML = "";

    if (carrito.length === 0) {
        orderContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    let total = 0;

    carrito.forEach((item) => {
        const productHTML = `
            <div class="order-container2">
                <img src="${item.producto.imagenes[0]}" alt="${item.producto.nombre}" />
                <div class="product-info2">
                    <h3>${item.producto.nombre}</h3>
                    <h4>Code: ${item.producto.codigo}</h4>
                    <h6>x${item.cantidad}</h6>
                </div>
                <h5>$${(item.producto.precioUnitario * item.cantidad).toFixed(2)}</h5>
            </div>
        `;
        orderContainer.innerHTML += productHTML;
        total += item.producto.precioUnitario * item.cantidad;
    });

    // Guardar el total en el localStorage
    localStorage.setItem("totalCompra", total);

    document.getElementById("totalValue").textContent = `$${total.toFixed(2)}`;
};

const generarNumeroPedido = () => {
    // Generar un número de pedido aleatorio de 9 dígitos
    return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
};

const enviarProductosAlEndpoint = async () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const formData = JSON.parse(localStorage.getItem("formData"));
    const totalCompra = parseFloat(localStorage.getItem("totalCompra")) || 0;

    try {
        const response = await fetch('http://localhost:3000/compras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                total: totalCompra, // Incluir el total en el objeto enviado
                productos: carrito.map(item => ({ nombre: item.producto.nombre, cantidad: item.cantidad }))
            })
        });

        if (response.ok) {
            console.log('Los productos se han enviado al endpoint de compras.');
            // Limpiar el carrito después de enviar los productos
            localStorage.removeItem("carrito");
            // Redireccionar a la página de confirmación de compra
            window.location.href = '../pages/Our-Products.html';
        } else {
            console.error('Error al enviar los productos al endpoint de compras:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
};


document.getElementById("continueShoppingButton").addEventListener("click", enviarProductosAlEndpoint);