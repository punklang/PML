'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        PUNKLANG
        <span className="block text-xl text-blue-400 mt-2">AI Lyrics Generator</span>
      </h1>
      
      <div className="w-full max-w-md">
        <Link 
          href="/test" 
          className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg transition"
        >
          Open Lyrics Generator
        </Link>
      </div>
    </div>
  );
} 