# Stage 1: Installiere die Abhängigkeiten und baue die React-App
FROM node:18-alpine AS build

# Setze das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Kopiere die package.json und package-lock.json
COPY my-app/package.json my-app/package-lock.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den restlichen Code
COPY my-app/ .

# Baue die React-App
RUN npm run build

# Stage 2: Verwende ein Nginx-Image, um die gebaute App zu bedienen
FROM nginx:alpine

# Kopiere die gebauten Dateien aus der Build-Phase
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Exponiere den Port, auf dem Nginx läuft
EXPOSE 4001:80

# Starte den Nginx-Server
CMD ["nginx", "-g", "daemon off;"]