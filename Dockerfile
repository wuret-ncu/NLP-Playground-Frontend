FROM node:20.7.0

WORKDIR /
COPY . /app
EXPOSE 3000

RUN npm install

CMD [ "npm", "start" ]
