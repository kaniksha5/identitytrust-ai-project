"use client";

import React from 'react';
import { Cpu, Share2, Activity, Smartphone, Key, FileText, Search, ShieldCheck } from 'lucide-react';

export const AIModuleStatus: React.FC = () => {
  const modules = [
    {
      name: 'Identity Trust Engine',
      status: 'Active',
      metric: '0.04ms latency',
      score: '99.8% Accuracy',
      icon: Cpu,
      color: 'text-cyan-400 border-cyan-500/20 shadow-cyan-500/5'
    },
    {
      name: 'Campaign Fingerprinting',
      status: 'Clustering',
      metric: '32 Active Seeds',
      score: '91% Correlation',
      icon: Share2,
      color: 'text-blue-400 border-blue-500/20 shadow-blue-500/5'
    },
    {
      name: 'Behavior Analytics',
      status: 'Profiling',
      metric: 'Key Dynamics: OK',
      score: 'Baseline updated',
      icon: Activity,
      color: 'text-purple-400 border-purple-500/20 shadow-purple-500/5'
    },
    {
      name: 'Device Intelligence',
      status: 'Monitoring',
      metric: 'ZTA Enforced',
      score: '0.01% Bypass Rate',
      icon: Smartphone,
      color: 'text-emerald-400 border-emerald-500/20 shadow-emerald-500/5'
    },
    {
      name: 'Adaptive Authentication',
      status: 'Enforcing',
      metric: '1.2% MFA Friction',
      score: '98% Block Rate',
      icon: Key,
      color: 'text-amber-400 border-amber-500/20 shadow-amber-500/5'
    },
    {
      name: 'LLM Fraud Explanation',
      status: 'Standby',
      metric: 'Gemini Flash 1.5',
      score: 'Explainability ON',
      icon: FileText,
      color: 'text-pink-400 border-pink-500/20 shadow-pink-500/5'
    },
    {
      name: 'Vector Search Engine',
      status: 'Indexing',
      metric: '1,536 Dimensions',
      score: '10ms Recalculation',
      icon: Search,
      color: 'text-indigo-400 border-indigo-500/20 shadow-indigo-500/5'
    },
    {
      name: 'Threat Intelligence',
      status: 'Synced',
      metric: 'MITRE D3FEND v2',
      score: 'IOC Feed: 0m ago',
      icon: ShieldCheck,
      color: 'text-teal-400 border-teal-500/20 shadow-teal-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {modules.map((mod, i) => {
        const Icon = mod.icon;
        return (
          <div 
            key={i} 
            className={`glass-panel p-4 rounded-xl border flex flex-col gap-3 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-slate-700/80 group shadow-lg`}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/[0.01] to-white/[0.02] rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 text-slate-300 group-hover:text-cyan-400 transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded bg-slate-950/60 text-emerald-400 border border-emerald-500/10">
                {mod.status}
              </span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-100 transition-colors">
                {mod.name}
              </span>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>{mod.metric}</span>
                <span className="text-slate-400 font-medium">{mod.score}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
