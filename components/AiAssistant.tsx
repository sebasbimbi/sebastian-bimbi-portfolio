'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi, I'm Sebastian's digital twin. Ask me anything about his work, awards, or the no-code movement." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Format history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg, history }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.response || data.error || "I didn't catch that." }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I am currently experiencing high traffic. Please try again later." }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform border-2 border-white"
        aria-label="Chat with AI"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-white border-2 border-black flex flex-col shadow-2xl">
          <div className="bg-black text-white p-4 flex justify-between items-center border-b-2 border-black">
            <h3 className="font-display uppercase text-xl">Bimbi AI</h3>
            <span className="text-xs uppercase tracking-widest text-gray-400">Online</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border border-black ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-3 border border-black text-sm font-bold uppercase ${msg.role === 'user' ? 'bg-black text-white' : 'bg-white text-black'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%] flex-row">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border border-black bg-white text-black">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 border border-black bg-white text-black">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t-2 border-black flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="ASK ME ABOUT NO-CODE..."
              className="flex-1 bg-transparent border-b-2 border-gray-300 focus:border-black outline-none px-2 py-1 font-bold uppercase text-sm placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 hover:bg-black hover:text-white transition-colors disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;