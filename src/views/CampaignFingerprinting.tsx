"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { Campaign } from '../utils/mockDataGenerator';
import { Share2, MessageSquare, Download, Smartphone, User, CreditCard, Server, RefreshCw, Cpu, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const CampaignFingerprinting: React.FC = () => {
  const { campaigns } = useIdentityTrust();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  useEffect(() => {
    if (campaigns.length > 0 && !selectedCampaign) {
      setSelectedCampaign(campaigns[0]);
    }
  }, [campaigns, selectedCampaign]);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'sms': return MessageSquare;
      case 'apk': return Download;
      case 'device': return Smartphone;
      case 'identity': return User;
      case 'transaction': return CreditCard;
      case 'cluster': return Server;
      default: return Share2;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Active': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'Mitigated': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Monitoring': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-slate-400 bg-slate-900 border-slate-850';
    }
  };

  // Node relative positions in SVG box (400x300)
  const nodePositions: Record<string, { x: number; y: number }> = {
    phish: { x: 80, y: 70 },
    apk: { x: 200, y: 70 },
    cluster: { x: 80, y: 220 },
    dev: { x: 200, y: 220 },
    ident: { x: 320, y: 150 },
    txn: { x: 420, y: 150 }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Campaign Fingerprint Intelligence</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">High-dimensional vector search clustering coordinated cyber fraud rings and identifying mutations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Campaigns Seed List (Left Panel) */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-850 flex flex-col gap-4 max-h-[600px] overflow-y-auto">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-2">Active Campaign Seeds</span>
          <div className="space-y-2">
            {campaigns.slice(0, 12).map((camp) => {
              const isSelected = selectedCampaign?.id === camp.id;
              return (
                <button
                  key={camp.id}
                  onClick={() => setSelectedCampaign(camp)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-950/40 border-cyan-400/40 text-cyan-400 shadow-md shadow-cyan-500/5' 
                      : 'bg-slate-900/20 border-slate-850/80 text-slate-400 hover:border-slate-800 hover:bg-slate-900/40'
                  }`}
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-xs font-bold font-sans text-slate-300 truncate group-hover:text-cyan-400">
                      {camp.name}
                    </span>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-slate-500">
                      <span>ID: {camp.id}</span>
                      <span className={`px-1.5 py-0.5 rounded border uppercase ${getStatusColor(camp.status)}`}>
                        {camp.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-bold text-slate-200 font-mono">{camp.similarity}%</span>
                    <span className="text-[9px] text-slate-500 font-mono">SIMILAR</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Network Graph Visualization (Main Middle Panel) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col justify-between lg:col-span-2 min-h-[500px]">
          
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <Share2 size={14} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Campaign Attack Graph Correlation</span>
            </div>
            {selectedCampaign && (
              <span className="text-[10px] text-cyan-400 font-mono">{selectedCampaign.id} &bull; DNA Vector</span>
            )}
          </div>

          {selectedCampaign ? (
            <div className="flex-1 flex flex-col justify-between py-6">
              
              {/* SVG Network Graph Box */}
              <div className="relative w-full h-80 bg-slate-950/40 border border-slate-900/60 rounded-xl overflow-hidden flex items-center justify-center">
                
                {/* Scanner sweep line */}
                <div className="absolute inset-0 bg-grid-cyber opacity-15" />
                <motion.div 
                  animate={{ y: [-150, 150, -150] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none"
                />

                {/* SVG Connections & Pulsing lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 300">
                  <defs>
                    <linearGradient id="glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0066FF" />
                      <stop offset="100%" stopColor="#0EEDFF" />
                    </linearGradient>
                  </defs>

                  {/* Lines between nodes */}
                  {selectedCampaign.nodes.map((node, idx) => {
                    // Extract node type to align position
                    const nodeType = node.id.split('-')[1];
                    const startPos = nodePositions[nodeType];
                    
                    if (!startPos) return null;

                    return selectedCampaign.links.map((link, lIdx) => {
                      if (link.source === node.id) {
                        const targetType = link.target.split('-')[1];
                        const endPos = nodePositions[targetType];

                        if (!endPos) return null;

                        return (
                          <g key={`${idx}-${lIdx}`}>
                            {/* Static connector line */}
                            <line 
                              x1={startPos.x} 
                              y1={startPos.y} 
                              x2={endPos.x} 
                              y2={endPos.y} 
                              stroke="rgba(0, 194, 255, 0.12)" 
                              strokeWidth="1.5"
                            />
                            {/* Animated pulsing connector */}
                            <line 
                              x1={startPos.x} 
                              y1={startPos.y} 
                              x2={endPos.x} 
                              y2={endPos.y} 
                              stroke="url(#glow-grad)" 
                              strokeWidth="1.5"
                              strokeDasharray="4,8"
                              className="radar-sweep"
                              style={{ animationDuration: '60s' }}
                            />
                          </g>
                        );
                      }
                      return null;
                    });
                  })}
                </svg>

                {/* Float nodes on top of SVG paths */}
                {selectedCampaign.nodes.map((node) => {
                  const nodeType = node.id.split('-')[1];
                  const pos = nodePositions[nodeType] || { x: 250, y: 150 };
                  const Icon = getNodeIcon(nodeType);

                  return (
                    <motion.div
                      key={node.id}
                      style={{ left: pos.x - 20, top: pos.y - 20 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 flex items-center justify-center cursor-pointer transition-colors shadow-lg shadow-slate-950/80 group z-10"
                    >
                      <Icon size={16} />
                      
                      {/* Tooltip on hover */}
                      <span className="absolute bottom-11 scale-0 group-hover:scale-100 bg-slate-950 text-[9px] font-mono text-slate-300 px-2 py-1 rounded border border-slate-850 whitespace-nowrap transition-transform duration-200 pointer-events-none">
                        {node.label}
                      </span>
                    </motion.div>
                  );
                })}

              </div>

              {/* Bottom stats box: Similarity matrix, DNA hash, vectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-900/60 pt-5 text-xs">
                {/* DNA Hash */}
                <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Campaign DNA</span>
                  <span className="font-mono text-cyan-400 font-semibold">{selectedCampaign.dnaHash}</span>
                </div>

                {/* Vector Similarity score */}
                <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Vector Search Match</span>
                  <span className="font-mono text-cyan-400 font-semibold">{(selectedCampaign.vectorSimilarity * 100).toFixed(2)}% similarity</span>
                </div>

                {/* Techniques used */}
                <div className="p-3 bg-slate-900/40 border border-slate-900 rounded-xl">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-0.5">Primary Techniques</span>
                  <span className="text-[10px] text-slate-300 truncate block font-sans font-medium mt-0.5">{selectedCampaign.techniques.join(', ')}</span>
                </div>
              </div>

              {/* Mutation timeline */}
              <div className="space-y-3 mt-5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Mutation / Evolution logs</span>
                <div className="bg-slate-900/20 border border-slate-900 rounded-xl p-3.5 space-y-3 max-h-40 overflow-y-auto">
                  {selectedCampaign.mutationTimeline.map((mut, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start text-xs border-b border-slate-900/40 pb-2.5 last:border-b-0 last:pb-0">
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">{mut.date}</span>
                      <p className="text-[11px] text-slate-400 leading-normal font-sans">
                        <strong className="text-slate-200">Mutation: </strong>{mut.mutation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              Select a campaign seeds from left column.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
export default CampaignFingerprinting;
