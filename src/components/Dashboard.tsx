import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Play,
  Pause,
  AlertTriangle,
  Video,
  MessageCircle,
  Music,
  Camera
} from 'lucide-react';
import { mockChannels, mockRevenueData, mockPlatformStats } from '../data/mockData';

export default function Dashboard() {
  const platformIcons = {
    YouTube: Video,
    Twitter: MessageCircle,
    TikTok: Music,
    Instagram: Camera
  };

  const platformColors = {
    YouTube: 'bg-red-500',
    Twitter: 'bg-blue-500',
    TikTok: 'bg-pink-500',
    Instagram: 'bg-yellow-500'
  };

  const totalRevenue = mockChannels.reduce((sum, channel) => sum + channel.revenue, 0);
  const totalSubscribers = mockChannels.reduce((sum, channel) => sum + channel.subscribers, 0);
  const activeChannels = mockChannels.filter(channel => channel.status === 'active').length;
  const todayRevenue = mockRevenueData[mockRevenueData.length - 1]?.total || 0;

  const stats = [
    {
      title: '総収益',
      value: `¥${totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: '今日の収益',
      value: `¥${todayRevenue.toLocaleString()}`,
      change: '+8.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      title: '総フォロワー',
      value: totalSubscribers.toLocaleString(),
      change: '+15.2%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-400'
    },
    {
      title: 'アクティブチャンネル',
      value: activeChannels.toString(),
      change: '0%',
      trend: 'stable',
      icon: Play,
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ダッシュボード</h1>
        <p className="text-gray-400">自動化システムの概要と収益状況</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gray-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 
                stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                {stat.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <p className="text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-xs lg:text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">週間収益推移</h2>
        <div className="h-48 lg:h-64 flex items-end justify-between space-x-1 lg:space-x-2">
          {mockRevenueData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-700 rounded-t-lg relative overflow-hidden">
                <div 
                  className="bg-gradient-to-t from-yellow-500 to-green-400 rounded-t-lg transition-all duration-500"
                  style={{ height: `${(data.total / 45000) * 160}px` }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1 lg:mt-2">
                {new Date(data.date).getDate()}日
              </div>
              <div className="text-xs text-white font-medium hidden lg:block">
                ¥{(data.total / 1000).toFixed(0)}k
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">プラットフォーム別収益</h2>
          <div className="space-y-4">
            {mockPlatformStats.map((platform, index) => (
              <div key={index} className="flex items-center justify-between p-3 lg:p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${platformColors[platform.platform]}`}>
                    {React.createElement(platformIcons[platform.platform], { className: "w-4 h-4 text-white" })}
                  </div>
                  <span className="text-white font-medium text-sm lg:text-base">{platform.platform}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-sm lg:text-base">¥{platform.totalRevenue.toLocaleString()}</div>
                  <div className={`text-sm ${
                    platform.monthlyGrowth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {platform.monthlyGrowth > 0 ? '+' : ''}{platform.monthlyGrowth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
          <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">システム状態</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 lg:p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Play className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium text-sm lg:text-base">自動投稿</span>
              </div>
              <span className="text-green-400 text-xs lg:text-sm">正常稼働中</span>
            </div>
            
            <div className="flex items-center justify-between p-3 lg:p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm lg:text-base">収益最適化</span>
              </div>
              <span className="text-blue-400 text-xs lg:text-sm">アクティブ</span>
            </div>
            
            <div className="flex items-center justify-between p-3 lg:p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-medium text-sm lg:text-base">API制限警告</span>
              </div>
              <span className="text-yellow-400 text-xs lg:text-sm">注意</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}