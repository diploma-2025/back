FROM node:20.18.2-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
RUN npm run migration:run
CMD ["npm", "start"]
