'use client';

import { useState } from 'react';
import { generateLyrics } from '@/services/ai';
import { LyricsOutput } from '@/components/LyricsOutput';
import { WalletConnect } from '@/components/WalletConnect';

export default function Home() {
  const [theme, setTheme] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('Please enter a theme');
      return;
    }

    setLoading(true);
    setError('');
    setLyrics('');

    try {
      const result = await generateLyrics(theme);
      if (result.error) {
        setError(result.error);
      } else {
        setLyrics(result.lyrics);
      }
    } catch (err) {
      setError('Failed to generate lyrics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Punklang - AI Lyrics Generator
        </h1>
        
        <div className="mb-8">
          <WalletConnect />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="theme" className="block text-sm font-medium mb-2">
              Enter Theme
            </label>
            <input
              id="theme"
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Enter a theme for your lyrics..."
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Generating...' : 'Generate Lyrics'}
          </button>

          {error && (
            <div className="text-red-500 text-center">
              {error}
            </div>
          )}

          <LyricsOutput lyrics={lyrics} />
        </div>

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by AI - Visit us at <a href="https://punklang.xyz" className="text-blue-500 hover:underline">PUNKLANG.XYZ</a></p>
          <p>Follow us on <a href="https://x.com/punk_lang" className="text-blue-500 hover:underline">Twitter</a></p>
        </footer>
      </div>
    </main>
  );
} 