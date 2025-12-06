function mostrarTabla() {
    const numero = parseInt(document.getElementById('numero').value);
    const veces = parseInt(document.getElementById('veces').value);
    if (veces > 20) {
        alert('El número máximo de multiplicaciones es 20');
        return;
    }
    const tablaBody = document.getElementById('tablaBody');
    tablaBody.innerHTML = '';
    for (let i = 1; i <= veces; i++) {
        const resultado = numero * i;
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${numero}</td>
            <td>${i}</td>
            <td>${resultado}</td>
        `;
        
        tablaBody.appendChild(fila);
    }
    const resultSection = document.getElementById('resultSection');
    resultSection.classList.add('show');
    resultSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        mostrarTabla();
    }
});
window.onload = function() {
    mostrarTabla();
};

document.getElementById('numero').addEventListener('input', function(e) {
    if (e.target.value > 100) {
        e.target.value = 100;
    }
});

document.getElementById('veces').addEventListener('input', function(e) {
    if (e.target.value > 20) {
        e.target.value = 20;
    }
});