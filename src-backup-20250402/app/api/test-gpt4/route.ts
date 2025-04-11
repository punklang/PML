import { NextResponse } from 'next/server';

/**
 * 测试 GPT-4 API 连接
 * 这个 API 路由仅用于测试 GPT-4 API 是否能正常连接
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
    
    console.log('Testing GPT-4 API with prompt:', prompt);
    
    // 调用 OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
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
    console.log('GPT-4 API response status:', response.status);
    
    if (!response.ok) {
      const statusText = response.statusText;
      let errorDetails = { status: response.status, statusText };
      
      try {
        const errorJson = await response.json();
        errorDetails = { ...errorDetails, ...errorJson };
      } catch (e) {
        console.error('Failed to parse error response from GPT-4 API');
      }
      
      console.error('GPT-4 API Error:', errorDetails);
      
      return NextResponse.json(
        { error: `GPT-4 API Error: ${response.status}`, details: errorDetails },
        { status: 500 }
      );
    }
    
    const data = await response.json();
    console.log('GPT-4 API response received successfully');
    
    return NextResponse.json({
      result: data.choices[0].message.content,
      model: data.model,
      usage: data.usage
    });
  } catch (error) {
    console.error('Error testing GPT-4 API:', error);
    return NextResponse.json(
      { error: '测试 GPT-4 API 时出错', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 