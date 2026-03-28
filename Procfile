# Procfile для деплою на платформи типу Heroku/Render за допомогою Foreman.
# Запускає вбудований прев'ю-сервер Vite. (У повноцінному production краще Nginx, але для PaaS це швидке рішення).
web: npm run build && npm run preview -- --host 0.0.0.0 --port ${PORT:-4173}
