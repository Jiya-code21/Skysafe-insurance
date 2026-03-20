🛡️ SkySafe — AI-Powered Parametric Income Insurance for India's Gig Economy

> **Guidewire DEVTrails 2026 | Unicorn Chase Hackathon**
> *Seed → Scale → Soar*

---

## 📌 Problem Statement

India's platform-based delivery partners (Zomato, Swiggy, Zepto, Amazon, Flipkart, etc.) are the backbone of the digital economy. External disruptions — extreme weather, severe pollution, unplanned curfews, and local strikes — can slash their working hours and cause **20–30% monthly income loss**. These workers have no financial safety net against these uncontrollable events.

**SkySafe** is an AI-enabled parametric insurance platform that automatically detects disruptions, triggers claims, and delivers instant payouts — protecting gig workers' income, not their vehicles or health.

---

## 🎯 Persona Focus

**Segment: Food Delivery Partners (Zomato / Swiggy)**

### Persona — Meet Ravi
- 28-year-old delivery partner based in Bengaluru
- Earns ₹600–₹900/day on a good day (6–8 hours active)
- Works 6 days/week; weekly income ~₹4,000–₹5,000
- Has no savings buffer for disruption days
- Loses ~₹800–₹1,200 per disruption event (heavy rain, AQI alert, local shutdown)

### Key Scenarios
| Scenario | Disruption Type | Income Impact |
|---|---|---|
| Heavy Monsoon Rain (>50mm) | Environmental | Full day lost (~₹700) |
| Severe AQI Alert (>300) | Environmental | 4–6 hours lost (~₹400) |
| Unplanned Local Curfew | Social | Full day lost (~₹700) |
| City-wide Strike (bandh) | Social | Full day lost (~₹700) |
| Extreme Heat (>42°C) | Environmental | Partial day lost (~₹350) |

---

## 💡 Coverage Scope

> ⚠️ **GigShield covers INCOME LOSS ONLY.**
> We strictly **exclude**: health insurance, life coverage, accident claims, vehicle repairs.

Payout = estimated lost daily earnings based on the worker's historical average, triggered automatically by verified parametric events.

---

## 💰 Weekly Premium Model

Gig workers earn and spend week-to-week. GigShield is priced weekly to match this cycle.

| Plan | Weekly Premium | Coverage Cap | Best For |
|---|---|---|---|
| Basic Shield | ₹29/week | ₹700/week | Part-time workers |
| Standard Shield | ₹49/week | ₹1,400/week | Regular workers |
| Pro Shield | ₹79/week | ₹2,500/week | Full-time high earners |

**Dynamic Pricing Factors (AI-adjusted):**
- Worker's delivery zone historical disruption frequency
- Current weather forecast risk score
- Worker's average daily active hours (platform data)
- City-level AQI and rainfall prediction models
- Seasonal risk multipliers (monsoon, heatwave season)

Example: A worker in a zone with low waterlogging history may pay ₹2–₹5 less per week than one in a flood-prone zone.

---

## ⚡ Parametric Triggers

Claims are **automatically initiated** — no manual filing needed.

| Trigger ID | Event | Threshold | Data Source |
|---|---|---|---|
| T1 | Heavy Rainfall | > 50mm in 3 hours | OpenWeatherMap API |
| T2 | Severe Air Pollution | AQI > 300 | CPCB / AQI API (mock) |
| T3 | Extreme Heat | Temperature > 42°C | OpenWeatherMap API |
| T4 | Curfew / Bandh | Official government notice | News API / mock |
| T5 | Flash Floods | Area flood alert issued | IMD mock data |

All triggers are monitored in **real-time via N8n automation workflows**.

---

## 🔧 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Automation / Orchestration** | N8n (self-hosted) | Parametric trigger monitoring, claim workflows, payout automation |
| **Frontend** | React.js | Worker dashboard, onboarding, policy management UI |
| **Backend** | Node.js (Express) | REST APIs, business logic, auth |
| **Database** | MongoDB (Atlas) | Worker profiles, policies, claims, payout records |
| **AI/ML** | Node.js + ML model (TensorFlow.js / Python microservice) | Dynamic premium calculation, fraud detection, risk profiling |
| **Weather API** | OpenWeatherMap (free tier) | Real-time weather & AQI trigger data |
| **Payment (Mock)** | Razorpay Test Mode / UPI Simulator | Simulated instant payouts |
| **Auth** | JWT + OTP (simulated) | Secure worker login |

### Architecture Overview

```
[Weather/AQI APIs]
       |
   [N8n Workflow Engine] ──── Trigger Monitor ──── [MongoDB: Events]
       |                              |
   Parametric Event Detected     Fraud Check (AI)
       |                              |
   [Node.js API Server] ──────── Claim Created
       |
   [MongoDB: Claims & Policies]
       |
   [Razorpay Mock] ──── Payout Processed ──── [Worker Notified]
       |
   [React Dashboard] ── Worker View + Admin/Insurer View
```

---

## 🤖 AI/ML Integration

### 1. Dynamic Premium Calculation
- **Model**: Gradient Boosting / Regression model trained on synthetic worker + weather data
- **Inputs**: Zone risk score, worker tenure, avg hours/week, seasonal factor, historical claim rate
- **Output**: Personalized weekly premium (₹)
- **Integration**: Node.js API calls ML microservice on policy creation and weekly renewal

### 2. Fraud Detection
- **Anomaly Detection**: Flags claims where worker GPS was outside the disruption zone
- **Duplicate Prevention**: MongoDB index checks for same worker + same event claims
- **Behavioral Analysis**: Detects unusual claim spikes or patterns inconsistent with work history
- **GPS Spoofing Detection**: Cross-checks claimed location against delivery platform activity logs (mocked)

### 3. Risk Profiling
- Each worker gets a **Risk Score (0–100)** computed on onboarding and updated weekly
- Score factors: zone, historical disruption days, work hours, platform tenure

---

## 🔄 Application Workflow

### Onboarding Flow
1. Worker registers with mobile number (OTP verification)
2. Selects delivery platform (Zomato / Swiggy)
3. Provides work zone / home zone
4. AI generates Risk Profile + suggested weekly plan
5. Worker selects plan and pays weekly premium (UPI/wallet mock)
6. Policy activated instantly

### Claim Flow (Zero-Touch)
1. N8n monitors weather/AQI/news APIs every 15 minutes
2. Threshold breach detected → event logged in MongoDB
3. AI fraud check runs automatically
4. If valid: Claim auto-approved, payout initiated via Razorpay mock
5. Worker receives push notification + dashboard update
6. Entire process: **< 5 minutes from event detection to payout**

---

## 📊 Dashboards

### Worker Dashboard (React)
- Active weekly policy status
- Earnings protected this week / month
- Claim history and payout records
- Disruption alerts for their zone
- Premium renewal management

### Insurer / Admin Dashboard (React)
- Total active policies and premium pool
- Real-time disruption event feed
- Claim approval queue and fraud flags
- Loss ratio analytics
- Predictive model: next week's likely disruption claims by zone

---

## 📁 Project Structure

```
gigshield/
├── frontend/               # React.js application
│   ├── src/
│   │   ├── pages/          # Onboarding, Dashboard, Claims, Policy
│   │   ├── components/     # Shared UI components
│   │   └── services/       # API service calls
├── backend/                # Node.js + Express
│   ├── routes/             # Auth, Policy, Claims, Payouts, Admin
│   ├── models/             # MongoDB schemas (Worker, Policy, Claim, Event)
│   ├── services/           # ML integration, fraud engine, payout service
│   └── middleware/         # Auth, error handling
├── n8n-workflows/          # Exported N8n workflow JSONs
│   ├── weather-trigger.json
│   ├── aqi-trigger.json
│   ├── claim-automation.json
│   └── payout-workflow.json
├── ml-service/             # Python/Node ML microservice
│   ├── premium_model.py    # Dynamic pricing model
│   └── fraud_model.py      # Anomaly detection
└── README.md
```

---

## 🚀 Development Plan

### Phase 1 — Seed (Weeks 1–2): Ideation & Foundation
- [x] Problem research & persona definition
- [ ] MongoDB schema design (Worker, Policy, Claim, Event)
- [ ] Basic React app scaffold (onboarding UI)
- [ ] Node.js API skeleton (auth, worker registration)
- [ ] N8n setup with first weather trigger (OpenWeatherMap mock)
- [ ] README and 2-min strategy video

### Phase 2 — Scale (Weeks 3–4): Automation & Protection
- [ ] Full onboarding flow (React + Node + MongoDB)
- [ ] Policy creation with AI-calculated weekly premium
- [ ] 3–5 automated N8n triggers (weather, AQI, curfew)
- [ ] Claims management module
- [ ] Basic fraud detection (duplicate check + zone validation)
- [ ] 2-min demo video

### Phase 3 — Soar (Weeks 5–6): Scale & Optimise
- [ ] Advanced fraud detection (GPS spoof detection, behavioral anomaly)
- [ ] Razorpay test mode payout integration
- [ ] Full worker + insurer dashboards with analytics
- [ ] Predictive analytics: next-week disruption risk by zone
- [ ] Final 5-min walkthrough demo video
- [ ] Pitch deck (PDF)

---

## 🌐 Platform Choice: Web (React)

**Justification:**
- Delivery partners already use smartphones with browsers for platform apps
- A Progressive Web App (PWA) approach gives near-native mobile experience without app store friction
- Easier to demo and present during judging phases
- Faster iteration cycle vs native mobile development

---

## ⚙️ Setup & Running Locally

```bash
# Clone repo
git clone https://github.com/your-team/skysafe.git
cd skysafe

# Backend
cd backend
npm install
cp .env.example .env   # Add MongoDB URI, JWT secret, API keys
npm run dev

# Frontend
cd ../frontend
npm install
npm start

# N8n (Docker)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Import workflows from /n8n-workflows/*.json via N8n UI
```



---

## 👥 Team

| Name | Role |
|---|---|
| Member 1 | Full Stack (React + Node) |
| Member 2 | N8n Automation + Integrations |
| Member 3 | AI/ML + Fraud Detection |
| Member 4 | UI/UX + Frontend |
| Member 5 | DevOps + MongoDB + Architect |

---

## 📎 Submission Links

| Deliverable | Link |
|---|---|
| GitHub Repository | (https://github.com/Jiya-code21/Skysafe-insurance.git) |
| Phase 1 Demo Video (2 min) | *[Add link]* |
| Phase 2 Demo Video (2 min) | *[Add link]* |
| Phase 3 Final Demo (5 min) | *[Add link]* |
| Final Pitch Deck (PDF) | *[Add link]* |

---

> *Built for Guidewire DEVTrails 2026 — protecting India's gig workers, one week at a time.* 🚀
