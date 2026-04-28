// Función para abrir la carta inicial
function openLetter() {
    const envelope = document.getElementById('envelope-layer');
    envelope.classList.add('opened');
}

// Función para que el botón NO huya
function moveNoButton() {
    const btn = document.getElementById('no-btn');
    
    // Generar posiciones aleatorias dentro del cuadro principal
    const newX = Math.random() * (300 - 50) + 10;
    const newY = Math.random() * (200 - 50) + 10;
    
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
}

// Función para mostrar la carta final al presionar SÍ
function showFinal() {
    const finalLetter = document.getElementById('final-letter');
    finalLetter.style.display = 'block';
}