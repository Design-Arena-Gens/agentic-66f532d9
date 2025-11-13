'use client';

import { useState } from 'react';
import { Youtube, Facebook, Twitter, Instagram, Linkedin, MessageSquare, Send, Bot, Sparkles, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  platform?: string;
}

interface AnalyticsData {
  platform: string;
  engagement: number;
  reach: number;
  growth: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Social Media Agent. I can help you create content, schedule posts, analyze engagement, and manage your presence across YouTube, Facebook, Twitter, Instagram, LinkedIn, Pinterest, TikTok, and more. What would you like to do today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { name: 'YouTube', icon: Youtube, color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500' },
    { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bgColor: 'bg-blue-600/10', borderColor: 'border-blue-600' },
    { name: 'Twitter', icon: Twitter, color: 'text-sky-500', bgColor: 'bg-sky-500/10', borderColor: 'border-sky-500' },
    { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bgColor: 'bg-pink-500/10', borderColor: 'border-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bgColor: 'bg-blue-700/10', borderColor: 'border-blue-700' },
    { name: 'Pinterest', icon: TrendingUp, color: 'text-red-600', bgColor: 'bg-red-600/10', borderColor: 'border-red-600' },
  ];

  const mockAnalytics: AnalyticsData[] = [
    { platform: 'YouTube', engagement: 8.5, reach: 45000, growth: '+12%' },
    { platform: 'Instagram', engagement: 12.3, reach: 32000, growth: '+18%' },
    { platform: 'Twitter', engagement: 6.7, reach: 28000, growth: '+8%' },
    { platform: 'Facebook', engagement: 5.2, reach: 52000, growth: '+5%' },
    { platform: 'LinkedIn', engagement: 9.1, reach: 18000, growth: '+15%' },
    { platform: 'Pinterest', engagement: 7.8, reach: 22000, growth: '+10%' },
  ];

  const togglePlatform = (platformName: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          platforms: selectedPlatforms,
          history: messages
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        platform: data.platform
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    'Create a viral YouTube video idea',
    'Schedule Instagram posts for the week',
    'Analyze my Twitter engagement',
    'Write a LinkedIn article about AI',
    'Generate Pinterest board ideas',
    'Create a TikTok content strategy'
  ];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              AI Social Media Agent
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Your intelligent assistant for managing all social media platforms
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Platform Selection */}
          <div className="lg:col-span-1 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Select Platforms
            </h2>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.name);
                return (
                  <button
                    key={platform.name}
                    onClick={() => togglePlatform(platform.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      isSelected
                        ? `${platform.bgColor} border-2 ${platform.borderColor}`
                        : 'bg-gray-700/30 border-2 border-transparent hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${platform.color}`} />
                    <span className="font-medium">{platform.name}</span>
                    {isSelected && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-green-400"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Analytics Preview */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Quick Analytics
              </h3>
              <div className="space-y-3">
                {mockAnalytics.slice(0, 3).map((data) => (
                  <div key={data.platform} className="bg-gray-700/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{data.platform}</span>
                      <span className="text-xs text-green-400">{data.growth}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Engagement: {data.engagement}%</span>
                      <span>Reach: {(data.reach / 1000).toFixed(1)}K</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 flex flex-col h-[600px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-purple-500'
                        : 'bg-gradient-to-br from-pink-500 to-purple-500'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <span className="text-sm font-bold">U</span>
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-purple-500/20 border border-purple-500/30'
                        : 'bg-gray-700/50 border border-gray-600'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    {message.platform && (
                      <div className="mt-2 text-xs text-gray-400">
                        Platform: {message.platform}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex-1 rounded-2xl p-4 bg-gray-700/50 border border-gray-600">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="px-6 py-3 border-t border-gray-700">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(action)}
                    className="px-3 py-1.5 bg-gray-700/50 hover:bg-gray-700 rounded-full text-xs whitespace-nowrap transition-colors border border-gray-600"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-6 border-t border-gray-700">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me to create content, analyze data, schedule posts..."
                  className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 font-medium transition-all flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-6">
            <Calendar className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Scheduling</h3>
            <p className="text-gray-400 text-sm">
              AI-powered optimal posting times and content calendar management across all platforms
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-2xl p-6">
            <MessageSquare className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Content Generation</h3>
            <p className="text-gray-400 text-sm">
              Create engaging posts, captions, hashtags, and content strategies tailored to each platform
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6">
            <TrendingUp className="w-10 h-10 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics & Insights</h3>
            <p className="text-gray-400 text-sm">
              Track performance, engagement metrics, and get actionable insights to grow your audience
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
