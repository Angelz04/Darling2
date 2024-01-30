//NAVBAR//
function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-list');
    menuToggle.classList.toggle('open');
    menu.classList.toggle('open');
}


//LISTADO DE PRODUCTOS//

// Función para crear el stock por talla
function crearStockPorTalla(desde, hasta) {
    const stock = {};
    for (let i = desde; i <= hasta; i++) {
      stock[`Size${i}`] = i;
    }
    return stock;
  }
  
  // Listado De Productos
  const productos = [
    {
      id: 1,
      nombre: 'Luxury Gems Necklace',
      codigo: 'A001',
      precioUnitario: 168.76,
      tipoAccesorio: 'collar',
      imagenes: ['./assets/Luxury Gems Necklace.png'],
      descripcion: 'Collar de gemas de lujo',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 2,
      nombre: 'Aurora Ring',
      codigo: 'A002',
      precioUnitario: 125.28,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Aurora Ring.png'],
      descripcion: 'Anillo aurora',
      stockPorColorTalla: {
        rubi: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 3,
      nombre: 'Reflection Necklace',
      codigo: 'A003',
      precioUnitario: 620.73,
      tipoAccesorio: 'collar',
      imagenes: ['./assets/Reflection Necklace.png'],
      descripcion: 'Collar Reflectante',
      stockPorColorTalla: {
        bronce: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 4,
      nombre: 'Dreamy Infinity Ring',
      codigo: 'A004',
      precioUnitario: 321.71,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Dreamy Infinity Ring.png'],
      descripcion: 'anillo infinito de ensueño',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 5,
      nombre: 'Opulent Jewels Ring',
      codigo: 'A005',
      precioUnitario: 168.76,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Opulent Jewels Ring.png'],
      descripcion: 'anillo de joyas opulentas',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        zafiro: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 6,
      nombre: 'Serene Solitaire Earrings',
      codigo: 'A006',
      precioUnitario: 125.28,
      tipoAccesorio: 'aretes',
      imagenes: ['./assets/Serene Soliraire Earrings.png'],
      descripcion: 'anillos solitarios serenos',
      stockPorColorTalla: {
        dorado: crearStockPorTalla(48, 70),
        zafiro: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 7,
      nombre: 'Timeless Halo Earrings',
      codigo: 'A007',
      precioUnitario: 620.73,
      tipoAccesorio: 'aretes',
      imagenes: ['./assets/Timeless Halo Earrings.png'],
      descripcion: 'pendientes de halo atemporales',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 8,
      nombre: 'Exquisite Earrings',
      codigo: 'A008',
      precioUnitario: 327.71,
      tipoAccesorio: 'aretes',
      imagenes: ['./assets/Exquisite Earrings.png', './assets/Exquisite Earrings Order.png'],
      descripcion: 'pendientes exquisitos',
      stockPorColorTalla: {
        rubi: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    
    {
      id: 9,
      nombre: 'Timeless Elegance Rings',
      codigo: 'A009',
      precioUnitario: 168.76,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Timeless Elegance Ring.png'],
      descripcion: 'Anillos de elegancia atemporal',
      stockPorColorTalla: {
        zafiro: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 10,
      nombre: 'Luxury Charms Ring',
      codigo: 'A010',
      precioUnitario: 620.73,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Luxury Charms Ring Order.png','./assets/Luxury Charms Ring Product View.png',
                 './assets/Luxury Charms Ring View1.png','./assets/Luxury Charms Ring View2.png',
                 './assets/Luxury Charms Ring View3.png','./assets/Luxury Charms Ring View1.png'
                ],
      descripcion: 'anillo de gemas de lujo',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 11,
      nombre: 'Blissful Bloom Rings',
      codigo: 'A011',
      precioUnitario: 620.73,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Blissful Bloom Ring.png'],
      descripcion: 'Anillos de floración dichosa',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 12,
      nombre: 'Sparkling Ring',
      codigo: 'A012',
      precioUnitario: 620.73,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Sparking Ring.png'],
      descripcion: 'anillo brillante',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        bronce: crearStockPorTalla(48, 70),
      }
    },
    {
      id: 13,
      nombre: 'Glimmering Ring',
      codigo: 'A013',
      precioUnitario: 620.73,
      tipoAccesorio: 'anillo',
      imagenes: ['./assets/Glimmering Ring.png'],
      descripcion: 'anillo brillante',
      stockPorColorTalla: {
        plata: crearStockPorTalla(48, 70),
        dorado: crearStockPorTalla(48, 70),
      }
    },
  ];
  
  
  // Función para filtrar por tipo de producto
  function filtrarPorTipo(productos, tipo) {
    return productos.filter(producto => producto.tipoAccesorio === tipo);
  }
  
  // Filtrado por tipo 
  const tipoAccesorioAFiltrar = 'anillo'; 
  const productosFiltrados = filtrarPorTipo(productos, tipoAccesorioAFiltrar);
  console.log(`Productos de tipo ${tipoAccesorioAFiltrar}:`, productosFiltrados);
  
  // Función para buscar productos por nombre
  function buscarPorNombre(productos, terminoBusqueda) {
    return productos.filter(producto => producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase()));
  }
  
  // Función de búsqueda por nombre
  const terminoBusqueda = 'Luxury'; 
  const productosEncontrados = buscarPorNombre(productos, terminoBusqueda);
  console.log(`Productos que contienen "${terminoBusqueda}":`, productosEncontrados);
  
  // Función para ordenar por precio (ascendente y descendente)
  function ordenarPorPrecio(productos, ascendente = true) {
    return [...productos].sort((a, b) => {
      const precioA = parseFloat(a.precioUnitario);
      const precioB = parseFloat(b.precioUnitario);
      return ascendente ? precioA - precioB : precioB - precioA;
    });
  }
  console.log('Productos ordenados por precio ascendente:', ordenarPorPrecio(productos, true));
  console.log('Productos ordenados por precio descendente:', ordenarPorPrecio(productos, false));
  
  // Función para calcular el total a pagar de la compra
  function calcularTotalCompra(productos) {
    const total = productos.reduce((total, producto) => total + (producto.cantidad || 1) * parseFloat(producto.precioUnitario), 0);
    return total.toFixed(2);
  }
  
  
  // Ingresar productos para calcular el total de la compra, (Al ingresar el id, se le asigna el precio declarado en el listado de productos a cada producto)
  const productosCompra = [
    { productoId: 1, cantidad: 2 },
    { productoId: 2, cantidad: 3 },
    { productoId: 4, cantidad: 1 },
    { productoId: 7, cantidad: 2},
  ];
  
  // Obtener productos mediante IDs
  const productosCompraDetallados = productosCompra.map(item => ({
    ...productos.find(producto => producto.id === item.productoId),
    cantidad: item.cantidad
  }));

  const totalCompra = calcularTotalCompra(productosCompraDetallados);
  console.log('Total a pagar de la compra:', `$${totalCompra}`);
  
  