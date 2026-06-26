"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap, Eye, AlertTriangle, Cpu, HelpCircle } from 'lucide-react';
import { useIdentityTrust } from '../context/IdentityTrustContext';

export const LandingPage: React.FC = () => {
  const { setView } = useIdentityTrust();

  const problemPoints = [
    { title: 'Static Credentials', desc: 'Passwords and 2FA SMS tokens are easily phished, intercepted via SIM swap, or compromised.' },
    { title: 'Coordinated Fraud Campaigns', desc: 'Fraud rings reuse malware, emulators, and device profiles across banks, shifting setups to bypass rules.' },
    { title: 'KYC & Deepfake Fraud', desc: 'AI-generated identity papers and synthetic deepfake videos cheat traditional static liveness checks.' },
    { title: 'Insider Misuse', desc: 'Privileged internal banking staff downloading bulk databases or approving transfers outside baseline behaviors.' }
  ];

  const features = [
    { title: 'Continuous Risk Engine', desc: 'Computes real-time Identity Trust Scores (0-100) using continuous biometrics, geolocation speed, and network markers.', icon: Cpu },
    { title: 'Adaptive Authentication', desc: 'Dynamically routes access: low-risk users get friction-free login, while elevated risks prompt biometrics or block action.', icon: Zap },
    { title: 'Campaign Fingerprinting', desc: 'Identifies coordinated cyber campaigns by mapping SMS, APK, and device linkages in a high-speed vector similarity graph.', icon: Shield },
    { title: 'Insider Threat Detection', desc: 'Monitors corporate employees for anomalous data access, privilege creep, and suspicious off-hour logins.', icon: Eye }
  ];

  const techStack = [
    { name: 'Next.js App Router', role: 'Server and client framework rendering fast static-dynamic views.' },
    { name: 'Tailwind CSS v4', role: 'Next-generation utility CSS enabling glassmorphism and deep-dark mode styling.' },
    { name: 'Framer Motion', role: 'Fluid transitions, interactive node graphs, and micro-interactions.' },
    { name: 'Recharts', role: 'High-fidelity SOC security statistics, login timelines, and alert categories.' },
    { name: 'Vector Similarity Engine', role: 'Mock high-dimension vectors correlating cybercampaign seeds.' }
  ];

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex flex-col items-center bg-grid-cyber pt-12 pb-24 px-6 overflow-hidden">
      
      {/* Background decoration */}
      <div className="glow-circle-blue top-12 left-10" />
      <div className="glow-circle-cyan bottom-12 right-10" />

      {/* Hero Header Section */}
      <div className="max-w-4xl text-center space-y-6 z-10 relative">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-cyan-400 text-xs font-mono mb-4 shadow-lg shadow-blue-500/5"
        >
          <Shield size={12} className="animate-pulse" />
          <span>IDENTITYTRUST AI &bull; ENTERPRISE GRADE v0.4.9</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400 leading-tight"
        >
          Continuous Identity Verification <br />
          <span className="text-cyan-400 text-glow-cyan">For Secure Digital Banking</span>
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          A privacy-first risk-based identity trust and fraud intelligence platform. 
          Analyze behavior biometrics, device signatures, and coordinated network campaigns to block takeovers in real-time.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row justify-center gap-4"
        >
          <button 
            onClick={() => setView('soc')}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer hover:shadow-cyan-500/20"
          >
            Launch SOC Platform
            <ArrowRight size={16} />
          </button>
          
          <button 
            onClick={() => setView('risk-engine')}
            className="px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            Simulate Risk Engine
          </button>
        </motion.div>
      </div>

      {/* Grid: Problem Statement & Features */}
      <div className="max-w-6xl w-full mt-24 grid md:grid-cols-2 gap-12 z-10">
        
        {/* Problems Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-red-500 w-5 h-5" />
            <h2 className="text-xl font-bold tracking-wide text-slate-200">The Problem</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {problemPoints.map((p, idx) => (
              <div key={idx} className="glass-panel p-5 rounded-xl border border-red-500/10 hover:border-red-500/25 transition-all">
                <h3 className="text-sm font-semibold text-red-400 mb-1.5">{p.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features/Pillars Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Zap className="text-cyan-400 w-5 h-5" />
            <h2 className="text-xl font-bold tracking-wide text-slate-200">The Solution</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className="glass-panel p-5 rounded-xl border border-cyan-500/10 hover:border-cyan-500/25 transition-all space-y-2">
                  <Icon className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-sm font-semibold text-slate-200">{f.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Interactive Platform Flow Mockup */}
      <div className="max-w-6xl w-full mt-24 space-y-6 z-10">
        <h2 className="text-xl font-bold text-center tracking-wide text-slate-200">Platform Data Architecture</h2>
        <div className="glass-panel p-6 rounded-2xl border border-slate-800/80 bg-slate-900/40 relative overflow-hidden flex flex-col md:flex-row justify-around gap-6 items-center">
          
          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center w-full max-w-[180px]">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Ingress</span>
            <span className="text-xs text-slate-300 font-semibold">User Sessions</span>
            <span className="text-[10px] text-slate-500 font-mono mt-1">IP, Geolocation, SMS logs</span>
          </div>

          <div className="text-slate-600 hidden md:block">&rarr;</div>

          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center w-full max-w-[180px] relative">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Analysis</span>
            <span className="text-xs text-slate-300 font-semibold">Risk Scorer Engine</span>
            <span className="text-[10px] text-amber-500 font-mono mt-1">Calculating Trust Score</span>
          </div>

          <div className="text-slate-600 hidden md:block">&rarr;</div>

          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-center w-full max-w-[180px]">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-2">Fingerprint</span>
            <span className="text-xs text-slate-300 font-semibold">Vector Similarity</span>
            <span className="text-[10px] text-slate-500 font-mono mt-1">Matching DNA in DB</span>
          </div>

          <div className="text-slate-600 hidden md:block">&rarr;</div>

          <div className="flex flex-col items-center p-4 rounded-xl bg-slate-950/60 border border-blue-900 text-center w-full max-w-[180px]">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-2">Outcome</span>
            <span className="text-xs text-cyan-400 font-semibold">Adaptive Enforcer</span>
            <span className="text-[10px] text-emerald-400 font-mono mt-1">OTP / Face / Block</span>
          </div>
        </div>
      </div>

      {/* Tech Stack Details */}
      <div className="max-w-6xl w-full mt-24 space-y-6 z-10">
        <h2 className="text-xl font-bold tracking-wide text-slate-200">Technology Architecture Stack</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
          {techStack.map((tech, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-xl border border-slate-850 flex flex-col gap-2 bg-slate-950/30">
              <span className="text-xs font-bold text-slate-200 font-mono text-cyan-400">{tech.name}</span>
              <p className="text-[11px] text-slate-400 leading-normal">{tech.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
