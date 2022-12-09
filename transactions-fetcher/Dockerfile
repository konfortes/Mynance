FROM node:18
WORKDIR /usr/app
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:18
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=0 /usr/app/dist .
EXPOSE 8080
CMD ["npm","run", "start"]