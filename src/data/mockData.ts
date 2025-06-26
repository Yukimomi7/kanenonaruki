import { Channel, RevenueData, PlatformStats } from '../types';

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Tech Reviews Japan',
    platform: 'youtube',
    username: '@techreviewsjp',
    subscribers: 150000,
    revenue: 125000,
    monthlyRevenue: 15000,
    status: 'active',
    lastUpdated: '2024-01-15T10:30:00Z',
    automationEnabled: true,
    avatar: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Daily Tech News',
    platform: 'twitter',
    username: '@dailytechnews',
    subscribers: 85000,
    revenue: 45000,
    monthlyRevenue: 5500,
    status: 'active',
    lastUpdated: '2024-01-15T09:15:00Z',
    automationEnabled: true,
    avatar: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '3',
    name: 'Code with Sarah',
    platform: 'youtube',
    username: '@codewithsarah',
    subscribers: 95000,
    revenue: 78000,
    monthlyRevenue: 12000,
    status: 'active',
    lastUpdated: '2024-01-15T11:45:00Z',
    automationEnabled: false,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '4',
    name: 'Viral Trends',
    platform: 'tiktok',
    username: '@viraltrends',
    subscribers: 250000,
    revenue: 32000,
    monthlyRevenue: 8000,
    status: 'paused',
    lastUpdated: '2024-01-14T16:20:00Z',
    automationEnabled: true,
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  },
  {
    id: '5',
    name: 'Design Inspiration',
    platform: 'instagram',
    username: '@designinspiration',
    subscribers: 120000,
    revenue: 28000,
    monthlyRevenue: 4200,
    status: 'active',
    lastUpdated: '2024-01-15T08:30:00Z',
    automationEnabled: true,
    avatar: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
  }
];

export const mockRevenueData: RevenueData[] = [
  { date: '2024-01-01', youtube: 18000, twitter: 4500, tiktok: 6000, instagram: 3200, total: 31700 },
  { date: '2024-01-02', youtube: 19200, twitter: 4800, tiktok: 6200, instagram: 3400, total: 33600 },
  { date: '2024-01-03', youtube: 17800, twitter: 4600, tiktok: 5800, instagram: 3100, total: 31300 },
  { date: '2024-01-04', youtube: 20500, twitter: 5100, tiktok: 6800, instagram: 3700, total: 36100 },
  { date: '2024-01-05', youtube: 22000, twitter: 5400, tiktok: 7200, instagram: 4000, total: 38600 },
  { date: '2024-01-06', youtube: 21500, twitter: 5200, tiktok: 7000, instagram: 3900, total: 37600 },
  { date: '2024-01-07', youtube: 23000, twitter: 5600, tiktok: 7500, instagram: 4200, total: 40300 },
];

export const mockPlatformStats: PlatformStats[] = [
  { platform: 'YouTube', totalRevenue: 203000, monthlyGrowth: 12.5, channels: 2, averageRevenue: 101500 },
  { platform: 'Twitter', totalRevenue: 45000, monthlyGrowth: 8.3, channels: 1, averageRevenue: 45000 },
  { platform: 'TikTok', totalRevenue: 32000, monthlyGrowth: -2.1, channels: 1, averageRevenue: 32000 },
  { platform: 'Instagram', totalRevenue: 28000, monthlyGrowth: 15.7, channels: 1, averageRevenue: 28000 },
];