//NAVBAR//
function toggleMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".nav-list");
  menuToggle.classList.toggle("open");
  menu.classList.toggle("open");
}
//Llamado desde el Json Server

const getProducts = async () => {
  const promesa = fetch("http://localhost:3000/productos");
  const resolver = await promesa;
  const productos = await resolver.json();
  console.log(productos);
  let returnProducts = "";

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

// Llamar a la función para manejar los eventos de los botones una vez que se haya cargado el DOM
window.addEventListener("DOMContentLoaded", () => {
  manejarEventosBotones();
});

//Botón Filtro
document.addEventListener("DOMContentLoaded", function () {
  const sectionLinks = document.querySelectorAll("#shop .shop-list a");

  sectionLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      // Remove 'active' class from all links
      sectionLinks.forEach(function (link) {
        link.classList.remove("active");
      });

      // Add 'active' class to the clicked link
      this.classList.add("active");
    });
  });
});



// Función para crear el stock por talla
function crearStockPorTalla(desde, hasta) {
  const stock = {};
  for (let i = desde; i <= hasta; i++) {
    stock[`Size${i}`] = i;
  }
  return stock;
}

// Listado De Productos


// Función para filtrar por tipo de producto
function filtrarPorTipo(productos, tipo) {
  return productos.filter((producto) => producto.tipoAccesorio === tipo);
}

// Función para ordenar por precio (ascendente y descendente)
function ordenarPorPrecio(productos, ascendente = true) {
  return [...productos].sort((a, b) => {
    const precioA = parseFloat(a.precioUnitario);
    const precioB = parseFloat(b.precioUnitario);
    return ascendente ? precioA - precioB : precioB - precioA;
  });
}

// Función para buscar productos por nombre
function buscarPorNombre(productos, terminoBusqueda) {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );
}

// Objeto que mapea los tipos de accesorios a sus correspondientes tipos
const tipoAccesorioMap = {
  all: productos,
  rings: filtrarPorTipo(productos, "anillo"),
  necklaces: filtrarPorTipo(productos, "collar"),
  earrings: filtrarPorTipo(productos, "aretes"),
  bracelets: filtrarPorTipo(productos, "bracaletes"),
};

const containerCards = document.getElementById("containerCards");

const printProducts = (container, listProducts) => {
  container.innerHTML = "";
  listProducts.forEach((element) => {
    container.innerHTML += `
              <article class="card" id="${element.id}" data-click="card">
                  <img src=${element.imagenes[0]} alt=${element.nombre} data-click="card">
                  <h3 data-click="card">${element.nombre}</h3>
                  <span data-click="card">$${element.precioUnitario}</span>
              </article>
          `;
  });
};
 printProducts(containerCards, productos);

 document.addEventListener("click", (event) => {
  if (event.target.getAttribute("data-click") === "card") {
    location.href = "../pages/Luxury-Charms-View.html";
  }
});

// Event listener para los enlaces de tipo de accesorio
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function () {
    const tipoAccesorio = this.id;
    const productosFiltrados = tipoAccesorioMap[tipoAccesorio];
    printProducts(containerCards, productosFiltrados);
    searchBar.value = "";

    // Agregar evento de cambio al selector de ordenamiento de precios
    sortByPrice.addEventListener("change", () => {
      const sortOrder = sortByPrice.value === "asc" ? true : false;
      const sortedProducts = ordenarPorPrecio(productosFiltrados, sortOrder);
      printProducts(containerCards, sortedProducts);
    });
  });
});

// Event listener para el filtro por nombre
const searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("input", function () {
  const terminoBusqueda = searchBar.value.trim();
  const productosEncontrados = buscarPorNombre(productos, terminoBusqueda);
  printProducts(containerCards, productosEncontrados);

  // Evento de cambio al selector de ordenamiento de precios
  sortByPrice.addEventListener("change", () => {
    const sortOrder = sortByPrice.value === "asc" ? true : false;
    const sortedProducts = ordenarPorPrecio(productosEncontrados, sortOrder);
    printProducts(containerCards, sortedProducts);
  });
});

// Función para calcular el total a pagar de la compra
function calcularTotalCompra(productos) {
  const total = productos.reduce(
    (total, producto) =>
      total + (producto.cantidad || 1) * parseFloat(producto.precioUnitario),
    0
  );
  return total.toFixed(2);
}

// Ingresar productos para calcular el total de la compra, (Al ingresar el id, se le asigna el precio declarado en el listado de productos a cada producto)
const productosCompra = [
  { productoId: 1, cantidad: 2 },
  { productoId: 2, cantidad: 3 },
  { productoId: 4, cantidad: 1 },
  { productoId: 7, cantidad: 2 },
];

// Obtener productos mediante IDs
const productosCompraDetallados = productosCompra.map((item) => ({
  ...productos.find((producto) => producto.id === item.productoId),
  cantidad: item.cantidad,
}));

const totalCompra = calcularTotalCompra(productosCompraDetallados);
console.log("Total a pagar de la compra:", `$${totalCompra}`);

};
getProducts();
