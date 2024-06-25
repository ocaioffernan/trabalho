document.querySelector('.toggle-sidebar').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    const toggleButton = document.querySelector('.toggle-sidebar');

    if (sidebar.style.left === '-250px') {
        sidebar.style.left = '0';
        container.style.marginLeft = '250px';
        toggleButton.style.left = '250px';
        toggleButton.innerHTML = '&lt;';
    } else {
        sidebar.style.left = '-250px';
        container.style.marginLeft = '0px';
        toggleButton.style.left = '0';
        toggleButton.innerHTML = '&gt;';
    }
});

// Função para alternar a visibilidade do sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-sidebar');
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('visible');
        toggleBtn.textContent = '❮';
        toggleBtn.classList.remove('collapsed');
    } else {
        sidebar.classList.remove('visible');
        sidebar.classList.add('hidden');
        toggleBtn.textContent = '❯';
        toggleBtn.classList.add('collapsed');
    }
}

// Função para filtrar vendas por método de pagamento
function filterSales(paymentMethod) {
    const sales = document.querySelectorAll('.sales-table tbody tr');
    sales.forEach(sale => {
        const paymentType = sale.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (paymentMethod === 'todos' || paymentType.includes(paymentMethod)) {
            sale.style.display = '';
        } else {
            sale.style.display = 'none';
        }
    });
    updateTotalAmount();
}

// Função para filtrar vendas por data
function filterSalesByDate() {
    const selectedDate = new Date(document.getElementById('date-filter').value);
    const sales = document.querySelectorAll('.sales-table tbody tr');
    sales.forEach(sale => {
        const saleDate = new Date(sale.querySelector('td:nth-child(2)').textContent);
        if (selectedDate.toDateString() === saleDate.toDateString()) {
            sale.style.display = '';
        } else {
            sale.style.display = 'none';
        }
    });
    updateTotalAmount();
}

// Função para gerar PDF (ainda não implementada)
function generatePDF() {
    alert('Função para gerar PDF não implementada ainda.');
}

// Função para atualizar o total de vendas exibido
function updateTotalAmount() {
    let totalAmount = 0;
    const sales = document.querySelectorAll('.sales-table tbody tr');
    sales.forEach(sale => {
        if (sale.style.display !== 'none') {
            totalAmount += parseFloat(sale.querySelector('td:nth-child(4)').textContent.replace('R$', '').replace(',', '.'));
        }
    });
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

// Exemplo de carrinho de compras
const cartItems = [];
const cartTableBody = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

function addToCart(productName, productPrice) {
    cartItems.push({ name: productName, price: productPrice });
    updateCart();
}

function updateCart() {
    cartTableBody.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;

        const priceCell = document.createElement('td');
        priceCell.textContent = `R$ ${item.price.toFixed(2)}`;

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(index);
        removeCell.appendChild(removeButton);

        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(removeCell);

        cartTableBody.appendChild(row);

        totalPrice += item.price;
    });

    totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function checkout() {
    const paymentMethod = document.getElementById('payment-method').value;
    const totalPrice = parseFloat(totalPriceElement.textContent.replace('R$', '').replace(',', '.'));

    if (isNaN(totalPrice) || totalPrice <= 0) {
        alert('Não foi possível realizar a compra. Nenhum valor especificado.');
    } else {
        alert(`Compra finalizada com ${paymentMethod}. Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`);
        cartItems.length = 0; // Limpa o carrinho
        updateCart();
    }
}

// Função para exibir formulários com base no botão do menu clicado
function showFormulario(id) {
    const formulario = document.getElementById(id);
    formulario.style.display = "block";
}

// Função para fechar formulários
function closeFormulario(id) {
    const formulario = document.getElementById(id);
    formulario.style.display = "none";
}


