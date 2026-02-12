podrias darme el js corrgido: document.addEventListener("DOMContentLoaded", () => {

    const enterBtn = document.getElementById("enterBtn");
    const curtain = document.getElementById("introCurtain");
    const sound = document.getElementById("curtainSound"); // efecto cortina
    const music = document.getElementById("bgMusic");       // música de fondo
    const toggleBtn = document.getElementById("musicToggle");
    let isPlaying = false;

    // Abrir cortina y reproducir música
    if (enterBtn && curtain) {
        enterBtn.addEventListener("click", () => {

            // 🔊 Sonido cortina
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {});
            }

            // ✨ Animación fade cortina
            curtain.style.opacity = "0";
            curtain.style.transition = "opacity 1s ease";
            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);

            // 🔊 Reproducir música de fondo
            if (music && !isPlaying) {
                music.currentTime = 0; // asegurarnos que empieza desde el inicio
                music.play().then(() => {
                    isPlaying = true;
                    toggleBtn.classList.add("active");
                }).catch(err => console.warn("Autoplay bloqueado:", err));
            }

        });
    }

    // Toggle manual de música
    toggleBtn.addEventListener("click", () => {
        if (!music) return;

        if (isPlaying) {
            music.pause();
            toggleBtn.classList.remove("active");
        } else {
            music.play().then(() => {
                toggleBtn.classList.add("active");
            }).catch(err => console.warn("Autoplay bloqueado:", err));
        }
        isPlaying = !isPlaying;
    });

    // Reproducir música si el usuario interactúa antes del click (click/touch/scroll)
    function firstInteraction() {
        if (music && !isPlaying) {
            music.currentTime = 0;
            music.play().then(() => {
                isPlaying = true;
                toggleBtn.classList.add("active");
            }).catch(err => console.warn("Autoplay bloqueado:", err));
        }
        document.removeEventListener("click", firstInteraction);
        document.removeEventListener("touchstart", firstInteraction);
        document.removeEventListener("scroll", firstInteraction);
    }

    document.addEventListener("click", firstInteraction);
    document.addEventListener("touchstart", firstInteraction);
    document.addEventListener("scroll", firstInteraction);

});
