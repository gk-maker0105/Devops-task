FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Force clean build - remove .angular cache
RUN rm -rf .angular
RUN npm run build -- --configuration production --output-hashing=all

FROM nginx:alpine

COPY --from=builder /app/dist/angular-15-crud /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]