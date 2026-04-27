const btnNo = document.querySelector("#btnNo");
const btnSi = document.querySelector("#btnSi");

// Función para mover el botón NO a una posición aleatoria
btnNo.addEventListener("mouseover", function() {
    const x = Math.random() * (window.innerWidth - btnNo.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnNo.offsetHeight);
    
    btnNo.style.left = x + "px";
    btnNo.style.top = y + "px";
});

// Lo que pasa cuando por fin le da al SÍ
btnSi.addEventListener("click", function() {
    alert("¡Sabía que dirías que sí! ❤️ Nos vemos pronto.");
    // Opcional: Redirigir a un video o mensaje especial
    // window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; 
});