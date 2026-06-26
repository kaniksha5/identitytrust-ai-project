# IdentityTrust AI

> **PSB Hackathon Series 2026** · Cybersecurity & Fraud Domain  
> Academic Partner: IIT Gandhinagar · Hosted by: Bank of Baroda

---

## 🏆 Theme: Identity Trust, Protection & Safety

*Build secure, intelligent systems for next-generation digital banking*

---

## 🚨 Problem Statement

Digital banking faces an escalating wave of sophisticated attacks — account takeovers, KYC fraud, phishing campaigns with malicious APKs, and insider misuse. Traditional authentication relies on **static credentials and blanket MFA**, creating unnecessary friction for legitimate users while remaining vulnerable to evolving threats.

Existing solutions treat fraud events **in isolation** — a stolen OTP here, a suspicious login there — missing the coordinated, multi-stage attack campaigns that modern fraudsters operate.

---

## 💡 Solution: IdentityTrust AI

A **privacy-first, AI-powered Identity Trust framework** that continuously evaluates the trustworthiness of customer and enterprise identities throughout their entire digital journey — without storing raw biometric data.

Instead of verifying once at login, IdentityTrust AI **never stops verifying**.

---

## ✨ Key Features

### 🧠 Continuous Identity Risk Engine
- Real-time trust score (0–100) computed from 10+ signals
- Device trust, behavioral biometrics, geo-velocity, OTP failure count, VPN detection
- Rooted/emulated device detection
- Explainable risk reasons with SHAP-style attribution

### 🔐 Adaptive Authentication
- **Low risk (≥75):** Instant access — zero friction
- **Medium risk (50–74):** OTP verification triggered
- **High risk (25–49):** Biometric face verification required
- **Critical (<25):** Account blocked — SOC alerted immediately

### 🕸️ Campaign Fingerprinting *(Core Innovation)*
- Fuses phishing SMS content, APK behavior, device signals, and transaction patterns into a unified **Identity Campaign Fingerprint**
- Stored in a vector database for similarity matching
- Detects coordinated fraud campaigns even when attackers mutate malware or switch devices
- Mutation timeline tracking — maps fraud family trees across campaigns
- STIX 2.1 compatible threat intelligence export

### 👁️ Insider Threat Detection
- Behavioral baseline for every privileged employee
- Flags after-hours access, mass customer data export, privilege escalation, and bulk downloads
- Privacy-respecting — anomaly alerts only, not surveillance
- Explainable alerts with action context

### 📋 AI-Powered KYC Verification
- Face match score, document authenticity, liveness detection
- Deepfake probability scoring
- Duplicate identity detection across onboarding applications
- Automated Approve / Review / Reject decision engine

### 🖥️ SOC Dashboard
- Live fraud attempt timeline
- Risk score distribution across all sessions
- Campaign intelligence feed
- Real-time alert center with escalation workflow

---

## 🏗️ Architecture

```
Customer Event
      │
      ▼
Ingestion Layer (SMS · APK · Device · Login · Transaction)
      │
      ▼
┌─────────────────────────────────────────────┐
│              Risk Engine                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │ Behavior │  │  Device  │  │  Campaign │ │
│  │Analytics │  │  Intel   │  │   Match   │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │   Geo    │  │ Velocity │  │  Biometric│ │
│  │  Risk    │  │  Score   │  │  Engine   │ │
│  └──────────┘  └──────────┘  └───────────┘ │
└─────────────────────────────────────────────┘
      │
      ▼
Identity Trust Score (0–100)
      │
      ├── Low → Grant Access
      ├── Medium → OTP
      ├── High → Face Verification
      └── Critical → Block + SOC Alert
```

**Supporting Modules:**
- 🗄️ **Vector Database** — Campaign DNA storage and similarity search
- 🤖 **LLM Layer** — Plain-English forensic explanation of attacks
- 📊 **Behavioral Analytics** — Continuous passive session scoring
- 🔍 **Explainable AI** — Every risk decision is auditable

---

## 🎯 Focus Areas Covered

| PSB Focus Area | Coverage |
|---|---|
| Fraud Detection | ✅ Campaign fingerprinting, real-time risk scoring |
| Identity & KYC Security | ✅ Deepfake detection, duplicate identity, liveness |
| Account Takeover Prevention | ✅ Behavioral biometrics, adaptive auth, device trust |
| Device & Access Trust | ✅ Rooted/VPN/emulator detection, device fingerprinting |
| Insider Threat Detection | ✅ Privileged access baselining, anomaly alerting |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, React, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| AI/ML | Behavioral biometrics engine, vector similarity search |
| Data | Mocked realistic banking datasets (100 customers, 20 devices, 50 alerts, 30 campaigns) |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/kaniksha5/identitytrust-ai-project.git
cd identitytrust-ai-project

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Platform Pages

| Page | Description |
|---|---|
| Landing | Hero, architecture overview, feature showcase |
| SOC Dashboard | Live metrics, fraud timeline, alert feed |
| Risk Engine | Interactive trust score calculator with 10 input signals |
| Adaptive Auth | Login simulation with risk-based challenge flow |
| Device Trust | Device fingerprint cards with threat indicators |
| Campaign Fingerprinting | Attack graph visualization, campaign DNA matching |
| Incident Investigation | Forensic timeline with LLM explanation panel |
| Insider Threat | Employee anomaly dashboard with risk scoring |
| KYC Verification | Applicant review queue with AI decision scores |
| Alert Center | Real-time notifications with resolve/escalate actions |
| Analytics | Fraud prevention metrics, money saved, trend charts |
| Settings | Risk threshold configuration, allowed countries, notifications |

---

## 👥 Team

**Delta Syntax** — KPR Institute of Engineering and Technology (KPRIET), Coimbatore

---

## 🔒 Privacy & Compliance

- **No raw biometric storage** — only cryptographic proofs of verification
- Designed for RBI data localization compliance
- DPDP Act aligned
- Every risk decision is fully explainable and auditable
- Insider monitoring is anomaly-based, not surveillance-based

---

## 📄 Abstract

As digital banking rapidly expands, financial institutions face increasingly sophisticated threats such as account takeover, KYC fraud, phishing campaigns, malicious applications, and insider misuse. Traditional authentication mechanisms rely on static credentials and blanket multi-factor authentication, creating unnecessary friction for legitimate users while remaining vulnerable to evolving attack techniques.

IdentityTrust AI proposes a privacy-first, AI-powered Identity Trust framework that continuously evaluates the trustworthiness of customer and enterprise identities throughout their digital journey. The system combines continuous behavioral analytics, device intelligence, campaign fingerprinting, and adaptive risk assessment to calculate a real-time identity trust score for every login, transaction, account recovery, and privileged access request.

By shifting from static identity verification to **continuous trust evaluation**, the proposed solution significantly reduces account takeover incidents, KYC fraud, and insider threats while delivering secure, friction-optimized digital banking across multiple channels.

---

*Built for PSB Hackathon Series 2026 · IIT Gandhinagar · Bank of Baroda*
