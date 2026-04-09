# Etapa 1: build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos dependencias
COPY package.json yarn.lock ./

# Instalamos dependencias
RUN yarn install

# Copiamos el resto del proyecto
COPY . .

# Build de Vite
RUN yarn build

# Etapa 2: producción con nginx
FROM nginx:alpine


COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]