# Punklang - 庞麦郎风格歌词生成器

基于 Next.js 和 AI 模型的庞麦郎风格歌词生成器。输入主题，获得庞麦郎风格的歌词。

## 功能特点

- 生成庞麦郎风格的歌词
- 支持中英文输入和输出
- 智能模型选择：
  - 中文输入：使用 DeepSeek R1 模型
  - 英文输入：使用 GPT-4 模型
- 简洁的用户界面

## 使用方法

1. 运行开发服务器：

```bash
./start-dev.sh
```

2. 打开浏览器访问：http://localhost:3000/test

3. 输入主题，点击"Generate Lyrics"按钮生成歌词
   - 输入中文主题：将使用DeepSeek R1模型生成中文歌词
   - 输入英文主题：将使用GPT-4模型生成英文歌词

## 项目结构

- `src/services/test.ts`: 歌词生成服务，包含两种AI模型的集成
- `src/app/test/page.tsx`: 测试页面，提供用户界面
- `src/app/layout.tsx`: 应用布局
- `src/styles/globals.css`: 全局样式
- `next.config.js`: Next.js 配置
- `start-dev.sh`: 启动脚本（处理端口占用等问题）
- `restore.sh`: 恢复脚本（从备份恢复）

## AI模型集成

本项目集成了两种AI模型，根据输入语言自动选择：

1. **DeepSeek R1**:
   - 用于处理中文输入
   - 专门针对中文优化
   - API密钥：在环境变量中配置

2. **GPT-4-turbo-preview**:
   - 用于处理英文输入 
   - 生成高质量的英文歌词
   - API密钥：通过 NEXT_PUBLIC_OPENAI_API_KEY 环境变量配置

## 恢复备份

如果需要恢复到已知工作的版本，运行：

```bash
./restore.sh
```

此脚本会从 `backups/working-version` 目录恢复所有关键文件。

## 环境变量

项目需要以下环境变量：

```
NEXT_PUBLIC_OPENAI_API_KEY=你的OpenAI API密钥
```

将其添加到 `.env.local` 文件中。DeepSeek API密钥已经硬编码在代码中。

## 注意事项

1. 每次修改后建议使用 `./start-dev.sh` 重启服务器
2. 如果遇到问题，使用 `./restore.sh` 恢复到上一个工作版本
3. 语言检测基于正则表达式，检查输入是否完全由英文字符组成 