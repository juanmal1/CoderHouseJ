/*-----------ID traidos del html---------*/

const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const cantidad = document.getElementById("cantidad");
const cantidadTotal = document.getElementById("cantidadTotal");
const comprar = document.getElementById("comprar");
const precioCuotas = document.getElementById("cuotas");

/*----storage carrito-----*/

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
console.log(carrito);

if (carrito != []) {
    actualizarCarrito();
}

/*-------------CARRITO-------------*/
function actualizarCarrito() {
    contenedorCarrito.innerHTML = "";
    
    carrito.forEach((producto) => {
        const div = document.createElement("div");
        div.className = "productoEnCarrito";
        div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito (${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;
        contenedorCarrito.appendChild(div);
    });

    contadorCarrito.innerText = carrito.length;

    localStorage.setItem("carrito", JSON.stringify(carrito));


    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);

    precioCuotas.innerText = carrito.reduce((acc, producto) => acc + producto.precio / 12, 0).toFixed()
}



const productos = [];
/*---------------- AGREGAR O QUITAR DEL CARRITO--------------------*/
const agregarCarrito = (prodId) => {
    const existe = carrito.some((producto) => producto.id === prodId);

    if (existe) {
        productos = carrito.map((producto) => {
            if (producto.id === prodId) {
                producto.cantidad++;
            }
        });
    } else {
        const item = productos.find((producto) => producto.id === prodId);
        carrito.push(item);
    }
    actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((producto) => producto.id === prodId);
    const indice = carrito.indexOf(item);
    carrito.splice(indice, 1);
    actualizarCarrito();
};
/*------------- evento dentro del carrito--------*/
comprar.addEventListener("click", () => {
    Swal.fire({
        title: 'Gracias por su compra',
        text: 'Ya es tuyo!!',
        ancho:'2em',
        color:'rgba(207, 26, 108, 0.5)',
        icon: 'success',
        confirmButtonText: 'Confirmar'
    })
    actualizarCarrito();
});
botonVaciar.addEventListener("click", () => {
    carrito.length = 0;
    
    Swal.fire({
        title: 'Seguro que desea eliminar?',
        text: '',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    })
    actualizarCarrito();
});


/*---------------- NODO PRODUCTOS------------*/
function mostrarDatos (){

    const contenedorProductos = document.getElementById("contenedor-productos");

    contenedorProductos.innerHTML = "";

    fetch('./data.json')
    .then(respuesta=> respuesta.json())
    .then(productos=> {
        productos.forEach(producto => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("caja");
            divProducto.innerHTML = `
            <img src="${producto.img}" alt="${producto.img}">
            <p>${producto.nombre}</p>
            <p> Precio : $${producto.precio}</p>
            <p> Stock: ${producto.stock}</p>
            <button id="agregar ${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
            `;
    
            contenedorProductos.appendChild(divProducto);

            console.log(productos);
    
            const boton = document.getElementById(`agregar ${producto.id}`);
    
            boton.addEventListener("click", () => {
                Toastify({
                    text: "Agregaste el producto al carrito",
                    duration: 2500,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to right, #000000, #771a53be)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
                
                agregarCarrito(producto.id);
        });
    })
})
}
mostrarDatos();
/*--------Publicidad rapida----------*/

Toastify({
    text: "No te olvides de registrarte para obetener grandes beneficios",
    duration: 5000,
    destination: "#",
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
    background: "linear-gradient(to right, #000000, #771a53be)",
    },
    onClick: function(){}
}).showToast();



/*----------CARRITO MODEL---------*/
const contenedorModal = document.getElementsByClassName("modal-contenedor")[0];
const botonAbrir = document.getElementById("boton-carrito");
const botonCerrar = document.getElementById("carritoCerrar");
const modalCarrito = document.getElementsByClassName("modal-carrito")[0];

botonAbrir.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});
botonCerrar.addEventListener("click", () => {
    contenedorModal.classList.toggle("modal-active");
});

contenedorModal.addEventListener("click", (event) => {
    contenedorModal.classList.toggle("modal-active");
});
modalCarrito.addEventListener("click", (event) => {
    event.stopPropagation();
});
