FROM node:13.10
COPY . /CommuTag
WORKDIR /CommuTag
RUN npm install
CMD ["node","server.js"]
