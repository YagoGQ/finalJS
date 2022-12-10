let contenidoCarrito = document.querySelector('.productos');
let contenidoCompras = document.querySelector('.card-items');
let precioTotal = document.querySelector('.precio-total')
let contadorProducto = document.querySelector('.contador-producto');


let compras = [];
let totalCarrito = 0;
let contador = 0;

const buscarTodosProductos = async() => {
   const productosFetch = await fetch(`productos.json`)
   const productosJson = await productosFetch.json(``)
    productosJson.forEach((prod) =>{
        const {id, description, image, price, title} =
        divCard.innerHTML += `
        <div class="card" style"width: 18rem;">
            <img src="${image}" class="card-img-top" alt="no se puede visualizar la imagen">
            <div class="card-body">
                <h5>${title}</h5>
                <p class="card-text">${description}</p>
                <p>${price}</p>
                <button id=${id} class="btn btn-primary">AGREGAR</button>
            </div>
        </div>
        `
    })
}
buscarTodosProductos();

listas();
function listas(){
    contenidoCarrito.addEventListener('click', agregarProducto);

    contenidoCompras.addEventListener('click', eliminarProducto);
}

function agregarProducto(evento){
    evento.preventDefault();
    if (evento.target.classList.contains('btn-adherir')) {
        const selectProduct = evento.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings.forEach(value => {
            if (value.id == deleteId) {
                let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
                totalCard =  totalCard - priceReduce;
                totalCard = totalCard.toFixed(2);
            }
        });
        buyThings = buyThings.filter(product => product.id !== deleteId);
        
        countProduct--;
    }
    //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
    if (buyThings.length === 0) {
        priceTotal.innerHTML = 0;
        amountProduct.innerHTML = 0;
    }
    loadHtml();
}

function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);

    const exist = buyThings.some(product => product.id === infoProduct.id);
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++;
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];
    } else {
        buyThings = [...buyThings, infoProduct]
        countProduct++;
    }
    loadHtml();
    //console.log(infoProduct);
}

function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, cantidad, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="la imagen no se puede visualizar">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Amount: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;

        containerBuyCart.appendChild(row);

        priceTotal.innerHTML = totalCard;

        amountProduct.innerHTML = countProduct;
    });
}

function clearHtml(){
    containerBuyCart.innerHTML = '';
}