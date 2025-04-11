#!/bin/bash

# ===============================================================
# Punklang 歌词生成器开发服务启动脚本
# 作用：解决端口占用、进程残留和构建缓存问题
# 用法：./start-dev.sh
# ===============================================================

# 停止所有 Node.js 进程
echo "正在停止所有 Node.js 进程..."
pkill -f node 2>/dev/null  # 忽略错误输出

# 删除已有的端口文件，避免端口冲突
echo "清理端口配置文件..."
rm -f .next/PORT 2>/dev/null

# 等待几秒确保所有进程已停止
echo "等待进程结束..."
sleep 2

# 清理缓存，解决构建问题
echo "正在清理构建缓存..."
npx next telemetry disable  # 禁用遥测
rm -rf .next  # 删除构建缓存
rm -rf node_modules/.cache  # 删除依赖缓存

# 确保依赖正确安装
echo "检查 Next.js 安装..."
npx next --version || npm install next@13.5.6  # 如果不存在则安装

# 启动开发服务器
echo "启动开发服务器..."
echo "服务将在 http://localhost:3000 启动，如果端口被占用会自动切换"
npm run dev

# 脚本结束 