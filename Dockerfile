FROM node:lts
# Create app directory
WORKDIR /usr/src/twitter/api
# Install app dependencies
COPY package*.json ./

RUN npm install --silent
# Copy app source code
COPY . .

#Expose port and start application
EXPOSE 4000
CMD [ "npm", "start" ]
