'use client';

import { useState } from 'react';
import { copyToClipboard } from '@/utils/helpers';

interface LyricsOutputProps {
  lyrics: string;
}

export function LyricsOutput({ lyrics }: LyricsOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!lyrics) return null;

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Generated Lyrics</h2>
      <div className="whitespace-pre-wrap font-mono text-gray-800">
        {lyrics}
      </div>
      
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleCopy}
          className="btn-secondary"
          disabled={copied}
        >
          {copied ? 'Copied!' : 'Copy Lyrics'}
        </button>
        
        <button
          onClick={() => {
            const text = encodeURIComponent(lyrics);
            window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
          }}
          className="btn-primary"
        >
          Share on Twitter
        </button>
      </div>
    </div>
  );
} 