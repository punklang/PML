#!/bin/bash

# ===============================================================
# Punklang 歌词生成器恢复脚本
# 作用：从备份中恢复已知工作的版本
# 用法：./restore.sh
# ===============================================================

echo "开始恢复 Punklang 歌词生成器..."

# 停止所有 Node.js 进程
echo "正在停止所有 Node.js 进程..."
pkill -f node 2>/dev/null

# 确保备份目录存在
if [ ! -d "backups/working-version" ]; then
  echo "错误: 备份目录不存在!"
  exit 1
fi

# 恢复关键文件
echo "恢复关键文件..."
cp backups/working-version/test.ts src/services/ 2>/dev/null || echo "警告: 无法复制 test.ts"
cp backups/working-version/page.tsx src/app/test/ 2>/dev/null || echo "警告: 无法复制 page.tsx"
cp backups/working-version/layout.tsx src/app/ 2>/dev/null || echo "警告: 无法复制 layout.tsx"
cp backups/working-version/globals.css src/styles/ 2>/dev/null || echo "警告: 无法复制 globals.css"
cp backups/working-version/next.config.js . 2>/dev/null || echo "警告: 无法复制 next.config.js"
cp backups/working-version/package.json . 2>/dev/null || echo "警告: 无法复制 package.json"
cp backups/working-version/tsconfig.json . 2>/dev/null || echo "警告: 无法复制 tsconfig.json"
cp backups/working-version/.env.local . 2>/dev/null || echo "警告: 无法复制 .env.local"
cp backups/working-version/start-dev.sh . 2>/dev/null || echo "警告: 无法复制 start-dev.sh"
chmod +x start-dev.sh 2>/dev/null

# 清理缓存
echo "清理缓存..."
rm -rf .next node_modules/.cache

echo "恢复完成! 你现在可以运行 './start-dev.sh' 来启动服务." 