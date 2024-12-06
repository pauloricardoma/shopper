# Build API
FROM node:20.12.2 AS build-api

WORKDIR /api

COPY ./api/package*.json ./
COPY ./.env ./
RUN npm install

COPY ./api ./
RUN npm run build

# Build Front
FROM node:20.12.2 AS build-front

WORKDIR /front

COPY ./front/package*.json ./
COPY ./.env ./
RUN npm install

COPY ./front ./
RUN npm run build

# Run API & Front
FROM node:20.12.2

WORKDIR /api
COPY --from=build-api /api ./
COPY ./.env ./
EXPOSE 8080

WORKDIR /front
COPY --from=build-front /front ./
COPY ./.env ./
EXPOSE 80

# Start API & Front
CMD ["sh", "-c", "cd /api && npm run start & cd /front && npm run start"]
