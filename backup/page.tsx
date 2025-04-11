'use client';

import { useState } from 'react';
import { testGeneration } from '@/services/test';

export default function TestPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput('');

    if (!input.trim()) {
      setError('请输入一些文字来生成歌词');
      setLoading(false);
      return;
    }

    try {
      console.log('Starting lyrics generation with input:', input);
      const result = await testGeneration(input);
      
      if (!result) {
        throw new Error('未能生成歌词');
      }
      
      setOutput(result);
      setError(null);
    } catch (error) {
      console.error('Error in lyrics generation:', error);
      setError(error instanceof Error ? error.message : '生成歌词失败');
      setOutput('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Lyrics Generator Test</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="请输入场景或感受..."
              className="w-full h-32 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating...' : 'Generate Lyrics'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {output && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Generated Lyrics:</h2>
            <pre className="whitespace-pre-wrap bg-gray-800 p-6 rounded-lg border border-gray-700 overflow-auto max-h-[70vh]">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 