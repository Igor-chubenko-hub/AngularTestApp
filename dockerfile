FROM node:12-alpine

ARG APP_DIR=var/angular_test_app
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY package*.json ./

RUN npm install -g nodemon @angular/cli lerna
RUN npm install

COPY . .
