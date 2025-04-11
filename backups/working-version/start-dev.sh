#!/bin/bash

# 停止所有 Node.js 进程
echo "正在停止所有 Node.js 进程..."
pkill -f node 2>/dev/null

# 删除已有的端口文件
rm -f .next/PORT 2>/dev/null

# 等待几秒确保所有进程已停止
sleep 2

# 清理缓存
echo "正在清理构建缓存..."
npx next telemetry disable
rm -rf .next
rm -rf node_modules/.cache

# 确保依赖正确安装
npx next --version || npm install next@13.5.6

# 启动开发服务器
echo "启动开发服务器..."
npm run dev 