function openLetter() {
    const envelope = document.getElementById('envelope-layer');
    envelope.classList.add('opened');
}

function moveNoButton() {
    const btn = document.getElementById('no-btn');
    
    // Generar posiciones aleatorias para que el botón "huya"
    // Los números limitan el movimiento dentro del cuadro principal
    const newX = Math.random() * (300 - 50) + 10;
    const newY = Math.random() * (200 - 50) + 10;
    
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
}

function showFinal() {
    const finalLetter = document.getElementById('final-letter');
    finalLetter.style.display = 'block';
}