"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { KYCRequest } from '../utils/mockDataGenerator';
import { ShieldCheck, User, Check, X, ShieldAlert, AlertTriangle, FileText, Globe, Eye } from 'lucide-react';

export const KYCVerification: React.FC = () => {
  const { kycRequests, resolveKYC } = useIdentityTrust();
  const [selectedRequest, setSelectedRequest] = useState<KYCRequest | null>(null);
  const [filter, setFilter] = useState<'all' | 'Approve' | 'Review' | 'Reject'>('Review');

  useEffect(() => {
    // Set first matching request as default selected
    const matching = kycRequests.filter(req => filter === 'all' || req.status === filter);
    if (matching.length > 0) {
      setSelectedRequest(matching[0]);
    } else {
      setSelectedRequest(null);
    }
  }, [filter, kycRequests]);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Approve': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'Reject': return 'text-red-500 border-red-500/20 bg-red-500/5';
      case 'Review': return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
      default: return 'text-slate-400 border-slate-800 bg-slate-900';
    }
  };

  const getIndicatorColor = (score: number, inverse: boolean = false) => {
    const isGood = inverse ? score < 40 : score > 75;
    const isModerate = inverse ? score < 70 : score > 50;

    if (isGood) return 'text-emerald-400 bg-emerald-500/10';
    if (isModerate) return 'text-amber-400 bg-amber-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  const handleKYCDecision = (id: string, action: 'Approve' | 'Reject' | 'Review') => {
    resolveKYC(id, action);
    // Auto select next review request if available
    const nextIdx = kycRequests.findIndex(r => r.id === id) + 1;
    const remaining = kycRequests.filter(r => r.status === filter && r.id !== id);
    if (remaining.length > 0) {
      setSelectedRequest(remaining[0]);
    } else {
      setSelectedRequest(null);
    }
  };

  const filteredRequests = kycRequests.filter(req => filter === 'all' || req.status === filter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">KYC Identity Screening</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Biometric liveness audits, document integrity validation, and Generative Deepfake probability metrics.</p>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-900 self-start">
          {['all', 'Review', 'Approve', 'Reject'].map(opt => (
            <button 
              key={opt}
              onClick={() => setFilter(opt as any)}
              className={`px-3 py-1 text-xs font-mono rounded cursor-pointer transition-all ${
                filter === opt ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {opt.toUpperCase()} ({
                opt === 'all' 
                  ? kycRequests.length 
                  : kycRequests.filter(r => r.status === opt).length
              })
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Table & detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* List table (2 cols) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4 lg:col-span-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Applications Queue</span>
          
          <table className="w-full text-left text-xs text-slate-400">
            <thead>
              <tr className="border-b border-slate-900 pb-3 text-slate-500 uppercase tracking-wider text-[10px] font-mono">
                <th className="py-2.5">Applicant</th>
                <th className="py-2.5">Nationality</th>
                <th className="py-2.5">Face Match</th>
                <th className="py-2.5">Deepfake Prob</th>
                <th className="py-2.5">Doc Authenticity</th>
                <th className="py-2.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr 
                  key={req.id}
                  onClick={() => setSelectedRequest(req)}
                  className={`border-b border-slate-900/60 last:border-b-0 cursor-pointer hover:bg-slate-900/20 transition-colors ${
                    selectedRequest?.id === req.id ? 'bg-slate-900/40 border-cyan-500/20' : ''
                  }`}
                >
                  <td className="py-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400 shrink-0">
                      <User size={12} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{req.applicantName}</span>
                      <span className="text-[9px] text-slate-500 font-mono">{req.id}</span>
                    </div>
                  </td>
                  <td className="py-3 font-mono">{req.nationality}</td>
                  <td className="py-3 font-mono font-bold text-slate-300">{req.faceMatchScore}%</td>
                  <td className="py-3">
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      req.deepfakeProbability > 60 
                        ? 'text-red-500 border-red-500/20 bg-red-500/5' 
                        : 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5'
                    }`}>
                      {req.deepfakeProbability}%
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-slate-300">{req.docAuthenticityScore}%</td>
                  <td className="py-3 text-right">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(req.status)}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No applicant profiles matching this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Selected Request Inspection Card (Right col) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col justify-between min-h-[500px]">
          {selectedRequest ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-5">
                {/* Header detail */}
                <div className="flex items-center gap-3 border-b border-slate-900 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 font-sans">{selectedRequest.applicantName}</h4>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500 mt-0.5">
                      <span>ID: {selectedRequest.id}</span>
                      <span className="flex items-center gap-0.5">
                        <Globe size={10} />
                        {selectedRequest.nationality}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score indicators */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[64px]">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Face Match</span>
                    <span className={`text-sm font-bold ${getIndicatorColor(selectedRequest.faceMatchScore)} px-2 py-0.5 rounded border border-slate-850/50 self-start`}>
                      {selectedRequest.faceMatchScore}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[64px]">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Deepfake Prob</span>
                    <span className={`text-sm font-bold ${getIndicatorColor(selectedRequest.deepfakeProbability, true)} px-2 py-0.5 rounded border border-slate-850/50 self-start`}>
                      {selectedRequest.deepfakeProbability}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[64px]">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Doc Integrity</span>
                    <span className={`text-sm font-bold ${getIndicatorColor(selectedRequest.docAuthenticityScore)} px-2 py-0.5 rounded border border-slate-850/50 self-start`}>
                      {selectedRequest.docAuthenticityScore}%
                    </span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 flex flex-col justify-between min-h-[64px]">
                    <span className="text-[9px] text-slate-500 uppercase block mb-1">Duplicate ID</span>
                    <span className={`text-sm font-bold ${getIndicatorColor(selectedRequest.duplicateIdentityScore, true)} px-2 py-0.5 rounded border border-slate-850/50 self-start`}>
                      {selectedRequest.duplicateIdentityScore}%
                    </span>
                  </div>
                </div>

                {/* Audit details / reasons */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Biometric Scan Assessment</span>
                  
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-900 space-y-2 max-h-40 overflow-y-auto">
                    {selectedRequest.riskReasons.map((reason, idx) => (
                      <div key={idx} className="flex gap-2 items-start text-[10px] leading-relaxed text-slate-400">
                        <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                    {selectedRequest.riskReasons.length === 0 && (
                      <div className="flex gap-2 items-center text-[10px] text-slate-500 font-mono">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span>All biometric and document checks passed validation.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {selectedRequest.status === 'Review' ? (
                <div className="space-y-2 pt-6 border-t border-slate-900 mt-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleKYCDecision(selectedRequest.id, 'Approve')}
                      className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Check size={12} />
                      Approve ID
                    </button>
                    <button 
                      onClick={() => handleKYCDecision(selectedRequest.id, 'Reject')}
                      className="w-1/2 py-2 bg-red-600/90 hover:bg-red-500 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <X size={12} />
                      Reject ID
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 pt-6 border-t border-slate-900 mt-6 text-center">
                  <span className="text-[10px] font-mono text-slate-500">Decision applied: </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getStatusBadge(selectedRequest.status)}`}>
                    {selectedRequest.status}
                  </span>
                </div>
              )}

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select an applicant from the table to review files.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
export default KYCVerification;
