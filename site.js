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

    // Música de fondo
    const music = document.getElementById("bgMusic");
    const toggleBtn = document.getElementById("musicToggle");
    let isPlaying = false;

    if (enterBtn && curtain) {
        enterBtn.addEventListener("click", () => {

            // 🔊 Sonido cortina
            if (sound) {
                sound.currentTime = 0;
                sound.play().catch(() => {});
            }

            // ✨ Animación fade
            curtain.style.opacity = "0";
            curtain.style.transition = "opacity 1s ease";

            setTimeout(() => {
                curtain.style.display = "none";
                document.body.style.overflow = "auto";
            }, 1000);

            // 🔊 Música de fondo al abrir cortina
            if (music && !isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    toggleBtn.classList.add("active");
                }).catch(err => console.warn("Autoplay bloqueado:", err));
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

        if (d <= 3) {
            document.querySelectorAll(".time-box").forEach(box => box.classList.add("urgent"));
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

    /* ===== SLIDERS ===== */
    document.querySelectorAll("[data-slider]").forEach(slider => {

        let index = 0;
        const images = slider.querySelectorAll("img");

        const sliderContainer = slider.closest(".iphone-screen");
        const prev = sliderContainer.querySelector(".prev");
        const next = sliderContainer.querySelector(".next");

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

        // Swipe móvil
        let startX = 0;
        slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        slider.addEventListener("touchend", e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) next.click();
            if (endX - startX > 50) prev.click();
        });

    });

    /* ===== DIVIDERS ANIMATION ===== */
    const dividers = document.querySelectorAll(".title-divider, .mini-title-divider");
    const dividerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active-divider");
            }
        });
    }, { threshold: 0.4 });
    dividers.forEach(div => dividerObserver.observe(div));

    /* ===== MUSIC TOGGLE ===== */
    toggleBtn.addEventListener("click", () => {
        if (isPlaying) {
            music.pause();
            toggleBtn.classList.remove("active");
        } else {
            music.play().catch(err => console.warn("Autoplay bloqueado:", err));
            toggleBtn.classList.add("active");
        }
        isPlaying = !isPlaying;
    });

    /* ===== AUTO-PLAY ADICIONAL PARA PRIMER INTERACTUACIÓN ===== */
    function firstInteraction() {
        if (!isPlaying) {
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
