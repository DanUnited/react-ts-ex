FROM node:12-alpine AS builder
RUN apk update && apk add git

ARG PROFILE
WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.21.1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY fullchain.pem /etc/nginx/conf.d/fullchain.pem
COPY server.key /etc/nginx/conf.d/server.key

COPY --from=builder /app/build /usr/share/nginx/html/
