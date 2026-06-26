"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Activity, 
  AlertOctagon, 
  UserMinus, 
  FileCheck, 
  Smartphone, 
  ShieldAlert, 
  Lock,
  ArrowUpRight
} from 'lucide-react';
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
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';

export const SOCDashboard: React.FC = () => {
  const { customers, alerts, kycRequests, transactions, devices, setView, setSelectedAlert } = useIdentityTrust();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute stats from context
  const activeSessions = 12480 + customers.filter(c => c.status === 'active').length;
  const totalAlertsCount = alerts.length;
  const criticalAlertsCount = alerts.filter(a => a.severity === 'critical').length;
  const highRiskUsersCount = customers.filter(c => c.riskScore > 70).length;
  const blockedLoginsCount = transactions.filter(t => t.status === 'blocked').length;
  const compromisedDevicesCount = devices.filter(d => d.trustScore < 40).length;
  const kycReviewsCount = kycRequests.filter(k => k.status === 'Review').length;
  const openInsiderAlertsCount = alerts.filter(a => a.type === 'Insider Alert' && a.status === 'open').length;

  const statCards = [
    { label: 'Total Users', value: '1,492,082', icon: Users, color: 'text-blue-400' },
    { label: 'Active Sessions', value: activeSessions.toLocaleString(), icon: Activity, color: 'text-cyan-400' },
    { label: 'Fraud Alerts', value: totalAlertsCount, sub: `${criticalAlertsCount} Critical`, icon: ShieldAlert, color: 'text-red-400' },
    { label: 'High Risk Identities', value: highRiskUsersCount, icon: UserMinus, color: 'text-amber-400' },
    { label: 'Blocked Transactions', value: blockedLoginsCount, icon: Lock, color: 'text-red-500' },
    { label: 'Compromised Devices', value: compromisedDevicesCount, icon: Smartphone, color: 'text-orange-400' },
    { label: 'Pending KYC Reviews', value: kycReviewsCount, icon: FileCheck, color: 'text-cyan-400' },
    { label: 'Insider Incidents', value: openInsiderAlertsCount, icon: AlertOctagon, color: 'text-rose-500' }
  ];

  // Recharts Mock Data
  const riskTimelineData = [
    { time: '00:00', avgRisk: 12, criticals: 1 },
    { time: '04:00', avgRisk: 14, criticals: 0 },
    { time: '08:00', avgRisk: 28, criticals: 3 },
    { time: '12:00', avgRisk: 42, criticals: 8 },
    { time: '16:00', avgRisk: 35, criticals: 5 },
    { time: '20:00', avgRisk: 22, criticals: 2 },
    { time: '24:00', avgRisk: 15, criticals: 1 }
  ];

  const authTrendData = [
    { date: 'Mon', Success: 1800, Challenge: 120, Block: 15 },
    { date: 'Tue', Success: 2100, Challenge: 180, Block: 22 },
    { date: 'Wed', Success: 2400, Challenge: 240, Block: 45 },
    { date: 'Thu', Success: 2300, Challenge: 200, Block: 34 },
    { date: 'Fri', Success: 2700, Challenge: 310, Block: 67 },
    { date: 'Sat', Success: 1500, Challenge: 90, Block: 12 },
    { date: 'Sun', Success: 1200, Challenge: 80, Block: 8 }
  ];

  const deviceDistributionData = [
    { name: 'Android', value: devices.filter(d => d.os.includes('Android')).length || 8 },
    { name: 'iOS', value: devices.filter(d => d.os.includes('iOS')).length || 5 },
    { name: 'macOS', value: devices.filter(d => d.os.includes('macOS')).length || 3 },
    { name: 'Windows', value: devices.filter(d => d.os.includes('Windows')).length || 4 },
    { name: 'Linux', value: devices.filter(d => d.os.includes('Linux')).length || 2 }
  ];

  const authSuccessPie = [
    { name: 'Direct Success', value: 85, color: '#10B981' },
    { name: 'OTP Challenged', value: 10, color: '#F59E0B' },
    { name: 'Biometric Verified', value: 4, color: '#3B82F6' },
    { name: 'Blocked', value: 1, color: '#EF4444' }
  ];

  const handleAlertClick = (alert: any) => {
    setSelectedAlert(alert);
    setView('investigation');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">SOC Intelligence Dashboard</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Real-time digital banking fraud prevention & identity verification operations.</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE FEEDS ACTIVE
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center justify-between relative overflow-hidden transition-all duration-300 hover:border-slate-700/80">
              <div className="space-y-1.5 z-10">
                <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{stat.label}</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold font-sans text-slate-200">{stat.value}</span>
                  {stat.sub && <span className="text-[10px] text-red-400 font-mono">{stat.sub}</span>}
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

      {/* Row 2: Charts Panel */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Login Risk Timeline */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Login Risk Timeline (24h)</span>
              <span className="text-[10px] text-cyan-400 font-mono">Avg Risk Index</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={riskTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EEDFF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0EEDFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="time" stroke="#64748B" fontSize={10} className="font-mono" />
                  <YAxis stroke="#64748B" fontSize={10} className="font-mono" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    labelStyle={{ color: '#94A3B8', fontSize: '10px', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#0EEDFF', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="avgRisk" stroke="#0EEDFF" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" name="Risk Score Index" />
                  <Area type="monotone" dataKey="criticals" stroke="#EF4444" strokeWidth={1} fillOpacity={0} name="Critical Attacks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Auth Success Rate (Pie Chart) */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Authentication Decisions</span>
            <div className="h-64 w-full flex flex-col justify-center items-center">
              <ResponsiveContainer width="100%" height="70%">
                <PieChart>
                  <Pie
                    data={authSuccessPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {authSuccessPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mt-2 w-full px-2">
                {authSuccessPie.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-400">{item.name}</span>
                    <span className="text-slate-200 font-bold ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Row 3: More charts and Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Recent alerts feed */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Recent Security Alerts</span>
            <button 
              onClick={() => setView('alerts')}
              className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all cursor-pointer"
            >
              View All Alerts
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-96 pr-1">
            {alerts.slice(0, 6).map((alert, idx) => {
              const severityColor = alert.severity === 'critical' 
                ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                : alert.severity === 'high' 
                  ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                  : alert.severity === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20';

              return (
                <div 
                  key={idx}
                  onClick={() => handleAlertClick(alert)}
                  className="p-3.5 rounded-xl border border-slate-850/80 bg-slate-900/20 hover:bg-slate-900/60 hover:border-slate-800 transition-all flex items-start justify-between gap-4 cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${severityColor}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors font-sans">
                        {alert.type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed max-w-xl">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 mt-1.5">
                      <span>User: <strong className="text-slate-400">{alert.customerName}</strong></span>
                      <span>Loc: <strong className="text-slate-400">{alert.location}</strong></span>
                      <span>Time: <span>{new Date(alert.timestamp).toLocaleTimeString()}</span></span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-950/60 text-cyan-400 border border-cyan-500/10 shrink-0 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                    Investigate
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Device Distribution or geographic overview */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Device Threat Distribution</span>
          {mounted && (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', color: '#0EEDFF' }}
                  />
                  <Bar dataKey="value" fill="#0066FF" radius={[4, 4, 0, 0]}>
                    {deviceDistributionData.map((entry, index) => {
                      const colors = ['#3B82F6', '#EF4444', '#F59E0B', '#10B981', '#6366F1'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-slate-900 pb-1.5">
              <span>Platform Type</span>
              <span>Devices Active</span>
            </div>
            {deviceDistributionData.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-300">{item.name}</span>
                <span className="text-cyan-400 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
