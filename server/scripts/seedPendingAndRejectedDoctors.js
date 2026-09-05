import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dns from 'node:dns';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0';

import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

const PENDING_DOCTORS = [
  {
    name: "Dr. Shantanu Rawat",
    email: "dr.shantanurawat@docpulse.in",
    gender: "Male",
    title: "MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi",
    specialty: "cardiology",
    specialtyName: "Cardiology",
    experience: 8,
    rating: 4.8,
    reviewsCount: 15,
    fee: 900,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    hospital: "Max Super Speciality Hospital, Saket, New Delhi",
    location: "Delhi NCR",
    city: "New Delhi",
    clinicAddress: "1 Press Enclave Marg, Saket Institutional Area, New Delhi - 110017",
    nmcNumber: "NMC-DMC/89201",
    medicalCouncil: "Delhi Medical Council",
    medicalCollege: "AIIMS New Delhi",
    degreeProofUrl: "https://nmc.org.in/degrees/dr-shantanu-rawat-dm.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/nmc-dmc-89201.pdf",
    languages: ["English", "Hindi"],
    about: "Dr. Shantanu Rawat is an interventional cardiologist specializing in coronary angiography, hypertension management, and echocardiography.",
    applicationStatus: "Pending",
    isVerified: false,
    adminRemarks: ""
  },
  {
    name: "Dr. Neha Rastogi",
    email: "dr.neharastogi@docpulse.in",
    gender: "Female",
    title: "MBBS, MD (Dermatology, Venereology & Leprosy) - KGMU Lucknow",
    specialty: "dermatology",
    specialtyName: "Dermatology",
    experience: 7,
    rating: 4.9,
    reviewsCount: 22,
    fee: 750,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1594824813512-32b00511f5bb?auto=format&fit=crop&q=80&w=600",
    hospital: "Fortis Escorts Hospital, Okhla Road, New Delhi",
    location: "Delhi NCR",
    city: "New Delhi",
    clinicAddress: "Sector 62, Phase 8, Industrial Area, Mohali - 160062",
    nmcNumber: "NMC-UPMC/54319",
    medicalCouncil: "Uttar Pradesh Medical Council",
    medicalCollege: "King George's Medical University (KGMU) Lucknow",
    degreeProofUrl: "https://nmc.org.in/degrees/dr-neha-rastogi-md.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/nmc-upmc-54319.pdf",
    languages: ["English", "Hindi"],
    about: "Dr. Neha Rastogi is an aesthetic and clinical dermatologist with expertise in acne scar revisions, eczema, and clinical hair restoration.",
    applicationStatus: "Pending",
    isVerified: false,
    adminRemarks: ""
  },
  {
    name: "Dr. Prateek Bhatia",
    email: "dr.prateekbhatia@docpulse.in",
    gender: "Male",
    title: "MBBS, MS (Orthopaedics), M.Ch (Joint Replacement) - PGIMER Chandigarh",
    specialty: "orthopedics",
    specialtyName: "Orthopedics",
    experience: 11,
    rating: 4.85,
    reviewsCount: 30,
    fee: 850,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    hospital: "Manipal Hospital, Old Airport Road, Bengaluru",
    location: "Bengaluru",
    city: "Bengaluru",
    clinicAddress: "98 HAL Old Airport Road, Kodihalli, Bengaluru - 560017",
    nmcNumber: "NMC-PMC/32187",
    medicalCouncil: "Punjab Medical Council",
    medicalCollege: "PGIMER Chandigarh",
    degreeProofUrl: "https://nmc.org.in/degrees/dr-prateek-bhatia-ms.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/nmc-pmc-32187.pdf",
    languages: ["English", "Hindi", "Punjabi"],
    about: "Dr. Prateek Bhatia is a senior joint reconstruction surgeon specializing in robotic knee arthroplasty, hip replacements, and sports arthroscopy.",
    applicationStatus: "Pending",
    isVerified: false,
    adminRemarks: ""
  },
  {
    name: "Dr. Kavita Pandey",
    email: "dr.kavitapandey@docpulse.in",
    gender: "Female",
    title: "MBBS, MD (Pediatrics), DNB (Neonatology) - CMC Vellore",
    specialty: "pediatrics",
    specialtyName: "Pediatrics",
    experience: 9,
    rating: 4.92,
    reviewsCount: 18,
    fee: 650,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    hospital: "Rainbow Children's Hospital, Banjara Hills, Hyderabad",
    location: "Hyderabad",
    city: "Hyderabad",
    clinicAddress: "Road No. 2, Banjara Hills, Hyderabad - 500034",
    nmcNumber: "NMC-TMC/77651",
    medicalCouncil: "Telangana Medical Council",
    medicalCollege: "Christian Medical College (CMC) Vellore",
    degreeProofUrl: "https://nmc.org.in/degrees/dr-kavita-pandey-md.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/nmc-tmc-77651.pdf",
    languages: ["English", "Hindi", "Telugu"],
    about: "Dr. Kavita Pandey is a child wellness specialist focusing on infant developmental milestones, pediatric vaccinations, and childhood respiratory allergies.",
    applicationStatus: "Pending",
    isVerified: false,
    adminRemarks: ""
  },
  {
    name: "Dr. Rohit Menon",
    email: "dr.rohitmenon@docpulse.in",
    gender: "Male",
    title: "MBBS, MD (General Medicine), DM (Neurology) - NIMHANS Bengaluru",
    specialty: "neurology",
    specialtyName: "Neurology",
    experience: 12,
    rating: 4.88,
    reviewsCount: 25,
    fee: 1000,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    hospital: "Aster Medcity, Cheranalloor, Kochi",
    location: "Chennai",
    city: "Kochi",
    clinicAddress: "Kuttisahib Road, South Chittoor, Cheranalloor, Kochi - 682027",
    nmcNumber: "NMC-KMC/41092",
    medicalCouncil: "Karnataka Medical Council",
    medicalCollege: "NIMHANS Bengaluru",
    degreeProofUrl: "https://nmc.org.in/degrees/dr-rohit-menon-dm.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/nmc-kmc-41092.pdf",
    languages: ["English", "Hindi", "Malayalam"],
    about: "Dr. Rohit Menon specializes in headache medicine, neuro-rehabilitation, refractory epilepsy, and movement disorder management.",
    applicationStatus: "Pending",
    isVerified: false,
    adminRemarks: ""
  }
];

const REJECTED_DOCTORS = [
  {
    name: "Dr. Vijay Malhotra",
    email: "dr.vijaymalhotra@docpulse.in",
    gender: "Male",
    title: "MBBS - Foreign Medical Graduate",
    specialty: "general_medicine",
    specialtyName: "General Medicine",
    experience: 4,
    rating: 4.2,
    reviewsCount: 5,
    fee: 500,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    hospital: "City Care Family Clinic, Noida",
    location: "Delhi NCR",
    city: "Noida",
    clinicAddress: "Sector 18 Commercial Complex, Noida - 201301",
    nmcNumber: "NMC-INVALID/00912",
    medicalCouncil: "Delhi Medical Council",
    medicalCollege: "Unrecognized Overseas Medical College",
    degreeProofUrl: "https://nmc.org.in/invalid-degree-doc.pdf",
    licenseCertificateUrl: "https://nmc.org.in/invalid-license.pdf",
    languages: ["English", "Hindi"],
    about: "General medical practice practitioner.",
    applicationStatus: "Rejected",
    isVerified: false,
    adminRemarks: "Registration number could not be authenticated against the National Medical Commission registry. Incomplete FMGE certificate proof."
  },
  {
    name: "Dr. Tanya Sharma",
    email: "dr.tanyasharma@docpulse.in",
    gender: "Female",
    title: "BDS - Dental Surgeon",
    specialty: "dentistry",
    specialtyName: "Dentistry",
    experience: 3,
    rating: 4.1,
    reviewsCount: 6,
    fee: 400,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    hospital: "Smile Bright Dental Care, Mumbai",
    location: "Mumbai",
    city: "Mumbai",
    clinicAddress: "Linking Road, Bandra West, Mumbai - 400050",
    nmcNumber: "NMC-DDC/11290",
    medicalCouncil: "Delhi Dental Council",
    medicalCollege: "Private Dental College, Jaipur",
    degreeProofUrl: "https://nmc.org.in/degrees/tanya-sharma-bds.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/tanya-expired-license.pdf",
    languages: ["English", "Hindi"],
    about: "Dental practitioner focusing on oral hygiene and teeth scaling.",
    applicationStatus: "Rejected",
    isVerified: false,
    adminRemarks: "State Dental Council practice license expired on 31-Dec-2023. Valid State Council Renewal Certificate is required for approval."
  },
  {
    name: "Dr. Alok Verma",
    email: "dr.alokverma@docpulse.in",
    gender: "Male",
    title: "MBBS, MD - Cardiology Fellow",
    specialty: "cardiology",
    specialtyName: "Cardiology",
    experience: 5,
    rating: 4.3,
    reviewsCount: 8,
    fee: 800,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    hospital: "Verma Heart Care Clinic, Pune",
    location: "Pune",
    city: "Pune",
    clinicAddress: "FC Road, Shivajinagar, Pune - 411005",
    nmcNumber: "NMC-MCI/99812",
    medicalCouncil: "Maharashtra Medical Council",
    medicalCollege: "Government Medical College, Nagpur",
    degreeProofUrl: "https://nmc.org.in/degrees/alok-verma-unverified.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/alok-verma-license.pdf",
    languages: ["English", "Hindi", "Marathi"],
    about: "Clinical cardiology and outpatient cardiac prevention.",
    applicationStatus: "Rejected",
    isVerified: false,
    adminRemarks: "Submitted Super-specialty DM certificate could not be validated with the National Board of Examinations database."
  },
  {
    name: "Dr. Sameer Khan",
    email: "dr.sameerkhan@docpulse.in",
    gender: "Male",
    title: "MBBS, MS (Ophthalmology) - Eye Care",
    specialty: "ophthalmology",
    specialtyName: "Ophthalmology",
    experience: 6,
    rating: 4.4,
    reviewsCount: 11,
    fee: 600,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    hospital: "Vision Care Eye Center, Kolkata",
    location: "Kolkata",
    city: "Kolkata",
    clinicAddress: "Park Street, Kolkata - 700016",
    nmcNumber: "NMC-BMC/66540",
    medicalCouncil: "West Bengal Medical Council",
    medicalCollege: "Calcutta National Medical College",
    degreeProofUrl: "https://nmc.org.in/degrees/sameer-khan-ms.pdf",
    licenseCertificateUrl: "https://nmc.org.in/licenses/sameer-khan-license.pdf",
    languages: ["English", "Hindi", "Bengali"],
    about: "Ophthalmology and refractive vision assessment.",
    applicationStatus: "Rejected",
    isVerified: false,
    adminRemarks: "Government ID photo proof unreadable/blurred and mismatch between registered clinic address and State Medical Council jurisdiction."
  }
];

async function seedPendingAndRejected() {
  try {
    console.log('Connecting to MongoDB Atlas Cluster...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const hashedPassword = await bcrypt.hash('Doctor21', 10);

    console.log('\n--- Seeding 5 Pending Doctor Applications ---');
    for (const doc of PENDING_DOCTORS) {
      // 1. Create or update User account
      let user = await User.findOne({ email: doc.email });
      if (!user) {
        user = await User.create({
          name: doc.name,
          email: doc.email,
          phone: '+91 98111 ' + Math.floor(10000 + Math.random() * 90000),
          password: hashedPassword,
          role: 'doctor',
          isApproved: false
        });
        console.log(`Created User: ${doc.name} (${doc.email})`);
      } else {
        user.isApproved = false;
        user.password = hashedPassword;
        await user.save();
      }

      // 2. Create or update Doctor record
      await Doctor.findOneAndUpdate(
        { email: doc.email },
        {
          ...doc,
          userId: user._id,
          appliedAt: new Date(Date.now() - Math.floor(Math.random() * 5 * 86400000)) // 1 to 5 days ago
        },
        { upsert: true, new: true }
      );
      console.log(`✅ [PENDING] ${doc.name} - ${doc.specialtyName} (${doc.nmcNumber})`);
    }

    console.log('\n--- Seeding 4 Rejected Doctor Applications ---');
    for (const doc of REJECTED_DOCTORS) {
      // 1. Create or update User account
      let user = await User.findOne({ email: doc.email });
      if (!user) {
        user = await User.create({
          name: doc.name,
          email: doc.email,
          phone: '+91 98222 ' + Math.floor(10000 + Math.random() * 90000),
          password: hashedPassword,
          role: 'doctor',
          isApproved: false
        });
        console.log(`Created User: ${doc.name} (${doc.email})`);
      } else {
        user.isApproved = false;
        user.password = hashedPassword;
        await user.save();
      }

      // 2. Create or update Doctor record
      await Doctor.findOneAndUpdate(
        { email: doc.email },
        {
          ...doc,
          userId: user._id,
          appliedAt: new Date(Date.now() - 10 * 86400000), // 10 days ago
          approvedAt: null
        },
        { upsert: true, new: true }
      );
      console.log(`❌ [REJECTED] ${doc.name} - ${doc.specialtyName} (${doc.nmcNumber}) -> Remarks: ${doc.adminRemarks}`);
    }

    // Verify Counts
    const totalPending = await Doctor.countDocuments({ applicationStatus: 'Pending' });
    const totalApproved = await Doctor.countDocuments({ applicationStatus: 'Approved' });
    const totalRejected = await Doctor.countDocuments({ applicationStatus: 'Rejected' });
    const totalAll = await Doctor.countDocuments();

    console.log('\n=========================================');
    console.log(`Total Doctors in DB: ${totalAll}`);
    console.log(`🟢 Approved Doctors: ${totalApproved}`);
    console.log(`⏳ Pending Applications: ${totalPending}`);
    console.log(`🔴 Rejected Applications: ${totalRejected}`);
    console.log('=========================================');

    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedPendingAndRejected();
