"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  Cell, 
  Legend 
} from 'recharts';
import { ShieldCheck, BarChart3, TrendingUp, AlertOctagon, HelpCircle } from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Recharts Stats data
  const moneySavedData = [
    { month: 'Jan', preventedLosses: 45, trueFraudAttempts: 12 },
    { month: 'Feb', preventedLosses: 85, trueFraudAttempts: 18 },
    { month: 'Mar', preventedLosses: 120, trueFraudAttempts: 25 },
    { month: 'Apr', preventedLosses: 190, trueFraudAttempts: 32 },
    { month: 'May', preventedLosses: 310, trueFraudAttempts: 48 },
    { month: 'Jun', preventedLosses: 420, trueFraudAttempts: 65 }
  ];

  const campaignGrowthData = [
    { week: 'Wk 1', activeClusters: 10, mutationsTracked: 14 },
    { week: 'Wk 2', activeClusters: 15, mutationsTracked: 22 },
    { week: 'Wk 3', activeClusters: 18, mutationsTracked: 35 },
    { week: 'Wk 4', activeClusters: 22, mutationsTracked: 52 },
    { week: 'Wk 5', activeClusters: 27, mutationsTracked: 74 },
    { week: 'Wk 6', activeClusters: 30, mutationsTracked: 91 }
  ];

  const scoreDistributionData = [
    { range: '0-20 (Critical)', usersCount: 142 },
    { range: '21-40 (High)', usersCount: 384 },
    { range: '41-60 (Medium)', usersCount: 1290 },
    { range: '61-80 (Low Risk)', usersCount: 8490 },
    { range: '81-100 (Trusted)', usersCount: 124800 }
  ];

  const deviceHealthData = [
    { os: 'Android', DeviceTrust: 82, BehaviorScore: 78 },
    { os: 'iOS', DeviceTrust: 95, BehaviorScore: 92 },
    { os: 'macOS', DeviceTrust: 94, BehaviorScore: 89 },
    { os: 'Windows', DeviceTrust: 88, BehaviorScore: 81 },
    { os: 'Linux', DeviceTrust: 91, BehaviorScore: 94 }
  ];

  const overviewStats = [
    { label: 'Total Losses Prevented', value: '₹4.20 Crore', change: '+24% this month', icon: ShieldCheck, color: 'text-emerald-400' },
    { label: 'Avg Identity Trust Score', value: '84.8%', change: '+1.2% baseline shift', icon: BarChart3, color: 'text-cyan-400' },
    { label: 'Coordinated Attack Intercepts', value: '142 Blocks', change: '98.4% detection rate', icon: AlertOctagon, color: 'text-red-400' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Cyber Fraud Analytics</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Aggregated financial security analytics, attack campaign growth patterns, and trust distribution models.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {overviewStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-4 rounded-xl border border-slate-850 flex items-center justify-between relative overflow-hidden transition-all duration-300 hover:border-slate-800">
              <div className="space-y-1.5 z-10">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
                <div className="text-xl font-bold font-sans text-slate-200">{stat.value}</div>
                <div className="text-[10px] text-cyan-400 font-mono flex items-center gap-0.5">
                  <TrendingUp size={10} />
                  {stat.change}
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-slate-900/60 border border-slate-850/50 ${stat.color} z-10`}>
                <Icon size={20} />
              </div>
              <div className="absolute right-0 bottom-0 w-16 h-16 bg-gradient-to-tr from-white/[0.005] to-white/[0.015] rounded-tl-full pointer-events-none" />
            </div>
          );
        })}
      </div>

      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Money Saved Trend */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Loss Prevention & Fraud Events</span>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moneySavedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="preventedLossesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="month" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Area type="monotone" dataKey="preventedLosses" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#preventedLossesGrad)" name="Loss Prevented (₹ Lakhs)" />
                  <Area type="monotone" dataKey="trueFraudAttempts" stroke="#EF4444" strokeWidth={1} fillOpacity={0} name="Interceptions Count" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Campaign growth */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Coordinated Campaign Mutation growth</span>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={campaignGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="week" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Line type="monotone" dataKey="activeClusters" stroke="#0066FF" strokeWidth={2} activeDot={{ r: 8 }} name="Active Clusters" />
                  <Line type="monotone" dataKey="mutationsTracked" stroke="#0EEDFF" strokeWidth={2} name="Vector Mutation instances" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Trust distribution */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Identity Trust Score Distribution</span>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistributionData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="range" stroke="#64748B" fontSize={9} />
                  <YAxis type="number" scale="log" domain={['auto', 'auto']} stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', color: '#0EEDFF' }}
                  />
                  <Bar dataKey="usersCount" fill="#0066FF" radius={[3, 3, 0, 0]}>
                    {scoreDistributionData.map((entry, index) => {
                      const colors = ['#EF4444', '#F97316', '#F59E0B', '#3B82F6', '#10B981'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Device vs behavior trust */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Device Health vs Behavior Profile Indices</span>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceHealthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="os" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                  <Bar dataKey="DeviceTrust" fill="#0066FF" name="Device Integrity Index" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="BehaviorScore" fill="#0EEDFF" name="Habit Navigation Index" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
export default AnalyticsDashboard;
