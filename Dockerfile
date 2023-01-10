# build environment
FROM node:16-alpine

WORKDIR /app

COPY . ./

RUN yarn \
    && yarn build

EXPOSE 3000

CMD ["yarn", "start"]