// ==============================
// ELEMENTOS PRINCIPALES
// ==============================
const enterBtn = document.getElementById("enterBtn");
const introCurtain = document.getElementById("introCurtain");
const curtainSound = document.getElementById("curtainSound");
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// ==============================
// FUNCION CORTINA
// ==============================
enterBtn.addEventListener("click", () => {
    // Reproducir sonido de cortina si existe
    if (curtainSound) {
        curtainSound.currentTime = 0;
        curtainSound.play().catch(e => console.log("Sonido cortina bloqueado:", e));
    }

    // Ocultar cortina
    const blur = introCurtain.querySelector(".intro-blur");
    blur.classList.add("hide");

    // Después de la transición, eliminar del DOM para mejorar performance
    setTimeout(() => {
        introCurtain.style.display = "none";
    }, 1000);

    // Reproducir música de fondo
    if (bgMusic) {
        bgMusic.play().catch(e => console.log("Música bloqueada hasta interacción:", e));
        musicToggle.classList.add("active"); // Animación del botón
    }
});

// ==============================
// BOTÓN PAUSA / PLAY MÚSICA
// ==============================
musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.classList.add("active");
    } else {
        bgMusic.pause();
        musicToggle.classList.remove("active");
    }
});

// ==============================
// COUNTDOWN
// ==============================
const countdownDate = new Date("March 7, 2026 16:00:00").getTime();
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ==============================
// SLIDERS IPHONE
// ==============================
document.querySelectorAll(".iphone-card").forEach(card => {
    const slider = card.querySelector(".slider");
    const prevBtn = card.querySelector(".prev");
    const nextBtn = card.querySelector(".next");
    let index = 0;

    const slides = slider.querySelectorAll("img");

    function updateSlider() {
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        updateSlider();
    });
});

// ==============================
// ANIMACION FADE AL SCROLL
// ==============================
const faders = document.querySelectorAll(".fade-section");

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});
