import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Download, 
  AlertCircle, 
  CreditCard, 
  QrCode,
  Send,
  Lock,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';

export default function BookingModal({ doctor, isOpen, onClose, onBookingSuccess, currentUser }) {
  const [step, setStep] = useState(1); // 1: Slot, 2: Details & OTP, 3: Success Confirmation
  const [consultationMode, setConsultationMode] = useState('Video Consultation');
  
  // Date & Slot Selection
  const [selectedDay, setSelectedDay] = useState('today');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Patient Details
  const [patientData, setPatientData] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '+91 98765 43210',
    email: currentUser?.email || '',
    age: '32',
    gender: 'Female',
    abhaId: currentUser?.abhaId || '',
    symptoms: ''
  });
  
  // OTP State
  const [bookingOtp, setBookingOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (currentUser) {
      setPatientData(prev => ({
        ...prev,
        fullName: prev.fullName || currentUser.name || '',
        email: currentUser.email || prev.email || '',
        phone: prev.phone || currentUser.phone || '+91 98765 43210',
        abhaId: prev.abhaId || currentUser.abhaId || ''
      }));
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    if (doctor) {
      if (doctor.modes && doctor.modes.includes('Video Consultation')) {
        setConsultationMode('Video Consultation');
      } else if (doctor.modes && doctor.modes.includes('In-Clinic')) {
        setConsultationMode('In-Clinic');
      }
      
      const hasTodaySlots = doctor.slots?.today && doctor.slots.today.length > 0;
      if (hasTodaySlots) {
        setSelectedDay('today');
        setSelectedSlot(doctor.slots.today[0] || '');
      } else {
        setSelectedDay('tomorrow');
        setSelectedSlot(doctor.slots?.tomorrow?.[0] || '');
      }
      
      setStep(1);
      setConfirmedBooking(null);
      setBookingOtp('');
      setOtpSent(false);
      setOtpNotice('');
      setCountdown(0);
      setErrors({});
    }
  }, [doctor, isOpen]);

  if (!isOpen || !doctor) return null;

  const getAvailableSlotsForDay = (dayKey) => {
    if (!doctor.slots) return [];
    return doctor.slots[dayKey] || [];
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
    const slots = getAvailableSlotsForDay(day);
    setSelectedSlot(slots[0] || '');
  };

  const validatePatientForm = () => {
    const errs = {};
    if (!patientData.fullName.trim()) errs.fullName = 'Full patient name is required';
    
    const phoneClean = patientData.phone.replace(/[\s-]/g, '');
    if (!patientData.phone.trim()) {
      errs.phone = 'Mobile number is required for SMS/WhatsApp prescription';
    } else if (!/^(\+91|91|0)?[6-9]\d{9}$/.test(phoneClean)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    const emailToValidate = patientData.email || currentUser?.email || '';
    if (!emailToValidate.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailToValidate)) {
      errs.email = 'Enter a valid email address';
    }
    if (!patientData.age || Number(patientData.age) <= 0 || Number(patientData.age) > 120) {
      errs.age = 'Enter valid age';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Send Booking OTP via Nodemailer
  const handleSendBookingOtp = async () => {
    if (!validatePatientForm()) return;
    setOtpLoading(true);
    setErrors({});
    try {
      const finalEmail = (currentUser?.email || patientData.email).toLowerCase().trim();
      const dateString = selectedDay === 'today' 
        ? 'Today, 19 Aug 2026' 
        : selectedDay === 'tomorrow' 
          ? 'Tomorrow, 20 Aug 2026' 
          : 'Friday, 21 Aug 2026';

      const response = await api.sendBookingOtp({
        email: finalEmail,
        patientName: patientData.fullName || currentUser?.name || 'Patient',
        doctorName: doctor.name,
        date: dateString,
        timeSlot: selectedSlot,
        fee: doctor.fee
      });

      setOtpSent(true);
      setCountdown(30);
      setOtpNotice(`✅ Verification code sent to ${finalEmail}`);
      if (response.testOtp) {
        setOtpNotice(`✅ Code sent to ${finalEmail} (Dev Code: ${response.testOtp})`);
      }
    } catch (err) {
      setErrors({ otp: 'Failed to send OTP: ' + err.message });
    } finally {
      setOtpLoading(false);
    }
  };

  const handleConfirmAppointment = async (e) => {
    if (e) e.preventDefault();
    if (!validatePatientForm()) return;

    if (!otpSent) {
      await handleSendBookingOtp();
      return;
    }

    if (!bookingOtp.trim()) {
      setErrors({ otp: 'Please enter the 6-digit confirmation code sent to your email.' });
      return;
    }

    const bookingRef = `DP-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateString = selectedDay === 'today' 
      ? 'Today, 19 Aug 2026' 
      : selectedDay === 'tomorrow' 
        ? 'Tomorrow, 20 Aug 2026' 
        : 'Friday, 21 Aug 2026';

    const finalEmail = (currentUser?.email || patientData.email).toLowerCase().trim();

    const newBooking = {
      id: bookingRef,
      appointmentCode: bookingRef,
      patientId: currentUser?.id || null,
      doctorId: doctor._id || doctor.id || 'doc-1',
      doctorName: doctor.name,
      doctorTitle: doctor.title,
      doctorSpecialty: doctor.specialtyName,
      doctorImage: doctor.image,
      doctorHospital: doctor.hospital,
      nmcNumber: doctor.nmcNumber,
      consultationMode,
      date: dateString,
      timeSlot: selectedSlot,
      patientName: patientData.fullName || currentUser?.name || 'Verified Patient',
      patientPhone: patientData.phone || currentUser?.phone || '+91 98765 43210',
      patientEmail: finalEmail,
      patientAge: patientData.age ? Number(patientData.age) : 32,
      patientGender: patientData.gender || 'Female',
      abhaId: patientData.abhaId || currentUser?.abhaId || 'Not provided',
      symptoms: patientData.symptoms || 'General Checkup & Medical Advice',
      fee: doctor.fee,
      currency: doctor.currency || '₹',
      paymentMethod,
      otp: bookingOtp.trim(),
      bookedAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    try {
      await onBookingSuccess(newBooking);
      setConfirmedBooking(newBooking);
      setStep(3);

      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    } catch (err) {
      setErrors({ otp: err.message || 'Booking confirmation failed' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-800 to-slate-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {step === 3 ? 'Consultation Confirmed!' : `Book Slot: ${doctor.name}`}
              </h3>
              <p className="text-xs text-teal-200">
                {step === 3 ? 'Reference code generated & saved' : `${doctor.specialtyName} • ${doctor.hospital}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-bold shrink-0">
            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 1 ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-800'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-slate-900' : 'text-slate-500'}>Slot & Mode</span>
            </div>
            
            <div className="h-0.5 w-12 bg-slate-200" />

            <div className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 2 ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-slate-900' : 'text-slate-500'}>Details & Email OTP</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* STEP 1: CONSULTATION MODE & SLOT PICKER */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Consultation Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Consultation Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {doctor.modes?.includes('Video Consultation') && (
                    <button
                      type="button"
                      onClick={() => setConsultationMode('Video Consultation')}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        consultationMode === 'Video Consultation'
                          ? 'border-teal-600 bg-teal-50/70 text-slate-900 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm">Video Consultation</div>
                        <div className="text-[11px] text-slate-500">Encrypted Telehealth Room</div>
                      </div>
                    </button>
                  )}

                  {doctor.modes?.includes('In-Clinic') && (
                    <button
                      type="button"
                      onClick={() => setConsultationMode('In-Clinic')}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        consultationMode === 'In-Clinic'
                          ? 'border-teal-600 bg-teal-50/70 text-slate-900 ring-2 ring-teal-600/20'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-xs sm:text-sm">In-Clinic Visit</div>
                        <div className="text-[11px] text-slate-500">{doctor.hospital}</div>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Day Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['today', 'tomorrow', 'in_2_days'].map((dayKey) => {
                    const label = dayKey === 'today' ? 'Today (19 Aug)' : dayKey === 'tomorrow' ? 'Tomorrow (20 Aug)' : 'Friday (21 Aug)';
                    const isSelected = selectedDay === dayKey;
                    return (
                      <button
                        key={dayKey}
                        type="button"
                        onClick={() => handleDayChange(dayKey)}
                        className={`py-2.5 px-2 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Available Time Slots
                </label>
                {getAvailableSlotsForDay(selectedDay).length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {getAvailableSlotsForDay(selectedDay).map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-teal-400 hover:bg-teal-50/30'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 p-4 bg-slate-50 rounded-xl text-center">
                    No open slots on this date. Please pick another day.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: PATIENT DETAILS & EMAIL OTP VERIFICATION */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {errors.otp && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errors.otp}</span>
                </div>
              )}

              {otpNotice && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{otpNotice}</span>
                </div>
              )}

              {/* Patient Basic Form */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-600 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Email & OTP Dispatch Section */}
              <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-300 shadow-xs space-y-3">
                <div>
                  <label className="block text-xs font-bold text-teal-950 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-teal-600" />
                    <span>Patient Email (for OTP & e-Prescription) *</span>
                  </label>
                  <input
                    type="email"
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    placeholder="patient@example.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-teal-300 rounded-xl outline-none font-medium text-slate-900 focus:border-teal-600"
                  />
                </div>

                {/* 6-Digit OTP Box Area: Before Send -> Send OTP; After Send -> Verify & Resend */}
                <div className="pt-2 border-t border-teal-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      <span>6-Digit Booking Verification Code *</span>
                    </label>
                    {otpSent && (
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Code Sent</span>
                      </span>
                    )}
                  </div>

                  {!otpSent ? (
                    /* BEFORE SENDING OTP */
                    <button
                      type="button"
                      disabled={otpLoading || !patientData.email.trim()}
                      onClick={handleSendBookingOtp}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{otpLoading ? 'Sending Booking OTP...' : 'Send Booking OTP to Email'}</span>
                    </button>
                  ) : (
                    /* AFTER SENDING OTP: SHOW ONLY VERIFY AND RESEND OPTIONS */
                    <div className="space-y-2 animate-in fade-in">
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          maxLength={6}
                          value={bookingOtp}
                          onChange={(e) => setBookingOtp(e.target.value)}
                          placeholder="Enter 6-digit OTP"
                          className="flex-1 px-3 py-2.5 text-center text-base tracking-widest font-mono font-bold bg-white border border-teal-300 rounded-xl outline-none text-teal-950 placeholder:tracking-normal placeholder:font-medium placeholder:text-xs placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 shadow-inner"
                        />
                        <button
                          type="button"
                          disabled={otpLoading || countdown > 0}
                          onClick={handleSendBookingOtp}
                          className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shrink-0"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${otpLoading ? 'animate-spin' : ''}`} />
                          <span>{otpLoading ? 'Sending...' : (countdown > 0 ? `Resend (${countdown}s)` : 'Resend OTP')}</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                        <span>Enter the 6-digit confirmation code sent to your email</span>
                        <span className="text-teal-700 font-bold">Valid 10 mins</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Symptoms / Chief Complaints */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Symptoms / Reason for Consultation</label>
                <textarea
                  rows="2"
                  value={patientData.symptoms}
                  onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                  placeholder="Briefly describe what symptoms you are experiencing..."
                  className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Payment Method (₹{doctor.fee})
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'UPI' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Instant UPI (GPay/PhonePe)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer ${
                      paymentMethod === 'Card' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Debit / Credit Card</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
          {step === 3 && confirmedBooking && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-black text-slate-900">Appointment Booked & Email Sent!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  A confirmation email with e-prescription access has been sent to <strong>{confirmedBooking.patientEmail}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 text-xs max-w-md mx-auto text-left border border-slate-200 space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-bold uppercase text-[10px]">Booking Code</span>
                  <span className="font-mono font-bold text-teal-700">{confirmedBooking.appointmentCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot</span>
                  <span className="font-bold text-slate-900">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mode</span>
                  <span className="font-bold text-cyan-700">{confirmedBooking.consultationMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="font-bold text-emerald-600">₹{confirmedBooking.fee} ({confirmedBooking.paymentMethod})</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 3 && (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            {step === 1 ? (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (!selectedSlot) {
                    alert('Please select an available time slot.');
                    return;
                  }
                  setStep(2);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to Patient Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : !otpSent ? (
              <button
                type="button"
                onClick={handleSendBookingOtp}
                disabled={otpLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-4 h-4" />
                <span>{otpLoading ? 'Sending OTP...' : 'Send OTP to Continue'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirmAppointment}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify OTP & Confirm (₹{doctor.fee})</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
