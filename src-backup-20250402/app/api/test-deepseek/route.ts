import { NextResponse } from 'next/server';

/**
 * 测试 DeepSeek API 连接
 * 这个 API 路由仅用于测试 DeepSeek API 是否能正常连接
 */
export async function POST(request: Request) {
  try {
    // 从请求体中获取输入
    const { prompt } = await request.json();
    
    // 验证输入
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: '请提供有效的提示词' },
        { status: 400 }
      );
    }
    
    const deepseekApiKey = "sk-8b258d5580644a39b3760a570fb723aa";
    const deepseekEndpoint = "https://api.deepseek.com/v1/chat/completions";
    
    console.log('Testing DeepSeek API with prompt:', prompt);
    
    const response = await fetch(deepseekEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${deepseekApiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "你是一个助手，请详细回答用户的问题。"
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });
    
    // 记录响应状态
    console.log('DeepSeek API response status:', response.status);
    
    if (!response.ok) {
      const statusText = response.statusText;
      let errorDetails = { status: response.status, statusText };
      
      try {
        const errorJson = await response.json();
        errorDetails = { ...errorDetails, ...errorJson };
      } catch (e) {
        console.error('Failed to parse error response from DeepSeek API');
      }
      
      console.error('DeepSeek API Error:', errorDetails);
      
      return NextResponse.json(
        { error: `DeepSeek API Error: ${response.status}`, details: errorDetails },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    console.log('DeepSeek API response received successfully');
    
    return NextResponse.json({
      result: data.choices[0].message.content,
      model: data.model,
      usage: data.usage
    });
  } catch (error) {
    console.error('Error testing DeepSeek API:', error);
    return NextResponse.json(
      { error: '测试 DeepSeek API 时出错', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 