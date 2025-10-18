document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos('todos');
    inicializarModal();
    inicializarFiltros();
});

function mostrarProductos(categoria) {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    const productosFiltrados = categoria === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === categoria);

    productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                <button class="agregar-carrito" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function inicializarFiltros() {
    const botones = document.querySelectorAll('.categoria-btn');
    botones.forEach(boton => {
        boton.addEventListener('click', () => {
            document.querySelector('.categoria-btn.active').classList.remove('active');
            boton.classList.add('active');
            mostrarProductos(boton.dataset.categoria);
        });
    });
}

function inicializarModal() {
    const modal = document.getElementById('carrito-modal');
    const carritoBtn = document.querySelector('a[href="#carrito"]');
    const cerrarBtn = document.querySelector('.cerrar');

    carritoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    cerrarBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Animación suave para el scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        if (this.getAttribute('href') === '#carrito') return;
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});