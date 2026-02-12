document.addEventListener("DOMContentLoaded", () => {

    /* ===== FADE SECTIONS ===== */

    const sections = document.querySelectorAll(".fade-section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));


    /* ===== CORTINA ===== */

    const enterBtn = document.getElementById("enterBtn");
    const curtain = document.getElementById("introCurtain");
    const sound = document.getElementById("curtainSound");

    if (enterBtn && curtain) {

        enterBtn.addEventListener("click", () => {

            // 🔊 Sonido
            //if (sound) {
              //  sound.currentTime = 0;
                //sound.play().catch(() => { });
            //}

            // ✨ Animación fade
            curtain.style.opacity = "0";
            curtain.style.transition = "opacity 1s ease";

            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);

        });

    }

    const eventDate = new Date("March 07, 2026 16:00:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();
        const distance = eventDate - now;

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        animateNumber("days", d);
        animateNumber("hours", h);
        animateNumber("minutes", m);
        animateNumber("seconds", s);

        /* Glow cuando faltan menos de 3 días */

        if (d <= 3) {
            document.querySelectorAll(".time-box")
                .forEach(box => box.classList.add("urgent"));
        }

    }

    function animateNumber(id, newValue) {

        const el = document.getElementById(id);

        if (el.textContent != String(newValue).padStart(2, "0")) {

            el.classList.add("flip");

            setTimeout(() => {
                el.textContent = String(newValue).padStart(2, "0");
                el.classList.remove("flip");
            }, 200);

        }

    }

    setInterval(updateCountdown, 1000);
    updateCountdown();


});
document.querySelectorAll("[data-slider]").forEach(slider => {

    let index = 0;
    const images = slider.querySelectorAll("img");

    const prev = slider.parentElement.querySelector(".prev");
    const next = slider.parentElement.querySelector(".next");

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateSlider();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateSlider();
    });

    /* Swipe móvil */
    let startX = 0;

    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) next.click();
        if (endX - startX > 50) prev.click();
    });

});
const dividers = document.querySelectorAll(
    ".title-divider, .mini-title-divider"
);

const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active-divider");
        }
    });
}, {
    threshold: 0.4
});

dividers.forEach(div => dividerObserver.observe(div));

// Botón de música
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

// Función para alternar música
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log("Música bloqueada:", e));
        musicToggle.classList.add("active");
    } else {
        bgMusic.pause();
        musicToggle.classList.remove("active");
    }
}

// Evento clic en el botón de música
musicToggle.addEventListener("click", toggleMusic);

// 🎉 Reproducir música al entrar después de la cortina
enterBtn.addEventListener("click", () => {
    const blur = introCurtain.querySelector(".intro-blur");
    blur.classList.add("hide");

    blur.addEventListener("transitionend", () => {
        introCurtain.style.display = "none";
        
        // Esto asegura que el audio se reproduzca tras la interacción
        bgMusic.play().then(() => {
            musicToggle.classList.add("active");
        }).catch(e => {
            console.log("Música bloqueada hasta que el usuario haga clic:", e);
        });
    }, { once: true });
});
