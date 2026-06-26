"use client";

import React from 'react';
import { IdentityTrustProvider, useIdentityTrust } from '../context/IdentityTrustContext';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { AIModuleStatus } from '../components/AIModuleStatus';
import { LandingPage } from '../views/LandingPage';
import { SOCDashboard } from '../views/SOCDashboard';
import { RiskEngine } from '../views/RiskEngine';
import { AdaptiveAuth } from '../views/AdaptiveAuth';
import { DeviceTrust } from '../views/DeviceTrust';
import { CampaignFingerprinting } from '../views/CampaignFingerprinting';
import { IncidentInvestigation } from '../views/IncidentInvestigation';
import { InsiderThreat } from '../views/InsiderThreat';
import { KYCVerification } from '../views/KYCVerification';
import { AlertsCenter } from '../views/AlertsCenter';
import { AnalyticsDashboard } from '../views/AnalyticsDashboard';
import { SettingsPanel } from '../views/SettingsPanel';

function MainAppContent() {
  const { currentView, isInitialLoading } = useIdentityTrust();

  if (isInitialLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-cyan-400 font-mono text-xs">
        <div className="space-y-4 text-center">
          <div className="w-10 h-10 border-2 border-dashed border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="tracking-widest uppercase">Initializing IdentityTrust AI Systems...</div>
        </div>
      </div>
    );
  }

  // Render full screen Landing page overview
  if (currentView === 'landing') {
    return <LandingPage />;
  }

  const renderView = () => {
    switch(currentView) {
      case 'soc': return <SOCDashboard />;
      case 'risk-engine': return <RiskEngine />;
      case 'adaptive-auth': return <AdaptiveAuth />;
      case 'device-trust': return <DeviceTrust />;
      case 'campaigns': return <CampaignFingerprinting />;
      case 'investigation': return <IncidentInvestigation />;
      case 'insider': return <InsiderThreat />;
      case 'kyc': return <KYCVerification />;
      case 'alerts': return <AlertsCenter />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'settings': return <SettingsPanel />;
      default: return <SOCDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Glow Effects in background */}
        <div className="glow-circle-blue -top-20 -left-20 opacity-30" />
        <div className="glow-circle-cyan -bottom-20 -right-20 opacity-30" />

        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
          {/* AI Engines Panel - Show at the top of dashboard views */}
          {['soc', 'risk-engine', 'analytics'].includes(currentView) && (
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">AI Operations Status</span>
              <AIModuleStatus />
            </div>
          )}

          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <IdentityTrustProvider>
      <MainAppContent />
    </IdentityTrustProvider>
  );
}
