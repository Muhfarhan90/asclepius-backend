# Gunakan image dasar node.js
FROM node:16-slim

# Set working directory di dalam container
WORKDIR /usr/src/app

# Salin package.json dan install dependensi
COPY package*.json ./
RUN npm install

# Salin seluruh file aplikasi ke dalam container
COPY . .

# Expose port aplikasi (port yang digunakan Cloud Run adalah 8080)
EXPOSE 8080

# Tentukan perintah untuk menjalankan aplikasi
CMD [ "npm", "start" ]
