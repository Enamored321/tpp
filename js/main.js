import Logger from './logger.js';

const log = new Logger('MainController');

/**
 * Головна точка входу скрипта.
 * Налаштовує обробники подій для плавного прокручування та анімації елементів при скролі.
 */
document.addEventListener('DOMContentLoaded', () => {
    log.info('Запуск застосунку (Application started)');
    try {
        setupSmoothScrolling();
        setupScrollReveal();
        log.info('Базові події успішно налаштовано');
    } catch (e) {
        log.critical('Критична помилка при ініціалізації: ', e.message);
    }
});

/**
 * Налаштування плавної прокрутки для всіх навігаційних посилань.
 * Активується при натисканні на посилання, що веде до якоря на поточної сторінці.
 * 
 * @function setupSmoothScrolling
 * @returns {void}
 */
const setupSmoothScrolling = () => {
    log.debug('Ініціалізація плавного прокручування');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navLinks.length === 0) {
        log.warn('Навігаційні посилання не знайдено в DOM');
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    log.debug(`Здійснено перехід до секції: ${targetId}`);
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth',
                    });
                } else {
                    log.error(`Секція ${targetId} не знайдена в DOM для прокручування`);
                }
            }
        });
    });
};

/**
 * Налаштування анімації виявлення елементів при прокручуванні сторінки.
 * Використовує IntersectionObserver API для додавання класу 'reveal' видимим секціям.
 * 
 * @function setupScrollReveal
 * @returns {void}
 */
const setupScrollReveal = () => {
    const sections = document.querySelectorAll('.section, .hero');
    const observerOptions = {
        threshold: 0.1,
    };

    /**
     * Обробка перетину елементів в'юпортом.
     * Додає клас анімації та припиняє спостереження за елементом.
     * 
     * @param {IntersectionObserverEntry[]} entries - Список елементів, стан яких змінився.
     * @param {IntersectionObserver} observer - Екземпляр спостерігача.
     */
    const handleIntersection = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                log.debug(`Елемент потрапив у в'юпорт: ${entry.target.tagName} ${entry.target.id}`);
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((section) => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });
    
    log.info(`Завершено ініціалізацію анімації для ${sections.length} елементів`);
};
