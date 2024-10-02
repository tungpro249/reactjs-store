# Sử dụng một base image chứa Node.js
FROM node:latest

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --legacy-peer-deps

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Khai báo cổng mà ứng dụng sẽ lắng nghe
EXPOSE 5000

# Khởi chạy ứng dụng
CMD ["npm", "start"]