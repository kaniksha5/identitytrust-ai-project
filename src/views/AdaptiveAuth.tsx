"use client";

import React, { useState, useEffect } from 'react';
import { useIdentityTrust } from '../context/IdentityTrustContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, Eye, User, Lock, CheckCircle, AlertTriangle, RefreshCw, Send, Smartphone } from 'lucide-react';

export const AdaptiveAuth: React.FC = () => {
  const { addSystemAlert } = useIdentityTrust();

  // Step state: 'form' | 'checking' | 'outcome' | 'otp' | 'face' | 'blocked' | 'success'
  const [step, setStep] = useState<'form' | 'checking' | 'otp' | 'face' | 'blocked' | 'success'>('form');
  const [username, setUsername] = useState<string>('ananya.sharma');
  const [password, setPassword] = useState<string>('••••••••••••');
  
  // Selected Profile
  const [deviceProfile, setDeviceProfile] = useState<'trusted' | 'rooted' | 'unknown'>('trusted');
  const [locationProfile, setLocationProfile] = useState<'domestic' | 'impossible' | 'suspicious'>('domestic');

  // Calculated Risk Category
  const [calculatedRisk, setCalculatedRisk] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Low');
  const [calculatedScore, setCalculatedScore] = useState<number>(95);

  // OTP inputs
  const [otpCode, setOtpCode] = useState<string>('');
  
  // Face Scan Simulation states
  const [faceProgress, setFaceProgress] = useState<number>(0);
  const [faceStatus, setFaceStatus] = useState<string>('Initializing Camera...');

  // Start Simulation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('checking');

    // Calculate simulated risk category
    let score = 95; // Starting trust
    if (deviceProfile === 'rooted') score -= 35;
    if (deviceProfile === 'unknown') score -= 15;
    if (locationProfile === 'impossible') score -= 50;
    if (locationProfile === 'suspicious') score -= 20;

    const finalScore = Math.max(5, score);
    setCalculatedScore(finalScore);

    let category: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (finalScore < 30) {
      category = 'Critical';
    } else if (finalScore < 55) {
      category = 'High';
    } else if (finalScore < 80) {
      category = 'Medium';
    }
    setCalculatedRisk(category);

    // Simulate analysis delay
    setTimeout(() => {
      if (category === 'Low') {
        setStep('success');
      } else if (category === 'Medium') {
        setStep('otp');
      } else if (category === 'High') {
        setStep('face');
      } else {
        setStep('blocked');
        // Trigger SOC Alert in background
        addSystemAlert({
          type: 'Critical Account Takeover',
          severity: 'critical',
          customerName: username,
          customerId: 'CUST-1082',
          ipAddress: '185.190.140.22',
          location: locationProfile === 'impossible' ? 'Bucharest, Romania' : 'Mumbai, India',
          description: `Critical login threat flagged during adaptive auth. Rooted device linked with suspicious geolocation velocity.`,
          recommendedAction: 'De-authorize device UUID, freeze account, prompt manual identification upload.',
          details: { deviceType: deviceProfile, locationType: locationProfile }
        });
      }
    }, 2500);
  };

  // OTP Verification
  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      setStep('checking');
      setTimeout(() => {
        setStep('success');
      }, 1500);
    }
  };

  // Face Scan effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 'face') {
      setFaceProgress(0);
      setFaceStatus('Aligning face within frame...');
      
      const runScan = () => {
        setFaceProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setFaceStatus('Liveness verified. Identity matched!');
            setTimeout(() => {
              setStep('success');
            }, 1200);
            return 100;
          }
          const next = prev + 10;
          if (next === 30) setFaceStatus('Scanning features (148 landmark nodes)...');
          if (next === 60) setFaceStatus('Running Generative Deepfake discriminator check...');
          if (next === 90) setFaceStatus('Verifying cryptographic facial token...');
          return next;
        });
      };
      timer = setInterval(runScan, 350);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handleReset = () => {
    setStep('form');
    setOtpCode('');
    setDeviceProfile('trusted');
    setLocationProfile('domestic');
  };

  return (
    <div className="space-y-6">
      
      {/* View Header */}
      <div>
        <h1 className="text-xl font-bold tracking-wide text-slate-100 font-sans">Adaptive Authentication Simulator</h1>
        <p className="text-xs text-slate-400 font-sans mt-0.5">Test how the risk engine dynamically changes the customer login experience based on risk profiles.</p>
      </div>

      <div className="max-w-2xl mx-auto glass-panel p-6 rounded-2xl border border-slate-800 bg-slate-900/30 overflow-hidden relative min-h-[420px] flex flex-col justify-center">
        
        {/* Decorative Grid Ingress Background */}
        <div className="absolute inset-0 bg-grid-cyber opacity-20 pointer-events-none" />

        <AnimatePresence mode="wait">
          
          {/* Step 1: Login Form */}
          {step === 'form' && (
            <motion.form 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleLoginSubmit}
              className="space-y-5 z-10"
            >
              <div className="text-center space-y-1.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center mx-auto">
                  <Key size={18} />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">Customer Portal Login</h2>
                <p className="text-[10px] text-slate-500 font-mono">Select telemetry characteristics below to simulate risk states.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input 
                      type="password" 
                      value={password}
                      disabled
                      className="w-full bg-slate-950/40 border border-slate-850 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* Simulation Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-850/80 pt-4">
                {/* Device Profile Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Smartphone size={10} className="text-cyan-400" />
                    Device Fingerprint
                  </label>
                  <select 
                    value={deviceProfile} 
                    onChange={(e: any) => setDeviceProfile(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="trusted">iPhone 15 - Trusted Hardware Token (Score: 95)</option>
                    <option value="unknown">Windows 11 Laptop - Unrecognized (Score: 80)</option>
                    <option value="rooted">Android Emulator - Jailbroken/Rooted (Score: 45)</option>
                  </select>
                </div>

                {/* Location Profile Select */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                    <Shield size={10} className="text-cyan-400" />
                    Network & Geolocation
                  </label>
                  <select 
                    value={locationProfile} 
                    onChange={(e: any) => setLocationProfile(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/60"
                  >
                    <option value="domestic">Mumbai, India - Domestic IP (Verified)</option>
                    <option value="suspicious">London, UK - Active VPN connection</option>
                    <option value="impossible">Bucharest, Romania - Impossible travel speed</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/10 cursor-pointer"
              >
                Simulate Sign In Request
              </button>
            </motion.form>
          )}

          {/* Step 2: Checking State */}
          {step === 'checking' && (
            <motion.div 
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4 z-10 py-6"
            >
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 border-t-transparent animate-spin mx-auto flex items-center justify-center">
                <Shield className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono font-bold tracking-widest text-cyan-400">EVALUATING RISK MATRIX</h3>
                <p className="text-[10px] text-slate-500 font-mono">Running behavioral biometric matches & device trust checks...</p>
              </div>
            </motion.div>
          )}

          {/* Step 3: OTP Secondary Verification */}
          {step === 'otp' && (
            <motion.form 
              key="otp"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleOtpVerify}
              className="space-y-5 z-10 text-center py-4"
            >
              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono text-amber-400">
                  MFA CHALLENGE REQUIRED
                </span>
                <h3 className="text-sm font-bold text-slate-200 mt-2">Enter SMS One-Time Password</h3>
                <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Moderate risk level detected (Trust Score: <strong className="text-amber-400">{calculatedScore}</strong>). We sent a 6-digit OTP code to verified device.
                </p>
              </div>

              <div className="max-w-[200px] mx-auto space-y-3">
                <input 
                  type="text" 
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="w-full text-center bg-slate-950 border border-slate-800 rounded-lg py-2.5 text-lg font-bold font-mono tracking-widest text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
                <span className="text-[9px] text-slate-500 font-mono block">Hint: Enter any 6 digits to verify</span>
              </div>

              <div className="flex gap-3 max-w-xs mx-auto">
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="w-1/2 py-2 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-xs transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={otpCode.length !== 6}
                  className="w-1/2 py-2 rounded bg-cyan-500 disabled:opacity-50 text-slate-950 font-bold text-xs transition-all cursor-pointer"
                >
                  Verify Code
                </button>
              </div>
            </motion.form>
          )}

          {/* Step 4: Biometric Face Scan Challenge */}
          {step === 'face' && (
            <motion.div 
              key="face"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 z-10 text-center py-4"
            >
              <div className="space-y-1.5">
                <span className="px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-[10px] font-mono text-orange-400">
                  BIOMETRIC CHALLENGE ENFORCED
                </span>
                <h3 className="text-sm font-bold text-slate-200 mt-1.5">Zero-Trust Biometric Check</h3>
                <p className="text-[10px] text-slate-400 max-w-sm mx-auto leading-relaxed">
                  High-risk authentication context detected (Trust Score: <strong className="text-orange-400">{calculatedScore}</strong>). Triggering instant face verification.
                </p>
              </div>

              {/* Scanner Simulation Graphics */}
              <div className="relative w-40 h-40 border border-slate-800 rounded-full mx-auto bg-slate-950/60 overflow-hidden flex items-center justify-center">
                
                {/* Simulated webcam video background */}
                <div className="absolute inset-0 flex items-center justify-center text-slate-800">
                  <User size={96} className="text-slate-900 animate-pulse" />
                </div>

                {/* Rotating scanning matrix overlay */}
                <div className="absolute inset-2 border-2 border-cyan-400/20 rounded-full border-t-cyan-400/80 animate-spin" style={{ animationDuration: '4s' }} />
                
                {/* Horizontal scan line */}
                <motion.div 
                  animate={{ y: [-70, 70, -70] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-0.5 bg-cyan-400/80 shadow-md shadow-cyan-400/50 pointer-events-none"
                />

                {/* Success Indicator */}
                {faceProgress === 100 && (
                  <div className="absolute inset-0 bg-emerald-950/90 flex items-center justify-center flex-col text-emerald-400 gap-1.5">
                    <CheckCircle className="w-8 h-8" />
                    <span className="text-[10px] font-mono tracking-widest font-bold">MATCH: 98.4%</span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 max-w-xs mx-auto">
                <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-900 overflow-hidden">
                  <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${faceProgress}%` }} />
                </div>
                <span className="text-[9px] font-mono text-cyan-400 block">{faceStatus}</span>
              </div>

              <button 
                onClick={handleReset}
                className="px-4 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-[10px] transition-all cursor-pointer mx-auto block"
              >
                Abort Scan
              </button>
            </motion.div>
          )}

          {/* Step 5: Critical Access Blocked */}
          {step === 'blocked' && (
            <motion.div 
              key="blocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-5 z-10 py-6"
            >
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 flex items-center justify-center mx-auto animate-pulse">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-red-500">Authentication Blocked</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  The IdentityTrust Engine detected critical indicators of account takeover (Trust Score: <strong className="text-red-500">{calculatedScore}</strong>). Access has been revoked, and an incident report was dispatched to the Bank SOC.
                </p>
              </div>

              <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-850 max-w-xs mx-auto text-left text-[10px] font-mono space-y-1 text-slate-500">
                <div><span className="text-slate-400">Source Device:</span> {deviceProfile} emulator</div>
                <div><span className="text-slate-400">Detected Network:</span> {locationProfile} location</div>
                <div><span className="text-slate-400">Response Action:</span> Session Terminated, Alerts raised</div>
              </div>

              <button 
                onClick={handleReset}
                className="px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-all cursor-pointer mx-auto flex items-center gap-1.5"
              >
                <RefreshCw size={12} />
                Try Login Again
              </button>
            </motion.div>
          )}

          {/* Step 6: Access Granted (Success) */}
          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-5 z-10 py-6"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/5">
                <CheckCircle size={24} className="animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-200">Access Granted</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Verification successful. Identity trust validated at <strong className="text-emerald-400">{calculatedScore}%</strong>.
                </p>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-850 max-w-xs mx-auto text-left text-[10px] font-mono space-y-1 text-slate-500">
                <div><span className="text-slate-400">Session ID:</span> {Math.random().toString(36).substring(2, 12).toUpperCase()}</div>
                <div><span className="text-slate-400">Auth Token:</span> JWT_VERIFIED_SECURE</div>
                <div><span className="text-slate-400">Session Max:</span> 15 Minutes (Zero-Trust Mode)</div>
              </div>

              <button 
                onClick={handleReset}
                className="px-6 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-all cursor-pointer mx-auto flex items-center gap-1.5"
              >
                <RefreshCw size={12} />
                Return to Login
              </button>
            </motion.div>
          )}

        </AnimatePresence>

      </div>

    </div>
  );
};
