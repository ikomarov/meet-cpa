FROM node:20

COPY . /app
WORKDIR /app

USER root
RUN yarn install
RUN npm run build:pkg
