export const env = {
  NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  NEXT_PUBLIC_RPC_ENDPOINT: process.env.NEXT_PUBLIC_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com',
  NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK || 'mainnet-beta',
} as const;

export function validateEnv(): void {
  const requiredEnvVars = ['NEXT_PUBLIC_OPENAI_API_KEY'];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
} 