import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  Building2, 
  FileText, 
  Download, 
  Trash2, 
  QrCode, 
  IndianRupee, 
  ShieldCheck, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Receipt, 
  FileCheck2,
  Send,
  MessageSquare,
  RefreshCw,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import SmartCareAIAssistant from './SmartCareAIAssistant';
import PrescriptionModal from './PrescriptionModal';

export default function PatientPortal({ currentUser, onBackToHome, onBookNewAppointment }) {
  const [activeTab, setActiveTab] = useState('history'); // 'history' | 'ai_assistant' | 'prescriptions' | 'payment' | 'grievance'
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all' | 'upcoming' | 'completed' | 'cancelled'
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedAppointmentId, setExpandedAppointmentId] = useState(null);
  const [viewingPrescriptionAppt, setViewingPrescriptionAppt] = useState(null);
  const [patientComplaints, setPatientComplaints] = useState([]);
  const [submittingGrievance, setSubmittingGrievance] = useState(false);

  // Grievance form state
  const [grievanceData, setGrievanceData] = useState({
    category: 'Consultation Issue',
    subject: '',
    appointmentCode: '',
    message: ''
  });
  const [grievanceSuccess, setGrievanceSuccess] = useState(false);

  const loadPatientData = async () => {
    setLoading(true);
    try {
      const email = currentUser?.email || 'vishalkumarpathak21@gmail.com';
      const [data, complaintsData] = await Promise.all([
        api.getAppointments({ patientEmail: email }).catch(() => []),
        api.getComplaints({ patientEmail: email }).catch(() => [])
      ]);
      setAppointments(Array.isArray(data) ? data : []);
      setPatientComplaints(Array.isArray(complaintsData) ? complaintsData : []);
    } catch (err) {
      console.error('Failed to load patient data:', err);
      setAppointments([]);
      setPatientComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatientData();
  }, [currentUser]);

  const handleCancelAppointment = async (id, code) => {
    if (confirm(`Are you sure you want to cancel appointment ${code}?`)) {
      try {
        await api.cancelAppointment(id);
        alert('Appointment cancelled successfully.');
        loadPatientData();
      } catch (err) {
        alert('Failed to cancel: ' + err.message);
      }
    }
  };

  const handleGrievanceSubmit = async (e) => {
    e.preventDefault();
    setSubmittingGrievance(true);
    try {
      await api.submitComplaint({
        patientName: currentUser?.name || 'Vishal Kumar Pathak',
        patientEmail: currentUser?.email || 'vishalkumarpathak21@gmail.com',
        doctorName: 'DocPulse Medical Admin',
        appointmentCode: grievanceData.appointmentCode,
        category: grievanceData.category,
        subject: grievanceData.subject,
        message: grievanceData.message
      });
      setGrievanceSuccess(true);
      setGrievanceData({ category: 'Consultation Issue', subject: '', appointmentCode: '', message: '' });
      await loadPatientData();
      setTimeout(() => setGrievanceSuccess(false), 6000);
    } catch (err) {
      alert('Failed to submit grievance: ' + err.message);
    } finally {
      setSubmittingGrievance(false);
    }
  };

  // Filter and search history
  const filteredAppointments = appointments.filter(apt => {
    // Status filter
    if (historyFilter === 'upcoming' && (apt.status === 'Completed' || apt.status === 'Cancelled')) return false;
    if (historyFilter === 'completed' && apt.status !== 'Completed') return false;
    if (historyFilter === 'cancelled' && apt.status !== 'Cancelled') return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchDoc = apt.doctorName?.toLowerCase().includes(q);
      const matchSpec = apt.doctorSpecialty?.toLowerCase().includes(q);
      const matchCode = apt.appointmentCode?.toLowerCase().includes(q);
      const matchDiagnosis = apt.prescription?.diagnosis?.toLowerCase().includes(q);
      const matchSymptom = apt.symptoms?.toLowerCase().includes(q);
      if (!matchDoc && !matchSpec && !matchCode && !matchDiagnosis && !matchSymptom) return false;
    }
    return true;
  });

  const upcomingCount = appointments.filter(a => a.status === 'Confirmed' || a.status === 'In-Progress').length;
  const completedCount = appointments.filter(a => a.status === 'Completed').length;
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length;
  const appointmentsWithRx = appointments.filter(a => a.prescription?.diagnosis);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Patient Header Banner */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shrink-0">
              {currentUser?.name?.charAt(0) || 'P'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{currentUser?.name || 'Rahul Sharma'}</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                  Verified Patient 🇮🇳
                </span>
              </div>
              <p className="text-xs text-slate-400 flex flex-wrap items-center gap-3">
                <span>✉️ {currentUser?.email || 'rahul.sharma@gmail.com'}</span>
                <span>•</span>
                <span>📞 {currentUser?.phone || '+91 98765 43210'}</span>
                {currentUser?.bloodGroup && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/60">
                      Blood Group: {currentUser.bloodGroup}
                    </span>
                  </>
                )}
                {currentUser?.gender && (
                  <>
                    <span>•</span>
                    <span className="text-slate-300">{currentUser.gender}</span>
                  </>
                )}
                {currentUser?.dob && (
                  <>
                    <span>•</span>
                    <span className="text-slate-300">DOB: {currentUser.dob}</span>
                  </>
                )}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/50">
                  ABHA ID: {currentUser?.abhaId || '91-4567-8901-2345'}
                </span>
                {currentUser?.address && (
                  <span className="text-xs text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    📍 {currentUser.address}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 font-semibold">● ABDM Health Locker Linked</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
            <button
              onClick={() => setActiveTab('ai_assistant')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 text-slate-950 text-xs font-bold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask SmartCare AI</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                onBackToHome();
                setTimeout(() => onBookNewAppointment && onBookNewAppointment(), 200);
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 text-xs font-bold shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Book Doctor</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'ai_assistant', label: '🤖 SmartCare AI Assistant', icon: Sparkles, isAi: true },
            { id: 'history', label: `Appointment History & Records (${appointments.length})`, icon: Calendar },
            { id: 'prescriptions', label: `Digital e-Prescriptions (${appointmentsWithRx.length})`, icon: FileText },
            { id: 'payment', label: 'Invoices & Payments', icon: IndianRupee },
            { id: 'grievance', label: `Support & Grievances (${patientComplaints.length})`, icon: AlertCircle, hasResolved: patientComplaints.some(c => c.status === 'Resolved') }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? tab.isAi
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-500/25 ring-1 ring-teal-400/50'
                      : 'bg-teal-600 text-white shadow-md'
                    : tab.isAi
                      ? 'bg-teal-950/40 text-teal-300 border border-teal-500/30 hover:bg-teal-900/40'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.isAi ? 'text-cyan-300' : ''}`} />
                <span>{tab.label}</span>
                {tab.hasResolved && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 0: SMARTCARE AI ASSISTANT (UNIFIED HEALTH GUIDANCE & DOCTOR RECOMMENDATION) */}
        {activeTab === 'ai_assistant' && (
          <SmartCareAIAssistant
            onBookDoctor={(doc) => {
              onBookNewAppointment && onBookNewAppointment(doc);
            }}
            onFindSpecialists={(specKey) => {
              onBookNewAppointment && onBookNewAppointment(null, specKey);
            }}
          />
        )}

        {/* TAB 1: APPOINTMENT HISTORY & MEDICAL TIMELINE */}
        {activeTab === 'history' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-6">
            
            {/* AI Assistant Quick Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-cyan-950/70 border border-teal-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <span>Unsure which specialist to consult for your symptoms?</span>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      New AI
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Describe your symptoms to SmartCare AI for general health guidance and instant doctor matching.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('ai_assistant')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <span>Launch AI Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Header & Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-400" />
                  <span>Patient Medical Consultation History</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Complete history of past OPD clinic visits, teleconsultations, diagnoses, and e-prescriptions.
                </p>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor, diagnosis, ref ID..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500"
                />
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-slate-400 font-bold mr-1">Status:</span>
              <button
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  historyFilter === 'all'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                All Records ({appointments.length})
              </button>
              <button
                onClick={() => setHistoryFilter('upcoming')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  historyFilter === 'upcoming'
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Upcoming ({upcomingCount})
              </button>
              <button
                onClick={() => setHistoryFilter('completed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  historyFilter === 'completed'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Completed & Prescribed ({completedCount})
              </button>
              <button
                onClick={() => setHistoryFilter('cancelled')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  historyFilter === 'cancelled'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Cancelled ({cancelledCount})
              </button>
            </div>

            {/* History Cards Timeline List */}
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map(apt => {
                  const isExpanded = expandedAppointmentId === apt._id;
                  return (
                    <div
                      key={apt._id}
                      className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-700/80 hover:border-teal-500/50 transition-all space-y-4 shadow-lg"
                    >
                      {/* Top Summary Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <img
                            src={apt.doctorImage || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                            alt={apt.doctorName}
                            className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-400/50 shrink-0 shadow-md"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-white">{apt.doctorName}</h4>
                              <span className="text-[10px] font-mono bg-slate-800 text-purple-300 px-2 py-0.5 rounded border border-slate-700">
                                {apt.nmcNumber || 'NMC-DMC/78942'}
                              </span>
                            </div>
                            <p className="text-xs text-teal-400 font-semibold">{apt.doctorSpecialty} • {apt.doctorHospital}</p>
                            <span className="text-[11px] font-mono text-slate-400">Booking Ref: {apt.appointmentCode}</span>
                          </div>
                        </div>

                        {/* Status & Mode Badge */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5">
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${
                            apt.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            apt.status === 'Cancelled' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                            'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse'
                          }`}>
                            ● {apt.status === 'Completed' ? 'Completed & Prescribed' : apt.status}
                          </span>

                          <span className="text-xs text-slate-300 font-medium">
                            {apt.date} • {apt.timeSlot}
                          </span>
                        </div>
                      </div>

                      {/* Symptoms & Core Info Box */}
                      <div className="bg-slate-800/60 rounded-2xl p-3.5 text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 border border-slate-700/60">
                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Consultation Type</span>
                          <span className="font-bold text-cyan-300 flex items-center gap-1 mt-0.5">
                            {apt.consultationMode === 'Video Consultation' ? <Video className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                            {apt.consultationMode}
                          </span>
                        </div>

                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Fee & Payment</span>
                          <span className="font-bold text-emerald-400 text-sm">₹{apt.fee}</span>
                          <span className="text-[10px] text-slate-400 ml-1">({apt.paymentMethod || 'UPI'})</span>
                        </div>

                        <div>
                          <span className="text-slate-500 text-[10px] uppercase font-bold block">Chief Complaints</span>
                          <span className="text-slate-200 line-clamp-1 font-medium">{apt.symptoms}</span>
                        </div>
                      </div>

                      {/* If Prescription Exists: Clinical Findings Summary */}
                      {apt.prescription?.diagnosis && (
                        <div className="bg-slate-950/60 rounded-2xl p-4 border border-teal-500/30 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FileCheck2 className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-bold text-emerald-300">Diagnosis:</span>
                              <span className="text-xs font-bold text-white">{apt.prescription.diagnosis}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => setExpandedAppointmentId(isExpanded ? null : apt._id)}
                              className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <span>{isExpanded ? 'Hide Medicines' : `View ${apt.prescription.medicines?.length || 0} Medicines`}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          {/* Expanded Medicines Details */}
                          {isExpanded && (
                            <div className="space-y-2.5 pt-2 border-t border-slate-800 animate-in fade-in">
                              <h5 className="text-[11px] font-bold uppercase text-slate-400">Prescribed Medications (Rx):</h5>
                              <div className="space-y-2">
                                {apt.prescription.medicines?.map((med, idx) => (
                                  <div key={idx} className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                                    <div>
                                      <span className="font-bold text-white">{idx + 1}. {med.name}</span>
                                      <span className="text-teal-300 ml-1">({med.dosage})</span>
                                      <p className="text-[11px] text-slate-400">{med.instructions}</p>
                                    </div>
                                    <div className="text-right">
                                      <span className="font-semibold text-slate-200">{med.frequency}</span>
                                      <span className="block text-[10px] text-slate-400">Duration: {med.duration}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {apt.prescription.dietAdvice && (
                                <div className="text-xs text-slate-300 pt-1">
                                  <strong className="text-teal-400">Doctor Advice: </strong>{apt.prescription.dietAdvice}
                                </div>
                              )}
                              {apt.prescription.nextFollowUp && (
                                <div className="text-xs text-purple-300 pt-0.5">
                                  <strong>Follow-up: </strong>{apt.prescription.nextFollowUp}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Action Buttons Row */}
                      <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-slate-500">
                            Txn: {apt.transactionId || 'UPI-IND-88239102'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {/* Re-book Button */}
                          <button
                            onClick={() => {
                              onBackToHome();
                              setTimeout(() => onBookNewAppointment && onBookNewAppointment(), 200);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
                            <span>Re-book Consultation</span>
                          </button>

                          {/* Download Invoice Receipt */}
                          <button
                            onClick={() => alert(`🧾 Downloading Official GST Invoice Slip for Appointment ${apt.appointmentCode}...`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5 text-purple-400" />
                            <span>Invoice</span>
                          </button>

                          {/* Download e-Prescription */}
                          {apt.prescription?.diagnosis && (
                            <button
                              onClick={() => alert(`📄 Downloading NMC Verified PDF e-Prescription for appointment ${apt.appointmentCode}...`)}
                              className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download e-Rx PDF</span>
                            </button>
                          )}

                          {/* Join Video Call (if video and not cancelled) */}
                          {apt.consultationMode === 'Video Consultation' && apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                            <button
                              onClick={() => alert(`Connecting to encrypted Telehealth Video Room with ${apt.doctorName}...`)}
                              className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Video Call</span>
                            </button>
                          )}

                          {/* Cancel if upcoming */}
                          {apt.status === 'Confirmed' && (
                            <button
                              onClick={() => handleCancelAppointment(apt._id, apt.appointmentCode)}
                              className="px-2.5 py-1.5 rounded-xl bg-rose-600/20 text-rose-300 hover:bg-rose-600/40 text-xs font-semibold cursor-pointer"
                            >
                              Cancel Slot
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Calendar className="w-10 h-10 mx-auto opacity-40 text-teal-400" />
                <p>No appointment records found matching your filter criteria.</p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: DIGITAL e-PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-teal-400" />
                <span>NMC Verified Digital e-Prescriptions</span>
              </h3>
              <p className="text-xs text-slate-400">Download officially stamped medical prescriptions accepted at pharmacies and diagnostic labs.</p>
            </div>

            {appointmentsWithRx.length > 0 ? (
              <div className="space-y-6">
                {appointmentsWithRx.map(apt => (
                  <div
                    key={apt._id}
                    className="bg-slate-900 rounded-3xl p-6 border border-teal-500/40 shadow-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{apt.doctorName}</h4>
                          <span className="text-xs font-mono bg-slate-800 text-teal-300 px-2 py-0.5 rounded border border-slate-700">
                            {apt.nmcNumber || 'NMC-DMC/78942'}
                          </span>
                        </div>
                        <p className="text-xs text-teal-400">{apt.doctorSpecialty} • {apt.doctorHospital}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Date of Consult</span>
                        <span className="font-bold text-white text-xs">{apt.date} ({apt.timeSlot})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-800/60 p-3 rounded-2xl">
                      <div>
                        <span className="text-slate-400 block uppercase text-[10px]">Patient Name</span>
                        <span className="font-bold text-white">{apt.patientName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block uppercase text-[10px]">Diagnosis / Observations</span>
                        <span className="font-bold text-emerald-400">{apt.prescription.diagnosis}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Prescribed Medications (Rx)
                      </h5>
                      <div className="space-y-2">
                        {apt.prescription.medicines?.map((med, idx) => (
                          <div key={idx} className="bg-slate-800/80 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border border-slate-700/60">
                            <div>
                              <p className="font-bold text-white">{idx + 1}. {med.name} ({med.dosage})</p>
                              <p className="text-[11px] text-slate-400">{med.instructions}</p>
                            </div>
                            <div className="text-right sm:text-right">
                              <span className="font-semibold text-teal-300">{med.frequency}</span>
                              <span className="block text-[10px] text-slate-400">Duration: {med.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {apt.prescription.dietAdvice && (
                      <div className="text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-700/40">
                        <strong className="text-teal-400">Diet & Lifestyle Advice: </strong>
                        {apt.prescription.dietAdvice}
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-purple-300">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Digitally Signed & NMC Verified</span>
                      </div>

                      <button
                        onClick={() => setViewingPrescriptionAppt(apt)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View & Print Signed e-Rx PDF</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <FileText className="w-10 h-10 mx-auto opacity-40 text-teal-400" />
                <p>No digital prescriptions issued yet.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INVOICES & PAYMENTS */}
        {activeTab === 'payment' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-emerald-400" />
                <span>Invoices & Payment History</span>
              </h3>
              <p className="text-xs text-slate-400">All consultation payments processed via UPI, NetBanking & Cards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-700 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-teal-400" />
                  <span>Instant UPI QR Code</span>
                </h4>
                <div className="w-48 h-48 mx-auto bg-white p-3 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                  <div className="w-full h-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-2 text-center">
                    <QrCode className="w-20 h-20 text-slate-900" />
                    <span className="text-[10px] font-bold text-slate-900 mt-1">UPI ID: docpulse@icici</span>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400">
                  Accepted: GPay, PhonePe, Paytm, BHIM UPI
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Your Past Invoices</h4>
                {appointments.map(apt => (
                  <div key={apt._id} className="bg-slate-900 p-4 rounded-2xl border border-slate-700 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-white">{apt.doctorName}</p>
                      <p className="text-slate-400">{apt.date} • Ref: {apt.appointmentCode}</p>
                      <span className="text-purple-300 font-mono text-[10px]">Txn: {apt.transactionId || 'UPI-IND-88239102'}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 text-sm">₹{apt.fee}</span>
                      <span className="block text-[10px] text-emerald-300 font-semibold">{apt.paymentStatus || 'Paid'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GRIEVANCES & OFFICIAL ADMIN RESOLUTIONS */}
        {activeTab === 'grievance' && (
          <div className="space-y-6 max-w-4xl">
            
            {/* Top Header Card */}
            <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-rose-500/20 text-rose-300 text-xs font-bold px-2.5 py-1 rounded-full border border-rose-500/30 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Patient Grievance Redressal Desk</span>
                </span>
                <span className="text-xs text-slate-400">
                  {patientComplaints.length} Total Tickets • {patientComplaints.filter(c => c.status === 'Resolved').length} Resolved
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Support Tickets & Admin Resolutions
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Track your submitted grievances and review official resolutions provided directly by the DocPulse Medical Board & Administration.
              </p>
            </div>

            {/* SECTION 1: Patient's Submitted Tickets with Admin Responses */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>My Submitted Grievances & Resolutions ({patientComplaints.length})</span>
              </h4>

              {patientComplaints.length > 0 ? (
                <div className="space-y-4">
                  {patientComplaints.map(comp => {
                    const isResolved = comp.status === 'Resolved';
                    return (
                      <div
                        key={comp._id}
                        className={`bg-slate-900 rounded-3xl p-5 sm:p-6 border transition-all space-y-4 shadow-xl ${
                          isResolved
                            ? 'border-emerald-500/40 hover:border-emerald-500/60'
                            : 'border-amber-500/40 hover:border-amber-500/60'
                        }`}
                      >
                        {/* Ticket Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-teal-300 border border-slate-700">
                                {comp.category}
                              </span>
                              {comp.appointmentCode && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/60 text-purple-300 border border-purple-800/40">
                                  Ref: {comp.appointmentCode}
                                </span>
                              )}
                            </div>
                            <h5 className="text-base font-bold text-white">{comp.subject}</h5>
                          </div>

                          <div className="sm:text-right">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                              isResolved
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                            }`}>
                              {isResolved ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Resolved by Admin</span>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>In Review by Medical Board</span>
                                </>
                              )}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-1">
                              Submitted: {new Date(comp.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        {/* Patient's Original Message */}
                        <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1 text-xs">
                          <span className="text-[10px] font-bold uppercase text-slate-400 block">Your Stated Concern:</span>
                          <p className="text-slate-200 leading-relaxed italic">
                            "{comp.message}"
                          </p>
                        </div>

                        {/* Official Admin Resolution Response */}
                        {isResolved ? (
                          <div className="bg-emerald-950/40 rounded-2xl p-4 sm:p-5 border-2 border-emerald-500/40 space-y-2.5 shadow-lg animate-in fade-in">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Official DocPulse Administration Resolution</span>
                              </span>
                              {comp.resolvedAt && (
                                <span className="text-[11px] text-emerald-400/80 font-medium">
                                  Resolved on {new Date(comp.resolvedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                              )}
                            </div>

                            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-emerald-700/40 text-xs sm:text-sm text-emerald-200 font-medium leading-relaxed">
                              {comp.adminResponse || 'This issue has been thoroughly reviewed with the concerned medical team and resolved in accordance with platform standards.'}
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-300 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                            <span>Your grievance is in active review. The Admin Medical Board will post an official resolution within 24 hours.</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-700/80 text-slate-400 space-y-2">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-teal-400/60" />
                  <p className="text-sm font-bold text-white">No active grievances filed</p>
                  <p className="text-xs text-slate-400">All your appointments and medical consultations are running smoothly without any reported issues.</p>
                </div>
              )}
            </div>

            {/* SECTION 2: Raise a New Support Ticket Form */}
            <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 space-y-6">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>Raise a New Grievance or Support Ticket</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Have an issue with consultation, billing, or prescription? Our Medical Admin Desk is ready to assist.
                </p>
              </div>

              {grievanceSuccess && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-2xl flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Grievance submitted successfully! It has been logged in your tickets above and forwarded to the Admin Board.</span>
                </div>
              )}

              <form onSubmit={handleGrievanceSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Issue Category *</label>
                    <select
                      value={grievanceData.category}
                      onChange={(e) => setGrievanceData({ ...grievanceData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500"
                    >
                      <option value="Consultation Issue">Consultation Issue</option>
                      <option value="Refund / Payment">Refund / Payment Query</option>
                      <option value="Prescription Delay">Prescription Delay</option>
                      <option value="Clinic Waiting Time">Clinic Waiting Time</option>
                      <option value="Doctor Feedback">Doctor Feedback</option>
                      <option value="Other">Other Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Appointment Ref ID (Optional)</label>
                    <input
                      type="text"
                      value={grievanceData.appointmentCode}
                      onChange={(e) => setGrievanceData({ ...grievanceData, appointmentCode: e.target.value })}
                      placeholder="e.g. DP-IND-863427"
                      className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    value={grievanceData.subject}
                    onChange={(e) => setGrievanceData({ ...grievanceData, subject: e.target.value })}
                    placeholder="Brief summary of your concern..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Detailed Message *</label>
                  <textarea
                    rows="4"
                    required
                    value={grievanceData.message}
                    onChange={(e) => setGrievanceData({ ...grievanceData, message: e.target.value })}
                    placeholder="Describe what happened and how we can assist you..."
                    className="w-full p-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-teal-500 font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingGrievance}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingGrievance ? 'Submitting...' : 'Submit Grievance to Admin'}</span>
                </button>
              </form>
            </div>

          </div>
        )}

      </div>

      {/* Digital e-Prescription Viewer Modal for Patient */}
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
