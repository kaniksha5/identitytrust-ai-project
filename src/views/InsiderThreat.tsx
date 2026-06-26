"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { InsiderIncident } from '../utils/mockDataGenerator';
import { UserX, Clock, Database, Key, Download, AlertTriangle, ShieldCheck, Check, Server } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

export const InsiderThreat: React.FC = () => {
  const { insiderIncidents } = useIdentityTrust();
  const [selectedIncident, setSelectedIncident] = useState<InsiderIncident | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (insiderIncidents.length > 0 && !selectedIncident) {
      setSelectedIncident(insiderIncidents[0]);
    }
  }, [insiderIncidents, selectedIncident]);

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'After-hours Login': return Clock;
      case 'Mass Customer Access': return Database;
      case 'Privilege Escalation': return Key;
      case 'Large Downloads': return Download;
      case 'Multiple Failed Approvals': return AlertTriangle;
      default: return UserX;
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    if (score < 80) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  // Recharts: incidents by department
  const depts = ['Treasury', 'IT Admin', 'Wealth Management', 'Retail Ops', 'Customer Support'];
  const departmentStats = depts.map(d => ({
    name: d,
    incidents: insiderIncidents.filter(i => i.department === d).length
  }));

  // Recharts: Action types count
  const actionTypes = [
    'After-hours Login',
    'Mass Customer Access',
    'Privilege Escalation',
    'Large Downloads',
    'Multiple Failed Approvals'
  ];
  const actionStats = actionTypes.map(act => ({
    name: act.replace(' ', '\n'),
    Count: insiderIncidents.filter(i => i.actionType === act).length
  }));

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Insider Threat Audit Center</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Monitoring internal banking operations, privilege escalations, and anomalous customer file exports.</p>
        </div>
      </div>

      {/* Row 1: Charts */}
      {mounted && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chart 1: Action Types Stats */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Incidents by Policy Category</span>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={actionStats} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={8} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', color: '#0EEDFF' }}
                  />
                  <Bar dataKey="Count" fill="#0EEDFF" radius={[3, 3, 0, 0]}>
                    {actionStats.map((entry, index) => {
                      const colors = ['#0EEDFF', '#3B82F6', '#EF4444', '#F59E0B', '#10B981'];
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Departments Stats */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Incidents by Department</span>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStats} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis type="number" stroke="#64748B" fontSize={10} />
                  <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={9} width={90} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090D1A', border: '1px solid #1E293B', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '11px', color: '#0EEDFF' }}
                  />
                  <Bar dataKey="incidents" fill="#0066FF" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Row 2: Table list & Details panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Incident List Table (2 cols) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4 lg:col-span-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Privileged Audit Log</span>
          
          <table className="w-full text-left text-xs text-slate-400">
            <thead>
              <tr className="border-b border-slate-900 pb-3 text-slate-500 uppercase tracking-wider text-[10px] font-mono">
                <th className="py-2.5">Employee</th>
                <th className="py-2.5">Action Event</th>
                <th className="py-2.5">Department</th>
                <th className="py-2.5">Risk Score</th>
                <th className="py-2.5 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {insiderIncidents.map((incident) => {
                const Icon = getActionIcon(incident.actionType);
                const isSelected = selectedIncident?.id === incident.id;

                return (
                  <tr 
                    key={incident.id}
                    onClick={() => setSelectedIncident(incident)}
                    className={`border-b border-slate-900/60 last:border-b-0 cursor-pointer hover:bg-slate-900/20 transition-colors ${
                      isSelected ? 'bg-slate-900/40 border-cyan-500/20' : ''
                    }`}
                  >
                    <td className="py-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400 shrink-0">
                        <UserX size={12} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{incident.employeeName}</span>
                        <span className="text-[9px] text-slate-500 font-mono">{incident.employeeId}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5 font-sans font-semibold text-slate-300">
                        <Icon size={12} className="text-cyan-400 shrink-0" />
                        {incident.actionType}
                      </div>
                    </td>
                    <td className="py-3 font-mono">{incident.department}</td>
                    <td className="py-3">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getRiskColor(incident.riskScore)}`}>
                        {incident.riskScore}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-500/10">
                        Inspect
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Incident Details Drawer (Right col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col justify-between min-h-[400px]">
          {selectedIncident ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-4">
                {/* Title */}
                <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-850 text-cyan-400">
                    {(() => {
                      const Icon = getActionIcon(selectedIncident.actionType);
                      return <Icon size={18} />;
                    })()}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 font-sans">{selectedIncident.actionType}</h4>
                    <span className="text-[10px] text-slate-500 font-mono">{selectedIncident.id} &bull; audit case</span>
                  </div>
                </div>

                {/* Score & Affected */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Policy Risk</span>
                    <span className={`text-base font-bold font-sans ${selectedIncident.riskScore > 75 ? 'text-red-500' : 'text-amber-400'}`}>
                      {selectedIncident.riskScore}%
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900">
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Records Read</span>
                    <span className="text-base font-bold font-sans text-cyan-400 block">
                      {selectedIncident.affectedRecords}
                    </span>
                  </div>
                </div>

                {/* Narrative description */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Audit Telemetry Findings</span>
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 text-slate-400 leading-relaxed text-[11px] font-sans">
                    {selectedIncident.details}
                  </div>
                </div>

                {/* Technical metadata */}
                <div className="space-y-1.5 font-mono text-[10px] text-slate-500">
                  <div><span className="text-slate-400">Employee:</span> {selectedIncident.employeeName} ({selectedIncident.employeeId})</div>
                  <div><span className="text-slate-400">Department:</span> {selectedIncident.department}</div>
                  <div><span className="text-slate-400">Log Timestamp:</span> {new Date(selectedIncident.timestamp).toLocaleString()}</div>
                </div>
              </div>

              {/* containment actions */}
              <div className="space-y-2 pt-6 border-t border-slate-900 mt-6">
                <button className="w-full py-2 bg-red-600/90 hover:bg-red-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
                  <UserX size={12} />
                  Revoke Active Directory Credentials
                </button>
                <button className="w-full py-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1">
                  <Server size={12} />
                  Trigger Complete Session Audit
                </button>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select an employee incident to review audits.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default InsiderThreat;
