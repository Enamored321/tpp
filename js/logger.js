/**
 * Клас Logger: базова гнучка система логування подій та помилок.
 * Реалізована підтримка різних рівнів логування та налаштування "на льоту".
 */
export class Logger {
    static LEVELS = {
        DEBUG: 1,
        INFO: 2,
        WARNING: 3,
        ERROR: 4,
        CRITICAL: 5
    };

    /**
     * @param {string} moduleName - Назва модуля, який здійснює виклики логера
     */
    constructor(moduleName) {
        this.moduleName = moduleName;
        
        // Вимога: мінімальний рівень повинен знаходитись без перекомпіляції.
        // Зчитуємо його напряму зі сховища браузера. Якщо відсутній - типовий рівень INFO (2).
        const storedLevel = localStorage.getItem('APP_LOG_LEVEL');
        this.currentLevel = storedLevel ? Logger.LEVELS[storedLevel.toUpperCase()] || Logger.LEVELS.INFO : Logger.LEVELS.INFO;
    }

    /**
     * Базовий метод для форматування та виведення повідомлення
     * Базовий формат: [time] [LEVEL] [module] message
     */
    _log(levelName, levelValue, message, data = null) {
        // Перевіряємо, чи дозволений поточний рівень логування для виводу
        if (levelValue >= this.currentLevel) {
            const time = new Date().toISOString();
            const logPrefix = `[${time}] [${levelName}] [${this.moduleName}]`;
            
            // Вибір методу консолі залежно від рівня
            const consoleMethod = levelValue >= Logger.LEVELS.ERROR ? 'error' : 
                                  levelValue === Logger.LEVELS.WARNING ? 'warn' : 'log';
            
            if (data) {
                console[consoleMethod](`${logPrefix} ${message}`, data);
            } else {
                console[consoleMethod](`${logPrefix} ${message}`);
            }

            if (levelValue === Logger.LEVELS.CRITICAL) {
                // Місце для майбутньої інтеграції з сервісами на кшталт Sentry
                // e.g. sendToService(logPrefix, message);
            }
        }
    }

    /** Логування детальної діагностичної інформації */
    debug(message, data) { this._log('DEBUG', Logger.LEVELS.DEBUG, message, data); }
    
    /** Логування загальних інформаційних повідомлень життєвого циклу */
    info(message, data) { this._log('INFO', Logger.LEVELS.INFO, message, data); }
    
    /** Логування ситуацій, які не ламають роботу програми, але є неочікуваними */
    warn(message, data) { this._log('WARNING', Logger.LEVELS.WARNING, message, data); }
    
    /** Логування помилок, які впливають на окремий функціонал */
    error(message, data) { this._log('ERROR', Logger.LEVELS.ERROR, message, data); }
    
    /** Фатальні помилки, подальша стабільна робота може бути порушена */
    critical(message, data) { this._log('CRITICAL', Logger.LEVELS.CRITICAL, message, data); }
}

export default Logger;
