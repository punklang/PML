/**
 * 歌词生成服务 - 使用 OpenAI API 生成庞麦郎风格的歌词
 * 支持多语言：根据输入语言自动生成对应语言的歌词
 * 使用 GPT-4-turbo-preview 模型以获得最佳效果
 * 中文输入时使用 DeepSeek R1 模型
 */

export async function testGeneration(input: string) {
  try {
    console.log('API Key available:', !!process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    
    // 检测输入语言 - 如果全是英文字符则判定为英文
    const isEnglish = /^[a-zA-Z\s\d.,!?;:()'"-]+$/.test(input);
    
    // 针对中文输入，使用 DeepSeek R1 模型
    if (!isEnglish) {
      return await callDeepSeekR1(input);
    } 
    // 对于英文输入，使用原有的 GPT-4 模型
    else {
      return await callGPT4(input, isEnglish);
    }
  } catch (error: any) {
    // 错误处理和日志记录
    console.error('Error in lyrics generation:', error);
    if (error?.status === 404) {
      throw new Error('API model not available. Please check your API access.');
    } else if (error?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw error;
  }
}

/**
 * 调用 DeepSeek R1 模型生成中文歌词
 * @param input 用户输入的主题
 * @returns 生成的歌词
 */
async function callDeepSeekR1(input: string) {
  // DeepSeek R1 的 API 端点和密钥
  const deepseekApiKey = "sk-c4fbdcb6948443f29f74316557803c3";
  const deepseekEndpoint = "https://api.deepseek.com/v1/chat/completions";
  
  try {
    const response = await fetch(deepseekEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat/r1",
        messages: [
          {
            role: "system",
            content: `你是一位擅长模仿庞麦郎风格的作词人。庞麦郎的歌词风格具有以下特点：
            1. 简单直白，重复性强，句式整齐
            2. 充满热情和能量，情感真挚
            3. 使用生活化、接地气的语言
            4. 经常使用短句并富有韵律
            5. 内容常带有自我表达和励志元素
            6. 偶有不按常规的独特表达
            
            请参考庞麦郎经典歌曲《我的滑板鞋》歌词：
            
            "我的滑板鞋2010
            阿狸说我整天穿它太挫
            一天没穿它 却好想它
            这是我的生活的方式
            
            记得曾经在一个夏天
            一双滑板鞋 一段美好时光
            整个夏天 我们整天
            在一起 在街头滑滑滑
            地面太烫 烫烫烫
            我脚下滑板鞋 时光走走走
            
            它带我找回曾经
            找回记忆 找回时光
            当我穿上它 就好像
            找回了那些年 那些年
            
            我的滑板鞋 时尚时尚最时尚
            回忆一下 猪猪侠 
            曾经的帅 帅帅帅
            
            这是我的生活
            这是我的态度
            这是我的释放
            我的信念 我的态度"
            
            请用这种充满感情、简单直接、重复性强的风格为我创作一首关于用户输入主题的歌词。保留庞麦郎特有的句式结构和表达方式，但内容要围绕新主题。歌词必须足够完整，至少包含20行或4个段落。`
          },
          {
            role: "user",
            content: `写一首关于: ${input} 的歌词，用中文创作`
          }
        ],
        temperature: 0.9,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API error:', error);
    // 如果DeepSeek API调用失败，回退到GPT-4
    console.log('Falling back to GPT-4 for Chinese input due to DeepSeek API error');
    return await callGPT4(input, false);
  }
}

/**
 * 使用原有的 GPT-4 逻辑生成歌词
 * 保留原有功能，确保代码不被破坏
 * @param input 用户输入的主题
 * @param isEnglish 是否为英文输入
 * @returns 生成的歌词
 */
async function callGPT4(input: string, isEnglish: boolean) {
  // 调用 OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4-turbo-preview",  // 使用 GPT-4 获得更高质量的结果
      messages: [
        {
          // 系统提示词 - 定义生成风格和参考示例
          role: "system",
          content: `你是一位擅长模仿庞麦郎风格的作词人。庞麦郎的歌词风格具有以下特点：
          1. 简单直白，重复性强，句式整齐
          2. 充满热情和能量，情感真挚
          3. 使用生活化、接地气的语言
          4. 经常使用短句并富有韵律
          5. 内容常带有自我表达和励志元素
          6. 偶有不按常规的独特表达
          
          请参考庞麦郎经典歌曲《我的滑板鞋》歌词：
          
          "我的滑板鞋2010
          阿狸说我整天穿它太挫
          一天没穿它 却好想它
          这是我的生活的方式
          
          记得曾经在一个夏天
          一双滑板鞋 一段美好时光
          整个夏天 我们整天
          在一起 在街头滑滑滑
          地面太烫 烫烫烫
          我脚下滑板鞋 时光走走走
          
          它带我找回曾经
          找回记忆 找回时光
          当我穿上它 就好像
          找回了那些年 那些年
          
          我的滑板鞋 时尚时尚最时尚
          回忆一下 猪猪侠 
          曾经的帅 帅帅帅
          
          这是我的生活
          这是我的态度
          这是我的释放
          我的信念 我的态度"
          
          **语言匹配指令**：严格按照以下规则创作歌词：
          1. 如果用户输入使用英文，必须用英文创作歌词
          2. 如果用户输入使用中文，必须用中文创作歌词
          3. 如果用户使用其他语言，使用相同的语言创作歌词
          
          请用这种充满感情、简单直接、重复性强的风格为我创作一首关于用户输入主题的歌词。保留庞麦郎特有的句式结构和表达方式，但内容要围绕新主题。歌词必须足够完整，至少包含20行或4个段落。`
        },
        {
          // 用户提示词 - 包含用户输入和语言指令
          role: "user",
          content: `写一首关于: ${input} 的歌词，使用${isEnglish ? "英文" : "中文"}创作`
        }
      ],
      temperature: 0.9,  // 较高的随机性，使歌词更有创意
      max_tokens: 500    // 提高 token 限制以获得更长的歌词
    })
  });

  // 处理API错误
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  // 解析并返回生成的歌词
  const data = await response.json();
  return data.choices[0].message.content;
}