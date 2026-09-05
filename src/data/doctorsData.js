export const SPECIALTIES = [
  {
    "id": "cardiology",
    "name": "Cardiology",
    "icon": "HeartPulse",
    "description": "Heart specialists, ECG, angiography, bypass & hypertension care",
    "doctorCount": 45,
    "color": "from-rose-500/10 to-red-500/20 text-rose-600 border-rose-200 hover:border-rose-400"
  },
  {
    "id": "dermatology",
    "name": "Dermatology",
    "icon": "Sparkles",
    "description": "Skin allergy, acne, hair fall, pigmentation & cosmetic clinical care",
    "doctorCount": 52,
    "color": "from-amber-500/10 to-orange-500/20 text-amber-600 border-amber-200 hover:border-amber-400"
  },
  {
    "id": "general_medicine",
    "name": "General Physician",
    "icon": "Stethoscope",
    "description": "Viral fever, dengue, malaria, diabetes, thyroid & routine checkups",
    "doctorCount": 95,
    "color": "from-teal-500/10 to-emerald-500/20 text-teal-600 border-teal-200 hover:border-teal-400"
  },
  {
    "id": "pediatrics",
    "name": "Pediatrics & Child Care",
    "icon": "Baby",
    "description": "Newborn care, child vaccinations, growth milestones & nutrition",
    "doctorCount": 60,
    "color": "from-sky-500/10 to-blue-500/20 text-sky-600 border-sky-200 hover:border-sky-400"
  },
  {
    "id": "orthopedics",
    "name": "Orthopedics & Joint Care",
    "icon": "Activity",
    "description": "Knee pain, arthritis, fracture treatment, spine & joint replacement",
    "doctorCount": 40,
    "color": "from-emerald-500/10 to-teal-500/20 text-emerald-600 border-emerald-200 hover:border-emerald-400"
  },
  {
    "id": "neurology",
    "name": "Neurology",
    "icon": "Brain",
    "description": "Migraine, stroke, epilepsy, nerve disorders & brain care",
    "doctorCount": 32,
    "color": "from-purple-500/10 to-indigo-500/20 text-purple-600 border-purple-200 hover:border-purple-400"
  },
  {
    "id": "dentistry",
    "name": "Dental & Oral Surgery",
    "icon": "Smile",
    "description": "Root canal (RCT), dental implants, teeth alignment & smile design",
    "doctorCount": 48,
    "color": "from-cyan-500/10 to-blue-500/20 text-cyan-600 border-cyan-200 hover:border-cyan-400"
  },
  {
    "id": "ophthalmology",
    "name": "Eye Care & Lasik",
    "icon": "Eye",
    "description": "Cataract surgery, Lasik vision correction, glaucoma & retina care",
    "doctorCount": 30,
    "color": "from-indigo-500/10 to-violet-500/20 text-indigo-600 border-indigo-200 hover:border-indigo-400"
  },
  {
    "id": "psychiatry",
    "name": "Mental Wellness & Psychiatry",
    "icon": "SmilePlus",
    "description": "Stress therapy, clinical depression, anxiety & holistic counseling",
    "doctorCount": 36,
    "color": "from-pink-500/10 to-rose-500/20 text-pink-600 border-pink-200 hover:border-pink-400"
  }
];

export const DOCTORS = [
  {
    "id": "doc-1",
    "name": "Dr. Rajesh Sharma",
    "email": "dr.rajeshsharma@docpulse.in",
    "aliases": [
      "dr.rajesh@docpulse.in"
    ],
    "gender": "Male",
    "title": "MBBS, MD (Medicine), DM (Cardiology) - AIIMS New Delhi",
    "specialty": "cardiology",
    "specialtyName": "Cardiology",
    "experience": 16,
    "rating": 4.96,
    "reviewsCount": 420,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospital, Indraprastha, New Delhi",
    "location": "Delhi NCR",
    "city": "New Delhi",
    "distance": "2.4 km away",
    "nmcNumber": "NMC-DMC/78942",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Rajesh Sharma is a Senior Interventional Cardiologist with over 16 years of clinical excellence. Specialized in coronary angiography, angioplasty, pacemaker implantations, and complex hypertension management.",
    "education": [
      "MBBS - Maulana Azad Medical College (MAMC)",
      "MD (Medicine) - Lady Hardinge Medical College",
      "DM (Cardiology) - AIIMS New Delhi"
    ],
    "services": [
      "Coronary Angiography",
      "Angioplasty & Stenting",
      "ECG & 2D Echocardiography",
      "Hypertension Clinic"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-2",
    "name": "Dr. Ananya Mukherjee",
    "email": "dr.ananyamukherjee@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Pediatrics), FNB (Pediatric Cardiology)",
    "specialty": "cardiology",
    "specialtyName": "Cardiology",
    "experience": 12,
    "rating": 4.92,
    "reviewsCount": 280,
    "fee": 1200,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Escorts Heart Institute, Okhla",
    "location": "South Delhi",
    "city": "New Delhi",
    "distance": "4.1 km away",
    "nmcNumber": "NMC-DMC/81204",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "Maulana Azad Medical College",
    "about": "Dr. Ananya Mukherjee is a renowned Pediatric Cardiologist specializing in congenital heart disease diagnosis, pediatric echocardiography, and non-surgical device closures in children and neonates.",
    "education": [
      "MBBS - MAMC New Delhi",
      "MD (Pediatrics) - Safdarjung Hospital",
      "FNB Pediatric Cardiology - Fortis Escorts"
    ],
    "services": [
      "Pediatric 2D/3D Echo",
      "Congenital Heart Defect Screening",
      "Fetal Echocardiography"
    ],
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-3",
    "name": "Dr. Suresh Venkatesh",
    "email": "dr.sureshvenkatesh@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD, DM (Cardiology), Fellowship in Electrophysiology (USA)",
    "specialty": "cardiology",
    "specialtyName": "Cardiology",
    "experience": 20,
    "rating": 4.98,
    "reviewsCount": 510,
    "fee": 1400,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Narayana Institute of Cardiac Sciences, Bommasandra",
    "location": "Bengaluru",
    "city": "Bengaluru",
    "distance": "5.8 km away",
    "nmcNumber": "NMC-KMC/45910",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "Bangalore Medical College",
    "about": "Dr. Suresh Venkatesh is a leading Cardiac Electrophysiologist specializing in arrhythmia management, radiofrequency catheter ablation, ICD implantation, and cardiac resynchronization therapy (CRT).",
    "education": [
      "MBBS - Bangalore Medical College",
      "MD General Medicine - KMC Manipal",
      "DM Cardiology - Sri Jayadeva Institute"
    ],
    "services": [
      "Arrhythmia Treatment",
      "Catheter Ablation (3D Mapping)",
      "Pacemaker & ICD Implantation",
      "Holter Monitoring"
    ],
    "languages": [
      "English",
      "Hindi",
      "Kannada",
      "Tamil"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-4",
    "name": "Dr. Meenakshi Sundaram",
    "email": "dr.meenakshisundaram@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD, DNB (Cardiology) - Apollo Hospitals",
    "specialty": "cardiology",
    "specialtyName": "Cardiology",
    "experience": 14,
    "rating": 4.89,
    "reviewsCount": 310,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Main Hospital, Greams Road, Chennai",
    "location": "Central Chennai",
    "city": "Chennai",
    "distance": "3.2 km away",
    "nmcNumber": "NMC-TMC/59182",
    "medicalCouncil": "Tamil Nadu Medical Council",
    "medicalCollege": "Madras Medical College",
    "about": "Dr. Meenakshi Sundaram is a Senior Consultant in Preventive and Clinical Cardiology. Expertise in dyslipidemia, metabolic syndrome, post-CABG rehabilitation, and non-invasive cardiovascular assessment.",
    "education": [
      "MBBS - Stanley Medical College",
      "MD - Madras Medical College",
      "DNB Cardiology - National Board"
    ],
    "services": [
      "Preventive Heart Checkups",
      "TMT Stress Testing",
      "Lipid Management",
      "Post-Bypass Rehab"
    ],
    "languages": [
      "English",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-5",
    "name": "Dr. Rohan Kulkarni",
    "email": "dr.rohankulkarni@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD, DNB, Fellowship in Heart Failure (Cleveland Clinic)",
    "specialty": "cardiology",
    "specialtyName": "Cardiology",
    "experience": 15,
    "rating": 4.94,
    "reviewsCount": 380,
    "fee": 1300,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Asian Heart Institute, BKC, Mumbai",
    "location": "Bandra Kurla Complex",
    "city": "Mumbai",
    "distance": "2.9 km away",
    "nmcNumber": "NMC-MMC/64291",
    "medicalCouncil": "Maharashtra Medical Council",
    "medicalCollege": "Grant Medical College (JJ Hospital)",
    "about": "Dr. Rohan Kulkarni is a Heart Failure & Cardiac Rehabilitation Specialist. Highly experienced in advanced heart failure therapies, left ventricular assist devices (LVAD), and coronary artery care.",
    "education": [
      "MBBS - Grant Medical College",
      "MD Medicine - KEM Hospital",
      "DM Cardiology - Sion Hospital Mumbai"
    ],
    "services": [
      "Advanced Heart Failure Management",
      "LVAD Assessment",
      "Cardiac Rehab",
      "Angioplasty"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-6",
    "name": "Dr. Priya Deshmukh",
    "email": "dr.priyadeshmukh@docpulse.in",
    "aliases": [
      "dr.priya@docpulse.in"
    ],
    "gender": "Female",
    "title": "MBBS, MD (Dermatology, Venereology & Leprosy) - KEM Mumbai",
    "specialty": "dermatology",
    "specialtyName": "Dermatology",
    "experience": 11,
    "rating": 4.94,
    "reviewsCount": 380,
    "fee": 800,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Hospital, Mulund, Mumbai",
    "location": "Mumbai Central",
    "city": "Mumbai",
    "distance": "1.8 km away",
    "nmcNumber": "NMC-MMC/56231",
    "medicalCouncil": "Maharashtra Medical Council",
    "medicalCollege": "Seth GS Medical College & KEM Hospital",
    "about": "Dr. Priya Deshmukh is a Senior Dermatologist, Trichologist, and Cosmetic Dermatologist. Expert in adult acne, severe eczema, psoriasis biologics, chemical peels, and hair loss therapies.",
    "education": [
      "MBBS - Grant Medical College, Mumbai",
      "MD (DVL) - KEM Hospital Mumbai",
      "Fellowship in Aesthetic Dermatology (Germany)"
    ],
    "services": [
      "Acne & Scar Laser Treatment",
      "Psoriasis Biologics Therapy",
      "PRP Hair Loss Therapy",
      "Chemical Peels"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-7",
    "name": "Dr. Aditi Singhania",
    "email": "dr.aditisinghania@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (DVL) - AIIMS Delhi, Fellow in Laser Surgery",
    "specialty": "dermatology",
    "specialtyName": "Dermatology",
    "experience": 9,
    "rating": 4.91,
    "reviewsCount": 290,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Max Super Speciality Hospital, Saket, New Delhi",
    "location": "South Delhi",
    "city": "New Delhi",
    "distance": "3.5 km away",
    "nmcNumber": "NMC-DMC/90124",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Aditi Singhania is an expert in cosmetic dermatology, anti-aging solutions, laser scar revision, pigmentation disorders (melasma), and vitiligo phototherapy.",
    "education": [
      "MBBS - AIIMS New Delhi",
      "MD Dermatology - AIIMS New Delhi"
    ],
    "services": [
      "Laser Skin Resurfacing",
      "Melasma & Pigmentation Treatment",
      "Botox & Dermal Fillers",
      "Acne Clearance"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-8",
    "name": "Dr. Tarun Verma",
    "email": "dr.tarunverma@docpulse.in",
    "gender": "Male",
    "title": "MBBS, DVD, DNB (Dermatology) - Bangalore Medical College",
    "specialty": "dermatology",
    "specialtyName": "Dermatology",
    "experience": 14,
    "rating": 4.88,
    "reviewsCount": 340,
    "fee": 750,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals, Bannerghatta Road, Bengaluru",
    "location": "South Bengaluru",
    "city": "Bengaluru",
    "distance": "4.0 km away",
    "nmcNumber": "NMC-KMC/67192",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "Bangalore Medical College",
    "about": "Dr. Tarun Verma is a clinical dermatologist focused on chronic skin infections, urticaria allergies, atopic dermatitis, fungal skin conditions, and nail disorders.",
    "education": [
      "MBBS - Mysore Medical College",
      "DVD - Bangalore Medical College",
      "DNB Dermatology - National Board"
    ],
    "services": [
      "Allergy Skin Patch Testing",
      "Fungal Infection Clinic",
      "Eczema Management",
      "Nail Surgery"
    ],
    "languages": [
      "English",
      "Kannada",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-9",
    "name": "Dr. Shweta Nair",
    "email": "dr.shwetanair@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Dermatology), Fellow in Pediatric Dermatology",
    "specialty": "dermatology",
    "specialtyName": "Dermatology",
    "experience": 13,
    "rating": 4.93,
    "reviewsCount": 260,
    "fee": 850,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Aster Medcity, Cheranalloor, Kochi",
    "location": "Kochi",
    "city": "Kochi",
    "distance": "5.1 km away",
    "nmcNumber": "NMC-TCMC/41092",
    "medicalCouncil": "Travancore-Cochin Medical Council",
    "medicalCollege": "Government Medical College Trivandrum",
    "about": "Dr. Shweta Nair specializes in pediatric skin allergies, neonatal dermatoses, vitiligo excimer laser therapy, and genetic skin conditions.",
    "education": [
      "MBBS - GMC Kottayam",
      "MD Dermatology - GMC Trivandrum",
      "Fellowship in Pediatric Dermatology - CMC Vellore"
    ],
    "services": [
      "Pediatric Eczema Care",
      "Vitiligo Excimer Light",
      "Hair Fall Assessment",
      "Skin Biopsy"
    ],
    "languages": [
      "English",
      "Malayalam",
      "Hindi",
      "Tamil"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-10",
    "name": "Dr. Manish Aggarwal",
    "email": "dr.manishaggarwal@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (DVL), M.Ch (Plastic & Hair Restoration)",
    "specialty": "dermatology",
    "specialtyName": "Dermatology",
    "experience": 18,
    "rating": 4.97,
    "reviewsCount": 470,
    "fee": 1100,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Medanta The Medicity, Sector 38, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "3.8 km away",
    "nmcNumber": "NMC-HNMC/73819",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "PGIMS Rohtak",
    "about": "Dr. Manish Aggarwal is a Dermatosurgeon with extensive expertise in FUE hair transplant, mole/cyst excision, keloid management, and scar revision surgeries.",
    "education": [
      "MBBS - PGIMS Rohtak",
      "MD Dermatology - PGI Chandigarh",
      "Fellow of International Society of Hair Restoration Surgery"
    ],
    "services": [
      "FUE Hair Restoration",
      "Keloid & Scar Revision",
      "Mole Removal",
      "Laser Tattoo Removal"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-11",
    "name": "Dr. Arvind Swaminathan",
    "email": "dr.arvindswaminathan@docpulse.in",
    "aliases": [
      "dr.arvind@docpulse.in"
    ],
    "gender": "Male",
    "title": "MBBS, MD (General Medicine) - Madras Medical College",
    "specialty": "general_medicine",
    "specialtyName": "General Physician",
    "experience": 22,
    "rating": 4.98,
    "reviewsCount": 650,
    "fee": 700,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals, Greams Road, Chennai",
    "location": "Central Chennai",
    "city": "Chennai",
    "distance": "1.5 km away",
    "nmcNumber": "NMC-TMC/44890",
    "medicalCouncil": "Tamil Nadu Medical Council",
    "medicalCollege": "Madras Medical College",
    "about": "Dr. Arvind Swaminathan is a Senior Consultant Physician with over 22 years of clinical mastery. Expert in diagnosing complex fever, diabetes control, thyroid disorders, and preventive health checks.",
    "education": [
      "MBBS - Madras Medical College, Chennai",
      "MD (Internal Medicine) - Madras Medical College",
      "Fellow of Royal College of Physicians (FRCP, London)"
    ],
    "services": [
      "Chronic Disease Management",
      "Type 2 Diabetes Intensive Care",
      "Hypertension & Lipid Control",
      "Infectious Disease Triage"
    ],
    "languages": [
      "English",
      "Tamil",
      "Hindi",
      "Telugu"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-12",
    "name": "Dr. Alok Verma",
    "email": "dr.alokverma@docpulse.in",
    "aliases": [
      "dr.alok@docpulse.in"
    ],
    "gender": "Male",
    "title": "MBBS, MD (Internal Medicine) - AIIMS New Delhi",
    "specialty": "general_medicine",
    "specialtyName": "General Physician",
    "experience": 14,
    "rating": 4.9,
    "reviewsCount": 390,
    "fee": 800,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Max Healthcare, Patparganj, New Delhi",
    "location": "East Delhi",
    "city": "New Delhi",
    "distance": "2.8 km away",
    "nmcNumber": "NMC-DMC/99124",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Alok Verma is an experienced General Physician focused on acute viral fevers (Dengue, Typhoid, Malaria), respiratory infections, and adult immunizations.",
    "education": [
      "MBBS - Maulana Azad Medical College",
      "MD Medicine - AIIMS New Delhi"
    ],
    "services": [
      "Fever & Infectious Disease Care",
      "Diabetes & Obesity Clinic",
      "Thyroid Disorder Management",
      "Preventive Full Body Checkup"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-13",
    "name": "Dr. Neha Malhotra",
    "email": "dr.nehamalhotra@docpulse.in",
    "gender": "Female",
    "title": "MBBS, DNB (Internal Medicine) - Fortis Hospital",
    "specialty": "general_medicine",
    "specialtyName": "General Physician",
    "experience": 10,
    "rating": 4.88,
    "reviewsCount": 275,
    "fee": 650,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Memorial Research Institute, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "3.2 km away",
    "nmcNumber": "NMC-HNMC/55102",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "Lady Hardinge Medical College",
    "about": "Dr. Neha Malhotra provides comprehensive primary healthcare, metabolic health coaching, asthma / seasonal allergy management, and gastrointestinal care.",
    "education": [
      "MBBS - Lady Hardinge Medical College",
      "DNB Internal Medicine - Fortis Healthcare"
    ],
    "services": [
      "Seasonal Viral Illness Treatment",
      "Asthma & Allergy Management",
      "Fatty Liver & Gut Health",
      "Adult Vaccinations"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-14",
    "name": "Dr. Pradeep Joshi",
    "email": "dr.pradeepjoshi@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (General Medicine) - Manipal Academy",
    "specialty": "general_medicine",
    "specialtyName": "General Physician",
    "experience": 17,
    "rating": 4.93,
    "reviewsCount": 440,
    "fee": 750,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Manipal Hospital, Old Airport Road, Bengaluru",
    "location": "East Bengaluru",
    "city": "Bengaluru",
    "distance": "4.5 km away",
    "nmcNumber": "NMC-KMC/38901",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "KMC Manipal",
    "about": "Dr. Pradeep Joshi is a Consultant in General & Geriatric Medicine. Specialized in multidrug management for elderly patients, chronic hypertension, and post-viral recovery.",
    "education": [
      "MBBS - KMC Manipal",
      "MD Medicine - KMC Mangalore"
    ],
    "services": [
      "Geriatric Care Clinic",
      "Chronic Fatigue & Anemia Evaluation",
      "Post-COVID & Viral Recovery",
      "Diabetes Guidance"
    ],
    "languages": [
      "English",
      "Kannada",
      "Hindi",
      "Konkani"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-15",
    "name": "Dr. Sunita Banerjee",
    "email": "dr.sunitabanerjee@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Medicine) - Medical College Kolkata",
    "specialty": "general_medicine",
    "specialtyName": "General Physician",
    "experience": 19,
    "rating": 4.95,
    "reviewsCount": 520,
    "fee": 700,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "AMRI Hospitals, Salt Lake, Kolkata",
    "location": "Salt Lake",
    "city": "Kolkata",
    "distance": "2.1 km away",
    "nmcNumber": "NMC-WBMC/49210",
    "medicalCouncil": "West Bengal Medical Council",
    "medicalCollege": "Calcutta National Medical College",
    "about": "Dr. Sunita Banerjee is an esteemed physician focused on tropical medicine, seasonal vector-borne diseases, thyroid imbalance, and lifestyle metabolic health.",
    "education": [
      "MBBS - Medical College Kolkata",
      "MD Internal Medicine - CNMC Kolkata"
    ],
    "services": [
      "Tropical Fever Evaluation",
      "Thyroid & Hormone Care",
      "Hypertension Clinic",
      "Annual Health Check"
    ],
    "languages": [
      "English",
      "Bengali",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-16",
    "name": "Dr. Ananya Sen Gupta",
    "email": "dr.ananyasengupta@docpulse.in",
    "aliases": [
      "dr.ananya@docpulse.in"
    ],
    "gender": "Female",
    "title": "MBBS, MD (Pediatrics), Fellowship in Neonatology (IAP)",
    "specialty": "pediatrics",
    "specialtyName": "Pediatrics & Child Care",
    "experience": 13,
    "rating": 4.95,
    "reviewsCount": 460,
    "fee": 800,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Manipal Hospital, HAL Airport Road, Bengaluru",
    "location": "Bengaluru East",
    "city": "Bengaluru",
    "distance": "3.7 km away",
    "nmcNumber": "NMC-KMC/68102",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "St. John's Medical College, Bangalore",
    "about": "Dr. Ananya Sen Gupta is a Senior Consultant Pediatrician and Neonatologist. Dedicated to child developmental milestones, pediatric allergy triage, vaccinations, and infant growth nutrition.",
    "education": [
      "MBBS - St. John's Medical College, Bangalore",
      "MD (Pediatrics) - Christian Medical College (CMC), Vellore",
      "Fellowship in Neonatology - IAP"
    ],
    "services": [
      "Newborn Care & NICU Followup",
      "Childhood Immunization & Vaccine Schedule",
      "Pediatric Asthma & Allergy Care",
      "Growth & Nutrition Milestones"
    ],
    "languages": [
      "English",
      "Hindi",
      "Kannada",
      "Bengali"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-17",
    "name": "Dr. Rahul Bhargava",
    "email": "dr.rahulbhargava@docpulse.in",
    "gender": "Male",
    "title": "MBBS, DCH, DNB (Pediatrics) - Rainbow Children's Hospital",
    "specialty": "pediatrics",
    "specialtyName": "Pediatrics & Child Care",
    "experience": 11,
    "rating": 4.9,
    "reviewsCount": 310,
    "fee": 750,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Rainbow Children's Hospital, Banjara Hills, Hyderabad",
    "location": "Banjara Hills",
    "city": "Hyderabad",
    "distance": "2.3 km away",
    "nmcNumber": "NMC-TSMC/54120",
    "medicalCouncil": "Telangana State Medical Council",
    "medicalCollege": "Osmania Medical College",
    "about": "Dr. Rahul Bhargava specializes in pediatric infectious diseases, child asthma management, vaccination schedules, and acute pediatric emergency care.",
    "education": [
      "MBBS - Osmania Medical College",
      "DCH - Gandhi Medical College",
      "DNB Pediatrics - Rainbow Hospital"
    ],
    "services": [
      "Childhood Vaccinations",
      "Pediatric Cough & Asthma Care",
      "Fever in Toddlers",
      "Digestive Health in Infants"
    ],
    "languages": [
      "English",
      "Telugu",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-18",
    "name": "Dr. Divya Nambiar",
    "email": "dr.divyanambiar@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Pediatrics) - JIPMER Puducherry",
    "specialty": "pediatrics",
    "specialtyName": "Pediatrics & Child Care",
    "experience": 15,
    "rating": 4.96,
    "reviewsCount": 420,
    "fee": 850,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Children's Hospital, Thousand Lights, Chennai",
    "location": "Chennai Central",
    "city": "Chennai",
    "distance": "1.9 km away",
    "nmcNumber": "NMC-TMC/71940",
    "medicalCouncil": "Tamil Nadu Medical Council",
    "medicalCollege": "JIPMER Puducherry",
    "about": "Dr. Divya Nambiar is a Senior Pediatrician specializing in developmental delay assessment, autism spectrum screening, childhood obesity, and nutritional deficiency correction.",
    "education": [
      "MBBS - JIPMER Puducherry",
      "MD Pediatrics - JIPMER Puducherry"
    ],
    "services": [
      "Developmental Milestone Screening",
      "Infant Nutrition Counseling",
      "Childhood Allergy Management",
      "Routine Pediatric OPD"
    ],
    "languages": [
      "English",
      "Tamil",
      "Malayalam",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-19",
    "name": "Dr. Vivek Chopra",
    "email": "dr.vivekchopra@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (Pediatrics) - MAMC Delhi",
    "specialty": "pediatrics",
    "specialtyName": "Pediatrics & Child Care",
    "experience": 18,
    "rating": 4.94,
    "reviewsCount": 490,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis La Femme, Greater Kailash, New Delhi",
    "location": "South Delhi",
    "city": "New Delhi",
    "distance": "4.2 km away",
    "nmcNumber": "NMC-DMC/62890",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "Maulana Azad Medical College",
    "about": "Dr. Vivek Chopra has extensive experience in newborn resuscitation, pediatric critical care, adolescent behavior counseling, and respiratory syncytial virus treatment.",
    "education": [
      "MBBS - Maulana Azad Medical College",
      "MD Pediatrics - Chacha Nehru Bal Chikitsalaya"
    ],
    "services": [
      "Adolescent Health",
      "Pediatric Respiratory Care",
      "Newborn Checkup",
      "Vaccination Guidance"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-20",
    "name": "Dr. Pooja Khandelwal",
    "email": "dr.poojakhandelwal@docpulse.in",
    "gender": "Female",
    "title": "MBBS, DNB (Pediatrics) - Surya Hospital Mumbai",
    "specialty": "pediatrics",
    "specialtyName": "Pediatrics & Child Care",
    "experience": 9,
    "rating": 4.89,
    "reviewsCount": 230,
    "fee": 700,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Surya Mother & Child Care Hospital, Santacruz, Mumbai",
    "location": "Santacruz West",
    "city": "Mumbai",
    "distance": "3.1 km away",
    "nmcNumber": "NMC-MMC/88210",
    "medicalCouncil": "Maharashtra Medical Council",
    "medicalCollege": "Topiwala National Medical College (Nair Hospital)",
    "about": "Dr. Pooja Khandelwal provides compassionate care for infants and toddlers with acute gastroenteritis, colic, childhood eczema, and growth faltering.",
    "education": [
      "MBBS - TN Medical College, Mumbai",
      "DNB Pediatrics - Surya Child Care"
    ],
    "services": [
      "Infant Colic & Reflux Care",
      "Immunizations",
      "Pediatric Flu Management",
      "Nutrition for Picky Eaters"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi",
      "Gujarati"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-21",
    "name": "Dr. Vikramaditya Reddy",
    "email": "dr.vikramadityareddy@docpulse.in",
    "aliases": [
      "dr.vikram@docpulse.in"
    ],
    "gender": "Male",
    "title": "MBBS, MS (Orthopedics), M.Ch (Orthopedics) - UK",
    "specialty": "orthopedics",
    "specialtyName": "Orthopedics & Joint Care",
    "experience": 18,
    "rating": 4.97,
    "reviewsCount": 510,
    "fee": 1100,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Yashoda Super Speciality Hospital, Somajiguda, Hyderabad",
    "location": "Somajiguda",
    "city": "Hyderabad",
    "distance": "3.1 km away",
    "nmcNumber": "NMC-TSMC/31902",
    "medicalCouncil": "Telangana State Medical Council",
    "medicalCollege": "Osmania Medical College, Hyderabad",
    "about": "Dr. Vikramaditya Reddy is an acclaimed Joint Replacement & Robotic Arthroscopy Surgeon. Performed over 4,500 total knee & hip replacements, ACL reconstructions, and complex fracture fixes.",
    "education": [
      "MBBS - Osmania Medical College, Hyderabad",
      "MS (Orthopedics) - NIMS Hyderabad",
      "M.Ch (Orthopedics) - University of Dundee, UK"
    ],
    "services": [
      "Robotic Total Knee Replacement (TKR)",
      "Total Hip Replacement (THR)",
      "Arthroscopic ACL & Meniscus Surgery",
      "Spine & Sciatica Therapy"
    ],
    "languages": [
      "English",
      "Telugu",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-22",
    "name": "Dr. Sanjeev Kaushik",
    "email": "dr.sanjeevkaushik@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MS (Orthopedics), Fellowship in Spine Surgery (Germany)",
    "specialty": "orthopedics",
    "specialtyName": "Orthopedics & Joint Care",
    "experience": 16,
    "rating": 4.92,
    "reviewsCount": 390,
    "fee": 1200,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Artemis Hospital, Sector 51, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "4.8 km away",
    "nmcNumber": "NMC-HNMC/48912",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "PGIMS Rohtak",
    "about": "Dr. Sanjeev Kaushik specializes in minimally invasive spine surgery, slip disc decompression, cervical spondylosis, scoliosis correction, and complex bone trauma.",
    "education": [
      "MBBS - PGIMS Rohtak",
      "MS Orthopedics - Safdarjung Hospital Delhi",
      "Fellowship in Spine Surgery - Munich, Germany"
    ],
    "services": [
      "Minimally Invasive Spine Surgery",
      "Slip Disc & Sciatica Decompression",
      "Cervical Spondylosis Care",
      "Fracture Plating"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-23",
    "name": "Dr. Harish Menon",
    "email": "dr.harishmenon@docpulse.in",
    "gender": "Male",
    "title": "MBBS, D.Ortho, DNB (Orthopedics), Fellow in Joint Replacement",
    "specialty": "orthopedics",
    "specialtyName": "Orthopedics & Joint Care",
    "experience": 14,
    "rating": 4.91,
    "reviewsCount": 340,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Kokilaben Dhirubhai Ambani Hospital, Andheri, Mumbai",
    "location": "Andheri West",
    "city": "Mumbai",
    "distance": "2.7 km away",
    "nmcNumber": "NMC-MMC/61902",
    "medicalCouncil": "Maharashtra Medical Council",
    "medicalCollege": "Lokmanya Tilak Municipal Medical College (Sion)",
    "about": "Dr. Harish Menon is an expert in computer-navigated knee and shoulder joint replacements, rotator cuff arthroscopy, and arthritis management in athletes.",
    "education": [
      "MBBS - LTMMC Sion Mumbai",
      "D.Ortho - KEM Hospital",
      "DNB Orthopedics - National Board"
    ],
    "services": [
      "Navigated Knee Replacement",
      "Shoulder Arthroscopy & Rotator Cuff",
      "Osteoarthritis Injections",
      "Sports Injury Clinic"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi",
      "Malayalam"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-24",
    "name": "Dr. Preeti Chawla",
    "email": "dr.preetichawla@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MS (Orthopedics) - AIIMS Delhi, Sports Medicine Specialist",
    "specialty": "orthopedics",
    "specialtyName": "Orthopedics & Joint Care",
    "experience": 12,
    "rating": 4.95,
    "reviewsCount": 310,
    "fee": 950,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Max Smart Super Speciality Hospital, Saket, New Delhi",
    "location": "South Delhi",
    "city": "New Delhi",
    "distance": "3.0 km away",
    "nmcNumber": "NMC-DMC/77102",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Preeti Chawla is a pioneering female orthopedic surgeon specializing in sports injuries, ligament tears (ACL/PCL), ankle sprains, and osteoporosis bone density therapy.",
    "education": [
      "MBBS - AIIMS New Delhi",
      "MS Orthopedics - AIIMS New Delhi",
      "Diploma in Sports Medicine - IOC"
    ],
    "services": [
      "ACL / PCL Ligament Reconstruction",
      "Ankle & Foot Arthroscopy",
      "Osteoporosis Care",
      "Platelet-Rich Plasma (PRP) for Joints"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-25",
    "name": "Dr. Ajay Raghavan",
    "email": "dr.ajayraghavan@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MS (Orthopedics), Fellowship in Pediatric Orthopedics",
    "specialty": "orthopedics",
    "specialtyName": "Orthopedics & Joint Care",
    "experience": 15,
    "rating": 4.89,
    "reviewsCount": 280,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Manipal Hospital, Whitefield, Bengaluru",
    "location": "Whitefield",
    "city": "Bengaluru",
    "distance": "6.2 km away",
    "nmcNumber": "NMC-KMC/51290",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "St. John's Medical College",
    "about": "Dr. Ajay Raghavan focuses on pediatric orthopedics, clubfoot correction, bone deformities, limb lengthening, and adolescent sports injuries.",
    "education": [
      "MBBS - St. John's Medical College",
      "MS Orthopedics - CMC Vellore"
    ],
    "services": [
      "Clubfoot (Ponseti Technique)",
      "Pediatric Bone Fractures",
      "Limb Deformity Correction",
      "Flat Foot & Gait Assessment"
    ],
    "languages": [
      "English",
      "Kannada",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-26",
    "name": "Dr. Kedar Natarajan",
    "email": "dr.kedarnatarajan@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (Medicine), DM (Neurology) - NIMHANS",
    "specialty": "neurology",
    "specialtyName": "Neurology",
    "experience": 19,
    "rating": 4.98,
    "reviewsCount": 470,
    "fee": 1200,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals, Sheshadripuram, Bengaluru",
    "location": "Central Bengaluru",
    "city": "Bengaluru",
    "distance": "2.2 km away",
    "nmcNumber": "NMC-KMC/42109",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "NIMHANS Bengaluru",
    "about": "Dr. Kedar Natarajan is a Senior Neurologist trained at NIMHANS. Specialized in acute stroke thrombolysis, refractory epilepsy, migraine prophylaxis, and peripheral neuropathies.",
    "education": [
      "MBBS - Bangalore Medical College",
      "MD Medicine - Mysore Medical College",
      "DM Neurology - NIMHANS Bengaluru"
    ],
    "services": [
      "Stroke Care & Thrombolysis",
      "Epilepsy Clinic & Video EEG",
      "Migraine & Chronic Headache Care",
      "Nerve Conduction Studies (NCS/EMG)"
    ],
    "languages": [
      "English",
      "Kannada",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-27",
    "name": "Dr. Smriti Saxena",
    "email": "dr.smritisaxena@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD, DM (Neurology) - AIIMS New Delhi",
    "specialty": "neurology",
    "specialtyName": "Neurology",
    "experience": 14,
    "rating": 4.94,
    "reviewsCount": 350,
    "fee": 1100,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Medanta The Medicity, Sector 38, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "3.9 km away",
    "nmcNumber": "NMC-HNMC/66201",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Smriti Saxena is a Movement Disorder Specialist with expertise in Parkinson's disease, Deep Brain Stimulation (DBS) programming, tremors, and dystonia Botox therapy.",
    "education": [
      "MBBS - Lady Hardinge Medical College",
      "MD - MAMC Delhi",
      "DM Neurology - AIIMS New Delhi"
    ],
    "services": [
      "Parkinson's Disease Management",
      "DBS Programming",
      "Botox for Dystonia & Spasticity",
      "Tremor Analysis"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-28",
    "name": "Dr. Amitava Roy",
    "email": "dr.amitavaroy@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD, DM (Neurology) - IPGMER Kolkata",
    "specialty": "neurology",
    "specialtyName": "Neurology",
    "experience": 16,
    "rating": 4.91,
    "reviewsCount": 320,
    "fee": 950,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Gleneagles Hospital, Canal Circular Road, Kolkata",
    "location": "Kolkata",
    "city": "Kolkata",
    "distance": "3.4 km away",
    "nmcNumber": "NMC-WBMC/58209",
    "medicalCouncil": "West Bengal Medical Council",
    "medicalCollege": "IPGMER & SSKM Hospital Kolkata",
    "about": "Dr. Amitava Roy focuses on neuromuscular diseases, Myasthenia Gravis, multiple sclerosis immunotherapies, and dizziness / vertigo evaluation.",
    "education": [
      "MBBS - Medical College Kolkata",
      "MD Medicine - IPGMER",
      "DM Neurology - Bangur Institute of Neurosciences"
    ],
    "services": [
      "Multiple Sclerosis Care",
      "Myasthenia Gravis Management",
      "Vertigo & Balance Clinic",
      "EEG & Evoked Potentials"
    ],
    "languages": [
      "English",
      "Bengali",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-29",
    "name": "Dr. Deepa Chandran",
    "email": "dr.deepachandran@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD, DM (Neurology), Fellow in Cognitive Neurology",
    "specialty": "neurology",
    "specialtyName": "Neurology",
    "experience": 11,
    "rating": 4.88,
    "reviewsCount": 240,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Aster CMI Hospital, Hebbal, Bengaluru",
    "location": "North Bengaluru",
    "city": "Bengaluru",
    "distance": "5.0 km away",
    "nmcNumber": "NMC-KMC/77812",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "Government Medical College Calicut",
    "about": "Dr. Deepa Chandran specializes in memory loss, Alzheimer's disease, vascular dementia, frontotemporal dementia, and sleep-related neurological disorders.",
    "education": [
      "MBBS - GMC Calicut",
      "MD Medicine - GMC Trivandrum",
      "DM Neurology - Sree Chitra Tirunal Institute"
    ],
    "services": [
      "Memory & Cognitive Assessment",
      "Alzheimer's Disease Clinic",
      "Sleep Apnea & Insomnia Neuropathy",
      "Brain MRI Evaluation"
    ],
    "languages": [
      "English",
      "Malayalam",
      "Kannada",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-30",
    "name": "Dr. Nikhil Bansal",
    "email": "dr.nikhilbansal@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD, DM (Neurology) - PGIMER Chandigarh",
    "specialty": "neurology",
    "specialtyName": "Neurology",
    "experience": 13,
    "rating": 4.93,
    "reviewsCount": 290,
    "fee": 1050,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Memorial Research Institute, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "3.6 km away",
    "nmcNumber": "NMC-HNMC/61984",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "PGIMER Chandigarh",
    "about": "Dr. Nikhil Bansal has special interest in nerve compression syndromes (Carpal Tunnel), diabetic neuropathy, spine-related nerve pinch, and neuromuscular pain.",
    "education": [
      "MBBS - GMC Patiala",
      "MD Medicine - PGIMER Chandigarh",
      "DM Neurology - PGIMER Chandigarh"
    ],
    "services": [
      "Neuropathic Pain Relief",
      "Carpal Tunnel Release Assessment",
      "Diabetic Foot Neuropathy",
      "EMG & NCS Tests"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-31",
    "name": "Dr. Sumit Kumar",
    "email": "dr.sumitkumar@docpulse.in",
    "aliases": [
      "dr.sumit@docpulse.in"
    ],
    "gender": "Male",
    "title": "BDS, MDS (Oral & Maxillofacial Surgery) - Apollo Dental Institute",
    "specialty": "dentistry",
    "specialtyName": "Dentistry & Oral Care",
    "experience": 12,
    "rating": 4.95,
    "reviewsCount": 380,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals & Dental Institute, Mathura Road, New Delhi",
    "location": "Delhi NCR",
    "city": "New Delhi",
    "distance": "2.1 km away",
    "nmcNumber": "NMC-DMC/78921",
    "medicalCouncil": "Delhi Dental Council / NMC",
    "medicalCollege": "Maulana Azad Institute of Dental Sciences (MAIDS), Delhi",
    "about": "Dr. Sumit Kumar is an Oral & Maxillofacial Surgeon specializing in wisdom tooth extraction, dental implants, root canal therapy (RCT), facial trauma surgery, and smile design makeover.",
    "education": [
      "BDS - Maulana Azad Institute of Dental Sciences (MAIDS), Delhi",
      "MDS (Oral & Maxillofacial Surgery) - King George's Medical University (KGMU), Lucknow"
    ],
    "services": [
      "Painless Wisdom Tooth Extraction",
      "Dental Implants (Titanium & Zirconia)",
      "Rotary Single-Sitting Root Canal (RCT)",
      "Cosmetic Smile Makeover & Veneers"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-32",
    "name": "Dr. Radhika Iyer",
    "email": "dr.radhikaiyer@docpulse.in",
    "gender": "Female",
    "title": "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
    "specialty": "dentistry",
    "specialtyName": "Dentistry & Oral Care",
    "experience": 10,
    "rating": 4.92,
    "reviewsCount": 310,
    "fee": 800,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Clove Dental, Indiranagar, Bengaluru",
    "location": "Indiranagar",
    "city": "Bengaluru",
    "distance": "1.8 km away",
    "nmcNumber": "NMC-KDC/49102",
    "medicalCouncil": "Karnataka State Dental Council",
    "medicalCollege": "Government Dental College Bangalore",
    "about": "Dr. Radhika Iyer is an Orthodontist certified in Invisalign and clear aligners. Specialized in treating crooked teeth, bite correction, and aesthetic smile realignment in teens and adults.",
    "education": [
      "BDS - Government Dental College Bangalore",
      "MDS Orthodontics - Manipal College of Dental Sciences"
    ],
    "services": [
      "Invisalign Clear Aligners",
      "Ceramic & Metal Braces",
      "Bite & Jaw Correction",
      "Retainers & Space Maintainers"
    ],
    "languages": [
      "English",
      "Kannada",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-33",
    "name": "Dr. Sandeep Oberoi",
    "email": "dr.sandeepoberoi@docpulse.in",
    "gender": "Male",
    "title": "BDS, MDS (Conservative Dentistry & Endodontics)",
    "specialty": "dentistry",
    "specialtyName": "Dentistry & Oral Care",
    "experience": 15,
    "rating": 4.96,
    "reviewsCount": 440,
    "fee": 850,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Max Dental Care, Bandra West, Mumbai",
    "location": "Bandra West",
    "city": "Mumbai",
    "distance": "2.4 km away",
    "nmcNumber": "NMC-MDC/38910",
    "medicalCouncil": "Maharashtra State Dental Council",
    "medicalCollege": "Nair Hospital Dental College",
    "about": "Dr. Sandeep Oberoi is an Endodontist specializing in microscopic single-sitting root canal treatment, broken instrument retrieval, tooth-colored composite restorations, and crown & bridge work.",
    "education": [
      "BDS - Nair Hospital Dental College",
      "MDS Endodontics - SDM Dental College Dharwad"
    ],
    "services": [
      "Microscopic Root Canal (RCT)",
      "Zirconia & Ceramic Crowns",
      "Composite Tooth Fillings",
      "Teeth Bleaching & Whitening"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-34",
    "name": "Dr. Tanvi Gupta",
    "email": "dr.tanvigupta@docpulse.in",
    "gender": "Female",
    "title": "BDS, MDS (Prosthodontics & Implantology)",
    "specialty": "dentistry",
    "specialtyName": "Dentistry & Oral Care",
    "experience": 11,
    "rating": 4.89,
    "reviewsCount": 260,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Dental Clinic, Vasant Kunj, New Delhi",
    "location": "South West Delhi",
    "city": "New Delhi",
    "distance": "3.8 km away",
    "nmcNumber": "NMC-DDC/82910",
    "medicalCouncil": "Delhi State Dental Council",
    "medicalCollege": "PGIDS Rohtak",
    "about": "Dr. Tanvi Gupta is a Prosthodontist with expertise in full mouth rehabilitation, flexible dentures, implant-supported fixed dentures, and TMJ jaw pain management.",
    "education": [
      "BDS - PGIDS Rohtak",
      "MDS Prosthodontics - MAIDS Delhi"
    ],
    "services": [
      "Full Mouth Reconstruction",
      "Implant Supported Overdentures",
      "TMJ Pain Splints",
      "Dental Bridges"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-35",
    "name": "Dr. Gaurav Chatterjee",
    "email": "dr.gauravchatterjee@docpulse.in",
    "gender": "Male",
    "title": "BDS, MDS (Periodontics & Implantology)",
    "specialty": "dentistry",
    "specialtyName": "Dentistry & Oral Care",
    "experience": 14,
    "rating": 4.93,
    "reviewsCount": 350,
    "fee": 750,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Woodlands Multispeciality Hospital, Alipore, Kolkata",
    "location": "Alipore",
    "city": "Kolkata",
    "distance": "2.9 km away",
    "nmcNumber": "NMC-WBDC/56102",
    "medicalCouncil": "West Bengal Dental Council",
    "medicalCollege": "Dr. R. Ahmed Dental College and Hospital",
    "about": "Dr. Gaurav Chatterjee specializes in bleeding gums, pyorrhea treatment, laser gum depigmentation, bone grafting, and dental implant placement.",
    "education": [
      "BDS - Dr. R. Ahmed Dental College Kolkata",
      "MDS Periodontics - Manipal University"
    ],
    "services": [
      "Deep Ultrasonic Scaling & Polishing",
      "Flap Surgery & Bone Grafting",
      "Laser Gum Treatment",
      "Dental Implants"
    ],
    "languages": [
      "English",
      "Bengali",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-36",
    "name": "Dr. Arvind Netralaya",
    "email": "dr.arvindnetralaya@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MS (Ophthalmology), Fellow in Cornea & Refractive (Lasik)",
    "specialty": "ophthalmology",
    "specialtyName": "Eye Care & Lasik",
    "experience": 17,
    "rating": 4.97,
    "reviewsCount": 520,
    "fee": 900,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Dr. Shroff's Charity Eye Hospital, Daryaganj, New Delhi",
    "location": "Central Delhi",
    "city": "New Delhi",
    "distance": "2.0 km away",
    "nmcNumber": "NMC-DMC/49102",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "Guru Nanak Eye Centre (MAMC)",
    "about": "Dr. Arvind Netralaya is a Senior Eye Surgeon specializing in Blade-free Femto Lasik, SMILE vision correction, micro-incision cataract surgery (MICS), and corneal transplants.",
    "education": [
      "MBBS - MAMC Delhi",
      "MS Ophthalmology - Guru Nanak Eye Centre",
      "Fellowship in Cornea - LV Prasad Eye Institute"
    ],
    "services": [
      "Blade-free Contoura Lasik",
      "Robotic Cataract Surgery (MICS)",
      "Corneal Ulcer & Keratoconus Care",
      "Dry Eye Treatment"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-37",
    "name": "Dr. Shalini Krishnan",
    "email": "dr.shalinikrishnan@docpulse.in",
    "gender": "Female",
    "title": "MBBS, DO, DNB (Ophthalmology) - Sankara Nethralaya",
    "specialty": "ophthalmology",
    "specialtyName": "Eye Care & Lasik",
    "experience": 15,
    "rating": 4.94,
    "reviewsCount": 410,
    "fee": 850,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Sankara Nethralaya, College Road, Nungambakkam, Chennai",
    "location": "Nungambakkam",
    "city": "Chennai",
    "distance": "2.6 km away",
    "nmcNumber": "NMC-TMC/63891",
    "medicalCouncil": "Tamil Nadu Medical Council",
    "medicalCollege": "Madras Medical College",
    "about": "Dr. Shalini Krishnan is a Glaucoma Specialist with expertise in early glaucoma detection (OCT/Visual Fields), trabeculectomy, and selective laser trabeculoplasty (SLT).",
    "education": [
      "MBBS - Stanley Medical College",
      "DO - Regional Institute of Ophthalmology",
      "DNB - Sankara Nethralaya"
    ],
    "services": [
      "Glaucoma Laser (SLT)",
      "OCT Nerve Fiber Analysis",
      "Automated Visual Field Testing",
      "Cataract Phaco Surgery"
    ],
    "languages": [
      "English",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-38",
    "name": "Dr. Manish Poddar",
    "email": "dr.manishpoddar@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MS (Ophthalmology), Fellowship in Vitreo-Retina (Narayana Nethralaya)",
    "specialty": "ophthalmology",
    "specialtyName": "Eye Care & Lasik",
    "experience": 13,
    "rating": 4.91,
    "reviewsCount": 330,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Narayana Nethralaya, Rajajinagar, Bengaluru",
    "location": "West Bengaluru",
    "city": "Bengaluru",
    "distance": "3.5 km away",
    "nmcNumber": "NMC-KMC/58291",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "Bangalore Medical College",
    "about": "Dr. Manish Poddar is a Vitreoretinal Surgeon specializing in diabetic retinopathy, retinal detachment surgery, age-related macular degeneration (ARMD), and intravitreal injections.",
    "education": [
      "MBBS - BMCRI Bangalore",
      "MS Ophthalmology - Minto Ophthalmic Hospital",
      "Fellowship in Retina - Narayana Nethralaya"
    ],
    "services": [
      "Diabetic Retinopathy Laser",
      "Retinal Detachment Surgery",
      "Anti-VEGF Eye Injections",
      "Floaters & Flashers Care"
    ],
    "languages": [
      "English",
      "Kannada",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-39",
    "name": "Dr. Ritika Varma",
    "email": "dr.ritikavarma@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MS (Ophthalmology) - AIIMS, Pediatric Squint Specialist",
    "specialty": "ophthalmology",
    "specialtyName": "Eye Care & Lasik",
    "experience": 11,
    "rating": 4.9,
    "reviewsCount": 270,
    "fee": 800,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "EyeQ Super Speciality Eye Hospital, Sector 27, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "4.1 km away",
    "nmcNumber": "NMC-HNMC/77190",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Ritika Varma specializes in pediatric eye care, lazy eye (amblyopia) vision therapy, squint correction surgery, and pediatric glasses prescription.",
    "education": [
      "MBBS - Lady Hardinge Medical College",
      "MS Ophthalmology - Dr. RPC AIIMS New Delhi"
    ],
    "services": [
      "Squint & Strabismus Surgery",
      "Lazy Eye (Amblyopia) Therapy",
      "Pediatric Vision Screening",
      "Computer Vision Syndrome Care"
    ],
    "languages": [
      "English",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-40",
    "name": "Dr. Deepak Mathur",
    "email": "dr.deepakmathur@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MS (Ophthalmology), Fellow in Oculoplasty & Orbit",
    "specialty": "ophthalmology",
    "specialtyName": "Eye Care & Lasik",
    "experience": 16,
    "rating": 4.95,
    "reviewsCount": 380,
    "fee": 950,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals, Sarita Vihar, New Delhi",
    "location": "South East Delhi",
    "city": "New Delhi",
    "distance": "3.2 km away",
    "nmcNumber": "NMC-DMC/52910",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "Maulana Azad Medical College",
    "about": "Dr. Deepak Mathur is an Oculoplastic Surgeon with expertise in drooping eyelid surgery (Ptosis), tear duct blockage (DCR), thyroid eye disease, and prosthetic eye implants.",
    "education": [
      "MBBS - MAMC New Delhi",
      "MS - Guru Nanak Eye Centre",
      "Fellowship in Oculoplasty - LVPEI"
    ],
    "services": [
      "Ptosis Eyelid Correction",
      "Tear Duct Surgery (Endoscopic DCR)",
      "Thyroid Eye Decompression",
      "Cosmetic Blepharoplasty"
    ],
    "languages": [
      "English",
      "Hindi",
      "Punjabi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-41",
    "name": "Dr. Vikram Prabhu",
    "email": "dr.vikramprabhu@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (Psychiatry) - NIMHANS Bengaluru",
    "specialty": "psychiatry",
    "specialtyName": "Mental Wellness & Psychiatry",
    "experience": 18,
    "rating": 4.98,
    "reviewsCount": 490,
    "fee": 1200,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600",
    "hospital": "Manipal Hospital, Old Airport Road, Bengaluru",
    "location": "Central Bengaluru",
    "city": "Bengaluru",
    "distance": "3.0 km away",
    "nmcNumber": "NMC-KMC/39102",
    "medicalCouncil": "Karnataka Medical Council",
    "medicalCollege": "NIMHANS Bengaluru",
    "about": "Dr. Vikram Prabhu is a Senior Consultant Psychiatrist from NIMHANS. Specialized in clinical depression, generalized anxiety disorder, bipolar affective disorder, sleep medicine, and addiction de-addiction therapy.",
    "education": [
      "MBBS - Mysore Medical College",
      "MD Psychiatry - NIMHANS Bengaluru"
    ],
    "services": [
      "Depression & Anxiety Therapy",
      "Bipolar Disorder Care",
      "Substance De-addiction Guidance",
      "Insomnia & Sleep Therapy"
    ],
    "languages": [
      "English",
      "Kannada",
      "Hindi",
      "Telugu"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-42",
    "name": "Dr. Ananya Roychowdhury",
    "email": "dr.ananyaroychowdhury@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Psychiatry) - AIIMS Delhi, Certified CBT Therapist",
    "specialty": "psychiatry",
    "specialtyName": "Mental Wellness & Psychiatry",
    "experience": 13,
    "rating": 4.94,
    "reviewsCount": 360,
    "fee": 1100,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1594824813580-c08170c0c67e?auto=format&fit=crop&q=80&w=600",
    "hospital": "Fortis Escorts, Okhla Road, New Delhi",
    "location": "South Delhi",
    "city": "New Delhi",
    "distance": "2.8 km away",
    "nmcNumber": "NMC-DMC/71902",
    "medicalCouncil": "Delhi Medical Council",
    "medicalCollege": "AIIMS New Delhi",
    "about": "Dr. Ananya Roychowdhury specializes in adult stress disorders, panic attacks, obsessive-compulsive disorder (OCD), cognitive behavioral therapy (CBT), and postpartum depression.",
    "education": [
      "MBBS - Lady Hardinge Medical College",
      "MD Psychiatry - AIIMS New Delhi"
    ],
    "services": [
      "Cognitive Behavioral Therapy (CBT)",
      "Panic Attack & Phobia Treatment",
      "OCD Medication & ERP Guidance",
      "Postpartum Mental Health"
    ],
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-43",
    "name": "Dr. Siddharth Sen",
    "email": "dr.siddharthsen@docpulse.in",
    "gender": "Male",
    "title": "MBBS, DPM, DNB (Psychiatry) - KEM Hospital Mumbai",
    "specialty": "psychiatry",
    "specialtyName": "Mental Wellness & Psychiatry",
    "experience": 15,
    "rating": 4.92,
    "reviewsCount": 380,
    "fee": 1000,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Kokilaben Dhirubhai Ambani Hospital, Andheri, Mumbai",
    "location": "Andheri West",
    "city": "Mumbai",
    "distance": "2.5 km away",
    "nmcNumber": "NMC-MMC/59102",
    "medicalCouncil": "Maharashtra Medical Council",
    "medicalCollege": "Seth GS Medical College & KEM Hospital",
    "about": "Dr. Siddharth Sen focuses on adolescent mental health, exam anxiety, corporate burnout, anger management, and adult relationship counseling.",
    "education": [
      "MBBS - Grant Medical College",
      "DPM - KEM Hospital Mumbai",
      "DNB Psychiatry - National Board"
    ],
    "services": [
      "Corporate Burnout & Stress Therapy",
      "Adolescent Mental Health",
      "Anger Management",
      "Mindfulness-Based Counseling"
    ],
    "languages": [
      "English",
      "Hindi",
      "Marathi",
      "Bengali"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-44",
    "name": "Dr. Nandita Raman",
    "email": "dr.nanditaraman@docpulse.in",
    "gender": "Female",
    "title": "MBBS, MD (Psychiatry) - Madras Medical College, Adult ADHD Expert",
    "specialty": "psychiatry",
    "specialtyName": "Mental Wellness & Psychiatry",
    "experience": 12,
    "rating": 4.9,
    "reviewsCount": 290,
    "fee": 950,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    "hospital": "Apollo Hospitals, Greams Road, Chennai",
    "location": "Chennai Central",
    "city": "Chennai",
    "distance": "2.1 km away",
    "nmcNumber": "NMC-TMC/78291",
    "medicalCouncil": "Tamil Nadu Medical Council",
    "medicalCollege": "Madras Medical College",
    "about": "Dr. Nandita Raman is an expert in adult ADHD diagnosis, mood swings, chronic fatigue syndrome, social anxiety, and women's mental health across lifecycle.",
    "education": [
      "MBBS - Stanley Medical College",
      "MD Psychiatry - Madras Medical College"
    ],
    "services": [
      "Adult ADHD Evaluation",
      "Social Anxiety Therapy",
      "Mood Disorder Stabilization",
      "Women's Wellness Counseling"
    ],
    "languages": [
      "English",
      "Tamil",
      "Hindi"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  },
  {
    "id": "doc-45",
    "name": "Dr. Kabir Sengupta",
    "email": "dr.kabirsengupta@docpulse.in",
    "gender": "Male",
    "title": "MBBS, MD (Psychiatry) - PGI Chandigarh, Geriatric Psychiatrist",
    "specialty": "psychiatry",
    "specialtyName": "Mental Wellness & Psychiatry",
    "experience": 16,
    "rating": 4.96,
    "reviewsCount": 430,
    "fee": 1100,
    "currency": "₹",
    "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
    "hospital": "Medanta The Medicity, Sector 38, Gurugram",
    "location": "Gurugram",
    "city": "Gurugram",
    "distance": "4.0 km away",
    "nmcNumber": "NMC-HNMC/83912",
    "medicalCouncil": "Haryana Medical Council",
    "medicalCollege": "PGIMER Chandigarh",
    "about": "Dr. Kabir Sengupta specializes in geriatric psychiatry, memory disorders, behavioral problems in dementia, late-life depression, and neuro-psychiatric conditions.",
    "education": [
      "MBBS - Medical College Kolkata",
      "MD Psychiatry - PGIMER Chandigarh"
    ],
    "services": [
      "Geriatric Psychiatry Care",
      "Dementia Behavioral Management",
      "Late-Life Depression Care",
      "Caregiver Support Counseling"
    ],
    "languages": [
      "English",
      "Hindi",
      "Bengali"
    ],
    "isVerified": true,
    "applicationStatus": "Approved"
  }
];

export const TESTIMONIALS = [
  {
    "id": 1,
    "name": "Sunita Agarwal",
    "city": "New Delhi",
    "role": "Heart Patient",
    "specialtyTreated": "Cardiology Consultation",
    "rating": 5,
    "comment": "Booking Dr. Rajesh Sharma on DocPulse was effortless. The video consultation gave my family immense peace of mind and the digital prescription was accepted by our local pharmacy without issues.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
  },
  {
    "id": 2,
    "name": "Vikram Singhania",
    "city": "Mumbai",
    "role": "Skin Care Patient",
    "specialtyTreated": "Dermatology & Skin Care",
    "rating": 5,
    "comment": "Dr. Priya Deshmukh solved my stubborn cystic acne issue within 6 weeks. The SmartCare AI symptom checker directed me straight to her clinic.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    "id": 3,
    "name": "Naveen Reddy",
    "city": "Hyderabad",
    "role": "Knee Surgery Recovery",
    "specialtyTreated": "Orthopedics Joint Replacement",
    "rating": 5,
    "comment": "Dr. Vikramaditya Reddy is the finest orthopedic surgeon in Hyderabad. My robotic knee replacement recovery was smooth and painless.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const HEALTH_ARTICLES = [
  {
    "id": 1,
    "title": "10 Early Warning Signs of Heart Disease You Shouldn't Ignore",
    "category": "Cardiology",
    "readTime": "5 min read",
    "author": "Dr. Rajesh Sharma",
    "date": "18 Aug 2026",
    "summary": "Recognize subtle symptoms of coronary artery disease, high blood pressure, and arrhythmias before they turn critical.",
    "image": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 2,
    "title": "The Ultimate Dermatologist Guide to Managing Acne & Eczema",
    "category": "Dermatology",
    "readTime": "4 min read",
    "author": "Dr. Priya Deshmukh",
    "date": "14 Aug 2026",
    "summary": "Evidence-based clinical skincare routines for sensitive, acne-prone, and allergic Indian skin types.",
    "image": "https://images.unsplash.com/photo-1512290900672-1f879d722bf4?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3,
    "title": "Pediatric Immunization: Complete National Vaccination Schedule",
    "category": "Pediatrics",
    "readTime": "6 min read",
    "author": "Dr. Ananya Sen Gupta",
    "date": "10 Aug 2026",
    "summary": "A comprehensive guide for parents on recommended vaccines from newborn birth to 12 years of age in India.",
    "image": "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600"
  }
];

export const FAQS = [
  {
    "question": "How does online doctor consultation work on DocPulse?",
    "answer": "Select your specialist, choose between In-Clinic visit or Video Teleconsultation, book a convenient time slot, verify with a one-time OTP, and receive your digital NMC-verified e-prescription right after the session."
  },
  {
    "question": "Are the doctors verified with the National Medical Commission (NMC)?",
    "answer": "Yes! Every medical practitioner on DocPulse undergoes strict multi-tier verification with the NMC and State Medical Councils before being authorized to consult patients."
  },
  {
    "question": "How does the SmartCare AI Health Assistant work?",
    "answer": "SmartCare AI analyses your natural-language symptoms, evaluates red-flag clinical risks, offers general health guidance, and matches you to verified specialists in your city."
  },
  {
    "question": "Can I download and print my digital e-prescription?",
    "answer": "Yes, all prescriptions are digitally signed and available in your Patient Health Portal with full NMC credentials for easy printing or download."
  }
];
