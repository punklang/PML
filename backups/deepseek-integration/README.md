# DeepSeek R1 集成说明

本目录包含了 DeepSeek R1 模型的集成代码备份。这个集成在保留原有 GPT-4 功能的基础上，添加了对 DeepSeek R1 模型的支持。

## 关键变更

- 添加了语言检测逻辑，当检测到中文输入时使用 DeepSeek R1 模型
- 当检测到英文输入时，继续使用原有的 GPT-4 模型
- 添加了错误处理和回退机制：如果 DeepSeek API 调用失败，会自动回退到 GPT-4

## 文件说明

- `test.ts`: 修改后的歌词生成服务，包含 DeepSeek R1 的集成

## 集成详情

1. 语言检测：使用正则表达式检测输入是否为纯英文
   ```typescript
   const isEnglish = /^[a-zA-Z\s\d.,!?;:()'"-]+$/.test(input);
   ```

2. 模型选择：
   - 中文输入：调用 DeepSeek R1 模型
   - 英文输入：调用原有的 GPT-4 模型

3. DeepSeek R1 API 调用：
   - 端点：https://api.deepseek.com/v1/chat/completions
   - 模型：deepseek-chat/r1
   - API 密钥：sk-c4fbdcb6948443f29f74316557803c3

4. 错误处理：
   - 如果 DeepSeek API 调用失败，会自动回退到 GPT-4
   - 所有错误信息都会记录到控制台

## 恢复方法

如果需要恢复此版本的集成代码：

```bash
cp backups/deepseek-integration/test.ts src/services/
```

## 注意事项

1. 确保 DeepSeek API 密钥正确
2. 如果输入既有中文又有英文，系统会识别为非英文，使用 DeepSeek R1 模型
3. 原有的 GPT-4 功能完全保留，不受影响 