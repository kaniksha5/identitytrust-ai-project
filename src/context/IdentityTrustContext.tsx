"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  generateMockData, 
  Customer, 
  Device, 
  SOCAlert, 
  Campaign, 
  InsiderIncident, 
  KYCRequest, 
  Transaction 
} from '../utils/mockDataGenerator';

interface RiskEngineSettings {
  riskThreshold: number;
  otpThreshold: number;
  faceThreshold: number;
  sessionTimeout: number;
  allowedCountries: string[];
  notifications: {
    criticalEmail: boolean;
    smsOnBlock: boolean;
    slackAlerts: boolean;
  };
}

interface IdentityTrustContextType {
  customers: Customer[];
  devices: Device[];
  alerts: SOCAlert[];
  campaigns: Campaign[];
  insiderIncidents: InsiderIncident[];
  kycRequests: KYCRequest[];
  transactions: Transaction[];
  currentView: string;
  setView: (view: string) => void;
  selectedAlert: SOCAlert | null;
  setSelectedAlert: (alert: SOCAlert | null) => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  selectedCampaign: Campaign | null;
  setSelectedCampaign: (campaign: Campaign | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  settings: RiskEngineSettings;
  updateSettings: (newSettings: Partial<RiskEngineSettings>) => void;
  resolveAlert: (id: string, status: 'resolved' | 'dismissed') => void;
  resolveKYC: (id: string, status: 'Approve' | 'Reject' | 'Review') => void;
  addSystemAlert: (alert: Omit<SOCAlert, 'id' | 'timestamp' | 'status'>) => void;
  isInitialLoading: boolean;
}

const defaultSettings: RiskEngineSettings = {
  riskThreshold: 80,
  otpThreshold: 35,
  faceThreshold: 65,
  sessionTimeout: 15,
  allowedCountries: ['India', 'United States', 'Singapore', 'UAE', 'United Kingdom'],
  notifications: {
    criticalEmail: true,
    smsOnBlock: true,
    slackAlerts: false
  }
};

const IdentityTrustContext = createContext<IdentityTrustContextType | undefined>(undefined);

export const IdentityTrustProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{
    customers: Customer[];
    devices: Device[];
    alerts: SOCAlert[];
    campaigns: Campaign[];
    insiderIncidents: InsiderIncident[];
    kycRequests: KYCRequest[];
    transactions: Transaction[];
  } | null>(null);

  const [currentView, setView] = useState<string>('landing');
  const [selectedAlert, setSelectedAlert] = useState<SOCAlert | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [settings, setSettings] = useState<RiskEngineSettings>(defaultSettings);
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    // Generate data on mount
    const mockData = generateMockData();
    setData(mockData);
    setIsInitialLoading(false);
  }, []);

  const updateSettings = (newSettings: Partial<RiskEngineSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resolveAlert = (id: string, status: 'resolved' | 'dismissed') => {
    if (!data) return;
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        alerts: prev.alerts.map(alert => 
          alert.id === id ? { ...alert, status } : alert
        )
      };
    });
    // If selected, update that too
    setSelectedAlert(prev => prev && prev.id === id ? { ...prev, status } : prev);
  };

  const resolveKYC = (id: string, status: 'Approve' | 'Reject' | 'Review') => {
    if (!data) return;
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        kycRequests: prev.kycRequests.map(req => 
          req.id === id ? { ...req, status } : req
        )
      };
    });
  };

  const addSystemAlert = (alertData: Omit<SOCAlert, 'id' | 'timestamp' | 'status'>) => {
    if (!data) return;
    const newAlert: SOCAlert = {
      ...alertData,
      id: `ALRT-${4000 + data.alerts.length + 1}`,
      timestamp: new Date().toISOString(),
      status: 'open'
    };
    setData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        alerts: [newAlert, ...prev.alerts]
      };
    });
  };

  // Provide everything
  const value: IdentityTrustContextType = {
    customers: data?.customers || [],
    devices: data?.devices || [],
    alerts: data?.alerts || [],
    campaigns: data?.campaigns || [],
    insiderIncidents: data?.insiderIncidents || [],
    kycRequests: data?.kycRequests || [],
    transactions: data?.transactions || [],
    currentView,
    setView,
    selectedAlert,
    setSelectedAlert,
    selectedDevice,
    setSelectedDevice,
    selectedCampaign,
    setSelectedCampaign,
    searchQuery,
    setSearchQuery,
    settings,
    updateSettings,
    resolveAlert,
    resolveKYC,
    addSystemAlert,
    isInitialLoading
  };

  return (
    <IdentityTrustContext.Provider value={value}>
      {children}
    </IdentityTrustContext.Provider>
  );
};

export const useIdentityTrust = () => {
  const context = useContext(IdentityTrustContext);
  if (!context) {
    throw new Error('useIdentityTrust must be used within an IdentityTrustProvider');
  }
  return context;
};
