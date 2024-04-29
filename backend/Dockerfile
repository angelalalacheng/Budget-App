# 指定基础镜像
FROM node:20.10.0

# 设置工作目录
WORKDIR /backend

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制所有文件
COPY . .

# 暴露端口
EXPOSE 8080

# 启动命令
CMD ["npm", "start"]

# 构建镜像
# docker build -t budget-backend:1.0 .
