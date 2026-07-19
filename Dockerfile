FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG CONSULTAS_URL=http://localhost:3002
ARG REPORTES_URL=http://localhost:3003
ENV CONSULTAS_URL=$CONSULTAS_URL
ENV REPORTES_URL=$REPORTES_URL
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "server.js"]
