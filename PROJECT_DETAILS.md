# 🏥 DocPulse India — Complete Telehealth & Doctor Appointment Booking Platform

**DocPulse India** is a full-stack, enterprise-grade Doctor Appointment Booking, Telehealth, and Clinical Triage System built specifically for the Indian healthcare ecosystem with NMC verification, ABHA ID integration, automated Nodemailer OTP verification, e-prescriptions, patient grievance resolution, and an intelligent **SmartCare AI Assistant**.

---

## 🌟 Key Features & Capabilities

### 1. 👨‍⚕️ Multi-Role Portals & Authentication
- **Role-Based Routing**: 
  - **Patient Portal**: Medical history, upcoming appointments, live appointment status, e-prescription viewer & PDF downloader, grievance redressal desk.
  - **Doctor Consultation Desk**: Patient queue, slot availability management, e-prescription generator (medications, dosage, diagnostics, clinical advice, follow-up date). Once e-prescription is issued, appointment automatically marks as completed.
  - **Super Admin Command Center**: Live doctor verification queue (Approve / Reject applications with NMC registration audit remarks), platform-wide financial metrics, appointment records with e-prescriptions, and patient grievance redressal console.
- **Unified Doctor & User Credentials**:
  - **All 45 Approved Doctors Password**: `Doctor21`
  - **Doctor Email Format**: `dr.firstname.lastname@docpulse.in` (e.g. `dr.rajeshsharma@docpulse.in`, `dr.sumitkumar@docpulse.in`)
  - **Super Admin Account**: `admin@docpulse.in` / `Doctor21`
  - **Patient Account**: `vishalkumarpathak21@gmail.com` / `vishal21`

---

### 2. 🤖 SmartCare AI Health Assistant & Clinical Triage
- **Slide-Out Chatbot Panel**: Responsive right-hand drawer with interactive speech bubbles, typing indicator, and quick-prompt symptom chips.
- **Symptom-Specific Clinical Observations**:
  - Automatically correlates symptoms (fever, toothache, acne, knee arthritis, migraine, chest discomfort, child fever, etc.) to tailored clinical etiology.
  - Generates evidence-based, non-pharmacological supportive care advice (hydration, steam inhalation, PRICE protocol, warm salt-water rinses, sleep hygiene).
  - Flags red-flag symptoms with an emergency alert box and direct **108 emergency dialer**.
- **Real-Time Doctor Matching**: Matches symptoms to relevant specialists with live fee, hospital, and one-click booking triggers.

---

### 3. 🛡️ Verification & Grievance Workflows
- **Doctor Application Statuses**:
  - **Approved (45 Doctors)**: Active and bookable across all 9 departments (Cardiology, Dermatology, General Medicine, Pediatrics, Orthopedics, Dentistry, Neurology, Ophthalmology, Psychiatry).
  - **Pending Verification (5 Doctors)**: Awaiting Super Admin review with submitted NMC numbers, degrees, and certificates.
  - **Rejected Applications (4 Doctors)**: Documented with medical board audit remarks.
- **Patient Grievance Redressal**:
  - Patients can file complaints with priority tags and tracking IDs.
  - Admin reviews grievances, enters official resolution notes, and updates status to **Resolved**, which immediately reflects in the Patient Portal.

---

## 📂 Project Architecture

```
doctor-appointment/
├── index.html                   # Main HTML entry
├── vite.config.js               # Vite frontend configuration
├── package.json                 # Frontend dependencies (React, Lucide-react, Tailwind)
├── PROJECT_DETAILS.md           # Detailed platform documentation & credentials
├── README.md                    # Quickstart guide
├── server/
│   ├── .env                     # Backend environment variables & MongoDB connection
│   ├── index.js                 # Express server & API endpoints
│   ├── package.json             # Backend dependencies (Express, Mongoose, Nodemailer, Bcrypt, JWT)
│   ├── models/
│   │   ├── User.js              # Patient, Doctor, Admin user schema
│   │   ├── Doctor.js            # NMC credentials, specialty, slots, approval schema
│   │   ├── Appointment.js       # Bookings, OTP verification, e-prescriptions
│   │   ├── Complaint.js         # Grievances & redressal resolution schema
│   │   └── Otp.js               # Time-limited authentication & booking OTPs
│   ├── services/
│   │   ├── aiService.js         # Clinical triage & symptom heuristic engine
│   │   └── emailService.js      # Nodemailer OTP & confirmation delivery
│   ├── routes/
│   │   └── ai.js                # AI guidance and doctor recommendation API
│   └── scripts/
│       ├── seedAllDoctors.js    # Database seeder (45 approved doctors)
│       └── seedPendingAndRejectedDoctors.js # Seeder for 5 pending & 4 rejected doctors
└── src/
    ├── App.jsx                  # Root state manager, modal controller, view router
    ├── index.css                # Tailwind CSS styling & animations
    ├── main.jsx                 # React DOM mount
    ├── services/
    │   └── api.js               # Frontend API client service
    ├── data/
    │   ├── doctorsData.js       # Synced doctors dataset and fallback catalogs
    │   └── indianLocations.js   # Indian metro locations & cities
    └── components/
        ├── Navbar.jsx           # Streamlined header & outside-click user dropdown
        ├── Hero.jsx             # Search bar, city filter, specialty selector
        ├── Specialties.jsx      # 9 Medical departments with hover navigation
        ├── AISidePanel.jsx      # Slide-out SmartCare AI Chatbot drawer
        ├── HomeAIAssistant.jsx  # Homepage embedded AI triage widget
        ├── FloatingAIAssistant.jsx # Glowing floating bottom-right AI trigger
        ├── PatientPortal.jsx    # Patient Dashboard, e-prescriptions, grievances
        ├── DoctorPortal.jsx     # Doctor Queue, e-prescription generator
        ├── AdminPortal.jsx      # Super Admin verification desk & analytics
        ├── AuthModal.jsx        # Clean Sign In / Sign Up with OTP verification
        ├── BookingModal.jsx     # 4-Step appointment booking modal
        ├── DoctorDetailsModal.jsx # Doctor profile modal
        └── PrescriptionModal.jsx  # Printable E-Prescription viewer
```

---

## ⚙️ Environment Configuration (`server/.env`)

```env
MONGODB_URI=mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=docpulse_secure_jwt_secret_key_2026_india
EMAIL_USER=vishalkumarpathak21@gmail.com
EMAIL_PASS=nnur uqxh qyqw ewrb
OPENAI_API_KEY=your_api_key_here
```

---

## 🚀 Quick Setup & Execution

### 1. Backend Server
```bash
cd server
npm install
node index.js
```
*Backend runs on `http://localhost:5000` (bound to `0.0.0.0` for dual IPv4/IPv6 compatibility).*

### 2. Frontend Application
```bash
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 🔐 Credentials Cheat Sheet

| Role | Email | Password | Access / Portal |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@docpulse.in` | `Doctor21` | Admin Console, Doctor Verifications, Complaints |
| **Patient** | `vishalkumarpathak21@gmail.com` | `vishal21` | Patient Portal, Bookings, E-Prescriptions |
| **Doctor (Cardiology)** | `dr.rajeshsharma@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Dermatology)** | `dr.ananyamukherjee@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (General Med)** | `dr.sureshvenkatesh@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Pediatrics)** | `dr.priyadeshmukh@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Orthopedics)** | `dr.arvindswaminathan@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Dentistry)** | `dr.sumitkumar@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Neurology)** | `dr.kedarnatarajan@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Ophthalmology)**| `dr.arvindnetralaya@docpulse.in`| `Doctor21` | Doctor Consultation Desk, E-Prescribing |
| **Doctor (Psychiatry)** | `dr.vikramprabhu@docpulse.in` | `Doctor21` | Doctor Consultation Desk, E-Prescribing |
