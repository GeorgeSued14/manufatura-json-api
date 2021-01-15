FROM node:13.12-slim as node

WORKDIR /web

COPY ./web/package.json /web/
RUN npm i npm@latest -g
RUN npm install

COPY ./web /web/

RUN npm run build

EXPOSE 4200

FROM nginx:1.19.5

RUN rm -rf /usr/share/nginx/html/*

COPY --from=node /web/dist/app /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

