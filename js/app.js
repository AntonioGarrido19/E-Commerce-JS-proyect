//   const productos = [
//      { id: 1, nombre: "corner 650", precio: 750, img: "./assets/corner650.jpg" },
//      { id: 2, nombre: "classic 500 rojo italiano", precio: 900, img: "./assets/estufa-a-lena-amesti-classic-500-rojo-italiano.jpg" },     { id: 3, nombre: "rondo 440", precio: 700, img: "./assets/rondo-440.jpg" },
//      { id: 4, nombre: "cubic 380", precio: 900, img: "./assets/amesti-cubic380.jpg" },
//   ]

const productos = [];
console.log(productos);

const respuesta = async () => {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    data.forEach(element => {
        productos.push(element);
    })
    crearHtml(data);
}
respuesta();


let contenedorCarrito = document.getElementById('carrito__contenedor');

let contenedorProductos = document.getElementById('contenedor-productos');

let botonVaciar = document.getElementById('vaciar__carrito');

let precioTotal = document.getElementById('precioTotal');

let botonContacto = document.getElementById('contacto');

let mensajeDeEnviado = document.getElementById('mensaje');

let buscadorProductos = document.getElementById('buscador');

let finalizarCompra = document.getElementById('botonCompra');

let precioFinal = document.getElementById('total__a__pagar');

let amesti = document.getElementById('inicio');

let botonPagarModal = document.getElementById('ir__a__pagar');

let nosotros = document.getElementById('target1');

let nuestrosProductos = document.getElementById('target2');

let tiendaOnline = document.getElementById('target3');

let pagar = document.getElementById('target4');

let contacto = document.getElementById('target5');

let mail = document.getElementById('e-mail');

let pago = document.getElementById('pagar');

let contadorProductos = document.getElementById('contador');

let pagarModal = document.getElementById('target4');

let modalOut = document.getElementById('boton__modal')

let carrito = [];


let llevameModal = function () {
    var llevame = pagarModal;
    llevame.scrollIntoView({ behavior: 'smooth' });
}

function scrollAmesti() {
    var llevame = amesti;
    llevame.scrollIntoView({ behavior: 'smooth' });
}

function scrollNosotros() {
    var llevame = nosotros;
    llevame.scrollIntoView({ behavior: 'smooth' });
}


function scrollNuestrosProductos() {
     var llevame = nuestrosProductos; 
     llevame.scrollIntoView({ behavior: 'smooth' }); 
    }


function scrollTiendaOnline() { 
    var llevame = tiendaOnline; 
    llevame.scrollIntoView({ behavior: 'smooth' }); 
}

function scrollPagar() {
    var llevame = pagar; 
    llevame.scrollIntoView({ behavior: 'smooth' });
}

function scrollContacto() { 
    var llevame = contacto; 
    llevame.scrollIntoView({ behavior: 'smooth' }); 
}


botonContacto.addEventListener('click', mensajecontacto => {
    if(mail.value == ""){
        Swal.fire('Debe ingresar un correo electrónico')
    } else {
    Swal.fire('Gracias por contactarte con nosotros, te responderemos a la brevedad.')
}
})

finalizarCompra.addEventListener('click', mensajecompra => {
    if(pago.value == ""){
    Swal.fire('Debe ingresar un número de tarjeta válido.')
}else if (carrito == "") {
    Swal.fire('Debe tener algún producto en el carrito.')
} else {
    Swal.fire('El pago se ah realizado con éxito.')
    localStorage.removeItem('carrito');
    carrito.length = 0
    actualizarCarrito();
}
})

function filtrarPorNombre(arr, filtro) {
    return arr.filter(el => {
        return el.nombre.toLowerCase().includes(filtro)
    })
}

buscadorProductos.addEventListener('input', () => {
    let nuevoFiltro = filtrarPorNombre(productos, buscadorProductos.value)

    contenedorProductos.innerHTML = "";
    crearHtml(nuevoFiltro);
    console.log(nuevoFiltro);
})


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.removeItem('carrito');
    actualizarCarrito();
})

function crearHtml(arr) {
    arr.forEach((producto) => {
        let div = document.createElement('div')
        div.classList.add('masvendidos__container--productos1')
        div.innerHTML = `
    <img src=${producto.img} alt="">
    <h4>${producto.nombre}</h4>
    <p> Valor en USD: $${producto.precio}</p>
    <button id="agregar${producto.id}">Agregar al carrito</button>
    `

        contenedorProductos.appendChild(div)

        let button = document.getElementById(`agregar${producto.id}`)

        button.addEventListener('click', () => {
            agregar(producto.id)
            Toastify({
                text: "Producto agregado con éxito",
                offset: {
                    x: 1000, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 40 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
            }).showToast();
        })
    });


}

// crearHtml(productos);


let agregar = (prodId) => {
    let item = productos.find((prod) => prod.id === prodId)
    carrito.push(item)
    actualizarCarrito()
    console.log(carrito)
}

let eliminarDelCarrito = (prodId) => {
    let item = carrito.find((prod) => prod.id === prodId)
    let indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

let actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        let div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <img src=${prod.img} alt="">
        <p>${prod.nombre}, precio: $${prod.precio}</p>
        <button onclick = "eliminarDelCarrito(${prod.id})">Eliminar del carrito</button>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)

    contadorProductos.innerText = carrito.length

    precioFinal.innerText = `Valor en USD: $${carrito.reduce((acc, prod) => acc + prod.precio, 0)}`
}


const hamburguer = document.querySelector (".ham");
const navMenu = document.querySelector (".enlaces__nav__container");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav__a").forEach(n => n.addEventListener("click", () => {
    hamburguer.classList.remove("active")
    navMenu.classList.remove("active")
}))


 function cerrarModal () {
    modalOut.checked = false;
 }

botonPagarModal.addEventListener('click', mensajepago => {
    if(carrito == ""){
    Swal.fire('Debe tener algún producto en el carrito.')
}else llevameModal()
})



botonPagarModal.addEventListener('click', cierro => {
    if(carrito != ""){
        cerrarModal()
    }else console.log("no tiene productos")
})

