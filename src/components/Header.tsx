"use client";

import React, { useState, useEffect } from 'react';
import { Search, Bell, Shield, Database, Cpu, HelpCircle, User } from 'lucide-react';
import { useIdentityTrust } from '../context/IdentityTrustContext';

export const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, alerts, setView } = useIdentityTrust();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const openAlertsCount = alerts.filter(a => a.status === 'open').length;

  return (
    <header className="glass-panel border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-10 min-h-[72px]">
      {/* Search Input */}
      <div className="relative w-96 max-w-xs md:max-w-md">
        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search identity, device fingerprint, transaction, alerts..."
          className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60 transition-all font-sans placeholder-slate-500"
        />
      </div>

      {/* Cyber/AI System Status */}
      <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono tracking-wider text-slate-400">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800/80">
          <Cpu size={12} className="text-cyan-400" />
          <span>AI RISK:</span>
          <span className="text-emerald-400 font-bold">ONLINE</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800/80">
          <Database size={12} className="text-blue-500" />
          <span>VECTOR DB:</span>
          <span className="text-emerald-400 font-bold">148,092 VECS</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/60 border border-slate-800/80">
          <Shield size={12} className="text-cyan-400 animate-pulse" />
          <span>THREAT FEED:</span>
          <span className="text-emerald-400 font-bold">SYNCED</span>
        </div>
      </div>

      {/* Right-side Utilities */}
      <div className="flex items-center gap-4">
        {/* Time display */}
        <div className="hidden md:block text-[11px] font-mono text-slate-400 bg-slate-900/40 border border-slate-800/40 px-3 py-1.5 rounded-lg">
          {time || '21:25:57'}
        </div>

        {/* Alerts Center Notification icon */}
        <button 
          onClick={() => setView('alerts')}
          className="p-2 rounded bg-slate-900/60 border border-slate-800 hover:bg-slate-800/60 text-slate-300 transition-all relative cursor-pointer"
        >
          <Bell size={16} className={openAlertsCount > 0 ? "animate-swing" : ""} />
          {openAlertsCount > 0 && (
            <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-slate-950"></span>
          )}
        </button>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
          <div className="flex flex-col text-right hidden sm:flex">
            <span className="text-xs font-semibold text-slate-200">BOB_SOC_09</span>
            <span className="text-[9px] text-cyan-400 font-mono">Senior Security Analyst</span>
          </div>
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xs font-bold border border-cyan-400/20">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};
