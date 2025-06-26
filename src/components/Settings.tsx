import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Database, 
  Key, 
  Globe, 
  Download, 
  Upload,
  Save,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Trash2,
  RefreshCw,
  Settings as SettingsIcon,
  Zap,
  DollarSign,
  Target,
  Video,
  MessageCircle,
  Music,
  Camera
} from 'lucide-react';

interface APIKey {
  id: string;
  platform: string;
  name: string;
  status: 'active' | 'expired' | 'invalid';
  lastUsed: string;
  isVisible: boolean;
  key: string;
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [apiKeys, setApiKeys] = useState<APIKey[]>([
    {
      id: '1',
      platform: 'youtube',
      name: 'YouTube Data API',
      status: 'active',
      lastUsed: '2024-01-15T10:30:00Z',
      isVisible: false,
      key: 'AIzaSyB-9tXxvFvn4cWNwq8gxIi2HhxhchzOOOO'
    },
    {
      id: '2',
      platform: 'twitter',
      name: 'Twitter API v2',
      status: 'active',
      lastUsed: '2024-01-15T09:15:00Z',
      isVisible: false,
      key: 'AAAAAAAAAAAAAAAAAAAAAFTVQEAAAAAAN1bGVhNTdlOGM0YzFkYTdlOGNjNjFhZGVmYTI1MTEwOGY'
    },
    {
      id: '3',
      platform: 'instagram',
      name: 'Instagram Basic Display',
      status: 'expired',
      lastUsed: '2024-01-10T14:20:00Z',
      isVisible: false,
      key: 'IGQVJYWEhVVEdYX2VxS1V5Tk9sV3JCRTBBczNUT0g1QVN4TEROZAm5R'
    }
  ]);

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    revenue: true,
    errors: true,
    weekly: true,
    monthly: false
  });

  const [plan, setPlan] = useState('pro');

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

  const toggleAPIVisibility = (keyId: string) => {
    setApiKeys(keys => 
      keys.map(key => 
        key.id === keyId ? { ...key, isVisible: !key.isVisible } : key
      )
    );
  };

  const deleteAPIKey = (keyId: string) => {
    setApiKeys(keys => keys.filter(key => key.id !== keyId));
  };

  const tabs = [
    { key: 'profile', label: 'プロフィール', icon: User },
    { key: 'api', label: 'API設定', icon: Key },
    { key: 'notifications', label: '通知設定', icon: Bell },
    { key: 'security', label: 'セキュリティ', icon: Shield },
    { key: 'billing', label: '課金・プラン', icon: CreditCard },
    { key: 'data', label: 'データ管理', icon: Database },
    { key: 'system', label: 'システム設定', icon: SettingsIcon }
  ];

  const plans = [
    {
      name: 'ベーシック',
      price: 0,
      features: ['3チャンネル', '基本分析', 'メールサポート'],
      current: plan === 'basic'
    },
    {
      name: 'プロ',
      price: 9800,
      features: ['無制限チャンネル', 'AI最適化', '優先サポート', 'カスタム分析'],
      current: plan === 'pro',
      popular: true
    },
    {
      name: 'エンタープライズ',
      price: 29800,
      features: ['すべてのプロ機能', 'API制限なし', '専用サポート', 'カスタム統合'],
      current: plan === 'enterprise'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">設定</h1>
          <p className="text-gray-400">アカウントとシステムの設定管理</p>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors">
          <Save className="w-5 h-5" />
          <span>変更を保存</span>
        </button>
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

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">プロフィール情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">ユーザー名</label>
                  <input 
                    type="text" 
                    defaultValue="金のなる木ユーザー"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">メールアドレス</label>
                  <input 
                    type="email" 
                    defaultValue="user@kinnonaruki.jp"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">タイムゾーン</label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                </div>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                  画像を変更
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">言語・地域設定</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">表示言語</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="ja">日本語</option>
                  <option value="en">English</option>
                  <option value="ko">한국어</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">通貨</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="JPY">日本円 (¥)</option>
                  <option value="USD">米ドル ($)</option>
                  <option value="EUR">ユーロ (€)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Settings Tab */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">API キー管理</h2>
              <button className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:from-yellow-600 hover:to-green-600 transition-colors">
                <Key className="w-4 h-4" />
                <span>新しいAPIキー</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${platformColors[apiKey.platform]}`}>
                        {React.createElement(platformIcons[apiKey.platform], { className: "w-4 h-4 text-white" })}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{apiKey.name}</h3>
                        <p className="text-gray-400 text-sm">
                          最後の使用: {new Date(apiKey.lastUsed).toLocaleString('ja-JP')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        apiKey.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        apiKey.status === 'expired' ? 'bg-red-500/20 text-red-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {apiKey.status === 'active' ? 'アクティブ' :
                         apiKey.status === 'expired' ? '期限切れ' : '無効'}
                      </span>
                      <button
                        onClick={() => toggleAPIVisibility(apiKey.id)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded transition-colors"
                      >
                        {apiKey.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteAPIKey(apiKey.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-600 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                    <span className="text-gray-300">
                      {apiKey.isVisible ? apiKey.key : '•'.repeat(apiKey.key.length)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">API使用状況</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Video className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400 text-sm">YouTube</span>
                </div>
                <p className="text-white text-lg font-bold">8,450 / 10,000</p>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '84.5%' }}></div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 text-sm">Twitter</span>
                </div>
                <p className="text-white text-lg font-bold">2,100 / 5,000</p>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Music className="w-4 h-4 text-pink-400" />
                  <span className="text-gray-400 text-sm">TikTok</span>
                </div>
                <p className="text-white text-lg font-bold">1,200 / 3,000</p>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-pink-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Camera className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-400 text-sm">Instagram</span>
                </div>
                <p className="text-white text-lg font-bold">980 / 2,000</p>
                <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '49%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">通知設定</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">通知方法</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">メール通知</p>
                      <p className="text-gray-400 text-sm">重要な更新をメールで受け取る</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">プッシュ通知</p>
                      <p className="text-gray-400 text-sm">ブラウザ通知を受け取る</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">SMS通知</p>
                      <p className="text-gray-400 text-sm">緊急時にSMSで通知</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.sms}
                      onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">通知内容</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">収益アラート</p>
                      <p className="text-gray-400 text-sm">収益に関する重要な変更</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.revenue}
                      onChange={(e) => setNotifications({...notifications, revenue: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">エラー通知</p>
                      <p className="text-gray-400 text-sm">システムエラーや問題</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.errors}
                      onChange={(e) => setNotifications({...notifications, errors: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">週次レポート</p>
                      <p className="text-gray-400 text-sm">毎週のパフォーマンス概要</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.weekly}
                      onChange={(e) => setNotifications({...notifications, weekly: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">月次レポート</p>
                      <p className="text-gray-400 text-sm">詳細な月間分析</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.monthly}
                      onChange={(e) => setNotifications({...notifications, monthly: e.target.checked})}
                      className="toggle"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">セキュリティ設定</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">パスワード</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">現在のパスワード</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">新しいパスワード</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">パスワード確認</label>
                    <input 
                      type="password" 
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                    パスワードを更新
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">二段階認証</h3>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-blue-400 font-medium">二段階認証が有効です</span>
                  </div>
                  <p className="text-gray-300 mb-4">アカウントのセキュリティが強化されています。</p>
                  <button className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                    二段階認証を無効にする
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">アクティブセッション</h3>
                <div className="space-y-3">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">現在のセッション</p>
                        <p className="text-gray-400 text-sm">Tokyo, Japan • Chrome • 今</p>
                      </div>
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">現在</span>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">モバイルアプリ</p>
                        <p className="text-gray-400 text-sm">Tokyo, Japan • iPhone • 2時間前</p>
                      </div>
                      <button className="text-red-400 hover:text-red-300 text-sm">
                        終了
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-4 lg:p-6 border border-gray-700">
            <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">現在のプラン</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((planItem, index) => (
                <div key={index} className={`relative bg-gray-700 rounded-xl p-4 lg:p-6 border-2 transition-colors ${
                  planItem.current ? 'border-yellow-500' : 'border-gray-600 hover:border-gray-500'
                }`}>
                  {planItem.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-yellow-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        人気
                      </span>
                    </div>
                  )}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{planItem.name}</h3>
                    <div className="mb-4">
                      <span className="text-2xl lg:text-3xl font-bold text-white">¥{planItem.price.toLocaleString()}</span>
                      <span className="text-gray-400">/月</span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {planItem.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-300 text-sm">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      planItem.current 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-yellow-500 to-green-500 text-white hover:from-yellow-600 hover:to-green-600'
                    } text-sm lg:text-base`}>
                      {planItem.current ? '現在のプラン' : 'プラン変更'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">支払い履歴</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">2024年1月 - プロプラン</p>
                  <p className="text-gray-400 text-sm">2024/01/01</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">¥9,800</p>
                  <p className="text-green-400 text-sm">支払い済み</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-white font-medium">2023年12月 - プロプラン</p>
                  <p className="text-gray-400 text-sm">2023/12/01</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">¥9,800</p>
                  <p className="text-green-400 text-sm">支払い済み</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Tab */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">データ管理</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">データエクスポート</h3>
                <p className="text-gray-400 text-sm mb-4">アカウントデータをダウンロードできます</p>
                <div className="space-y-3">
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>チャンネルデータ</span>
                  </button>
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>収益データ</span>
                  </button>
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>自動化ログ</span>
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">データインポート</h3>
                <p className="text-gray-400 text-sm mb-4">バックアップからデータを復元</p>
                <div className="space-y-3">
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>設定をインポート</span>
                  </button>
                  <button className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>チャンネルをインポート</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">危険な操作</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">すべてのデータを削除</h3>
                <p className="text-gray-400 text-sm mb-4">
                  この操作は取り消すことができません。すべてのチャンネル、収益データ、設定が完全に削除されます。
                </p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>アカウントを削除</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Tab */}
      {activeTab === 'system' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">システム設定</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">自動化設定</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">自動投稿を有効にする</p>
                      <p className="text-gray-400 text-sm">システム全体の自動投稿機能</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">AI最適化を有効にする</p>
                      <p className="text-gray-400 text-sm">AI による投稿内容の自動最適化</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">エラー時の自動再試行</p>
                      <p className="text-gray-400 text-sm">投稿失敗時の自動リトライ</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-4">パフォーマンス設定</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">同時実行数</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                      <option value="1">1 (低負荷)</option>
                      <option value="3" selected>3 (標準)</option>
                      <option value="5">5 (高パフォーマンス)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">データ保存期間</label>
                    <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                      <option value="30">30日</option>
                      <option value="90" selected>90日</option>
                      <option value="365">1年</option>
                      <option value="unlimited">無制限</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-6">システム情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">バージョン</span>
                  <span className="text-white">v2.1.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">最終更新</span>
                  <span className="text-white">2024/01/15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">稼働時間</span>
                  <span className="text-white">99.9%</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">サーバー地域</span>
                  <span className="text-white">Asia-Pacific</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">データセンター</span>
                  <span className="text-white">Tokyo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">バックアップ</span>
                  <span className="text-green-400">毎日実行中</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}