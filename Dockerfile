FROM node:10
WORKDIR /usr/src/driverservice
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY src/ src
RUN npm install
RUN npm run build:${BUILD_TYPE}
EXPOSE 8085
CMD npm start
