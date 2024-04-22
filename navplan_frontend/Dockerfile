# Use a base image with Node.js and Nginx
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json file and package-lock.json
COPY angular-app/package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the rest of the application source code
COPY angular-app/*.json ./
COPY angular-app/*.js ./
COPY angular-app/src ./src

# Build the Angular app
RUN ng build --configuration=development

# Use Nginx as the web server
FROM nginx:latest

# Copy the built Angular app from the build container to the Nginx web root
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
