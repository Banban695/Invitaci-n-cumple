document.addEventListener('DOMContentLoaded', () => {
    // =========================
    // ELEMENTOS PRINCIPALES
    // =========================
    const enterBtn = document.getElementById('enterBtn');
    const introCurtain = document.getElementById('introCurtain');
    const curtainSound = document.getElementById('curtainSound');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    // =========================
    // MÚSICA
    // =========================
    bgMusic.muted = true; // inicial muted
    bgMusic.loop = true;

    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(() => console.log('Error al reproducir música'));
            musicToggle.classList.add('active');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('active');
        }
    });

    // =========================
    // BOTÓN ENTRAR / CORTINA
    // =========================
    enterBtn.addEventListener('click', () => {
        // reproducir sonido de cortina
        curtainSound.currentTime = 0;
        curtainSound.play().catch(() => console.log('Cortina bloqueada'));

        // ocultar cortina con animación
        introCurtain.classList.add('hide');
        introCurtain.querySelector('.intro-blur').classList.add('hide');

        // reproducir música de fondo
        bgMusic.muted = false;
        bgMusic.play().catch(() => console.log('Música bloqueada'));
    });

    // =========================
    // SLIDER DE IMÁGENES
    // =========================
    const sliders = document.querySelectorAll('[data-slider]');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('img');
        let index = 0;

        const prevBtn = slider.parentElement.querySelector('.prev');
        const nextBtn = slider.parentElement.querySelector('.next');

        function showSlide(i) {
            slider.style.transform = `translateX(-${i * 100}%)`;
        }

        prevBtn.addEventListener('click', () => {
            index = (index - 1 + slides.length) % slides.length;
            showSlide(index);
        });

        nextBtn.addEventListener('click', () => {
            index = (index + 1) % slides.length;
            showSlide(index);
        });
    });

    // =========================
    // CUENTA REGRESIVA
    // =========================
    const countdown = () => {
        const endDate = new Date('2026-03-07T16:00:00'); // fecha del evento
        const now = new Date();
        const diff = endDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
