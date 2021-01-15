FROM node:14-slim

WORKDIR /usr/app

COPY ["package*.json", "yarn.lock", "./"]

RUN yarn

COPY yarn.bash /usr/app/
RUN chmod u+x /usr/app/yarn.bash

COPY . .


EXPOSE 3032


