FROM node:14-alpine

ENV NODE_ENV production
ENV PORT 80

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . ./

EXPOSE 80

CMD ["yarn", "start"]
