import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dns from 'node:dns';
import User from './models/User.js';

// Resolve MongoDB SRV records on Windows networks
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
import Doctor from './models/Doctor.js';
import Appointment from './models/Appointment.js';
import Complaint from './models/Complaint.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Doctor21:Doctor21@cluster0.vstflgy.mongodb.net/docpulse_db?retryWrites=true&w=majority&appName=Cluster0';

const INITIAL_INDIAN_DOCTORS = [
  {
    name: "Dr. Rajesh Sharma",
    gender: "Male",
    email: "dr.rajesh@docpulse.in",
    title: "MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi",
    specialty: "cardiology",
    specialtyName: "Cardiology",
    experience: 16,
    rating: 4.96,
    reviewsCount: 420,
    fee: 1000,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    hospital: "Apollo Hospital, Indraprastha, New Delhi",
    location: "Delhi NCR",
    city: "New Delhi",
    distance: "2.4 km away",
    nmcNumber: "NMC-DMC/78942",
    about: "Dr. Rajesh Sharma is a Senior Interventional Cardiologist with over 16 years of experience. He completed his DM Cardiology from AIIMS New Delhi and has performed over 5,000 successful coronary angioplasties.",
    education: [
      "MBBS - Maulana Azad Medical College (MAMC), Delhi",
      "MD (Medicine) - Lady Hardinge Medical College, Delhi",
      "DM (Cardiology) - AIIMS New Delhi"
    ],
    languages: ["Hindi", "English", "Punjabi"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: true,
    applicationStatus: 'Approved',
    availableToday: true,
    slots: {
      today: ["03:30 PM", "04:15 PM", "05:00 PM", "06:30 PM"],
      tomorrow: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"],
      in_2_days: ["09:30 AM", "12:00 PM", "03:30 PM"]
    }
  },
  {
    name: "Dr. Priya Deshmukh",
    gender: "Female",
    email: "dr.priya@docpulse.in",
    title: "MBBS, MD (Dermatology, Venereology & Leprosy) - KEM Hospital Mumbai",
    specialty: "dermatology",
    specialtyName: "Dermatology",
    experience: 12,
    rating: 4.93,
    reviewsCount: 380,
    fee: 800,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    hospital: "Kokilaben Dhirubhai Ambani Hospital, Andheri West",
    location: "Mumbai",
    city: "Mumbai",
    distance: "3.1 km away",
    nmcNumber: "NMC-MMC/56231",
    about: "Dr. Priya Deshmukh is a leading dermatologist & aesthetic physician specializing in acne scarring, laser pigmentation treatments, and chronic eczema management.",
    education: [
      "MBBS - Grant Government Medical College, Mumbai",
      "MD (Dermatology) - KEM Hospital, Mumbai"
    ],
    languages: ["English", "Hindi", "Marathi"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: true,
    applicationStatus: 'Approved',
    availableToday: true,
    slots: {
      today: ["05:00 PM", "05:45 PM", "06:30 PM"],
      tomorrow: ["10:30 AM", "12:00 PM", "03:00 PM", "04:30 PM"],
      in_2_days: ["11:00 AM", "01:30 PM", "05:00 PM"]
    }
  },
  {
    name: "Dr. Arvind Swaminathan",
    gender: "Male",
    email: "dr.arvind@docpulse.in",
    title: "MBBS, MD (General Medicine) - Madras Medical College",
    specialty: "general_medicine",
    specialtyName: "General Physician",
    experience: 15,
    rating: 4.95,
    reviewsCount: 510,
    fee: 600,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    hospital: "Fortis Malar Hospital, Adyar, Chennai",
    location: "Chennai",
    city: "Chennai",
    distance: "1.5 km away",
    nmcNumber: "NMC-TMC/44890",
    about: "Dr. Arvind Swaminathan is a renowned consultant physician with deep expertise in managing Type 2 Diabetes, hypertension, viral fevers, and preventive health screening.",
    education: [
      "MBBS - Madras Medical College (MMC), Chennai",
      "MD (Internal Medicine) - Stanley Medical College, Chennai"
    ],
    languages: ["English", "Tamil", "Hindi", "Telugu"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: true,
    applicationStatus: 'Approved',
    availableToday: true,
    slots: {
      today: ["02:00 PM", "02:45 PM", "04:00 PM", "06:00 PM"],
      tomorrow: ["09:00 AM", "10:30 AM", "01:30 PM", "04:00 PM"],
      in_2_days: ["10:00 AM", "11:30 AM", "03:00 PM"]
    }
  },
  {
    name: "Dr. Ananya Sen Gupta",
    gender: "Female",
    email: "dr.ananya@docpulse.in",
    title: "MBBS, MD (Pediatrics) - CMC Vellore",
    specialty: "pediatrics",
    specialtyName: "Pediatrics & Child Care",
    experience: 14,
    rating: 4.98,
    reviewsCount: 480,
    fee: 700,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1594824813571-638f026361a6?auto=format&fit=crop&q=80&w=600",
    hospital: "Manipal Hospital, Old Airport Road, Bengaluru",
    location: "Bengaluru",
    city: "Bengaluru",
    distance: "2.8 km away",
    nmcNumber: "NMC-KMC/68102",
    about: "Dr. Ananya Sen Gupta is a beloved pediatrician with 14+ years of clinical practice specializing in newborn milestones, infant allergies, and pediatric asthma.",
    education: [
      "MBBS - Christian Medical College (CMC), Vellore",
      "MD (Pediatrics) - St. John's Medical College, Bengaluru"
    ],
    languages: ["English", "Hindi", "Bengali", "Kannada"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: true,
    applicationStatus: 'Approved',
    availableToday: false,
    slots: {
      today: [],
      tomorrow: ["09:30 AM", "11:00 AM", "02:30 PM", "04:30 PM"],
      in_2_days: ["10:00 AM", "11:30 AM", "03:00 PM"]
    }
  },
  {
    name: "Dr. Vikramaditya Reddy",
    gender: "Male",
    email: "dr.vikram@docpulse.in",
    title: "MBBS, MS (Orthopaedics), MCh (Ortho) - NIMS Hyderabad",
    specialty: "orthopedics",
    specialtyName: "Orthopedics & Joint Care",
    experience: 18,
    rating: 4.94,
    reviewsCount: 390,
    fee: 1200,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=600",
    hospital: "Yashoda Hospitals, Hitec City, Hyderabad",
    location: "Hyderabad",
    city: "Hyderabad",
    distance: "3.5 km away",
    nmcNumber: "NMC-TSMC/31902",
    about: "Dr. Vikramaditya Reddy is an acclaimed Senior Joint Replacement and Arthroscopic Surgeon with 18+ years of experience in Robotic Knee & Hip replacements.",
    education: [
      "MBBS - Osmania Medical College, Hyderabad",
      "MS (Orthopaedics) - NIMS Hyderabad"
    ],
    languages: ["Telugu", "English", "Hindi"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: true,
    applicationStatus: 'Approved',
    availableToday: true,
    slots: {
      today: ["04:00 PM", "05:15 PM", "06:30 PM"],
      tomorrow: ["10:00 AM", "11:30 AM", "03:30 PM"],
      in_2_days: ["09:30 AM", "01:00 PM", "04:30 PM"]
    }
  },
  {
    name: "Dr. Alok Verma",
    gender: "Male",
    email: "dr.alok@docpulse.in",
    title: "MBBS, MD (Medicine) - Applicant (Pending Verification)",
    specialty: "general_medicine",
    specialtyName: "General Physician",
    experience: 6,
    rating: 4.7,
    reviewsCount: 15,
    fee: 500,
    currency: "₹",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    hospital: "City Care Clinic, Sector 62, Noida",
    location: "Delhi NCR",
    city: "Noida",
    distance: "4.2 km away",
    nmcNumber: "NMC-DMC/99124",
    about: "New applicant requesting verification for general medicine practice on DocPulse platform.",
    education: ["MBBS - KGMU Lucknow", "MD - AIIMS Patna"],
    languages: ["Hindi", "English"],
    modes: ["In-Clinic", "Video Consultation"],
    isVerified: false, // For Admin verification desk testing!
    availableToday: true,
    slots: {
      today: ["02:00 PM", "04:00 PM"],
      tomorrow: ["10:00 AM", "03:00 PM"],
      in_2_days: ["11:00 AM", "04:00 PM"]
    }
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing data
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    await Complaint.deleteMany({});
    console.log('Cleared existing collections.');

    const defaultPasswordHash = await bcrypt.hash('Doctor21', 10);

    // 1. Create Admin User
    const adminUser = await User.create({
      name: "Super Admin",
      email: "admin@docpulse.in",
      password: defaultPasswordHash,
      role: "admin",
      phone: "+91 99999 12345"
    });
    console.log('Admin account created: admin@docpulse.in / Doctor21');

    // 2. Create Patient User
    const patientUser = await User.create({
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      password: defaultPasswordHash,
      role: "patient",
      phone: "+91 98765 43210",
      abhaId: "91-4567-8901-2345"
    });
    console.log('Patient account created: rahul.sharma@gmail.com / Doctor21');

    // 3. Create Doctors and their User accounts
    const insertedDoctors = [];
    for (const docData of INITIAL_INDIAN_DOCTORS) {
      const docUser = await User.create({
        name: docData.name,
        email: docData.email,
        password: defaultPasswordHash,
        role: "doctor",
        phone: "+91 98100 23456"
      });

      const doctorDoc = await Doctor.create({
        ...docData,
        userId: docUser._id
      });

      docUser.doctorProfileId = doctorDoc._id;
      await docUser.save();

      insertedDoctors.push(doctorDoc);
    }
    console.log(`Created ${insertedDoctors.length} doctors and their user accounts.`);

    // 4. Create Sample Appointments & Medical Consultation History
    const leadDoctor = insertedDoctors[0]; // Dr. Rajesh Sharma (Cardiology)
    const dermatologyDoctor = insertedDoctors[1]; // Dr. Priya Deshmukh (Dermatology)
    const physicianDoctor = insertedDoctors[2]; // Dr. Arvind Swaminathan (General Medicine)
    const orthoDoctor = insertedDoctors[4]; // Dr. Vikramaditya Reddy (Orthopedics)

    // History 1: Completed Cardiology Consultation with full e-Prescription
    await Appointment.create({
      appointmentCode: "DP-IND-741920",
      patientId: patientUser._id,
      doctorId: leadDoctor._id,
      doctorName: leadDoctor.name,
      doctorTitle: leadDoctor.title,
      doctorSpecialty: leadDoctor.specialtyName,
      doctorHospital: leadDoctor.hospital,
      doctorImage: leadDoctor.image,
      nmcNumber: leadDoctor.nmcNumber,
      patientName: patientUser.name,
      patientPhone: patientUser.phone,
      patientEmail: patientUser.email,
      patientAge: 34,
      patientGender: "Male",
      abhaId: patientUser.abhaId,
      consultationMode: "Video Consultation",
      date: "14 Aug 2026",
      timeSlot: "04:15 PM",
      symptoms: "Mild chest discomfort on brisk walking & high BP reading (145/95 mmHg)",
      fee: leadDoctor.fee,
      currency: "₹",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      transactionId: "UPI-IND-88239102",
      status: "Completed",
      prescription: {
        diagnosis: "Stage 1 Essential Hypertension with mild lipid elevation",
        medicines: [
          {
            name: "Telmisartan 40mg",
            dosage: "1 Tablet",
            frequency: "Once daily (Morning after breakfast)",
            duration: "30 Days",
            instructions: "Take regularly with plain water, monitor BP weekly"
          },
          {
            name: "Rosuvastatin 10mg",
            dosage: "1 Tablet",
            frequency: "Once daily (Bedtime)",
            duration: "30 Days",
            instructions: "Avoid grapefruit juice"
          }
        ],
        dietAdvice: "Low sodium diet (<3g salt/day), 30 mins brisk morning walk, avoid oily deep-fried food.",
        nextFollowUp: "After 4 weeks with Lipid Profile & BP Chart",
        issuedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        isSigned: true
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    });

    // History 2: Completed Dermatology OPD Visit
    await Appointment.create({
      appointmentCode: "DP-IND-619024",
      patientId: patientUser._id,
      doctorId: dermatologyDoctor._id,
      doctorName: dermatologyDoctor.name,
      doctorTitle: dermatologyDoctor.title,
      doctorSpecialty: dermatologyDoctor.specialtyName,
      doctorHospital: dermatologyDoctor.hospital,
      doctorImage: dermatologyDoctor.image,
      nmcNumber: dermatologyDoctor.nmcNumber,
      patientName: patientUser.name,
      patientPhone: patientUser.phone,
      patientEmail: patientUser.email,
      patientAge: 34,
      patientGender: "Male",
      abhaId: patientUser.abhaId,
      consultationMode: "In-Clinic",
      date: "02 Aug 2026",
      timeSlot: "05:00 PM",
      symptoms: "Seasonal skin allergy, itchy erythema rash on left forearm",
      fee: dermatologyDoctor.fee,
      currency: "₹",
      paymentStatus: "Paid",
      paymentMethod: "Debit/Credit Card",
      transactionId: "CARD-IND-44210983",
      status: "Completed",
      prescription: {
        diagnosis: "Allergic Contact Dermatitis with acute pruritus",
        medicines: [
          {
            name: "Levocetirizine 5mg",
            dosage: "1 Tablet",
            frequency: "Once daily at night",
            duration: "7 Days",
            instructions: "May cause mild drowsiness"
          },
          {
            name: "Mometasone Furoate 0.1% Cream",
            dosage: "Thin layer application",
            frequency: "Twice daily on affected area",
            duration: "10 Days",
            instructions: "Apply after gentle washing with mild soap"
          }
        ],
        dietAdvice: "Avoid direct harsh sunlight, use non-fragranced moisturizing lotion.",
        nextFollowUp: "SOS if rash spreads or persists beyond 10 days",
        issuedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
        isSigned: true
      },
      createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000)
    });

    // History 3: Completed General Physician Viral Fever Checkup
    await Appointment.create({
      appointmentCode: "DP-IND-482019",
      patientId: patientUser._id,
      doctorId: physicianDoctor._id,
      doctorName: physicianDoctor.name,
      doctorTitle: physicianDoctor.title,
      doctorSpecialty: physicianDoctor.specialtyName,
      doctorHospital: physicianDoctor.hospital,
      doctorImage: physicianDoctor.image,
      nmcNumber: physicianDoctor.nmcNumber,
      patientName: patientUser.name,
      patientPhone: patientUser.phone,
      patientEmail: patientUser.email,
      patientAge: 34,
      patientGender: "Male",
      abhaId: patientUser.abhaId,
      consultationMode: "Video Consultation",
      date: "20 Jul 2026",
      timeSlot: "02:45 PM",
      symptoms: "High fever (102°F), body aches, chills, and mild sore throat",
      fee: physicianDoctor.fee,
      currency: "₹",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      transactionId: "UPI-IND-77192034",
      status: "Completed",
      prescription: {
        diagnosis: "Acute Viral Pyrexia with upper respiratory tract infection",
        medicines: [
          {
            name: "Paracetamol 650mg",
            dosage: "1 Tablet",
            frequency: "Thrice daily after food (SOS)",
            duration: "4 Days",
            instructions: "Maintain at least 6 hours gap between doses"
          },
          {
            name: "Vitamin C + Zinc Chewable Tablets",
            dosage: "1 Tablet",
            frequency: "Once daily after lunch",
            duration: "15 Days",
            instructions: "Immune support"
          }
        ],
        dietAdvice: "High fluid intake (coconut water, ORS, soups), complete rest for 3 days.",
        nextFollowUp: "Get Complete Blood Count (CBC) & Dengue NS1 if fever exceeds 3 days",
        issuedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        isSigned: true
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    });

    // History 4: Upcoming Consultation
    await Appointment.create({
      appointmentCode: "DP-IND-892104",
      patientId: patientUser._id,
      doctorId: orthoDoctor._id,
      doctorName: orthoDoctor.name,
      doctorTitle: orthoDoctor.title,
      doctorSpecialty: orthoDoctor.specialtyName,
      doctorHospital: orthoDoctor.hospital,
      doctorImage: orthoDoctor.image,
      nmcNumber: orthoDoctor.nmcNumber,
      patientName: patientUser.name,
      patientPhone: patientUser.phone,
      patientEmail: patientUser.email,
      patientAge: 34,
      patientGender: "Male",
      abhaId: patientUser.abhaId,
      consultationMode: "In-Clinic",
      date: "Tomorrow, 20 Aug 2026",
      timeSlot: "11:30 AM",
      symptoms: "Right knee discomfort and clicking sound during stair climbing",
      fee: orthoDoctor.fee,
      currency: "₹",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      transactionId: "UPI-IND-99120482",
      status: "Confirmed",
      prescription: {
        diagnosis: "",
        medicines: [],
        dietAdvice: "",
        nextFollowUp: "",
        issuedAt: null,
        isSigned: false
      },
      createdAt: new Date()
    });

    console.log('Patient appointment history seeded with completed e-prescriptions and invoices.');

    // 5. Create Sample Complaints / Grievances for Admin
    await Complaint.create({
      patientName: "Vikram Malhotra",
      patientEmail: "vikram.m@gmail.com",
      doctorName: "Dr. Rajesh Sharma",
      appointmentCode: "DP-IND-110294",
      category: "Prescription Delay",
      subject: "Prescription PDF downloaded without doctor signature",
      message: "I completed my video consultation yesterday but the pharmacy required the doctor NMC digital sign stamp on the PDF.",
      status: "Open",
      adminResponse: ""
    });

    await Complaint.create({
      patientName: "Sneha Patel",
      patientEmail: "sneha.p@gmail.com",
      doctorName: "Dr. Priya Deshmukh",
      appointmentCode: "DP-IND-339201",
      category: "Refund / Payment",
      subject: "Double UPI deduction during slot booking",
      message: "Amount was debited twice on GPay. Reference ID: UPI-IND-99482910.",
      status: "Resolved",
      adminResponse: "Verified with payment gateway. Refund of ₹800 initiated back to your UPI VPA on 18 Aug 2026.",
      resolvedAt: new Date()
    });

    console.log('Sample complaints created.');
    console.log('Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
