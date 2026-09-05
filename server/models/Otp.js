import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    otp: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['auth_login', 'auth_register', 'booking'],
      default: 'auth_login'
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // MongoDB TTL index to auto-delete expired OTPs!
    }
  },
  { timestamps: true }
);

export default mongoose.model('Otp', otpSchema);
