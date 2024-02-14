window.addEventListener("load", () => {
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const idDetail = urlParams.get("idDetail");
  localStorage.setItem("idDetail", idDetail); // Almacenar el ID del detalle en localStorage
  setProducts().then((data) => {
    productos = data;
    getDetails(idDetail);
    manejarEventosBotones();
    setAddToCart();
    mostrarDetallesEnLocalStorage(); // Mostrar detalles del producto almacenados en localStorage
  });
});

const getDetails = (idDetail) => {
  let producto = productos.find((producto) => producto.id === idDetail);
  printDetails(producto);
};

const printDetails = (producto) => {
  let leftPart = document.getElementById("left-part");
  leftPart.innerHTML = `
    <div class="options">
        <h3>Home</h3>
        <img src="../assets/Arrow forward ios 1.png" alt="Arrow forward">
        <h3>Shop</h3>
        <img src="../assets/Arrow forward ios 1.png" alt="Arrow forward">
        <h3>${producto.nombre}</h3>
    </div>
    <div class="product-container">
        <div class="multiple-views">
            <img src=${producto.imagenes[0]} alt="view1">
            <img src=${producto.imagenes[0]} alt="view2">
            <img src=${producto.imagenes[0]} alt="view3">
            <img src=${producto.imagenes[0]} alt="view4">
        </div>
        <div class="big-view">
            <img id="heart-icon" src="../assets/Heart icon.png" alt="">
            <img class="small-img" src=${producto.imagenes[0]} alt="Small view">
            <img class="big-img" src=${producto.imagenes[0]} alt="Big view">
        </div>
    </div>
  `;

  let rightPart = document.getElementById("right-part");
  rightPart.innerHTML = `
    <div class="info-container">
        <h2>${producto.nombre}</h2>
        <h4>Code: ${producto.codigo}</h4>
        <h3>$${producto.precioUnitario}</h3>
        <h5>Color</h5>
        <div class="colors-container">
            ${producto.stockPorColorTalla.map(stock => `
                <button class="color-btn circle-${stock.color}" data-color="${stock.color}"></button>
            `).join('')}
        </div>
    </div>
    <div class="size-container">
        <h3>Size</h3>
        <div class="size-btn-container">
            <button class="btn-size" id="size48btn">48</button>
            <button class="btn-size" id="size50btn">50</button>
            <button class="btn-size" id="size52btn">52</button>
            <button class="btn-size" id="size54btn">54</button>
            <button class="btn-size" id="size56btn">56</button>
            <button class="btn-size" id="size58btn">58</button>
            <button class="btn-size" id="size60btn">60</button>
            <button class="btn-size" id="size62btn">62</button>
            <button class="btn-size" id="size64btn">64</button>
            <button class="btn-size" id="size66btn">66</button> 
            <button class="btn-size" id="size68btn">68</button>
            <button class="btn-size" id="size70btn">70</button>
        </div>
    </div>
    <div class="quantity-container">
        <h3>Quantity</h3>
        <button id="decrease">-</button>
        <button id="quantity">1</button>
        <button id="increase">+</button>
    </div>
    <div class="add-buy-container">
        <button class="cart-btn" id="add-to-cart">
        <img src="../assets/Add shopping cart.png">
        Add to bag</button>
        <button class="buy-btn"><a href="./Payment.html">Buy now</a></button>
    </div>
    <div class="shop-options-container">
        <select class="deliver">
            <option value="option1">Delivery</option>
        </select>
        <select class="payment">
            <option value="option1">Payment</option>
        </select>
        <select class="warranty">
            <option value="option1">Warranty</option>
        </select>
        <select class="care">
            <option value="option1">Care</option>
        </select>
    </div>
  `;
};

// Función para manejar los eventos de los botones
function manejarEventosBotones() {
  // Manejar el click en los botones de color
  const colorButtons = document.querySelectorAll(".color-btn");
  colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      colorButtons.forEach((btn) => btn.classList.remove("selectedColor"));
      button.classList.add("selectedColor");
    });
  });

  // Manejar el click en los botones de talla
  const sizeButtons = document.querySelectorAll(".btn-size");
  sizeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sizeButtons.forEach((btn) => btn.classList.remove("selectedSize"));
      button.classList.add("selectedSize");
    });
  });

  const quantitySpan = document.getElementById("quantity");

  // Manejar el evento click del botón de disminuir cantidad
  const decreaseButton = document.getElementById("decrease");
  decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantitySpan.textContent);
    if (quantity > 1) {
      quantity--;
      quantitySpan.textContent = quantity;
    }
  });

  // Manejar el evento click del botón de aumentar cantidad
  const increaseButton = document.getElementById("increase");
  increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantitySpan.textContent);
    quantity++;
    quantitySpan.textContent = quantity;
  });
}

const setAddToCart = () => {
  const addToCart = document.getElementById("add-to-cart");
  addToCart.addEventListener("click", () => {
    let selectedColorBtn = getSelectedColor();
    let selectedSizeBtn = getSelectedSize();
    let quantityBtn = getQuantity();

    // Obtener los detalles del producto almacenados en localStorage
    const idDetail = localStorage.getItem("idDetail");
    const producto = productos.find((producto) => producto.id === idDetail);

    // Almacenar los detalles del producto en localStorage
    localStorage.setItem("productoEnCarrito", JSON.stringify({
      producto,
      selectedColorBtn,
      selectedSizeBtn,
      quantityBtn
    }));

    // Aquí enviar los detalles del producto al endpoint
    enviarAlCarrito(producto, selectedColorBtn, selectedSizeBtn, quantityBtn);
  });
};

// Método para obtener el color seleccionado
const getSelectedColor = () => {
  let colors = document.querySelectorAll(".color-btn");
  let selectedColor;
  colors.forEach((color) => {
    if (color.classList.contains("selectedColor")) {
      selectedColor = color.getAttribute("data-color");
    }
  });
  return selectedColor;
};

// Método para obtener la talla seleccionada
const getSelectedSize = () => {
  let sizes = document.querySelectorAll(".btn-size");
  let selectedSize;
  sizes.forEach((size) => {
    if (size.classList.contains("selectedSize")) {
      selectedSize = size.textContent;
    }
  });
  return selectedSize;
};

//Obtener cantidad seleccionada
const getQuantity = () => {
  return document.getElementById("quantity").textContent;
};

// Función para enviar los detalles del producto al endpoint del carrito
const enviarAlCarrito = (producto, selectedColorBtn, selectedSizeBtn, quantityBtn) => {
  // Aquí realiza la lógica para enviar los detalles al endpoint del carrito
  // Puedes usar fetch u otra librería para hacer la solicitud al servidor
  // por ejemplo:
  fetch('http://localhost:3000/carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      producto,
      selectedColorBtn,
      selectedSizeBtn,
      quantityBtn
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Response:', data);
    // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito al usuario
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
  });
};

// Función para mostrar los detalles del producto almacenados en localStorage
const mostrarDetallesEnLocalStorage = () => {
  const productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito"));
  if (productoEnCarrito) {
    console.log("Detalles del producto en el carrito:", productoEnCarrito);
    // Aquí puedes agregar lógica para mostrar los detalles en tu página, por ejemplo:
    // document.getElementById("nombreProducto").textContent = productoEnCarrito.producto.nombre;
    // document.getElementById("precioProducto").textContent = productoEnCarrito.producto.precio;
    // etc.
  } else {
    console.log("No hay detalles de producto en el carrito almacenados en localStorage.");
  }
};