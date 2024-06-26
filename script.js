document.querySelector('.toggle-sidebar').addEventListener('click', function() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    const toggleButton = document.querySelector('.toggle-sidebar');

    if (sidebar.style.left === '-250px' || sidebar.style.left === '') {
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
function addToCart(product, price) {
    const cartItems = document.getElementById('cart-items');
    const rows = cartItems.getElementsByTagName('tr');

    // Verifica se o produto já está no carrinho
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (row.cells[0].innerText === product) {
            // Se o produto já está no carrinho, incrementa a quantidade
            let quantity = parseInt(row.cells[2].innerText);
            row.cells[2].innerText = quantity + 1;

            // Atualiza o total
            updateTotal(price);
            return; // Encerra a função
        }
    }

    // Se o produto não está no carrinho, adiciona uma nova linha
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${product}</td>
        <td>R$${price.toFixed(2)}</td>
        <td>1</td>
        <td><button onclick="removeFromCart(this)"><i class="fa-regular fa-trash-can"></i></button></td>
    `;
    cartItems.appendChild(newRow);

    // Atualiza o total
    updateTotal(price);
}

function updateTotal(price) {
    const totalElement = document.getElementById('total');
    const currentTotal = parseFloat(totalElement.innerText.replace('R$', '').replace(',', '.'));
    const newTotal = currentTotal + price;
    totalElement.innerText = `R$ ${newTotal.toFixed(2).replace('.', ',')}`;
}

function removeFromCart(button) {
    const row = button.parentNode.parentNode;
    const price = parseFloat(row.cells[1].innerText.substring(2).replace(',', '.')); // Extrai o preço do texto
    const quantity = parseInt(row.cells[2].innerText);

    if (quantity > 1) {
        // Se a quantidade for maior que 1, decrementa a quantidade
        row.cells[2].innerText = quantity - 1;
    } else {
        // Se a quantidade for 1, remove a linha do carrinho
        row.parentNode.removeChild(row);
    }

    // Atualiza o total
    updateTotal(-price);
}

function checkout() {
    const paymentMethod = document.getElementById('payment-method').value;
    const totalPriceElement = document.getElementById('total');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = parseFloat(totalPriceElement.textContent.replace('R$', '').replace(',', '.'));

    if (isNaN(totalPrice) || totalPrice <= 0) {
        alert('Não foi possível realizar a compra. Nenhum valor especificado.');
    } else {
        alert(`Compra finalizada com ${paymentMethod}. Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`);
        cartItems.innerHTML = ''; // Limpa o carrinho
        totalPriceElement.textContent = 'R$ 0,00'; // Reseta o total
    }
}
