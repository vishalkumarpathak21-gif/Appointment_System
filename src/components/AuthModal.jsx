import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Stethoscope, 
  Building2, 
  Phone, 
  ArrowRight, 
  GraduationCap, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  UserPlus, 
  LogIn, 
  Send, 
  MapPin, 
  Image as ImageIcon, 
  FileCheck2, 
  Languages, 
  BadgeCheck,
  RefreshCw,
  Loader2,
  KeyRound,
  LayoutDashboard
} from 'lucide-react';
import { api } from '../services/api';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onAuthSuccess, 
  onDoctorPendingSubmitted, 
  initialMode = 'login' 
}) {
  const [isLoginMode, setIsLoginMode] = useState(initialMode !== 'register');
  const [selectedRole, setSelectedRole] = useState(initialMode === 'admin' ? 'admin' : (initialMode === 'doctor' ? 'doctor' : 'patient')); // 'patient' | 'doctor' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [pendingNotice, setPendingNotice] = useState(null);
  const [submittedNotice, setSubmittedNotice] = useState(null);

  useEffect(() => {
    if (initialMode === 'register') {
      setIsLoginMode(false);
    } else {
      setIsLoginMode(true);
      if (initialMode === 'admin') setSelectedRole('admin');
      else if (initialMode === 'doctor') setSelectedRole('doctor');
      else setSelectedRole('patient');
    }
  }, [initialMode, isOpen]);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: '',
    // Patient specific
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+',
    address: '',
    abhaId: '',
    // Doctor specific fields
    specialty: 'general_medicine',
    qualification: '',
    nmcNumber: '',
    experience: '',
    fee: '',
    hospital: '',
    clinicAddress: '',
    languages: '',
    profilePhoto: '',
    licenseCertificateUrl: '',
    medicalCollege: '',
    medicalCouncil: '',
    about: ''
  });

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    if (!formData.email.trim()) {
      setError('Please enter your email address to receive the verification OTP');
      return;
    }
    setError('');
    setOtpLoading(true);
    try {
      const response = await api.sendAuthOtp(
        formData.email.trim(), 
        formData.name || (selectedRole === 'doctor' ? 'Doctor' : 'Patient'), 
        selectedRole === 'doctor' ? 'Doctor Registration' : 'Patient Registration'
      );
      setOtpSent(true);
      setCountdown(30); // 30s resend cooldown
      setOtpNotice(`✅ Verification code sent to ${formData.email.trim()}`);
      if (response.testOtp) {
        setOtpNotice(`✅ Code sent to ${formData.email.trim()} (Dev Test Code: ${response.testOtp})`);
      }
    } catch (err) {
      setError('Failed to send OTP: ' + err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setPendingNotice(null);
    setSubmittedNotice(null);

    const emailClean = formData.email.trim().toLowerCase();
    const passwordClean = formData.password.trim();

    if (!emailClean) {
      setError('Please enter your email address.');
      return;
    }

    if (!passwordClean) {
      setError('Please enter your account password.');
      return;
    }

    // =========================================================================
    // 1. SIGN IN MODE (Patient / Doctor / Admin) -> Direct Email & Password Login
    // =========================================================================
    if (isLoginMode) {
      setLoading(true);
      try {
        const response = await api.login(emailClean, passwordClean);
        
        // Strict Role Check for Admin
        if (selectedRole === 'admin' && response.user.role !== 'admin') {
          setError('Access Denied: The entered credentials do not have Administrator permissions.');
          setLoading(false);
          return;
        }

        // Strict Role Check for Doctor vs Patient
        if (selectedRole === 'doctor' && response.user.role !== 'doctor') {
          setError('This email is registered as a Patient account, not a Doctor. Please select the "👤 Patient" tab to sign in.');
          setLoading(false);
          return;
        }

        if (selectedRole === 'patient' && response.user.role !== 'patient') {
          setError('This email is registered as a Doctor account, not a Patient. Please select the "👨‍⚕️ Doctor" tab to sign in.');
          setLoading(false);
          return;
        }

        onAuthSuccess(response.user, response.token);
        onClose();
      } catch (err) {
        if (err.applicationPending) {
          setPendingNotice(err.message);
        } else {
          setError(err.message || 'Invalid email or password. Please verify your credentials.');
        }
      } finally {
        setLoading(false);
      }
      return;
    }

    // =========================================================================
    // 2. SIGN UP MODE (Patient / Doctor Registration with OTP)
    // =========================================================================
    if (!formData.name.trim()) {
      setError(selectedRole === 'doctor' ? 'Please enter your Full Name (with Dr. prefix).' : 'Please enter your Full Name.');
      return;
    }

    if (passwordClean.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    // If OTP was not sent yet, auto-trigger sending OTP
    if (!otpSent && !formData.otp.trim()) {
      await handleSendOtp();
      setError('📧 6-Digit OTP sent to your email! Please enter the code in the OTP box and click submit.');
      return;
    }

    // If OTP is empty
    if (!formData.otp.trim()) {
      setError('Please enter the 6-digit Email OTP verification code.');
      return;
    }

    if (selectedRole === 'doctor') {
      if (!formData.nmcNumber.trim()) {
        setError('Medical Registration Number (NMC) is required.');
        return;
      }
      if (!formData.qualification.trim()) {
        setError('Qualification (e.g. MBBS, MD) is required.');
        return;
      }
      if (!formData.fee) {
        setError('Consultation Fee is required.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: emailClean,
        phone: formData.phone.trim() || '+91 98765 43210',
        password: passwordClean,
        confirmPassword: formData.confirmPassword.trim(),
        otp: formData.otp.trim(),
        role: selectedRole === 'doctor' ? 'doctor' : 'patient',
        // Patient Fields
        dob: formData.dob,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        address: formData.address.trim(),
        abhaId: formData.abhaId.trim(),
        // Doctor Fields
        specialty: formData.specialty || 'cardiology',
        qualification: formData.qualification || 'MBBS, MD',
        nmcNumber: formData.nmcNumber || 'NMC-DMC/78921',
        experience: formData.experience || '5',
        fee: formData.fee || '800',
        hospital: formData.hospital || 'Apollo Hospitals & Clinic',
        clinicAddress: formData.clinicAddress || '14 Ring Road, New Delhi',
        languages: formData.languages || 'English, Hindi',
        profilePhoto: formData.profilePhoto || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
        image: formData.profilePhoto || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
        licenseCertificateUrl: formData.licenseCertificateUrl || 'https://nmc.org.in/verified-license.pdf',
        degreeProofUrl: formData.licenseCertificateUrl || 'https://nmc.org.in/verified-license.pdf',
        medicalCollege: formData.medicalCollege || 'AIIMS New Delhi',
        medicalCouncil: formData.medicalCouncil || 'Delhi Medical Council',
        about: formData.about || `Dr. ${formData.name} is a dedicated specialist physician.`
      };

      const response = await api.register(payload);

      if (response.applicationPending) {
        onClose();
        if (onDoctorPendingSubmitted) {
          onDoctorPendingSubmitted({
            ...formData,
            ...response.user,
            doctorProfile: { ...formData }
          }, response.user);
        }
        setLoading(false);
        return;
      }

      onAuthSuccess(response.user, response.token);
      onClose();
    } catch (err) {
      if (err.applicationPending) {
        setPendingNotice(err.message);
      } else {
        setError(err.message || 'Registration failed. Please check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[94vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header with Dynamic Theme */}
        <div className={`p-5 text-white flex items-center justify-between shrink-0 transition-colors duration-300 ${
          selectedRole === 'admin'
            ? 'bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950'
            : selectedRole === 'doctor'
              ? 'bg-gradient-to-r from-slate-900 via-teal-950 to-cyan-950'
              : 'bg-gradient-to-r from-slate-900 to-teal-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-inner ${
              selectedRole === 'admin'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                : selectedRole === 'doctor'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                  : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
            }`}>
              {selectedRole === 'admin' ? (
                <ShieldCheck className="w-6 h-6" />
              ) : selectedRole === 'doctor' ? (
                <Stethoscope className="w-6 h-6" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-white">
                {isLoginMode ? (
                  selectedRole === 'admin' ? 'Administrator Sign In' :
                  selectedRole === 'doctor' ? 'Doctor Sign In' :
                  'Patient Sign In'
                ) : (
                  selectedRole === 'doctor' ? 'Doctor Registration (Verified)' :
                  'Patient Registration'
                )}
              </h3>
              <p className="text-xs text-slate-300">
                {isLoginMode ? (
                  selectedRole === 'admin' ? 'Enter admin credentials to open Admin Dashboard' :
                  selectedRole === 'doctor' ? 'Enter doctor credentials to open Doctor Dashboard' :
                  'Enter patient credentials to open Patient Dashboard'
                ) : (
                  selectedRole === 'doctor' ? 'Submit NMC registration details for Medical Board verification' :
                  'Create your verified Indian patient health profile'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Tab Switcher: Sign In vs Sign Up */}
        <div className="flex border-b border-slate-200 bg-slate-100 p-1.5 gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(true);
              setError('');
              setOtpSent(false);
              setOtpNotice('');
              setCountdown(0);
              setPendingNotice(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              isLoginMode
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-teal-600" />
            <span>Sign In</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsLoginMode(false);
              if (selectedRole === 'admin') setSelectedRole('patient');
              setError('');
              setOtpSent(false);
              setOtpNotice('');
              setCountdown(0);
              setPendingNotice(null);
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              !isLoginMode
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-teal-600" />
            <span>Sign Up (Register)</span>
          </button>
        </div>

        {/* 3 User Role Selector Buttons */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 text-center">
            {isLoginMode ? 'Select Account Role to Sign In:' : 'Select Registration Type:'}
          </p>
          <div className={`grid gap-2 ${isLoginMode ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {/* Option 1: Patient */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('patient');
                setError('');
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'patient'
                  ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50/40'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>👤 Patient</span>
            </button>

            {/* Option 2: Doctor */}
            <button
              type="button"
              onClick={() => {
                setSelectedRole('doctor');
                setError('');
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                selectedRole === 'doctor'
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-md ring-2 ring-cyan-500/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-300 hover:bg-cyan-50/40'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>👨‍⚕️ Doctor</span>
            </button>

            {/* Option 3: Admin (Sign In Only) */}
            {isLoginMode && (
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  setError('');
                }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-purple-800 text-white border-purple-800 shadow-md ring-2 ring-purple-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>🛡️ Admin</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* OTP Sent Notice */}
          {otpNotice && (
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{otpNotice}</span>
            </div>
          )}

          {/* Pending Doctor Review Notice */}
          {pendingNotice && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-800">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Doctor Registration Under Review</span>
              </div>
              <p>{pendingNotice}</p>
            </div>
          )}

          {/* Submitted Doctor Notice */}
          {submittedNotice && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <BadgeCheck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-sm text-emerald-900">Doctor Application Submitted!</h4>
              <p className="leading-relaxed text-slate-700">{submittedNotice}</p>
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setSubmittedNotice(null);
                }}
                className="mt-2 px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {!submittedNotice && (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* ========================================================================= */}
              {/* 1. SIGN IN FORM: EMAIL & PASSWORD (DIRECT REDIRECT TO DASHBOARD)          */}
              {/* ========================================================================= */}
              {isLoginMode && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Role Header Banner */}
                  <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 ${
                    selectedRole === 'admin'
                      ? 'bg-purple-50 border-purple-200 text-purple-950'
                      : selectedRole === 'doctor'
                        ? 'bg-cyan-50 border-cyan-200 text-cyan-950'
                        : 'bg-teal-50 border-teal-200 text-teal-950'
                  }`}>
                    {selectedRole === 'admin' ? (
                      <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0" />
                    ) : selectedRole === 'doctor' ? (
                      <Stethoscope className="w-5 h-5 text-cyan-600 shrink-0" />
                    ) : (
                      <User className="w-5 h-5 text-teal-600 shrink-0" />
                    )}
                    <div>
                      <span className="font-bold block">
                        {selectedRole === 'admin' ? 'Administrator Portal' : selectedRole === 'doctor' ? 'Doctor Consultation Desk' : 'Patient Health Portal'}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Enter your email & password. You will be redirected straight to your {selectedRole.toUpperCase()} Dashboard.
                      </span>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {selectedRole === 'admin' ? 'Administrator Email *' : selectedRole === 'doctor' ? 'Doctor Email *' : 'Patient Email *'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter registered email address"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Account Password *</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        className="w-full pl-9 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button to Open Dashboard */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 hover:scale-[1.01] ${
                      selectedRole === 'admin'
                        ? 'bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950'
                        : selectedRole === 'doctor'
                          ? 'bg-gradient-to-r from-cyan-700 to-teal-800 hover:from-cyan-800 hover:to-teal-900'
                          : 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700'
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying & Opening Dashboard...</span>
                      </>
                    ) : (
                      <>
                        <LayoutDashboard className="w-4 h-4" />
                        <span>
                          {selectedRole === 'admin' ? 'Sign In & Open Admin Dashboard →' :
                           selectedRole === 'doctor' ? 'Sign In & Open Doctor Dashboard →' :
                           'Sign In & Open Patient Dashboard →'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 2. SIGN UP FORM: PATIENT / DOCTOR REGISTRATION WITH EMAIL OTP             */}
              {/* ========================================================================= */}
              {!isLoginMode && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Full Name * */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {selectedRole === 'doctor' ? 'Full Name (with Dr. prefix) *' : 'Full Name *'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Email * */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter email address"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Phone Number * */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter mobile number"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500"
                      />
                    </div>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Password *</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="Create a password"
                          className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password *</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="Confirm password"
                          className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:border-teal-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 6-Digit Email OTP Box Area */}
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-2xl border-2 border-teal-300 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>Email OTP Verification *</span>
                      </label>
                      {otpSent && (
                        <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/90 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Code Sent</span>
                        </span>
                      )}
                    </div>

                    {!otpSent ? (
                      <div className="pt-1">
                        <button
                          type="button"
                          disabled={otpLoading || !formData.email.trim()}
                          onClick={handleSendOtp}
                          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all hover:scale-[1.01]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{otpLoading ? 'Sending Verification Code...' : 'Send OTP to Email'}</span>
                        </button>
                        <p className="text-[10px] text-slate-500 text-center mt-1.5">
                          Click to receive a 6-digit verification code on your email
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5 animate-in fade-in">
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            maxLength={6}
                            value={formData.otp}
                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                            placeholder="Enter 6-digit OTP"
                            className="flex-1 px-3 py-2.5 text-center text-base tracking-widest font-mono font-bold bg-white border border-teal-300 rounded-xl outline-none text-teal-950 placeholder:tracking-normal placeholder:font-medium placeholder:text-xs placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 shadow-inner"
                          />
                          <button
                            type="button"
                            disabled={otpLoading || countdown > 0}
                            onClick={handleSendOtp}
                            className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-all shrink-0"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${otpLoading ? 'animate-spin' : ''}`} />
                            <span>{otpLoading ? 'Sending...' : (countdown > 0 ? `Resend (${countdown}s)` : 'Resend OTP')}</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                          <span>Enter the 6-digit verification code sent to your email</span>
                          <span className="text-teal-700 font-bold">Valid 10 mins</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* DOCTOR SPECIFIC FIELDS */}
                  {selectedRole === 'doctor' && (
                    <div className="space-y-3 pt-3 border-t border-slate-200 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                      <div className="flex items-center gap-2 font-extrabold text-xs text-teal-900 uppercase tracking-wider">
                        <GraduationCap className="w-4 h-4 text-teal-600" />
                        <span>Doctor Verification & Clinical Information</span>
                      </div>

                      {/* Specialization * & Qualification * */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Medical Specialization *
                          </label>
                          <select
                            value={formData.specialty}
                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                            className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-medium text-slate-800"
                          >
                            <option value="cardiology">Cardiology (Heart & Vascular)</option>
                            <option value="dermatology">Dermatology (Skin & Hair)</option>
                            <option value="general_medicine">General Medicine (Physician)</option>
                            <option value="pediatrics">Pediatrics (Child Health)</option>
                            <option value="orthopedics">Orthopedics (Bone & Joint)</option>
                            <option value="dentistry">Dentistry (Oral Surgery)</option>
                            <option value="ophthalmology">Ophthalmology (Eye Care)</option>
                            <option value="psychiatry">Psychiatry (Mental Health)</option>
                            <option value="neurology">Neurology (Brain & Nerves)</option>
                            <option value="gynecology">Obstetrics & Gynecology</option>
                            <option value="ent">ENT (Ear, Nose, Throat)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Qualification *
                          </label>
                          <input
                            type="text"
                            value={formData.qualification}
                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                            placeholder="e.g. MBBS, MD"
                            className="w-full px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-medium"
                          />
                        </div>
                      </div>

                      {/* NMC Number * & Experience * & Fee * */}
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 mb-1">
                            Medical Reg Number *
                          </label>
                          <input
                            type="text"
                            value={formData.nmcNumber}
                            onChange={(e) => setFormData({ ...formData, nmcNumber: e.target.value })}
                            placeholder="e.g. NMC/12345"
                            className="w-full px-2 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-mono font-bold text-teal-800"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 mb-1">
                            Years Experience *
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            placeholder="e.g. 5"
                            className="w-full px-2 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-700 mb-1">
                            Consultation Fee (₹) *
                          </label>
                          <input
                            type="number"
                            value={formData.fee}
                            onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                            placeholder="e.g. 500"
                            className="w-full px-2 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none font-bold text-emerald-700"
                          />
                        </div>
                      </div>

                      {/* Clinic/Hospital Name & Clinic Address */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Clinic/Hospital Name
                          </label>
                          <div className="relative">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={formData.hospital}
                              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                              placeholder="Hospital or clinic name"
                              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Clinic Address
                          </label>
                          <div className="relative">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={formData.clinicAddress}
                              onChange={(e) => setFormData({ ...formData, clinicAddress: e.target.value })}
                              placeholder="Clinic address or locality"
                              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Languages */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Languages
                        </label>
                        <div className="relative">
                          <Languages className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                          <input
                            type="text"
                            value={formData.languages}
                            onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                            placeholder="e.g. English, Hindi"
                            className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none"
                          />
                        </div>
                      </div>

                      {/* Profile Photo & Medical License */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Profile Photo (URL / Image)
                          </label>
                          <div className="relative">
                            <ImageIcon className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={formData.profilePhoto}
                              onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                              placeholder="Image URL (optional)"
                              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none text-slate-600"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 mb-1">
                            Medical License / Certificate
                          </label>
                          <div className="relative">
                            <FileCheck2 className="w-3.5 h-3.5 text-teal-600 absolute left-2.5 top-2.5" />
                            <input
                              type="text"
                              value={formData.licenseCertificateUrl}
                              onChange={(e) => setFormData({ ...formData, licenseCertificateUrl: e.target.value })}
                              placeholder="Certificate URL or PDF link"
                              className="w-full pl-8 pr-2.5 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none text-slate-600 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Notice of Admin Verification Desk */}
                      <div className="p-2.5 bg-cyan-50 rounded-xl border border-cyan-200 text-[11px] text-cyan-900 flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Admin Verification Note:</strong> Doctor registrations are verified by the DocPulse Medical Board using your NMC registration number before being visible to patients.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* PATIENT SPECIFIC FIELDS */}
                  {selectedRole === 'patient' && (
                    <div className="space-y-3 pt-2 border-t border-slate-200">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Patient Profile & Health Details
                      </p>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-1">Date of Birth</label>
                          <input
                            type="date"
                            value={formData.dob}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-1">Gender</label>
                          <select
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 mb-1">Blood Group</label>
                          <select
                            value={formData.bloodGroup}
                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                            className="w-full px-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-teal-700"
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 mb-1">Address</label>
                        <div className="relative">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            placeholder="City, State, PIN code"
                            className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button for Sign Up */}
                  <button
                    type="submit"
                    disabled={loading || otpLoading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 hover:scale-[1.01]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application & Verifying...</span>
                      </>
                    ) : selectedRole === 'doctor' ? (
                      <>
                        <span>Submit Doctor Application for Verification</span>
                        <ShieldCheck className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>Create Patient Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              )}

            </form>
          )}

          {/* Bottom Footer Switcher */}
          <div className="text-center pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            {isLoginMode ? (
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(false);
                  setError('');
                }}
                className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Don't have an account? Sign Up (Register) →</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsLoginMode(true);
                  setError('');
                }}
                className="text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>← Already have an account? Sign In</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
