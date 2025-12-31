# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servidor
FROM nginx:alpine
# Remove a configuração padrão do Nginx para evitar conflitos
RUN rm /etc/nginx/conf.d/default.conf
# Copia sua configuração personalizada para o Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copia os arquivos estáticos da build para o diretório de serviço do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta que o Nginx vai usar (padrão é 80)
EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]


