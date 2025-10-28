FROM node:22.17.1

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Обновляем npm до последней версии стабильной
RUN npm install -g npm@11

# Устанавливаем зависимости reproducible способом
RUN npm ci

# Копируем остальные файлы
COPY . .

# Команда по умолчанию (опционально)
CMD ["npm", "test"]
