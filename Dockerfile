FROM node:18.19.1

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]