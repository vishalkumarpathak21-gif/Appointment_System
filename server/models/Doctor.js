import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      default: '',
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: 'Other'
    },
    title: {
      type: String,
      default: 'MBBS, MD - Specialist Physician'
    },
    qualification: {
      type: String,
      default: 'MBBS, MD'
    },
    specialty: {
      type: String,
      required: true
    },
    specialtyName: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true,
      default: 5
    },
    rating: {
      type: Number,
      default: 4.9
    },
    reviewsCount: {
      type: Number,
      default: 0
    },
    fee: {
      type: Number,
      required: true,
      default: 800
    },
    currency: {
      type: String,
      default: '₹'
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'
    },
    hospital: {
      type: String,
      default: 'Apollo Hospitals & Clinic'
    },
    clinicAddress: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: 'Delhi NCR'
    },
    city: {
      type: String,
      default: 'Delhi NCR'
    },
    distance: {
      type: String,
      default: '2.5 km away'
    },
    
    // Doctor Registration & Verification Credentials
    nmcNumber: {
      type: String,
      required: true
    },
    medicalCouncil: {
      type: String,
      default: 'State Medical Council / NMC'
    },
    medicalCollege: {
      type: String,
      default: 'Government / Recognized Medical College'
    },
    governmentId: {
      type: String,
      default: ''
    },
    degreeProofUrl: {
      type: String,
      default: ''
    },
    licenseCertificateUrl: {
      type: String,
      default: ''
    },
    
    // Application & Admin Approval Flow
    applicationStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    adminRemarks: {
      type: String,
      default: ''
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    approvedAt: {
      type: Date,
      default: null
    },

    about: {
      type: String,
      default: ''
    },
    education: {
      type: [String],
      default: []
    },
    languages: {
      type: [String],
      default: ['English', 'Hindi']
    },
    modes: {
      type: [String],
      default: ['In-Clinic', 'Video Consultation']
    },
    availableToday: {
      type: Boolean,
      default: true
    },
    slots: {
      today: { type: [String], default: ['10:00 AM', '11:30 AM', '03:00 PM', '05:00 PM'] },
      tomorrow: { type: [String], default: ['09:30 AM', '11:00 AM', '02:00 PM', '04:30 PM'] },
      in_2_days: { type: [String], default: ['10:00 AM', '12:00 PM', '03:30 PM'] }
    },
    reviews: [
      {
        author: String,
        rating: Number,
        date: String,
        comment: String
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model('Doctor', doctorSchema);
