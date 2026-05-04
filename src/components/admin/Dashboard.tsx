/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Package,
  Image,
  Clock,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Settings,
  Bell,
  Search,
  Home,
  Users,
  BarChart3,
  Layers,
  Globe,
  Moon,
  Sun,
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
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/10 to-purple-600/10',
  },
  { 
    id: 'albums' as AdminTab, 
    label: 'Albums', 
    labelBn: 'অ্যালবাম',
    icon: Image,
    gradient: 'from-pink-500 to-rose-600',
    bgGradient: 'from-pink-500/10 to-rose-600/10',
  },
  { 
    id: 'prayer-times' as AdminTab, 
    label: 'Prayer Times', 
    labelBn: 'নামাজের সময়',
    icon: Clock,
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/10',
  },
  { 
    id: 'analytics' as AdminTab, 
    label: 'Analytics', 
    labelBn: 'বিশ্লেষণ',
    icon: BarChart3,
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
  },
  { 
    id: 'settings' as AdminTab, 
    label: 'Settings', 
    labelBn: 'সেটিংস',
    icon: Settings,
    gradient: 'from-slate-500 to-gray-600',
    bgGradient: 'from-slate-500/10 to-gray-600/10',
  },
];

export default function Dashboard() {
  const { user, logout, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('packages');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald-500/5 via-teal-500/5 to-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -320 }}
        animate={{ x: isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:static inset-y-0 left-0 w-80 z-50 flex flex-col
          ${isDarkMode 
            ? 'bg-slate-800/90 border-r border-slate-700' 
            : 'bg-white/80 backdrop-blur-xl border-r border-white/50'
          } shadow-2xl shadow-primary/5`}
      >
        {/* Logo Area */}
        <div className={`p-6 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'} border-b`}>
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              >
                <Sparkles className="w-3 h-3 text-white m-0.5" />
              </motion.div>
            </motion.div>
            <div>
              <h2 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-primary'}`}>
                Matribhumi
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Admin Dashboard
              </p>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className={`relative group`}>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-slate-400' : 'text-slate-400'} group-focus-within:text-primary transition-colors`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300
                ${isDarkMode 
                  ? 'bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20' 
                  : 'bg-slate-50/50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20'
                } outline-none`}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full relative group overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                <div className={`relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300
                  ${isActive 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg` 
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-700/50'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div className="flex-1 text-left">
                    <span className="font-semibold block">{tab.label}</span>
                    <span className={`text-xs ${isActive ? 'text-white/70' : isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {tab.labelBn}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className={`p-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-100'} border-t`}>
          {/* Theme Toggle */}
          <div className="flex items-center justify-between mb-4 px-2">
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                isDarkMode ? 'bg-primary' : 'bg-slate-200'
              }`}
            >
              <motion.div
                animate={{ x: isDarkMode ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
              >
                {isDarkMode ? <Moon className="w-3 h-3 text-primary" /> : <Sun className="w-3 h-3 text-amber-500" />}
              </motion.div>
            </motion.button>
          </div>

          <motion.div 
            className={`flex items-center gap-3 mb-4 p-3 rounded-xl ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-md shadow-primary/20">
              <span className="text-white font-bold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {user?.email?.split('@')[0]}
              </p>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} capitalize`}>
                Administrator
              </p>
            </div>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={logout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isDarkMode 
                ? 'text-red-400 hover:bg-red-500/10' 
                : 'text-red-600 hover:bg-red-50'
              }`}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        {/* Top Header */}
        <header className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-white/50'} backdrop-blur-xl border-b px-6 py-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(true)}
                className={`lg:hidden p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              >
                <Menu className={`w-6 h-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              </motion.button>
              
              <div>
                <motion.h1 
                  key={activeTab}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
                >
                  {currentTab?.label}
                </motion.h1>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {currentTab?.labelBn} • Manage your content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-3 rounded-xl ${isDarkMode ? 'bg-slate-700/50 hover:bg-slate-700' : 'bg-slate-100 hover:bg-slate-200'} transition-colors`}
              >
                <Bell className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              {/* Quick Actions */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-white bg-gradient-to-r ${currentTab?.gradient} shadow-lg transition-shadow hover:shadow-xl`}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">View Site</span>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
