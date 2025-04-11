# PunkLang 维护说明

本文档记录了 PunkLang 项目的关键配置和维护信息，用于确保系统正常运行。

## API 集成状态

### DeepSeek API

- **状态**: ✅ 正常工作
- **当前模型**: `deepseek-chat`
- **API Key**: 已配置 (请妥善保管密钥)
- **测试日期**: 2025年4月2日

### OpenAI GPT-4 API

- **状态**: ✅ 正常工作
- **当前模型**: `gpt-4-turbo-preview`
- **API Key**: 通过环境变量 `NEXT_PUBLIC_OPENAI_API_KEY` 配置

## 自动语言检测

系统会自动检测输入的语言类型：
- 中文输入 → 使用 DeepSeek API
- 英文输入 → 使用 OpenAI GPT-4 API
- 如果 DeepSeek API 故障，会自动回退到 GPT-4

## 关键文件

- `src/services/test.ts`: DeepSeek 和 GPT-4 API 调用实现
- `src/services/ai.ts`: 主页面的歌词生成服务
- `src/app/test/page.tsx`: 测试页面实现
- `src/app/api/test-deepseek/route.ts`: DeepSeek API 测试端点

## 启动脚本

使用 `./start-dev.sh` 脚本启动开发服务器。该脚本会:
1. 停止所有正在运行的 Node.js 进程
2. 清理端口配置文件
3. 清理构建缓存
4. 检查 Next.js 安装
5. 启动开发服务器

## 备份

创建了源代码备份:
- `src-backup-20250402/`: 最新工作版本的备份

## 提示词调优

基于研究，我们已优化了提示词以生成最佳的庞麦郎风格歌词:

1. 提示词包含7个庞麦郎风格特点:
   - 口语化与方言感
   - 充满热情但带有荒诞现实主义色彩
   - 使用接地气的语言和具体商品名称
   - 重复句式和韵律
   - 城乡结合部青年视角
   - 非逻辑但强行押韵
   - 结尾情感升华

2. 引用了关键标志性歌词片段作为风格锚点

3. 给出明确的生成要求:
   - 保留特有句式结构
   - 加入具体商品名
   - 使用强行押韵
   - 结尾要有升华感

## 故障排除

如果 DeepSeek API 报错:
1. 检查 API 密钥是否正确
2. 确认模型名称为 `deepseek-chat`
3. 检查网络连接
4. 查看控制台日志了解详细错误信息

如果服务器启动失败:
1. 使用 `./start-dev.sh` 脚本重启
2. 检查 `.env.local` 文件中的 API 密钥配置
3. 如有必要，回退到备份代码

## 备注

最后一次成功测试在 2025年4月2日，生成模型符合预期的庞麦郎风格歌词。 