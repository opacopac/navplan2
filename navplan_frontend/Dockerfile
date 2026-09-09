# Use a base image with Node.js and Nginx
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY angular-app/package.json angular-app/package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies (npm ci uses the lock file for reproducible, conflict-free installs)
RUN npm ci

# Copy the rest of the application source code
COPY angular-app/*.json ./
COPY angular-app/*.js ./
COPY angular-app/src ./src

# Build the Angular app
RUN ng build --configuration=development

# Use Nginx as the web server
FROM nginx:latest

# Copy the built Angular app from the build container to the Nginx web root
COPY --from=build /app/dist/browser/ /usr/share/nginx/html/

# Use a custom Nginx config to handle Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for serving the application
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
