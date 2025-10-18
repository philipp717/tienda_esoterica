let carrito = [];

function agregarAlCarrito(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const itemEnCarrito = carrito.find(item => item.id === productoId);
        if (itemEnCarrito) {
            itemEnCarrito.cantidad++;
        } else {
            carrito.push({...producto, cantidad: 1});
        }
        actualizarCarrito();
        mostrarNotificacion('Producto agregado al carrito');
    }
}

function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(item => item.id !== productoId);
    actualizarCarrito();
}

function actualizarCantidad(productoId, nuevaCantidad) {
    const item = carrito.find(item => item.id === productoId);
    if (item) {
        item.cantidad = Math.max(1, nuevaCantidad);
        actualizarCarrito();
    }
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById('carrito-items');
    const totalElement = document.getElementById('carrito-total');
    
    carritoContainer.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
            <div>
                <h4>${item.nombre}</h4>
                <p>$${item.precio.toLocaleString()} x 
                    <input type="number" value="${item.cantidad}" min="1" 
                        onchange="actualizarCantidad(${item.id}, parseInt(this.value))">
                </p>
            </div>
            <button onclick="eliminarDelCarrito(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        carritoContainer.appendChild(itemElement);
    });

    totalElement.textContent = total.toLocaleString();
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    alert('¡Gracias por tu compra! Pronto recibirás un correo con los detalles.');
    carrito = [];
    actualizarCarrito();
    document.getElementById('carrito-modal').style.display = 'none';
});