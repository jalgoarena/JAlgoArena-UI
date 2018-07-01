FROM node:8.11.3-alpine

WORKDIR /app
COPY . .

RUN mkdir -p /app/public/assets

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD node /app/server.js