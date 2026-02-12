document.addEventListener("DOMContentLoaded", () => {
    const enterBtn = document.getElementById("enterBtn");
    const curtain = document.getElementById("introCurtain");
    const sound = document.getElementById("curtainSound"); // Efecto cortina
    const music = document.getElementById("bgMusic");      // Música de fondo
    const toggleBtn = document.getElementById("musicToggle");
    let isPlaying = false;

    // Pre-carga los audios para que estén listos al hacer clic
    if (music) music.load();
    if (sound) sound.load();

    // Lógica principal: Al hacer clic en el botón de entrada
    if (enterBtn && curtain) {
        enterBtn.addEventListener("click", () => {
            
            // 1. REPRODUCIR MÚSICA (Prioridad máxima para el navegador)
            if (music && !isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    if (toggleBtn) toggleBtn.classList.add("active");
                    console.log("Música iniciada correctamente");
                }).catch(err => {
                    console.warn("Error en reproducción:", err);
                });
            }

            // 2. SONIDO DE CORTINA
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {}); 
            }

            // 3. ANIMACIÓN DE LA CORTINA
            curtain.style.transition = "opacity 1s ease";
            curtain.style.opacity = "0";
            
            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);
        });
    }

    // Botón de control manual (Play/Pause)
    if (toggleBtn) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita conflictos con otros clics
            if (!music) return;

            if (isPlaying) {
                music.pause();
                toggleBtn.classList.remove("active");
            } else {
                music.play().then(() => {
                    toggleBtn.classList.add("active");
                }).catch(err => console.warn("Bloqueo manual:", err));
            }
            isPlaying = !isPlaying;
        });
    }
});
