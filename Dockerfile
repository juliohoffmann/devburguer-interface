#Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /app
#Instala as dependências
COPY package*.json ./
RUN npm install
#copia o restante do projeto
COPY . .
#Buid da aplicação

#Etapa 2: servidor
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html


# Expor a porta que Easypanel vai usar
EXPOSE 3001     
CMD ["nginx", "-g", "daemon off;"]