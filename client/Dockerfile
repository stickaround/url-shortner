# Use an official Node runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Copy the rest of the frontend source code to the container
COPY . .

# Install the frontend dependencies
RUN npm install

RUN npm run build

CMD ["npm", "run", "preview"]