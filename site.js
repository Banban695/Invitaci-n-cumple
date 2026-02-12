// ELEMENTOS
const enterBtn = document.getElementById('enterBtn');
const introCurtain = document.getElementById('introCurtain');
const curtainSound = document.getElementById('curtainSound');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// ==== PREPARAR MÚSICA ====
// Silenciar inicialmente para permitir autoplay en algunos navegadores
bgMusic.muted = true;
bgMusic.loop = true;
bgMusic.play().catch(() => {
    console.log("Autoplay bloqueado, esperando interacción del usuario...");
});

// ==== BOTÓN ENTRAR ====
enterBtn.addEventListener('click', () => {
    // Reproducir sonido de cortina
    curtainSound.currentTime = 0;
    curtainSound.play().catch(err => console.log('Cortina bloqueada', err));

    // Mostrar animación de desaparición de cortina
    introCurtain.classList.add('hide');

    // Desmutear y reproducir música de fondo
    bgMusic.muted = false;
    bgMusic.play().catch(err => console.log('Música bloqueada', err));
});

// ==== BOTÓN DE MÚSICA ====
// Pausar o reproducir manualmente
musicToggle.addEventListener('click', () => {
    if(bgMusic.paused){
        bgMusic.play().catch(err => console.log('Error al reproducir', err));
        musicToggle.classList.add('active');
    } else {
        bgMusic.pause();
        musicToggle.classList.remove('active');
    }
});

// ==== SLIDERS ====
// Funcionalidad de los iPhones
const sliders = document.querySelectorAll('[data-slider]');

sliders.forEach(slider => {
    const prev = slider.parentElement.querySelector('.prev');
    const next = slider.parentElement.querySelector('.next');
    let index = 0;

    function showSlide(i){
        const total = slider.children.length;
        index = (i + total) % total; // ciclar
        slider.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', () => showSlide(index - 1));
    next.addEventListener('click', () => showSlide(index + 1));
});

// ==== COUNTDOWN ====
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const targetDate = new Date('March 7, 2026 16:00:00').getTime();

function updateCountdown(){
    const now = new Date().getTime();
    const diff = targetDate - now;

    if(diff <= 0){
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
    const minutes = Math.floor((diff % (1000*60*60)) / (1000*60));
    const seconds = Math.floor((diff % (1000*60)) / 1000);

    daysEl.textContent = String(days).padStart(2,'0');
    hoursEl.textContent = String(hours).padStart(2,'0');
    minutesEl.textContent = String(minutes).padStart(2,'0');
    secondsEl.textContent = String(seconds).padStart(2,'0');
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
