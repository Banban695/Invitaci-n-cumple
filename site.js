document.addEventListener("DOMContentLoaded", () => {

    /* ===== ELEMENTOS ===== */

    const enterBtn = document.getElementById("enterBtn");
    const curtain = document.getElementById("introCurtain");
    const curtainSound = document.getElementById("curtainSound");
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    let musicStarted = false;


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


    /* ===== CORTINA + MUSICA ===== */

    if (enterBtn && curtain) {

        enterBtn.addEventListener("click", () => {

            // 🔊 Sonido cortina
            if (curtainSound) {
                curtainSound.currentTime = 0;
                curtainSound.play().catch(() => {});
            }

            // ✨ Animación cortina
            curtain.style.opacity = "0";
            curtain.style.transition = "opacity 1s ease";

            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);


            // 🎵 Música fondo (solo una vez)
            if (!musicStarted && bgMusic) {

                bgMusic.currentTime = 0;

                bgMusic.play()
                    .then(() => {
                        musicStarted = true;
                        musicToggle.classList.add("active");
                    })
                    .catch(err => {
                        console.log("Autoplay bloqueado:", err);
                    });

            }

        });

    }


    /* ===== BOTON MUSICA ===== */

    if (musicToggle && bgMusic) {

        musicToggle.addEventListener("click", () => {

            if (bgMusic.paused) {

                bgMusic.play()
                    .then(() => {
                        musicToggle.classList.add("active");
                    });

            } else {

                bgMusic.pause();
                musicToggle.classList.remove("active");

            }

        });

    }


    /* ===== COUNTDOWN ===== */

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

    }

    function animateNumber(id, value) {

        const el = document.getElementById(id);

        if (!el) return;

        const formatted = String(value).padStart(2, "0");

        if (el.textContent !== formatted) {

            el.classList.add("flip");

            setTimeout(() => {
                el.textContent = formatted;
                el.classList.remove("flip");
            }, 200);

        }

    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

});


/* ===== SLIDERS ===== */

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

});
