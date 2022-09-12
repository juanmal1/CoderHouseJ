class producto {
    constructor(procuto, imagen, precio, stock){
        this.procuto=procuto;
        this.imagen=imagen;
        this.precio=precio;
        this.stock=stock;
    }
}

const producto1 = new producto("Top Cat", "/CoderHouseJavascrip/media/SofiLBdia1win20220138rew_720x.webp", "$14,850", "2" );
const producto2 = new producto("Top ido", "/CoderHouseJavascrip/media/sofia-Lb-dia-4--win-225639_720x.webp", "$15,850", "1" );
const producto3 = new producto("Top Cat B", "/CoderHouseJavascrip/media/SofiLBdia2Win20232660rew_720x.webp", "$12,850", "3" );


const productos = []

productos.push(producto1);
productos.push(producto2);
productos.push(producto3);


function mostrarProductos(productos) {
    const contenedorProductos = document.getElementById("contenedor-productos");
    contenedorProductos.innerHTML= "";

    productos.forEach(producto => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("caja");
        divProducto.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.procuto}">
        <p>${producto.procuto}</p>
        <p> Precio :${producto.precio}</p>
        <p> Stock: ${producto.stock}</p>
        <button class="btn">Carrito</button>
        `;
    contenedorProductos.appendChild(divProducto)
    });
}

mostrarProductos(productos);

const botones = document.querySelectorAll(".btn");

const cuandoSeHaceClick = function () {

	alert("Agrego este item al carrito ", this.innerText);
}
botones.forEach(boton => {
	boton.addEventListener("click", cuandoSeHaceClick);
});