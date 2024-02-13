var productos;

window.addEventListener("load", () => {
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const idDetail = urlParams.get("idDetail");
  setProducts().then((data) => {
    productos = data;
    getDetails(idDetail);
    manejarEventosBotones();
    setAddToCart();
  });
});

const getDetails = (idDetail) => {
  var producto = productos.find((producto) => producto.id === idDetail);
  printDetails(producto);
};

const printDetails = (producto) => {
  var leftPart = document.getElementById("left-part");
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

  var rightPart = document.getElementById("right-part");
  rightPart.innerHTML = `
    <div class="info-container">
        <h2>${producto.nombre}</h2>
        <h4>Code: ${producto.codigo}</h4>
        <h3>$${producto.precioUnitario}</h3>
        <h5>Color</h5>
        <div class="colors-container">
            <button id ="circle-grey" class = "color-btn"></button>
            <button id ="circle-pink" class = "color-btn"></button>
        </div>
    </div>
    <div class="size-container">
        <h3>Size</h3>
        <div class="size-btn-container">
            <button class="btn-size"id="size48btn">48</button>
            <button class="btn-size"id="size50btn">50</button>
            <button class="btn-size"id="size52btn">52</button>
            <button class="btn-size"id="size54btn">54</button>
            <button class="btn-size"id="size56btn">56</button>
            <button class="btn-size"id="size58btn">58</button>
            <button class="btn-size"id="size60btn">60</button>
            <button class="btn-size"id="size62btn">62</button>
            <button class="btn-size"id="size64btn">64</button>
            <button class="btn-size"id="size66btn">66</button> 
            <button class="btn-size"id="size68btn">68</button>
            <button class="btn-size"id="size70btn">70</button>
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
    var selectedColorBtn = getSelectedColor();
    var selectedSizeBtn = getSelectedSize();
    var quantityBtn = getQuantity();
    console.log(quantityBtn)
  });
};

// Método para obtener el color seleccionado
const getSelectedColor = () => {
  var colors = document.querySelectorAll(".color-btn");
  var selectedColor;
  colors.forEach((color) => {
    if (color.getAttribute("class") === "color-btn selectedColor"){
      selectedColor = color
    }
  }) 
  return selectedColor;
}

// Método para obtener la talla seleccionada
const getSelectedSize = () => {
  var sizes = document.querySelectorAll(".btn-size");
  var selectedSize;
  sizes.forEach((size) => {
    if (size.getAttribute("class") === "btn-size selectedSize"){
      selectedSize = size
    }
  })
  return selectedSize;
}

//Obtener cantidad seleccionada
const getQuantity = () => {
  return document.getElementById("quantity").textContent
}

