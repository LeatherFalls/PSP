FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

RUN npm install -g @nestjs/cli@8.0.0

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]