// Mock Data Generator for IdentityTrust AI

export interface Customer {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  status: 'active' | 'suspended' | 'under_review';
  accountBalance: number;
  joinDate: string;
  phone: string;
  city: string;
  country: string;
}

export interface Device {
  id: string;
  userId: string;
  userName: string;
  os: string;
  browser: string;
  ip: string;
  location: string;
  isRooted: boolean;
  isEmulator: boolean;
  isVpn: boolean;
  trustScore: number;
  lastSeen: string;
  installedApps: string[];
  riskHistory: { timestamp: string; event: string; score: number }[];
}

export interface SOCAlert {
  id: string;
  type: 'Critical Account Takeover' | 'New Rooted Device' | 'Impossible Travel' | 'Credential Stuffing' | 'Phishing Campaign Detected' | 'Suspicious KYC' | 'Insider Alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  customerName: string;
  customerId: string;
  ipAddress: string;
  location: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  description: string;
  recommendedAction: string;
  details: Record<string, any>;
}

export interface Campaign {
  id: string;
  name: string;
  similarity: number;
  status: 'Active' | 'Mitigated' | 'Monitoring';
  nodes: { id: string; type: 'sms' | 'apk' | 'device' | 'identity' | 'transaction' | 'cluster'; label: string }[];
  links: { source: string; target: string }[];
  dnaHash: string;
  mutationTimeline: { date: string; mutation: string }[];
  vectorSimilarity: number;
  techniques: string[];
}

export interface InsiderIncident {
  id: string;
  employeeName: string;
  employeeId: string;
  department: 'Treasury' | 'IT Admin' | 'Wealth Management' | 'Retail Ops' | 'Customer Support';
  actionType: 'After-hours Login' | 'Mass Customer Access' | 'Privilege Escalation' | 'Large Downloads' | 'Multiple Failed Approvals';
  riskScore: number;
  timestamp: string;
  details: string;
  status: 'Open' | 'Resolved' | 'Escalated';
  affectedRecords: number;
}

export interface KYCRequest {
  id: string;
  applicantName: string;
  faceMatchScore: number;
  docAuthenticityScore: number;
  livenessScore: number;
  duplicateIdentityScore: number;
  deepfakeProbability: number;
  submissionDate: string;
  status: 'Approve' | 'Review' | 'Reject';
  documentType: 'Passport' | 'Driver License' | 'National ID Card';
  nationality: string;
  riskReasons: string[];
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  timestamp: string;
  merchant: string;
  type: 'transfer' | 'withdrawal' | 'payment' | 'deposit';
  status: 'completed' | 'pending' | 'blocked';
  riskScore: number;
  ipAddress: string;
  location: string;
}

// Data Sets
const FIRST_NAMES = ['Aarav', 'Ananya', 'Amit', 'Priya', 'Vikram', 'Neha', 'Rohan', 'Sneha', 'Aditya', 'Pooja', 'Rahul', 'Divya', 'Sanjay', 'Kajal', 'Karan', 'Deepa', 'Vijay', 'Shreya', 'Abhishek', 'Ritu', 'Rajesh', 'Sunita', 'Manish', 'Geeta', 'Suresh', 'Anita', 'Harish', 'Preeti', 'Nikhil', 'Jyoti'];
const LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Patel', 'Singh', 'Joshi', 'Mehta', 'Mishra', 'Reddy', 'Nair', 'Kumar', 'Rao', 'Choudhury', 'Iyer', 'Sen', 'Das', 'Roy', 'Bose', 'Trivedi', 'Kapoor'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];
const COUNTRIES = ['India', 'United States', 'United Kingdom', 'Singapore', 'UAE', 'Germany', 'Canada'];
const MERCHANTS = ['Amazon India', 'Flipkart', 'MakeMyTrip', 'Zomato', 'Swiggy', 'Uber India', 'Paytm Wallet', 'Reliance Retail', 'HDFC Credit Card', 'ICICI Direct', 'Binance Exchange', 'Tata CLiQ'];
const DEPARTMENTS = ['Treasury', 'IT Admin', 'Wealth Management', 'Retail Ops', 'Customer Support'] as const;

function randomElement<T>(arr: T[] | readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateIp(): string {
  return `${randomRange(49, 223)}.${randomRange(1, 254)}.${randomRange(1, 254)}.${randomRange(1, 254)}`;
}

export function generateMockData() {
  const customers: Customer[] = [];
  const devices: Device[] = [];
  const alerts: SOCAlert[] = [];
  const campaigns: Campaign[] = [];
  const insiderIncidents: InsiderIncident[] = [];
  const kycRequests: KYCRequest[] = [];
  const transactions: Transaction[] = [];

  // 1. Generate 100 Customers
  for (let i = 1; i <= 100; i++) {
    const name = `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`;
    const id = `CUST-${1000 + i}`;
    const city = randomElement(CITIES);
    const country = city === 'Delhi' || city === 'Mumbai' || city === 'Bangalore' ? 'India' : randomElement(COUNTRIES);
    const email = `${name.toLowerCase().replace(' ', '.')}@gmail.com`;
    const phone = `+91 ${randomRange(70000, 99999)} ${randomRange(10000, 99999)}`;
    const riskScore = i % 15 === 0 ? randomRange(75, 95) : (i % 7 === 0 ? randomRange(40, 70) : randomRange(5, 35));
    const status = riskScore > 80 ? 'suspended' : (riskScore > 50 ? 'under_review' : 'active');
    const accountBalance = randomRange(15000, 8500000);
    const joinDate = new Date(Date.now() - randomRange(10, 1000) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    customers.push({ id, name, email, riskScore, status, accountBalance, joinDate, phone, city, country });
  }

  // 2. Generate 20 Devices
  const osOptions = ['Windows 11', 'macOS Sequoia', 'iOS 18', 'Android 15', 'Linux Ubuntu'];
  const browserOptions = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Brave'];
  const appOptions = ['Google Pay', 'WhatsApp', 'Termux', 'KeePassXC', 'AnyDesk', 'Telegram', 'Binance', 'NordVPN', 'TrustWallet', 'Metamask'];

  for (let i = 1; i <= 20; i++) {
    const cust = customers[i - 1]; // link to first 20 customers
    const id = `DEV-${2000 + i}`;
    const os = randomElement(osOptions);
    const browser = os.includes('iOS') || os.includes('macOS') ? 'Safari' : randomElement(browserOptions);
    const ip = generateIp();
    const city = randomElement(CITIES);
    const country = city === 'Delhi' ? 'India' : 'India'; // mostly domestic banking
    const location = `${city}, ${country}`;
    const isRooted = i % 6 === 0;
    const isEmulator = i % 9 === 0;
    const isVpn = i % 5 === 0;
    const trustScore = (isRooted ? 30 : 0) + (isEmulator ? 20 : 0) + (isVpn ? 15 : 0);
    const finalTrustScore = Math.max(10, 100 - trustScore - randomRange(0, 15));

    const installedApps = os.includes('Android') || os.includes('iOS') 
      ? [randomElement(appOptions), randomElement(appOptions), randomElement(appOptions)]
      : ['Docker Desktop', 'VS Code', 'Chrome DevTools'];

    if (isRooted && os.includes('Android')) {
      installedApps.push('MagiskManager');
    }
    if (isVpn) {
      installedApps.push('ExpressVPN');
    }

    const riskHistory = [
      { timestamp: new Date(Date.now() - 48 * 3600000).toISOString(), event: 'Device Registration', score: 95 },
      { timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), event: 'App Inventory Scan', score: isRooted ? 45 : 90 },
      { timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), event: 'Network Configuration Check', score: isVpn ? 60 : 95 }
    ];

    devices.push({
      id,
      userId: cust.id,
      userName: cust.name,
      os,
      browser,
      ip,
      location,
      isRooted,
      isEmulator,
      isVpn,
      trustScore: finalTrustScore,
      lastSeen: new Date(Date.now() - randomRange(10, 120) * 60000).toISOString(),
      installedApps,
      riskHistory
    });
  }

  // 3. Generate 100 Transactions
  for (let i = 1; i <= 100; i++) {
    const cust = randomElement(customers);
    const id = `TXN-${5000 + i}`;
    const amount = i % 10 === 0 ? randomRange(100000, 500000) : randomRange(500, 25000);
    const timestamp = new Date(Date.now() - randomRange(1, 120) * 3600000).toISOString();
    const merchant = randomElement(MERCHANTS);
    const type = amount > 100000 ? 'transfer' : randomElement(['payment', 'withdrawal', 'transfer'] as const);
    const riskScore = amount > 200000 ? randomRange(65, 88) : (i % 8 === 0 ? randomRange(45, 64) : randomRange(5, 30));
    const status = riskScore > 80 ? 'blocked' : (riskScore > 60 ? 'pending' : 'completed');

    transactions.push({
      id,
      customerId: cust.id,
      customerName: cust.name,
      amount,
      timestamp,
      merchant,
      type,
      status,
      riskScore,
      ipAddress: generateIp(),
      location: `${randomElement(CITIES)}, India`
    });
  }

  // 4. Generate 50 SOC Alerts
  const alertTypes = [
    'Critical Account Takeover',
    'New Rooted Device',
    'Impossible Travel',
    'Credential Stuffing',
    'Phishing Campaign Detected',
    'Suspicious KYC',
    'Insider Alert'
  ] as const;

  for (let i = 1; i <= 50; i++) {
    const cust = customers[i % customers.length];
    const id = `ALRT-${4000 + i}`;
    const type = alertTypes[i % alertTypes.length];
    const severity = type.includes('Critical') || i % 12 === 0 ? 'critical' : (type.includes('Impossible') || i % 6 === 0 ? 'high' : (i % 3 === 0 ? 'medium' : 'low'));
    const ipAddress = generateIp();
    const city = randomElement(CITIES);
    const location = `${city}, India`;
    const timestamp = new Date(Date.now() - randomRange(1, 48) * 3600000).toISOString();
    const status = i % 5 === 0 ? 'resolved' : (i % 4 === 0 ? 'investigating' : 'open');

    let description = '';
    let recommendedAction = '';
    const details: Record<string, any> = {};

    switch(type) {
      case 'Critical Account Takeover':
        description = `Sudden login from unrecognised device ${randomElement(devices).id} and high-value transfer of ₹${randomRange(150000, 900000)} initiated.`;
        recommendedAction = 'Suspend user session, freeze transactions, initiate out-of-band biometric authentication challenge.';
        details.deviceId = randomElement(devices).id;
        details.amount = randomRange(150000, 900000);
        break;
      case 'New Rooted Device':
        description = `Customer linked a rooted device (${randomElement(devices).os}) containing debugger utilities (Termux, Magisk).`;
        recommendedAction = 'Flag device, restrict transaction limit to ₹10,000, prompt face match verification on next transaction.';
        details.os = 'Android 15 (Rooted)';
        break;
      case 'Impossible Travel':
        description = `Sequential logins detected from Mumbai and Bucharest, Romania within a 15-minute window (requires speed > 800km/h).`;
        recommendedAction = 'Terminate current session, reset credentials, require physical branch visit or verification.';
        details.firstLogin = `${randomElement(CITIES)}, India`;
        details.secondLogin = `Bucharest, Romania`;
        details.timeDeltaMinutes = 15;
        break;
      case 'Credential Stuffing':
        description = `Detected 24 failed login attempts for ${cust.name} within 1 minute from IP ${ipAddress} using outdated Firefox browser.`;
        recommendedAction = 'Rate-limit source IP, trigger captcha for all incoming requests, notify customer via SMS.';
        details.attemptsCount = 24;
        details.timeWindowSeconds = 60;
        break;
      case 'Phishing Campaign Detected':
        description = `SMiShing campaign signature identified. Users landing on domain 'bankofbaroda-secure-login.net' linked to current SMS campaign.`;
        recommendedAction = 'Report URL to DNS Registrar, block incoming transaction transfers matching pattern, notify security ops.';
        details.phishingDomain = 'bankofbaroda-secure-login.net';
        details.phishedUsers = randomRange(3, 12);
        break;
      case 'Suspicious KYC':
        description = `Onboarding applicant failed liveness test with 85% deepfake probability. ID document has signs of Photoshop editing.`;
        recommendedAction = 'Reject application, blacklist face hash in vector database, forward to fraud forensics team.';
        details.deepfakeProb = 85;
        details.documentAltered = true;
        break;
      case 'Insider Alert':
        description = `Employee ${cust.name} (Retail Ops) accessed 45 customer accounts outside working hours (02:15 AM) and downloaded Excel statements.`;
        recommendedAction = 'Revoke active directory privileges, alert internal audit, schedule HR review.';
        details.accessedAccounts = 45;
        details.loginHour = '02:15 AM';
        break;
    }

    alerts.push({
      id,
      type,
      severity,
      customerName: cust.name,
      customerId: cust.id,
      ipAddress,
      location,
      timestamp,
      status,
      description,
      recommendedAction,
      details
    });
  }

  // 5. Generate 30 Campaigns
  const campaignNames = [
    'ShadowBanker Phishing SMS',
    'VoltTyphoon Credential Stuffing',
    'GoldDigger Trojan APK',
    'GhostClicker Botnet',
    'SimSwap Syndicate Mumbai',
    'Adversary-in-the-Middle (AitM) ICICI',
    'Fake-Apk SBI Reward Points',
    'OTP-Bypass-Bot Campaign v3',
    'Insider-Exfiltration Wealth Ops',
    'E-Filing IncomeTax Phishing'
  ];

  for (let i = 1; i <= 30; i++) {
    const id = `CMP-${3000 + i}`;
    const baseName = campaignNames[i % campaignNames.length];
    const name = `${baseName} [Cluster #${100 + i}]`;
    const similarity = randomRange(68, 98);
    const status = i % 3 === 0 ? 'Mitigated' : (i % 3 === 1 ? 'Active' : 'Monitoring');
    const dnaHash = `hash_v2_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const vectorSimilarity = Number((0.75 + (i * 0.007)).toFixed(4));

    const techniques = [
      'SMiShing (SMS Phishing)',
      'Malicious Android APK (Sideload)',
      'OTP Stealer Accessibility Service',
      'API Injection',
      'VPN Geolocation Bypass',
      'Device Fingerprint Spoofing'
    ];

    // Build standard structure for attack graphs
    const nodes = [
      { id: `${id}-phish`, type: 'sms' as const, label: 'Phishing SMS ("Link Update")' },
      { id: `${id}-apk`, type: 'apk' as const, label: 'SBI-Rewards.apk (Malicious)' },
      { id: `${id}-dev`, type: 'device' as const, label: 'Rooted Redmi Note 12 (Emulator)' },
      { id: `${id}-ident`, type: 'identity' as const, label: `Victim Profile (CUST-${1000 + i})` },
      { id: `${id}-txn`, type: 'transaction' as const, label: `Stolen Transfer ₹${randomRange(50000, 200000)}` },
      { id: `${id}-cluster`, type: 'cluster' as const, label: 'Attacker IP Cluster (Russia/China)' }
    ];

    const links = [
      { source: `${id}-phish`, target: `${id}-apk` },
      { source: `${id}-apk`, target: `${id}-dev` },
      { source: `${id}-dev`, target: `${id}-ident` },
      { source: `${id}-ident`, target: `${id}-txn` },
      { source: `${id}-cluster`, target: `${id}-phish` },
      { source: `${id}-cluster`, target: `${id}-dev` }
    ];

    const mutationTimeline = [
      { date: new Date(Date.now() - 5 * 24 * 3600000).toISOString().split('T')[0], mutation: 'Initial deployment. Domain: reward-sbi-portal.top' },
      { date: new Date(Date.now() - 3 * 24 * 3600000).toISOString().split('T')[0], mutation: 'APK payload updated (v1.2) to bypass Play Protect' },
      { date: new Date(Date.now() - 1 * 24 * 3600000).toISOString().split('T')[0], mutation: 'C2 servers shifted from Romanian to Russian hosting' }
    ];

    campaigns.push({
      id,
      name,
      similarity,
      status,
      nodes,
      links,
      dnaHash,
      mutationTimeline,
      vectorSimilarity,
      techniques: [randomElement(techniques), randomElement(techniques)]
    });
  }

  // 6. Generate 15 Insider Incidents
  const empNames = ['Ramesh K.', 'Sunita Sh.', 'Vikram D.', 'Amit N.', 'Neha G.', 'Sanjay P.'];
  const actions = [
    'After-hours Login',
    'Mass Customer Access',
    'Privilege Escalation',
    'Large Downloads',
    'Multiple Failed Approvals'
  ] as const;

  for (let i = 1; i <= 15; i++) {
    const id = `INS-${6000 + i}`;
    const employeeName = empNames[i % empNames.length];
    const employeeId = `EMP-${100 + i}`;
    const department = randomElement(DEPARTMENTS);
    const actionType = actions[i % actions.length];
    const riskScore = i % 5 === 0 ? randomRange(85, 95) : (i % 3 === 0 ? randomRange(65, 84) : randomRange(45, 64));
    const timestamp = new Date(Date.now() - randomRange(2, 72) * 3600000).toISOString();
    const affectedRecords = randomRange(5, 120);
    const status = i % 3 === 0 ? 'Resolved' : (i % 3 === 1 ? 'Open' : 'Escalated');

    let details = '';
    switch (actionType) {
      case 'After-hours Login':
        details = `Logged into core banking terminal at ${randomRange(1, 4)}:00 AM from a domestic residential IP address, accessing accounts.`;
        break;
      case 'Mass Customer Access':
        details = `Viewed ${affectedRecords} customer tax records within a 10-minute window. Standard baseline is 4 accounts/hour.`;
        break;
      case 'Privilege Escalation':
        details = `Attempted to assign 'Treasury Approver' rights to own login profile using active directory credentials of manager.`;
        break;
      case 'Large Downloads':
        details = `Exported a customer profile report. Total data downloaded: ${randomRange(250, 950)} MB of raw CSV datasets.`;
        break;
      case 'Multiple Failed Approvals':
        details = `Attempted to approve high-value transactions without required manager key. System rejected operations 5 times consecutively.`;
        break;
    }

    insiderIncidents.push({
      id,
      employeeName,
      employeeId,
      department,
      actionType,
      riskScore,
      timestamp,
      details,
      status,
      affectedRecords
    });
  }

  // 7. Generate 50 KYC Requests
  const nationalities = ['Indian', 'Nepalese', 'Sri Lankan', 'Singaporean', 'US Citizen'];
  const docTypes = ['Passport', 'Driver License', 'National ID Card'] as const;

  for (let i = 1; i <= 50; i++) {
    const id = `KYC-${7000 + i}`;
    const applicantName = `${randomElement(FIRST_NAMES)} ${randomElement(LAST_NAMES)}`;
    const faceMatchScore = i % 10 === 0 ? randomRange(45, 65) : randomRange(75, 99);
    const docAuthenticityScore = i % 8 === 0 ? randomRange(30, 60) : randomRange(80, 99);
    const livenessScore = i % 15 === 0 ? randomRange(10, 45) : randomRange(70, 99);
    const duplicateIdentityScore = i % 12 === 0 ? randomRange(70, 95) : randomRange(5, 25);
    const deepfakeProbability = livenessScore < 50 ? randomRange(70, 98) : randomRange(1, 15);
    const submissionDate = new Date(Date.now() - randomRange(1, 48) * 3600000).toISOString();
    const nationality = randomElement(nationalities);
    const documentType = randomElement(docTypes);

    const scoreSum = faceMatchScore + docAuthenticityScore + livenessScore + (100 - duplicateIdentityScore) + (100 - deepfakeProbability);
    const averageIndicator = scoreSum / 5;

    const status = averageIndicator < 55 ? 'Reject' : (averageIndicator < 80 ? 'Review' : 'Approve');

    const riskReasons: string[] = [];
    if (faceMatchScore < 70) riskReasons.push('Face match percentage falls below regulatory banking thresholds');
    if (docAuthenticityScore < 70) riskReasons.push('Security holograms and fonts on document show compression/editing artifacts');
    if (livenessScore < 60) riskReasons.push('Applicant failed random blink and head tilt challenge');
    if (duplicateIdentityScore > 60) riskReasons.push('Biometric facial hash matches existing profile in database (double onboarding)');
    if (deepfakeProbability > 50) riskReasons.push('Generative neural model (Deepfake) detected in video feed');

    kycRequests.push({
      id,
      applicantName,
      faceMatchScore,
      docAuthenticityScore,
      livenessScore,
      duplicateIdentityScore,
      deepfakeProbability,
      submissionDate,
      status,
      nationality,
      documentType,
      riskReasons
    });
  }

  return {
    customers,
    devices,
    alerts,
    campaigns,
    insiderIncidents,
    kycRequests,
    transactions
  };
}
