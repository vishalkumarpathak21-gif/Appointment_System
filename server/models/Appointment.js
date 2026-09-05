import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    appointmentCode: {
      type: String,
      required: true,
      unique: true
    },
    patientId: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },
    doctorId: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    },
    doctorName: {
      type: String,
      required: true
    },
    doctorTitle: String,
    doctorSpecialty: String,
    doctorHospital: String,
    doctorImage: String,
    nmcNumber: String,
    
    patientName: {
      type: String,
      required: true
    },
    patientPhone: {
      type: String,
      required: true
    },
    patientEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    patientAge: Number,
    patientGender: String,
    abhaId: {
      type: String,
      default: 'Not provided'
    },
    
    consultationMode: {
      type: String,
      enum: ['In-Clinic', 'Video Consultation'],
      default: 'Video Consultation'
    },
    date: {
      type: String,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    symptoms: {
      type: String,
      default: 'General Checkup & Consultation'
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
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Refunded'],
      default: 'Paid'
    },
    paymentMethod: {
      type: String,
      default: 'UPI'
    },
    transactionId: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Confirmed', 'In-Progress', 'Completed', 'Cancelled'],
      default: 'Confirmed'
    },
    prescription: {
      diagnosis: { type: String, default: '' },
      medicines: [
        {
          name: String,
          dosage: String,
          frequency: String,
          duration: String,
          instructions: String
        }
      ],
      dietAdvice: { type: String, default: '' },
      nextFollowUp: { type: String, default: '' },
      issuedAt: { type: Date, default: null },
      isSigned: { type: Boolean, default: false }
    }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
