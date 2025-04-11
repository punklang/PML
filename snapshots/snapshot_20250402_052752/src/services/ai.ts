import OpenAI from 'openai';
import { env } from '@/config/env';

const openai = new OpenAI({
  apiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are a lyric generator that creates lyrics in the style of a unique Chinese internet phenomenon known for skateboarding shoes and friction-based lyrics. Your task is to:

1. Create lyrics that maintain the signature style of the Chinese artist known for "My Skateboard Shoes"
2. Include repetitive elements and strong rhythmic phrases (e.g., "slide-slide-slide", "hot-hot-hot")
3. Focus on everyday objects and specific brand names to keep it authentic
4. Use simple phrases with forced rhymes that may not be completely logical
5. Incorporate small-town youth perspective with urban-rural transitional elements
6. Always end with an emotional elevation (like "This is my destiny" or "This is my attitude")
7. Keep the tone authentic, raw and full of genuine emotion

Here are some signature lyrics to reference:
"My skateboard shoes, fashionable, most fashionable"
"On this smooth ground, friction"
"I didn't wear them for one day, but I miss them so much"
"This is my way of life"

Your lyrics must follow this structure with repetitive elements, contain at least 20 lines or 4 paragraphs, and maintain English output.`;

export interface GenerationResponse {
  lyrics: string;
  error?: string;
}

export async function generateLyrics(input: string): Promise<GenerationResponse> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Write lyrics about: ${input}. Keep the classic style with repetitive elements, specific objects, and emotional authenticity.` }
      ],
      temperature: 0.9,
      max_tokens: 800,
    });

    const lyrics = completion.choices[0]?.message?.content || '';
    return { lyrics };
  } catch (error) {
    console.error('Error generating lyrics:', error);
    return {
      lyrics: '',
      error: 'Failed to generate lyrics. Please try again.',
    };
  }
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