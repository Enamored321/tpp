# Збірка Docker-образу (етап 1)
FROM node:20-alpine AS build

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json та встановлюємо залежності
COPY package*.json ./
RUN npm install

# Копіюємо всі файли проекту та запускаємо збірку
COPY . .
RUN npm run build

# Етап релізу: використовуємо легкий веб-сервер Nginx для видачі статики
FROM nginx:alpine

# Копіюємо зібрану статику з етапу 'build' у теку веб-сервера Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Відкриваємо 80-й порт
EXPOSE 80

# Nginx запуститься автоматично
