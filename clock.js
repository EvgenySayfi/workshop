(() => {
    const clock = document.querySelector('[data-citizen-clock]');
    if (!clock) return;

    const hourHand = clock.querySelector('.citizen-clock-hour');
    const minuteHand = clock.querySelector('.citizen-clock-minute');
    const secondHand = clock.querySelector('.citizen-clock-second');
    const date = clock.querySelector('.citizen-clock-date');
    let timer;
    let lastLabel = '';

    function tick() {
        // Считаем положение заново по времени устройства: задержки не накапливаются.
        const now = new Date();
        const seconds = now.getSeconds() + Math.floor(now.getMilliseconds() / 125) / 8;
        const minutes = now.getMinutes() + seconds / 60;
        const hours = now.getHours() % 12 + minutes / 60;

        secondHand.style.transform = `rotate(${seconds * 6}deg)`;
        minuteHand.style.transform = `rotate(${minutes * 6}deg)`;
        hourHand.style.transform = `rotate(${hours * 30}deg)`;
        date.textContent = now.getDate();

        const label = `Часы Citizen — местное время ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}, ${now.toLocaleDateString('ru-RU')}`;
        if (label !== lastLabel) {
            clock.setAttribute('aria-label', label);
            lastLabel = label;
        }

        // Следующий шаг на границе восьмой доли секунды, без плавного перехода.
        timer = setTimeout(tick, 125 - Date.now() % 125);
    }

    document.addEventListener('visibilitychange', () => {
        clearTimeout(timer);
        if (!document.hidden) tick();
    });

    tick();
})();
