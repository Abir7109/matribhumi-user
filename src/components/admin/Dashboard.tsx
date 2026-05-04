/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Package,
  Image,
  Clock,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Login from './Login';
import PackagesManager from './PackagesManager';
import AlbumsManager from './AlbumsManager';
import PrayerTimesManager from './PrayerTimesManager';

type AdminTab = 'packages' | 'albums' | 'prayer-times';

const tabs = [
  { id: 'packages' as AdminTab, label: 'Packages', icon: Package },
  { id: 'albums' as AdminTab, label: 'Albums', icon: Image },
  { id: 'prayer-times' as AdminTab, label: 'Prayer Times', icon: Clock },
];

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('packages');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      default:
        return <PackagesManager />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-slate-200 z-50 flex flex-col
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h2 className="font-bold text-primary">Matribhumi</h2>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-primary text-white' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">
                {user?.email}
              </p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
          <h1 className="font-bold text-primary">Matribhumi Admin</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </header>

        {/* Page Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-6">
          <h1 className="text-2xl font-bold text-slate-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} content
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
