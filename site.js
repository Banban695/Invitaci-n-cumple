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

    /* ===== SLIDERS IPHONE ===== */
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

        // Swipe móvil
        let startX = 0;
        slider.addEventListener("touchstart", e => startX = e.touches[0].clientX);
        slider.addEventListener("touchend", e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) next.click();
            if (endX - startX > 50) prev.click();
        });

    });

    /* ===== DIVIDER ANIMATION ===== */
    const dividers = document.querySelectorAll(".title-divider, .mini-title-divider");

    const dividerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active-divider");
            }
        });
    }, { threshold: 0.4 });

    dividers.forEach(div => dividerObserver.observe(div));

    /* ===== CORTINA Y MÚSICA ===== */
    const enterBtn = document.getElementById("enterBtn");
    const introCurtain = document.getElementById("introCurtain");
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (enterBtn && introCurtain) {
        enterBtn.addEventListener("click", () => {

            // ✨ Animación fade de la cortina
            const blur = introCurtain.querySelector(".intro-blur");
            blur.classList.add("hide");

            blur.addEventListener("transitionend", () => {
                introCurtain.style.display = "none";
                document.body.style.overflow = "auto";

                // 🎶 Reproducir música de fondo
                bgMusic.play().then(() => {
                    musicToggle.classList.add("active");
                }).catch(e => {
                    console.log("Música bloqueada hasta que el usuario haga clic:", e);
                });

            }, { once: true });

        });
    }

    // Botón para alternar música
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => musicToggle.classList.add("active"))
                .catch(e => console.log("Música bloqueada:", e));
        } else {
            bgMusic.pause();
            musicToggle.classList.remove("active");
        }
    }

    musicToggle.addEventListener("click", toggleMusic);

});
