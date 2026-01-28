# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build


# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5556

CMD ["nginx", "-g", "daemon off;"]
