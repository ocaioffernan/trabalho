
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
    