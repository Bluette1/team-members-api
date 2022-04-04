FROM node:latest
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
ENTRYPOINT ["node", "server.js"]