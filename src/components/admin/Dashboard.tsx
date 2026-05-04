/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Package,
  Image,
  Clock,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
  Search,
  BarChart3,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import PackagesManager from './PackagesManager';
import AlbumsManager from './AlbumsManager';
import PrayerTimesManager from './PrayerTimesManager';

type AdminTab = 'packages' | 'albums' | 'prayer-times' | 'analytics' | 'settings';

const tabs = [
  { 
    id: 'packages' as AdminTab, 
    label: 'Packages', 
    labelBn: 'প্যাকেজ',
    icon: Package,
  },
  { 
    id: 'albums' as AdminTab, 
    label: 'Albums', 
    labelBn: 'অ্যালবাম',
    icon: Image,
  },
  { 
    id: 'prayer-times' as AdminTab, 
    label: 'Prayer Times', 
    labelBn: 'নামাজের সময়',
    icon: Clock,
  },
  { 
    id: 'analytics' as AdminTab, 
    label: 'Analytics', 
    labelBn: 'বিশ্লেষণ',
    icon: BarChart3,
  },
  { 
    id: 'settings' as AdminTab, 
    label: 'Settings', 
    labelBn: 'সেটিংস',
    icon: Settings,
  },
];

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('packages');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  // Show login if not authenticated
  if (!isLoading && !user) {
    return <Login />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'packages':
        return <PackagesManager />;
      case 'albums':
        return <AlbumsManager />;
      case 'prayer-times':
        return <PrayerTimesManager />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600">Analytics Coming Soon</h3>
              <p className="text-slate-400 mt-2">Track your website performance</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600">Settings Coming Soon</h3>
              <p className="text-slate-400 mt-2">Customize your admin experience</p>
            </div>
          </div>
        );
      default:
        return <PackagesManager />;
    }
  };

  const currentTab = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-80 z-50 flex flex-col bg-white border-r border-slate-200 shadow-lg
          ${isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div>
              <h2 className="font-bold text-xl text-slate-800">
                Matribhumi
              </h2>
              <p className="text-sm text-slate-500">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <div className="flex-1 text-left">
                  <span className="font-semibold block">{tab.label}</span>
                  <span className={`text-xs ${isActive ? 'text-white/70' : 'text-slate-400'}`}>
                    {tab.labelBn}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-slate-50">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-slate-800">
                {user?.email?.split('@')[0]}
              </p>
              <p className="text-xs text-slate-500 capitalize">
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {currentTab?.label}
                </h1>
                <p className="text-sm text-slate-500">
                  {currentTab?.labelBn} • Manage your content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Quick Actions */}
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="h-full">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
