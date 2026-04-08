#!/bin/sh
docker stop portfolio-preview 2>/dev/null
docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t portfolio-preview-local -f - . <<'EOF'
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx vite build --base=/
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
EOF
docker run --rm -d --name portfolio-preview -p 3000:80 portfolio-preview-local
echo "Running at http://localhost:3000"
