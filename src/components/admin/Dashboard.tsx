/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Package,
  Image,
  Clock,
  LogOut,
  Menu,
  X,
  Settings,
  Bell,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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
    <div className="min-h-screen bg-slate-50">
      {/* Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Hamburger Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-80 z-50 bg-white shadow-xl transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-800">Menu</h2>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
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
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
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
              <p className="text-xs text-slate-500 capitalize">Administrator</p>
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
      </div>

      {/* Main Content */}
      <main className="flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger Button */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>

              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {currentTab?.label}
                </h1>
                <p className="text-sm text-slate-500 hidden sm:block">
                  {currentTab?.labelBn} • Manage your content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 sm:p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Quick Actions */}
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium text-white bg-primary hover:bg-primary/90 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="h-full">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
