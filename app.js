const botonesAgregar = document.querySelectorAll('.agregar');
const listaCarrito = document.getElementById('lista-carrito');
const botonVaciar = document.getElementById('vaciar');
const botonComprar = document.getElementById('comprar');
const contador = document.getElementById('contador');

let carrito = [];

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', (e) => {
    const producto = e.target.parentElement.querySelector('h3').textContent;
    agregarAlCarrito(producto);
  });
});

function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.nombre === producto);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ nombre: producto, cantidad: 1 });
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} x${p.cantidad}`;
    listaCarrito.appendChild(li);
  });
  contador.textContent = `Productos en carrito: ${carrito.reduce((acc, p) => acc + p.cantidad, 0)}`;
}

botonVaciar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('El carrito ya está vacío.');
    return;
  }
  if (confirm('¿Seguro que deseas vaciar el carrito?')) {
    carrito = [];
    actualizarCarrito();
  }
});

botonComprar.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('No hay productos en el carrito.');
  } else {
    alert('🎉 ¡Gracias por tu compra en La Ficha Perdida - Duván Rivera!');
    carrito = [];
    actualizarCarrito();
  }
});
