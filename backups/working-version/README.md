# Punklang - 歌词生成器工作版本备份

这个目录包含了已经稳定工作的歌词生成器代码备份。当需要恢复到此版本时，可以将这些文件复制回项目根目录。

## 关键文件

- `test.ts`: 歌词生成服务，使用 OpenAI API
- `page.tsx`: 测试页面，提供用户界面
- `layout.tsx`: 应用布局
- `globals.css`: 全局样式
- `next.config.js`: Next.js 配置
- `package.json`: 项目依赖
- `tsconfig.json`: TypeScript 配置
- `.env.local`: 环境变量配置
- `start-dev.sh`: 启动脚本

## 恢复方法

```bash
# 停止运行中的服务
pkill -f node

# 复制文件回项目目录
cp backups/working-version/* .

# 清理缓存并重新安装依赖
rm -rf .next node_modules
npm install

# 启动开发服务器
./start-dev.sh
```

## 注意事项

1. 该版本使用 Next.js 13.5.6
2. 歌词生成使用 GPT-4 模型
3. 输入什么语言会得到对应语言的歌词
4. 生成的歌词风格模仿庞麦郎 