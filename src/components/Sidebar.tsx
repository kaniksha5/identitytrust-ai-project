"use client";

import React from 'react';
import { 
  Home, 
  ShieldAlert, 
  Activity, 
  Key, 
  Smartphone, 
  Share2, 
  Search, 
  UserX, 
  ShieldCheck, 
  Bell, 
  BarChart3, 
  Settings as SettingsIcon,
  Shield,
  Menu,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { motion } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const { currentView, setView, alerts } = useIdentityTrust();
  const [collapsed, setCollapsed] = React.useState(false);

  const activeAlertsCount = alerts.filter(a => a.status === 'open').length;

  const menuItems = [
    { id: 'landing', label: 'Overview', icon: Home },
    { id: 'soc', label: 'SOC Dashboard', icon: ShieldAlert, badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { id: 'risk-engine', label: 'Risk Engine', icon: Activity },
    { id: 'adaptive-auth', label: 'Adaptive Auth', icon: Key },
    { id: 'device-trust', label: 'Device Trust', icon: Smartphone },
    { id: 'campaigns', label: 'Campaign Fingerprints', icon: Share2 },
    { id: 'investigation', label: 'Incident Forensics', icon: Search },
    { id: 'insider', label: 'Insider Audit', icon: UserX },
    { id: 'kyc', label: 'KYC Screening', icon: ShieldCheck },
    { id: 'alerts', label: 'Real-Time Alerts', icon: Bell, badge: activeAlertsCount > 0 ? activeAlertsCount : undefined },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <motion.aside 
      animate={{ width: collapsed ? '72px' : '260px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass-panel border-r border-slate-800 h-screen sticky top-0 flex flex-col z-20 text-slate-300 select-none overflow-y-auto"
    >
      {/* Platform Logo */}
      <div className="p-5 flex items-center justify-between border-b border-slate-900 min-h-[72px]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-lg text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          {!collapsed && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col"
            >
              <span className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-400 font-sans text-sm">IDENTITYTRUST AI</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Risk Intelligence</span>
            </motion.div>
          )}
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded bg-slate-800/40 hover:bg-slate-800 text-slate-400 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {menuItems.map(item => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative group cursor-pointer ${
                isActive 
                  ? 'text-cyan-400 font-medium bg-blue-950/40 border-l-2 border-cyan-400 shadow-inner shadow-cyan-500/5' 
                  : 'hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                {!collapsed && (
                  <motion.span 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
              
              {item.badge && !collapsed && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold font-mono bg-red-600/90 text-white rounded-full min-w-5 text-center shadow-lg shadow-red-500/10">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-900 text-xs text-slate-500 font-mono">
        {!collapsed ? (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-cyan-500/80">
              <span>Engine Status:</span>
              <span className="flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <div>Build v0.4.9 - Mock Mode</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
        )}
      </div>
    </motion.aside>
  );
};
