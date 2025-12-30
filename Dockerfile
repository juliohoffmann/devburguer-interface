# Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /app

# Instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: servidor
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta que o Nginx usa (padrão é 80, não 3001)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
