"use client";

import React, { useState } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { Device } from '../utils/mockDataGenerator';
import { Smartphone, Monitor, Shield, AlertTriangle, ShieldCheck, HelpCircle, X, MapPin, Calendar, Clock, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DeviceTrust: React.FC = () => {
  const { devices } = useIdentityTrust();
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [filter, setFilter] = useState<'all' | 'compromised' | 'trusted'>('all');

  const filteredDevices = devices.filter(d => {
    if (filter === 'compromised') return d.trustScore < 60;
    if (filter === 'trusted') return d.trustScore >= 80;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score < 40) return 'text-red-500 bg-red-500/10 border-red-500/20';
    if (score < 75) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Device Trust Inventory</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Continuous hardware validation, integrity checks, and ZTA compliance records.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-900 self-start">
          <button 
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-all ${filter === 'all' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
          >
            ALL ({devices.length})
          </button>
          <button 
            onClick={() => setFilter('compromised')}
            className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-all ${filter === 'compromised' ? 'bg-red-950/40 text-red-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
          >
            COMPROMISED ({devices.filter(d => d.trustScore < 60).length})
          </button>
          <button 
            onClick={() => setFilter('trusted')}
            className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-all ${filter === 'trusted' ? 'bg-emerald-950/40 text-emerald-400 font-bold' : 'text-slate-500 hover:text-slate-300'}`}
          >
            TRUSTED ({devices.filter(d => d.trustScore >= 80).length})
          </button>
        </div>
      </div>

      {/* Grid of Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDevices.map((dev) => {
          const isCompromised = dev.trustScore < 60;
          return (
            <div 
              key={dev.id}
              onClick={() => setSelectedDevice(dev)}
              className="glass-panel p-4 rounded-xl border border-slate-850 hover:border-slate-750 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[180px] relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/[0.005] to-white/[0.015] rounded-bl-full pointer-events-none" />
              
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded bg-slate-900 border border-slate-850 text-slate-400 group-hover:text-cyan-400 transition-colors">
                      {dev.os.includes('Windows') || dev.os.includes('macOS') || dev.os.includes('Linux') 
                        ? <Monitor size={16} /> 
                        : <Smartphone size={16} />
                      }
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-200">{dev.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{dev.os}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getScoreColor(dev.trustScore)}`}>
                    TS: {dev.trustScore}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[11px] text-slate-400">User: <strong className="text-slate-300">{dev.userName}</strong></div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{dev.location} &bull; {dev.browser}</div>
                </div>
              </div>

              {/* Badges indicators */}
              <div className="flex gap-2 mt-4 text-[9px] font-mono border-t border-slate-900/60 pt-3">
                <span className={`px-1.5 py-0.5 rounded border uppercase ${dev.isRooted ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-slate-900 border-slate-850 text-slate-500'}`}>
                  Rooted: {dev.isRooted ? 'YES' : 'NO'}
                </span>
                <span className={`px-1.5 py-0.5 rounded border uppercase ${dev.isEmulator ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-slate-900 border-slate-850 text-slate-500'}`}>
                  Emul: {dev.isEmulator ? 'YES' : 'NO'}
                </span>
                <span className={`px-1.5 py-0.5 rounded border uppercase ${dev.isVpn ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-slate-900 border-slate-850 text-slate-500'}`}>
                  VPN: {dev.isVpn ? 'YES' : 'NO'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out Fingerprint Modal */}
      <AnimatePresence>
        {selectedDevice && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setSelectedDevice(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30" 
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-950/95 border-l border-slate-850 z-40 p-6 overflow-y-auto flex flex-col justify-between"
            >
              <div className="space-y-6">
                
                {/* Modal Title */}
                <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-cyan-400" />
                    <div>
                      <h2 className="text-sm font-bold text-slate-200">Device Fingerprint Detail</h2>
                      <span className="text-[10px] text-slate-500 font-mono">{selectedDevice.id}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedDevice(null)}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Score and Owner */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-850">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Trust Rating</span>
                    <span className={`text-base font-bold font-sans ${selectedDevice.trustScore < 60 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {selectedDevice.trustScore} / 100
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-850">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Assigned Identity</span>
                    <span className="text-xs font-bold text-slate-300 font-sans block truncate mt-1">
                      {selectedDevice.userName}
                    </span>
                  </div>
                </div>

                {/* Technical Fingerprint specs */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Hardware Fingerprint DNA</span>
                  
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-900 space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-slate-950">
                      <span className="text-slate-500">Device Model:</span>
                      <span className="text-slate-300 font-semibold">{selectedDevice.os}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-950">
                      <span className="text-slate-500">Agent Browser:</span>
                      <span className="text-slate-300">{selectedDevice.browser}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-950">
                      <span className="text-slate-500">IP Location:</span>
                      <span className="text-slate-300">{selectedDevice.ip} ({selectedDevice.location})</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-950">
                      <span className="text-slate-500">Canvas Token:</span>
                      <span className="text-cyan-400 truncate max-w-[200px] text-right">0x9F3A...1A82B</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-950">
                      <span className="text-slate-500">CPU Cores/RAM:</span>
                      <span className="text-slate-300">8 Cores / 8 GB</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">WebGL Renderer:</span>
                      <span className="text-slate-300">Apple ANGLE / Vulkan</span>
                    </div>
                  </div>
                </div>

                {/* Installed Apps Inventory */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <Terminal size={12} className="text-cyan-400" />
                    App Inventory Audit (Security Scan)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDevice.installedApps.map((app, idx) => {
                      const isRiskApp = app.includes('Magisk') || app.includes('Termux') || app.includes('AnyDesk');
                      return (
                        <span 
                          key={idx}
                          className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold border ${
                            isRiskApp 
                              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                              : 'bg-slate-900 border-slate-850 text-slate-400'
                          }`}
                        >
                          {app}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Device Risk History Logs */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Integrity Telemetry Logs</span>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {selectedDevice.riskHistory.map((history, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start text-xs border-b border-slate-900 pb-2">
                        <div className="text-[10px] text-slate-500 font-mono whitespace-nowrap pt-0.5">
                          {new Date(history.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="text-slate-300 font-semibold">{history.event}</div>
                          <div className="text-[10px] text-slate-500 font-mono">Evaluation score: {history.score}/100</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedDevice(null)}
                className="w-full mt-8 py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 rounded-lg text-slate-300 text-xs font-semibold cursor-pointer transition-colors"
              >
                Close Device Info
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
