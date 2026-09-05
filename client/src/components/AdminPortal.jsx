import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Stethoscope, 
  Calendar, 
  IndianRupee, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  FileText, 
  MessageSquare, 
  Filter, 
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Building2,
  GraduationCap,
  FileCheck2,
  UserCheck,
  Check,
  X
} from 'lucide-react';
import { api } from '../services/api';
import PrescriptionModal from './PrescriptionModal';

export default function AdminPortal({ currentUser, onBackToHome }) {
  const [stats, setStats] = useState(null);
  const [doctorApplications, setDoctorApplications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'overview' | 'appointments' | 'financials' | 'complaints'
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('all'); // 'all' | 'pending' | 'approved' | 'rejected'
  const [appointmentFilterStatus, setAppointmentFilterStatus] = useState('all'); // 'all' | 'completed' | 'pending'
  const [viewingPrescriptionAppt, setViewingPrescriptionAppt] = useState(null);
  
  // Review Doctor Modal State
  const [selectedDoctorForReview, setSelectedDoctorForReview] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Resolution Modal State for Grievances
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsData, applsData, apptsData, complaintsData] = await Promise.all([
        api.getAdminStats(),
        api.getDoctorApplications(),
        api.getAppointments(),
        api.getComplaints()
      ]);
      setStats(statsData);
      setDoctorApplications(applsData);
      setAppointments(apptsData);
      setComplaints(complaintsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleReviewAction = async (action) => {
    if (!selectedDoctorForReview) return;
    setActionLoading(true);
    try {
      const response = await api.reviewDoctorApplication(
        selectedDoctorForReview._id,
        action,
        adminRemarks || (action === 'approve' ? 'NMC credentials verified with State Medical Council.' : 'Incomplete credentials.')
      );
      alert(response.message || `Doctor ${action === 'approve' ? 'Approved' : 'Rejected'} successfully!`);
      setSelectedDoctorForReview(null);
      setAdminRemarks('');
      loadData();
    } catch (err) {
      alert('Review action failed: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleResolveComplaint = async (e) => {
    e.preventDefault();
    if (!selectedComplaint || !resolutionNote.trim()) return;

    try {
      await api.resolveComplaint(selectedComplaint._id, resolutionNote);
      setComplaints(prev => prev.map(c => c._id === selectedComplaint._id ? { ...c, status: 'Resolved', adminResponse: resolutionNote, resolvedAt: new Date() } : c));
      setSelectedComplaint(null);
      setResolutionNote('');
      loadData();
    } catch (err) {
      alert('Failed to resolve complaint: ' + err.message);
    }
  };

  const filteredApplications = doctorApplications.filter(doc => {
    // Filter by status
    if (applicationFilter === 'pending' && doc.applicationStatus !== 'Pending') return false;
    if (applicationFilter === 'approved' && doc.applicationStatus !== 'Approved') return false;
    if (applicationFilter === 'rejected' && doc.applicationStatus !== 'Rejected') return false;

    // Search query across all fields
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = doc.name?.toLowerCase().includes(q);
      const matchEmail = doc.email?.toLowerCase().includes(q);
      const matchSpecialty = doc.specialtyName?.toLowerCase().includes(q) || doc.specialty?.toLowerCase().includes(q);
      const matchNmc = doc.nmcNumber?.toLowerCase().includes(q);
      const matchHospital = doc.hospital?.toLowerCase().includes(q);
      const matchCollege = doc.medicalCollege?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchSpecialty && !matchNmc && !matchHospital && !matchCollege) return false;
    }
    return true;
  });

  const pendingCount = doctorApplications.filter(d => d.applicationStatus === 'Pending').length;
  const approvedCount = doctorApplications.filter(d => d.applicationStatus === 'Approved').length;
  const rejectedCount = doctorApplications.filter(d => d.applicationStatus === 'Rejected').length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-400/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Super Admin Medical Verification Console</span>
              </span>
              <span className="text-xs text-slate-400">Admin: {currentUser?.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              DocPulse India Platform Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Verify submitted doctor NMC credentials, review medical colleges, approve new specialists, and monitor platform operations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-colors cursor-pointer"
            >
              Public Home Page
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'applications', label: `All Registered Doctors (${doctorApplications.length})`, icon: Stethoscope, alert: pendingCount > 0 },
            { id: 'overview', label: 'Analytics & Directory Overview', icon: TrendingUp },
            { id: 'appointments', label: `Platform Appointments (${appointments.length})`, icon: Calendar },
            { id: 'financials', label: 'Revenue & Payments', icon: IndianRupee },
            { id: 'complaints', label: `Patient Grievances (${complaints.filter(c => c.status === 'Open').length})`, icon: AlertCircle }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.alert && (
                  <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ALL DOCTOR REGISTRATIONS & VERIFICATION DESK */}
        {activeTab === 'applications' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-6">
            
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-purple-400" />
                  <span>All Platform Doctors & Verification Console</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Total {doctorApplications.length} doctors registered. Review credentials, verify State Medical Council NMC numbers, and publish to Home Page.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor, email, specialty, NMC..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-bold mr-1">Filter View:</span>
              <button
                onClick={() => setApplicationFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  applicationFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-md ring-1 ring-purple-400'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                All Registered Doctors ({doctorApplications.length})
              </button>
              <button
                onClick={() => setApplicationFilter('approved')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  applicationFilter === 'approved'
                    ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Approved & Live on Home Page ({approvedCount})
              </button>
              <button
                onClick={() => setApplicationFilter('pending')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  applicationFilter === 'pending'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Pending Verification ({pendingCount})
              </button>
              <button
                onClick={() => setApplicationFilter('rejected')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  applicationFilter === 'rejected'
                    ? 'bg-rose-600 text-white shadow-md ring-1 ring-rose-400'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Rejected ({rejectedCount})
              </button>
            </div>

            {/* Applications Grid */}
            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredApplications.map(doc => (
                  <div
                    key={doc._id}
                    className="bg-slate-900 rounded-2xl p-5 border border-slate-700/80 hover:border-purple-500/50 transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Top Row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                            alt={doc.name}
                            className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-base font-bold text-white">{doc.name}</h4>
                            </div>
                            <p className="text-xs text-teal-400 font-semibold">{doc.specialtyName}</p>
                            <p className="text-xs text-slate-400 truncate max-w-xs">{doc.title}</p>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                          doc.applicationStatus === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          doc.applicationStatus === 'Rejected' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                        }`}>
                          ● {doc.applicationStatus === 'Pending' ? 'Pending Admin Action' : doc.applicationStatus}
                        </span>
                      </div>

                      {/* Credentials Box */}
                      <div className="bg-slate-800/60 rounded-xl p-3 space-y-1.5 text-xs border border-slate-700/50">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block">NMC Registration No.</span>
                            <span className="font-mono font-bold text-purple-300">{doc.nmcNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block">State Medical Council</span>
                            <span className="font-semibold text-slate-200">{doc.medicalCouncil || 'State Council'}</span>
                          </div>
                        </div>

                        <div className="pt-1 border-t border-slate-700/40 grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block">Medical Alma Mater</span>
                            <span className="font-semibold text-slate-200">{doc.medicalCollege || 'AIIMS / Recognized'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 text-[10px] uppercase font-bold block">Hospital & Fee</span>
                            <span className="font-bold text-emerald-400">₹{doc.fee} • {doc.location}</span>
                          </div>
                        </div>

                        {doc.about && (
                          <p className="text-[11px] text-slate-400 pt-1 italic line-clamp-2">
                            "{doc.about}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Home Page Status Banner */}
                    <div className={`p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 border ${
                      doc.isVerified && doc.applicationStatus === 'Approved'
                        ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-300'
                        : doc.applicationStatus === 'Pending'
                          ? 'bg-amber-950/40 border-amber-800/40 text-amber-300'
                          : 'bg-rose-950/40 border-rose-800/40 text-rose-300'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold">
                        {doc.isVerified && doc.applicationStatus === 'Approved' ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>Live on Home Page (Publicly Visible)</span>
                          </>
                        ) : doc.applicationStatus === 'Pending' ? (
                          <>
                            <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                            <span>Hidden from Home Page (Awaiting Admin Approval)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>Blocked from Home Page (Application Rejected)</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500 font-medium">
                        Applied: {new Date(doc.appliedAt || doc.createdAt).toLocaleDateString('en-IN')}
                      </span>

                      <div className="flex items-center gap-2">
                        {doc.applicationStatus === 'Pending' ? (
                          <button
                            onClick={() => {
                              setSelectedDoctorForReview(doc);
                              setAdminRemarks('NMC credentials verified with State Medical Council records.');
                            }}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Review & Add to Home Page</span>
                          </button>
                        ) : doc.applicationStatus === 'Approved' ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedDoctorForReview(doc);
                                setAdminRemarks(doc.adminRemarks || '');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
                            >
                              Edit Info
                            </button>
                            <button
                              onClick={() => {
                                setSelectedDoctorForReview(doc);
                                setAdminRemarks('Access suspended / credentials re-evaluation required.');
                              }}
                              className="px-3 py-1.5 rounded-xl bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs font-bold cursor-pointer"
                            >
                              Remove from Home Page
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedDoctorForReview(doc);
                              setAdminRemarks('Re-evaluated credentials and approved.');
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold cursor-pointer"
                          >
                            Re-Approve & Add to Home Page
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 opacity-60" />
                <p>No doctor applications matching "{applicationFilter}". All queues clear!</p>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: OVERVIEW STATS */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Total Platform Revenue</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-white">₹{stats.totalRevenue.toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Total Specialists</span>
                  <Stethoscope className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-3xl font-black text-white">{stats.totalDoctors}</div>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Total Appointments</span>
                  <Calendar className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-white">{stats.totalAppointments}</div>
              </div>
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase">Pending Doctor Approvals</span>
                  <UserCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-400">{stats.pendingDoctors}</div>
              </div>
            </div>

            {/* Doctors Quick Directory in Overview */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-teal-400" />
                    <span>All Platform Registered Doctors ({doctorApplications.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400">Complete registry of approved and pending medical practitioners.</p>
                </div>

                <button
                  onClick={() => setActiveTab('applications')}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Manage All Doctors →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3">Doctor</th>
                      <th className="p-3">Specialty</th>
                      <th className="p-3">NMC Reg No.</th>
                      <th className="p-3">Hospital & Location</th>
                      <th className="p-3">Fee</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {doctorApplications.map(doc => (
                      <tr key={doc._id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={doc.image || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600'}
                              alt={doc.name}
                              className="w-8 h-8 rounded-lg object-cover border border-slate-700 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-white">{doc.name}</p>
                              <p className="text-[11px] text-slate-400">{doc.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-semibold text-teal-300">{doc.specialtyName}</td>
                        <td className="p-3 font-mono font-bold text-purple-300">{doc.nmcNumber}</td>
                        <td className="p-3 text-slate-300">{doc.hospital || 'Hospital'} • {doc.location || doc.city}</td>
                        <td className="p-3 font-bold text-emerald-400">₹{doc.fee}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            doc.applicationStatus === 'Approved' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            doc.applicationStatus === 'Rejected' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                            'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            ● {doc.applicationStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: PLATFORM APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  <span>Platform Consultation & e-Prescription Records</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time audit log of doctor consultations, clinical status, and issued digital e-prescriptions.
                </p>
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setAppointmentFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    appointmentFilterStatus === 'all'
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  All ({appointments.length})
                </button>
                <button
                  onClick={() => setAppointmentFilterStatus('completed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    appointmentFilterStatus === 'completed'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Done & e-Prescribed ({appointments.filter(a => a.status === 'Completed' || a.prescription?.diagnosis).length})
                </button>
                <button
                  onClick={() => setAppointmentFilterStatus('pending')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    appointmentFilterStatus === 'pending'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  Awaiting Doctor e-Rx ({appointments.filter(a => a.status !== 'Completed' && !a.prescription?.diagnosis).length})
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold border-b border-slate-700">
                  <tr>
                    <th className="p-3">Ref Code</th>
                    <th className="p-3">Patient Name</th>
                    <th className="p-3">Doctor & NMC</th>
                    <th className="p-3">Mode & Date</th>
                    <th className="p-3">Fee</th>
                    <th className="p-3">Consultation Status</th>
                    <th className="p-3 text-right">e-Prescription Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {appointments
                    .filter(apt => {
                      const isDone = apt.status === 'Completed' || (apt.prescription && apt.prescription.diagnosis);
                      if (appointmentFilterStatus === 'completed') return isDone;
                      if (appointmentFilterStatus === 'pending') return !isDone;
                      return true;
                    })
                    .map(apt => {
                      const isPrescribed = apt.status === 'Completed' || (apt.prescription && apt.prescription.diagnosis);
                      return (
                        <tr key={apt._id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="p-3 font-mono font-bold text-teal-400">{apt.appointmentCode}</td>
                          <td className="p-3">
                            <p className="font-bold text-white">{apt.patientName}</p>
                            <p className="text-[11px] text-slate-400">{apt.patientEmail}</p>
                          </td>
                          <td className="p-3">
                            <p className="font-bold text-white">{apt.doctorName}</p>
                            <p className="text-[11px] font-mono text-purple-300">NMC: {apt.nmcNumber || 'NMC-DMC/78942'}</p>
                          </td>
                          <td className="p-3 text-slate-300">
                            <p>{apt.date} • {apt.timeSlot}</p>
                            <span className="text-[10px] text-teal-400 font-semibold">{apt.consultationMode || 'Video Consultation'}</span>
                          </td>
                          <td className="p-3 font-bold text-emerald-400">₹{apt.fee}</td>
                          <td className="p-3">
                            {isPrescribed ? (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Done & e-Prescribed</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 w-fit">
                                <Clock className="w-3 h-3 animate-pulse" />
                                <span>In Queue (Awaiting e-Rx)</span>
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-right">
                            {isPrescribed ? (
                              <button
                                onClick={() => setViewingPrescriptionAppt(apt)}
                                className="px-3 py-1.5 rounded-xl bg-teal-600/30 hover:bg-teal-600/50 text-teal-300 hover:text-white border border-teal-500/40 text-xs font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer"
                              >
                                <FileText className="w-3.5 h-3.5" />
                                <span>View e-Prescription</span>
                              </button>
                            ) : (
                              <span className="text-slate-500 text-[11px] italic">Awaiting Doctor</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: FINANCIALS & PAYMENTS LEDGER */}
        {activeTab === 'financials' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">Financials & Payments Ledger</h3>
                <p className="text-xs text-slate-400">UPI, NetBanking & Card transactions processed on DocPulse India.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold border-b border-slate-700">
                  <tr>
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Ref ID</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {appointments.map(apt => (
                    <tr key={apt._id} className="hover:bg-slate-700/30">
                      <td className="p-3 font-mono text-purple-300">{apt.transactionId || 'UPI-IND-88239102'}</td>
                      <td className="p-3 font-mono text-teal-400">{apt.appointmentCode}</td>
                      <td className="p-3 font-medium text-white">{apt.patientName}</td>
                      <td className="p-3 text-slate-300">{apt.paymentMethod}</td>
                      <td className="p-3 font-bold text-emerald-400">₹{apt.fee}</td>
                      <td className="p-3 text-emerald-400 font-bold">{apt.paymentStatus || 'Paid'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PATIENT GRIEVANCES */}
        {activeTab === 'complaints' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Patient Grievance Redressal Desk</h3>
              <p className="text-xs text-slate-400">Review patient support tickets and provide official administrative responses.</p>
            </div>

            <div className="space-y-3">
              {complaints.map(comp => (
                <div key={comp._id} className="bg-slate-900 p-5 rounded-2xl border border-slate-700/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-400">{comp.category}</span>
                    <span className="text-slate-400">From: {comp.patientName} ({comp.patientEmail})</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{comp.subject}</h4>
                  <p className="text-slate-300 bg-slate-800 p-2.5 rounded-xl">"{comp.message}"</p>
                  
                  {comp.adminResponse ? (
                    <div className="p-2 bg-purple-950/40 border border-purple-800/40 rounded-xl text-purple-300">
                      <strong>Admin Resolution: </strong>{comp.adminResponse}
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedComplaint(comp)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold cursor-pointer"
                    >
                      Resolve Grievance
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Review Doctor Modal */}
      {selectedDoctorForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <img src={selectedDoctorForReview.image} alt={selectedDoctorForReview.name} className="w-14 h-14 rounded-2xl object-cover border border-purple-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedDoctorForReview.name}</h3>
                  <p className="text-xs text-teal-400">{selectedDoctorForReview.specialtyName} • {selectedDoctorForReview.title}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoctorForReview(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Doctor Detailed Credentials for Review */}
            <div className="bg-slate-800/70 p-4 rounded-2xl space-y-2 text-xs border border-slate-700">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">NMC Registration No.</span>
                  <span className="font-mono font-bold text-purple-300 text-sm">{selectedDoctorForReview.nmcNumber}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">State Medical Council</span>
                  <span className="font-bold text-slate-200">{selectedDoctorForReview.medicalCouncil || 'Delhi Medical Council'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/50">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Medical College / Alma Mater</span>
                  <span className="font-bold text-slate-200">{selectedDoctorForReview.medicalCollege || 'AIIMS New Delhi'}</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Hospital Affiliation</span>
                  <span className="font-bold text-slate-200">{selectedDoctorForReview.hospital}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-700/50">
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Experience & Fee</span>
                  <span className="font-bold text-emerald-400">{selectedDoctorForReview.experience} Yrs • ₹{selectedDoctorForReview.fee} / consult</span>
                </div>
                <div>
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Applicant Email / Phone</span>
                  <span className="text-slate-300">{selectedDoctorForReview.email || 'doctor@docpulse.in'}</span>
                </div>
              </div>
            </div>

            {/* Admin Remarks Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                Admin Verification Remarks & Council Check Notes *
              </label>
              <textarea
                rows="3"
                value={adminRemarks}
                onChange={(e) => setAdminRemarks(e.target.value)}
                placeholder="Enter verification notes (e.g. NMC registration verified against State Medical Register)..."
                className="w-full p-3 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500 font-medium"
              />
            </div>

            {/* Decision Buttons */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleReviewAction('reject')}
                className="px-4 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer"
              >
                ❌ Reject (Block from Home Page)
              </button>

              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleReviewAction('approve')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>✅ Verify Credentials & Add Doctor to Home Page</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grievance Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-base font-bold text-white">Resolve Grievance: {selectedComplaint.subject}</h3>
            <p className="text-xs text-slate-400">Patient: {selectedComplaint.patientName} ({selectedComplaint.patientEmail})</p>

            <form onSubmit={handleResolveComplaint} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Official Resolution Response *</label>
                <textarea
                  rows="4"
                  required
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  placeholder="Enter resolution response..."
                  className="w-full p-3 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white outline-none focus:border-purple-500 font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital e-Prescription Viewer Modal for Admin */}
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
