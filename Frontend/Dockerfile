FROM node:16-alpine AS build
WORKDIR /sisgem-front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
CMD ["npm", "start"]