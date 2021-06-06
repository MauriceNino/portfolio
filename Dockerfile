# build environment
FROM node:16-alpine

WORKDIR /app

COPY . ./

RUN npm ci \
    && npm run build

EXPOSE 3000

CMD ["npm", "start"]