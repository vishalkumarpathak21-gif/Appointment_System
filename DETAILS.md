# 📋 DocPulse India — Platform Full Details & Setup Reference

This document provides complete system details, architectural specifications, environment configurations, and execution commands.

---

## 🌐 1. Live Environment & Database Configuration

The backend connects directly to the production MongoDB Atlas cloud cluster:

- **MongoDB Database**: `docpulse_db`
- **Atlas Cluster**: `cluster0.vstflgy.mongodb.net`
- **Backend API Port**: `5000` (dual IPv4 / IPv6 bound)
- **Frontend Client Port**: `5173` (Vite with React 18 & Tailwind CSS)
- **Email Delivery Service**: Nodemailer over Gmail SMTP (`vishalkumarpathak21@gmail.com`)

### Live `server/.env` File Content:
```env
MONGODB_URI=mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=docpulse_secure_jwt_secret_key_2026_india
EMAIL_USER=vishalkumarpathak21@gmail.com
EMAIL_PASS=nnur uqxh qyqw ewrb
OPENAI_API_KEY=your_api_key_here
```

---

## 👥 2. User Accounts & Portals Summary

### 🛡️ Super Admin
- **Email**: `admin@docpulse.in`
- **Password**: `Doctor21`
- **Features**: Doctor verification queue (Approve / Reject), audit logs, platform metrics, grievance resolution.

### 👤 Verified Patient
- **Email**: `vishalkumarpathak21@gmail.com`
- **Password**: `vishal21`
- **Features**: Search specialists, book appointments with email OTP, view upcoming/completed consultations, view & download E-Prescriptions, file grievances.

### 🩺 Specialist Doctors (45 Verified Specialists)
- **Universal Password**: `Doctor21`
- **Email Format**: `dr.<firstname><lastname>@docpulse.in`
- **Sample Doctor Logins**:
  - Cardiology: `dr.rajeshsharma@docpulse.in`
  - Dermatology: `dr.ananyamukherjee@docpulse.in`
  - General Medicine: `dr.sureshvenkatesh@docpulse.in`
  - Pediatrics: `dr.priyadeshmukh@docpulse.in`
  - Orthopedics: `dr.arvindswaminathan@docpulse.in`
  - Dentistry: `dr.sumitkumar@docpulse.in`
  - Neurology: `dr.kedarnatarajan@docpulse.in`
  - Ophthalmology: `dr.arvindnetralaya@docpulse.in`
  - Psychiatry: `dr.vikramprabhu@docpulse.in`

*(For the complete table of all 45 doctors, refer to [CREDENTIALS.md](./CREDENTIALS.md))*

---

## 🤖 3. SmartCare AI Assistant Architecture

1. **Frontend Trigger**: Slide-out drawer ([`client/src/components/AISidePanel.jsx`](./client/src/components/AISidePanel.jsx)) with speech bubbles and matched doctor cards.
2. **REST API Endpoint**: `POST /api/ai/health-guidance`
3. **Clinical Heuristic Engine** ([`server/services/aiService.js`](./server/services/aiService.js)):
   - Analyzes keywords across 9 clinical specialties.
   - Generates symptom-tailored **General Clinical Observations**.
   - Prescribes evidence-based, non-pharmacological supportive self-care.
   - Evaluates emergency red flags and presents a direct **108 Emergency Dial** button.
   - Queries MongoDB Atlas in real time to return verified doctors in the patient's area.

---

## 🚀 4. How to Run

### From the Root Directory:
```bash
# Install dependencies for both client and server
npm run install:all

# Run backend
npm run server

# Run frontend (in another terminal)
npm run client
```

### From Individual Folders:
```bash
# Backend
cd server
npm install
node index.js

# Frontend
cd client
npm install
npm run dev
```
