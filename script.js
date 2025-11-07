document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.agregar');
  const listaCarrito = document.getElementById('lista-carrito');
  const botonVaciar = document.getElementById('vaciar');
  const botonComprar = document.getElementById('comprar');
  const contador = document.getElementById('contador');
  const totalTexto = document.getElementById('total');
  let carrito = [];

  function parsePrecio(text) {
    if (!text) return 0;
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', e => {
      const producto = e.target.closest('.producto');
      const nombre = producto.querySelector('h3').textContent;
      const precio = parsePrecio(producto.querySelector('.precio').textContent);
      agregarAlCarrito(nombre, precio);
    });
  });

  function agregarAlCarrito(nombre, precio) {
    const item = carrito.find(p => p.nombre === nombre);
    if (item) item.cantidad++;
    else carrito.push({ nombre, precio, cantidad: 1 });
    actualizarCarrito();
  }

  function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    carrito.forEach(p => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} x${p.cantidad} — $${(p.precio * p.cantidad).toLocaleString('es-CO')}`;
      listaCarrito.appendChild(li);
    });
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    contador.textContent = `Productos en carrito: ${carrito.reduce((a, b) => a + b.cantidad, 0)}`;
    totalTexto.textContent = `Total: $${total.toLocaleString('es-CO')}`;
  }

  botonVaciar.addEventListener('click', () => {
    if (confirm('¿Seguro que deseas vaciar el carrito?')) {
      carrito = [];
      actualizarCarrito();
    }
  });

  botonComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    alert(`🎉 ¡Gracias por tu compra en La Ficha Perdida!\nTotal a pagar: ${totalTexto.textContent}`);
    carrito = [];
    actualizarCarrito();
  });
});
