import React from 'react';
import { BarChart3, PanelTop as Channels, Settings, DollarSign, TreePine, Bot, X } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'ダッシュボード', icon: BarChart3, key: 'dashboard' },
  { name: 'チャンネル管理', icon: Channels, key: 'channels' },
  { name: '収益分析', icon: DollarSign, key: 'analytics' },
  { name: '自動化設定', icon: Bot, key: 'automation' },
  { name: '設定', icon: Settings, key: 'settings' },
];

export default function Sidebar({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) {
  return (
    <div className={`
      w-64 bg-gray-900 text-white h-screen flex flex-col
      lg:relative lg:translate-x-0
      fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:block
    `}>
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-green-500 rounded-lg flex items-center justify-center">
            <TreePine className="w-6 h-6 text-yellow-100" />
          </div>
          <div>
            <h1 className="text-xl font-bold">金のなる木</h1>
            <p className="text-gray-400 text-sm">自動収益システム</p>
          </div>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <button
            key={item.key}
            onClick={() => onPageChange(item.key)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === item.key
                ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="text-sm text-gray-400 hidden lg:block">
          <p>Total Revenue</p>
          <p className="text-2xl font-bold text-yellow-400">¥308,000</p>
        </div>
      </div>
    </div>
  );
}