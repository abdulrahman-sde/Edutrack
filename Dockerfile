# ── Stage 1: dev ─────────────────────────────────────────────
FROM node:24-alpine AS dev
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# ── Stage 2: builder ─────────────────────────────────────────
FROM node:24-alpine AS builder
WORKDIR /app
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
COPY package*.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 3: production ──────────────────────────────────────
FROM node:24-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]