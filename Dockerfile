FROM node:8.11.3-alpine

MAINTAINER Jacek Spolnik <jacek.spolnik@gmail.com>

COPY . /app
WORKDIR /app

RUN mkdir -p ./public/assets

RUN npm install
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD node ./server.js