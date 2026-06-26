"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { SOCAlert } from '../utils/mockDataGenerator';
import { 
  FileText, 
  MessageSquare, 
  Download, 
  Key, 
  Smartphone, 
  CreditCard, 
  Lock, 
  Cpu, 
  ShieldAlert, 
  Check, 
  AlertTriangle,
  Play
} from 'lucide-react';

export const IncidentInvestigation: React.FC = () => {
  const { alerts, selectedAlert, setSelectedAlert, resolveAlert } = useIdentityTrust();

  // If no alert is selected, default to the first one
  const activeAlert = selectedAlert || alerts.find(a => a.severity === 'critical') || alerts[0];

  const [expandedStep, setExpandedStep] = useState<number | null>(0);
  const [llmGenerating, setLlmGenerating] = useState<boolean>(false);
  const [llmSummary, setLlmSummary] = useState<string>('');

  const attackTimelineSteps = [
    {
      title: 'Phishing SMS Received',
      desc: 'User received SMS containing a link: "Urgent: Update your Bank accounts immediately to avoid suspension". Link leads to clone landing page.',
      timestamp: '14:02:10 GMT+5:30',
      icon: MessageSquare,
      color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
      details: {
        sender: 'AD-BOBALT',
        content: 'Dear customer, your bank login profile has expired. Verify now: https://bankofbaroda-secure-login.net/auth',
        matchingKeywords: ['expired', 'verify', 'bankofbaroda']
      }
    },
    {
      title: 'Malicious APK Payload Downloaded',
      desc: 'User landed on phishing domain and clicked download. SBI-Secure.apk sideloaded on device. Accessibility permissions requested & granted.',
      timestamp: '14:04:15 GMT+5:30',
      icon: Download,
      color: 'text-red-400 border-red-500/20 bg-red-500/5',
      details: {
        fileName: 'SBI-Secure.apk',
        package: 'com.sbi.rewards.security',
        fileHash: 'SHA-256: 8FA9E37B090F11C8E...A42B',
        permissions: ['BIND_ACCESSIBILITY_SERVICE', 'RECEIVE_SMS', 'READ_SMS']
      }
    },
    {
      title: 'OTP Interception & Stealing',
      desc: 'The malicious accessibility service activated a background keylogger. The Trojan APK intercepts SMS notifications, scraping incoming 2FA pins.',
      timestamp: '14:15:30 GMT+5:30',
      icon: Key,
      color: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
      details: {
        scrapedOtp: '409182',
        notificationSource: 'HDFC_ALERT',
        c2ServerUrl: 'http://45.109.11.82/endpoint/otp.php'
      }
    },
    {
      title: 'Suspicious Device Login Attempt',
      desc: 'Attacker used credentials and stolen OTP to authenticate from a rooted emulator in Romania, mimicking device identifiers.',
      timestamp: '14:16:02 GMT+5:30',
      icon: Smartphone,
      color: 'text-red-500 border-red-500/30 bg-red-500/5',
      details: {
        os: 'Android 15 (Emulator)',
        ip: '185.190.140.22 (Bucharest, Romania)',
        rootedStatus: 'TRUE',
        velocityCalculation: 'Impossible travel delta (Mumbai -> Romania in 12 min)'
      }
    },
    {
      title: 'High-Value Transfer Initiated',
      desc: 'Transfer of ₹450,000 initiated toward beneficiary account at Axis Bank. Risk score computed: 92/100.',
      timestamp: '14:17:15 GMT+5:30',
      icon: CreditCard,
      color: 'text-red-500 border-red-500/30 bg-red-500/5',
      details: {
        amount: '₹450,000',
        beneficiary: 'Axis Bank - 90918204918',
        actionTaken: 'Flagged, held for review'
      }
    },
    {
      title: 'Automated Account Locked & SOC Alert',
      desc: 'Adaptive authentication engine triggered block. Session terminated, beneficiary transfer frozen, account locked, alert dispatched.',
      timestamp: '14:17:22 GMT+5:30',
      icon: Lock,
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      details: {
        lockedAccountId: 'CUST-1082',
        sessionSuspended: 'TRUE',
        alertId: 'ALRT-4082',
        incidentResolution: 'Assigned to BOB_SOC_09'
      }
    }
  ];

  // Dynamic LLM explanation generation
  useEffect(() => {
    if (!activeAlert) return;
    setLlmGenerating(true);
    setLlmSummary('');

    const delay = setTimeout(() => {
      const summary = `
### Incident Summary: ${activeAlert.type}

**Attacker TTPs (Tactics, Techniques, and Procedures):**
1. **Phishing & Sideload Delivery (MITRE T1566):** The attacker targeted the user **${activeAlert.customerName}** with a SMiShing link claiming account suspension, sideloading a malicious payload containing an APK.
2. **Credential Theft (MITRE T1056):** The APK utilized Android Accessibility services to capture the user's keystrokes and session tokens.
3. **MFA Interception (MITRE T1111):** Stole incoming SMS 2FA tokens via background notification scraping.
4. **Impossible Velocity Travel (MITRE T1090):** Logged in from location **${activeAlert.location}** using IP **${activeAlert.ipAddress}** on a rooted emulator device, triggering the ZTA threshold bypass flag.

**AI Recommended Mitigation Advice:**
- **Blacklist Hardware UUID:** Immediately blacklist device hashes associated with IP **${activeAlert.ipAddress}**.
- **SMS MFA Reset:** Suspend credential access, reset active directory profiles, and prompt user to complete an in-branch facial biometrics enrollment.
- **Freeze Beneficiary Transfers:** Put a 24-hour holds on Axis Bank transfer beneficiaries associated with this session.
      `;
      setLlmSummary(summary);
      setLlmGenerating(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, [activeAlert]);

  const handleResolve = (action: 'resolved' | 'dismissed') => {
    if (activeAlert) {
      resolveAlert(activeAlert.id, action);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Forensic Incident Investigation</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Deep inspection of user session logs, vector correlation timelines, and LLM threat explanation.</p>
        </div>
        
        {activeAlert && activeAlert.status === 'open' && (
          <div className="flex gap-2 self-start">
            <button 
              onClick={() => handleResolve('resolved')}
              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
            >
              <Check size={12} />
              Resolve Case
            </button>
            <button 
              onClick={() => handleResolve('dismissed')}
              className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs cursor-pointer transition-all"
            >
              Dismiss Alert
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Forensics Timeline (2 cols) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-6 lg:col-span-2">
          
          <div className="flex items-center justify-between border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert size={14} className="text-red-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Attack Sequence Timeline: {activeAlert?.id || 'CASE-FORENSIC'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
              Status: {activeAlert?.status?.toUpperCase() || 'UNASSIGNED'}
            </span>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-6 pl-8 space-y-6">
            {attackTimelineSteps.map((step, idx) => {
              const Icon = step.icon;
              const isExpanded = expandedStep === idx;
              
              return (
                <div key={idx} className="relative group">
                  {/* Timeline point icon wrapper */}
                  <div 
                    onClick={() => setExpandedStep(isExpanded ? null : idx)}
                    className={`absolute -left-[53px] w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                      isExpanded 
                        ? 'bg-slate-900 border-cyan-400 text-cyan-400 shadow-md shadow-cyan-500/10' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 group-hover:border-slate-700'
                    }`}
                  >
                    <Icon size={16} />
                  </div>

                  {/* Text Container */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">{step.timestamp}</span>
                      <h4 
                        onClick={() => setExpandedStep(isExpanded ? null : idx)}
                        className="text-xs font-bold text-slate-200 hover:text-cyan-400 cursor-pointer transition-colors"
                      >
                        {step.title}
                      </h4>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-xl">
                      {step.desc}
                    </p>

                    {/* Collapsible Details */}
                    {isExpanded && (
                      <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-4 mt-3 space-y-2 text-[10px] font-mono text-slate-400">
                        {Object.entries(step.details).map(([key, val]) => (
                          <div key={key} className="flex justify-between py-1 border-b border-slate-900/60 last:border-b-0">
                            <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span className="text-slate-300 font-semibold">{String(val)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: LLM Explainability and Incident Analysis */}
        <div className="space-y-6">
          
          {/* AI explainer panel */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4 bg-gradient-to-b from-slate-900/20 to-slate-950/40">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <Cpu size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">LLM Fraud Explanation</span>
            </div>

            {llmGenerating ? (
              <div className="space-y-4 py-12 text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-cyan-400 border-t-transparent animate-spin" />
                <span className="text-[10px] font-mono text-cyan-400">Gemini generative summary computing...</span>
              </div>
            ) : (
              <div className="text-[11px] leading-relaxed text-slate-300 space-y-3 font-sans">
                {/* Simulated Markdown Render */}
                <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-900/60 space-y-3 whitespace-pre-line font-mono text-slate-400 text-[10px]">
                  {llmSummary || 'No forensic analysis generated for this case.'}
                </div>
              </div>
            )}
          </div>

          {/* Incident Info card */}
          <div className="glass-panel p-4 rounded-xl border border-slate-850 text-xs space-y-3">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block border-b border-slate-900 pb-1.5">Case Metadata</span>
            <div className="space-y-2 font-mono text-slate-400 text-[10px]">
              <div className="flex justify-between">
                <span>Account Name:</span>
                <span className="text-slate-200">{activeAlert?.customerName || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span>Account ID:</span>
                <span className="text-slate-200">{activeAlert?.customerId || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span>Threat IP Address:</span>
                <span className="text-cyan-400">{activeAlert?.ipAddress || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span>Evaluated Location:</span>
                <span className="text-slate-200">{activeAlert?.location || 'None'}</span>
              </div>
              <div className="flex justify-between">
                <span>Severity Index:</span>
                <span className="text-red-500 font-bold uppercase">{activeAlert?.severity || 'Low'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default IncidentInvestigation;
