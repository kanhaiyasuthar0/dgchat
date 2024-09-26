# Use the official Node.js image as the base image
FROM node:18-alpine

RUN apk add --no-cache git

# Set the working directory inside the container
WORKDIR /app

ARG NEXTAUTH_SECRET

ENV NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]