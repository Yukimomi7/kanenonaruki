export interface Channel {
  id: string;
  name: string;
  platform: 'youtube' | 'twitter' | 'tiktok' | 'instagram';
  username: string;
  subscribers: number;
  revenue: number;
  monthlyRevenue: number;
  status: 'active' | 'paused' | 'error';
  lastUpdated: string;
  automationEnabled: boolean;
  avatar: string;
}

export interface RevenueData {
  date: string;
  youtube: number;
  twitter: number;
  tiktok: number;
  instagram: number;
  total: number;
}

export interface PlatformStats {
  platform: string;
  totalRevenue: number;
  monthlyGrowth: number;
  channels: number;
  averageRevenue: number;
}