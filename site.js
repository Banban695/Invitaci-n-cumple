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



    /* ===== ELEMENTOS PRINCIPALES ===== */

    const enterBtn = document.getElementById("enterBtn");
    const curtain = document.getElementById("introCurtain");
    const curtainSound = document.getElementById("curtainSound");

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");



    /* ===== CORTINA + MÚSICA ===== */

    if (enterBtn && curtain) {

        enterBtn.addEventListener("click", () => {

            // 🔊 Sonido cortina
            if (curtainSound) {
                curtainSound.currentTime = 0;
                curtainSound.play().catch(() => {});
            }

            // 🎵 Música fondo
            if (bgMusic) {
                bgMusic.play().then(() => {
                    musicToggle?.classList.add("active");
                }).catch(e => console.log("Autoplay bloqueado:", e));
            }

            // ✨ Animación cortina
            curtain.style.opacity = "0";
            curtain.style.transition = "opacity 1s ease";

            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);

        });

    }



    /* ===== BOTÓN DE MÚSICA ===== */

    function toggleMusic() {
        if (!bgMusic) return;

        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle?.classList.add("active");
        } else {
            bgMusic.pause();
            musicToggle?.classList.remove("active");
        }
    }

    musicToggle?.addEventListener("click", toggleMusic);



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

        if (d <= 3) {
            document.querySelectorAll(".time-box")
                .forEach(box => box.classList.add("urgent"));
        }
    }

    function animateNumber(id, newValue) {

        const el = document.getElementById(id);
        if (!el) return;

        if (el.textContent !== String(newValue).padStart(2, "0")) {

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



/* ===== SLIDER ===== */

document.querySelectorAll("[data-slider]").forEach(slider => {

    let index = 0;
    const images = slider.querySelectorAll("img");

    const prev = slider.parentElement.querySelector(".prev");
    const next = slider.parentElement.querySelector(".next");

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    next?.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateSlider();
    });

    prev?.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        updateSlider();
    });

    let startX = 0;

    slider.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;

        if (startX - endX > 50) next?.click();
        if (endX - startX > 50) prev?.click();
    });

});



/* ===== DIVIDERS ===== */

const dividers = document.querySelectorAll(".title-divider, .mini-title-divider");

const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active-divider");
        }
    });
}, { threshold: 0.4 });

dividers.forEach(div => dividerObserver.observe(div));
