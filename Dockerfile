FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . . 

RUN npm run build

FROM node:22-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/.env ./


EXPOSE 8000


CMD ["node", "dist/main"]




