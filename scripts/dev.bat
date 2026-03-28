@echo off
chcp 65001 > nul
echo ==============================================
echo [DEV] Запуск середовища розробки (Development)
echo ==============================================

echo [1/2] Перевірка Node.js залежностей...
if not exist "node_modules\" (
    echo Тека node_modules не знайдена. Виконується npm install...
    npm install
) else (
    echo Залежності вже встановлено.
)

echo.
echo [2/2] Запуск сервера розробки Vite...
echo Натисніть Ctrl+C для зупинки.
npm run dev

pause
