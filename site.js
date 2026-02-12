// =========================
// ELEMENTOS PRINCIPALES
// =========================
const enterBtn = document.getElementById('enterBtn');
const introCurtain = document.getElementById('introCurtain');
const curtainSound = document.getElementById('curtainSound');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

const countdown = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

// =========================
// FUNCIONES DE REPRODUCCIÓN MÚSICA
// =========================
let musicStarted = false;

function startMusic(){
    if(!musicStarted){
        bgMusic.play().catch(err => console.log('Autoplay bloqueado', err));
        musicStarted = true;
        musicBtn.classList.add('active');
    }
}

// Escucha el primer clic o scroll para activar música
function initMusicEvent(e){
    startMusic();
    window.removeEventListener('click', initMusicEvent);
    window.removeEventListener('scroll', initMusicEvent);
}

window.addEventListener('click', initMusicEvent, {once:true});
window.addEventListener('scroll', initMusicEvent, {once:true});

// =========================
// CORTINA DE ENTRADA
// =========================
enterBtn.addEventListener('click', () => {
    introCurtain.classList.add('hide');

    curtainSound.play().catch(err => console.log('Cortina sonido bloqueado', err));
});

// =========================
// BOTÓN MÚSICA
// =========================
musicBtn.addEventListener('click', () => {
    if(bgMusic.paused){
        bgMusic.play();
        musicBtn.classList.add('active');
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('active');
    }
});

// =========================
// COUNTDOWN
// =========================
const targetDate = new Date('March 7, 2026 16:00:00').getTime();

function updateCountdown(){
    const now = new Date().getTime();
    const distance = targetDate - now;

    if(distance < 0){
        countdown.days.textContent = '00';
        countdown.hours.textContent = '00';
        countdown.minutes.textContent = '00';
        countdown.seconds.textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.days.textContent = String(days).padStart(2,'0');
    countdown.hours.textContent = String(hours).padStart(2,'0');
    countdown.minutes.textContent = String(minutes).padStart(2,'0');
    countdown.seconds.textContent = String(seconds).padStart(2,'0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// =========================
// SLIDER IPHONE
// =========================
const sliders = document.querySelectorAll('[data-slider]');

sliders.forEach(slider => {
    let index = 0;
    const images = slider.querySelectorAll('img');
    const prevBtn = slider.parentElement.querySelector('.prev');
    const nextBtn = slider.parentElement.querySelector('.next');

    function showSlide(i){
        slider.style.transform = `translateX(${-i * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        showSlide(index);
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        showSlide(index);
    });

    showSlide(index);
});

// =========================
// FADE AL SCROLL
// =========================
const faders = document.querySelectorAll('.fade-section');

function checkFade(){
    const triggerBottom = window.innerHeight * 0.85;

    faders.forEach(fader => {
        const faderTop = fader.getBoundingClientRect().top;
        if(faderTop < triggerBottom){
            fader.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('load', checkFade);
