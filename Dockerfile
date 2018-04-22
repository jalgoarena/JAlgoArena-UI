FROM node:8.11.1

WORKDIR /app
COPY . .

RUN mkdir -p /app/public/assets

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

ENV JALGOARENA_API_URL=http://api:5001
ENV JALGOARENA_WS_URL=http://events:5005

EXPOSE 3000

CMD node /app/server.js