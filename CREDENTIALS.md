# 🔐 DocPulse India — Platform Credentials & Connection Details

This file contains all critical credentials, environment variables, database connections, and user accounts required to run and test every feature of the DocPulse India platform.

---

## ⚙️ 1. Environment Configuration (`server/.env`)

```env
MONGODB_URI=mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
JWT_SECRET=docpulse_secure_jwt_secret_key_2026_india
EMAIL_USER=vishalkumarpathak21@gmail.com
EMAIL_PASS=nnur uqxh qyqw ewrb
OPENAI_API_KEY=your_api_key_here
```

### Explanation of Keys:
- `MONGODB_URI`: Live MongoDB Atlas cloud cluster connection string (`docpulse_db` database).
- `PORT`: Backend Express API server port (`5000`).
- `JWT_SECRET`: Secret key used to sign and verify JSON Web Tokens.
- `EMAIL_USER`: Gmail address used by Nodemailer to deliver 6-digit authentication and booking OTPs.
- `EMAIL_PASS`: Gmail 16-character App Password for SMTP authentication.

---

## 👥 2. Administrative & Patient Test Accounts

| Role | Name | Email Address | Password | Permissions & Features |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | Super Admin | `admin@docpulse.in` | `Doctor21` | Doctor verification queue (Approve/Reject applications), Platform revenue analytics, Patient grievance resolution desk |
| **Verified Patient** | Vishal Kumar Pathak | `vishalkumarpathak21@gmail.com` | `vishal21` | Book appointments, live booking OTP verification, view past/upcoming consultations, view & download E-Prescriptions, file grievances |

---

## 🩺 3. Doctor Accounts (All 45 Approved Doctors)

> **Universal Doctor Password**: `Doctor21`  
> **Doctor Email Convention**: `dr.<firstname><lastname>@docpulse.in`

### 🫀 Cardiology (5 Doctors)
1. **Dr. Rajesh Sharma** | `dr.rajeshsharma@docpulse.in` | Fee: ₹1,000 | Apollo Hospital, New Delhi | NMC-DMC/12458
2. **Dr. Ananya Iyer** | `dr.ananyaiyer@docpulse.in` | Fee: ₹1,200 | Fortis Escorts Heart Institute, New Delhi | NMC-DMC/34891
3. **Dr. Vikramaditya Rathore** | `dr.vikramadityarathore@docpulse.in` | Fee: ₹1,500 | Medanta - The Medicity, Gurugram | NMC-HNMC/77621
4. **Dr. Sneha Kulkarni** | `dr.snehakulkarni@docpulse.in` | Fee: ₹1,100 | Kokilaben Dhirubhai Ambani Hospital, Mumbai | NMC-MMC/99245
5. **Dr. Arvind Narayanan** | `dr.arvindnarayanan@docpulse.in` | Fee: ₹1,000 | Narayana Institute of Cardiac Sciences, Bengaluru | NMC-KMC/66312

### ✨ Dermatology (5 Doctors)
6. **Dr. Ananya Mukherjee** | `dr.ananyamukherjee@docpulse.in` | Fee: ₹800 | Kaya Skin Clinic & Max Hospital, New Delhi | NMC-DMC/45892
7. **Dr. Rohan Mehra** | `dr.rohanmehra@docpulse.in` | Fee: ₹900 | Fortis Memorial Research Institute, Gurugram | NMC-HNMC/51234
8. **Dr. Pooja Chawla** | `dr.poojachawla@docpulse.in` | Fee: ₹750 | Apollo Hospitals, Jubilee Hills, Hyderabad | NMC-TMC/68901
9. **Dr. Siddharth Rao** | `dr.siddharthrao@docpulse.in` | Fee: ₹850 | Manipal Hospital, Old Airport Road, Bengaluru | NMC-KMC/82341
10. **Dr. Natasha Sen** | `dr.natashasen@docpulse.in` | Fee: ₹950 | Belle Vue Clinic & Skin Institute, Kolkata | NMC-WBMC/34190

### 🩺 General Medicine (5 Doctors)
11. **Dr. Suresh Venkatesh** | `dr.sureshvenkatesh@docpulse.in` | Fee: ₹500 | Manipal Hospital, Bengaluru | NMC-KMC/56123
12. **Dr. Meenakshi Sundaram** | `dr.meenakshisundaram@docpulse.in` | Fee: ₹600 | Apollo Hospitals, Greams Road, Chennai | NMC-TNMC/78912
13. **Dr. Rajiv Tandon** | `dr.rajivtandon@docpulse.in` | Fee: ₹500 | Sir Ganga Ram Hospital, New Delhi | NMC-DMC/23490
14. **Dr. Sunita Deshpande** | `dr.sunitadeshpande@docpulse.in` | Fee: ₹550 | KEM Hospital & Research Centre, Pune | NMC-MMC/67123
15. **Dr. Amitav Banerjee** | `dr.amitavbanerjee@docpulse.in` | Fee: ₹500 | AMRI Hospitals, Salt Lake, Kolkata | NMC-WBMC/45120

### 👶 Pediatrics & Child Care (5 Doctors)
16. **Dr. Priya Deshmukh** | `dr.priyadeshmukh@docpulse.in` | Fee: ₹600 | Lilavati Hospital & Research Centre, Mumbai | NMC-MMC/89123
17. **Dr. Alok Srivastava** | `dr.aloksrivastava@docpulse.in` | Fee: ₹650 | Rainbow Children's Hospital, New Delhi | NMC-DMC/78124
18. **Dr. Deepa Ramachandran** | `dr.deeparamachandran@docpulse.in` | Fee: ₹700 | Cloudnine Hospital, Bengaluru | NMC-KMC/91234
19. **Dr. Manish Gupta** | `dr.manishgupta@docpulse.in` | Fee: ₹600 | Fortis Hospital, Mohali | NMC-PMC/45678
20. **Dr. Shalini Roy** | `dr.shaliniroy@docpulse.in` | Fee: ₹650 | Apollo Gleneagles Hospitals, Kolkata | NMC-WBMC/67890

### 🦴 Orthopedics & Joint Care (5 Doctors)
21. **Dr. Arvind Swaminathan** | `dr.arvindswaminathan@docpulse.in` | Fee: ₹900 | Apollo Specialty Hospital, Chennai | NMC-TNMC/67891
22. **Dr. Harpreet Singh** | `dr.harpreetsingh@docpulse.in` | Fee: ₹1,000 | Max Smart Super Speciality Hospital, New Delhi | NMC-DMC/89012
23. **Dr. Vivek Joshi** | `dr.vivekjoshi@docpulse.in` | Fee: ₹850 | Ruby Hall Clinic, Pune | NMC-MMC/45231
24. **Dr. Ramesh Babu** | `dr.rameshbabu@docpulse.in` | Fee: ₹900 | Yashoda Hospitals, Secunderabad | NMC-TMC/78345
25. **Dr. Gautam Ganguly** | `dr.gautamganguly@docpulse.in` | Fee: ₹950 | Peerless Hospital, Kolkata | NMC-WBMC/23901

### 🦷 Dentistry & Oral Surgery (5 Doctors)
26. **Dr. Sumit Kumar** | `dr.sumitkumar@docpulse.in` | Fee: ₹500 | Clove Dental Super Speciality, Delhi NCR | NMC-DDC/67210
27. **Dr. Ritu Aggarwal** | `dr.rituaggarwal@docpulse.in` | Fee: ₹600 | Apollo White Dental, Bengaluru | NMC-KDC/89012
28. **Dr. Kunal Shah** | `dr.kunalshah@docpulse.in` | Fee: ₹700 | Smile Care Dental Clinic, Bandra, Mumbai | NMC-MDC/34567
29. **Dr. Preeti Reddy** | `dr.preetireddy@docpulse.in` | Fee: ₹550 | FMS Dental Hospital, Hyderabad | NMC-TDC/78901
30. **Dr. Sourav Bhattacharya** | `dr.souravbhattacharya@docpulse.in` | Fee: ₹500 | Mission Smile Dental Centre, Kolkata | NMC-WBDC/45612

### 🧠 Neurology & Brain Care (5 Doctors)
31. **Dr. Kedar Natarajan** | `dr.kedarnatarajan@docpulse.in` | Fee: ₹1,200 | NIMHANS & Aster CMI Hospital, Bengaluru | NMC-KMC/78129
32. **Dr. Ashok Panagariya** | `dr.ashokpanagariya@docpulse.in` | Fee: ₹1,300 | SMS Hospital & Neuro Clinic, Jaipur | NMC-RMC/45612
33. **Dr. Manjari Tripathi** | `dr.manjaritripathi@docpulse.in` | Fee: ₹1,500 | AIIMS New Delhi | NMC-DMC/89023
34. **Dr. Sudhir Shah** | `dr.sudhirshah@docpulse.in` | Fee: ₹1,200 | Sterling Hospitals, Ahmedabad | NMC-GMC/67124
35. **Dr. Prithviraj Ghosh** | `dr.prithvirajghosh@docpulse.in` | Fee: ₹1,100 | Institute of Neurosciences, Kolkata | NMC-WBMC/34567

### 👁️ Ophthalmology & Eye Care (5 Doctors)
36. **Dr. Arvind Netralaya** | `dr.arvindnetralaya@docpulse.in` | Fee: ₹700 | Sankara Nethralaya, Chennai | NMC-TNMC/89012
37. **Dr. Radhika Sen** | `dr.radhikasen@docpulse.in` | Fee: ₹800 | Shroff Eye Centre, New Delhi | NMC-DMC/56789
38. **Dr. Jayant Shah** | `dr.jayantshah@docpulse.in` | Fee: ₹750 | Narayana Nethralaya, Bengaluru | NMC-KMC/67890
39. **Dr. Meera Nambiar** | `dr.meeranambiar@docpulse.in` | Fee: ₹700 | Giridhar Eye Institute, Kochi | NMC-TCMC/45612
40. **Dr. Arup Chakrabarti** | `dr.arupchakrabarti@docpulse.in` | Fee: ₹800 | Chakrabarti Eye Care Centre, Thiruvananthapuram | NMC-TCMC/78901

### 🧠 Psychiatry & Mental Wellness (5 Doctors)
41. **Dr. Vikram Prabhu** | `dr.vikramprabhu@docpulse.in` | Fee: ₹1,000 | Fortis Healthcare & Mind Centre, Bengaluru | NMC-KMC/89012
42. **Dr. Nandita Hazari** | `dr.nanditahazari@docpulse.in` | Fee: ₹1,100 | VIMHANS Hospital, New Delhi | NMC-DMC/67890
43. **Dr. Harish Shetty** | `dr.harishshetty@docpulse.in` | Fee: ₹1,200 | Dr. L H Hiranandani Hospital, Mumbai | NMC-MMC/45678
44. **Dr. Anita Rao** | `dr.anitarao@docpulse.in` | Fee: ₹950 | Asha Hospital, Hyderabad | NMC-TMC/78912
45. **Dr. Sandip Shah** | `dr.sandipshah@docpulse.in` | Fee: ₹1,000 | Mind Wellness Clinic, Ahmedabad | NMC-GMC/34567

---

## ⏳ 4. Pending Doctor Applications (For Admin Verification Testing)

These doctor accounts have submitted their credentials and are awaiting Super Admin approval in the Admin Console:

1. **Dr. Shantanu Rawat** | `dr.shantanurawat@docpulse.in` | Cardiology | AIIMS New Delhi | NMC-DMC/89201 | Max Super Speciality, Saket
2. **Dr. Neha Rastogi** | `dr.neharastogi@docpulse.in` | Dermatology | KGMU Lucknow | NMC-UPMC/54319 | Fortis Escorts, New Delhi
3. **Dr. Prateek Bhatia** | `dr.prateekbhatia@docpulse.in` | Orthopedics | PGIMER Chandigarh | NMC-PMC/32187 | Manipal Hospital, Bengaluru
4. **Dr. Kavita Pandey** | `dr.kavitapandey@docpulse.in` | Pediatrics | CMC Vellore | NMC-TMC/77651 | Rainbow Children's, Hyderabad
5. **Dr. Rohit Menon** | `dr.rohitmenon@docpulse.in` | Neurology | NIMHANS Bengaluru | NMC-KMC/41092 | Aster Medcity, Kochi

---

## 🔴 5. Rejected Doctor Applications (With Audit Remarks)

These accounts simulate rejected medical applications with formal board remarks in the Admin Console:

1. **Dr. Vijay Malhotra** (`dr.vijaymalhotra@docpulse.in`) — *General Medicine* (`NMC-INVALID/00912`)  
   *Audit Remarks*: *"Registration number could not be authenticated against the National Medical Commission registry. Incomplete FMGE certificate proof."*
2. **Dr. Tanya Sharma** (`dr.tanyasharma@docpulse.in`) — *Dentistry* (`NMC-DDC/11290`)  
   *Audit Remarks*: *"State Dental Council practice license expired on 31-Dec-2023. Valid State Council Renewal Certificate is required for approval."*
3. **Dr. Alok Verma** (`dr.alokverma@docpulse.in`) — *Cardiology* (`NMC-MCI/99812`)  
   *Audit Remarks*: *"Submitted Super-specialty DM certificate could not be validated with the National Board of Examinations database."*
4. **Dr. Sameer Khan** (`dr.sameerkhan@docpulse.in`) — *Ophthalmology* (`NMC-BMC/66540`)  
   *Audit Remarks*: *"Government ID photo proof unreadable/blurred and mismatch between registered clinic address and State Medical Council jurisdiction."*

---

## 🧪 6. Database Verification Commands

To check the database counts directly in MongoDB Atlas:
```bash
cd server
node -e "
import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import Doctor from './models/Doctor.js';
mongoose.connect('mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0')
  .then(async () => {
    const approved = await Doctor.countDocuments({ applicationStatus: 'Approved' });
    const pending = await Doctor.countDocuments({ applicationStatus: 'Pending' });
    const rejected = await Doctor.countDocuments({ applicationStatus: 'Rejected' });
    console.log('Total Approved Doctors:', approved);
    console.log('Total Pending Doctors:', pending);
    console.log('Total Rejected Doctors:', rejected);
    process.exit(0);
  });
"
```
