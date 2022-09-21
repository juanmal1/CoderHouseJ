class producto {
    constructor(producto, id, cantidad, imagen, precio, stock){
        this.producto=producto;
        this.id=id
        this.cantidad=cantidad
        this.imagen=imagen;
        this.precio=precio;
        this.stock=stock;
    }
}


/*-----------------------------PRODUCTOS-----------------*/
const producto1 = new producto("Top Cat", 1, 1, "./media/SofiLBdia1win20220138rew_720x.webp", 14850, 2 );
const producto2 = new producto("Top ido", 2, 1, "./media/sofia-Lb-dia-4--win-225639_720x.webp", 15850, 1 );
const producto3 = new producto("Top Cat B", 3, 1, "./media/SofiLBdia2Win20232660rew_720x.webp", 12850, 3 );



const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const cantidad = document.getElementById('cantidad')
const cantidadTotal = document.getElementById('cantidadTotal')

const precioCuotas = document.getElementById('cuotas')

const productos = []
const carrito = []



botonVaciar.addEventListener('click', () =>{
    carrito.length = 0
    actualizarCarrito()
})


productos.push(producto1);
productos.push(producto2);
productos.push(producto3);

/*---------------- NODO PRODUCTOS------------*/
function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    
    contenedorProductos.innerHTML= "";

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("caja");
        divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.producto}">
        <p>${producto.producto}</p>
        <p> Precio : $${producto.precio}</p>
        <p> Stock: ${producto.stock}</p>
        <button id="agregar ${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
        `
    
    contenedorProductos.appendChild(divProducto);
    
    

    const boton = document.getElementById(`agregar ${producto.id}`)

    boton.addEventListener('click', () => {
        agregarCarrito(producto.id)
    })

    });
}
mostrarProductos(productos);


/*---------------- AGREGAR O QUITAR DEL CARRITO--------------------*/
const agregarCarrito = (prodId) =>{
    const existe =carrito.some (producto => producto.id ===prodId)
    
    if(existe){
            producto = carrito.map(producto => {
            if(producto.id === prodId){
                producto.cantidad++
            }
        })
    } else{
    const item = productos.find ((producto) => producto.id === prodId)
    carrito.push(item)
    }
    actualizarCarrito()
}

const eliminarCarrito = (prodId) => {
    const item = carrito.find((producto)=> producto.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

/*-------------CARRITO-------------*/
const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((producto)=>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${producto.producto}</p>
        <p>Precio: $${producto.precio}</p>
        <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)

        
        
    })
    contadorCarrito.innerText = carrito.length

    localStorage.setItem(carrito, JSON.stringify(carrito))

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0)
}


function guardar(){
    let data = localStorage.getItem('carrito');
    let devolverCarrito = JSON.parse(data);
}




/*----------CARRITO MODEL---------*/
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]


botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() 
})

