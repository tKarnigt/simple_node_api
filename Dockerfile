FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 3001