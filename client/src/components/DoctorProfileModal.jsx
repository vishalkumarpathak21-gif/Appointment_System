import React from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Stethoscope, 
  Building2, 
  GraduationCap, 
  MapPin, 
  Languages, 
  Award, 
  Clock, 
  FileCheck2, 
  BadgeCheck, 
  IndianRupee,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function DoctorProfileModal({ isOpen, onClose, currentUser }) {
  if (!isOpen || !currentUser) return null;

  const isApproved = currentUser.isApproved === true;
  const docProfile = currentUser.doctorProfile || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xl border border-teal-500/30">
              {currentUser.name?.charAt(0) || 'D'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-white">{currentUser.name}</h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                  isApproved 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                }`}>
                  {isApproved ? 'Verified Doctor 🇮🇳' : 'Verification Pending ⏳'}
                </span>
              </div>
              <p className="text-xs text-teal-200 mt-0.5">
                {docProfile.specialtyName || docProfile.specialty || 'Medical Specialist'} • {docProfile.qualification || 'MBBS, MD'}
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

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Verification Status Banner */}
          {!isApproved ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>NMC Verification Under Review by Administrator</span>
              </div>
              <p className="leading-relaxed text-slate-700">
                Your credentials and medical registration number are in the Admin verification queue. Once verified, your public doctor card and Doctor Consultation Portal will be unlocked automatically.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span><strong>Account Active & Verified:</strong> Your profile is live on the public DocPulse directory.</span>
            </div>
          )}

          {/* Section 1: Contact Information */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Account & Contact Info
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Email Address</span>
                <span className="text-xs font-semibold text-slate-800 break-all">{currentUser.email}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Phone Number</span>
                <span className="text-xs font-semibold text-slate-800">{currentUser.phone || '+91 98765 43210'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Medical Credentials */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Medical Credentials & Registration
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Specialization</span>
                <span className="text-xs font-bold text-teal-700 capitalize">
                  {docProfile.specialtyName || docProfile.specialty || 'General Medicine'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">NMC Reg Number</span>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {docProfile.nmcNumber || currentUser.nmcNumber || 'NMC-DMC/78921'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Experience</span>
                <span className="text-xs font-bold text-slate-800">
                  {docProfile.experience || 5} Years
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Consultation Fee</span>
                <span className="text-xs font-bold text-emerald-700">
                  ₹{docProfile.fee || 800}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2">
                <span className="text-[10px] text-slate-400 font-bold block">Qualification</span>
                <span className="text-xs font-semibold text-slate-800">
                  {docProfile.qualification || 'MBBS, MD - Specialist Physician'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Clinic & Practice Information */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Clinic & Practice Location
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Hospital / Clinic</span>
                  <span className="text-xs font-semibold text-slate-800">
                    {docProfile.hospital || 'Apollo Hospitals / Clinic'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Clinic Address</span>
                  <span className="text-xs font-medium text-slate-700">
                    {docProfile.clinicAddress || docProfile.location || '14 Ring Road, South Extension Part 2, New Delhi - 110049'}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Languages className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">Consultation Languages</span>
                  <span className="text-xs font-medium text-slate-700">
                    {Array.isArray(docProfile.languages) ? docProfile.languages.join(', ') : (docProfile.languages || 'English, Hindi')}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
          >
            Close Profile
          </button>
        </div>

      </div>
    </div>
  );
}
