document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Produto 1', price: 100, image: 'https://via.placeholder.com/200' },
        { id: 2, name: 'Produto 2', price: 200, image: 'https://via.placeholder.com/200' },
        { id: 3, name: 'Produto 3', price: 300, image: 'https://via.placeholder.com/200' },
    ];

    const productsContainer = document.getElementById('products-container');
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart');
    let cart = [];

    function displayProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Preço: R$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        cart.push(product);
        displayCart();
    };

    function displayCart() {
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
        } else {
            emptyCartMessage.style.display = 'none';
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Preço: R$${item.price.toFixed(2)}</p>
                `;
                cartContainer.appendChild(cartItemDiv);
            });
        }
    }

    displayProducts();
});



// Aparecer formularios com base no botão no menu clicado
function showFormulario(id) {
    const formulario = document.getElementById(id);
    formulario.style.display = "block";
}

//Fechar forms
function closeFormulario(id) {
    const formulario = document.getElementById(id);
    formulario.style.display = "none";
}


