# build environment
FROM node:lts-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm ci \
    && npm i -g react-scripts@3.4.1 \
    && npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]