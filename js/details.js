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
      <button class="color-btn circle-grey" data-color="${producto.stockPorColorTalla[0].color}"></button>
      <button class="color-btn circle-pink" data-color="${producto.stockPorColorTalla[1].color}"></button>
    </div>
  </div>
    <div class="size-container">
        <h3>Size</h3>
        <div class="size-btn-container">
            ${producto.stockPorColorTalla[0].tallas.map(talla => `
              <button class="btn-size" data-talla="${talla}">${talla}</button>
            `).join('')}
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

    if (!selectedColorBtn || !selectedSizeBtn) {
      alert("Porfavor Selcciona Una Talla Y Color Antes de continuar");
      return;
    }

    // Obtener los detalles del producto almacenados en localStorage
    const idDetail = localStorage.getItem("idDetail");
    const producto = productos.find((producto) => producto.id === idDetail);

    // Almacenar los detalles del producto en localStorage
    localStorage.setItem("productoEnCarrito", JSON.stringify({
      producto,
      Color: selectedColorBtn,
      talla: selectedSizeBtn,
      cantidad: quantityBtn
    }));

    // Aquí enviar los detalles del producto al endpoint
    enviarAlCarrito(producto, selectedColorBtn, selectedSizeBtn, quantityBtn);
  });
};

// Método para obtener el color seleccionado
const getSelectedColor = () => {
  const selectedColorBtn = document.querySelector(".selectedColor");
  return selectedColorBtn ? selectedColorBtn.dataset.color : null;
};

// Método para obtener la talla seleccionada
const getSelectedSize = () => {
  const selectedSizeBtn = document.querySelector(".selectedSize");
  return selectedSizeBtn ? selectedSizeBtn.dataset.talla : null;
};

//Obtener cantidad seleccionada
const getQuantity = () => {
  return document.getElementById("quantity").textContent;
};

const enviarAlCarrito = (producto, selectedColorBtn, selectedSizeBtn, quantityBtn) => {
  fetch('http://localhost:3000/carrito', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      producto,
      Color: selectedColorBtn,
      talla: selectedSizeBtn,
      cantidad: quantityBtn
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('La red no esta bien');
    }
    return response.json();
  })
  .then(data => {
    console.log('Producto Añadido Con Éxito', data);

  })
  .catch(error => {
    console.error('Ocurrio un problema:', error);
  });
};

// Función para mostrar los detalles del producto almacenados en localStorage
const mostrarDetallesEnLocalStorage = () => {
  const productoEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito"));
  if (productoEnCarrito) {
    console.log("Detalles del producto en el carrito:", productoEnCarrito);
  } else {
    console.log("No hay detalles de producto en el carrito almacenados en localStorage.");
  }
};