# 🏥 DocPulse India — Telehealth & Doctor Appointment Booking Platform

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

**DocPulse India** is a full-stack, enterprise-grade Telehealth and Doctor Appointment Booking Platform tailored for the Indian healthcare ecosystem. It features role-based access for Patients, Doctors, and Super Admins, an intelligent **SmartCare AI Clinical Triage Assistant**, automated Nodemailer email OTP verification, digital E-Prescriptions, grievance redressal, and NMC doctor credential verification.

---

## 🌟 Key Features

### 1. 👥 Multi-Role Portals & Workflows
- **🧑‍⚕️ Patient Portal**:
  - Search verified specialists by medical department and Indian cities (*Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune*).
  - 4-Step instant appointment booking with 6-digit email OTP confirmation.
  - View upcoming and past appointments with live status indicators.
  - View and download printable **E-Prescriptions** issued by doctors.
  - Patient Grievance Redressal Desk with tracking IDs and resolution status.
- **🩺 Doctor Consultation Desk**:
  - Live patient appointment queue for today and upcoming dates.
  - Slot availability management.
  - **E-Prescription Generator**: Diagnosis, clinical notes, medications (dosage, frequency, duration, instructions), lab tests, and follow-up date.
  - Issuing a prescription automatically transitions the appointment to **Completed**.
- **🛡️ Super Admin Command Center**:
  - Doctor Credential Verification Queue: Inspect submitted NMC numbers, degrees, and State Medical Council certificates.
  - One-click **Approve** or **Reject** with formal audit remarks.
  - Platform analytics: Consultations, revenue metrics, active specialist count.
  - Patient Grievance Redressal Console with admin resolution notes.

---

### 2. 🤖 SmartCare AI Health Assistant & Clinical Triage
- **Conversational Side Drawer**: Responsive slide-out AI chatbot with dual tabs (*AI Health Chat* & *Matched Specialists*).
- **Symptom-Specific Clinical Observations**: Automatically evaluates symptoms across 9 medical specialties, explains physiological etiologies, and suggests non-pharmacological supportive care (PRICE protocol, salt-water rinses, hydration, steam inhalation).
- **Emergency 108 Red-Flag Dialer**: Instantly detects critical cardiovascular or neurological warning signs and provides a direct emergency dialer button.
- **Live Specialist Matching**: Queries MongoDB Atlas in real time to suggest verified doctors with fees, hospital affiliations, and direct booking triggers.

---

### 3. 🔐 Security & Indian Healthcare Compliance
- **NMC Registration Audit**: Tracks National Medical Commission numbers and State Medical Council affiliations.
- **ABHA ID Support**: Optional Ayushman Bharat Health Account ID field for digital health records.
- **JWT Authorization**: Token-based authentication securing private portal routes.

---

## 📂 Project Architecture

```
doctor-appointment/
├── package.json                 # Root script runner (client, server, dev)
├── README.md                    # Project documentation
├── client/                      # 💻 Frontend React + Vite Application
│   ├── index.html               # Main HTML entry point
│   ├── vite.config.js           # Vite frontend configuration
│   ├── package.json             # Frontend dependencies (React, Lucide-react, Tailwind)
│   ├── package-lock.json        # Frontend lockfile
│   ├── .oxlintrc.json           # Linter rules
│   └── src/
│       ├── App.jsx              # Root state manager, modal controller, view router
│       ├── index.css            # Tailwind CSS styling & animations
│       ├── main.jsx             # React DOM mount
│       ├── services/
│       │   └── api.js           # Frontend API client service
│       ├── data/
│       │   ├── doctorsData.js   # Synced doctors dataset (45 doctors across 9 specialties)
│       │   └── indianLocations.js # Indian metro locations & cities
│       └── components/
│           ├── Navbar.jsx       # Streamlined header & outside-click user dropdown
│           ├── Hero.jsx         # Search bar, city filter, specialty selector
│           ├── Specialties.jsx  # 9 Medical departments with hover navigation
│           ├── AISidePanel.jsx  # Slide-out SmartCare AI Chatbot drawer
│           ├── HomeAIAssistant.jsx # Homepage embedded AI triage widget
│           ├── FloatingAIAssistant.jsx # Glowing floating bottom-right AI trigger
│           ├── PatientPortal.jsx # Patient Dashboard, e-prescriptions, grievances
│           ├── DoctorPortal.jsx # Doctor Queue, e-prescription generator
│           ├── AdminPortal.jsx  # Super Admin verification desk & analytics
│           ├── AuthModal.jsx    # Clean Sign In / Sign Up with OTP verification
│           ├── BookingModal.jsx # 4-Step appointment booking modal
│           ├── DoctorDetailsModal.jsx # Doctor profile modal
│           └── PrescriptionModal.jsx # Printable E-Prescription viewer
└── server/                      # ⚙️ Backend Node.js + Express Server
    ├── .env.example             # Safe environment variable template
    ├── index.js                 # Express server & REST API routes
    ├── package.json             # Backend dependencies (Express, Mongoose, Nodemailer, JWT)
    ├── package-lock.json        # Backend lockfile
    ├── models/
    │   ├── User.js              # Patient, Doctor, Admin user schema
    │   ├── Doctor.js            # NMC credentials, specialty, slots, approval schema
    │   ├── Appointment.js       # Bookings, OTP verification, e-prescriptions
    │   ├── Complaint.js         # Grievances & redressal resolution schema
    │   └── Otp.js               # Time-limited authentication & booking OTPs
    ├── services/
    │   ├── aiService.js         # Clinical triage heuristic & symptom engine
    │   └── emailService.js      # Nodemailer OTP & confirmation delivery
    ├── routes/
    │   └── ai.js                # AI guidance and doctor recommendation API
    └── scripts/
        ├── seedAllDoctors.js    # Database seeder (45 approved doctors)
        └── seedPendingAndRejectedDoctors.js # Seeder for 5 pending & 4 rejected doctors
```

---

## ⚙️ Environment Configuration

1. In the `server/` directory, copy the template file to `.env`:
   ```bash
   cp server/.env.example server/.env
   ```

2. Configure your environment variables in `server/.env`:
   ```env
   # MongoDB Atlas Connection URI
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/docpulse_db?retryWrites=true&w=majority

   # Server Port
   PORT=5000

   # JWT Secret Key
   JWT_SECRET=docpulse_secure_jwt_secret_key_2026_india

   # Gmail SMTP for OTP Delivery (Nodemailer)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password

   # Optional: OpenAI API Key
   OPENAI_API_KEY=your_api_key_here
   ```

---

## 🚀 Quickstart Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/vishalkumarpathak21-gif/Appointment_System.git
cd Appointment_System
```

### 2. Backend Setup
```bash
cd server
npm install
node index.js
```
*Backend API will run on `http://localhost:5000`.*

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
npm run dev
```
*Frontend will run on `http://localhost:5173`.*

> **Tip**: You can also run `npm run client` and `npm run server` directly from the root repository directory!

---


## 🩺 9 Medical Specialties Covered

1. **Cardiology**: ECG, 2D Echo, Angioplasty, Hypertension, Heart Failure
2. **Dentistry**: Root Canal, Teeth Whitening, Aligners, Dental Implants, Scaling
3. **Dermatology**: Acne, Eczema, Psoriasis, Hair Fall, PRP Therapy, Laser Treatment
4. **General Medicine**: Viral Fevers, Diabetes, Thyroid, Lifestyle Disorders, Full Health Checkup
5. **Orthopedics**: Knee & Hip Replacement, Fracture Care, Arthroscopy, Spine Disorders
6. **Pediatrics**: Neonatal Care, Vaccination, Child Growth & Nutrition, Asthma
7. **Neurology**: Stroke Rehab, Migraine, Epilepsy, Parkinson's, Nerve Conduction
8. **Ophthalmology**: Cataract Surgeries, LASIK, Glaucoma, Diabetic Retinopathy
9. **Psychiatry**: Anxiety, Clinical Depression, CBT, Sleep Disorders, De-addiction

---

## 📡 Key REST API Endpoints

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `GET` | `/api/health` | Service health check and database connection status |
| `POST`| `/api/auth/send-otp` | Sends 6-digit authentication OTP via Nodemailer |
| `POST`| `/api/auth/verify-otp-login` | Validates OTP and returns JWT token |
| `POST`| `/api/auth/login` | Email/password login for Patients, Doctors, Admin |
| `GET` | `/api/doctors` | Returns active doctors filtered by specialty/city |
| `POST`| `/api/appointments/send-booking-otp` | Sends booking confirmation OTP |
| `POST`| `/api/appointments` | Creates a new confirmed appointment |
| `POST`| `/api/appointments/:id/prescription` | Issues E-Prescription and marks appointment complete |
| `POST`| `/api/ai/health-guidance` | Clinical triage heuristic + matched doctors |
| `GET` | `/api/admin/doctor-applications` | Fetches pending, approved, and rejected doctor applications |
| `POST`| `/api/admin/doctor-applications/:id/review`| Approves or rejects doctor credentials |
| `GET` | `/api/complaints` | Returns patient grievances for review |
| `POST`| `/api/complaints/:id/resolve` | Admin grievance resolution with notes |

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
