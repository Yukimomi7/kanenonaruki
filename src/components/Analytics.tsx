import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  Video,
  MessageCircle,
  Music,
  Camera
} from 'lucide-react';
import { mockRevenueData, mockChannels } from '../data/mockData';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  const platformIcons = {
    youtube: Video,
    twitter: MessageCircle,
    tiktok: Music,
    instagram: Camera
  };

  const totalRevenue = mockChannels.reduce((sum, channel) => sum + channel.revenue, 0);
  const monthlyGrowth = 12.5;
  const avgDailyRevenue = mockRevenueData.reduce((sum, data) => sum + data.total, 0) / mockRevenueData.length;

  const platforms = ['all', 'youtube', 'twitter', 'tiktok', 'instagram'];
  const periods = [
    { key: '7days', label: '過去7日' },
    { key: '30days', label: '過去30日' },
    { key: '90days', label: '過去90日' },
    { key: '1year', label: '過去1年' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">収益分析</h1>
          <p className="text-gray-400">詳細な収益データと分析結果</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {periods.map(period => (
              <option key={period.key} value={period.key}>{period.label}</option>
            ))}
          </select>
          <select 
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">すべてのプラットフォーム</option>
            {platforms.slice(1).map(platform => (
              <option key={platform} value={platform}>{platform.toUpperCase()}</option>
            ))}
          </select>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-blue-600 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">エクスポート</span>
          </button>
          <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors text-sm">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">レポート</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
            </div>
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+{monthlyGrowth}%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">¥{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-400 text-sm lg:text-base">総収益</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Calendar className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
            </div>
            <div className="flex items-center space-x-1 text-blue-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+8.2%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">¥{Math.round(avgDailyRevenue).toLocaleString()}</p>
            <p className="text-gray-400 text-sm lg:text-base">平均日収</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
            </div>
            <div className="flex items-center space-x-1 text-red-400 text-sm">
              <TrendingDown className="w-4 h-4" />
              <span>-2.1%</span>
            </div>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-bold text-white mb-1">¥{Math.round(totalRevenue * 0.25).toLocaleString()}</p>
            <p className="text-gray-400 text-sm lg:text-base">今月予測</p>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base lg:text-xl font-bold text-white">収益推移</h2>
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-400">YouTube</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Twitter</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <span className="text-sm text-gray-400">TikTok</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-400">Instagram</span>
            </div>
          </div>
        </div>
        <div className="h-48 lg:h-80 flex items-end justify-between space-x-1">
          {mockRevenueData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full relative" style={{ height: window.innerWidth < 1024 ? '140px' : '240px' }}>
                <div className="absolute bottom-0 w-full flex flex-col">
                  <div 
                    className="bg-red-500 rounded-t-sm"
                    style={{ height: `${(data.youtube / 25000) * (window.innerWidth < 1024 ? 140 : 240)}px` }}
                  />
                  <div 
                    className="bg-blue-500"
                    style={{ height: `${(data.twitter / 25000) * (window.innerWidth < 1024 ? 140 : 240)}px` }}
                  />
                  <div 
                    className="bg-pink-500"
                    style={{ height: `${(data.tiktok / 25000) * (window.innerWidth < 1024 ? 140 : 240)}px` }}
                  />
                  <div 
                    className="bg-yellow-500"
                    style={{ height: `${(data.instagram / 25000) * (window.innerWidth < 1024 ? 140 : 240)}px` }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1 lg:mt-2">
                {new Date(data.date).getDate()}日
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
          <h2 className="text-base lg:text-xl font-bold text-white mb-4 lg:mb-6">プラットフォーム別収益</h2>
          <div className="space-y-4">
            {mockChannels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 lg:p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img 
                    src={channel.avatar} 
                    alt={channel.name}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-sm lg:text-base truncate">{channel.name}</p>
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      {React.createElement(platformIcons[channel.platform], { className: "w-3 h-3" })}
                      <span className="hidden lg:inline">{channel.platform.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm lg:text-base">¥{channel.revenue.toLocaleString()}</div>
                  <div className="text-gray-400 text-xs lg:text-sm">
                    {((channel.revenue / totalRevenue) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
          <h2 className="text-base lg:text-xl font-bold text-white mb-4 lg:mb-6">月間トレンド</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm lg:text-base">今月の成長率</span>
              <span className="text-green-400 font-bold text-sm lg:text-base">+12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm lg:text-base">最高日収</span>
              <span className="text-white font-bold text-sm lg:text-base">¥{Math.max(...mockRevenueData.map(d => d.total)).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm lg:text-base">平均日収</span>
              <span className="text-white font-bold text-sm lg:text-base">¥{Math.round(avgDailyRevenue).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm lg:text-base">アクティブチャンネル</span>
              <span className="text-white font-bold text-sm lg:text-base">{mockChannels.filter(c => c.status === 'active').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}