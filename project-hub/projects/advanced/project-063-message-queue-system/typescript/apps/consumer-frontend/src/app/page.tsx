'use client'

import { useEffect, useState } from "react";
import axios from 'axios';

interface Message {
  id: string;
  content: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const pollMessages = async () => {
      try {
        const response = await axios.get('http://localhost:9000/get-message')
        setMessages(response.data || []);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setIsConnected(false);
      }
    }

    const interval = setInterval(pollMessages, 2000);
    pollMessages();

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes === 1) return '1 minute ago';
    return `${diffInMinutes} minutes ago`;
  };

  return (
    <main className='bg-zinc-950 min-h-screen text-white'>
      <div className='max-w-4xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Kafka consumer - Messages</h1>
          <div className='flex items-center gap-2'>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className='text-zinc-400 text-sm'>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        <div className='space-y-3'>
          {messages.length === 0 ? (
            <div className='text-center text-zinc-500 py-12'>
              <div className='text-lg mb-2'>No messages yet</div>
              <div className='text-sm'>Messages will appear here</div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className='bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 hover:bg-zinc-900/70 transition-colors'>
                <div className='flex justify-between items-center mb-2'>
                  <span className='text-zinc-400 text-sm'>
                    {new Date(message.timestamp).toLocaleString()}
                  </span>
                  <span className='text-zinc-500 text-sm'>
                    {formatTimeAgo(message.timestamp)}
                  </span>
                </div>
                <div className='text-white'>
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}