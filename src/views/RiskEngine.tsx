"use client";

import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, RefreshCw, Cpu, Key, HelpCircle } from 'lucide-react';

export const RiskEngine: React.FC = () => {
  // Slider Inputs (0 to 100, where higher is worse/higher risk, except Device Trust and Behavior Score where higher is better)
  const [deviceTrust, setDeviceTrust] = useState<number>(90);
  const [behaviorScore, setBehaviorScore] = useState<number>(95);
  const [geoRisk, setGeoRisk] = useState<number>(10);
  const [velocityRisk, setVelocityRisk] = useState<number>(0);
  const [transactionRisk, setTransactionRisk] = useState<number>(5);
  const [campaignMatch, setCampaignMatch] = useState<number>(0);

  // Toggle Inputs
  const [anomalousBiometrics, setAnomalousBiometrics] = useState<boolean>(false);
  const [rootedDevice, setRootedDevice] = useState<boolean>(false);
  const [vpnDetected, setVpnDetected] = useState<boolean>(false);
  const [otpFailures, setOtpFailures] = useState<number>(0);

  // Outputs
  const [trustScore, setTrustScore] = useState<number>(95);
  const [riskCategory, setRiskCategory] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');
  const [reasons, setReasons] = useState<string[]>([]);
  const [recommendedAction, setRecommendedAction] = useState<string>('');

  // Calculate live risk
  useEffect(() => {
    // Base trust calculation
    // Max positive contributions: Device Trust (25%), Behavior Score (25%), 
    // Geo Risk (inverse, 10%), Velocity (inverse, 10%), Transaction (inverse, 15%), Campaign (inverse, 15%)
    let base = (deviceTrust * 0.25) + 
               (behaviorScore * 0.25) + 
               ((100 - geoRisk) * 0.10) + 
               ((100 - velocityRisk) * 0.10) + 
               ((100 - transactionRisk) * 0.15) + 
               ((100 - campaignMatch) * 0.15);

    // Apply strict penalties
    if (rootedDevice) base -= 35;
    if (vpnDetected) base -= 15;
    if (anomalousBiometrics) base -= 25;
    base -= (otpFailures * 12);

    // Clamp score
    const finalScore = Math.max(0, Math.min(100, Math.round(base)));
    setTrustScore(finalScore);

    // Determine Category
    let category: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (finalScore < 30) {
      category = 'Critical';
    } else if (finalScore < 55) {
      category = 'High';
    } else if (finalScore < 80) {
      category = 'Medium';
    }
    setRiskCategory(category);

    // Generate Reasons
    const activeReasons: string[] = [];
    if (rootedDevice) activeReasons.push('Device integrity compromised: OS is Rooted/Jailbroken.');
    if (vpnDetected) activeReasons.push('Active VPN/Proxy network tunnel detected.');
    if (anomalousBiometrics) activeReasons.push('Continuous behavior biometrics deviate from user profile.');
    if (otpFailures > 0) activeReasons.push(`${otpFailures} consecutive MFA OTP submission failures.`);
    if (campaignMatch > 50) activeReasons.push(`High similarity index (${campaignMatch}%) with active fraud campaigns.`);
    if (geoRisk > 60) activeReasons.push('Atypical login location detected.');
    if (velocityRisk > 70) activeReasons.push('Speed velocity anomaly (Impossible travel distance).');
    if (transactionRisk > 60) activeReasons.push('Out-of-pattern high value transaction request.');
    if (deviceTrust < 50 && !rootedDevice) activeReasons.push('Low device fingerprint confidence score.');
    if (behaviorScore < 50 && !anomalousBiometrics) activeReasons.push('Atypical session navigation flow.');

    if (activeReasons.length === 0) {
      activeReasons.push('All telemetry parameters are within normal baseline values.');
    }
    setReasons(activeReasons);

    // Recommended Actions
    let action = '';
    switch(category) {
      case 'Low':
        action = 'ALLOW. Access granted instantly. Seamless user experience.';
        break;
      case 'Medium':
        action = 'CHALLENGE. Prompt SMS/Email One-Time Password (OTP) verification.';
        break;
      case 'High':
        action = 'INTENSE CHALLENGE. Trigger Face Biometric and liveness check.';
        break;
      case 'Critical':
        action = 'BLOCK. Terminate active session, lock accounts, and issue urgent SOC alert.';
        break;
    }
    setRecommendedAction(action);
  }, [
    deviceTrust, behaviorScore, geoRisk, velocityRisk, transactionRisk, campaignMatch,
    anomalousBiometrics, rootedDevice, vpnDetected, otpFailures
  ]);

  const handleReset = () => {
    setDeviceTrust(95);
    setBehaviorScore(95);
    setGeoRisk(10);
    setVelocityRisk(0);
    setTransactionRisk(5);
    setCampaignMatch(0);
    setAnomalousBiometrics(false);
    setRootedDevice(false);
    setVpnDetected(false);
    setOtpFailures(0);
  };

  // Color Mapping
  const getCategoryColor = () => {
    switch(riskCategory) {
      case 'Low': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
      case 'Medium': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
      case 'High': return 'text-orange-400 border-orange-500/20 bg-orange-500/5';
      case 'Critical': return 'text-red-500 border-red-500/20 bg-red-500/5';
    }
  };

  const getGaugeStroke = () => {
    switch(riskCategory) {
      case 'Low': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'High': return '#F97316';
      case 'Critical': return '#EF4444';
    }
  };

  // SVG Gauge calculations
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (trustScore / 100) * circumference;

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100">Live Risk Calculation Engine</h1>
          <p className="text-xs text-slate-400">Playground to simulate incoming telemetry and see the dynamic identity trust evaluation.</p>
        </div>
        <button 
          onClick={handleReset}
          className="px-3 py-1.5 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-mono text-cyan-400 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset Baseline
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Input Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-6 lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Cpu size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Continuous Telemetry Sliders</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
            {/* Device Trust */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Device Trust Index</span>
                <span className="font-mono text-emerald-400 font-bold">{deviceTrust}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={deviceTrust}
                onChange={(e) => setDeviceTrust(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = device hardware/OS is verified and trusted.</span>
            </div>

            {/* Behavior Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Behavior Score</span>
                <span className="font-mono text-emerald-400 font-bold">{behaviorScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={behaviorScore}
                onChange={(e) => setBehaviorScore(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = session events align with standard customer habits.</span>
            </div>

            {/* Geo Risk */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Geographic Risk</span>
                <span className="font-mono text-orange-400 font-bold">{geoRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={geoRisk}
                onChange={(e) => setGeoRisk(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = login IP located in blacklisted/atypical location.</span>
            </div>

            {/* Velocity Risk */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Velocity Risk</span>
                <span className="font-mono text-orange-400 font-bold">{velocityRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={velocityRisk}
                onChange={(e) => setVelocityRisk(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = impossible distance traveled between logins.</span>
            </div>

            {/* Transaction Risk */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Transaction Amount Risk</span>
                <span className="font-mono text-orange-400 font-bold">{transactionRisk}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={transactionRisk}
                onChange={(e) => setTransactionRisk(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = transfer size deviates from typical transaction profile.</span>
            </div>

            {/* Campaign Match */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Campaign DNA Match %</span>
                <span className="font-mono text-red-400 font-bold">{campaignMatch}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={campaignMatch}
                onChange={(e) => setCampaignMatch(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Higher = matching markers of known coordinated phishing rings.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 border-b border-slate-900 pb-3 mt-4">
            <Key size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Boolean Flags & Challenges</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Rooted Device */}
            <button 
              onClick={() => setRootedDevice(!rootedDevice)}
              className={`p-3 rounded-lg border text-center transition-all text-xs font-mono cursor-pointer ${
                rootedDevice 
                  ? 'bg-red-500/10 border-red-500/40 text-red-400 font-bold' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Rooted Device
              <div className="text-[9px] mt-1 text-slate-500 font-normal">Penalty: -35</div>
            </button>

            {/* VPN Detected */}
            <button 
              onClick={() => setVpnDetected(!vpnDetected)}
              className={`p-3 rounded-lg border text-center transition-all text-xs font-mono cursor-pointer ${
                vpnDetected 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              VPN Detected
              <div className="text-[9px] mt-1 text-slate-500 font-normal">Penalty: -15</div>
            </button>

            {/* Anomalous Biometrics */}
            <button 
              onClick={() => setAnomalousBiometrics(!anomalousBiometrics)}
              className={`p-3 rounded-lg border text-center transition-all text-xs font-mono cursor-pointer ${
                anomalousBiometrics 
                  ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 font-bold' 
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Anomalous Biometrics
              <div className="text-[9px] mt-1 text-slate-500 font-normal">Penalty: -25</div>
            </button>

            {/* OTP Failure Count */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2.5 flex flex-col justify-between items-center text-center">
              <span className="text-xs text-slate-400 font-mono">OTP Failures</span>
              <div className="flex gap-1.5 items-center mt-1">
                {[0, 1, 2, 3].map(num => (
                  <button 
                    key={num}
                    onClick={() => setOtpFailures(num)}
                    className={`w-5 h-5 rounded text-[10px] font-bold font-mono transition-all cursor-pointer ${
                      otpFailures === num 
                        ? 'bg-cyan-500 text-slate-950 font-black' 
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-400'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Engine Output Gauge Panel */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col items-center text-center gap-6 relative">
          <div className="w-full flex items-center justify-between border-b border-slate-900 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-sans">Identity Assessment</span>
            <span className="text-[10px] text-cyan-400 font-mono">Risk Engine v2</span>
          </div>

          {/* SVG Gauge */}
          <div className="relative w-40 h-40 flex items-center justify-center mt-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Back Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800 fill-none"
                strokeWidth={strokeWidth}
              />
              {/* Active Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="fill-none transition-all duration-500 ease-out"
                stroke={getGaugeStroke()}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDasharray-dashoffset={offset}
                strokeDashoffset={offset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black font-sans text-slate-100">{trustScore}</span>
              <span className="text-[9px] font-mono tracking-widest text-slate-500">TRUST SCORE</span>
            </div>
          </div>

          {/* Risk Category Badge */}
          <div className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${getCategoryColor()}`}>
            RISK: {riskCategory}
          </div>

          {/* Decision recommendation */}
          <div className="w-full text-left space-y-2 bg-slate-950/40 p-4 rounded-xl border border-slate-900">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Recommended Decision</span>
            <span className="text-xs font-bold text-slate-200 block">{recommendedAction}</span>
          </div>

          {/* Detailed explanations */}
          <div className="w-full text-left space-y-2">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Risk Telemetry Rationale</span>
            <div className="space-y-1.5 overflow-y-auto max-h-44 pr-1">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[10px] leading-relaxed text-slate-400">
                  <span className="text-cyan-400 font-bold shrink-0 mt-0.5">&bull;</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
