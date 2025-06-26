import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Users, 
  DollarSign,
  ExternalLink,
  Settings,
  Video,
  MessageCircle,
  Music,
  Camera
} from 'lucide-react';
import { mockChannels } from '../data/mockData';
import { Channel } from '../types';

export default function ChannelManagement() {
  const [channels, setChannels] = useState<Channel[]>(mockChannels);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

  const platformIcons = {
    youtube: Video,
    twitter: MessageCircle,
    tiktok: Music,
    instagram: Camera
  };

  const platformColors = {
    youtube: 'bg-red-500',
    twitter: 'bg-blue-500',
    tiktok: 'bg-pink-500',
    instagram: 'bg-purple-500'
  };

  const toggleAutomation = (channelId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, automationEnabled: !channel.automationEnabled }
        : channel
    ));
  };

  const deleteChannel = (channelId: string) => {
    setChannels(channels.filter(channel => channel.id !== channelId));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">チャンネル管理</h1>
          <p className="text-gray-400">各プラットフォームのチャンネルを管理</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>チャンネル追加</span>
        </button>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {channels.map((channel) => (
          <div key={channel.id} className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={channel.avatar} 
                  alt={channel.name}
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-white truncate">{channel.name}</h3>
                  <p className="text-gray-400 text-xs lg:text-sm">{channel.username}</p>
                </div>
              </div>
              <div className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${platformColors[channel.platform]} text-white`}>
                <div className="flex items-center space-x-1">
                  {React.createElement(platformIcons[channel.platform], { className: "w-3 h-3" })}
                  <span className="hidden lg:inline">{channel.platform.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-700 rounded-lg p-2 lg:p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">フォロワー</span>
                </div>
                <p className="text-sm lg:text-lg font-bold text-white">{channel.subscribers.toLocaleString()}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-2 lg:p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">月収益</span>
                </div>
                <p className="text-sm lg:text-lg font-bold text-white">¥{channel.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  channel.status === 'active' ? 'bg-green-400' :
                  channel.status === 'paused' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className="text-sm text-gray-400">
                  {channel.status === 'active' ? 'アクティブ' :
                   channel.status === 'paused' ? '一時停止' : 'エラー'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">
                  {channel.automationEnabled ? '自動化ON' : '自動化OFF'}
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between space-y-2 lg:space-y-0 lg:space-x-2">
              <button
                onClick={() => toggleAutomation(channel.id)}
                className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  channel.automationEnabled 
                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                    : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
              >
                {channel.automationEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{channel.automationEnabled ? '停止' : '開始'}</span>
              </button>
              
              <div className="flex items-center justify-center space-x-2 lg:justify-end">
                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteChannel(channel.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Channel Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">新しいチャンネルを追加</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">プラットフォーム</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="youtube">YouTube</option>
                  <option value="twitter">Twitter</option>
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">チャンネル名</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="チャンネル名を入力"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">ユーザー名</label>
                <input 
                  type="text" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">APIキー</label>
                <input 
                  type="password" 
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="APIキーを入力"
                />
              </div>
              <div className="flex items-center justify-end space-x-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                >
                  キャンセル
                </button>
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-3 rounded-lg hover:from-yellow-600 hover:to-green-600 transition-colors"
                >
                  追加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}