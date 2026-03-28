#!/usr/bin/env bash

# Зупиняє виконання скрипта при помилках будь-якої команди
set -e

echo "======================================================="
echo "[PROD] Збірка та розгортання в Production (Nginx)      "
echo "======================================================="

# Якщо потрібно змінити директорію для копіювання, відредагуйте цю змінну:
DEPLOY_PATH="/var/www/html/tpp"

echo "[1/4] Перевірка Node.js залежностей..."
if [ ! -d "node_modules" ]; then
    npm install
fi

echo "[2/4] Перевірка якості коду (Лінтинг)..."
if npm run lint; then
    echo "✅ Лінтинг пройдено успішно."
else
    echo "❌ Помилки лінтера. Будь ласка, виправте код перед розгортанням."
    exit 1
fi

echo ""
echo "[3/4] Створення production-збірки (Build)..."
npm run build
echo "✅ Проєкт успішно зібраний у теку /dist."

echo ""
echo "[4/4] Встановлення файлів до $DEPLOY_PATH..."
if [ ! -w "$DEPLOY_PATH" ]; then
    echo "❕ УВАГА: Немає прав на запис до $DEPLOY_PATH."
    echo "❕ Скористайтеся sudo для перенесення файлів кроками нижче:"
    echo "sudo mkdir -p $DEPLOY_PATH"
    echo "sudo cp -r dist/* $DEPLOY_PATH/"
    echo "sudo chown -R www-data:www-data $DEPLOY_PATH"
    echo "sudo systemctl reload nginx"
else
    mkdir -p "$DEPLOY_PATH"
    cp -r dist/* "$DEPLOY_PATH/"
    echo "Файли скопійовано. Перезавантаження веб-сервера (якщо потрібні sudo права, скрипт може видати помилку)..."
    sudo systemctl reload nginx || systemctl reload nginx || echo "❗ Сервер Nginx треба перезавантажити вручну."
    echo "✅ Розгортання завершене успішно!"
fi
