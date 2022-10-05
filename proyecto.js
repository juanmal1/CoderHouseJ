class producto {
    constructor(producto, id, cantidad, imagen, precio, stock) {
        this.producto = producto;
        this.id = id;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.precio = precio;
        this.stock = stock;
    }
}

/*-----------------------------PRODUCTOS-----------------*/
const producto1 = new producto("Top Cat", 1, 1, "./media/SofiLBdia1win20220138rew_720x.webp", 14850, 2);
const producto2 = new producto("Top ido", 2, 1, "./media/sofia-Lb-dia-4--win-225639_720x.webp", 15850, 1);
const producto3 = new producto("Top Cat B", 3, 1, "./media/SofiLBdia2Win20232660rew_720x.webp", 12850, 3);
const producto4 = new producto("Botas", 4, 1, "./media/botas10.webp", 15000, 3);
const producto5 = new producto("Top Mono", 5, 1, "./media/conjunto1.png", 16000, 3);
const producto6 = new producto("Top Pantalon", 6, 1, "./media/conjunto2.png", 18000, 3);


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
        <p>${producto.producto}</p>
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
        producto = carrito.map((producto) => {
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

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);
productos.push(producto4);
productos.push(producto5);
productos.push(producto6);

/*---------------- NODO PRODUCTOS------------*/
const getData = async () =>{
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

    const printPoducto = async()=>{
        const producto = await getData();

        productos.forEach((data) => {
            const divProducto = document.createElement("div");
            divProducto.classList.add("caja");
            divProducto.innerHTML = `
            <img src="${data.imagen}" alt="${data.img}">
            <p>${data.producto}</p>
            <p> Precio : $${data.precio}</p>
            <p> Stock: ${data.stock}</p>
            <button id="agregar ${data.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
            `
            contenedorProductos.appendChild(divProducto);

            
            
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
    }
        
getData(producto);
        



// function mostrarProductos(productos) {
//     const contenedorProductos = document.getElementById("contenedor-productos");

//     contenedorProductos.innerHTML = "";

//     productos.forEach((producto) => {
//         const divProducto = document.createElement("div");
//         divProducto.classList.add("caja");
//         divProducto.innerHTML = `
//         <img src="${producto.imagen}" alt="${producto.producto}">
//         <p>${producto.producto}</p>
//         <p> Precio : $${producto.precio}</p>
//         <p> Stock: ${producto.stock}</p>
//         <button id="agregar ${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
//         `;

//         contenedorProductos.appendChild(divProducto);

//         const boton = document.getElementById(`agregar ${producto.id}`);

//         boton.addEventListener("click", () => {
//             Toastify({
//                 text: "Agregaste el producto al carrito",
//                 duration: 2500,
//                 newWindow: true,
//                 close: true,
//                 gravity: "top", // `top` or `bottom`
//                 position: "right", // `left`, `center` or `right`
//                 stopOnFocus: true, // Prevents dismissing of toast on hover
//                 style: {
//                 background: "linear-gradient(to right, #000000, #771a53be)",
//                 },
//                 onClick: function(){} // Callback after click
//             }).showToast();
//             agregarCarrito(producto.id);

//         });
//     });
// }
// mostrarProductos(productos);



// function guardar() {
//     let data = localStorage.getItem("carrito");
//     let devolverCarrito = JSON.parse(data);
// }cS




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
