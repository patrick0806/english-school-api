FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM gcr.io/distroless/nodejs
ENV NODE_ENV=PRODUCTION
WORKDIR /app
COPY --from=builder /app/dist ./src
COPY package*.json ./
RUN npm install --only=production
CMD ["src/main.js"]