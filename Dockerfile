    # Etapa 1: build
    FROM node:20-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    # Etapa 2: servidor
    FROM nginx:alpine
    # Remove a configuração padrão do Nginx
    RUN rm /etc/nginx/conf.d/default.conf
    # Copia sua configuração personalizada
    COPY nginx.conf /etc/nginx/conf.d/default.conf # <--- COPIA O ARQUIVO DE CONFIGURAÇÃO
    # Copia os arquivos da build
    COPY --from=build /app/dist /usr/share/nginx/html

    # Expor a porta que o Nginx vai usar (agora é 80)
    EXPOSE 80 

    CMD ["nginx", "-g", "daemon off;"]

