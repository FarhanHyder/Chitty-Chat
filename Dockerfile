FROM node:13
WORKDIR ~/Chitty-Chat
COPY package.json .
RUN npm install
COPY . .
RUN npm run-script build

CMD [ "npm", "start" ]
