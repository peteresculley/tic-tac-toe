FROM node:10.15.3

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm i

COPY . .

EXPOSE 8081

RUN npm run build

CMD npm start
