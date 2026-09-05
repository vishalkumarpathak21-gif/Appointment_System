import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  User, 
  IndianRupee, 
  ShieldCheck, 
  Sparkles,
  Save,
  Send,
  Download,
  LogOut,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  FileCheck2,
  Phone,
  Mail,
  MapPin,
  Check,
  Languages
} from 'lucide-react';
import { api } from '../services/api';
import PrescriptionModal from './PrescriptionModal';

export default function DoctorPortal({ currentUser, onBackToHome, onLogout }) {
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'rx_pad' | 'schedule' | 'profile'
  const [doctorProfile, setDoctorProfile] = useState(currentUser?.doctorProfile || null);
  const [isVerified, setIsVerified] = useState(currentUser?.isApproved === true);
  const [applicationStatus, setApplicationStatus] = useState(currentUser?.applicationStatus || (currentUser?.isApproved ? 'Approved' : 'Pending'));
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [viewingPrescriptionAppt, setViewingPrescriptionAppt] = useState(null);

  // e-Prescription Pad State
  const [selectedAppointmentForRx, setSelectedAppointmentForRx] = useState(null);
  const [prescriptionData, setPrescriptionData] = useState({
    diagnosis: '',
    medicines: [
      { name: 'Paracetamol 650mg', dosage: '1 Tab', frequency: 'Thrice daily after meals', duration: '3 Days', instructions: 'SOS for high fever' },
      { name: 'Pantoprazole 40mg', dosage: '1 Tab', frequency: 'Once daily before breakfast', duration: '5 Days', instructions: 'Antacid' }
    ],
    dietAdvice: 'Adequate hydration (3-4 litres water/day), light khichdi diet, avoid oily spicy foods.',
    nextFollowUp: 'After 5 days if fever persists'
  });

  const loadDoctorData = async () => {
    setLoading(true);
    try {
      if (currentUser?.email) {
        try {
          const statusRes = await api.checkDoctorStatus(currentUser.email);
          if (statusRes && statusRes.doctor) {
            setDoctorProfile(statusRes.doctor);
            setIsVerified(statusRes.isApproved);
            setApplicationStatus(statusRes.applicationStatus);

            if (statusRes.isApproved) {
              const appts = await api.getAppointments({ doctorId: statusRes.doctor._id });
              setAppointments(appts);
            }
            setLoading(false);
            return;
          }
        } catch (e) {
          // fallback to general search
        }
      }

      // Fallback: search in verified doctors
      const docs = await api.getDoctors();
      let myDoc = docs.find(d => d.name === currentUser?.name || d.userId === currentUser?.id || d.email === currentUser?.email);
      
      if (myDoc) {
        setDoctorProfile(myDoc);
        setIsVerified(true);
        setApplicationStatus('Approved');
        const appts = await api.getAppointments({ doctorId: myDoc._id });
        setAppointments(appts);
      } else {
        // If not found in verified doctors, check currentUser
        setDoctorProfile(currentUser?.doctorProfile || currentUser);
        setIsVerified(currentUser?.isApproved === true);
        setApplicationStatus(currentUser?.applicationStatus || 'Pending');
      }
    } catch (err) {
      console.error('Failed to load doctor data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheckStatus = async () => {
    if (!currentUser?.email) return;
    setCheckingStatus(true);
    setStatusMessage('');
    try {
      const res = await api.checkDoctorStatus(currentUser.email);
      setDoctorProfile(res.doctor);
      setIsVerified(res.isApproved);
      setApplicationStatus(res.applicationStatus);

      if (res.isApproved) {
        setStatusMessage('🎉 Congratulations! Your credentials have been verified by the Administrator. Doctor Portal is now fully unlocked!');
        const appts = await api.getAppointments({ doctorId: res.doctor._id });
        setAppointments(appts);
      } else if (res.applicationStatus === 'Rejected') {
        setStatusMessage(`❌ Application was rejected. Remarks: ${res.adminRemarks || 'Please contact administration.'}`);
      } else {
        setStatusMessage('⏳ Application is still Under Review by the Administrator. Please check back shortly.');
      }
    } catch (e) {
      setStatusMessage('Unable to check status right now. Please try again.');
    } finally {
      setCheckingStatus(false);
    }
  };

  useEffect(() => {
    loadDoctorData();
  }, [currentUser]);

  const handleAddMedicine = () => {
    setPrescriptionData({
      ...prescriptionData,
      medicines: [
        ...prescriptionData.medicines,
        { name: '', dosage: '1 Tab', frequency: 'Twice daily', duration: '5 Days', instructions: '' }
      ]
    });
  };

  const handleMedicineChange = (idx, field, value) => {
    const updated = [...prescriptionData.medicines];
    updated[idx][field] = value;
    setPrescriptionData({ ...prescriptionData, medicines: updated });
  };

  const handleRemoveMedicine = (idx) => {
    const updated = prescriptionData.medicines.filter((_, i) => i !== idx);
    setPrescriptionData({ ...prescriptionData, medicines: updated });
  };

  const handleIssuePrescription = async (e) => {
    e.preventDefault();
    if (!selectedAppointmentForRx) {
      alert('Please select an appointment from the queue first.');
      return;
    }

    try {
      await api.issuePrescription(selectedAppointmentForRx._id, {
        diagnosis: prescriptionData.diagnosis,
        medicines: prescriptionData.medicines,
        dietAdvice: prescriptionData.dietAdvice,
        nextFollowUp: prescriptionData.nextFollowUp,
        isSigned: true
      });
      alert(`✅ Digital e-Prescription successfully signed and issued for patient ${selectedAppointmentForRx.patientName}!`);
      loadDoctorData();
      setSelectedAppointmentForRx(null);
    } catch (err) {
      alert('Failed to issue prescription: ' + err.message);
    }
  };

  // =========================================================================
  // VIEW 1: UNVERIFIED / PENDING DOCTOR PORTAL SCREEN (ONLY SIGN OUT & PENDING STATUS)
  // =========================================================================
  if (!isVerified || applicationStatus === 'Pending' || applicationStatus === 'Rejected') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          
          {/* Top Bar with Sign Out */}
          <div className="bg-slate-900/90 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-black text-white">
                  DocPulse Doctor Consultation Desk
                </h1>
                <p className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 mt-0.5">
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                  <span>Pending Administrator Verification</span>
                </p>
              </div>
            </div>

            {/* Action Buttons: Sign Out & Home */}
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToHome}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
              >
                Home Page
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Pending Verification Notice Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-3xl p-6 sm:p-8 border-2 border-amber-500/40 shadow-2xl space-y-6">
            
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <span>● Doctor Application Under Review</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Welcome, Dr. {currentUser?.name || doctorProfile?.name || 'Doctor'}!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Your Doctor Account and NMC Medical Registration credentials have been submitted and are currently awaiting review by the <strong>DocPulse Administrator</strong>.
                </p>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Why is verification required?</span>
              </p>
              <p className="leading-relaxed">
                In compliance with National Medical Commission (NMC) guidelines and Telemedicine Practice standards in India, only verified medical practitioners with active state council registrations can access the <strong>Live OPD Queue</strong>, conduct patient consultations, and issue signed digital e-prescriptions.
              </p>
            </div>

            {/* Submitted Application Summary */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Your Submitted Application Summary</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Medical Reg Number (NMC)</span>
                  <span className="font-mono font-bold text-purple-300 text-sm">{doctorProfile?.nmcNumber || 'NMC-DMC/78921'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Medical Council</span>
                  <span className="font-bold text-slate-200">{doctorProfile?.medicalCouncil || 'Delhi Medical Council / State NMC'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Qualification & Specialty</span>
                  <span className="font-bold text-teal-300">{doctorProfile?.qualification || 'MBBS, MD'} • {doctorProfile?.specialtyName || 'Cardiology'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Hospital / Clinic & Fee</span>
                  <span className="font-bold text-emerald-300">{doctorProfile?.hospital || 'Apollo Hospitals'} • ₹{doctorProfile?.fee || '1000'} / consult</span>
                </div>
              </div>
            </div>

            {/* Live Check Button & Status Message */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                disabled={checkingStatus}
                onClick={handleManualCheckStatus}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${checkingStatus ? 'animate-spin' : ''}`} />
                <span>{checkingStatus ? 'Checking Administrator Status...' : 'Check Approval Status Now'}</span>
              </button>

              {statusMessage && (
                <div className="text-xs font-semibold text-teal-300 text-center sm:text-right animate-in fade-in">
                  {statusMessage}
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto w-full pt-8 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DocPulse Healthcare India Pvt. Ltd. Medical Board & Verification Desk.</p>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: FULL UNLOCKED DOCTOR PORTAL (AFTER SUCCESSFUL ADMIN VERIFICATION)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-2.5 py-1 rounded-full border border-teal-400/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>NMC Verified Specialist Physician</span>
              </span>
              <span className="text-xs text-slate-400">NMC: {doctorProfile?.nmcNumber}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {doctorProfile?.name || 'Dr. Specialist'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {doctorProfile?.title} • {doctorProfile?.hospital}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadDoctorData}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh OPD Queue</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Public Home Page
            </button>
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'queue', label: `Live Patient OPD Queue (${appointments.filter(a => a.status === 'Confirmed' || a.status === 'Pending').length})`, icon: Calendar },
            { id: 'rx_pad', label: 'Digital e-Prescription Pad', icon: FileText },
            { id: 'schedule', label: 'OPD Schedule & Slot Settings', icon: Clock },
            { id: 'profile', label: 'Doctor Credentials & NMC Info', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE PATIENT OPD QUEUE */}
        {activeTab === 'queue' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left 2 Cols: Appointments List */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>Today's Teleconsultation & In-Clinic Queue</span>
                </h3>

                {appointments.length > 0 ? (
                  <div className="space-y-3">
                    {appointments.map(appt => (
                      <div
                        key={appt._id}
                        className={`bg-slate-800/90 rounded-2xl p-4 border transition-all ${
                          selectedAppointmentForRx?._id === appt._id
                            ? 'border-teal-500 ring-2 ring-teal-500/20'
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                              {appt.patientName?.charAt(0) || 'P'}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-sm">{appt.patientName}</h4>
                                <span className="font-mono text-[10px] text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800">
                                  {appt.appointmentCode}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400">
                                {appt.date} • {appt.timeSlot} • Mode: <span className="text-teal-300 capitalize font-medium">{appt.mode}</span>
                              </p>
                              {appt.symptoms && (
                                <p className="text-xs text-slate-300 mt-1 italic">
                                  "Symptoms: {appt.symptoms}"
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {appt.prescription?.diagnosis ? (
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/50 flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  <span>e-Rx Done</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setViewingPrescriptionAppt(appt)}
                                  className="px-3 py-1.5 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 hover:text-white border border-teal-500/40 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>View Issued e-Rx</span>
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setSelectedAppointmentForRx(appt);
                                  setActiveTab('rx_pad');
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>Write e-Prescription & Complete</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-800/60 rounded-3xl p-12 text-center border border-slate-700 text-slate-400 space-y-2">
                    <Calendar className="w-10 h-10 mx-auto text-slate-500" />
                    <p className="text-sm font-bold">No active appointments in queue right now</p>
                    <p className="text-xs text-slate-500">Your profile is live on the DocPulse directory for patients to book consultations.</p>
                  </div>
                )}
              </div>

              {/* Right Col: Doctor Quick Stats */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span>Clinical Metrics & Fee</span>
                </h3>

                <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-medium">Consultation Fee</span>
                    <span className="text-base font-bold text-emerald-400">₹{doctorProfile?.fee || 800}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-medium">Total Consultations</span>
                    <span className="text-sm font-bold text-white">{appointments.length}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                    <span className="text-xs text-slate-400 font-medium">Completed / Prescribed</span>
                    <span className="text-sm font-bold text-teal-300">{appointments.filter(a => a.prescription).length}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Patient Satisfaction</span>
                    <span className="text-sm font-bold text-amber-400">★ {doctorProfile?.rating || '4.9'} / 5.0</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL E-PRESCRIPTION PAD */}
        {activeTab === 'rx_pad' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  <span>Digital e-Prescription Pad</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedAppointmentForRx 
                    ? `Writing prescription for patient: ${selectedAppointmentForRx.patientName} (${selectedAppointmentForRx.appointmentCode})`
                    : 'Select a patient appointment from the queue to issue a digital e-prescription'}
                </p>
              </div>

              {selectedAppointmentForRx && (
                <button
                  type="button"
                  onClick={() => setSelectedAppointmentForRx(null)}
                  className="px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-300 cursor-pointer"
                >
                  Change Patient
                </button>
              )}
            </div>

            {selectedAppointmentForRx ? (
              <form onSubmit={handleIssuePrescription} className="space-y-5">
                
                {/* Diagnosis Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Clinical Diagnosis & Symptoms *
                  </label>
                  <input
                    type="text"
                    required
                    value={prescriptionData.diagnosis}
                    onChange={(e) => setPrescriptionData({ ...prescriptionData, diagnosis: e.target.value })}
                    placeholder="e.g. Acute Upper Respiratory Tract Infection (URTI) with mild fever"
                    className="w-full px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500 font-medium"
                  />
                </div>

                {/* Medicine List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300">
                      Prescribed Medications (Rx)
                    </label>
                    <button
                      type="button"
                      onClick={handleAddMedicine}
                      className="px-3 py-1 bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 border border-teal-500/40 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Medicine</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {prescriptionData.medicines.map((med, idx) => (
                      <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 items-center">
                        <input
                          type="text"
                          value={med.name}
                          onChange={(e) => handleMedicineChange(idx, 'name', e.target.value)}
                          placeholder="Medicine Name (e.g. Amoxicillin 500mg)"
                          className="sm:col-span-2 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white outline-none font-medium"
                        />
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleMedicineChange(idx, 'dosage', e.target.value)}
                          placeholder="Dosage (e.g. 1 Tab)"
                          className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                        />
                        <input
                          type="text"
                          value={med.frequency}
                          onChange={(e) => handleMedicineChange(idx, 'frequency', e.target.value)}
                          placeholder="Frequency (e.g. Twice daily)"
                          className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={med.duration}
                            onChange={(e) => handleMedicineChange(idx, 'duration', e.target.value)}
                            placeholder="Duration (5 Days)"
                            className="flex-1 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                          />
                          {prescriptionData.medicines.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveMedicine(idx)}
                              className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Diet & Advice */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Dietary Advice & General Instructions
                  </label>
                  <textarea
                    rows="2"
                    value={prescriptionData.dietAdvice}
                    onChange={(e) => setPrescriptionData({ ...prescriptionData, dietAdvice: e.target.value })}
                    placeholder="Adequate hydration, warm saline gargles, avoid cold drinks..."
                    className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500 font-medium"
                  />
                </div>

                {/* Next Follow Up */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Next Follow-up Timeline
                  </label>
                  <input
                    type="text"
                    value={prescriptionData.nextFollowUp}
                    onChange={(e) => setPrescriptionData({ ...prescriptionData, nextFollowUp: e.target.value })}
                    placeholder="Review after 5 days if symptoms persist"
                    className="w-full px-4 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500"
                  />
                </div>

                {/* Submit & Sign Prescription */}
                <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Signing as: <strong className="text-white">{doctorProfile?.name} (NMC: {doctorProfile?.nmcNumber})</strong>
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Digitally Sign & Issue e-Prescription</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-3">
                <FileText className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-sm font-bold text-slate-300">Please select an appointment from the queue to start writing an e-prescription.</p>
                <button
                  type="button"
                  onClick={() => setActiveTab('queue')}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Go to Live OPD Queue
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SCHEDULE & SLOTS */}
        {activeTab === 'schedule' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <span>OPD Consultation Schedule & Timings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {['Morning OPD (09:00 AM - 01:00 PM)', 'Afternoon Teleconsult (02:00 PM - 05:00 PM)', 'Evening In-Clinic (05:30 PM - 08:30 PM)', 'Emergency Video OPD'].map((slot, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{slot}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <p className="text-[11px] text-teal-400 font-semibold">Active & Open for Booking</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DOCTOR PROFILE & NMC INFO */}
        {activeTab === 'profile' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              <span>Doctor Verification & Clinical Profile</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Medical Registration No.</span>
                <span className="font-mono font-bold text-purple-300 text-sm block">{doctorProfile?.nmcNumber}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">State Medical Council</span>
                <span className="font-bold text-white block">{doctorProfile?.medicalCouncil || 'State Medical Council'}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Specialization & Qualifications</span>
                <span className="font-bold text-teal-300 block">{doctorProfile?.qualification} • {doctorProfile?.specialtyName}</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 space-y-1">
                <span className="text-slate-500 font-bold uppercase text-[10px]">Hospital & Clinic Location</span>
                <span className="font-bold text-white block">{doctorProfile?.hospital} • {doctorProfile?.location}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Digital e-Prescription Viewer Modal for Doctor */}
      {viewingPrescriptionAppt && (
        <PrescriptionModal
          appointment={viewingPrescriptionAppt}
          isOpen={!!viewingPrescriptionAppt}
          onClose={() => setViewingPrescriptionAppt(null)}
        />
      )}

    </div>
  );
}
