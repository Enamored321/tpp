@echo off
chcp 65001 > nul
echo =======================================================
echo [PROD] Збірка та локальний попередній перегляд (Preview)
echo =======================================================

echo [1/3] Перевірка коду лінтерами...
call npm run lint
if %errorlevel% neq 0 (
    echo ❌ Знайдено помилки при перевірці коду. Будь ласка, виправте їх перед збіркою.
    pause
    exit /b %errorlevel%
)
echo ✅ Лінтери пройшли успішно.

echo.
echo [2/3] Створення Production-збірки...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Помилка під час збірки проекту.
    pause
    exit /b %errorlevel%
)
echo ✅ Збірка успішно завершена. Артефакти знаходяться у теці /dist.

echo.
echo [3/3] Запуск Production Preview Server...
echo Натисніть Ctrl+C для зупинки.
npm run preview

pause
