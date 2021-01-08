FROM node:14.0-slim

WORKDIR /usr/app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn

COPY . .

EXPOSE 3030


