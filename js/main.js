/**
 * Головна точка входу скрипта.
 * Налаштовує обробники подій для плавного прокручування та анімації елементів при скролі.
 */
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    setupScrollReveal();
});

/**
 * Налаштування плавної прокрутки для всіх навігаційних посилань.
 * Активується при натисканні на посилання, що веде до якоря на поточної сторінці.
 * 
 * @function setupSmoothScrolling
 * @returns {void}
 */
const setupSmoothScrolling = () => {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70, // Adjust for navbar height
                        behavior: 'smooth',
                    });
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
};
