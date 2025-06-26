import React, { useState } from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Calendar, 
  Clock,
  Target,
  Zap,
  Brain,
  BarChart3,
  Video,
  MessageCircle,
  Music,
  Camera,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Users,
  Heart,
  Share
} from 'lucide-react';
import { mockChannels } from '../data/mockData';

interface AutomationRule {
  id: string;
  channelId: string;
  name: string;
  enabled: boolean;
  triggerType: 'schedule' | 'performance' | 'trending';
  schedule?: {
    days: string[];
    times: string[];
  };
  contentType: 'video' | 'post' | 'story';
  aiOptimization: boolean;
  lastRun?: string;
  nextRun?: string;
  performance: {
    successRate: number;
    avgEngagement: number;
    revenueGenerated: number;
  };
}

const mockAutomationRules: AutomationRule[] = [
  {
    id: '1',
    channelId: '1',
    name: 'テックレビュー自動投稿',
    enabled: true,
    triggerType: 'schedule',
    schedule: {
      days: ['月', '水', '金'],
      times: ['09:00', '18:00']
    },
    contentType: 'video',
    aiOptimization: true,
    lastRun: '2024-01-15T09:00:00Z',
    nextRun: '2024-01-17T09:00:00Z',
    performance: {
      successRate: 92,
      avgEngagement: 8.5,
      revenueGenerated: 25000
    }
  },
  {
    id: '2',
    channelId: '2',
    name: 'トレンド自動投稿',
    enabled: true,
    triggerType: 'trending',
    contentType: 'post',
    aiOptimization: true,
    lastRun: '2024-01-15T11:30:00Z',
    nextRun: '2024-01-16T15:00:00Z',
    performance: {
      successRate: 88,
      avgEngagement: 12.3,
      revenueGenerated: 15000
    }
  }
];

const mockAnalysisData = {
  bestPostingTimes: ['09:00', '12:00', '18:00', '21:00'],
  topHashtags: ['#テクノロジー', '#AI', '#プログラミング', '#レビュー', '#最新技術'],
  engagementPeaks: {
    weekdays: 78,
    weekends: 65,
    morning: 82,
    afternoon: 71,
    evening: 95,
    night: 58
  },
  contentSuggestions: [
    { type: 'AI関連ニュース', score: 95, trend: '+15%' },
    { type: 'プログラミングチュートリアル', score: 88, trend: '+8%' },
    { type: '製品レビュー', score: 92, trend: '+12%' },
    { type: 'テクノロジートレンド', score: 85, trend: '+5%' }
  ]
};

export default function Automation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [selectedChannel, setSelectedChannel] = useState<string>('all');

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
    instagram: 'bg-yellow-500'
  };

  const toggleAutomation = (ruleId: string) => {
    setAutomationRules(rules => 
      rules.map(rule => 
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const tabs = [
    { key: 'overview', label: '概要', icon: BarChart3 },
    { key: 'rules', label: '自動化ルール', icon: Bot },
    { key: 'analysis', label: '投稿分析', icon: Brain },
    { key: 'optimization', label: 'AI最適化', icon: Zap },
    { key: 'schedule', label: 'スケジュール', icon: Calendar }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">自動化設定</h1>
          <p className="text-gray-400">AI分析による投稿最適化と自動化管理</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <select 
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="all">すべてのチャンネル</option>
            {mockChannels.map(channel => (
              <option key={channel.id} value={channel.id}>{channel.name}</option>
            ))}
          </select>
          <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-3 py-2 rounded-lg flex items-center justify-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors text-sm">
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">分析更新</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-4 lg:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 lg:px-2 border-b-2 font-medium text-xs lg:text-sm flex items-center space-x-1 lg:space-x-2 transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-yellow-500 text-yellow-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-3 h-3 lg:w-4 lg:h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-400" />
                </div>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white mb-1">{automationRules.filter(r => r.enabled).length}</p>
                <p className="text-gray-400 text-xs lg:text-sm">アクティブルール</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Target className="w-5 h-5 lg:w-6 lg:h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white mb-1">91%</p>
                <p className="text-gray-400 text-xs lg:text-sm">平均成功率</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-purple-400" />
                </div>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white mb-1">+23%</p>
                <p className="text-gray-400 text-xs lg:text-sm">エンゲージメント向上</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400" />
                </div>
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-white mb-1">¥40k</p>
                <p className="text-gray-400 text-xs lg:text-sm">今月の自動収益</p>
              </div>
            </div>
          </div>

          {/* Active Automations */}
          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">アクティブな自動化</h2>
            <div className="space-y-4">
              {automationRules.filter(rule => rule.enabled).map((rule) => {
                const channel = mockChannels.find(c => c.id === rule.channelId);
                if (!channel) return null;

                return (
                  <div key={rule.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 lg:p-4 bg-gray-700 rounded-lg space-y-2 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${platformColors[channel.platform]}`}>
                        {React.createElement(platformIcons[channel.platform], { className: "w-4 h-4 lg:w-5 lg:h-5 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm lg:text-base">{rule.name}</h3>
                        <p className="text-gray-400 text-xs lg:text-sm">{channel.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-xs lg:text-sm font-medium">
                        次回実行: {rule.nextRun ? new Date(rule.nextRun).toLocaleString('ja-JP') : '未設定'}
                      </div>
                      <div className="text-gray-400 text-xs lg:text-sm">
                        成功率: {rule.performance.successRate}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-xl font-bold text-white">自動化ルール管理</h2>
            <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-3 py-2 rounded-lg flex items-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors text-sm">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">新規ルール作成</span>
              <span className="sm:hidden">新規</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {automationRules.map((rule) => {
              const channel = mockChannels.find(c => c.id === rule.channelId);
              if (!channel) return null;

              return (
                <div key={rule.id} className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${platformColors[channel.platform]}`}>
                        {React.createElement(platformIcons[channel.platform], { className: "w-5 h-5 lg:w-6 lg:h-6 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-bold text-white">{rule.name}</h3>
                        <p className="text-gray-400 text-sm lg:text-base">{channel.name}</p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => toggleAutomation(rule.id)}
                        className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-colors ${
                          rule.enabled 
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                            : 'bg-gray-600/20 text-gray-400 hover:bg-gray-600/30'
                        }`}
                      >
                        {rule.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <span>{rule.enabled ? '停止' : '開始'}</span>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors self-center">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-4">
                    <div className="bg-gray-700 rounded-lg p-3 lg:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400 text-xs lg:text-sm">成功率</span>
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-white">{rule.performance.successRate}%</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 lg:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Heart className="w-4 h-4 text-pink-400" />
                        <span className="text-gray-400 text-xs lg:text-sm">平均エンゲージメント</span>
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-white">{rule.performance.avgEngagement}%</p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-3 lg:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-gray-400 text-xs lg:text-sm">生成収益</span>
                      </div>
                      <p className="text-lg lg:text-xl font-bold text-white">¥{rule.performance.revenueGenerated.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between text-xs lg:text-sm space-y-2 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <span className="text-gray-400 whitespace-nowrap">
                        トリガー: <span className="text-white">{rule.triggerType === 'schedule' ? 'スケジュール' : rule.triggerType === 'performance' ? 'パフォーマンス' : 'トレンド'}</span>
                      </span>
                      <span className="text-gray-400 whitespace-nowrap">
                        コンテンツ: <span className="text-white">{rule.contentType === 'video' ? '動画' : rule.contentType === 'post' ? '投稿' : 'ストーリー'}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {rule.aiOptimization && (
                        <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded text-xs whitespace-nowrap">AI最適化</span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${rule.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {rule.enabled ? 'アクティブ' : '停止中'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">最適投稿時間</h2>
              <div className="space-y-4">
                {mockAnalysisData.bestPostingTimes.map((time, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm lg:text-base">{time}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 lg:w-32 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
                          style={{ width: `${80 + index * 5}%` }}
                        />
                      </div>
                      <span className="text-white text-xs lg:text-sm">{80 + index * 5}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">人気ハッシュタグ</h2>
              <div className="flex flex-wrap gap-2">
                {mockAnalysisData.topHashtags.map((hashtag, index) => (
                  <span 
                    key={index}
                    className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">エンゲージメント分析</h2>
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {Object.entries(mockAnalysisData.engagementPeaks).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="bg-gray-700 rounded-lg p-3 lg:p-4">
                    <p className="text-lg lg:text-2xl font-bold text-white">{value}%</p>
                    <p className="text-gray-400 text-xs lg:text-sm capitalize">
                      {key === 'weekdays' ? '平日' : 
                       key === 'weekends' ? '週末' : 
                       key === 'morning' ? '朝' : 
                       key === 'afternoon' ? '昼' : 
                       key === 'evening' ? '夕' : '夜'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">コンテンツ提案</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockAnalysisData.contentSuggestions.map((suggestion, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-3 lg:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-medium text-sm lg:text-base">{suggestion.type}</h3>
                    <span className="text-green-400 text-xs lg:text-sm">{suggestion.trend}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-green-400 h-2 rounded-full"
                        style={{ width: `${suggestion.score}%` }}
                      />
                    </div>
                    <span className="text-white text-xs lg:text-sm">{suggestion.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Optimization Tab */}
      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">AI最適化設定</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">タイトル最適化</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">ハッシュタグ自動生成</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">投稿時間最適化</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">トレンド分析</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">A/Bテスト自動実行</label>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium text-sm lg:text-base">コンテンツ品質分析</label>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">AI改善提案</h2>
            <div className="space-y-4">
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm lg:text-base">タイトル改善提案</span>
                </div>
                <p className="text-gray-300 mb-2 text-sm lg:text-base">現在のタイトル: "新しいAI技術について"</p>
                <p className="text-white text-sm lg:text-base">推奨タイトル: "2024年最新AI技術が変える未来 | 驚愕の新機能を徹底解説"</p>
                <p className="text-green-400 text-xs lg:text-sm mt-2">予想エンゲージメント向上: +25%</p>
              </div>

              <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium text-sm lg:text-base">投稿時間最適化</span>
                </div>
                <p className="text-gray-300 mb-2 text-sm lg:text-base">現在の投稿時間: 14:00</p>
                <p className="text-white text-sm lg:text-base">推奨投稿時間: 18:30 (エンゲージメント +35%)</p>
              </div>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-medium text-sm lg:text-base">ハッシュタグ最適化</span>
                </div>
                <p className="text-white text-sm lg:text-base">推奨ハッシュタグ: #AI最新技術 #2024トレンド #テクノロジー解説 #未来予測</p>
                <p className="text-green-400 text-xs lg:text-sm mt-2">リーチ拡大予想: +40%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">投稿スケジュール</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-1 lg:gap-2 text-center">
                {['月', '火', '水', '木', '金', '土', '日'].map((day) => (
                  <div key={day} className="text-gray-400 font-medium py-1 lg:py-2 text-xs lg:text-sm">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 lg:gap-2">
                {Array.from({ length: 35 }, (_, i) => {
                  const hasSchedule = Math.random() > 0.7;
                  return (
                    <div 
                      key={i}
                      className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs lg:text-sm ${
                        hasSchedule 
                          ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400' 
                          : 'border-gray-700 hover:border-gray-600 text-gray-400'
                      }`}
                    >
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">今日の予定投稿</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">09:00 - YouTube</p>
                      <p className="text-gray-400 text-xs lg:text-sm">Tech Reviews Japan</p>
                    </div>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs whitespace-nowrap">予約済み</span>
                </div>

                <div className="flex items-center justify-between p-3 lg:p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">18:30 - Twitter</p>
                      <p className="text-gray-400 text-xs lg:text-sm">Daily Tech News</p>
                    </div>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs whitespace-nowrap">処理中</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">週間統計</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm lg:text-base">予定投稿数</span>
                  <span className="text-white font-bold text-sm lg:text-base">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm lg:text-base">完了投稿数</span>
                  <span className="text-green-400 font-bold text-sm lg:text-base">22</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm lg:text-base">成功率</span>
                  <span className="text-green-400 font-bold text-sm lg:text-base">91.7%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm lg:text-base">平均エンゲージメント</span>
                  <span className="text-blue-400 font-bold text-sm lg:text-base">+18.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}