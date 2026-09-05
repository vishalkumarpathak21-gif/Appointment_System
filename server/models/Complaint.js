import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true
    },
    patientEmail: {
      type: String,
      required: true
    },
    doctorName: {
      type: String,
      default: 'General Platform Query'
    },
    appointmentCode: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      enum: ['Consultation Issue', 'Refund / Payment', 'Prescription Delay', 'Clinic Waiting Time', 'Doctor Feedback', 'Other'],
      default: 'Consultation Issue'
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Open', 'In-Review', 'Resolved'],
      default: 'Open'
    },
    adminResponse: {
      type: String,
      default: ''
    },
    resolvedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);
