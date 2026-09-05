import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_DOCTORS } from './seedAllDoctors.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '../../src/data/doctorsData.js');

const SPECIALTIES = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: "HeartPulse",
    description: "Heart specialists, ECG, angiography, bypass & hypertension care",
    doctorCount: 45,
    color: "from-rose-500/10 to-red-500/20 text-rose-600 border-rose-200 hover:border-rose-400"
  },
  {
    id: "dermatology",
    name: "Dermatology",
    icon: "Sparkles",
    description: "Skin allergy, acne, hair fall, pigmentation & cosmetic clinical care",
    doctorCount: 52,
    color: "from-amber-500/10 to-orange-500/20 text-amber-600 border-amber-200 hover:border-amber-400"
  },
  {
    id: "general_medicine",
    name: "General Physician",
    icon: "Stethoscope",
    description: "Viral fever, dengue, malaria, diabetes, thyroid & routine checkups",
    doctorCount: 95,
    color: "from-teal-500/10 to-emerald-500/20 text-teal-600 border-teal-200 hover:border-teal-400"
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Child Care",
    icon: "Baby",
    description: "Newborn care, child vaccinations, growth milestones & nutrition",
    doctorCount: 60,
    color: "from-sky-500/10 to-blue-500/20 text-sky-600 border-sky-200 hover:border-sky-400"
  },
  {
    id: "orthopedics",
    name: "Orthopedics & Joint Care",
    icon: "Activity",
    description: "Knee pain, arthritis, fracture treatment, spine & joint replacement",
    doctorCount: 40,
    color: "from-emerald-500/10 to-teal-500/20 text-emerald-600 border-emerald-200 hover:border-emerald-400"
  },
  {
    id: "neurology",
    name: "Neurology",
    icon: "Brain",
    description: "Migraine, stroke, epilepsy, nerve disorders & brain care",
    doctorCount: 32,
    color: "from-purple-500/10 to-indigo-500/20 text-purple-600 border-purple-200 hover:border-purple-400"
  },
  {
    id: "dentistry",
    name: "Dental & Oral Surgery",
    icon: "Smile",
    description: "Root canal (RCT), dental implants, teeth alignment & smile design",
    doctorCount: 48,
    color: "from-cyan-500/10 to-blue-500/20 text-cyan-600 border-cyan-200 hover:border-cyan-400"
  },
  {
    id: "ophthalmology",
    name: "Eye Care & Lasik",
    icon: "Eye",
    description: "Cataract surgery, Lasik vision correction, glaucoma & retina care",
    doctorCount: 30,
    color: "from-indigo-500/10 to-violet-500/20 text-indigo-600 border-indigo-200 hover:border-indigo-400"
  },
  {
    id: "psychiatry",
    name: "Mental Wellness & Psychiatry",
    icon: "SmilePlus",
    description: "Stress therapy, clinical depression, anxiety & holistic counseling",
    doctorCount: 36,
    color: "from-pink-500/10 to-rose-500/20 text-pink-600 border-pink-200 hover:border-pink-400"
  }
];

const mappedDoctors = ALL_DOCTORS.map((d, index) => ({
  id: `doc-${index + 1}`,
  ...d
}));

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sunita Agarwal",
    city: "New Delhi",
    role: "Heart Patient",
    specialtyTreated: "Cardiology Consultation",
    rating: 5,
    comment: "Booking Dr. Rajesh Sharma on DocPulse was effortless. The video consultation gave my family immense peace of mind and the digital prescription was accepted by our local pharmacy without issues.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Vikram Singhania",
    city: "Mumbai",
    role: "Skin Care Patient",
    specialtyTreated: "Dermatology & Skin Care",
    rating: 5,
    comment: "Dr. Priya Deshmukh solved my stubborn cystic acne issue within 6 weeks. The SmartCare AI symptom checker directed me straight to her clinic.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Naveen Reddy",
    city: "Hyderabad",
    role: "Knee Surgery Recovery",
    specialtyTreated: "Orthopedics Joint Replacement",
    rating: 5,
    comment: "Dr. Vikramaditya Reddy is the finest orthopedic surgeon in Hyderabad. My robotic knee replacement recovery was smooth and painless.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

const HEALTH_ARTICLES = [
  {
    id: 1,
    title: "10 Early Warning Signs of Heart Disease You Shouldn't Ignore",
    category: "Cardiology",
    readTime: "5 min read",
    author: "Dr. Rajesh Sharma",
    date: "18 Aug 2026",
    summary: "Recognize subtle symptoms of coronary artery disease, high blood pressure, and arrhythmias before they turn critical.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "The Ultimate Dermatologist Guide to Managing Acne & Eczema",
    category: "Dermatology",
    readTime: "4 min read",
    author: "Dr. Priya Deshmukh",
    date: "14 Aug 2026",
    summary: "Evidence-based clinical skincare routines for sensitive, acne-prone, and allergic Indian skin types.",
    image: "https://images.unsplash.com/photo-1512290900672-1f879d722bf4?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Pediatric Immunization: Complete National Vaccination Schedule",
    category: "Pediatrics",
    readTime: "6 min read",
    author: "Dr. Ananya Sen Gupta",
    date: "10 Aug 2026",
    summary: "A comprehensive guide for parents on recommended vaccines from newborn birth to 12 years of age in India.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  }
];

const FAQS = [
  {
    question: "How does online doctor consultation work on DocPulse?",
    answer: "Select your specialist, choose between In-Clinic visit or Video Teleconsultation, book a convenient time slot, verify with a one-time OTP, and receive your digital NMC-verified e-prescription right after the session."
  },
  {
    question: "Are the doctors verified with the National Medical Commission (NMC)?",
    answer: "Yes! Every medical practitioner on DocPulse undergoes strict multi-tier verification with the NMC and State Medical Councils before being authorized to consult patients."
  },
  {
    question: "How does the SmartCare AI Health Assistant work?",
    answer: "SmartCare AI analyses your natural-language symptoms, evaluates red-flag clinical risks, offers general health guidance, and matches you to verified specialists in your city."
  },
  {
    question: "Can I download and print my digital e-prescription?",
    answer: "Yes, all prescriptions are digitally signed and available in your Patient Health Portal with full NMC credentials for easy printing or download."
  }
];

const fileContent = `export const SPECIALTIES = ${JSON.stringify(SPECIALTIES, null, 2)};\n\nexport const DOCTORS = ${JSON.stringify(mappedDoctors, null, 2)};\n\nexport const TESTIMONIALS = ${JSON.stringify(TESTIMONIALS, null, 2)};\n\nexport const HEALTH_ARTICLES = ${JSON.stringify(HEALTH_ARTICLES, null, 2)};\n\nexport const FAQS = ${JSON.stringify(FAQS, null, 2)};\n`;

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`✅ Successfully updated ${targetFile} with ${mappedDoctors.length} doctors and all data exports!`);
