import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['patient', 'doctor', 'admin'],
      default: 'patient'
    },
    phone: {
      type: String,
      default: ''
    },
    
    // Patient Profile Additional Fields
    dob: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: 'Male'
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', ''],
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    
    abhaId: {
      type: String,
      default: ''
    },
    doctorProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      default: null
    },
    isApproved: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
