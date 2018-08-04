FROM node:8.11.3-alpine as build

COPY . /app
WORKDIR /app/server

RUN npm install

WORKDIR /app

RUN npm install
RUN npm run build

FROM node:8.11.3-alpine

MAINTAINER Jacek Spolnik <jacek.spolnik@gmail.com>

COPY --from=build /app/build /app
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD node ./server.js