#!/bin/bash

# 创建一个时间戳文件夹用于存放项目快照
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
SNAPSHOT_DIR="snapshots/snapshot_$TIMESTAMP"

# 创建目录
mkdir -p $SNAPSHOT_DIR

# 复制关键文件和目录
echo "正在创建项目快照 $SNAPSHOT_DIR..."

# 复制全部源代码
cp -r src $SNAPSHOT_DIR/

# 复制配置文件
cp -f package.json next.config.js .env* $SNAPSHOT_DIR/ 2>/dev/null || true

# 复制启动和恢复脚本
cp -f start-dev.sh restore.sh $SNAPSHOT_DIR/ 2>/dev/null || true

# 复制文档
cp -f README.md MAINTAIN.md $SNAPSHOT_DIR/ 2>/dev/null || true

# 创建快照信息文件
cat > $SNAPSHOT_DIR/SNAPSHOT_INFO.md << EOF
# 项目快照信息

- **创建时间**: $(date)
- **快照原因**: DeepSeek API 集成成功，使用正确的 deepseek-chat 模型名称，优化提示词
- **DeepSeek模型**: deepseek-chat
- **测试状态**: 成功
- **备注**: 测试页面生成庞麦郎风格歌词正常，自动语言检测正确区分中英文输入

## 重要更改

1. 修复了 DeepSeek API 的模型名称 (deepseek-chat)
2. 优化了提示词以更好地捕捉庞麦郎风格特点
3. 增加了生成 token 上限 (从500增加到800)
4. 改进了测试页面UI和用户体验
5. 在 MAINTAIN.md 中记录了当前配置状态
EOF

echo "快照创建完成: $SNAPSHOT_DIR/SNAPSHOT_INFO.md"
echo "使用以下命令可以随时恢复到此快照:"
echo "  cp -r $SNAPSHOT_DIR/src ."
echo "  cp $SNAPSHOT_DIR/package.json $SNAPSHOT_DIR/next.config.js ."

# 使脚本可执行
chmod +x create-snapshot.sh 