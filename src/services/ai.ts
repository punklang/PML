import OpenAI from 'openai';
import { env } from '@/config/env';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
});

// DeepSeek API configuration
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = 'sk-2c5c9c9c9c9c9c9c9c9c9c9';

// Model configuration
const OPENAI_MODEL = 'gpt-4-turbo-preview';
const DEEPSEEK_MODEL = 'deepseek-chat';

// System prompts for different languages
const ENGLISH_SYSTEM_PROMPT = `You are a professional lyricist specializing in creating lyrics in the style of Pang Mailang. Your task is to generate creative, engaging, and unique lyrics based on the given theme. The lyrics should be in English and maintain the distinctive style of Pang Mailang's music.`;

const CHINESE_SYSTEM_PROMPT = `You are a professional lyricist specializing in creating lyrics in the style of Pang Mailang. Your task is to generate creative, engaging, and unique lyrics based on the given theme. The lyrics should be in Chinese and maintain the distinctive style of Pang Mailang's music.`;

// Helper function to detect language
export function detectLanguage(text: string): 'en' | 'zh' {
  const englishRegex = /^[a-zA-Z0-9\s.,!?-]*$/;
  return englishRegex.test(text) ? 'en' : 'zh';
}

// Generate lyrics using OpenAI
async function generateWithOpenAI(theme: string): Promise<GenerationResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL,
      messages: [
        { role: 'system', content: ENGLISH_SYSTEM_PROMPT },
        { role: 'user', content: `Generate lyrics about: ${theme}` }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      lyrics: completion.choices[0]?.message?.content || 'Failed to generate lyrics'
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      lyrics: '',
      error: 'Failed to generate lyrics with OpenAI'
    };
  }
}

// Generate lyrics using DeepSeek
async function generateWithDeepSeek(theme: string): Promise<GenerationResponse> {
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: CHINESE_SYSTEM_PROMPT },
          { role: 'user', content: `Generate lyrics about: ${theme}` }
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      lyrics: data.choices[0]?.message?.content || 'Failed to generate lyrics'
    };
  } catch (error) {
    console.error('DeepSeek API error:', error);
    return {
      lyrics: '',
      error: 'Failed to generate lyrics with DeepSeek'
    };
  }
}

// Main function to generate lyrics
export async function generateLyrics(theme: string): Promise<GenerationResponse> {
  const language = detectLanguage(theme);
  
  try {
    if (language === 'en') {
      return await generateWithOpenAI(theme);
    } else {
      return await generateWithDeepSeek(theme);
    }
  } catch (error) {
    console.error('Lyrics generation error:', error);
    return {
      lyrics: '',
      error: 'Failed to generate lyrics'
    };
  }
}

export interface GenerationResponse {
  lyrics: string;
  error?: string;
}

// Simple in-memory cache
const cache = new Map<string, { lyrics: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function generateLyricsWithCache(input: string): Promise<GenerationResponse> {
  const cached = cache.get(input);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { lyrics: cached.lyrics };
  }

  const result = await generateLyrics(input);
  if (!result.error) {
    cache.set(input, {
      lyrics: result.lyrics,
      timestamp: Date.now(),
    });
  }

  return result;
} 