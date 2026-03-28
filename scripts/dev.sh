#!/usr/bin/env bash

# Встановлює переривання скрипта при помилці
set -e

echo "=============================================="
echo "[DEV] Запуск середовища розробки (Development)"
echo "=============================================="

echo "[1/2] Перевірка Node.js залежностей..."
if [ ! -d "node_modules" ]; then
    echo "Тека node_modules не знайдена. Виконується npm install..."
    npm install
else
    echo "Залежності вже встановлено."
fi

echo ""
echo "[2/2] Запуск сервера розробки Vite..."
echo "Натисніть Ctrl+C для зупинки."
npm run dev
