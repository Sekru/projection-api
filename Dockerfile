FROM node:12.13.0-slim

WORKDIR /app
COPY package.json ./
RUN npm i && npm i typescript@3.4.3 -g
COPY . .
RUN tsc
CMD ["node", "."]
