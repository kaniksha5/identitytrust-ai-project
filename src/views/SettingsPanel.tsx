"use client";

import React, { useState } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { Settings, Save, ShieldAlert, Bell, Globe, Lock, ShieldCheck } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { settings, updateSettings } = useIdentityTrust();

  const [riskThreshold, setRiskThreshold] = useState<number>(settings.riskThreshold);
  const [otpThreshold, setOtpThreshold] = useState<number>(settings.otpThreshold);
  const [faceThreshold, setFaceThreshold] = useState<number>(settings.faceThreshold);
  const [sessionTimeout, setSessionTimeout] = useState<number>(settings.sessionTimeout);
  const [allowedCountries, setAllowedCountries] = useState<string[]>(settings.allowedCountries);
  
  const [criticalEmail, setCriticalEmail] = useState<boolean>(settings.notifications.criticalEmail);
  const [smsOnBlock, setSmsOnBlock] = useState<boolean>(settings.notifications.smsOnBlock);
  const [slackAlerts, setSlackAlerts] = useState<boolean>(settings.notifications.slackAlerts);

  const countriesOptions = ['India', 'United States', 'Singapore', 'UAE', 'United Kingdom', 'Romania', 'Russia', 'China', 'Germany', 'Canada'];

  const handleSave = () => {
    updateSettings({
      riskThreshold,
      otpThreshold,
      faceThreshold,
      sessionTimeout,
      allowedCountries,
      notifications: {
        criticalEmail,
        smsOnBlock,
        slackAlerts
      }
    });
    alert('Security policy configurations saved successfully.');
  };

  const handleCountryToggle = (country: string) => {
    setAllowedCountries(prev => 
      prev.includes(country) 
        ? prev.filter(c => c !== country) 
        : [...prev, country]
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Adaptive Security Policy Settings</h1>
          <p className="text-xs text-slate-400 font-sans mt-0.5">Customize risk scoring thresholds, multi-factor triggers, and geolocation blacklists.</p>
        </div>
        
        <button 
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/10 cursor-pointer"
        >
          <Save size={12} />
          Save Configurations
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sliders Risk Policy (2 cols) */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-6 lg:col-span-2">
          
          <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
            <Lock size={14} className="text-cyan-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Authentication Thresholds Policy</span>
          </div>

          <div className="space-y-6">
            {/* Risk threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-350 font-semibold">Strict Block Threshold Score</span>
                <span className="font-mono text-red-400 font-bold">TS &lt; {riskThreshold}</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={riskThreshold}
                onChange={(e) => setRiskThreshold(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Any session falling below this trust score is blocked instantly. Recommended: 30.</span>
            </div>

            {/* Face ID ID verification threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-355 font-semibold">Face Biometric Challenge Threshold</span>
                <span className="font-mono text-orange-400 font-bold">TS &lt; {faceThreshold}</span>
              </div>
              <input
                type="range"
                min="35"
                max="85"
                value={faceThreshold}
                onChange={(e) => setFaceThreshold(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Sessions below this score are challenged with physical biometric scans. Recommended: 65.</span>
            </div>

            {/* OTP threshold */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-355 font-semibold">SMS OTP Challenge Threshold</span>
                <span className="font-mono text-amber-400 font-bold">TS &lt; {otpThreshold}</span>
              </div>
              <input
                type="range"
                min="60"
                max="95"
                value={otpThreshold}
                onChange={(e) => setOtpThreshold(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Sessions below this score are prompted to enter an SMS OTP verification. Recommended: 80.</span>
            </div>

            {/* Session Timeout */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-355 font-semibold">Active Session Max Timeout</span>
                <span className="font-mono text-cyan-400 font-bold">{sessionTimeout} Minutes</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono">Maximum session duration for zero-trust compliance before re-authentication is required.</span>
            </div>
          </div>

        </div>

        {/* Right side: Countries Whitelist & Notifications (1 col) */}
        <div className="space-y-6">
          
          {/* Geolocation check */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <Globe size={14} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Whitelisted Geolocations</span>
            </div>

            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {countriesOptions.map(country => {
                const isChecked = allowedCountries.includes(country);
                return (
                  <label key={country} className="flex items-center justify-between text-xs py-1 cursor-pointer">
                    <span className={isChecked ? 'text-slate-200 font-semibold' : 'text-slate-500'}>{country}</span>
                    <input 
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCountryToggle(country)}
                      className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
            <span className="text-[9px] text-slate-500 font-mono">Sessions originating from un-checked countries will trigger automatic +30 Geo-Risk penalties.</span>
          </div>

          {/* Incident Warnings notifications config */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-850 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-900 pb-3">
              <Bell size={14} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Alert Dispatch Settings</span>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-semibold">Email Critical Alerts</span>
                  <span className="text-[9px] text-slate-500 font-mono">Email BOB_SOC_09 on Critical events</span>
                </div>
                <input 
                  type="checkbox"
                  checked={criticalEmail}
                  onChange={(e) => setCriticalEmail(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                />
              </label>

              {/* SMS on block */}
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-semibold">SMS Dispatch on Blocks</span>
                  <span className="text-[9px] text-slate-500 font-mono">SMS client when session blocked</span>
                </div>
                <input 
                  type="checkbox"
                  checked={smsOnBlock}
                  onChange={(e) => setSmsOnBlock(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                />
              </label>

              {/* Slack alerts */}
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-slate-200 font-semibold">Slack Operations Sync</span>
                  <span className="text-[9px] text-slate-500 font-mono">Stream SOC alerts to #sec-alerts</span>
                </div>
                <input 
                  type="checkbox"
                  checked={slackAlerts}
                  onChange={(e) => setSlackAlerts(e.target.checked)}
                  className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-cyan-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default SettingsPanel;
