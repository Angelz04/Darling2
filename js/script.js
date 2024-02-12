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


const setProducts = async () => {
  const promesa = fetch("http://localhost:3000/productos");
  const resolver = await promesa;
  const respuesta = await resolver.json();
  return respuesta;
}

const productos = []
const tipoAccesorioMap = []
setProducts().then((data) => {
  productos = data
  tipoAccesorioMap = {
    all: productos,
    rings: filtrarPorTipo(productos, "anillo"),
    necklaces: filtrarPorTipo(productos, "collar"),
    earrings: filtrarPorTipo(productos, "aretes"),
    bracelets: filtrarPorTipo(productos, "brazaletes"),
  };
})



// // Listado De Productos
// const productos = [
//   {
//     id: 1,
//     nombre: "Luxury Gems Necklace",
//     codigo: "A001",
//     precioUnitario: 168.76,
//     tipoAccesorio: "collar",
//     imagenes: ["../assets/luxury_gems_necklace.png"],
//     descripcion: "Collar de gemas de lujo",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 2,
//     nombre: "Aurora Ring",
//     codigo: "A002",
//     precioUnitario: 125.28,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Aurora-Ring.png"],
//     descripcion: "Anillo aurora",
//     stockPorColorTalla: {
//       rubi: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 3,
//     nombre: "Reflection Necklace",
//     codigo: "A003",
//     precioUnitario: 620.73,
//     tipoAccesorio: "collar",
//     imagenes: ["../assets/Reflection-Necklace.png"],
//     descripcion: "Collar Reflectante",
//     stockPorColorTalla: {
//       bronce: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 4,
//     nombre: "Dreamy-Infinity-Ring",
//     codigo: "A004",
//     precioUnitario: 321.71,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Dreamy-Infinity-Ring.png"],
//     descripcion: "anillo infinito de ensueño",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 5,
//     nombre: "Opulent Jewels Ring",
//     codigo: "A005",
//     precioUnitario: 168.76,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Opulent-Jewels-Ring.png"],
//     descripcion: "anillo de joyas opulentas",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       zafiro: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 6,
//     nombre: "Serene Solitaire Earrings",
//     codigo: "A006",
//     precioUnitario: 125.28,
//     tipoAccesorio: "aretes",
//     imagenes: ["../assets/Serene-Soliraire-Earrings.png"],
//     descripcion: "anillos solitarios serenos",
//     stockPorColorTalla: {
//       dorado: crearStockPorTalla(48, 70),
//       zafiro: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 7,
//     nombre: "Timeless Halo Earrings",
//     codigo: "A007",
//     precioUnitario: 620.73,
//     tipoAccesorio: "aretes",
//     imagenes: ["../assets/Timeless-Halo-Earrings.png"],
//     descripcion: "pendientes de halo atemporales",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 8,
//     nombre: "Exquisite Earrings",
//     codigo: "A008",
//     precioUnitario: 327.71,
//     tipoAccesorio: "aretes",
//     imagenes: ["../assets/Exquisite-Earrings.png"],
//     descripcion: "pendientes exquisitos",
//     stockPorColorTalla: {
//       rubi: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },

//   {
//     id: 9,
//     nombre: "Luxury Charms Ring",
//     codigo: "A010",
//     precioUnitario: 620.73,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Luxury-Charms-Ring.png"],
//     descripcion: "anillo de gemas de lujo",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 10,
//     nombre: "Blissful Bloom Rings",
//     codigo: "A011",
//     precioUnitario: 620.73,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Blissful-Bloom-Ring.png"],
//     descripcion: "Anillos de floración dichosa",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 11,
//     nombre: "Sparkling Ring",
//     codigo: "A012",
//     precioUnitario: 620.73,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Sparking-Ring.png"],
//     descripcion: "anillo brillante",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       bronce: crearStockPorTalla(48, 70),
//     },
//   },
//   {
//     id: 12,
//     nombre: "Glimmering Ring",
//     codigo: "A013",
//     precioUnitario: 620.73,
//     tipoAccesorio: "anillo",
//     imagenes: ["../assets/Glimmering-Ring.png"],
//     descripcion: "anillo brillante",
//     stockPorColorTalla: {
//       plata: crearStockPorTalla(48, 70),
//       dorado: crearStockPorTalla(48, 70),
//     },
//   },
// ];

// Función para filtrar por tipo de producto
function filtrarPorTipo(productos, tipo) {
  console.log(productos, tipo)
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
// const tipoAccesorioMap = {
//   all: productos,
//   rings: filtrarPorTipo(productos, "anillo"),
//   necklaces: filtrarPorTipo(productos, "collar"),
//   earrings: filtrarPorTipo(productos, "aretes"),
//   bracelets: filtrarPorTipo(productos, "brazaletes"),
// };

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
    console.log(tipoAccesorio)
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
